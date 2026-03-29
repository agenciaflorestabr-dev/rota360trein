import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, serviceRoleKey);

    // Get MP access token from site_content
    const { data: tokenData } = await supabase
      .from('site_content')
      .select('value')
      .eq('section_key', 'mercadopago_access_token')
      .maybeSingle();

    const accessToken = tokenData?.value;
    if (!accessToken) {
      return new Response(JSON.stringify({ error: 'Mercado Pago não configurado. Configure o Access Token no painel admin.' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const { title, price, slug, quantity, studentName, studentEmail, studentWhatsapp, formSubmissionId } = await req.json();

    if (!title || !price || !studentName || !studentEmail) {
      return new Response(JSON.stringify({ error: 'Dados obrigatórios não informados' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Check if there's a custom price in the database
    let finalPrice = Number(price);
    if (slug) {
      const { data: pricesData } = await supabase
        .from('site_content')
        .select('value')
        .eq('section_key', 'course_prices')
        .maybeSingle();

      if (pricesData?.value) {
        try {
          const savedPrices = JSON.parse(pricesData.value);
          if (savedPrices[slug]) {
            finalPrice = parseFloat(savedPrices[slug]);
          }
        } catch {}
      }
    }

    // Create payment record
    const { data: payment, error: paymentError } = await supabase
      .from('payments')
      .insert({
        student_name: studentName,
        student_email: studentEmail,
        student_whatsapp: studentWhatsapp || null,
        course_title: title,
        amount: finalPrice,
        form_submission_id: formSubmissionId || null,
        mp_status: 'pending',
      })
      .select('id')
      .single();

    if (paymentError) {
      console.error('Error creating payment:', paymentError);
      return new Response(JSON.stringify({ error: 'Erro ao criar registro de pagamento' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Get the base URL for callbacks
    const origin = req.headers.get('origin') || req.headers.get('referer')?.replace(/\/$/, '') || '';

    // Create Mercado Pago preference
    const mpResponse = await fetch('https://api.mercadopago.com/checkout/preferences', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        items: [
          {
            title,
            quantity: quantity || 1,
            unit_price: finalPrice,
            currency_id: 'BRL',
          },
        ],
        payer: {
          name: studentName,
          email: studentEmail,
        },
        back_urls: {
          success: `${origin}/pagamento/sucesso?payment_id=${payment.id}`,
          failure: `${origin}/pagamento/erro?payment_id=${payment.id}`,
          pending: `${origin}/pagamento/pendente?payment_id=${payment.id}`,
        },
        auto_return: 'approved',
        external_reference: payment.id,
        notification_url: `${supabaseUrl}/functions/v1/mercadopago-webhook`,
        payment_methods: {
          installments: 6,
          excluded_payment_types: [
            { id: "ticket" },
          ],
        },
      }),
    });

    const mpData = await mpResponse.json();

    if (!mpResponse.ok) {
      console.error('MP Error:', mpData);
      return new Response(JSON.stringify({ error: 'Erro ao criar preferência no Mercado Pago', details: mpData }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Update payment with MP preference ID
    await supabase
      .from('payments')
      .update({ mp_preference_id: mpData.id })
      .eq('id', payment.id);

    return new Response(JSON.stringify({
      init_point: mpData.init_point,
      sandbox_init_point: mpData.sandbox_init_point,
      preference_id: mpData.id,
      payment_id: payment.id,
    }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

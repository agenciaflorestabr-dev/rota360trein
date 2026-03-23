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

    const body = await req.json();
    console.log('Webhook received:', JSON.stringify(body));

    // MP sends different notification types
    if (body.type === 'payment' || body.action === 'payment.updated' || body.action === 'payment.created') {
      const paymentId = body.data?.id;
      if (!paymentId) {
        return new Response(JSON.stringify({ ok: true }), { status: 200, headers: corsHeaders });
      }

      // Get MP access token
      const { data: tokenData } = await supabase
        .from('site_content')
        .select('value')
        .eq('section_key', 'mercadopago_access_token')
        .maybeSingle();

      const accessToken = tokenData?.value;
      if (!accessToken) {
        console.error('MP access token not configured');
        return new Response(JSON.stringify({ error: 'Token not configured' }), { status: 400, headers: corsHeaders });
      }

      // Fetch payment details from MP
      const mpResponse = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
        headers: { 'Authorization': `Bearer ${accessToken}` },
      });

      const mpPayment = await mpResponse.json();
      console.log('MP Payment details:', JSON.stringify(mpPayment));

      const externalRef = mpPayment.external_reference;
      if (!externalRef) {
        console.log('No external reference found');
        return new Response(JSON.stringify({ ok: true }), { status: 200, headers: corsHeaders });
      }

      // Update payment in database
      const updateData: Record<string, unknown> = {
        mp_payment_id: String(paymentId),
        mp_status: mpPayment.status || 'unknown',
        mp_status_detail: mpPayment.status_detail || null,
        payment_method: mpPayment.payment_method_id || mpPayment.payment_type_id || null,
        updated_at: new Date().toISOString(),
      };

      if (mpPayment.status === 'approved') {
        updateData.paid_at = mpPayment.date_approved || new Date().toISOString();
      }

      const { error } = await supabase
        .from('payments')
        .update(updateData)
        .eq('id', externalRef);

      if (error) {
        console.error('Error updating payment:', error);
      }
    }

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Webhook error:', error);
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: corsHeaders,
    });
  }
});

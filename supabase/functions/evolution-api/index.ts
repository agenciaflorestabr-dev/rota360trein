import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

function jsonResponse(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const EVOLUTION_API_KEY = Deno.env.get('EVOLUTION_API_KEY');
  const EVOLUTION_API_URL = Deno.env.get('EVOLUTION_API_URL');

  if (!EVOLUTION_API_KEY || !EVOLUTION_API_URL) {
    return jsonResponse({ error: 'Evolution API não configurada no backend' }, 500);
  }

  const baseUrl = EVOLUTION_API_URL.replace(/\/+$/, '');

  const headers = {
    'Content-Type': 'application/json',
    'apikey': EVOLUTION_API_KEY,
  };

  try {
    const { action, instanceName: providedInstanceName, number, text, recipientName } = await req.json();

    // Auto-resolve instance name from DB if not provided (for 'send' action)
    let instanceName = providedInstanceName;
    if (!instanceName && action === 'send') {
      const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
      const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
      const supabase = createClient(supabaseUrl, serviceRoleKey);
      const { data } = await supabase
        .from('site_content')
        .select('value')
        .eq('section_key', 'evolution_instance_name')
        .maybeSingle();
      instanceName = data?.value || null;
    }

    if (!instanceName) {
      return jsonResponse({ error: 'Nome da instância é obrigatório' }, 400);
    }

    if (action === 'create') {
      const createRes = await fetch(`${baseUrl}/instance/create`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          instanceName,
          qrcode: true,
          integration: 'WHATSAPP-BAILEYS',
        }),
      });

      const createData = await createRes.json();

      if (createRes.ok) {
        const qrBase64 = createData?.qrcode?.base64 || null;
        return jsonResponse({ ok: true, qrcode: qrBase64, data: createData });
      }

      // If instance already exists, try connect to get QR
      const errMsg = JSON.stringify(createData).toLowerCase();
      if (errMsg.includes('already') || errMsg.includes('exists') || errMsg.includes('já existe')) {
        try {
          const connectRes = await fetch(`${baseUrl}/instance/connect/${instanceName}`, {
            method: 'GET',
            headers,
          });
          if (connectRes.ok) {
            const connectData = await connectRes.json();
            const qrBase64 = connectData?.base64
              ? (connectData.base64.startsWith('data:') ? connectData.base64 : `data:image/png;base64,${connectData.base64}`)
              : null;
            return jsonResponse({ ok: true, alreadyExists: true, qrcode: qrBase64, data: connectData });
          }
        } catch {}

        // Connect also failed - try to delete and recreate
        try {
          await fetch(`${baseUrl}/instance/delete/${instanceName}`, { method: 'DELETE', headers });
          // Wait a bit then recreate
          const retryRes = await fetch(`${baseUrl}/instance/create`, {
            method: 'POST',
            headers,
            body: JSON.stringify({ instanceName, qrcode: true, integration: 'WHATSAPP-BAILEYS' }),
          });
          if (retryRes.ok) {
            const retryData = await retryRes.json();
            const qrBase64 = retryData?.qrcode?.base64 || null;
            return jsonResponse({ ok: true, recreated: true, qrcode: qrBase64, data: retryData });
          }
        } catch {}

        return jsonResponse({ ok: true, alreadyExists: true, qrcode: null, message: 'Instância já existe mas não foi possível conectar. Tente outro nome.' });
      }

      return jsonResponse({ error: 'Erro ao criar instância', details: createData }, 400);
    }

    if (action === 'connect') {
      const connectRes = await fetch(`${baseUrl}/instance/connect/${instanceName}`, {
        method: 'GET',
        headers,
      });
      const connectData = await connectRes.json();

      if (!connectRes.ok) {
        return jsonResponse({ error: 'Erro ao conectar instância', details: connectData });
      }

      // Extract QR code base64
      const qrBase64 = connectData?.base64
        ? (connectData.base64.startsWith('data:') ? connectData.base64 : `data:image/png;base64,${connectData.base64}`)
        : null;

      return jsonResponse({ ...connectData, qrcode: qrBase64 });
    }

    if (action === 'status') {
      const statusRes = await fetch(`${baseUrl}/instance/connectionState/${instanceName}`, {
        method: 'GET',
        headers,
      });
      const statusData = await statusRes.json();

      if (!statusRes.ok) {
        return jsonResponse({ error: 'Erro ao verificar status', details: statusData, notFound: statusRes.status === 404 });
      }

      return jsonResponse(statusData);
    }

    if (action === 'disconnect') {
      const disconnectRes = await fetch(`${baseUrl}/instance/logout/${instanceName}`, {
        method: 'DELETE',
        headers,
      });
      const disconnectData = await disconnectRes.json();
      return jsonResponse(disconnectData);
    }

    if (action === 'send') {
      const sendRes = await fetch(`${baseUrl}/message/sendText/${instanceName}`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ number, text }),
      });
      const sendData = await sendRes.json();
      const sendOk = sendRes.ok;

      // Log message
      try {
        const sbUrl = Deno.env.get('SUPABASE_URL')!;
        const sbKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
        const sb = createClient(sbUrl, sbKey);
        await sb.from('messages').insert({
          recipient_name: recipientName || null,
          recipient_phone: number,
          message_content: text,
          status: sendOk ? 'sent' : 'failed',
          sent_at: sendOk ? new Date().toISOString() : null,
        });
      } catch (logErr) {
        console.error('Failed to log message:', logErr);
      }

      if (!sendOk) {
        return jsonResponse({ error: 'Erro ao enviar mensagem', details: sendData });
      }
      return jsonResponse(sendData);
    }

    return jsonResponse({ error: 'Ação inválida. Use: create, connect, status, disconnect, send' }, 400);

  } catch (error) {
    console.error('Evolution API error:', error);
    return jsonResponse({ error: error.message }, 500);
  }
});

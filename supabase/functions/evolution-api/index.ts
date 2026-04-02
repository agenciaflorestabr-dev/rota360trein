import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const EVOLUTION_API_KEY = Deno.env.get('EVOLUTION_API_KEY');
  const EVOLUTION_API_URL = Deno.env.get('EVOLUTION_API_URL');

  if (!EVOLUTION_API_KEY || !EVOLUTION_API_URL) {
    return new Response(JSON.stringify({ error: 'Evolution API não configurada no backend' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  // Remove trailing slash from base URL
  const baseUrl = EVOLUTION_API_URL.replace(/\/+$/, '');

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
      return new Response(JSON.stringify({ error: 'Nome da instância é obrigatório' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const headers = {
      'Content-Type': 'application/json',
      'apikey': EVOLUTION_API_KEY,
    };

    if (action === 'create') {
      // Create instance
      const createRes = await fetch(`${baseUrl}/instance/create`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          instanceName,
          integration: 'WHATSAPP-BAILEYS',
          qrcode: true,
        }),
      });

      const createData = await createRes.json();

      if (!createRes.ok) {
        return new Response(JSON.stringify({ error: 'Erro ao criar instância', details: createData }), {
          status: createRes.status,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      return new Response(JSON.stringify(createData), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (action === 'connect') {
      // Get QR code / connect
      const connectRes = await fetch(`${baseUrl}/instance/connect/${instanceName}`, {
        method: 'GET',
        headers,
      });

      const connectData = await connectRes.json();

      if (!connectRes.ok) {
        return new Response(JSON.stringify({ error: 'Erro ao conectar instância', details: connectData }), {
          status: connectRes.status,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      return new Response(JSON.stringify(connectData), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (action === 'status') {
      const statusRes = await fetch(`${baseUrl}/instance/connectionState/${instanceName}`, {
        method: 'GET',
        headers,
      });

      const statusData = await statusRes.json();

      if (!statusRes.ok) {
        return new Response(JSON.stringify({ error: 'Erro ao verificar status', details: statusData }), {
          status: statusRes.status,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      return new Response(JSON.stringify(statusData), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (action === 'disconnect') {
      const disconnectRes = await fetch(`${baseUrl}/instance/logout/${instanceName}`, {
        method: 'DELETE',
        headers,
      });
      const disconnectData = await disconnectRes.json();
      return new Response(JSON.stringify(disconnectData), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (action === 'send') {
      const sendRes = await fetch(`${baseUrl}/message/sendText/${instanceName}`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ number, text }),
      });
      const sendData = await sendRes.json();
      const sendOk = sendRes.ok;

      // Log message in the messages table
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
        return new Response(JSON.stringify({ error: 'Erro ao enviar mensagem', details: sendData }), {
          status: sendRes.status,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      return new Response(JSON.stringify(sendData), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ error: 'Ação inválida. Use: create, connect, status, disconnect, send' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Evolution API error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

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
    const { action, instanceName, number, text } = await req.json();

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
      if (!sendRes.ok) {
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

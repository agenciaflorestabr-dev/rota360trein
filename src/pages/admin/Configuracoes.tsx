import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { QrCode, Wifi, RefreshCw, CheckCircle2, XCircle, CreditCard, Eye, EyeOff } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const INSTANCE_KEY = 'evolution_instance_name';
const MP_TOKEN_KEY = 'mercadopago_access_token';
const MP_PUBLIC_KEY = 'mercadopago_public_key';

const Configuracoes = () => {
  // Evolution API state
  const [instanceName, setInstanceName] = useState('');
  const [qrCodeBase64, setQrCodeBase64] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [instanceStatus, setInstanceStatus] = useState<'disconnected' | 'connecting' | 'connected'>('disconnected');
  const [connectedInstance, setConnectedInstance] = useState<string | null>(null);
  const [connectedPhone, setConnectedPhone] = useState<string | null>(null);
  const [isCheckingStatus, setIsCheckingStatus] = useState(true);
  const statusInterval = useRef<ReturnType<typeof setInterval> | null>(null);

  // Mercado Pago state
  const [mpToken, setMpToken] = useState('');
  const [mpSavedToken, setMpSavedToken] = useState('');
  const [mpSaving, setMpSaving] = useState(false);
  const [mpShowToken, setMpShowToken] = useState(false);

  const callEvolutionApi = async (action: string, instName: string) => {
    const { data, error } = await supabase.functions.invoke('evolution-api', {
      body: { action, instanceName: instName },
    });
    if (error) throw new Error(error.message);
    return data;
  };

  const saveInstanceToDb = async (name: string) => {
    localStorage.setItem('evolution_instance', name);
    const { data: existing } = await supabase.from('site_content').select('id').eq('section_key', INSTANCE_KEY).maybeSingle();
    if (existing) {
      await supabase.from('site_content').update({ value: name }).eq('section_key', INSTANCE_KEY);
    } else {
      await supabase.from('site_content').insert({ section_key: INSTANCE_KEY, content_type: 'text', value: name });
    }
  };

  const removeInstanceFromDb = async () => {
    localStorage.removeItem('evolution_instance');
    await supabase.from('site_content').delete().eq('section_key', INSTANCE_KEY);
  };

  // Load saved data
  useEffect(() => {
    const loadSaved = async () => {
      const [instanceResult, mpResult] = await Promise.all([
        supabase.from('site_content').select('value').eq('section_key', INSTANCE_KEY).maybeSingle(),
        supabase.from('site_content').select('value').eq('section_key', MP_TOKEN_KEY).maybeSingle(),
      ]);

      if (instanceResult.data?.value) {
        setInstanceName(instanceResult.data.value);
        setConnectedInstance(instanceResult.data.value);
        localStorage.setItem('evolution_instance', instanceResult.data.value);
        checkInstanceStatus(instanceResult.data.value);
      } else {
        const local = localStorage.getItem('evolution_instance');
        if (local) {
          setInstanceName(local);
          setConnectedInstance(local);
          await saveInstanceToDb(local);
          checkInstanceStatus(local);
        } else {
          setIsCheckingStatus(false);
        }
      }

      if (mpResult.data?.value) {
        setMpSavedToken(mpResult.data.value);
        setMpToken(mpResult.data.value);
      }
    };
    loadSaved();
    return () => { if (statusInterval.current) clearInterval(statusInterval.current); };
  }, []);

  const checkInstanceStatus = async (instName: string) => {
    setIsCheckingStatus(true);
    try {
      const statusData = await callEvolutionApi('status', instName);
      const state = statusData?.instance?.state || statusData?.state;
      const phone = statusData?.instance?.owner || statusData?.owner || null;
      if (state === 'open' || state === 'connected') {
        setInstanceStatus('connected'); setConnectedInstance(instName); setConnectedPhone(phone);
        await saveInstanceToDb(instName);
      } else if (state === 'connecting' || state === 'close') {
        setInstanceStatus('connecting'); setConnectedInstance(instName); setConnectedPhone(null);
        await saveInstanceToDb(instName);
      } else {
        setInstanceStatus('disconnected'); setConnectedInstance(null); setConnectedPhone(null);
        await removeInstanceFromDb();
      }
    } catch {
      setInstanceStatus('disconnected'); setConnectedInstance(null); await removeInstanceFromDb();
    } finally { setIsCheckingStatus(false); }
  };

  const createAndConnect = async () => {
    if (!instanceName.trim()) { toast({ title: 'Digite o nome da instância', variant: 'destructive' }); return; }
    setIsCreating(true); setQrCodeBase64(null); setInstanceStatus('connecting');
    try {
      await callEvolutionApi('create', instanceName);
      const connectData = await callEvolutionApi('connect', instanceName);
      const qr = connectData?.base64 || connectData?.qrcode?.base64 || connectData?.code;
      if (qr) {
        setQrCodeBase64(qr.startsWith('data:') ? qr : `data:image/png;base64,${qr}`);
        toast({ title: 'QR Code gerado!', description: 'Escaneie com seu WhatsApp para conectar.' });
        startStatusPolling(instanceName);
      } else {
        toast({ title: 'Instância criada', description: 'Mas não foi possível gerar o QR Code. Tente reconectar.' });
      }
    } catch (error: any) {
      toast({ title: 'Erro', description: error.message || 'Falha ao conectar', variant: 'destructive' });
      setInstanceStatus('disconnected');
    } finally { setIsCreating(false); }
  };

  const startStatusPolling = (instName: string) => {
    if (statusInterval.current) clearInterval(statusInterval.current);
    statusInterval.current = setInterval(async () => {
      try {
        const statusData = await callEvolutionApi('status', instName);
        const state = statusData?.instance?.state || statusData?.state;
        const phone = statusData?.instance?.owner || statusData?.owner || null;
        if (state === 'open' || state === 'connected') {
          setInstanceStatus('connected'); setConnectedInstance(instName); setConnectedPhone(phone);
          setQrCodeBase64(null); await saveInstanceToDb(instName);
          if (statusInterval.current) clearInterval(statusInterval.current);
          toast({ title: '✅ WhatsApp conectado com sucesso!' });
        }
      } catch {}
    }, 5000);
  };

  const disconnect = async () => {
    if (!connectedInstance) return;
    try { await callEvolutionApi('disconnect', connectedInstance); } catch {}
    setInstanceStatus('disconnected'); setConnectedInstance(null); setConnectedPhone(null); setQrCodeBase64(null);
    await removeInstanceFromDb(); toast({ title: 'Instância desconectada' });
  };

  const reconnectInstance = async (instName: string) => {
    setIsCreating(true); setQrCodeBase64(null);
    try {
      const connectData = await callEvolutionApi('connect', instName);
      const qr = connectData?.base64 || connectData?.qrcode?.base64 || connectData?.code;
      if (qr) {
        setQrCodeBase64(qr.startsWith('data:') ? qr : `data:image/png;base64,${qr}`);
        toast({ title: 'QR Code gerado!' }); startStatusPolling(instName);
      } else { toast({ title: 'Não foi possível gerar o QR Code', variant: 'destructive' }); }
    } catch (error: any) {
      toast({ title: 'Erro', description: error.message, variant: 'destructive' });
    } finally { setIsCreating(false); }
  };

  // Mercado Pago
  const saveMpToken = async () => {
    if (!mpToken.trim()) { toast({ title: 'Digite o Access Token', variant: 'destructive' }); return; }
    setMpSaving(true);
    try {
      const { data: existing } = await supabase.from('site_content').select('id').eq('section_key', MP_TOKEN_KEY).maybeSingle();
      if (existing) {
        await supabase.from('site_content').update({ value: mpToken }).eq('section_key', MP_TOKEN_KEY);
      } else {
        await supabase.from('site_content').insert({ section_key: MP_TOKEN_KEY, content_type: 'text', value: mpToken });
      }
      setMpSavedToken(mpToken);
      toast({ title: '✅ Mercado Pago configurado com sucesso!' });
    } catch (error: any) {
      toast({ title: 'Erro ao salvar', description: error.message, variant: 'destructive' });
    } finally { setMpSaving(false); }
  };

  const removeMpToken = async () => {
    await supabase.from('site_content').delete().eq('section_key', MP_TOKEN_KEY);
    setMpToken(''); setMpSavedToken('');
    toast({ title: 'Mercado Pago desconectado' });
  };

  return (
    <div className="p-6 space-y-4">
      <div>
        <h1 className="text-2xl font-heading font-bold text-foreground">Configurações</h1>
        <p className="text-muted-foreground text-sm">Integrações e configurações do sistema</p>
      </div>

      <Tabs defaultValue="mercadopago">
        <TabsList>
          <TabsTrigger value="mercadopago">Mercado Pago</TabsTrigger>
          <TabsTrigger value="evolution">Evolution API</TabsTrigger>
          <TabsTrigger value="general">Geral</TabsTrigger>
        </TabsList>

        {/* Mercado Pago Tab */}
        <TabsContent value="mercadopago" className="space-y-4">
          {mpSavedToken ? (
            <Card className="border-green-500/30 bg-green-500/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-600">
                  <CheckCircle2 className="w-5 h-5" />
                  Mercado Pago Conectado
                </CardTitle>
                <CardDescription>Sua conta do Mercado Pago está configurada para receber pagamentos</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-background rounded-lg p-4 border">
                  <p className="text-xs text-muted-foreground mb-1">Access Token</p>
                  <div className="flex items-center gap-2">
                    <p className="font-mono text-sm text-foreground flex-1">
                      {mpShowToken ? mpSavedToken : `${'•'.repeat(20)}...${mpSavedToken.slice(-8)}`}
                    </p>
                    <Button variant="ghost" size="icon" onClick={() => setMpShowToken(!mpShowToken)}>
                      {mpShowToken ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-green-500 text-white"><CheckCircle2 className="w-3 h-3 mr-1" /> Ativo</Badge>
                </div>
                <div className="flex gap-2 pt-2">
                  <Button variant="destructive" size="sm" onClick={removeMpToken} className="gap-2">
                    <XCircle className="w-4 h-4" /> Desconectar
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-primary" />
                  Configurar Mercado Pago
                </CardTitle>
                <CardDescription>
                  Insira seu Access Token de produção do Mercado Pago para habilitar pagamentos online.
                  Encontre em: <a href="https://www.mercadopago.com.br/developers/panel/app" target="_blank" rel="noopener" className="underline text-primary">Painel do Desenvolvedor</a> → Suas integrações → Credenciais de produção.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Access Token (Produção)</Label>
                  <Input
                    value={mpToken}
                    onChange={e => setMpToken(e.target.value)}
                    placeholder="APP_USR-XXXX..."
                    type={mpShowToken ? 'text' : 'password'}
                    disabled={mpSaving}
                  />
                  <p className="text-xs text-muted-foreground mt-1">O token começa com APP_USR-</p>
                </div>
                <div className="flex gap-2">
                  <Button onClick={saveMpToken} disabled={mpSaving} className="gap-2">
                    {mpSaving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <CreditCard className="w-4 h-4" />}
                    {mpSaving ? 'Salvando...' : 'Salvar e Ativar'}
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => setMpShowToken(!mpShowToken)}>
                    {mpShowToken ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Evolution API Tab */}
        <TabsContent value="evolution" className="space-y-4">
          {isCheckingStatus ? (
            <Card><CardContent className="p-8 flex items-center justify-center gap-2 text-muted-foreground"><RefreshCw className="w-4 h-4 animate-spin" /> Verificando conexão...</CardContent></Card>
          ) : instanceStatus === 'connected' && connectedInstance ? (
            <Card className="border-green-500/30 bg-green-500/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-600"><CheckCircle2 className="w-5 h-5" />WhatsApp Conectado</CardTitle>
                <CardDescription>Sua instância está ativa e pronta para enviar mensagens</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-background rounded-lg p-4 border"><p className="text-xs text-muted-foreground mb-1">Instância</p><p className="font-medium text-foreground">{connectedInstance}</p></div>
                  {connectedPhone && (<div className="bg-background rounded-lg p-4 border"><p className="text-xs text-muted-foreground mb-1">Número conectado</p><p className="font-medium text-foreground">{connectedPhone}</p></div>)}
                </div>
                <div className="flex items-center gap-2"><Badge className="bg-green-500 text-white"><CheckCircle2 className="w-3 h-3 mr-1" /> Conectado</Badge></div>
                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm" onClick={() => checkInstanceStatus(connectedInstance)} className="gap-2"><RefreshCw className="w-4 h-4" /> Verificar status</Button>
                  <Button variant="destructive" size="sm" onClick={disconnect} className="gap-2"><XCircle className="w-4 h-4" /> Desconectar</Button>
                </div>
              </CardContent>
            </Card>
          ) : instanceStatus === 'connecting' && connectedInstance ? (
            <Card className="border-yellow-500/30 bg-yellow-500/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-yellow-600"><Wifi className="w-5 h-5" />Instância Encontrada — Aguardando Conexão</CardTitle>
                <CardDescription>A instância <strong>{connectedInstance}</strong> existe mas ainda não está conectada ao WhatsApp</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-background rounded-lg p-4 border"><p className="text-xs text-muted-foreground mb-1">Instância</p><p className="font-medium text-foreground">{connectedInstance}</p></div>
                <div className="flex items-center gap-2"><Badge variant="outline" className="border-yellow-500 text-yellow-600"><RefreshCw className="w-3 h-3 mr-1" /> Aguardando leitura do QR Code</Badge></div>
                {qrCodeBase64 && (<div className="flex flex-col items-center gap-2 py-2"><img src={qrCodeBase64} alt="QR Code WhatsApp" className="w-64 h-64 rounded-lg border border-border" /></div>)}
                <div className="flex gap-2 pt-2">
                  <Button size="sm" onClick={() => reconnectInstance(connectedInstance)} disabled={isCreating} className="gap-2">{isCreating ? <RefreshCw className="w-4 h-4 animate-spin" /> : <QrCode className="w-4 h-4" />}{isCreating ? 'Gerando...' : 'Gerar novo QR Code'}</Button>
                  <Button variant="outline" size="sm" onClick={() => checkInstanceStatus(connectedInstance)} className="gap-2"><RefreshCw className="w-4 h-4" /> Verificar status</Button>
                  <Button variant="destructive" size="sm" onClick={disconnect} className="gap-2"><XCircle className="w-4 h-4" /> Remover</Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><Wifi className="w-5 h-5 text-primary" />Conectar WhatsApp</CardTitle>
                  <CardDescription>Digite o nome da instância e clique para gerar o QR Code de conexão</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div><Label>Nome da Instância</Label><Input value={instanceName} onChange={e => setInstanceName(e.target.value)} placeholder="ex: rota360-principal" disabled={isCreating} /></div>
                  <Button onClick={createAndConnect} disabled={isCreating} className="gap-2">{isCreating ? <RefreshCw className="w-4 h-4 animate-spin" /> : <QrCode className="w-4 h-4" />}{isCreating ? 'Gerando QR Code...' : 'Gerar QR Code'}</Button>
                </CardContent>
              </Card>
              {qrCodeBase64 && instanceStatus === 'connecting' && (
                <Card>
                  <CardHeader><CardTitle className="flex items-center gap-2"><QrCode className="w-5 h-5 text-primary" />QR Code da Instância</CardTitle><CardDescription>Escaneie o QR code com seu WhatsApp para conectar</CardDescription></CardHeader>
                  <CardContent className="flex flex-col items-center gap-4"><img src={qrCodeBase64} alt="QR Code WhatsApp" className="w-64 h-64 rounded-lg border border-border" /><Badge variant="outline"><RefreshCw className="w-3 h-3 mr-1 animate-spin" />Aguardando leitura...</Badge></CardContent>
                </Card>
              )}
            </>
          )}
        </TabsContent>

        <TabsContent value="general">
          <Card>
            <CardHeader><CardTitle>Configurações Gerais</CardTitle><CardDescription>Configurações gerais do painel administrativo</CardDescription></CardHeader>
            <CardContent><p className="text-muted-foreground text-sm">Mais configurações serão adicionadas em breve.</p></CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Configuracoes;

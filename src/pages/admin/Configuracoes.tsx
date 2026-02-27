import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { QrCode, Wifi, RefreshCw, CheckCircle2, XCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const Configuracoes = () => {
  const [instanceName, setInstanceName] = useState('');
  const [qrCodeBase64, setQrCodeBase64] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [instanceStatus, setInstanceStatus] = useState<'disconnected' | 'connecting' | 'connected'>('disconnected');
  const statusInterval = useRef<ReturnType<typeof setInterval> | null>(null);

  const callEvolutionApi = async (action: string, instName: string) => {
    const { data, error } = await supabase.functions.invoke('evolution-api', {
      body: { action, instanceName: instName },
    });
    if (error) throw new Error(error.message);
    return data;
  };

  const createAndConnect = async () => {
    if (!instanceName.trim()) {
      toast({ title: 'Digite o nome da instância', variant: 'destructive' });
      return;
    }

    setIsCreating(true);
    setQrCodeBase64(null);
    setInstanceStatus('connecting');

    try {
      // 1. Create instance
      await callEvolutionApi('create', instanceName);

      // 2. Get QR code
      const connectData = await callEvolutionApi('connect', instanceName);

      const qr = connectData?.base64 || connectData?.qrcode?.base64 || connectData?.code;
      if (qr) {
        // If it's already a data URI, use it; otherwise prefix it
        setQrCodeBase64(qr.startsWith('data:') ? qr : `data:image/png;base64,${qr}`);
        toast({ title: 'QR Code gerado!', description: 'Escaneie com seu WhatsApp para conectar.' });
        startStatusPolling(instanceName);
      } else {
        toast({ title: 'Instância criada', description: 'Mas não foi possível gerar o QR Code. Tente reconectar.' });
      }
    } catch (error: any) {
      console.error('Evolution error:', error);
      toast({ title: 'Erro', description: error.message || 'Falha ao conectar com a Evolution API', variant: 'destructive' });
      setInstanceStatus('disconnected');
    } finally {
      setIsCreating(false);
    }
  };

  const startStatusPolling = (instName: string) => {
    if (statusInterval.current) clearInterval(statusInterval.current);

    statusInterval.current = setInterval(async () => {
      try {
        const statusData = await callEvolutionApi('status', instName);
        const state = statusData?.instance?.state || statusData?.state;
        if (state === 'open' || state === 'connected') {
          setInstanceStatus('connected');
          if (statusInterval.current) clearInterval(statusInterval.current);
          toast({ title: '✅ WhatsApp conectado com sucesso!' });
        }
      } catch {
        // ignore polling errors
      }
    }, 5000);
  };

  useEffect(() => {
    return () => {
      if (statusInterval.current) clearInterval(statusInterval.current);
    };
  }, []);

  return (
    <div className="p-6 space-y-4">
      <div>
        <h1 className="text-2xl font-heading font-bold text-foreground">Configurações</h1>
        <p className="text-muted-foreground text-sm">Integrações e configurações do sistema</p>
      </div>

      <Tabs defaultValue="evolution">
        <TabsList>
          <TabsTrigger value="evolution">Evolution API</TabsTrigger>
          <TabsTrigger value="general">Geral</TabsTrigger>
        </TabsList>

        <TabsContent value="evolution" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wifi className="w-5 h-5 text-primary" />
                Conectar WhatsApp
              </CardTitle>
              <CardDescription>
                Digite o nome da instância e clique para gerar o QR Code de conexão
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Nome da Instância</Label>
                <Input
                  value={instanceName}
                  onChange={e => setInstanceName(e.target.value)}
                  placeholder="ex: rota360-principal"
                  disabled={isCreating}
                />
              </div>
              <Button onClick={createAndConnect} disabled={isCreating} className="gap-2">
                {isCreating ? <RefreshCw className="w-4 h-4 animate-spin" /> : <QrCode className="w-4 h-4" />}
                {isCreating ? 'Gerando QR Code...' : 'Gerar QR Code'}
              </Button>
            </CardContent>
          </Card>

          {(qrCodeBase64 || instanceStatus !== 'disconnected') && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <QrCode className="w-5 h-5 text-primary" />
                  QR Code da Instância
                </CardTitle>
                <CardDescription>Escaneie o QR code com seu WhatsApp para conectar</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center gap-4">
                {instanceStatus === 'connected' ? (
                  <div className="w-64 h-64 bg-muted rounded-lg flex flex-col items-center justify-center gap-3">
                    <CheckCircle2 className="w-16 h-16 text-green-500" />
                    <p className="text-sm font-medium text-foreground">Conectado!</p>
                  </div>
                ) : qrCodeBase64 ? (
                  <img src={qrCodeBase64} alt="QR Code WhatsApp" className="w-64 h-64 rounded-lg border border-border" />
                ) : (
                  <div className="w-64 h-64 bg-muted rounded-lg flex items-center justify-center">
                    <RefreshCw className="w-8 h-8 animate-spin text-muted-foreground" />
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <span className="text-sm">Status:</span>
                  <Badge
                    variant={instanceStatus === 'connected' ? 'default' : 'outline'}
                    className={instanceStatus === 'connected' ? 'bg-green-500' : ''}
                  >
                    {instanceStatus === 'connected' && <CheckCircle2 className="w-3 h-3 mr-1" />}
                    {instanceStatus === 'connecting' && <RefreshCw className="w-3 h-3 mr-1 animate-spin" />}
                    {instanceStatus === 'disconnected' && <XCircle className="w-3 h-3 mr-1" />}
                    {instanceStatus === 'connected' ? 'Conectado' : instanceStatus === 'connecting' ? 'Aguardando leitura...' : 'Desconectado'}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>Configurações Gerais</CardTitle>
              <CardDescription>Configurações gerais do painel administrativo</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">Mais configurações serão adicionadas em breve.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Configuracoes;

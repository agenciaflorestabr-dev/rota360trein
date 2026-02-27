import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { QrCode, Wifi, Key, RefreshCw } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const Configuracoes = () => {
  const [apiKey, setApiKey] = useState('');
  const [instanceName, setInstanceName] = useState('');
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [instanceStatus, setInstanceStatus] = useState<'disconnected' | 'connecting' | 'connected'>('disconnected');

  const createInstance = async () => {
    if (!apiKey || !instanceName) {
      toast({ title: 'Preencha todos os campos', variant: 'destructive' });
      return;
    }
    setIsCreating(true);
    setInstanceStatus('connecting');
    
    try {
      // Volution API integration placeholder
      // Replace with actual Volution API endpoint
      toast({ 
        title: 'Funcionalidade em desenvolvimento', 
        description: 'A integração com a API Volution será configurada em breve. Forneça sua API key nas configurações.' 
      });
      // Simulated QR code for demo
      setQrCode('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect fill="%23f0f0f0" width="100" height="100"/><text x="50" y="55" text-anchor="middle" font-size="10">QR Code</text></svg>');
    } catch (error) {
      toast({ title: 'Erro ao criar instância', variant: 'destructive' });
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="p-6 space-y-4">
      <div>
        <h1 className="text-2xl font-heading font-bold text-foreground">Configurações</h1>
        <p className="text-muted-foreground text-sm">Integrações e configurações do sistema</p>
      </div>

      <Tabs defaultValue="volution">
        <TabsList>
          <TabsTrigger value="volution">API Volution</TabsTrigger>
          <TabsTrigger value="general">Geral</TabsTrigger>
        </TabsList>

        <TabsContent value="volution" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="w-5 h-5 text-primary" />
                Configuração da API Volution
              </CardTitle>
              <CardDescription>Configure a integração com a API Volution para disparo de mensagens via WhatsApp</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>API Key da Volution</Label>
                <Input type="password" value={apiKey} onChange={e => setApiKey(e.target.value)} placeholder="Sua chave de API" />
              </div>
              <div>
                <Label>Nome da Instância</Label>
                <Input value={instanceName} onChange={e => setInstanceName(e.target.value)} placeholder="minha-instancia" />
              </div>
              <Button onClick={createInstance} disabled={isCreating} className="gap-2">
                {isCreating ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Wifi className="w-4 h-4" />}
                Criar Instância
              </Button>
            </CardContent>
          </Card>

          {qrCode && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <QrCode className="w-5 h-5 text-primary" />
                  QR Code da Instância
                </CardTitle>
                <CardDescription>Escaneie o QR code com seu WhatsApp para conectar</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center gap-4">
                <div className="w-64 h-64 bg-muted rounded-lg flex items-center justify-center border-2 border-dashed border-border">
                  <div className="text-center text-muted-foreground">
                    <QrCode className="w-16 h-16 mx-auto mb-2" />
                    <p className="text-sm">QR Code será exibido aqui</p>
                    <p className="text-xs">após configurar a API</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm">Status:</span>
                  <Badge variant={instanceStatus === 'connected' ? 'default' : 'outline'}>
                    {instanceStatus === 'connected' ? 'Conectado' : instanceStatus === 'connecting' ? 'Conectando...' : 'Desconectado'}
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

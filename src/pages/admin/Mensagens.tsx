import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Send, Plus, Trash2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { format } from 'date-fns';

interface Message {
  id: string;
  recipient_name: string | null;
  recipient_phone: string;
  message_content: string;
  status: string;
  sent_at: string | null;
  created_at: string;
}

const Mensagens = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ recipient_name: '', recipient_phone: '', message_content: '' });
  const [loading, setLoading] = useState(true);

  const fetchMessages = async () => {
    setLoading(true);
    const { data } = await supabase.from('messages').select('*').order('created_at', { ascending: false });
    if (data) setMessages(data);
    setLoading(false);
  };

  useEffect(() => { fetchMessages(); }, []);

  const createMessage = async () => {
    if (!form.recipient_phone || !form.message_content) return;
    const { error } = await supabase.from('messages').insert({
      recipient_name: form.recipient_name || null,
      recipient_phone: form.recipient_phone,
      message_content: form.message_content,
      created_by: user?.id,
    });
    if (error) {
      toast({ title: 'Erro', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Mensagem criada' });
      setForm({ recipient_name: '', recipient_phone: '', message_content: '' });
      setOpen(false);
      fetchMessages();
    }
  };

  const deleteMessage = async (id: string) => {
    await supabase.from('messages').delete().eq('id', id);
    setMessages(prev => prev.filter(m => m.id !== id));
  };

  const statusBadge = (s: string) => {
    switch (s) {
      case 'pending': return <Badge variant="outline">Pendente</Badge>;
      case 'sent': return <Badge className="bg-secondary/20 text-secondary border-0">Enviada</Badge>;
      case 'failed': return <Badge variant="destructive">Falhou</Badge>;
      default: return <Badge variant="outline">{s}</Badge>;
    }
  };

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold text-foreground">Mensagens</h1>
          <p className="text-muted-foreground text-sm">Controle de disparos</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2"><Plus className="w-4 h-4" /> Nova Mensagem</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Nova Mensagem</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Nome do destinatário</Label>
                <Input value={form.recipient_name} onChange={e => setForm(p => ({ ...p, recipient_name: e.target.value }))} placeholder="Nome (opcional)" />
              </div>
              <div>
                <Label>Telefone *</Label>
                <Input value={form.recipient_phone} onChange={e => setForm(p => ({ ...p, recipient_phone: e.target.value }))} placeholder="(11) 99999-9999" required />
              </div>
              <div>
                <Label>Mensagem *</Label>
                <Textarea value={form.message_content} onChange={e => setForm(p => ({ ...p, message_content: e.target.value }))} placeholder="Conteúdo da mensagem..." rows={4} required />
              </div>
              <Button onClick={createMessage} className="w-full gap-2"><Send className="w-4 h-4" /> Criar Mensagem</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardContent className="p-0">
          {loading ? (
            <div className="p-8 text-center text-muted-foreground">Carregando...</div>
          ) : messages.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">Nenhuma mensagem registrada</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Destinatário</TableHead>
                  <TableHead>Mensagem</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead className="w-[60px]" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {messages.map(m => (
                  <TableRow key={m.id}>
                    <TableCell>
                      <p className="font-medium">{m.recipient_name || '—'}</p>
                      <p className="text-xs text-muted-foreground">{m.recipient_phone}</p>
                    </TableCell>
                    <TableCell className="max-w-[300px] truncate text-sm">{m.message_content}</TableCell>
                    <TableCell>{statusBadge(m.status)}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {format(new Date(m.created_at), 'dd/MM/yyyy HH:mm')}
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon" onClick={() => deleteMessage(m.id)} className="text-destructive">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Mensagens;

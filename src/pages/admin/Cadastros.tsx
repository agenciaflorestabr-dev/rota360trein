import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Trash2, Search, Download } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface Submission {
  id: string;
  name: string;
  email: string;
  whatsapp: string;
  phone: string | null;
  city: string | null;
  state: string | null;
  cnh_category: string | null;
  cnh_register: string | null;
  cpf: string | null;
  birth_date: string | null;
  street: string | null;
  number: string | null;
  neighborhood: string | null;
  cep: string | null;
  course_title: string;
  status: string;
  created_at: string;
  payment_status?: string;
  payment_amount?: number;
}

const Cadastros = () => {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Submission | null>(null);

  const fetchSubmissions = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('form_submissions')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      // Fetch payment info for each submission
      const ids = data.map(d => d.id);
      const { data: payments } = await supabase
        .from('payments')
        .select('form_submission_id, mp_status, amount')
        .in('form_submission_id', ids);

      const paymentMap = new Map<string, { status: string; amount: number }>();
      payments?.forEach(p => {
        if (p.form_submission_id) {
          paymentMap.set(p.form_submission_id, { status: p.mp_status, amount: p.amount });
        }
      });

      const enriched = data.map(s => ({
        ...s,
        payment_status: paymentMap.get(s.id)?.status,
        payment_amount: paymentMap.get(s.id)?.amount,
      })) as Submission[];

      setSubmissions(enriched);
    }
    setLoading(false);
  };

  useEffect(() => { fetchSubmissions(); }, []);

  const updateStatus = async (id: string, status: string) => {
    await supabase.from('form_submissions').update({ status }).eq('id', id);
    setSubmissions(prev => prev.map(s => s.id === id ? { ...s, status } : s));
    toast({ title: 'Status atualizado' });
  };

  const deleteSubmission = async (id: string) => {
    await supabase.from('form_submissions').delete().eq('id', id);
    setSubmissions(prev => prev.filter(s => s.id !== id));
    toast({ title: 'Cadastro removido' });
  };

  const exportCsv = () => {
    const headers = ['Nome', 'Email', 'WhatsApp', 'CPF', 'Curso', 'CNH Registro', 'CNH Cat.', 'Nascimento', 'Rua', 'Nº', 'Bairro', 'Cidade', 'UF', 'CEP', 'Status', 'Pagamento', 'Data'];
    const rows = filtered.map(s => [
      s.name, s.email, s.whatsapp, s.cpf ?? '', s.course_title, s.cnh_register ?? '', s.cnh_category ?? '',
      s.birth_date ?? '', s.street ?? '', s.number ?? '', s.neighborhood ?? '', s.city ?? '', s.state ?? '',
      s.cep ?? '', statusLabel(s.status), paymentLabel(s.payment_status), format(new Date(s.created_at), 'dd/MM/yyyy'),
    ]);
    const csv = [headers, ...rows].map(r => r.join(';')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'cadastros.csv'; a.click();
  };

  const filtered = submissions.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.email.toLowerCase().includes(search.toLowerCase()) ||
    (s.cpf ?? '').includes(search) ||
    s.course_title.toLowerCase().includes(search.toLowerCase())
  );

  const statusLabel = (s: string) => {
    switch (s) {
      case 'pending': return 'Pendente';
      case 'approved': return 'Aprovado';
      case 'contacted': return 'Contactado';
      case 'enrolled': return 'Matriculado';
      default: return s;
    }
  };

  const paymentLabel = (s?: string) => {
    switch (s) {
      case 'approved': return 'Pago';
      case 'pending': return 'Pendente';
      case 'in_process': return 'Processando';
      case 'rejected': return 'Rejeitado';
      default: return '—';
    }
  };

  const paymentBadgeVariant = (s?: string): 'default' | 'secondary' | 'destructive' | 'outline' => {
    switch (s) {
      case 'approved': return 'default';
      case 'pending':
      case 'in_process': return 'secondary';
      case 'rejected': return 'destructive';
      default: return 'outline';
    }
  };

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold text-foreground">Cadastros</h1>
          <p className="text-muted-foreground text-sm">{submissions.length} cadastros</p>
        </div>
        <Button variant="outline" size="sm" onClick={exportCsv} className="gap-2">
          <Download className="w-4 h-4" /> Exportar CSV
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
        <Input placeholder="Buscar por nome, email, CPF ou curso..." value={search} onChange={e => setSearch(e.target.value)} className="pl-10" />
      </div>

      <Card>
        <CardContent className="p-0">
          {loading ? (
            <div className="p-8 text-center text-muted-foreground">Carregando...</div>
          ) : filtered.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">Nenhum cadastro encontrado</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Curso</TableHead>
                  <TableHead>Contato</TableHead>
                  <TableHead>Pagamento</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead className="w-[60px]" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map(s => (
                  <TableRow key={s.id} className="cursor-pointer hover:bg-muted/50" onClick={() => setSelected(s)}>
                    <TableCell>
                      <div>
                        <p className="font-medium text-foreground">{s.name}</p>
                        <p className="text-xs text-muted-foreground">{s.cpf && `CPF: ${s.cpf}`}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <p className="text-sm">{s.course_title}</p>
                    </TableCell>
                    <TableCell>
                      <p className="text-sm">{s.email}</p>
                      <p className="text-xs text-muted-foreground">{s.whatsapp}</p>
                    </TableCell>
                    <TableCell>
                      <Badge variant={paymentBadgeVariant(s.payment_status)}>
                        {paymentLabel(s.payment_status)}
                      </Badge>
                      {s.payment_amount && (
                        <p className="text-xs text-muted-foreground mt-1">
                          R$ {s.payment_amount.toFixed(2).replace('.', ',')}
                        </p>
                      )}
                    </TableCell>
                    <TableCell onClick={e => e.stopPropagation()}>
                      <Select value={s.status} onValueChange={v => updateStatus(s.id, v)}>
                        <SelectTrigger className="h-8 w-[130px]">
                          <SelectValue>{statusLabel(s.status)}</SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pendente</SelectItem>
                          <SelectItem value="contacted">Contactado</SelectItem>
                          <SelectItem value="approved">Aprovado</SelectItem>
                          <SelectItem value="enrolled">Matriculado</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {format(new Date(s.created_at), 'dd/MM/yyyy')}
                    </TableCell>
                    <TableCell onClick={e => e.stopPropagation()}>
                      <Button variant="ghost" size="icon" onClick={() => deleteSubmission(s.id)} className="text-destructive hover:text-destructive">
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

      {/* Detail Dialog */}
      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Detalhes do Cadastro</DialogTitle>
          </DialogHeader>
          {selected && (
            <div className="space-y-4 text-sm">
              <div>
                <h3 className="font-semibold text-foreground mb-2">Dados Pessoais</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div><span className="text-muted-foreground block text-xs">Nome</span><p className="font-medium">{selected.name}</p></div>
                  <div><span className="text-muted-foreground block text-xs">E-mail</span><p className="font-medium">{selected.email}</p></div>
                  <div><span className="text-muted-foreground block text-xs">WhatsApp</span><p className="font-medium">{selected.whatsapp}</p></div>
                  {selected.phone && selected.phone !== selected.whatsapp && (
                    <div><span className="text-muted-foreground block text-xs">Telefone</span><p className="font-medium">{selected.phone}</p></div>
                  )}
                  <div><span className="text-muted-foreground block text-xs">CPF</span><p className="font-medium">{selected.cpf ?? '—'}</p></div>
                  <div><span className="text-muted-foreground block text-xs">Nascimento</span><p className="font-medium">{selected.birth_date ?? '—'}</p></div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-foreground mb-2">CNH</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div><span className="text-muted-foreground block text-xs">Registro</span><p className="font-medium">{selected.cnh_register ?? '—'}</p></div>
                  <div><span className="text-muted-foreground block text-xs">Categoria</span><p className="font-medium">{selected.cnh_category ?? '—'}</p></div>
                </div>
              </div>

              {(selected.street || selected.neighborhood || selected.city) && (
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Endereço</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="col-span-2"><span className="text-muted-foreground block text-xs">Rua</span><p className="font-medium">{selected.street}{selected.number ? `, ${selected.number}` : ''}</p></div>
                    <div><span className="text-muted-foreground block text-xs">Bairro</span><p className="font-medium">{selected.neighborhood ?? '—'}</p></div>
                    <div><span className="text-muted-foreground block text-xs">Cidade/UF</span><p className="font-medium">{selected.city ?? '—'}{selected.state ? `/${selected.state}` : ''}</p></div>
                    <div><span className="text-muted-foreground block text-xs">CEP</span><p className="font-medium">{selected.cep ?? '—'}</p></div>
                  </div>
                </div>
              )}

              <div>
                <h3 className="font-semibold text-foreground mb-2">Curso e Pagamento</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div><span className="text-muted-foreground block text-xs">Curso</span><p className="font-medium">{selected.course_title}</p></div>
                  <div><span className="text-muted-foreground block text-xs">Pagamento</span>
                    <Badge variant={paymentBadgeVariant(selected.payment_status)} className="mt-1">
                      {paymentLabel(selected.payment_status)}
                    </Badge>
                    {selected.payment_amount && (
                      <span className="ml-2 text-muted-foreground">R$ {selected.payment_amount.toFixed(2).replace('.', ',')}</span>
                    )}
                  </div>
                  <div><span className="text-muted-foreground block text-xs">Status</span><p className="font-medium">{statusLabel(selected.status)}</p></div>
                  <div><span className="text-muted-foreground block text-xs">Data</span><p className="font-medium">{format(new Date(selected.created_at), 'dd/MM/yyyy HH:mm')}</p></div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Cadastros;

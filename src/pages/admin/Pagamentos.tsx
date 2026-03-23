import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { DollarSign, Search, Eye, Download, CheckCircle2, Clock, XCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface Payment {
  id: string;
  student_name: string;
  student_email: string;
  student_whatsapp: string | null;
  course_title: string;
  amount: number;
  payment_method: string | null;
  mp_payment_id: string | null;
  mp_status: string;
  mp_status_detail: string | null;
  created_at: string;
  paid_at: string | null;
}

const statusMap: Record<string, { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline'; icon: typeof CheckCircle2 }> = {
  approved: { label: 'Aprovado', variant: 'default', icon: CheckCircle2 },
  pending: { label: 'Pendente', variant: 'outline', icon: Clock },
  in_process: { label: 'Processando', variant: 'secondary', icon: Clock },
  rejected: { label: 'Rejeitado', variant: 'destructive', icon: XCircle },
  cancelled: { label: 'Cancelado', variant: 'destructive', icon: XCircle },
  refunded: { label: 'Reembolsado', variant: 'outline', icon: XCircle },
};

const Pagamentos = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('payments')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setPayments(data as Payment[]);
    }
    setLoading(false);
  };

  const filtered = payments.filter(p =>
    p.student_name.toLowerCase().includes(search.toLowerCase()) ||
    p.student_email.toLowerCase().includes(search.toLowerCase()) ||
    p.course_title.toLowerCase().includes(search.toLowerCase())
  );

  const approvedCount = payments.filter(p => p.mp_status === 'approved').length;
  const pendingCount = payments.filter(p => p.mp_status === 'pending' || p.mp_status === 'in_process').length;
  const totalRevenue = payments.filter(p => p.mp_status === 'approved').reduce((sum, p) => sum + Number(p.amount), 0);

  const exportCSV = () => {
    const headers = ['Nome', 'Email', 'WhatsApp', 'Curso', 'Valor', 'Status', 'Método', 'Data Pagamento', 'Data Criação'];
    const rows = filtered.map(p => [
      p.student_name, p.student_email, p.student_whatsapp || '', p.course_title,
      `R$ ${Number(p.amount).toFixed(2).replace('.', ',')}`,
      statusMap[p.mp_status]?.label || p.mp_status,
      p.payment_method || '', p.paid_at ? new Date(p.paid_at).toLocaleDateString('pt-BR') : '',
      new Date(p.created_at).toLocaleDateString('pt-BR'),
    ]);
    const csv = [headers.join(';'), ...rows.map(r => r.join(';'))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'pagamentos.csv'; a.click();
    URL.revokeObjectURL(url);
  };

  const formatDate = (d: string) => new Date(d).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-bold text-foreground">Pagamentos</h1>
        <p className="text-muted-foreground text-sm">Matrículas pagas via Mercado Pago</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Receita aprovada</p>
              <p className="font-heading font-bold text-foreground">R$ {totalRevenue.toFixed(2).replace('.', ',')}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Pagamentos aprovados</p>
              <p className="font-heading font-bold text-foreground">{approvedCount}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-yellow-500/10 flex items-center justify-center">
              <Clock className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Pendentes</p>
              <p className="font-heading font-bold text-foreground">{pendingCount}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-4">
          <CardTitle className="text-lg">Lista de Pagamentos</CardTitle>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Buscar..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9 w-64" />
            </div>
            <Button variant="outline" size="sm" onClick={exportCSV} className="gap-2">
              <Download className="w-4 h-4" /> CSV
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-center text-muted-foreground py-8">Carregando...</p>
          ) : filtered.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">Nenhum pagamento encontrado</p>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Aluno</TableHead>
                    <TableHead>Curso</TableHead>
                    <TableHead>Valor</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead className="w-10"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map(p => {
                    const status = statusMap[p.mp_status] || { label: p.mp_status, variant: 'outline' as const, icon: Clock };
                    return (
                      <TableRow key={p.id}>
                        <TableCell>
                          <p className="font-medium text-foreground">{p.student_name}</p>
                          <p className="text-xs text-muted-foreground">{p.student_email}</p>
                        </TableCell>
                        <TableCell className="text-sm">{p.course_title}</TableCell>
                        <TableCell className="font-medium">R$ {Number(p.amount).toFixed(2).replace('.', ',')}</TableCell>
                        <TableCell>
                          <Badge variant={status.variant} className="gap-1">
                            <status.icon className="w-3 h-3" />
                            {status.label}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-xs text-muted-foreground">
                          {p.paid_at ? formatDate(p.paid_at) : formatDate(p.created_at)}
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="icon" onClick={() => setSelectedPayment(p)}>
                            <Eye className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={!!selectedPayment} onOpenChange={() => setSelectedPayment(null)}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Detalhes do Pagamento</DialogTitle>
          </DialogHeader>
          {selectedPayment && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div><p className="text-xs text-muted-foreground">Nome</p><p className="font-medium">{selectedPayment.student_name}</p></div>
                <div><p className="text-xs text-muted-foreground">Email</p><p className="font-medium">{selectedPayment.student_email}</p></div>
                <div><p className="text-xs text-muted-foreground">WhatsApp</p><p className="font-medium">{selectedPayment.student_whatsapp || '—'}</p></div>
                <div><p className="text-xs text-muted-foreground">Curso</p><p className="font-medium">{selectedPayment.course_title}</p></div>
                <div><p className="text-xs text-muted-foreground">Valor</p><p className="font-medium">R$ {Number(selectedPayment.amount).toFixed(2).replace('.', ',')}</p></div>
                <div><p className="text-xs text-muted-foreground">Método</p><p className="font-medium">{selectedPayment.payment_method || '—'}</p></div>
                <div><p className="text-xs text-muted-foreground">Status MP</p><p className="font-medium">{selectedPayment.mp_status}</p></div>
                <div><p className="text-xs text-muted-foreground">Detalhe</p><p className="font-medium">{selectedPayment.mp_status_detail || '—'}</p></div>
                <div><p className="text-xs text-muted-foreground">ID Pagamento MP</p><p className="font-medium text-xs">{selectedPayment.mp_payment_id || '—'}</p></div>
                <div><p className="text-xs text-muted-foreground">Data Pagamento</p><p className="font-medium">{selectedPayment.paid_at ? formatDate(selectedPayment.paid_at) : '—'}</p></div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Pagamentos;

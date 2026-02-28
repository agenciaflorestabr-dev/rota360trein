import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Trash2, Search, Download, Eye } from 'lucide-react';
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
      .eq('course_title', 'Cadastro Completo')
      .order('created_at', { ascending: false });
    if (!error && data) setSubmissions(data as Submission[]);
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
    const headers = ['Nome', 'Email', 'Telefone', 'CPF', 'CNH Registro', 'CNH Cat.', 'Nascimento', 'Rua', 'Nº', 'Bairro', 'Cidade', 'UF', 'CEP', 'Status', 'Data'];
    const rows = filtered.map(s => [s.name, s.email, s.phone ?? s.whatsapp, s.cpf ?? '', s.cnh_register ?? '', s.cnh_category ?? '', s.birth_date ?? '', s.street ?? '', s.number ?? '', s.neighborhood ?? '', s.city ?? '', s.state ?? '', s.cep ?? '', s.status, format(new Date(s.created_at), 'dd/MM/yyyy')]);
    const csv = [headers, ...rows].map(r => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'cadastros.csv'; a.click();
  };

  const filtered = submissions.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.email.toLowerCase().includes(search.toLowerCase()) ||
    (s.cpf ?? '').includes(search)
  );

  const statusLabel = (s: string) => {
    switch (s) {
      case 'pending': return 'Aguardando';
      case 'approved': return 'Aprovado';
      default: return s;
    }
  };

  const statusColor = (s: string) => {
    switch (s) {
      case 'pending': return 'bg-accent/20 text-accent-foreground';
      case 'approved': return 'bg-primary/20 text-primary';
      default: return '';
    }
  };

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold text-foreground">Cadastros</h1>
          <p className="text-muted-foreground text-sm">{submissions.length} alunos cadastrados</p>
        </div>
        <Button variant="outline" size="sm" onClick={exportCsv} className="gap-2">
          <Download className="w-4 h-4" /> Exportar CSV
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
        <Input placeholder="Buscar por nome, email ou CPF..." value={search} onChange={e => setSearch(e.target.value)} className="pl-10" />
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
                  <TableHead>Contato</TableHead>
                  <TableHead>CNH</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead className="w-[100px]" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map(s => (
                  <TableRow key={s.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium text-foreground">{s.name}</p>
                        <p className="text-xs text-muted-foreground">{s.cpf && `CPF: ${s.cpf}`}{s.city ? ` · ${s.city}` : ''}{s.state ? `/${s.state}` : ''}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <p className="text-sm">{s.email}</p>
                      <p className="text-xs text-muted-foreground">{s.phone ?? s.whatsapp}</p>
                    </TableCell>
                    <TableCell>
                      <p className="text-sm">{s.cnh_register ?? '—'}</p>
                      {s.cnh_category && <Badge variant="outline" className="text-xs mt-1">Cat. {s.cnh_category}</Badge>}
                    </TableCell>
                    <TableCell>
                      <Select value={s.status} onValueChange={v => updateStatus(s.id, v)}>
                        <SelectTrigger className={`h-8 w-[140px] ${statusColor(s.status)}`}>
                          <SelectValue>{statusLabel(s.status)}</SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Aguardando</SelectItem>
                          <SelectItem value="approved">Aprovado</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {format(new Date(s.created_at), 'dd/MM/yyyy')}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon" onClick={() => setSelected(s)} title="Ver detalhes">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => deleteSubmission(s.id)} className="text-destructive hover:text-destructive">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
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
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Detalhes do Cadastro</DialogTitle>
          </DialogHeader>
          {selected && (
            <div className="space-y-3 text-sm">
              <div className="grid grid-cols-2 gap-2">
                <div><span className="text-muted-foreground">Nome:</span><p className="font-medium">{selected.name}</p></div>
                <div><span className="text-muted-foreground">E-mail:</span><p className="font-medium">{selected.email}</p></div>
                <div><span className="text-muted-foreground">Telefone:</span><p className="font-medium">{selected.phone ?? selected.whatsapp}</p></div>
                <div><span className="text-muted-foreground">CPF:</span><p className="font-medium">{selected.cpf ?? '—'}</p></div>
                <div><span className="text-muted-foreground">Nascimento:</span><p className="font-medium">{selected.birth_date ?? '—'}</p></div>
                <div><span className="text-muted-foreground">CNH Registro:</span><p className="font-medium">{selected.cnh_register ?? '—'}</p></div>
                <div><span className="text-muted-foreground">CNH Categoria:</span><p className="font-medium">{selected.cnh_category ?? '—'}</p></div>
                <div><span className="text-muted-foreground">CEP:</span><p className="font-medium">{selected.cep ?? '—'}</p></div>
              </div>
              {(selected.street || selected.neighborhood) && (
                <div>
                  <span className="text-muted-foreground">Endereço:</span>
                  <p className="font-medium">{selected.street}{selected.number ? `, ${selected.number}` : ''}{selected.neighborhood ? ` - ${selected.neighborhood}` : ''}</p>
                  <p className="font-medium">{selected.city}{selected.state ? `/${selected.state}` : ''}{selected.cep ? ` - ${selected.cep}` : ''}</p>
                </div>
              )}
              <div>
                <span className="text-muted-foreground">Status:</span>
                <p className="font-medium">{statusLabel(selected.status)}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Data:</span>
                <p className="font-medium">{format(new Date(selected.created_at), 'dd/MM/yyyy HH:mm')}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Cadastros;

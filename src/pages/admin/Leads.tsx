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

interface Lead {
  id: string;
  name: string;
  email: string;
  whatsapp: string;
  city: string | null;
  state: string | null;
  course_title: string;
  status: string;
  created_at: string;
}

const Leads = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchLeads = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('form_submissions')
      .select('*')
      .neq('course_title', 'Cadastro Completo')
      .order('created_at', { ascending: false });
    if (!error && data) setLeads(data as Lead[]);
    setLoading(false);
  };

  useEffect(() => { fetchLeads(); }, []);

  const updateStatus = async (id: string, status: string) => {
    await supabase.from('form_submissions').update({ status }).eq('id', id);
    setLeads(prev => prev.map(s => s.id === id ? { ...s, status } : s));
    toast({ title: 'Status atualizado' });
  };

  const deleteLead = async (id: string) => {
    await supabase.from('form_submissions').delete().eq('id', id);
    setLeads(prev => prev.filter(s => s.id !== id));
    toast({ title: 'Lead removido' });
  };

  const exportCsv = () => {
    const headers = ['Nome', 'Email', 'WhatsApp', 'Cidade', 'UF', 'Curso', 'Status', 'Data'];
    const rows = filtered.map(s => [s.name, s.email, s.whatsapp, s.city ?? '', s.state ?? '', s.course_title, s.status, format(new Date(s.created_at), 'dd/MM/yyyy')]);
    const csv = [headers, ...rows].map(r => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'leads.csv'; a.click();
  };

  const filtered = leads.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.email.toLowerCase().includes(search.toLowerCase()) ||
    s.course_title.toLowerCase().includes(search.toLowerCase())
  );

  const statusLabel = (s: string) => {
    switch (s) {
      case 'pending': return 'Pendente';
      case 'contacted': return 'Contactado';
      case 'enrolled': return 'Matriculado';
      case 'cancelled': return 'Cancelado';
      default: return s;
    }
  };

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold text-foreground">Leads</h1>
          <p className="text-muted-foreground text-sm">{leads.length} interessados via cursos</p>
        </div>
        <Button variant="outline" size="sm" onClick={exportCsv} className="gap-2">
          <Download className="w-4 h-4" /> Exportar CSV
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
        <Input placeholder="Buscar por nome, email ou curso..." value={search} onChange={e => setSearch(e.target.value)} className="pl-10" />
      </div>

      <Card>
        <CardContent className="p-0">
          {loading ? (
            <div className="p-8 text-center text-muted-foreground">Carregando...</div>
          ) : filtered.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">Nenhum lead encontrado</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Contato</TableHead>
                  <TableHead>Curso</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead className="w-[60px]" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map(s => (
                  <TableRow key={s.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium text-foreground">{s.name}</p>
                        <p className="text-xs text-muted-foreground">{s.city}{s.state ? ` - ${s.state}` : ''}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <p className="text-sm">{s.email}</p>
                      <p className="text-xs text-muted-foreground">{s.whatsapp}</p>
                    </TableCell>
                    <TableCell>
                      <p className="text-sm">{s.course_title}</p>
                    </TableCell>
                    <TableCell>
                      <Select value={s.status} onValueChange={v => updateStatus(s.id, v)}>
                        <SelectTrigger className="h-8 w-[130px]">
                          <SelectValue>{statusLabel(s.status)}</SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pendente</SelectItem>
                          <SelectItem value="contacted">Contactado</SelectItem>
                          <SelectItem value="enrolled">Matriculado</SelectItem>
                          <SelectItem value="cancelled">Cancelado</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {format(new Date(s.created_at), 'dd/MM/yyyy')}
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon" onClick={() => deleteLead(s.id)} className="text-destructive hover:text-destructive">
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

export default Leads;

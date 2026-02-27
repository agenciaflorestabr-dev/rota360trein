import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Save, Trash2, Image, FileText } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';

interface ContentItem {
  id: string;
  section_key: string;
  content_type: string;
  value: string | null;
  updated_at: string;
}

const Conteudo = () => {
  const { user } = useAuth();
  const [items, setItems] = useState<ContentItem[]>([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ section_key: '', content_type: 'text', value: '' });
  const [editValues, setEditValues] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  const fetchContent = async () => {
    setLoading(true);
    const { data } = await supabase.from('site_content').select('*').order('section_key');
    if (data) {
      setItems(data);
      const vals: Record<string, string> = {};
      data.forEach(d => { vals[d.id] = d.value ?? ''; });
      setEditValues(vals);
    }
    setLoading(false);
  };

  useEffect(() => { fetchContent(); }, []);

  const addContent = async () => {
    if (!form.section_key) return;
    const { error } = await supabase.from('site_content').insert({
      section_key: form.section_key,
      content_type: form.content_type,
      value: form.value,
      updated_by: user?.id,
    });
    if (error) {
      toast({ title: 'Erro', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Conteúdo adicionado' });
      setForm({ section_key: '', content_type: 'text', value: '' });
      setOpen(false);
      fetchContent();
    }
  };

  const saveItem = async (item: ContentItem) => {
    const { error } = await supabase.from('site_content').update({ value: editValues[item.id], updated_by: user?.id }).eq('id', item.id);
    if (error) {
      toast({ title: 'Erro', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Conteúdo salvo' });
    }
  };

  const deleteItem = async (id: string) => {
    await supabase.from('site_content').delete().eq('id', id);
    setItems(prev => prev.filter(i => i.id !== id));
    toast({ title: 'Conteúdo removido' });
  };

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold text-foreground">Conteúdo do Site</h1>
          <p className="text-muted-foreground text-sm">Gerencie textos e imagens</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2"><Plus className="w-4 h-4" /> Novo Conteúdo</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Adicionar Conteúdo</DialogTitle></DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Chave da seção *</Label>
                <Input value={form.section_key} onChange={e => setForm(p => ({ ...p, section_key: e.target.value }))} placeholder="hero_titulo, sobre_descricao..." />
              </div>
              <div>
                <Label>Tipo</Label>
                <Select value={form.content_type} onValueChange={v => setForm(p => ({ ...p, content_type: v }))}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="text">Texto</SelectItem>
                    <SelectItem value="image">Imagem (URL)</SelectItem>
                    <SelectItem value="html">HTML</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Valor</Label>
                <Textarea value={form.value} onChange={e => setForm(p => ({ ...p, value: e.target.value }))} rows={4} />
              </div>
              <Button onClick={addContent} className="w-full">Adicionar</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {loading ? (
        <div className="p-8 text-center text-muted-foreground">Carregando...</div>
      ) : items.length === 0 ? (
        <Card><CardContent className="p-8 text-center text-muted-foreground">Nenhum conteúdo cadastrado. Adicione seções editáveis do site.</CardContent></Card>
      ) : (
        <div className="grid gap-4">
          {items.map(item => (
            <Card key={item.id}>
              <CardHeader className="flex flex-row items-center justify-between py-3 px-4">
                <div className="flex items-center gap-2">
                  {item.content_type === 'image' ? <Image className="w-4 h-4 text-primary" /> : <FileText className="w-4 h-4 text-primary" />}
                  <CardTitle className="text-sm font-medium">{item.section_key}</CardTitle>
                  <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded">{item.content_type}</span>
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" onClick={() => saveItem(item)}><Save className="w-4 h-4" /></Button>
                  <Button variant="ghost" size="icon" onClick={() => deleteItem(item.id)} className="text-destructive"><Trash2 className="w-4 h-4" /></Button>
                </div>
              </CardHeader>
              <CardContent className="px-4 pb-4 pt-0">
                {item.content_type === 'image' ? (
                  <div className="space-y-2">
                    <Input value={editValues[item.id] ?? ''} onChange={e => setEditValues(p => ({ ...p, [item.id]: e.target.value }))} placeholder="URL da imagem" />
                    {editValues[item.id] && <img src={editValues[item.id]} alt="" className="h-20 rounded object-cover" />}
                  </div>
                ) : (
                  <Textarea value={editValues[item.id] ?? ''} onChange={e => setEditValues(p => ({ ...p, [item.id]: e.target.value }))} rows={3} />
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Conteudo;

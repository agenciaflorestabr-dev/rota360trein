import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Save, RefreshCw } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { coursesDetailData } from '@/data/coursesData';

const PRICES_KEY = 'course_prices';

const Precos = () => {
  const [prices, setPrices] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  const courses = Object.entries(coursesDetailData).map(([slug, course]) => ({
    slug,
    title: course.title,
    defaultPrice: course.price ?? 0,
  }));

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase
        .from('site_content')
        .select('value')
        .eq('section_key', PRICES_KEY)
        .maybeSingle();

      if (data?.value) {
        try {
          const saved = JSON.parse(data.value);
          setPrices(saved);
        } catch {
          // Initialize with defaults
          const defaults: Record<string, string> = {};
          courses.forEach(c => { defaults[c.slug] = c.defaultPrice.toFixed(2); });
          setPrices(defaults);
        }
      } else {
        const defaults: Record<string, string> = {};
        courses.forEach(c => { defaults[c.slug] = c.defaultPrice.toFixed(2); });
        setPrices(defaults);
      }
      setLoading(false);
    };
    load();
  }, []);

  const handlePriceChange = (slug: string, value: string) => {
    // Allow only numbers and dots/commas
    const cleaned = value.replace(/[^0-9.,]/g, '').replace(',', '.');
    setPrices(prev => ({ ...prev, [slug]: cleaned }));
  };

  const saveAll = async () => {
    setSaving(true);
    try {
      const { data: existing } = await supabase
        .from('site_content')
        .select('id')
        .eq('section_key', PRICES_KEY)
        .maybeSingle();

      const jsonValue = JSON.stringify(prices);

      if (existing) {
        await supabase.from('site_content').update({ value: jsonValue }).eq('section_key', PRICES_KEY);
      } else {
        await supabase.from('site_content').insert({ section_key: PRICES_KEY, content_type: 'json', value: jsonValue });
      }

      toast({ title: '✅ Preços salvos com sucesso!', description: 'Os novos valores serão cobrados nas próximas matrículas.' });
    } catch (error: any) {
      toast({ title: 'Erro ao salvar', description: error.message, variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };

  const formatBRL = (value: string) => {
    const num = parseFloat(value);
    if (isNaN(num)) return '—';
    return `R$ ${num.toFixed(2).replace('.', ',')}`;
  };

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center">
        <RefreshCw className="w-5 h-5 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold text-foreground">Preços dos Cursos</h1>
          <p className="text-muted-foreground text-sm">Altere os valores cobrados na matrícula via Mercado Pago</p>
        </div>
        <Button onClick={saveAll} disabled={saving} className="gap-2">
          {saving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          {saving ? 'Salvando...' : 'Salvar Todos'}
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Lista de Cursos</CardTitle>
          <CardDescription>Edite o valor de cada curso. O valor salvo será o cobrado no Mercado Pago.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50%]">Curso</TableHead>
                  <TableHead>Preço Padrão</TableHead>
                  <TableHead>Preço Atual</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {courses.map(course => (
                  <TableRow key={course.slug}>
                    <TableCell>
                      <p className="font-medium text-foreground text-sm">{course.title}</p>
                      <p className="text-xs text-muted-foreground">{course.slug}</p>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {formatBRL(course.defaultPrice.toFixed(2))}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <span className="text-sm text-muted-foreground">R$</span>
                        <Input
                          value={prices[course.slug] || ''}
                          onChange={e => handlePriceChange(course.slug, e.target.value)}
                          className="w-28 text-right"
                          placeholder="0.00"
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Precos;

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Users, FileText, CreditCard, TrendingUp, DollarSign, BookOpen } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend } from 'recharts';
import { format, subDays, startOfDay } from 'date-fns';
import { ptBR } from 'date-fns/locale';

type Submission = { created_at: string; status: string; course_title: string };
type Payment = { created_at: string; mp_status: string; amount: number; course_title: string };

const COLORS = ['hsl(var(--primary))', 'hsl(var(--accent-orange))', 'hsl(var(--secondary))', 'hsl(var(--whatsapp))', 'hsl(var(--muted-foreground))'];

const Analytics = () => {
  const [loading, setLoading] = useState(true);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [messagesCount, setMessagesCount] = useState(0);

  useEffect(() => {
    const load = async () => {
      const since = subDays(new Date(), 29).toISOString();
      const [subRes, payRes, msgRes] = await Promise.all([
        supabase.from('form_submissions').select('created_at, status, course_title').gte('created_at', since),
        supabase.from('payments').select('created_at, mp_status, amount, course_title').gte('created_at', since),
        supabase.from('messages').select('*', { count: 'exact', head: true }),
      ]);
      setSubmissions((subRes.data as Submission[]) || []);
      setPayments((payRes.data as Payment[]) || []);
      setMessagesCount(msgRes.count || 0);
      setLoading(false);
    };
    load();
  }, []);

  // Daily submissions over last 30 days
  const dailyData = Array.from({ length: 30 }).map((_, i) => {
    const day = startOfDay(subDays(new Date(), 29 - i));
    const dayStr = format(day, 'yyyy-MM-dd');
    const cadastros = submissions.filter(s => s.created_at.startsWith(dayStr)).length;
    const pagamentos = payments.filter(p => p.created_at.startsWith(dayStr) && p.mp_status === 'approved').length;
    return { date: format(day, 'dd/MM', { locale: ptBR }), cadastros, pagamentos };
  });

  // Status breakdown
  const statusCounts = submissions.reduce((acc, s) => {
    acc[s.status] = (acc[s.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  const statusData = Object.entries(statusCounts).map(([name, value]) => ({ name, value }));

  // Top courses
  const courseCounts = submissions.reduce((acc, s) => {
    acc[s.course_title] = (acc[s.course_title] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  const courseData = Object.entries(courseCounts)
    .map(([name, value]) => ({ name: name.length > 25 ? name.slice(0, 25) + '…' : name, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 6);

  // KPIs
  const totalSubs = submissions.length;
  const approvedPayments = payments.filter(p => p.mp_status === 'approved');
  const revenue = approvedPayments.reduce((sum, p) => sum + Number(p.amount || 0), 0);
  const conversionRate = totalSubs > 0 ? Math.round((approvedPayments.length / totalSubs) * 100) : 0;

  const kpis = [
    { title: 'Cadastros (30d)', value: totalSubs, icon: Users, color: 'text-primary' },
    { title: 'Pagamentos Aprovados', value: approvedPayments.length, icon: CreditCard, color: 'text-whatsapp' },
    { title: 'Receita (30d)', value: `R$ ${revenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`, icon: DollarSign, color: 'text-accent-orange' },
    { title: 'Taxa de Conversão', value: `${conversionRate}%`, icon: TrendingUp, color: 'text-secondary' },
    { title: 'Mensagens Enviadas', value: messagesCount, icon: FileText, color: 'text-primary' },
    { title: 'Cursos Distintos', value: Object.keys(courseCounts).length, icon: BookOpen, color: 'text-secondary' },
  ];

  if (loading) {
    return <div className="p-6 text-muted-foreground">Carregando analytics...</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-bold text-foreground">Analytics</h1>
        <p className="text-muted-foreground text-sm">Métricas dos últimos 30 dias</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {kpis.map(k => (
          <Card key={k.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{k.title}</CardTitle>
              <k.icon className={`w-5 h-5 ${k.color}`} />
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-heading font-bold text-foreground">{k.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Cadastros e Pagamentos por dia</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{ cadastros: { label: 'Cadastros', color: 'hsl(var(--primary))' }, pagamentos: { label: 'Pagamentos', color: 'hsl(var(--whatsapp))' } }} className="h-[300px] w-full">
              <LineChart data={dailyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" tick={{ fontSize: 11 }} interval={3} />
                <YAxis tick={{ fontSize: 11 }} allowDecimals={false} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend />
                <Line type="monotone" dataKey="cadastros" stroke="hsl(var(--primary))" strokeWidth={2} />
                <Line type="monotone" dataKey="pagamentos" stroke="hsl(var(--whatsapp))" strokeWidth={2} />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Status dos Cadastros</CardTitle>
          </CardHeader>
          <CardContent>
            {statusData.length === 0 ? (
              <p className="text-muted-foreground text-sm">Sem dados</p>
            ) : (
              <ChartContainer config={{}} className="h-[300px] w-full">
                <PieChart>
                  <Pie data={statusData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                    {statusData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                </PieChart>
              </ChartContainer>
            )}
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Cursos mais procurados</CardTitle>
          </CardHeader>
          <CardContent>
            {courseData.length === 0 ? (
              <p className="text-muted-foreground text-sm">Sem dados</p>
            ) : (
              <ChartContainer config={{ value: { label: 'Cadastros', color: 'hsl(var(--primary))' } }} className="h-[320px] w-full">
                <BarChart data={courseData} layout="vertical" margin={{ left: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" tick={{ fontSize: 11 }} allowDecimals={false} />
                  <YAxis type="category" dataKey="name" tick={{ fontSize: 11 }} width={200} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="value" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ChartContainer>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;

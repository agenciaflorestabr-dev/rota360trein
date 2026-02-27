import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, MessageSquare, FileText, TrendingUp } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const Dashboard = () => {
  const [stats, setStats] = useState({ submissions: 0, messages: 0, pending: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      const [{ count: submissions }, { count: messages }, { count: pending }] = await Promise.all([
        supabase.from('form_submissions').select('*', { count: 'exact', head: true }),
        supabase.from('messages').select('*', { count: 'exact', head: true }),
        supabase.from('form_submissions').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
      ]);
      setStats({ submissions: submissions ?? 0, messages: messages ?? 0, pending: pending ?? 0 });
    };
    fetchStats();
  }, []);

  const cards = [
    { title: 'Total de Cadastros', value: stats.submissions, icon: Users, color: 'text-primary' },
    { title: 'Pendentes', value: stats.pending, icon: FileText, color: 'text-accent-orange' },
    { title: 'Mensagens Enviadas', value: stats.messages, icon: MessageSquare, color: 'text-secondary' },
    { title: 'Taxa de Conversão', value: stats.submissions > 0 ? `${Math.round(((stats.submissions - stats.pending) / stats.submissions) * 100)}%` : '0%', icon: TrendingUp, color: 'text-whatsapp' },
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground text-sm">Visão geral do sistema</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map(card => (
          <Card key={card.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{card.title}</CardTitle>
              <card.icon className={`w-5 h-5 ${card.color}`} />
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-heading font-bold text-foreground">{card.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;

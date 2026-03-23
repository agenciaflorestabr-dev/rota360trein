import { useSearchParams, Link } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CheckCircle2, XCircle, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

const statusConfig = {
  sucesso: {
    icon: CheckCircle2,
    iconClass: 'text-green-500',
    bgClass: 'bg-green-500/10',
    title: 'Pagamento Aprovado! 🎉',
    description: 'Sua matrícula foi confirmada com sucesso. Você receberá os dados de acesso ao curso por e-mail e WhatsApp em breve.',
  },
  erro: {
    icon: XCircle,
    iconClass: 'text-destructive',
    bgClass: 'bg-destructive/10',
    title: 'Pagamento não aprovado',
    description: 'Infelizmente seu pagamento não foi aprovado. Tente novamente ou entre em contato conosco pelo WhatsApp.',
  },
  pendente: {
    icon: Clock,
    iconClass: 'text-yellow-500',
    bgClass: 'bg-yellow-500/10',
    title: 'Pagamento Pendente',
    description: 'Seu pagamento está sendo processado. Assim que for confirmado, você receberá uma notificação.',
  },
};

const PagamentoStatus = () => {
  const [searchParams] = useSearchParams();
  const pathname = window.location.pathname;
  const type = pathname.includes('sucesso') ? 'sucesso' : pathname.includes('erro') ? 'erro' : 'pendente';
  const config = statusConfig[type];
  const Icon = config.icon;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container-custom mx-auto px-4 max-w-lg text-center space-y-6">
          <div className={`w-20 h-20 rounded-full ${config.bgClass} flex items-center justify-center mx-auto`}>
            <Icon className={`w-10 h-10 ${config.iconClass}`} />
          </div>
          <h1 className="font-heading text-3xl font-bold text-foreground">{config.title}</h1>
          <p className="text-muted-foreground">{config.description}</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
            <Button asChild>
              <Link to="/cursos">Ver outros cursos</Link>
            </Button>
            <Button variant="outline" asChild>
              <a href="https://wa.me/5511999999999" target="_blank" rel="noopener noreferrer">
                Falar no WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PagamentoStatus;

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { WhatsAppFloat } from '@/components/WhatsAppFloat';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import advogadoPhoto from '@/assets/advogado.jpg';
import { 
  Phone, 
  ArrowRight, 
  FileWarning, 
  Ban, 
  XCircle, 
  ShieldAlert,
  Scale,
  FileText,
  AlertTriangle,
  CheckCircle2
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const services = [
  {
    icon: FileWarning,
    title: 'Recurso de Multa',
    description: 'Análise detalhada e elaboração de recursos administrativos contra multas de trânsito indevidas.',
    details: [
      'Análise de viabilidade do recurso',
      'Elaboração de defesa técnica',
      'Acompanhamento do processo',
      'Recursos em todas as instâncias',
    ],
  },
  {
    icon: Ban,
    title: 'Suspensão da CNH',
    description: 'Defesa especializada para evitar ou reverter a suspensão do seu direito de dirigir.',
    details: [
      'Defesa prévia administrativa',
      'Recursos ao CETRAN',
      'Mandado de segurança',
      'Medidas de urgência',
    ],
  },
  {
    icon: XCircle,
    title: 'Cassação da CNH',
    description: 'Atuação técnica em processos de cassação do documento de habilitação.',
    details: [
      'Defesa em processos de cassação',
      'Recursos administrativos',
      'Ações judiciais',
      'Reabilitação do condutor',
    ],
  },
  {
    icon: ShieldAlert,
    title: 'Defesa Administrativa',
    description: 'Acompanhamento completo em todos os processos administrativos no DETRAN.',
    details: [
      'Defesa de autuação',
      'Indicação de condutor',
      'Processos de pontuação',
      'Regularização de documentos',
    ],
  },
  {
    icon: Scale,
    title: 'Ações Judiciais',
    description: 'Representação judicial em casos que exigem intervenção do Poder Judiciário.',
    details: [
      'Mandado de segurança',
      'Ações anulatórias',
      'Indenizações',
      'Defesa criminal de trânsito',
    ],
  },
  {
    icon: FileText,
    title: 'Consultoria Preventiva',
    description: 'Orientação especializada para evitar problemas futuros com a legislação de trânsito.',
    details: [
      'Análise de situação',
      'Orientação sobre pontuação',
      'Planejamento de defesa',
      'Acompanhamento contínuo',
    ],
  },
];

const stats = [
  { value: '500+', label: 'Casos resolvidos' },
  { value: '95%', label: 'Taxa de sucesso' },
  { value: '10+', label: 'Anos de experiência' },
  { value: '24h', label: 'Resposta rápida' },
];

const Advocacia = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="pt-24 pb-16 bg-gradient-to-br from-primary/10 via-background to-secondary/10 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-accent" />
          <div className="absolute top-20 left-10 w-32 h-32 border-4 border-primary/20 -rotate-12" />
          <div className="absolute bottom-10 right-10 w-24 h-24 bg-accent/10 rounded-full" />
          
          <div className="container-custom mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto"
            >
              <div className="inline-flex items-center gap-3 mb-4">
                <div className="w-8 h-1 bg-primary" />
                <span className="text-primary font-semibold text-sm uppercase tracking-wider">
                  Advocacia Especializada
                </span>
                <div className="w-8 h-1 bg-primary" />
              </div>
              
              <h1 className="font-heading text-4xl md:text-5xl text-foreground font-bold mb-6">
                Defesa Jurídica em Trânsito
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Especialistas em evitar a suspensão ou cassação da carteira de motorista 
                por excesso de pontos e anular multas ilegais.
              </p>
              
              <Button variant="whatsapp" size="xl" className="gap-2" asChild>
                <a href="https://wa.me/5518996067947" target="_blank" rel="noopener noreferrer">
                  <Phone className="w-5 h-5" />
                  Analisar meu caso
                </a>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Lead Lawyer Section */}
        <section className="section-padding bg-background">
          <div className="container-custom mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Photo */}
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative"
              >
                <div className="aspect-[3/4] rounded-2xl bg-muted overflow-hidden shadow-card relative">
                  <img src={advogadoPhoto} alt="Dr. Luiz Francisco Zogheib Fernandes - Advogado" className="w-full h-full object-cover" />
                </div>
                {/* Decorative accent */}
                <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-primary/10 rounded-2xl -z-10" />
                <div className="absolute -top-4 -left-4 w-24 h-24 border-4 border-accent/20 rounded-2xl -z-10" />
              </motion.div>

              {/* Info */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-1 bg-primary" />
                  <span className="text-primary font-semibold text-sm uppercase tracking-wider">
                    Advogado Responsável
                  </span>
                </div>

                <h2 className="font-heading text-3xl md:text-4xl text-foreground font-bold mb-2">
                  Dr. Luiz Francisco Zogheib Fernandes
                </h2>
                <p className="text-primary font-semibold mb-1">OAB/SP 171.131</p>
                <p className="text-muted-foreground font-medium mb-4">Sócio — Zogheib Fernandes Advogados</p>

                <p className="text-muted-foreground leading-relaxed mb-6">
                  Somos especialistas em evitar a suspensão ou cassação da carteira de motorista 
                  por excesso de pontos e anular multas ilegais. Conte com uma equipe jurídica 
                  focada em proteger o seu direito de dirigir.
                </p>


                <Button variant="whatsapp" size="lg" className="gap-2" asChild>
                   <a href="https://wa.me/5518996067947" target="_blank" rel="noopener noreferrer">
                    <Phone className="w-4 h-4" />
                    Falar com o advogado
                  </a>
                </Button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-12 bg-primary text-primary-foreground">
          <div className="container-custom mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="font-heading text-3xl md:text-4xl font-bold mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm opacity-80">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section ref={ref} className="section-padding bg-section-light">
          <div className="container-custom mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h2 className="font-heading text-3xl md:text-4xl text-foreground font-bold mb-4">
                Nossos Serviços
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Atuamos em todas as áreas do direito de trânsito, oferecendo 
                soluções completas para proteger seus direitos.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
              {services.map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 40 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group relative bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-500 hover:-translate-y-2"
                >
                  {/* Top accent gradient */}
                  <div className="h-1.5 bg-gradient-to-r from-primary to-primary-light group-hover:from-secondary group-hover:to-primary transition-all duration-500" />
                  
                  <div className="p-7">
                    {/* Icon */}
                    <div className="w-14 h-14 rounded-2xl bg-primary/8 border border-primary/15 flex items-center justify-center mb-5 group-hover:bg-primary group-hover:border-primary group-hover:scale-110 transition-all duration-400">
                      <service.icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
                    </div>
                    
                    <h3 className="font-heading font-bold text-xl text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-5 leading-relaxed">
                      {service.description}
                    </p>
                    
                    {/* Details checklist */}
                    <div className="space-y-2.5 mb-6">
                      {service.details.map((detail) => (
                        <div key={detail} className="flex items-center gap-2.5 text-sm text-muted-foreground">
                          <div className="w-5 h-5 rounded-full bg-secondary/15 flex items-center justify-center flex-shrink-0">
                            <CheckCircle2 className="w-3.5 h-3.5 text-secondary" />
                          </div>
                          <span>{detail}</span>
                        </div>
                      ))}
                    </div>
                    
                    {/* CTA Button */}
                    <Button variant="outline" className="w-full gap-2 group/btn border-primary/20 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300" asChild>
                      <a href="https://wa.me/556696067881" target="_blank" rel="noopener noreferrer">
                        <Phone className="w-4 h-4" />
                        Consultar
                        <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                      </a>
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Alert Section */}
        <section className="section-padding bg-accent/10">
          <div className="container-custom mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-background rounded-2xl p-8 md:p-12 shadow-card text-center"
            >
              <AlertTriangle className="w-16 h-16 mx-auto mb-6 text-accent" />
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-4">
                Recebeu uma notificação de multa ou suspensão?
              </h2>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                Não perca os prazos! Entre em contato imediatamente para uma análise 
                gratuita do seu caso. Quanto antes agirmos, maiores as chances de sucesso.
              </p>
              <Button variant="whatsapp" size="xl" className="gap-2" asChild>
                <a href="https://wa.me/556696067881" target="_blank" rel="noopener noreferrer">
                  <Phone className="w-5 h-5" />
                  Análise gratuita agora
                  <ArrowRight className="w-5 h-5" />
                </a>
              </Button>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
};

export default Advocacia;

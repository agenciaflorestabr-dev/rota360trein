import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { WhatsAppFloat } from '@/components/WhatsAppFloat';
import { PhotoGallery } from '@/components/PhotoGallery';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { 
  Phone, 
  ArrowRight, 
  Truck, 
  Users, 
  Building2, 
  GraduationCap,
  Shield,
  Target,
  CheckCircle2,
  Calendar
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import cardTraining from '@/assets/card-training.jpg';

const trainings = [
  {
    icon: Truck,
    title: 'Direção Defensiva',
    description: 'Capacitação completa em técnicas de direção defensiva para motoristas profissionais.',
    duration: '8 horas',
    modality: 'Presencial ou EAD',
    audience: 'Motoristas profissionais',
    topics: [
      'Técnicas de prevenção de acidentes',
      'Legislação de trânsito',
      'Primeiros socorros',
      'Comportamento seguro',
    ],
  },
  {
    icon: Building2,
    title: 'Treinamento Empresarial',
    description: 'Programas personalizados de capacitação para frotas corporativas.',
    duration: 'Personalizado',
    modality: 'In Company',
    audience: 'Empresas e frotas',
    topics: [
      'Análise de perfil de condutores',
      'Redução de sinistralidade',
      'Economia de combustível',
      'Manutenção preventiva',
    ],
  },
  {
    icon: GraduationCap,
    title: 'Palestras Educativas',
    description: 'Palestras sobre segurança no trânsito para escolas, empresas e eventos.',
    duration: '1-2 horas',
    modality: 'Presencial',
    audience: 'Escolas e empresas',
    topics: [
      'Educação no trânsito',
      'Responsabilidade do condutor',
      'Impactos dos acidentes',
      'Mobilidade urbana',
    ],
  },
  {
    icon: Shield,
    title: 'Transporte de Cargas',
    description: 'Treinamento especializado para motoristas de transporte de cargas.',
    duration: '16 horas',
    modality: 'Presencial',
    audience: 'Transportadores',
    topics: [
      'Amarração de cargas',
      'Legislação específica',
      'Segurança na estrada',
      'Documentação',
    ],
  },
  {
    icon: Users,
    title: 'Transporte de Passageiros',
    description: 'Capacitação para condutores de transporte coletivo de passageiros.',
    duration: '16 horas',
    modality: 'Presencial',
    audience: 'Motoristas de ônibus',
    topics: [
      'Atendimento ao passageiro',
      'Acessibilidade',
      'Condução segura',
      'Situações de emergência',
    ],
  },
  {
    icon: Target,
    title: 'Reciclagem para Condutores',
    description: 'Atualização e reciclagem para motoristas que precisam renovar conhecimentos.',
    duration: '30 horas',
    modality: 'EAD ou Presencial',
    audience: 'Condutores em geral',
    topics: [
      'Atualização da legislação',
      'Novas tecnologias',
      'Direção econômica',
      'Meio ambiente',
    ],
  },
];

const benefits = [
  'Instrutores qualificados e certificados',
  'Material didático atualizado',
  'Certificado reconhecido',
  'Flexibilidade de horários',
  'Turmas reduzidas',
  'Suporte pós-treinamento',
];

const Treinamentos = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="pt-24 pb-16 bg-gradient-to-br from-secondary/10 via-background to-primary/10 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-accent" />
          <div className="absolute top-20 right-20 w-40 h-40 border-4 border-secondary/20 rotate-45" />
          <div className="absolute bottom-20 left-10 w-20 h-20 bg-primary/10 rounded-full" />
          
          <div className="container-custom mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="inline-flex items-center gap-3 mb-4">
                  <div className="w-8 h-1 bg-secondary" />
                  <span className="text-secondary font-semibold text-sm uppercase tracking-wider">
                    Capacitação Profissional
                  </span>
                </div>
                
                <h1 className="font-heading text-4xl md:text-5xl text-foreground font-bold mb-6">
                  Treinamentos e Capacitações
                </h1>
                <p className="text-lg text-muted-foreground mb-8">
                  Desenvolvemos programas de treinamento personalizados para motoristas 
                  profissionais, empresas e instituições. Segurança e qualificação em primeiro lugar.
                </p>
                
                <div className="flex flex-wrap gap-4">
                  <Button variant="whatsapp" size="xl" className="gap-2" asChild>
                    <a href="https://wa.me/5500000000000" target="_blank" rel="noopener noreferrer">
                      <Phone className="w-5 h-5" />
                      Solicitar orçamento
                    </a>
                  </Button>
                  <Button variant="outline" size="xl" className="gap-2" asChild>
                    <a href="#treinamentos">
                      <Calendar className="w-5 h-5" />
                      Ver calendário
                    </a>
                  </Button>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative"
              >
                <div className="rounded-2xl overflow-hidden shadow-card">
                  <img
                    src={cardTraining}
                    alt="Treinamento"
                    className="w-full h-80 object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 bg-primary text-primary-foreground p-4 rounded-xl shadow-lg">
                  <div className="font-heading text-2xl font-bold">1000+</div>
                  <div className="text-sm opacity-90">Profissionais capacitados</div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-12 bg-secondary text-secondary-foreground">
          <div className="container-custom mx-auto">
            <div className="flex flex-wrap justify-center gap-6 md:gap-12">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-center gap-2"
                >
                  <CheckCircle2 className="w-5 h-5" />
                  <span className="text-sm font-medium">{benefit}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Trainings Grid */}
        <section id="treinamentos" ref={ref} className="section-padding bg-section-light">
          <div className="container-custom mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h2 className="font-heading text-3xl md:text-4xl text-foreground font-bold mb-4">
                Nossos Treinamentos
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Programas desenvolvidos para atender diferentes necessidades e públicos, 
                sempre com foco em segurança e qualidade.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {trainings.map((training, index) => (
                <motion.div
                  key={training.title}
                  initial={{ opacity: 0, y: 40 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-background rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all duration-300 group"
                >
                  <div className="w-14 h-14 rounded-xl bg-secondary/10 flex items-center justify-center mb-4 group-hover:bg-secondary group-hover:scale-110 transition-all duration-300">
                    <training.icon className="w-7 h-7 text-secondary group-hover:text-secondary-foreground transition-colors" />
                  </div>
                  
                  <h3 className="font-heading font-bold text-xl text-foreground mb-2">
                    {training.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {training.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full font-medium">
                      {training.duration}
                    </span>
                    <span className="px-3 py-1 bg-secondary/10 text-secondary text-xs rounded-full font-medium">
                      {training.modality}
                    </span>
                  </div>
                  
                  <div className="space-y-2 mb-6">
                    {training.topics.map((topic) => (
                      <div key={topic} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0" />
                        <span>{topic}</span>
                      </div>
                    ))}
                  </div>
                  
                  <Button variant="default" className="w-full gap-2 group/btn" asChild>
                    <a href="https://wa.me/5500000000000" target="_blank" rel="noopener noreferrer">
                      Saber mais
                      <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                    </a>
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Registros de Palestras */}
        <section className="section-padding bg-section-light">
          <div className="container-custom mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <div className="inline-flex items-center gap-3 mb-4">
                <div className="w-8 h-1 bg-secondary" />
                <span className="text-secondary font-semibold text-sm uppercase tracking-wider">
                  Registros
                </span>
                <div className="w-8 h-1 bg-secondary" />
              </div>
              <h2 className="font-heading text-3xl md:text-4xl text-foreground font-bold mb-4">
                Nossas Palestras
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Confira registros das palestras e eventos que já realizamos por todo o país.
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: item * 0.05 }}
                  className="aspect-square rounded-xl bg-muted border-2 border-dashed border-muted-foreground/20 flex flex-col items-center justify-center gap-2 text-muted-foreground/50"
                >
                  <GraduationCap className="w-8 h-8" />
                  <span className="text-xs font-medium">Foto {item}</span>
                </motion.div>
              ))}
            </div>
            <p className="text-center text-sm text-muted-foreground mt-6">
              Envie suas fotos de palestras para preencher esta galeria.
            </p>
          </div>
        </section>

        {/* Histórico de Clientes */}
        <section className="section-padding bg-background">
          <div className="container-custom mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <div className="inline-flex items-center gap-3 mb-4">
                <div className="w-8 h-1 bg-primary" />
                <span className="text-primary font-semibold text-sm uppercase tracking-wider">
                  Nossos Clientes
                </span>
                <div className="w-8 h-1 bg-primary" />
              </div>
              <h2 className="font-heading text-3xl md:text-4xl text-foreground font-bold mb-4">
                Empresas que Confiam em Nós
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Conheça algumas das empresas e equipes que já passaram pelos nossos treinamentos.
              </p>
            </motion.div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 mb-12">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: item * 0.08 }}
                  className="aspect-[3/2] rounded-xl bg-muted border-2 border-dashed border-muted-foreground/20 flex flex-col items-center justify-center gap-2 text-muted-foreground/50 hover:border-primary/30 hover:bg-primary/5 transition-colors"
                >
                  <Building2 className="w-8 h-8" />
                  <span className="text-xs font-medium">Logo {item}</span>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="font-heading text-2xl text-foreground font-bold mb-6 text-center">
                Equipes Capacitadas
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((item) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: item * 0.1 }}
                    className="rounded-2xl overflow-hidden shadow-card bg-card"
                  >
                    <div className="aspect-video bg-muted border-2 border-dashed border-muted-foreground/20 flex flex-col items-center justify-center gap-2 text-muted-foreground/50">
                      <Users className="w-10 h-10" />
                      <span className="text-sm font-medium">Foto da equipe {item}</span>
                    </div>
                    <div className="p-4">
                      <h4 className="font-heading font-semibold text-foreground mb-1">Nome da Empresa {item}</h4>
                      <p className="text-sm text-muted-foreground">Treinamento realizado • Mês/Ano</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <p className="text-center text-sm text-muted-foreground mt-8">
              Envie logos e fotos das equipes para preencher esta seção.
            </p>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-padding bg-gradient-to-r from-primary to-secondary text-primary-foreground">
          <div className="container-custom mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
                Treinamento personalizado para sua empresa
              </h2>
              <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
                Desenvolvemos programas sob medida para atender as necessidades específicas 
                da sua frota. Entre em contato para um orçamento sem compromisso.
              </p>
              <Button variant="secondary" size="xl" className="gap-2" asChild>
                <a href="https://wa.me/5500000000000" target="_blank" rel="noopener noreferrer">
                  <Phone className="w-5 h-5" />
                  Solicitar proposta
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

export default Treinamentos;

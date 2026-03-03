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
  Calendar,
  Flame
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import cardTraining from '@/assets/card-training.jpg';
import training1 from '@/assets/training-1.jpg';
import training2 from '@/assets/training-2.jpg';
import training3 from '@/assets/training-3.jpg';
import training4 from '@/assets/training-4.jpg';
import training5 from '@/assets/training-5.jpg';
import training6 from '@/assets/training-6.jpg';
import training7 from '@/assets/training-7.jpg';
import training8 from '@/assets/training-8.jpg';
import training9 from '@/assets/training-9.jpg';
import trainingDirecaoDefensiva from '@/assets/training-direcao-defensiva.jpg';
import trainingEmpresarial from '@/assets/training-empresarial.jpg';
import trainingPalestras from '@/assets/training-palestras.jpg';
import trainingTransporteCargas from '@/assets/training-transporte-cargas.jpg';
import trainingTransportePassageiros from '@/assets/training-transporte-passageiros.jpg';
import trainingReciclagemCondutores from '@/assets/training-reciclagem-condutores.jpg';
import trainingBrigadaIncendio from '@/assets/training-brigada-incendio.jpg';

const trainings = [
  {
    icon: Truck,
    title: 'Direção Defensiva',
    description: 'Capacitação completa em técnicas de direção defensiva para motoristas profissionais.',
    image: trainingDirecaoDefensiva,
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
    image: trainingEmpresarial,
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
    image: trainingPalestras,
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
    image: trainingTransporteCargas,
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
    image: trainingTransportePassageiros,
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
    image: trainingReciclagemCondutores,
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
  {
    icon: Flame,
    title: 'Brigada de Incêndio',
    description: 'Formação e treinamento de brigada de incêndio conforme NR-23 e NBR 14276.',
    image: trainingBrigadaIncendio,
    duration: '8-20 horas',
    modality: 'Presencial',
    audience: 'Empresas e funcionários',
    topics: [
      'Prevenção e combate a incêndio',
      'Uso de extintores e hidrantes',
      'Primeiros socorros',
      'Plano de evacuação e abandono de área',
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
                    <a href="https://wa.me/556696067881" target="_blank" rel="noopener noreferrer">
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
                  className="bg-background rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 group"
                >
                  <div className="relative h-44 overflow-hidden">
                    <img src={training.image} alt={training.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    <div className="absolute top-3 left-3 w-10 h-10 rounded-lg bg-secondary/90 flex items-center justify-center">
                      <training.icon className="w-5 h-5 text-secondary-foreground" />
                    </div>
                  </div>
                  
                  <div className="p-6">
                  
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
                    <a href="https://wa.me/556696067881" target="_blank" rel="noopener noreferrer">
                      Saber mais
                      <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                    </a>
                  </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Galeria de Treinamentos */}
        <PhotoGallery
          title="Treinamentos Realizados"
          subtitle="Confira registros dos treinamentos e capacitações que já realizamos em campo."
          photos={[
            { src: training1, alt: 'Treinamento de operação de escavadeira hidráulica' },
            { src: training2, alt: 'Instrutor orientando operador de máquinas pesadas' },
            { src: training3, alt: 'Treinamento prático com operador em escavadeira' },
            { src: training4, alt: 'Equipe de treinamento em campo com escavadeira SANY' },
            { src: training5, alt: 'Caminhão Comber utilizado em treinamento de transporte de cargas' },
            { src: training6, alt: 'Treinamento de Brigada de Incêndio NR20 e NR23 na Fazenda' },
            { src: training7, alt: 'Entrega de certificados de treinamento na fazenda' },
            { src: training8, alt: 'Equipe capacitada com certificados de conclusão' },
            { src: training9, alt: 'Turma de treinamento com entrega de certificados' },
          ]}
        />


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
                <a href="https://wa.me/556696067881" target="_blank" rel="noopener noreferrer">
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

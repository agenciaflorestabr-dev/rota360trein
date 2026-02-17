import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { WhatsAppFloat } from '@/components/WhatsAppFloat';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Phone, ArrowRight, Clock, Users, CheckCircle, Award, Cog, RefreshCw, Recycle, Flame, Bus, Siren, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import cardCnh from '@/assets/card-cnh.jpg';
import cardTraining from '@/assets/card-training.jpg';

interface Course {
  title: string;
  description: string;
  image: string;
  duration: string;
  students: string;
  features: string[];
}

interface Module {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
  courses: Course[];
}

const modules: Module[] = [
  {
    id: 'maquinas-pesadas',
    title: 'Máquinas Pesadas',
    icon: <Cog className="w-5 h-5" />,
    description: 'Habilitação para operação de máquinas e equipamentos especiais',
    courses: [
      {
        title: 'Operador de Empilhadeira',
        description: 'Formação completa para operação segura de empilhadeiras.',
        image: cardTraining,
        duration: '40 horas',
        students: '150+',
        features: ['Certificação NR-11', 'Aulas práticas', 'Simulador incluso'],
      },
      {
        title: 'Operador de Retroescavadeira',
        description: 'Capacitação para operação de retroescavadeiras e equipamentos similares.',
        image: cardCnh,
        duration: '80 horas',
        students: '80+',
        features: ['Treinamento prático', 'Certificação válida', 'Instrutores especializados'],
      },
      {
        title: 'Operador de Pá Carregadeira',
        description: 'Curso completo para operação de pá carregadeira.',
        image: cardTraining,
        duration: '60 horas',
        students: '60+',
        features: ['Aulas teóricas e práticas', 'Certificado reconhecido', 'Material incluso'],
      },
    ],
  },
  {
    id: 'atualizacoes',
    title: 'Atualizações',
    icon: <RefreshCw className="w-5 h-5" />,
    description: 'Cursos de atualização para manter sua habilitação em dia',
    courses: [
      {
        title: 'Atualização para Transporte Coletivo',
        description: 'Curso obrigatório de atualização para condutores de transporte coletivo.',
        image: cardCnh,
        duration: '16 horas',
        students: '200+',
        features: ['Legislação atualizada', 'Direção defensiva', 'Certificado válido'],
      },
      {
        title: 'Atualização para Transporte de Carga',
        description: 'Atualização para motoristas de transporte de cargas.',
        image: cardTraining,
        duration: '16 horas',
        students: '180+',
        features: ['Normas de trânsito', 'Segurança no transporte', 'Certificação CONTRAN'],
      },
    ],
  },
  {
    id: 'reciclagem',
    title: 'Reciclagem',
    icon: <Recycle className="w-5 h-5" />,
    description: 'Recupere seu direito de dirigir com nossos cursos de reciclagem',
    courses: [
      {
        title: 'Reciclagem para Infratores',
        description: 'Curso obrigatório para condutores com CNH suspensa por pontuação.',
        image: cardCnh,
        duration: '30 horas',
        students: '300+',
        features: ['Curso teórico', 'Certificação', 'Suporte jurídico'],
      },
      {
        title: 'Reciclagem por Infração Gravíssima',
        description: 'Reciclagem para condutores que cometeram infrações gravíssimas.',
        image: cardTraining,
        duration: '30 horas',
        students: '100+',
        features: ['Acompanhamento completo', 'Material didático', 'Flexibilidade de horários'],
      },
    ],
  },
  {
    id: 'mopp',
    title: 'MOPP',
    icon: <Flame className="w-5 h-5" />,
    description: 'Movimentação de Produtos Perigosos - Certificação obrigatória',
    courses: [
      {
        title: 'MOPP - Formação',
        description: 'Curso de formação para transporte de produtos perigosos.',
        image: cardCnh,
        duration: '50 horas',
        students: '120+',
        features: ['Certificação MOPP', 'Validade de 5 anos', 'Aulas teóricas e práticas'],
      },
      {
        title: 'MOPP - Atualização',
        description: 'Renovação da certificação MOPP para condutores.',
        image: cardTraining,
        duration: '16 horas',
        students: '200+',
        features: ['Renovação rápida', 'Legislação atualizada', 'Certificado válido'],
      },
    ],
  },
  {
    id: 'escolar',
    title: 'Escolar',
    icon: <Bus className="w-5 h-5" />,
    description: 'Capacitação para condutores de transporte escolar',
    courses: [
      {
        title: 'Transporte Escolar - Formação',
        description: 'Curso completo para condutores de veículos escolares.',
        image: cardTraining,
        duration: '50 horas',
        students: '90+',
        features: ['Certificação escolar', 'Legislação específica', 'Primeiros socorros'],
      },
      {
        title: 'Transporte Escolar - Atualização',
        description: 'Atualização obrigatória para renovação da certificação.',
        image: cardCnh,
        duration: '16 horas',
        students: '150+',
        features: ['Renovação de certificado', 'Direção defensiva', 'Relacionamento com alunos'],
      },
    ],
  },
  {
    id: 'emergencia',
    title: 'Emergência',
    icon: <Siren className="w-5 h-5" />,
    description: 'Habilitação para condução de veículos de emergência',
    courses: [
      {
        title: 'Condutor de Ambulância',
        description: 'Formação para condutores de veículos de emergência médica.',
        image: cardCnh,
        duration: '50 horas',
        students: '60+',
        features: ['Direção de urgência', 'Primeiros socorros', 'Certificação válida'],
      },
      {
        title: 'Condutor de Veículos de Emergência',
        description: 'Capacitação completa para condução de veículos de emergência.',
        image: cardTraining,
        duration: '50 horas',
        students: '40+',
        features: ['Técnicas especiais', 'Legislação de trânsito', 'Aulas práticas'],
      },
    ],
  },
  {
    id: 'apps',
    title: 'Apps',
    icon: <Smartphone className="w-5 h-5" />,
    description: 'Preparação para motoristas de aplicativos de transporte',
    courses: [
      {
        title: 'Motorista de Aplicativo',
        description: 'Curso preparatório para trabalhar com Uber, 99 e similares.',
        image: cardTraining,
        duration: '20 horas',
        students: '400+',
        features: ['Atendimento ao cliente', 'Direção defensiva', 'Regras dos apps'],
      },
      {
        title: 'Entregador de Aplicativo',
        description: 'Capacitação para entregadores de delivery por aplicativo.',
        image: cardCnh,
        duration: '16 horas',
        students: '250+',
        features: ['Segurança no trânsito', 'Gestão de tempo', 'Boas práticas'],
      },
    ],
  },
];

const CourseCard = ({ course, index }: { course: Course; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-background rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 group"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      </div>
      
      <div className="p-6">
        <h3 className="font-heading font-bold text-xl text-foreground mb-2">
          {course.title}
        </h3>
        <p className="text-muted-foreground text-sm mb-4">
          {course.description}
        </p>
        
        <div className="flex items-center gap-4 mb-4 text-sm">
          <div className="flex items-center gap-1 text-primary">
            <Clock className="w-4 h-4" />
            <span>{course.duration}</span>
          </div>
          <div className="flex items-center gap-1 text-secondary">
            <Users className="w-4 h-4" />
            <span>{course.students} alunos</span>
          </div>
        </div>
        
        <div className="space-y-2 mb-6">
          {course.features.map((feature) => (
            <div key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
              <CheckCircle className="w-4 h-4 text-accent" />
              <span>{feature}</span>
            </div>
          ))}
        </div>
        
        <Button variant="default" className="w-full gap-2 group/btn" asChild>
          <a href="https://wa.me/5500000000000" target="_blank" rel="noopener noreferrer">
            Saiba mais
            <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
          </a>
        </Button>
      </div>
    </motion.div>
  );
};

const Cursos = () => {
  const [activeTab, setActiveTab] = useState(modules[0].id);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="pt-24 pb-16 bg-gradient-to-br from-primary/10 via-background to-secondary/10 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-accent" />
          <div className="absolute top-20 right-10 w-32 h-32 border-4 border-primary/20 rotate-12" />
          <div className="absolute bottom-10 left-10 w-24 h-24 bg-secondary/10 rounded-full" />
          
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
                  Nossos Cursos
                </span>
                <div className="w-8 h-1 bg-primary" />
              </div>
              
              <h1 className="font-heading text-4xl md:text-5xl text-foreground font-bold mb-6">
                Cursos de Habilitação e Direção
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Oferecemos cursos completos para você conquistar ou regularizar sua CNH, 
                com instrutores qualificados e a melhor estrutura da região.
              </p>
              
              <Button variant="whatsapp" size="xl" className="gap-2" asChild>
                <a href="https://wa.me/5500000000000" target="_blank" rel="noopener noreferrer">
                  <Phone className="w-5 h-5" />
                  Falar com um consultor
                </a>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Modules Tabs Section */}
        <section className="section-padding bg-section-light">
          <div className="container-custom mx-auto">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="w-full flex-wrap h-auto gap-2 bg-transparent p-0 mb-8 justify-center">
                {modules.map((module) => (
                  <TabsTrigger
                    key={module.id}
                    value={module.id}
                    className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground bg-background border border-border px-4 py-3 rounded-lg flex items-center gap-2 shadow-sm hover:shadow-md transition-all"
                  >
                    {module.icon}
                    <span className="hidden sm:inline">{module.title}</span>
                  </TabsTrigger>
                ))}
              </TabsList>

              {modules.map((module) => (
                <TabsContent key={module.id} value={module.id} className="mt-0">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="text-center mb-8">
                      <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-2">
                        {module.title}
                      </h2>
                      <p className="text-muted-foreground">{module.description}</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {module.courses.map((course, index) => (
                        <CourseCard key={course.title} course={course} index={index} />
                      ))}
                    </div>
                  </motion.div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-padding bg-primary text-primary-foreground">
          <div className="container-custom mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Award className="w-16 h-16 mx-auto mb-6 opacity-80" />
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
                Pronto para começar?
              </h2>
              <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
                Entre em contato conosco e descubra o melhor curso para suas necessidades.
              </p>
              <Button variant="secondary" size="xl" className="gap-2" asChild>
                <a href="https://wa.me/5500000000000" target="_blank" rel="noopener noreferrer">
                  <Phone className="w-5 h-5" />
                  Matricule-se agora
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

export default Cursos;

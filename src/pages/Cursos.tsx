import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { WhatsAppFloat } from '@/components/WhatsAppFloat';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Phone, ArrowRight, Clock, Users, CheckCircle, Award, Cog, RefreshCw, Recycle, Flame, Bus, Ambulance, Siren, Smartphone, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import cardCnh from '@/assets/card-cnh.jpg';
import cardTraining from '@/assets/card-training.jpg';
import courseTransporteColetivo from '@/assets/course-transporte-coletivo.jpg';
import courseTransporteCarga from '@/assets/course-transporte-carga.jpg';
import courseReciclagem from '@/assets/course-reciclagem.jpg';
import courseMopp from '@/assets/course-mopp.jpg';
import courseEscolar from '@/assets/course-escolar.jpg';
import courseEmergencia from '@/assets/course-emergencia.jpg';
import courseAppMotorista from '@/assets/course-app-motorista.jpg';
import courseAppEntregador from '@/assets/course-app-entregador.jpg';
import courseMotoniveladora from '@/assets/course-motoniveladora.jpg';
import courseCarregadeira from '@/assets/course-carregadeira.jpg';
import courseTratorEsteiras from '@/assets/course-trator-esteiras.jpg';
import courseTratorAgricola from '@/assets/course-trator-agricola.jpg';
import courseRetroescavadeira from '@/assets/course-retroescavadeira.jpg';
import courseEscavadeira from '@/assets/course-escavadeira.jpg';
import courseMasterOperacao from '@/assets/course-master-operacao.jpg';
import coursePemtGestao from '@/assets/course-pemt-gestao.jpg';
import coursePemtOperadores from '@/assets/course-pemt-operadores.jpg';
import courseRigger from '@/assets/course-rigger.jpg';
import courseAmarracaoCargas from '@/assets/course-amarracao-cargas.jpg';
import courseGruas from '@/assets/course-gruas.jpg';
import courseSupervisorRigging from '@/assets/course-supervisor-rigging.jpg';
import courseMovimentacaoCarga from '@/assets/course-movimentacao-carga.jpg';
import courseGestaoFrotas from '@/assets/course-gestao-frotas.jpg';
import courseDirecaoDefensiva from '@/assets/course-direcao-defensiva.jpg';
import courseDirecaoIncompany from '@/assets/course-direcao-incompany.jpg';
import courseDirecaoOffroad from '@/assets/course-direcao-offroad.jpg';
import courseDirecaoOnroad from '@/assets/course-direcao-onroad.jpg';

interface Course {
  title: string;
  description: string;
  image: string;
  duration: string;
  students: string;
  features: string[];
  slug?: string;
}

interface SubSection {
  title: string;
  courses: Course[];
}

interface Module {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
  courses?: Course[];
  sections?: SubSection[];
}

const modules: Module[] = [
  {
    id: 'direcao-defensiva',
    title: 'Direção Defensiva',
    icon: <ShieldCheck className="w-5 h-5" />,
    description: 'Nosso carro-chefe! Curso completo de direção defensiva com 3 modalidades para atender diferentes necessidades.',
    courses: [
      {
        title: 'Direção Defensiva - In Company',
        description: 'Treinamento de direção defensiva realizado diretamente na sua empresa, adaptado à realidade da sua frota.',
        image: courseDirecaoIncompany,
        duration: '8 horas',
        students: '500+',
        features: ['Treinamento na empresa', 'Conteúdo personalizado', 'Certificado incluso'],
      },
      {
        title: 'Direção Defensiva - Off Road',
        description: 'Técnicas avançadas de condução segura em terrenos irregulares e condições adversas.',
        image: courseDirecaoOffroad,
        duration: '8 horas',
        students: '300+',
        features: ['Prática em terreno irregular', 'Técnicas de controle', 'Certificado incluso'],
      },
      {
        title: 'Direção Defensiva - On Road',
        description: 'Direção defensiva em vias públicas com foco em prevenção de acidentes e condução segura.',
        image: courseDirecaoOnroad,
        duration: '8 horas',
        students: '400+',
        features: ['Prática em vias públicas', 'Prevenção de acidentes', 'Certificado incluso'],
      },
    ],
  },
  {
    id: 'maquinas-pesadas',
    title: 'Máquinas Pesadas',
    icon: <Cog className="w-5 h-5" />,
    description: 'Cursos para operação de máquinas pesadas, incluindo linha amarela, formação avançada, PEMT e içamento de cargas.',
    sections: [
      {
        title: 'Linha Amarela - Operação de Máquinas Pesadas',
        courses: [
          {
            title: 'Capacitação para Operadores de Motoniveladoras',
            description: 'Capacitação na operação segura de motoniveladoras conforme NRs do Ministério do Trabalho.',
            image: courseMotoniveladora,
            duration: '20 horas',
            students: '100+',
            features: ['Curso obrigatório', 'Presencial', 'Atestado de participação + Carteirinha válida por 1 ano'],
            slug: 'motoniveladora',
          },
          {
            title: 'Capacitação para Operadores de Carregadeiras de Rodas',
            description: 'Capacitação para operar pás-carregadeiras convencionais com segurança e eficiência.',
            image: courseCarregadeira,
            duration: '20 horas',
            students: '90+',
            features: ['Curso obrigatório', 'Presencial', 'Atestado de participação + Carteirinha válida por 1 ano'],
            slug: 'carregadeira',
          },
          {
            title: 'Capacitação para Operadores de Tratores de Esteiras',
            description: 'Capacitação para supervisionar e implementar planos de içamento de cargas com tratores de esteira.',
            image: courseTratorEsteiras,
            duration: '40 horas',
            students: '70+',
            features: ['Curso obrigatório', 'Presencial', 'Certificado de Supervisor de Rigging'],
            slug: 'trator-esteiras',
          },
          {
            title: 'Treinamento de Operação de Trator Agrícola',
            description: 'Treinamento para operação segura de trator agrícola conforme NR 11, 12 e 31.',
            image: courseTratorAgricola,
            duration: '24 horas',
            students: '80+',
            features: ['Curso obrigatório', 'Presencial', 'Certificado de conclusão'],
            slug: 'trator-agricola',
          },
          {
            title: 'Capacitação para Operadores de Retroescavadeiras',
            description: 'Capacitação na operação segura de retroescavadeiras conforme NRs do Ministério do Trabalho.',
            image: courseRetroescavadeira,
            duration: '20 horas',
            students: '85+',
            features: ['Curso obrigatório', 'Presencial', 'Atestado de participação + Carteirinha válida por 1 ano'],
            slug: 'retroescavadeira',
          },
          {
            title: 'Capacitação para Operadores de Escavadeiras Hidráulicas',
            description: 'Capacitação na operação segura e eficiente de escavadeiras hidráulicas.',
            image: courseEscavadeira,
            duration: '20 horas',
            students: '75+',
            features: ['Curso obrigatório', 'Presencial', 'Atestado de participação + Carteirinha válida por 1 ano'],
            slug: 'escavadeira',
          },
        ],
      },
      {
        title: 'Formação Avançada',
        courses: [
          {
            title: 'Master em Operação de Construção e Mineração',
            description: 'Formação completa para operação segura e eficiente de equipamentos.',
            image: courseMasterOperacao,
            duration: '120 horas',
            students: '50+',
            features: ['Curso obrigatório', 'Presencial', 'Atestado + Carteirinha com conclusão de curso'],
            slug: 'master-operacao',
          },
        ],
      },
      {
        title: 'Plataformas Elevatórias Móveis de Trabalho (PEMT)',
        courses: [
          {
            title: 'Gestão PEMT - Plataformas Elevatórias Móveis de Trabalho',
            description: 'Desenvolva conhecimentos técnicos para operação e gestão de plataformas elevatórias.',
            image: coursePemtGestao,
            duration: '8 horas',
            students: '60+',
            features: ['Curso obrigatório', 'Presencial', 'Atestado de participação'],
            slug: 'pemt-gestao',
          },
          {
            title: 'Formação de Operadores de Plataformas Elevatórias',
            description: 'Desenvolva conhecimentos técnicos e habilidades práticas para operar plataformas elevatórias.',
            image: coursePemtOperadores,
            duration: '8 horas',
            students: '55+',
            features: ['Curso obrigatório', 'Presencial', 'Atestado + Carteirinha válida por 2 anos'],
            slug: 'pemt-operadores',
          },
        ],
      },
      {
        title: 'Içamento e Movimentação de Carga',
        courses: [
          {
            title: 'Formação de Rigger',
            description: 'Capacitação para elaborar e supervisionar planos de içamento.',
            image: courseRigger,
            duration: '40 horas',
            students: '45+',
            features: ['Curso obrigatório', 'Presencial', 'Carteirinha de Rigger válida por 2 anos'],
            slug: 'rigger',
          },
          {
            title: 'Amarração de Cargas para Transporte',
            description: 'Instruções essenciais sobre técnicas de amarração e sinalização.',
            image: courseAmarracaoCargas,
            duration: '8 horas',
            students: '40+',
            features: ['Curso obrigatório', 'Presencial', 'Atestado de participação'],
            slug: 'amarracao-cargas',
          },
          {
            title: 'Formação de Operadores de Gruas (Guindastes Torre)',
            description: 'Capacitação focada nos métodos seguros de operação de gruas.',
            image: courseGruas,
            duration: '80 horas',
            students: '30+',
            features: ['Curso obrigatório', 'In Company', 'Certificação OPC'],
            slug: 'gruas',
          },
          {
            title: 'Supervisor de Rigging',
            description: 'Capacitação para liderar equipes e supervisionar planos de içamento.',
            image: courseSupervisorRigging,
            duration: '32 horas',
            students: '35+',
            features: ['Curso obrigatório', 'Presencial', 'Certificação OPC NBR 17089'],
            slug: 'supervisor-rigging',
          },
          {
            title: 'Especialização em Movimentação de Carga',
            description: 'Especialização técnica em movimentação de carga para profissionais.',
            image: courseMovimentacaoCarga,
            duration: '32 horas',
            students: '30+',
            features: ['Curso obrigatório', 'Presencial', 'Certificação OPC NBR 17089'],
            slug: 'movimentacao-carga',
          },
        ],
      },
      {
        title: 'Gestão',
        courses: [
          {
            title: 'Gestão de Frotas',
            description: 'Visão geral dos parâmetros, critérios e ações importantes para o gerenciamento de frotas.',
            image: courseGestaoFrotas,
            duration: '16 horas',
            students: '40+',
            features: ['Curso obrigatório', 'Presencial', 'Certificado Instituto Opus'],
            slug: 'gestao-frotas',
          },
        ],
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
        image: courseTransporteColetivo,
        duration: '16 horas',
        students: '200+',
        features: ['Legislação atualizada', 'Direção defensiva', 'Certificado válido'],
        slug: 'transporte-coletivo-atualizacao',
      },
      {
        title: 'Atualização para Transporte de Carga',
        description: 'Atualização para motoristas de transporte de cargas.',
        image: courseTransporteCarga,
        duration: '16 horas',
        students: '180+',
        features: ['Normas de trânsito', 'Segurança no transporte', 'Certificação CONTRAN'],
        slug: 'transporte-carga-atualizacao',
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
        image: courseReciclagem,
        duration: '30 horas',
        students: '300+',
        features: ['Curso teórico', 'Certificação', 'Suporte jurídico'],
        slug: 'reciclagem-infratores',
      },
      {
        title: 'Curso Preventivo de Reciclagem',
        description: 'Curso preventivo para motoristas com pontuação entre 30 e 39 pontos na CNH.',
        image: courseReciclagem,
        duration: '30 horas',
        students: '100+',
        features: ['Acompanhamento completo', 'Material didático', 'Flexibilidade de horários'],
        slug: 'reciclagem-preventiva',
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
        image: courseMopp,
        duration: '50 horas',
        students: '120+',
        features: ['Certificação MOPP', 'Validade de 5 anos', 'Aulas teóricas e práticas'],
        slug: 'mopp-formacao',
      },
      {
        title: 'MOPP - Atualização',
        description: 'Renovação da certificação MOPP para condutores.',
        image: courseMopp,
        duration: '16 horas',
        students: '200+',
        features: ['Renovação rápida', 'Legislação atualizada', 'Certificado válido'],
        slug: 'mopp-atualizacao',
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
        image: courseEscolar,
        duration: '50 horas',
        students: '90+',
        features: ['Certificação escolar', 'Legislação específica', 'Primeiros socorros'],
        slug: 'escolar-formacao',
      },
      {
        title: 'Transporte Escolar - Atualização',
        description: 'Atualização obrigatória para renovação da certificação.',
        image: courseEscolar,
        duration: '16 horas',
        students: '150+',
        features: ['Renovação de certificado', 'Direção defensiva', 'Relacionamento com alunos'],
        slug: 'escolar-atualizacao',
      },
    ],
  },
  {
    id: 'emergencia',
    title: 'Emergência',
    icon: <Ambulance className="w-5 h-5" />,
    description: 'Habilitação para condução de veículos de emergência',
    courses: [
      {
        title: 'Condutor de Ambulância',
        description: 'Formação para condutores de veículos de emergência médica.',
        image: courseEmergencia,
        duration: '50 horas',
        students: '60+',
        features: ['Direção de urgência', 'Primeiros socorros', 'Certificação válida'],
        slug: 'emergencia-formacao',
      },
      {
        title: 'Condutor de Ambulância - Atualização',
        description: 'Atualização para condutores de ambulância conforme legislação vigente.',
        image: courseEmergencia,
        duration: '16 horas',
        students: '40+',
        features: ['Atualização obrigatória', 'Legislação de trânsito', '100% EAD'],
        slug: 'emergencia-formacao',
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
        image: courseAppMotorista,
        duration: '28 horas',
        students: '400+',
        features: ['Atendimento ao cliente', 'Direção defensiva', 'Regras dos apps'],
        slug: 'motorista-aplicativo',
      },
      {
        title: 'Curso para Taxista',
        description: 'Curso especial para motoristas que desejam trabalhar como taxistas.',
        image: courseAppMotorista,
        duration: '28 horas',
        students: '200+',
        features: ['Atendimento ao passageiro', 'Direção defensiva', 'Regulamentação'],
        slug: 'taxista',
      },
      {
        title: 'Entregador de Aplicativo',
        description: 'Capacitação para entregadores de delivery por aplicativo.',
        image: courseAppEntregador,
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
        {course.title.toLowerCase().includes('atualização') && (
          <div className="absolute top-3 right-3 bg-primary text-primary-foreground rounded-full p-2 shadow-lg">
            <RefreshCw className="w-5 h-5" />
          </div>
        )}
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
        
        {course.slug ? (
          <Button variant="default" className="w-full gap-2 group/btn" asChild>
            <Link to={`/curso/${course.slug}`}>
              Saiba mais
              <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
            </Link>
          </Button>
        ) : (
          <Button variant="default" className="w-full gap-2 group/btn" asChild>
            <a href="https://wa.me/5518996067947" target="_blank" rel="noopener noreferrer">
              Saiba mais
              <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
            </a>
          </Button>
        )}
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
                <a href="https://wa.me/5518996067947" target="_blank" rel="noopener noreferrer">
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

                    {module.sections ? (
                      <div className="space-y-14">
                        {module.sections.map((section) => (
                          <div key={section.title}>
                            <h3 className="font-heading text-xl md:text-2xl font-bold text-foreground mb-6 border-b border-border pb-3">
                              {section.title}
                            </h3>
                            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                              {section.courses.map((course, index) => (
                                <CourseCard key={course.title} course={course} index={index} />
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {module.courses?.map((course, index) => (
                          <CourseCard key={course.title} course={course} index={index} />
                        ))}
                      </div>
                    )}

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
                <a href="https://wa.me/5518996067947" target="_blank" rel="noopener noreferrer">
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

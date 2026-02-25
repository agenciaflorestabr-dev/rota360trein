import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { WhatsAppFloat } from '@/components/WhatsAppFloat';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowLeft, Clock, Monitor as MonitorIcon, Award, CheckCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import courseMotoniveladora from '@/assets/course-motoniveladora.jpg';
import courseCarregadeira from '@/assets/course-carregadeira.jpg';
import courseTratorEsteiras from '@/assets/course-trator-esteiras.jpg';
import courseTratorAgricola from '@/assets/course-trator-agricola.jpg';
import courseRetroescavadeira from '@/assets/course-retroescavadeira.jpg';
import courseEscavadeira from '@/assets/course-escavadeira.jpg';
import cardTraining from '@/assets/card-training.jpg';

interface Course {
  title: string;
  description: string;
  image: string;
  duration: string;
  modality: string;
  certification: string;
  badges: string[];
  slug?: string;
}

interface Section {
  title: string;
  courses: Course[];
}

const sections: Section[] = [
  {
    title: 'Linha Amarela - Operação de Máquinas Pesadas',
    courses: [
      {
        title: 'Capacitação para Operadores de Motoniveladoras',
        description: 'Capacitação na operação segura de motoniveladoras conforme NRs do Ministério do Trabalho.',
        image: courseMotoniveladora,
        duration: '20 horas',
        modality: 'Presencial',
        certification: 'Atestado de participação + Carteirinha válida por 1 ano',
        badges: ['Curso obrigatório', 'MAQUINAS-PESADAS'],
        slug: 'motoniveladora',
      },
      {
        title: 'Capacitação para Operadores de Carregadeiras de Rodas',
        description: 'Capacitação para operar pás-carregadeiras convencionais com segurança e eficiência.',
        image: courseCarregadeira,
        duration: '20 horas',
        modality: 'Presencial',
        certification: 'Atestado de participação + Carteirinha válida por 1 ano',
        badges: ['Curso obrigatório', 'MAQUINAS-PESADAS'],
        slug: 'carregadeira',
      },
      {
        title: 'Capacitação para Operadores de Tratores de Esteiras',
        description: 'Capacitação para supervisionar e implementar planos de içamento de cargas com tratores de esteira.',
        image: courseTratorEsteiras,
        duration: '40 horas',
        modality: 'Presencial',
        certification: 'Certificado de Supervisor de Rigging',
        badges: ['Curso obrigatório', 'MAQUINAS-PESADAS'],
        slug: 'trator-esteiras',
      },
      {
        title: 'Treinamento de Operação de Trator Agrícola',
        description: 'Treinamento para operação segura de trator agrícola conforme NR 11, 12 e 31.',
        image: courseTratorAgricola,
        duration: '24 horas',
        modality: 'Presencial',
        certification: 'Certificado de conclusão',
        badges: ['Curso obrigatório', 'MAQUINAS-PESADAS'],
        slug: 'trator-agricola',
      },
      {
        title: 'Capacitação para Operadores de Retroescavadeiras',
        description: 'Capacitação na operação segura de retroescavadeiras conforme NRs do Ministério do Trabalho.',
        image: courseRetroescavadeira,
        duration: '20 horas',
        modality: 'Presencial',
        certification: 'Atestado de participação + Carteirinha válida por 1 ano',
        badges: ['Curso obrigatório', 'MAQUINAS-PESADAS'],
        slug: 'retroescavadeira',
      },
      {
        title: 'Capacitação para Operadores de Escavadeiras Hidráulicas',
        description: 'Capacitação na operação segura e eficiente de escavadeiras hidráulicas.',
        image: courseEscavadeira,
        duration: '20 horas',
        modality: 'Presencial',
        certification: 'Atestado de participação + Carteirinha válida por 1 ano',
        badges: ['Curso obrigatório', 'MAQUINAS-PESADAS'],
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
        image: cardTraining,
        duration: '120 horas',
        modality: 'Presencial',
        certification: 'Atestado de participação + Carteirinha com a conclusão de curso e a identificação adquirida',
        badges: ['Curso obrigatório', 'MAQUINAS-PESADAS'],
      },
    ],
  },
  {
    title: 'Plataformas Elevatórias Móveis de Trabalho (PEMT)',
    courses: [
      {
        title: 'Gestão PEMT - Plataformas Elevatórias Móveis de Trabalho',
        description: 'Desenvolva conhecimentos técnicos para operação e gestão de plataformas elevatórias.',
        image: cardTraining,
        duration: '8 horas',
        modality: 'Presencial',
        certification: 'Atestado de participação',
        badges: ['Curso obrigatório', 'MAQUINAS-PESADAS'],
      },
      {
        title: 'Formação de Operadores de Plataformas Elevatórias',
        description: 'Desenvolva conhecimentos técnicos e habilidades práticas para operar plataformas elevatórias.',
        image: cardTraining,
        duration: '8 horas',
        modality: 'Presencial',
        certification: 'Atestado de participação + Carteirinha válida por 2 anos',
        badges: ['Curso obrigatório', 'MAQUINAS-PESADAS'],
      },
    ],
  },
  {
    title: 'Içamento e Movimentação de Carga',
    courses: [
      {
        title: 'Formação de Rigger',
        description: 'Capacitação para elaborar e supervisionar planos de içamento.',
        image: cardTraining,
        duration: '40 horas',
        modality: 'Presencial',
        certification: 'Atestado de participação + Carteirinha de Rigger válida por 2 anos',
        badges: ['Curso obrigatório', 'MAQUINAS-PESADAS'],
      },
      {
        title: 'Amarração de Cargas para Transporte',
        description: 'Instruções essenciais sobre técnicas de amarração e sinalização.',
        image: cardTraining,
        duration: '8 horas',
        modality: 'Presencial',
        certification: 'Atestado de participação',
        badges: ['Curso obrigatório', 'MAQUINAS-PESADAS'],
      },
      {
        title: 'Formação de Operadores de Gruas (Guindastes Torre)',
        description: 'Capacitação focada nos métodos seguros de operação de gruas.',
        image: cardTraining,
        duration: '80 horas (40h teóricas + 40h práticas)',
        modality: 'In Company',
        certification: 'Atestado de operador de guindaste + Certificação OPC',
        badges: ['Curso obrigatório', 'MAQUINAS-PESADAS'],
      },
      {
        title: 'Supervisor de Rigging',
        description: 'Capacitação para liderar equipes e supervisionar planos de içamento.',
        image: cardTraining,
        duration: '32 horas',
        modality: 'Presencial',
        certification: 'Atestado de Supervisor de Rigging + Certificação OPC NBR 17089',
        badges: ['Curso obrigatório', 'MAQUINAS-PESADAS'],
      },
      {
        title: 'Especialização em Movimentação de Carga',
        description: 'Especialização técnica em movimentação de carga para profissionais.',
        image: cardTraining,
        duration: '32 horas',
        modality: 'Presencial',
        certification: 'Atestado de Supervisor de Rigging + Certificação OPC NBR 17089',
        badges: ['Curso obrigatório', 'MAQUINAS-PESADAS'],
      },
    ],
  },
  {
    title: 'Gestão',
    courses: [
      {
        title: 'Gestão de Frotas',
        description: 'Visão geral dos parâmetros, critérios e ações importantes para o gerenciamento de frotas.',
        image: cardTraining,
        duration: '16 horas',
        modality: 'Presencial',
        certification: 'Certificado de participação emitido pelo Instituto Opus',
        badges: ['Curso obrigatório', 'MAQUINAS-PESADAS'],
      },
    ],
  },
];

const totalCourses = sections.reduce((acc, s) => acc + s.courses.length, 0);

const CourseCard = ({ course, index }: { course: Course; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="bg-background rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 group flex flex-col"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
      </div>

      <div className="p-5 flex flex-col flex-1">
        <div className="flex flex-wrap gap-2 mb-3">
          {course.badges.map((badge) => (
            <span
              key={badge}
              className={`px-2 py-0.5 rounded text-xs font-semibold ${
                badge === 'Curso obrigatório'
                  ? 'bg-secondary text-secondary-foreground'
                  : 'bg-muted text-muted-foreground border border-border'
              }`}
            >
              {badge}
            </span>
          ))}
        </div>

        <h3 className="font-heading font-bold text-base text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {course.title}
        </h3>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{course.description}</p>

        <div className="mt-auto space-y-2 text-sm mb-4">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="w-4 h-4 text-primary" />
            <span>{course.duration}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <MonitorIcon className="w-4 h-4 text-primary" />
            <span>{course.modality}</span>
          </div>
          <div className="flex items-start gap-2 text-muted-foreground">
            <Award className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
            <span>{course.certification}</span>
          </div>
        </div>

        <div className="border-t border-border pt-4">
          <p className="font-heading font-bold text-foreground text-sm mb-1">Consulte valores</p>
          <p className="text-xs text-muted-foreground mb-3">Entre em contato para condições especiais</p>

          {course.slug ? (
            <Button variant="whatsapp" className="w-full gap-2" asChild>
              <Link to={`/curso/${course.slug}`}>
                Ver detalhes
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          ) : (
            <Button variant="whatsapp" className="w-full gap-2" asChild>
              <a href="https://wa.me/5500000000000" target="_blank" rel="noopener noreferrer">
                Ver detalhes
                <ArrowRight className="w-4 h-4" />
              </a>
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const MaquinasPesadas = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero */}
        <section className="pt-24 pb-12 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
          <div className="container-custom mx-auto px-4">
            <Link
              to="/cursos"
              className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary-dark mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar ao catálogo
            </Link>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="font-heading text-3xl md:text-4xl text-foreground font-bold mb-3">
                Máquinas Pesadas
              </h1>
              <p className="text-muted-foreground max-w-3xl">
                Cursos para operação de máquinas pesadas, incluindo linha amarela, formação avançada, PEMT e içamento de cargas.
              </p>
              <p className="text-sm text-muted-foreground mt-4">
                {totalCourses} cursos encontrados
              </p>
            </motion.div>
          </div>
        </section>

        {/* Sections */}
        <section className="section-padding bg-section-light">
          <div className="container-custom mx-auto space-y-16">
            {sections.map((section) => (
              <div key={section.title}>
                <h2 className="font-heading text-xl md:text-2xl font-bold text-foreground mb-8 border-b border-border pb-3">
                  {section.title}
                </h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {section.courses.map((course, index) => (
                    <CourseCard key={course.title} course={course} index={index} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
};

export default MaquinasPesadas;

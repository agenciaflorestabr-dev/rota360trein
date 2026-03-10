import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { 
  Building2, 
  Presentation, 
  Truck, 
  BookOpen,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const trainings = [
  {
    icon: Building2,
    title: 'Treinamentos Empresariais',
    description: 'Capacitação de frota e motoristas para empresas de todos os portes.',
    color: 'primary',
  },
  {
    icon: Presentation,
    title: 'Palestras',
    description: 'Palestras educativas sobre segurança no trânsito e legislação.',
    color: 'secondary',
  },
  {
    icon: Truck,
    title: 'Capacitação de Motoristas',
    description: 'Cursos especializados para motoristas profissionais.',
    color: 'accent',
  },
  {
    icon: BookOpen,
    title: 'Educação no Trânsito',
    description: 'Programas educacionais para escolas e comunidades.',
    color: 'primary',
  },
];

const colorMap = {
  primary: {
    bg: 'bg-primary/10',
    icon: 'text-primary',
    border: 'border-l-primary',
  },
  secondary: {
    bg: 'bg-secondary/10',
    icon: 'text-secondary',
    border: 'border-l-secondary',
  },
  accent: {
    bg: 'bg-accent/20',
    icon: 'text-accent-foreground',
    border: 'border-l-accent',
  },
};

export const TrainingSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="treinamentos" className="section-padding bg-background relative overflow-hidden">
      {/* Geometric decorations */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-secondary/5 rotate-45 translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary/5 -translate-x-1/2 translate-y-1/2" />

      <div ref={ref} className="container-custom mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-8 h-1 bg-secondary" />
            <span className="text-secondary font-semibold text-sm uppercase tracking-wider">
              Capacitação
            </span>
            <div className="w-8 h-1 bg-secondary" />
          </div>

          <h2 className="font-heading text-3xl md:text-4xl text-foreground font-bold mb-4">
            Treinamentos e Capacitações
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Soluções completas para empresas que buscam excelência na gestão 
            de frota e segurança no trânsito.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 max-w-4xl mx-auto">
          {trainings.map((training, index) => {
            const colors = colorMap[training.color as keyof typeof colorMap];
            return (
              <motion.div
                key={training.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`group flex gap-4 p-6 rounded-xl bg-background shadow-card hover:shadow-card-hover transition-all duration-300 border-l-4 ${colors.border}`}
              >
                <div className={`w-14 h-14 rounded-xl ${colors.bg} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                  <training.icon className={`w-7 h-7 ${colors.icon}`} />
                </div>

                <div className="flex-1">
                  <h3 className="font-heading font-semibold text-lg text-foreground mb-2 group-hover:text-primary transition-colors">
                    {training.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    {training.description}
                  </p>
                  <a
                    href="#"
                    className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:gap-2 transition-all"
                  >
                    Saiba mais
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import cardCnh from '@/assets/card-cnh.jpg';
import cardTraining from '@/assets/card-training.jpg';
import heroLesson from '@/assets/hero-lesson.jpg';
import heroHighway from '@/assets/hero-highway.jpg';

const courses = [
  {
    title: 'Primeira Habilitação',
    description: 'Comece sua jornada no trânsito com nosso curso completo de formação.',
    image: heroLesson,
    badge: 'Popular',
    badgeColor: 'bg-accent text-accent-foreground',
  },
  {
    title: 'Adição de Categoria',
    description: 'Amplie suas possibilidades adicionando novas categorias à sua CNH.',
    image: heroHighway,
    badge: null,
  },
  {
    title: 'Aulas de Direção',
    description: 'Aulas práticas personalizadas para quem precisa de mais confiança.',
    image: cardTraining,
    badge: null,
  },
  {
    title: 'Renovação / Atualização',
    description: 'Renove sua CNH ou atualize seus dados com facilidade e agilidade.',
    image: cardCnh,
    badge: 'Rápido',
    badgeColor: 'bg-secondary text-secondary-foreground',
  },
];

export const CoursesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="cursos" className="section-padding bg-background relative overflow-hidden">
      {/* Geometric decorations */}
      <div className="absolute top-20 right-0 w-32 h-32 bg-accent/10 rotate-45 translate-x-1/2" />
      <div className="absolute bottom-20 left-0 w-24 h-24 bg-primary/10 -translate-x-1/2" />

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
              Nossos Serviços
            </span>
            <div className="w-8 h-1 bg-secondary" />
          </div>

          <h2 className="font-heading text-3xl md:text-4xl text-foreground font-bold mb-4">
            Cursos e Serviços
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Conheça nossas opções de cursos e serviços para você conquistar 
            ou regularizar sua CNH.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {courses.map((course, index) => (
            <motion.div
              key={course.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-background rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-2"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
                
                {course.badge && (
                  <span className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold ${course.badgeColor}`}>
                    {course.badge}
                  </span>
                )}
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="font-heading font-semibold text-lg text-foreground mb-2 group-hover:text-primary transition-colors">
                  {course.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {course.description}
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full gap-2 group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all"
                >
                  Saiba mais
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

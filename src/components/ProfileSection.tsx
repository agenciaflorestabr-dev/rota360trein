import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { 
  Car, 
  FileCheck, 
  GraduationCap, 
  AlertTriangle, 
  Users,
  ArrowRight 
} from 'lucide-react';

const profiles = [
  {
    icon: Car,
    title: 'Quero tirar minha CNH',
    description: 'Primeira habilitação com acompanhamento completo',
    color: 'primary',
  },
  {
    icon: FileCheck,
    title: 'Preciso regularizar minha CNH',
    description: 'Renovação, mudança de categoria e atualizações',
    color: 'secondary',
  },
  {
    icon: GraduationCap,
    title: 'Preciso de aulas de direção',
    description: 'Aulas práticas para quem já tem CNH',
    color: 'accent',
  },
  {
    icon: AlertTriangle,
    title: 'Tenho problemas com multas',
    description: 'Advocacia especializada em defesa de trânsito',
    color: 'primary',
  },
  {
    icon: Users,
    title: 'Busco treinamentos',
    description: 'Capacitação empresarial e palestras',
    color: 'secondary',
  },
];

const colorClasses = {
  primary: {
    bg: 'bg-primary/10',
    icon: 'text-primary',
    hover: 'hover:bg-primary hover:text-primary-foreground',
  },
  secondary: {
    bg: 'bg-secondary/10',
    icon: 'text-secondary',
    hover: 'hover:bg-secondary hover:text-secondary-foreground',
  },
  accent: {
    bg: 'bg-accent/20',
    icon: 'text-accent-foreground',
    hover: 'hover:bg-accent hover:text-accent-foreground',
  },
};

export const ProfileSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="section-padding bg-section-light relative overflow-hidden">
      {/* Geometric stripes */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-accent" />

      <div ref={ref} className="container-custom mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-8 h-1 bg-primary" />
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">
              Como podemos ajudar?
            </span>
            <div className="w-8 h-1 bg-primary" />
          </div>

          <h2 className="font-heading text-3xl md:text-4xl text-foreground font-bold">
            Qual é a sua necessidade?
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-3 md:gap-6">
          {profiles.map((profile, index) => {
            const colors = colorClasses[profile.color as keyof typeof colorClasses];
            return (
              <motion.a
                key={profile.title}
                href="#cursos"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`group p-4 md:p-6 rounded-xl bg-background shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1 cursor-pointer`}
              >
                <div
                  className={`w-11 h-11 md:w-14 md:h-14 rounded-xl ${colors.bg} flex items-center justify-center mb-3 md:mb-4 transition-all duration-300 group-hover:scale-110`}
                >
                  <profile.icon className={`w-5 h-5 md:w-7 md:h-7 ${colors.icon}`} />
                </div>

                <h3 className="font-heading font-semibold text-sm md:text-base text-foreground mb-1 md:mb-2 group-hover:text-primary transition-colors">
                  {profile.title}
                </h3>

                <p className="text-xs md:text-sm text-muted-foreground mb-2 md:mb-4 hidden sm:block">
                  {profile.description}
                </p>

                <div className="flex items-center gap-2 text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>Saiba mais</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

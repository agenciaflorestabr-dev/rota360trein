import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { 
  FileText, 
  Calendar, 
  Scale, 
  Target, 
  Shield,
  ArrowRight 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import highlightBg from '@/assets/highlight-bg.jpg';

const features = [
  { icon: FileText, label: 'Mudanças' },
  { icon: Calendar, label: 'Prazos' },
  { icon: Scale, label: 'Regras' },
  { icon: Target, label: 'Pontuação' },
  { icon: Shield, label: 'Recursos' },
];

export const HighlightSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${highlightBg})` }} />
      <div className="absolute inset-0 bg-primary/60" />
      
      {/* Geometric patterns */}
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-accent via-primary to-secondary" />
      <div className="absolute top-10 right-10 w-32 h-32 border-4 border-secondary-foreground/10 rotate-12" />
      <div className="absolute bottom-10 left-10 w-24 h-24 bg-secondary-foreground/5 rounded-full" />
      <div className="absolute top-1/2 right-1/4 w-40 h-40 bg-accent/10 rotate-45" />

      <div ref={ref} className="relative section-padding container-custom mx-auto">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-secondary-foreground/10 rounded-full">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-secondary-foreground text-sm font-medium">
                Novidade
              </span>
            </div>

            <h2 className="font-heading text-2xl md:text-4xl lg:text-5xl text-secondary-foreground font-bold mb-4 md:mb-6">
              Nova CNH Brasil: você está preparado?
            </h2>

            <p className="text-lg text-secondary-foreground/80 mb-10 max-w-2xl mx-auto">
              Fique por dentro de todas as mudanças na legislação de trânsito. 
              Nossos especialistas estão prontos para orientá-lo.
            </p>
          </motion.div>

          {/* Feature icons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-4 md:gap-8 mb-10"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                className="flex flex-col items-center gap-2"
              >
                <div className="w-14 h-14 rounded-xl bg-secondary-foreground/10 flex items-center justify-center">
                  <feature.icon className="w-6 h-6 text-secondary-foreground" />
                </div>
                <span className="text-sm text-secondary-foreground/80 font-medium">
                  {feature.label}
                </span>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Button
              variant="accent"
              size="xl"
              className="gap-2 group animate-pulse-soft"
              asChild
            >
              <a href="https://wa.me/5518996067947" target="_blank" rel="noopener noreferrer">
                Receber orientação agora
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Award, Star, Trophy } from 'lucide-react';
import instrutoraSarah from '@/assets/instrutora-sarah.jpg';

export const InstructorHighlight = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="py-12 md:py-16 bg-background relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent via-secondary to-primary" />

      <div ref={ref} className="container-custom mx-auto px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-[280px_1fr] gap-6 md:gap-10 items-center">
          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="flex justify-center"
          >
            <div className="relative">
              <img
                src={instrutoraSarah}
                alt="Sarah Lisboa - Instrutora credenciada e premiada"
                loading="lazy"
                className="w-56 h-56 md:w-64 md:h-64 rounded-2xl object-cover object-top shadow-card"
              />
              <div className="absolute -bottom-3 -right-3 bg-accent text-accent-foreground px-4 py-2 rounded-xl shadow-lg font-heading font-bold text-sm">
                🏆 2x Premiada
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center md:text-left"
          >
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-accent/15 rounded-full">
              <Trophy className="w-4 h-4 text-accent-foreground" />
              <span className="text-accent-foreground text-sm font-semibold">
                Instrutora Premiada
              </span>
            </div>

            <h2 className="font-heading text-3xl md:text-4xl text-foreground font-bold mb-4">
              Sarah Lisboa
            </h2>

            <p className="text-base md:text-lg text-muted-foreground mb-6 md:mb-8 max-w-2xl leading-relaxed">
              Instrutora credenciada e <strong className="text-foreground">2x eleita a melhor instrutora</strong> pelo 
              prêmio <strong className="text-foreground">ACEAIA</strong> — reconhecimento concedido por voto popular, 
              que comprova a confiança e a satisfação dos nossos alunos.
            </p>

            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="flex items-center gap-3 px-5 py-3 bg-primary/10 rounded-xl"
              >
                <Award className="w-5 h-5 text-primary" />
                <div className="text-left">
                  <span className="block text-sm font-bold text-foreground">2x Melhor Instrutora</span>
                  <span className="text-xs text-muted-foreground">Prêmio ACEAIA</span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.4 }}
                className="flex items-center gap-3 px-5 py-3 bg-secondary/10 rounded-xl"
              >
                <Star className="w-5 h-5 text-secondary" />
                <div className="text-left">
                  <span className="block text-sm font-bold text-foreground">Voto Popular</span>
                  <span className="text-xs text-muted-foreground">Reconhecimento dos alunos</span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.5 }}
                className="flex items-center gap-3 px-5 py-3 bg-accent/15 rounded-xl"
              >
                <Trophy className="w-5 h-5 text-accent-foreground" />
                <div className="text-left">
                  <span className="block text-sm font-bold text-foreground">Credenciada</span>
                  <span className="text-xs text-muted-foreground">Instrutora certificada</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

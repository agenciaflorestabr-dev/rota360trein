import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Award, Star, Trophy } from 'lucide-react';

export const InstructorHighlight = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="py-12 md:py-16 bg-background relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent via-secondary to-primary" />

      <div ref={ref} className="container-custom mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
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

          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Instrutora credenciada e <strong className="text-foreground">2x eleita a melhor instrutora</strong> pelo 
            prêmio <strong className="text-foreground">ACEAIA</strong> — reconhecimento concedido por voto popular, 
            que comprova a confiança e a satisfação dos nossos alunos.
          </p>

          <div className="flex flex-wrap justify-center gap-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="flex items-center gap-3 px-6 py-3 bg-primary/10 rounded-xl"
            >
              <Award className="w-6 h-6 text-primary" />
              <div className="text-left">
                <span className="block text-sm font-bold text-foreground">2x Melhor Instrutora</span>
                <span className="text-xs text-muted-foreground">Prêmio ACEAIA</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="flex items-center gap-3 px-6 py-3 bg-secondary/10 rounded-xl"
            >
              <Star className="w-6 h-6 text-secondary" />
              <div className="text-left">
                <span className="block text-sm font-bold text-foreground">Voto Popular</span>
                <span className="text-xs text-muted-foreground">Reconhecimento dos alunos</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="flex items-center gap-3 px-6 py-3 bg-accent/15 rounded-xl"
            >
              <Trophy className="w-6 h-6 text-accent-foreground" />
              <div className="text-left">
                <span className="block text-sm font-bold text-foreground">Credenciada</span>
                <span className="text-xs text-muted-foreground">Instrutora certificada</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

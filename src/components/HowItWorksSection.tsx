import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { MessageCircle, Search, CheckCircle } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: MessageCircle,
    title: 'Você entra em contato',
    description: 'Fale conosco pelo WhatsApp, telefone ou presencialmente.',
  },
  {
    number: '02',
    icon: Search,
    title: 'Identificamos sua necessidade',
    description: 'Nossa equipe analisa sua situação e entende seu objetivo.',
  },
  {
    number: '03',
    icon: CheckCircle,
    title: 'Indicamos a melhor solução',
    description: 'Apresentamos o melhor caminho para você alcançar seu objetivo.',
  },
];

export const HowItWorksSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="section-padding bg-primary relative overflow-hidden">
      {/* Geometric patterns */}
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-accent via-secondary to-primary" />
      <div className="absolute top-20 right-20 w-40 h-40 border-2 border-primary-foreground/10 rotate-12" />
      <div className="absolute bottom-20 left-20 w-32 h-32 bg-primary-foreground/5 rounded-full" />

      <div ref={ref} className="container-custom mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-8 h-1 bg-accent" />
            <span className="text-accent font-semibold text-sm uppercase tracking-wider">
              Simples e Rápido
            </span>
            <div className="w-8 h-1 bg-accent" />
          </div>

          <h2 className="font-heading text-3xl md:text-4xl text-primary-foreground font-bold">
            Como Funciona
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 relative">
          {/* Connection line */}
          <div className="hidden md:block absolute top-16 left-1/6 right-1/6 h-0.5 bg-primary-foreground/20" />

          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="relative text-center"
            >
              {/* Number badge */}
              <div className="inline-flex items-center justify-center w-24 h-24 md:w-32 md:h-32 rounded-full bg-primary-foreground/10 mb-4 md:mb-6 relative">
                <div className="w-18 h-18 md:w-24 md:h-24 rounded-full bg-primary-foreground/10 flex items-center justify-center">
                  <step.icon className="w-8 h-8 md:w-10 md:h-10 text-accent" />
                </div>
                <span className="absolute -top-2 -right-2 w-10 h-10 rounded-full bg-accent flex items-center justify-center font-heading font-bold text-accent-foreground">
                  {step.number}
                </span>
              </div>

              <h3 className="font-heading font-bold text-xl text-primary-foreground mb-3">
                {step.title}
              </h3>

              <p className="text-primary-foreground/70 max-w-xs mx-auto">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { 
  FileWarning, 
  Ban, 
  XCircle, 
  ShieldAlert,
  Phone,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const services = [
  {
    icon: FileWarning,
    title: 'Recurso de Multa',
    description: 'Análise e elaboração de recursos administrativos contra multas de trânsito.',
  },
  {
    icon: Ban,
    title: 'Suspensão da CNH',
    description: 'Defesa para evitar ou reverter a suspensão do direito de dirigir.',
  },
  {
    icon: XCircle,
    title: 'Cassação',
    description: 'Defesa técnica em processos de cassação do documento de habilitação.',
  },
  {
    icon: ShieldAlert,
    title: 'Defesa Administrativa',
    description: 'Acompanhamento completo em processos administrativos no DETRAN.',
  },
];

export const AdvocacySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="advocacia" className="section-padding bg-section-light relative overflow-hidden">
      {/* Geometric accents */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-accent" />
      <div className="absolute top-20 left-10 w-20 h-20 border-2 border-primary/20 rotate-12" />
      <div className="absolute bottom-20 right-10 w-16 h-16 bg-secondary/10 rounded-full" />

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
              Proteção Jurídica
            </span>
            <div className="w-8 h-1 bg-primary" />
          </div>

          <h2 className="font-heading text-3xl md:text-4xl text-foreground font-bold mb-4">
            Advocacia Especializada em Trânsito
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Conte com advogados especializados para defender seus direitos 
            em qualquer situação envolvendo trânsito.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-background rounded-xl p-6 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                <service.icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors" />
              </div>

              <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
                {service.title}
              </h3>

              <p className="text-sm text-muted-foreground">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center"
        >
          <Button
            variant="whatsapp"
            size="xl"
            className="gap-2 group"
            asChild
          >
            <a href="https://wa.me/5500000000000" target="_blank" rel="noopener noreferrer">
              <Phone className="w-5 h-5" />
              Analisar meu caso no WhatsApp
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

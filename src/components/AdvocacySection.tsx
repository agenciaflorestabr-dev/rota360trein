import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { 
  FileWarning, 
  Ban, 
  XCircle, 
  ShieldAlert,
  Phone,
  ArrowRight,
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const services = [
  {
    icon: FileWarning,
    title: 'Recurso de Multa',
    description: 'Análise e elaboração de recursos administrativos contra multas de trânsito.',
    highlight: 'Alta taxa de sucesso',
  },
  {
    icon: Ban,
    title: 'Suspensão da CNH',
    description: 'Defesa para evitar ou reverter a suspensão do direito de dirigir.',
    highlight: 'Medidas de urgência',
  },
  {
    icon: XCircle,
    title: 'Cassação',
    description: 'Defesa técnica em processos de cassação do documento de habilitação.',
    highlight: 'Atuação judicial',
  },
  {
    icon: ShieldAlert,
    title: 'Defesa Administrativa',
    description: 'Acompanhamento completo em processos administrativos no DETRAN.',
    highlight: 'Todas as instâncias',
  },
];

export const AdvocacySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="advocacia" className="section-padding bg-section-light relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-accent" />

      <div ref={ref} className="container-custom mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
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
          <p className="text-muted-foreground max-w-2xl mx-auto text-base">
            Conte com advogados especializados para defender seus direitos 
            em qualquer situação envolvendo trânsito.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-500 hover:-translate-y-2"
            >
              {/* Top accent bar */}
              <div className="h-1.5 bg-gradient-to-r from-primary to-primary-light group-hover:from-secondary group-hover:to-primary transition-all duration-500" />
              
              <div className="p-6">
                {/* Icon with refined style */}
                <div className="w-14 h-14 rounded-2xl bg-primary/8 border border-primary/15 flex items-center justify-center mb-5 group-hover:bg-primary group-hover:border-primary group-hover:scale-110 transition-all duration-400">
                  <service.icon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
                </div>

                <h3 className="font-heading font-bold text-lg text-foreground mb-2.5 group-hover:text-primary transition-colors duration-300">
                  {service.title}
                </h3>

                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {service.description}
                </p>

                {/* Highlight badge */}
                <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-secondary bg-secondary/10 px-3 py-1.5 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                  {service.highlight}
                </div>

                {/* Hover arrow */}
                <div className="mt-4 flex items-center gap-1 text-sm font-medium text-primary opacity-0 group-hover:opacity-100 translate-x-[-8px] group-hover:translate-x-0 transition-all duration-300">
                  Saiba mais <ChevronRight className="w-4 h-4" />
                </div>
              </div>
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
            <a href="https://wa.me/5564994300737" target="_blank" rel="noopener noreferrer">
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

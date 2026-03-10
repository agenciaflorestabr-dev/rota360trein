import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ShieldCheck, Car, Mountain, Building2, ArrowRight, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import courseDirecaoDefensiva from '@/assets/course-direcao-defensiva.jpg';

const modalities = [
  { icon: Building2, label: 'In Company', description: 'Treinamento na sua empresa' },
  { icon: Mountain, label: 'Off Road', description: 'Técnicas em terreno irregular' },
  { icon: Car, label: 'On Road', description: 'Prática em vias públicas' },
];

export const DefensiveDrivingHighlight = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="relative overflow-hidden bg-primary">
      {/* Background image with overlay */}
      <div className="absolute inset-0">
         <img
           src={courseDirecaoDefensiva}
           alt="Direção Defensiva"
           className="w-full h-full object-cover"
         />
         <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary/60 to-primary/40" />
      </div>

      {/* Decorative elements */}
      <div className="absolute top-10 right-10 w-40 h-40 border-2 border-primary-foreground/10 rotate-12 rounded-3xl" />
      <div className="absolute bottom-10 left-10 w-24 h-24 bg-accent/20 rounded-full blur-2xl" />

      <div ref={ref} className="container-custom mx-auto px-4 relative z-10 py-12 md:py-28">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-accent/20 text-accent px-4 py-2 rounded-full mb-6">
              <ShieldCheck className="w-5 h-5" />
              <span className="font-semibold text-sm uppercase tracking-wider">
                Nosso Carro-Chefe
              </span>
            </div>

            <h2 className="font-heading text-3xl md:text-5xl lg:text-6xl text-primary-foreground font-bold mb-4 md:mb-6 leading-tight">
              Direção<br />
              <span className="text-accent">Defensiva</span>
            </h2>

            <p className="text-primary-foreground/80 text-lg mb-6 max-w-lg">
              O curso mais completo de direção defensiva da região. Aprenda técnicas avançadas 
              de segurança no trânsito com nossos instrutores especializados.
            </p>

            <div className="flex items-center gap-4 mb-8">
              <div className="flex items-center gap-2 bg-primary-foreground/10 px-4 py-2 rounded-lg">
                <Clock className="w-5 h-5 text-accent" />
                <span className="text-primary-foreground font-semibold">8 horas</span>
              </div>
              <div className="flex items-center gap-2 bg-primary-foreground/10 px-4 py-2 rounded-lg">
                <ShieldCheck className="w-5 h-5 text-accent" />
                <span className="text-primary-foreground font-semibold">Certificado incluso</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="accent" size="xl" className="gap-2" asChild>
                <Link to="/cursos?tab=direcao-defensiva">
                  Quero me inscrever
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button variant="heroOutline" size="xl" className="gap-2" asChild>
                <a href="https://wa.me/5518996067947?text=Olá! Tenho interesse no curso de Direção Defensiva" target="_blank" rel="noopener noreferrer">
                  Falar com consultor
                </a>
              </Button>
            </div>
          </motion.div>

          {/* Right - Modalities */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
          >
            <h3 className="text-primary-foreground/60 font-semibold text-sm uppercase tracking-wider mb-6">
              3 Modalidades disponíveis
            </h3>
            {modalities.map((mod, index) => (
              <motion.div
                key={mod.label}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.15 }}
                className="flex items-center gap-5 bg-primary-foreground/10 backdrop-blur-sm rounded-2xl p-5 border border-primary-foreground/10 hover:bg-primary-foreground/15 transition-all group"
              >
                <div className="w-14 h-14 rounded-xl bg-accent/20 flex items-center justify-center flex-shrink-0 group-hover:bg-accent/30 transition-colors">
                  <mod.icon className="w-7 h-7 text-accent" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-xl text-primary-foreground">
                    {mod.label}
                  </h4>
                  <p className="text-primary-foreground/60 text-sm">{mod.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

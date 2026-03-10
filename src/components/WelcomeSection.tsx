import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const benefits = [
'Primeira habilitação e renovação',
'Aulas práticas com veículos modernos',
'Advocacia especializada em trânsito',
'Treinamentos para empresas'];


export const WelcomeSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="empresa" className="section-padding bg-background relative overflow-hidden">
      {/* Geometric accents */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rotate-45 translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-secondary/10 -translate-x-1/2 translate-y-1/2" />

      <div ref={ref} className="container-custom mx-auto relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-1 bg-primary" />
              <span className="text-primary font-semibold text-sm uppercase tracking-wider">
                Bem-vindo
              </span>
            </div>

            <h2 className="font-heading text-2xl md:text-4xl lg:text-5xl text-foreground font-bold mb-4 md:mb-6">
              Você chegou à{' '}
              <span className="text-primary">Rota 360 Treinamentos </span>
            </h2>

            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              Somos mais do que uma auto escola. Oferecemos soluções completas para sua 
              CNH: desde a primeira habilitação até a advocacia especializada em trânsito. 
              Conte com uma equipe preparada para resolver qualquer desafio.
            </p>

            <ul className="space-y-3 mb-8">
              {benefits.map((benefit, index) =>
              <motion.li
                key={benefit}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                className="flex items-center gap-3">

                  <CheckCircle2 className="w-5 h-5 text-secondary flex-shrink-0" />
                  <span className="text-foreground">{benefit}</span>
                </motion.li>
              )}
            </ul>

            <Button variant="default" size="lg" className="gap-2 group" asChild>
              <a href="#empresa">
                Conheça nossa empresa
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
          </motion.div>

          {/* Visual Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative">

            <div className="relative bg-gradient-to-br from-primary to-primary-dark rounded-2xl p-8 md:p-12 text-primary-foreground">
              {/* Decorative elements */}
              <div className="absolute top-4 right-4 w-20 h-20 border-2 border-accent/30 rotate-12" />
              <div className="absolute bottom-4 left-4 w-12 h-12 bg-secondary/20 rounded-full" />

              <div className="relative z-10">
                <div className="w-16 h-16 rounded-xl bg-accent/20 flex items-center justify-center mb-6">
                  <span className="text-3xl font-heading font-bold text-accent">360°</span>
                </div>

                <h3 className="font-heading text-2xl md:text-3xl font-bold mb-4">
                  Solução completa em um só lugar
                </h3>

                <p className="text-primary-foreground/80 mb-6">
                  Da sua primeira CNH até a defesa de multas. Acompanhamos você em 
                  toda a jornada no trânsito.
                </p>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-primary-foreground/10 rounded-lg p-4 text-center">
                    <span className="block text-3xl font-heading font-bold text-accent">+5000</span>
                    <span className="text-sm text-primary-foreground/70">Alunos formados</span>
                  </div>
                  <div className="bg-primary-foreground/10 rounded-lg p-4 text-center">
                    <span className="block text-3xl font-heading font-bold text-accent">15+</span>
                    <span className="text-sm text-primary-foreground/70">Anos de experiência</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>);

};
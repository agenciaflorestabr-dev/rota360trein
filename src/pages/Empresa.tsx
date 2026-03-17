import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { WhatsAppFloat } from '@/components/WhatsAppFloat';
import { PhotoGallery } from '@/components/PhotoGallery';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { 
  Phone, 
  ArrowRight, 
  Target, 
  Eye, 
  Heart,
  Award,
  Users,
  Clock,
  MapPin,
  CheckCircle2,
  Building2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import heroHighway from '@/assets/hero-highway.jpg';

const values = [
  {
    icon: Target,
    title: 'Missão',
    description: 'Formar condutores conscientes e capacitados, oferecendo serviços de excelência em habilitação, treinamentos e advocacia especializada em trânsito.',
  },
  {
    icon: Eye,
    title: 'Visão',
    description: 'Ser referência regional em soluções completas para trânsito, reconhecida pela qualidade, inovação e compromisso com a segurança viária.',
  },
  {
    icon: Heart,
    title: 'Valores',
    description: 'Ética, transparência, respeito, excelência no atendimento e compromisso com a segurança de todos no trânsito.',
  },
];

const stats = [
  { icon: Users, value: '5.000+', label: 'Alunos formados' },
  { icon: Award, value: '15+', label: 'Anos de experiência' },
  { icon: Clock, value: '98%', label: 'Aprovação no DETRAN' },
  { icon: Building2, value: '3', label: 'Unidades' },
];

const differentials = [
  'Instrutores qualificados e experientes',
  'Veículos modernos e bem equipados',
  'Simulador de direção',
  'Aulas teóricas em ambiente climatizado',
  'Flexibilidade de horários',
  'Acompanhamento personalizado',
  'Advocacia especializada integrada',
  'Treinamentos corporativos',
  'Parcerias com empresas',
  'Atendimento humanizado',
];


const Empresa = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="pt-24 pb-16 relative overflow-hidden">
          <div className="absolute inset-0">
            <img
              src={heroHighway}
              alt="Sobre a Rota 360"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/70" />
          </div>
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-secondary via-accent to-secondary" />
          
          <div className="container-custom mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto text-primary-foreground py-12"
            >
              <div className="inline-flex items-center gap-3 mb-4">
                <div className="w-8 h-1 bg-secondary" />
                <span className="text-secondary font-semibold text-sm uppercase tracking-wider">
                  Sobre Nós
                </span>
                <div className="w-8 h-1 bg-secondary" />
              </div>
              
              <h1 className="font-heading text-4xl md:text-5xl font-bold mb-6">
                Conheça a Rota 360
              </h1>
              <p className="text-lg opacity-90 mb-8">
                Há mais de 15 anos transformando a forma como as pessoas se relacionam 
                com o trânsito. Somos mais que uma auto escola: somos a solução completa 
                para todas as suas necessidades.
              </p>
              
              <Button variant="secondary" size="xl" className="gap-2" asChild>
                <a href="https://wa.me/5518996067947" target="_blank" rel="noopener noreferrer">
                  <Phone className="w-5 h-5" />
                  Fale conosco
                </a>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-12 bg-background -mt-8 relative z-20">
          <div className="container-custom mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="bg-background rounded-xl p-6 shadow-card text-center"
                >
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ type: 'spring', stiffness: 200, damping: 15, delay: index * 0.15 + 0.2 }}
                    whileHover={{ scale: 1.2, rotate: 10 }}
                  >
                    <stat.icon className="w-10 h-10 mx-auto mb-3 text-primary" />
                  </motion.div>
                  <div className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission, Vision, Values */}
        <section ref={ref} className="section-padding bg-section-light">
          <div className="container-custom mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h2 className="font-heading text-3xl md:text-4xl text-foreground font-bold mb-4">
                Nossa Essência
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Os princípios que guiam nossa atuação e nos fazem ser referência no mercado.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 40 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-background rounded-2xl p-8 shadow-card text-center group hover:shadow-card-hover transition-all duration-300"
                >
                  <motion.div
                    className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6 group-hover:bg-primary transition-all duration-300"
                    whileHover={{ scale: 1.15, rotate: 360 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 12 }}
                    animate={{ y: [0, -6, 0] }}
                    // @ts-ignore
                    transition={{ y: { duration: 2, repeat: Infinity, ease: 'easeInOut', delay: index * 0.3 } }}
                  >
                    <value.icon className="w-8 h-8 text-primary group-hover:text-primary-foreground transition-colors" />
                  </motion.div>
                  
                  <h3 className="font-heading font-bold text-xl text-foreground mb-3">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Quem Somos */}
        <section className="section-padding bg-background">
          <div className="container-custom mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h2 className="font-heading text-3xl md:text-4xl text-foreground font-bold mb-4">
                Quem Somos
              </h2>
            </motion.div>

            <div className="max-w-4xl mx-auto space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-section-light rounded-2xl p-8 shadow-card"
              >
                <p className="text-muted-foreground text-lg leading-relaxed">
                  A <span className="text-primary font-semibold">Rota 360 Treinamentos</span> é uma empresa especializada em formação de condutores, cursos profissionalizantes, treinamentos práticos, palestras e aulas de direção, com foco em segurança, consciência no trânsito e capacitação completa para motoristas.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-section-light rounded-2xl p-8 shadow-card"
              >
                <h3 className="font-heading text-xl font-bold text-foreground mb-4">
                  O Significado do Nome
                </h3>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  O nome "<span className="text-primary font-semibold">Rota 360</span>" expressa o conceito central da empresa: uma visão abrangente, completa e estratégica sobre trânsito, direção e comportamento seguro. O "360" simboliza totalidade — uma formação que aborda todos os ângulos da condução, indo além da direção defensiva para incluir atitudes, prevenção, segurança, responsabilidade e desenvolvimento do condutor.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-section-light rounded-2xl p-8 shadow-card"
              >
                <h3 className="font-heading text-xl font-bold text-foreground mb-4">
                  Nossa Liderança
                </h3>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Liderada por <span className="text-primary font-semibold">Sarah Lisboa</span>, a Rota 360 representa a missão de profissionalizar motoristas e motociclistas, oferecendo treinamentos sérios, humanos e eficientes. Nossa identidade moderna, linguagem acessível e forte credibilidade nos posicionam como referência em preparo de condutores.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Differentials */}
        <section className="section-padding bg-primary text-primary-foreground">
          <div className="container-custom mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
                Nossos Diferenciais
              </h2>
              <p className="opacity-90 max-w-2xl mx-auto">
                O que nos torna a melhor escolha para você.
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {differentials.map((differential, index) => (
                <motion.div
                  key={differential}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="flex items-center gap-3 bg-primary-foreground/10 rounded-lg p-4"
                >
                  <CheckCircle2 className="w-5 h-5 text-secondary flex-shrink-0" />
                  <span className="text-sm">{differential}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>



        {/* Location CTA */}
        <section className="section-padding bg-section-light">
          <div className="container-custom mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-background rounded-2xl p-8 md:p-12 shadow-card text-center"
            >
              <MapPin className="w-16 h-16 mx-auto mb-6 text-primary" />
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-4">
                Venha nos conhecer
              </h2>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                Estamos prontos para recebê-lo em uma de nossas unidades. 
                Agende uma visita e conheça nossa estrutura.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button variant="whatsapp" size="xl" className="gap-2" asChild>
                  <a href="https://wa.me/5518996067947" target="_blank" rel="noopener noreferrer">
                    <Phone className="w-5 h-5" />
                    Agendar visita
                  </a>
                </Button>
                <Button variant="outline" size="xl" className="gap-2" asChild>
                  <a href="https://maps.app.goo.gl/m5VrUvxt3PX74W9J6" target="_blank" rel="noopener noreferrer">
                    <MapPin className="w-5 h-5" />
                    Ver no mapa
                    <ArrowRight className="w-5 h-5" />
                  </a>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
};

export default Empresa;

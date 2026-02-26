import { useParams, Link } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { WhatsAppFloat } from '@/components/WhatsAppFloat';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { motion } from 'framer-motion';
import { Clock, Monitor, Award, CalendarCheck, CheckCircle, ChevronRight, BookOpen, Phone } from 'lucide-react';
import { coursesDetailData } from '@/data/coursesData';

const CursoDetalhe = () => {
  const { slug } = useParams<{ slug: string }>();
  const course = slug ? coursesDetailData[slug] : undefined;

  if (!course) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24 pb-16 text-center">
          <h1 className="font-heading text-3xl text-foreground">Curso não encontrado</h1>
          <Link to="/cursos" className="text-primary underline mt-4 inline-block">Voltar ao catálogo</Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero */}
        <section className="pt-24 pb-16 relative overflow-hidden">
          <div className="absolute inset-0">
            <img src={course.image} alt="" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-primary/85" />
          </div>
          <div className="container-custom mx-auto px-4 relative">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-primary-foreground/70 mb-8">
              <Link to="/" className="hover:text-primary-foreground transition-colors">Home</Link>
              <ChevronRight className="w-4 h-4" />
              <Link to="/cursos" className="hover:text-primary-foreground transition-colors">Catálogo</Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-primary-foreground">{course.title}</span>
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl"
            >
              <div className="flex flex-wrap gap-2 mb-4">
                {course.badges.map((badge) => (
                  <span key={badge} className="px-3 py-1 rounded-full text-xs font-semibold bg-secondary text-secondary-foreground">
                    {badge}
                  </span>
                ))}
              </div>
              <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl text-primary-foreground font-bold mb-4">
                {course.title}
              </h1>
              <p className="text-primary-foreground/80 text-base md:text-lg leading-relaxed">
                {course.subtitle}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Info Cards + Sidebar */}
        <section className="section-padding bg-section-light">
          <div className="container-custom mx-auto">
            <div className="grid lg:grid-cols-[1fr_360px] gap-8">
              {/* Left Content */}
              <div className="space-y-10">
                {/* Quick Info Cards */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="grid grid-cols-2 md:grid-cols-4 gap-4"
                >
                  {[
                    { icon: Clock, label: 'Carga horária', value: course.duration },
                    { icon: Monitor, label: 'Modalidade', value: course.modality },
                    { icon: Award, label: 'Certificação', value: course.certification },
                    { icon: CalendarCheck, label: 'Validade', value: course.validity },
                  ].map((item) => (
                    <div key={item.label} className="bg-background rounded-xl p-4 shadow-card text-center">
                      <item.icon className="w-6 h-6 text-primary mx-auto mb-2" />
                      <p className="text-xs text-muted-foreground mb-1">{item.label}</p>
                      <p className="font-heading font-semibold text-sm text-foreground">{item.value}</p>
                    </div>
                  ))}
                </motion.div>

                {/* Para quem */}
                <div>
                  <h2 className="font-heading text-xl font-bold text-foreground mb-3 flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-primary" />
                    Para quem é esse curso
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">{course.targetAudience}</p>
                </div>

                {/* O que vai aprender */}
                <div>
                  <h2 className="font-heading text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-primary" />
                    O que você vai aprender
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {course.learningTopics.map((topic) => (
                      <div key={topic} className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{topic}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Requisitos */}
                <div>
                  <h2 className="font-heading text-xl font-bold text-foreground mb-3">Requisitos básicos</h2>
                  <ul className="space-y-2">
                    {course.requirements.map((req) => (
                      <li key={req} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span className="w-1.5 h-1.5 rounded-full bg-foreground" />
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Conteúdo do curso */}
                <div>
                  <h2 className="font-heading text-xl font-bold text-foreground mb-4">Conteúdo do curso</h2>
                  <div className="space-y-3">
                    {course.modules.map((mod, i) => (
                      <div key={mod.title} className="flex items-center justify-between bg-background rounded-xl p-4 shadow-card">
                        <div className="flex items-center gap-3">
                          <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary font-heading font-bold text-sm flex items-center justify-center">
                            {i + 1}
                          </span>
                          <span className="text-sm font-medium text-foreground">{mod.title}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">{mod.hours}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* FAQ */}
                <div>
                  <h2 className="font-heading text-xl font-bold text-foreground mb-4">Perguntas frequentes sobre este curso</h2>
                  <Accordion type="single" collapsible className="w-full">
                    {course.faq.map((item, i) => (
                      <AccordionItem key={i} value={`faq-${i}`}>
                        <AccordionTrigger className="text-sm text-foreground">{item.question}</AccordionTrigger>
                        <AccordionContent className="text-sm text-muted-foreground">{item.answer}</AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:sticky lg:top-24 h-fit">
                <div className="bg-background rounded-2xl shadow-card p-6 space-y-4">
                  <h3 className="font-heading font-bold text-lg text-foreground">{course.title}</h3>
                  <p className="text-sm text-muted-foreground">{course.modality} • {course.duration}</p>
                  
                  <div className="border-t border-border pt-4">
                    <p className="font-heading font-bold text-foreground mb-1">Consulte valores</p>
                    <p className="text-xs text-muted-foreground">Entre em contato para condições especiais</p>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-secondary">
                      <CheckCircle className="w-4 h-4" />
                      <span>Acesso imediato após pagamento</span>
                    </div>
                    <div className="flex items-center gap-2 text-secondary">
                      <CheckCircle className="w-4 h-4" />
                      <span>Certificado digital incluso</span>
                    </div>
                    <div className="flex items-center gap-2 text-secondary">
                      <CheckCircle className="w-4 h-4" />
                      <span>Suporte pelo WhatsApp</span>
                    </div>
                  </div>

                  <Button variant="whatsapp" size="xl" className="w-full gap-2" asChild>
                    <a href="https://wa.me/5500000000000" target="_blank" rel="noopener noreferrer">
                      <Phone className="w-5 h-5" />
                      Falar com consultor
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Enrollment CTA */}
        <section className="section-padding bg-primary text-primary-foreground">
          <div className="container-custom mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">Matricule-se agora</h2>
              <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
                Entre em contato pelo WhatsApp para garantir sua vaga e receber condições especiais.
              </p>
              <Button variant="secondary" size="xl" className="gap-2" asChild>
                <a href="https://wa.me/5500000000000" target="_blank" rel="noopener noreferrer">
                  <Phone className="w-5 h-5" />
                  Garantir minha vaga
                </a>
              </Button>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
};

export default CursoDetalhe;

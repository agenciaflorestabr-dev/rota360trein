import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowRight, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import heroHighway from '@/assets/hero-highway.jpg';
import heroSarahDriving from '@/assets/hero-sarah-driving.jpg';

const slides = [
  {
    id: 1,
    image: heroHighway,
    title: 'Cursos, capacitações e soluções completas para sua CNH',
    subtitle: 'Auto escola, treinamentos e advocacia especializada em trânsito.',
    cta: 'Acessar cursos',
    ctaLink: '#cursos',
  },
  {
    id: 2,
    image: heroSarahDriving,
    title: 'Aprenda a dirigir com quem entende do assunto',
    subtitle: 'Aulas práticas e teóricas com instrutores qualificados e veículos modernos.',
    cta: 'Saiba mais',
    ctaLink: '#cursos',
  },
];

export const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  return (
    <section className="relative h-[85vh] min-h-[500px] max-h-[900px] overflow-hidden">
      {/* Slides */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slides[currentSlide].image})` }}
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary/40" />
        </motion.div>
      </AnimatePresence>

      {/* Geometric Decorations */}
      <div className="absolute top-1/4 right-10 w-40 h-40 border-4 border-accent/30 rotate-12 hidden lg:block" />
      <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-secondary/20 rotate-45 hidden lg:block" />
      <div className="absolute top-1/3 left-10 w-16 h-16 bg-accent/20 rounded-full hidden lg:block" />

      {/* Content */}
      <div className="relative z-10 h-full container-custom mx-auto px-4 flex items-center">
        <div className="max-w-3xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {/* Accent Line */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-1 bg-accent" />
                <span className="text-accent font-medium text-sm uppercase tracking-wider">
                  Rota 360 Auto Escola
                </span>
              </div>

              {/* Title */}
              <h1 className="font-heading text-2xl sm:text-3xl md:text-5xl lg:text-6xl text-primary-foreground font-bold leading-tight mb-4 md:mb-6">
                {slides[currentSlide].title}
              </h1>

              {/* Subtitle */}
              <p className="text-lg md:text-xl text-primary-foreground/90 mb-8 max-w-xl">
                {slides[currentSlide].subtitle}
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-4">
                <Button
                  variant="accent"
                  size="xl"
                  className="gap-2 group"
                  asChild
                >
                  <a href={slides[currentSlide].ctaLink}>
                    {slides[currentSlide].cta}
                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </a>
                </Button>
                <Button
                  variant="heroOutline"
                  size="xl"
                  className="gap-2"
                  asChild
                >
                  <a href="https://wa.me/5518996067947" target="_blank" rel="noopener noreferrer">
                    <Phone className="w-5 h-5" />
                    Falar no WhatsApp
                  </a>
                </Button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-background/20 backdrop-blur-sm flex items-center justify-center text-primary-foreground hover:bg-background/40 transition-all"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-background/20 backdrop-blur-sm flex items-center justify-center text-primary-foreground hover:bg-background/40 transition-all"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? 'w-8 bg-accent'
                : 'w-2 bg-primary-foreground/50 hover:bg-primary-foreground/70'
            }`}
          />
        ))}
      </div>

      {/* Bottom geometric stripe */}
      <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-accent via-secondary to-primary" />
    </section>
  );
};

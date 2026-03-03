import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, useLocation } from 'react-router-dom';
import logoRota360 from '@/assets/logo-rota360.png';
const navItems = [{
  label: 'Cursos',
  href: '/cursos'
}, {
  label: 'Advocacia Especializada',
  href: '/advocacia'
}, {
  label: 'Treinamentos',
  href: '/treinamentos'
}, {
  label: 'Empresa',
  href: '/empresa'
}];
export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const isActive = (href: string) => location.pathname === href;
  return <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white ${isScrolled ? 'shadow-lg' : 'shadow-md'}`}>
      {/* Geometric accent stripe */}
      <div className="h-1 bg-gradient-to-r from-primary via-secondary to-accent" />

      <div className="container-custom mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <motion.div whileHover={{
          scale: 1.02
        }}>
            <Link to="/" className="flex items-center">
              <img alt="Rota 360 Treinamentos" className="h-10 md:h-12 w-auto" src="/lovable-uploads/04ccb858-ac34-43d1-96e2-a9d343cee291.png" />
            </Link>
          </motion.div>

          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map(item => <motion.div key={item.label} whileHover={{
            y: -2
          }}>
                <Link to={item.href} className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors relative group block ${isActive(item.href) ? 'text-primary' : 'text-foreground hover:text-primary hover:bg-primary/5'}`}>
                  {item.label}
                  <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-primary transition-all duration-300 ${isActive(item.href) ? 'w-3/4' : 'w-0 group-hover:w-3/4'}`} />
                </Link>
              </motion.div>)}
          </nav>

          {/* WhatsApp CTA */}
          <div className="hidden md:flex items-center gap-4">
            <Button variant="whatsapp" size="lg" className="gap-2" asChild>
              <a href="https://wa.me/556696067881" target="_blank" rel="noopener noreferrer">
                <Phone className="w-4 h-4" />
                <span>WhatsApp</span>
              </a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="lg:hidden p-2 rounded-lg hover:bg-muted transition-colors">
            {isMobileMenuOpen ? <X className="w-6 h-6 text-foreground" /> : <Menu className="w-6 h-6 text-foreground" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && <motion.div initial={{
        opacity: 0,
        height: 0
      }} animate={{
        opacity: 1,
        height: 'auto'
      }} exit={{
        opacity: 0,
        height: 0
      }} className="lg:hidden bg-background border-t border-border">
            <nav className="container-custom mx-auto px-4 py-4 flex flex-col gap-2">
              {navItems.map(item => <Link key={item.label} to={item.href} className={`px-4 py-3 rounded-lg font-medium transition-colors ${isActive(item.href) ? 'bg-primary/10 text-primary' : 'text-foreground hover:bg-muted'}`} onClick={() => setIsMobileMenuOpen(false)}>
                  {item.label}
                </Link>)}
              <Button variant="whatsapp" size="lg" className="mt-4 gap-2" asChild>
                <a href="https://wa.me/556696067881" target="_blank" rel="noopener noreferrer">
                  <Phone className="w-4 h-4" />
                  <span>Falar no WhatsApp</span>
                </a>
              </Button>
            </nav>
          </motion.div>}
      </AnimatePresence>
    </header>;
};
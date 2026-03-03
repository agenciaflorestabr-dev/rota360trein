import { motion } from 'framer-motion';
import { 
  Instagram, 

  Phone,
  Mail,
  MapPin
} from 'lucide-react';
import logoRota360 from '@/assets/logo-rota360.png';

const quickLinks = [
  { label: 'Primeira Habilitação', href: '#cursos' },
  { label: 'Adição de Categoria', href: '#cursos' },
  { label: 'Renovação CNH', href: '#cursos' },
  { label: 'Aulas de Direção', href: '#cursos' },
];

const institutionalLinks = [
  { label: 'Sobre a Empresa', href: '#empresa' },
  { label: 'Advocacia', href: '#advocacia' },
  { label: 'Treinamentos', href: '#treinamentos' },
  { label: 'Contato', href: '#contato' },
];

const socialLinks = [
  { icon: Instagram, href: 'https://www.instagram.com/rota360treinamentos/', label: 'Instagram' },
];

export const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground relative overflow-hidden">
      {/* Geometric accents */}
      <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-accent via-secondary to-primary-light" />
      <div className="absolute top-20 right-10 w-32 h-32 border-2 border-primary-foreground/10 rotate-12" />
      <div className="absolute bottom-20 left-10 w-24 h-24 bg-primary-foreground/5 rounded-full" />

      <div className="container-custom mx-auto px-4 py-16 relative">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div>
            <div className="mb-6">
              <img 
                src={logoRota360} 
                alt="Rota 360 Treinamentos" 
                className="h-14 w-auto"
              />
            </div>
            <p className="text-primary-foreground/70 mb-6 text-sm leading-relaxed">
              Soluções completas para sua CNH: auto escola, advocacia especializada 
              e treinamentos empresariais.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ scale: 1.1 }}
                  className="w-10 h-10 rounded-lg bg-primary-foreground/10 flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-6 flex items-center gap-2">
              <div className="w-6 h-0.5 bg-accent" />
              Cursos
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-primary-foreground/70 hover:text-accent transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Institutional */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-6 flex items-center gap-2">
              <div className="w-6 h-0.5 bg-accent" />
              Institucional
            </h4>
            <ul className="space-y-3">
              {institutionalLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-primary-foreground/70 hover:text-accent transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-6 flex items-center gap-2">
              <div className="w-6 h-0.5 bg-accent" />
              Contato
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <span className="text-primary-foreground/70 text-sm">
                  Av. Principal, 1234<br />
                  Centro - Cidade/UF
                </span>
              </li>
              <li>
                <a
                  href="tel:+556696067881"
                  className="flex items-center gap-3 text-primary-foreground/70 hover:text-accent transition-colors text-sm"
                >
                  <Phone className="w-5 h-5 text-accent" />
                  (66) 9606-7881
                </a>
              </li>
              <li>
                <a
                  href="mailto:contato@rota360.com.br"
                  className="flex items-center gap-3 text-primary-foreground/70 hover:text-accent transition-colors text-sm"
                >
                  <Mail className="w-5 h-5 text-accent" />
                  contato@rota360.com.br
                </a>
              </li>
            </ul>

            {/* WhatsApp CTA */}
            <motion.a
              href="https://wa.me/556696067881"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              className="mt-6 flex items-center gap-2 px-4 py-3 rounded-lg bg-whatsapp text-whatsapp-foreground font-medium text-sm hover:bg-whatsapp/90 transition-colors"
            >
              <Phone className="w-5 h-5" />
              WhatsApp
            </motion.a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-primary-foreground/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-primary-foreground/60">
            <p>© 2025 Rota 360 Auto Escola. Todos os direitos reservados.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-accent transition-colors">
                Política de Privacidade
              </a>
              <a href="#" className="hover:text-accent transition-colors">
                Termos de Uso
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

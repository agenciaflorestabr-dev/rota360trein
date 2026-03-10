import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { 
  MessageCircle, 
  MapPin, 
  Users, 
  GraduationCap,
  Phone
} from 'lucide-react';

const channels = [
  {
    icon: MessageCircle,
    title: 'WhatsApp',
    description: 'Atendimento rápido e prático pelo celular',
    action: 'Chamar agora',
    href: 'https://wa.me/5518996067947',
    highlight: true,
  },
  {
    icon: MapPin,
    title: 'Atendimento Presencial',
    description: 'Visite nossa unidade e conheça nossa estrutura',
    action: 'Ver endereço',
    href: '#',
  },
  {
    icon: Users,
    title: 'Consultoria',
    description: 'Agende uma consultoria personalizada',
    action: 'Agendar',
    href: '#',
  },
  {
    icon: GraduationCap,
    title: 'Treinamentos',
    description: 'Solicite um treinamento para sua empresa',
    action: 'Solicitar',
    href: '#',
  },
];

export const ContactChannelsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="section-padding bg-section-light relative overflow-hidden">
      {/* Geometric accents */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-accent" />

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
              Fale Conosco
            </span>
            <div className="w-8 h-1 bg-primary" />
          </div>

          <h2 className="font-heading text-3xl md:text-4xl text-foreground font-bold mb-4">
            Canais de Atendimento
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Entre em contato da forma que preferir. Estamos prontos para ajudar!
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
          {channels.map((channel, index) => (
            <motion.a
              key={channel.title}
              href={channel.href}
              target={channel.href.startsWith('http') ? '_blank' : undefined}
              rel={channel.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`group relative p-4 md:p-6 rounded-xl transition-all duration-300 hover:-translate-y-2 ${
                channel.highlight
                  ? 'bg-whatsapp text-whatsapp-foreground shadow-lg'
                  : 'bg-background shadow-card hover:shadow-card-hover'
              }`}
            >
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110 ${
                channel.highlight
                  ? 'bg-white/20'
                  : 'bg-primary/10'
              }`}>
                <channel.icon className={`w-7 h-7 ${
                  channel.highlight ? 'text-white' : 'text-primary'
                }`} />
              </div>

              <h3 className={`font-heading font-semibold text-lg mb-2 ${
                channel.highlight ? 'text-white' : 'text-foreground'
              }`}>
                {channel.title}
              </h3>

              <p className={`text-sm mb-4 ${
                channel.highlight ? 'text-white/80' : 'text-muted-foreground'
              }`}>
                {channel.description}
              </p>

              <span className={`inline-flex items-center gap-2 text-sm font-medium ${
                channel.highlight ? 'text-white' : 'text-primary'
              }`}>
                {channel.action}
                {channel.highlight && <Phone className="w-4 h-4" />}
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

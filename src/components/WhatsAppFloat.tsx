import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

export const WhatsAppFloat = () => {
  return (
    <motion.a
      href="https://wa.me/5564994300737"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: 'spring', stiffness: 200 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="relative">
        {/* Pulse animation */}
        <div className="absolute inset-0 rounded-full bg-whatsapp animate-ping opacity-25" />
        
        {/* Button */}
        <div className="relative w-14 h-14 md:w-16 md:h-16 rounded-full bg-whatsapp flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow">
          <MessageCircle className="w-7 h-7 md:w-8 md:h-8 text-whatsapp-foreground" />
        </div>

        {/* Tooltip */}
        <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-2 bg-foreground text-background text-sm font-medium rounded-lg whitespace-nowrap opacity-0 hover:opacity-100 pointer-events-none transition-opacity">
          Fale conosco!
          <div className="absolute left-full top-1/2 -translate-y-1/2 border-8 border-transparent border-l-foreground" />
        </div>
      </div>
    </motion.a>
  );
};

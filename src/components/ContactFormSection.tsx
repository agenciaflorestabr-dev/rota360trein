import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import {
  Dialog,
  DialogContent,
} from '@/components/ui/dialog';

export const ContactFormSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
    message: '',
  });

  const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.whatsapp || !formData.message) {
      toast({ title: 'Preencha todos os campos', variant: 'destructive' });
      return;
    }

    setIsSubmitting(true);
    try {
      const { error } = await supabase.from('form_submissions').insert({
        name: formData.name,
        email: formData.email,
        whatsapp: formData.whatsapp,
        course_title: 'Contato via site',
      });

      if (error) throw error;

      setShowSuccess(true);
      setFormData({ name: '', email: '', whatsapp: '', message: '' });
    } catch {
      toast({ title: 'Erro ao enviar mensagem. Tente novamente.', variant: 'destructive' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contato" className="section-padding bg-background relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-accent" />

      <div ref={ref} className="container-custom mx-auto max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-8 h-1 bg-primary" />
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">
              Contato
            </span>
            <div className="w-8 h-1 bg-primary" />
          </div>
          <h2 className="font-heading text-3xl md:text-4xl text-foreground font-bold mb-4">
            Envie sua Mensagem
          </h2>
          <p className="text-muted-foreground">
            Preencha o formulário abaixo e entraremos em contato o mais breve possível.
          </p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-card rounded-2xl shadow-lg p-6 md:p-10 space-y-5 border border-border"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label htmlFor="contact-name">Nome completo</Label>
              <Input
                id="contact-name"
                placeholder="Seu nome"
                value={formData.name}
                onChange={set('name')}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact-email">E-mail</Label>
              <Input
                id="contact-email"
                type="email"
                placeholder="seu@email.com"
                value={formData.email}
                onChange={set('email')}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="contact-whatsapp">WhatsApp</Label>
            <Input
              id="contact-whatsapp"
              placeholder="(00) 00000-0000"
              value={formData.whatsapp}
              onChange={set('whatsapp')}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="contact-message">Mensagem</Label>
            <Textarea
              id="contact-message"
              placeholder="Como podemos ajudar?"
              rows={4}
              value={formData.message}
              onChange={set('message')}
              required
            />
          </div>

          <Button type="submit" size="xl" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? 'Enviando...' : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Enviar Mensagem
              </>
            )}
          </Button>
        </motion.form>
      </div>

      <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
        <DialogContent className="sm:max-w-md text-center flex flex-col items-center gap-4 py-10">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          >
            <CheckCircle2 className="w-16 h-16 text-primary" />
          </motion.div>
          <h2 className="text-2xl font-bold text-foreground">Mensagem Enviada! 🎉</h2>
          <p className="text-muted-foreground">
            Obrigado pelo contato! Retornaremos em breve.
          </p>
          <Button onClick={() => setShowSuccess(false)} size="lg" className="mt-2">
            Entendi
          </Button>
        </DialogContent>
      </Dialog>
    </section>
  );
};

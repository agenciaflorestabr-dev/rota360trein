import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { CheckCircle2 } from 'lucide-react';

interface EnrollmentFormProps {
  courseTitle: string;
}

export const EnrollmentForm = ({ courseTitle }: EnrollmentFormProps) => {
  const [agreed, setAgreed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', whatsapp: '', city: '', state: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) {
      toast({ title: 'Atenção', description: 'Você precisa concordar com os termos de uso e política de privacidade.', variant: 'destructive' });
      return;
    }
    setIsSubmitting(true);
    const { error } = await supabase.from('form_submissions').insert({
      name: formData.name,
      email: formData.email,
      whatsapp: formData.whatsapp,
      city: formData.city || null,
      state: formData.state || null,
      cnh_category: null,
      course_title: courseTitle,
    });
    setIsSubmitting(false);
    if (error) {
      toast({ title: 'Erro ao enviar', description: error.message, variant: 'destructive' });
    } else {
      setShowSuccess(true);

      // Send WhatsApp message via Evolution API
      let instanceName = localStorage.getItem('evolution_instance');
      if (!instanceName) {
        const { data: dbInstance } = await supabase
          .from('site_content')
          .select('value')
          .eq('section_key', 'evolution_instance_name')
          .maybeSingle();
        instanceName = dbInstance?.value || null;
      }
      if (instanceName) {
        const rawPhone = formData.whatsapp.replace(/\D/g, '');
        const phone = rawPhone.startsWith('55') ? rawPhone : `55${rawPhone}`;
        const message = `Olá, ${formData.name}, vimos que você tem interesse no curso ${courseTitle}. Seja muito bem-vindo à Rota 360 Treinamentos! Em breve, entraremos em contato para mais informações.`;
        try {
          await supabase.functions.invoke('evolution-api', {
            body: { action: 'send', instanceName, number: phone, text: message, recipientName: formData.name },
          });
        } catch (err) {
          console.error('Erro ao enviar WhatsApp:', err);
        }
      }

      setFormData({ name: '', email: '', whatsapp: '', city: '', state: '' });
      setAgreed(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="enrollment-form bg-background rounded-2xl shadow-card p-8 space-y-5 text-foreground">
        <div>
          <Label className="text-xs text-muted-foreground">Curso selecionado:</Label>
          <p className="font-heading font-semibold text-foreground">{courseTitle}</p>
        </div>

        <div>
          <Label htmlFor="name">Nome completo *</Label>
          <Input id="name" placeholder="Digite seu nome completo" value={formData.name} onChange={e => setFormData(p => ({ ...p, name: e.target.value }))} required />
        </div>

        <div>
          <Label htmlFor="email">E-mail *</Label>
          <Input id="email" type="email" placeholder="seu@email.com" value={formData.email} onChange={e => setFormData(p => ({ ...p, email: e.target.value }))} required />
        </div>

        <div>
          <Label htmlFor="whatsapp">WhatsApp *</Label>
          <Input id="whatsapp" placeholder="(11) 99999-9999" value={formData.whatsapp} onChange={e => setFormData(p => ({ ...p, whatsapp: e.target.value }))} required />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="city">Cidade</Label>
            <Input id="city" placeholder="Sua cidade" value={formData.city} onChange={e => setFormData(p => ({ ...p, city: e.target.value }))} />
          </div>
          <div>
            <Label htmlFor="state">Estado</Label>
            <Input id="state" placeholder="UF" maxLength={2} value={formData.state} onChange={e => setFormData(p => ({ ...p, state: e.target.value }))} />
          </div>
        </div>

        <div className="flex items-start gap-2">
          <Checkbox id="terms" checked={agreed} onCheckedChange={(v) => setAgreed(v === true)} />
          <Label htmlFor="terms" className="text-sm text-muted-foreground leading-tight cursor-pointer">
            Li e estou de acordo com os <a href="#" className="underline text-foreground">termos de uso</a> e <a href="#" className="underline text-foreground">política de privacidade</a>.
          </Label>
        </div>

        <Button type="submit" variant="whatsapp" size="xl" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? 'Enviando...' : 'Entrar em contato'}
        </Button>

        <p className="text-xs text-center text-muted-foreground">
          Ao clicar em "Entrar em contato", nossa equipe retornará em breve.
        </p>
      </form>

      <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
        <DialogContent className="sm:max-w-md text-center space-y-4">
          <div className="flex justify-center">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10 text-primary" />
            </div>
          </div>
          <h2 className="text-2xl font-heading font-bold text-foreground">Parabéns! 🎉</h2>
          <p className="text-muted-foreground">
            Seu cadastro foi realizado com sucesso! Agradecemos pelo interesse no curso <span className="font-semibold text-foreground">{courseTitle}</span>.
          </p>
          <p className="text-sm text-muted-foreground">
            Nossa equipe entrará em contato em breve pelo WhatsApp para dar continuidade à sua matrícula.
          </p>
          <Button onClick={() => setShowSuccess(false)} className="w-full mt-2">
            Entendi
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
};
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', whatsapp: '', city: '', state: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) {
      toast({ title: 'Atenção', description: 'Você precisa concordar com os termos de uso e política de privacidade.', variant: 'destructive' });
      return;
    }
    setIsSubmitting(true);
    const { error } = await supabase.from('form_submissions').insert({
      name: formData.name,
      email: formData.email,
      whatsapp: formData.whatsapp,
      city: formData.city || null,
      state: formData.state || null,
      cnh_category: null,
      course_title: courseTitle,
    });
    setIsSubmitting(false);
    if (error) {
      toast({ title: 'Erro ao enviar', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Dados enviados!', description: 'Em breve entraremos em contato com você.' });

      // Send WhatsApp message via Evolution API
      let instanceName = localStorage.getItem('evolution_instance');
      if (!instanceName) {
        const { data: dbInstance } = await supabase
          .from('site_content')
          .select('value')
          .eq('section_key', 'evolution_instance_name')
          .maybeSingle();
        instanceName = dbInstance?.value || null;
      }
      if (instanceName) {
        const rawPhone = formData.whatsapp.replace(/\D/g, '');
        const phone = rawPhone.startsWith('55') ? rawPhone : `55${rawPhone}`;
        const message = `Olá, ${formData.name}, vimos que você tem interesse no curso ${courseTitle}. Seja muito bem-vindo à Rota 360 Treinamentos! Em breve, entraremos em contato para mais informações.`;
        try {
          await supabase.functions.invoke('evolution-api', {
            body: { action: 'send', instanceName, number: phone, text: message, recipientName: formData.name },
          });
        } catch (err) {
          console.error('Erro ao enviar WhatsApp:', err);
        }
      }

      setFormData({ name: '', email: '', whatsapp: '', city: '', state: '' });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="enrollment-form bg-background rounded-2xl shadow-card p-8 space-y-5 text-foreground">
      <div>
        <Label className="text-xs text-muted-foreground">Curso selecionado:</Label>
        <p className="font-heading font-semibold text-foreground">{courseTitle}</p>
      </div>

      <div>
        <Label htmlFor="name">Nome completo *</Label>
        <Input id="name" placeholder="Digite seu nome completo" value={formData.name} onChange={e => setFormData(p => ({ ...p, name: e.target.value }))} required />
      </div>

      <div>
        <Label htmlFor="email">E-mail *</Label>
        <Input id="email" type="email" placeholder="seu@email.com" value={formData.email} onChange={e => setFormData(p => ({ ...p, email: e.target.value }))} required />
      </div>

      <div>
        <Label htmlFor="whatsapp">WhatsApp *</Label>
        <Input id="whatsapp" placeholder="(11) 99999-9999" value={formData.whatsapp} onChange={e => setFormData(p => ({ ...p, whatsapp: e.target.value }))} required />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="city">Cidade</Label>
          <Input id="city" placeholder="Sua cidade" value={formData.city} onChange={e => setFormData(p => ({ ...p, city: e.target.value }))} />
        </div>
        <div>
          <Label htmlFor="state">Estado</Label>
          <Input id="state" placeholder="UF" maxLength={2} value={formData.state} onChange={e => setFormData(p => ({ ...p, state: e.target.value }))} />
        </div>
      </div>




      <div className="flex items-start gap-2">
        <Checkbox id="terms" checked={agreed} onCheckedChange={(v) => setAgreed(v === true)} />
        <Label htmlFor="terms" className="text-sm text-muted-foreground leading-tight cursor-pointer">
          Li e estou de acordo com os <a href="#" className="underline text-foreground">termos de uso</a> e <a href="#" className="underline text-foreground">política de privacidade</a>.
        </Label>
      </div>

      <Button type="submit" variant="whatsapp" size="xl" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? 'Enviando...' : 'Entrar em contato'}
      </Button>

      <p className="text-xs text-center text-muted-foreground">
        Ao clicar em "Entrar em contato", nossa equipe retornará em breve.
      </p>
    </form>
  );
};

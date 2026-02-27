import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface EnrollmentFormProps {
  courseTitle: string;
}

export const EnrollmentForm = ({ courseTitle }: EnrollmentFormProps) => {
  const [agreed, setAgreed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', whatsapp: '', city: '', state: '', cnh_category: '' });

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
      cnh_category: formData.cnh_category || null,
      course_title: courseTitle,
    });
    setIsSubmitting(false);
    if (error) {
      toast({ title: 'Erro ao enviar', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Dados enviados!', description: 'Você será redirecionado para a página de pagamento.' });
      setFormData({ name: '', email: '', whatsapp: '', city: '', state: '', cnh_category: '' });
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

      <div>
        <Label>Categoria da CNH</Label>
        <Select value={formData.cnh_category} onValueChange={v => setFormData(p => ({ ...p, cnh_category: v }))}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione a categoria" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="A">A</SelectItem>
            <SelectItem value="B">B</SelectItem>
            <SelectItem value="C">C</SelectItem>
            <SelectItem value="D">D</SelectItem>
            <SelectItem value="E">E</SelectItem>
            <SelectItem value="AB">AB</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-start gap-2">
        <Checkbox id="terms" checked={agreed} onCheckedChange={(v) => setAgreed(v === true)} />
        <Label htmlFor="terms" className="text-sm text-muted-foreground leading-tight cursor-pointer">
          Li e estou de acordo com os <a href="#" className="underline text-foreground">termos de uso</a> e <a href="#" className="underline text-foreground">política de privacidade</a>.
        </Label>
      </div>

      <Button type="submit" variant="whatsapp" size="xl" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? 'Enviando...' : 'Prosseguir para pagamento'}
      </Button>

      <p className="text-xs text-center text-muted-foreground">
        Ao clicar em "Prosseguir", você será redirecionado para a página segura de pagamento.
      </p>
    </form>
  );
};

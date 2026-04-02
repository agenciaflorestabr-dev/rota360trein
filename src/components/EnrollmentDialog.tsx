import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Loader2, Send } from 'lucide-react';

const ESTADOS_BR = [
  'AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS','MG','PA',
  'PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO'
];

interface EnrollmentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  courseTitle: string;
  coursePrice?: number;
  courseSlug?: string;
}

export const EnrollmentDialog = ({ open, onOpenChange, courseTitle, coursePrice, courseSlug }: EnrollmentDialogProps) => {
  const [agreed, setAgreed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', cpf: '',
    cnh_register: '', cnh_category: '', birth_date: '',
    street: '', number: '', neighborhood: '',
    city: '', state: '', cep: '',
  });

  const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData(p => ({ ...p, [field]: e.target.value }));

  const formatCpf = (v: string) => {
    const d = v.replace(/\D/g, '').slice(0, 11);
    return d.replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  };

  const formatCep = (v: string) => {
    const d = v.replace(/\D/g, '').slice(0, 8);
    return d.replace(/(\d{5})(\d)/, '$1-$2');
  };

  const formatPhone = (v: string) => {
    const d = v.replace(/\D/g, '').slice(0, 11);
    if (d.length <= 10) return d.replace(/(\d{2})(\d)/, '($1) $2').replace(/(\d{4})(\d)/, '$1-$2');
    return d.replace(/(\d{2})(\d)/, '($1) $2').replace(/(\d{5})(\d)/, '$1-$2');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) {
      toast({ title: 'Atenção', description: 'Você precisa concordar com os termos.', variant: 'destructive' });
      return;
    }
    setIsSubmitting(true);

    const submissionId = crypto.randomUUID();
    const { error } = await supabase.from('form_submissions').insert({
      id: submissionId,
      name: formData.name,
      email: formData.email,
      whatsapp: formData.phone,
      phone: formData.phone,
      cpf: formData.cpf,
      cnh_register: formData.cnh_register,
      cnh_category: formData.cnh_category || null,
      city: formData.city || null,
      state: formData.state || null,
      street: formData.street || null,
      number: formData.number || null,
      neighborhood: formData.neighborhood || null,
      cep: formData.cep || null,
      birth_date: formData.birth_date || null,
      course_title: courseTitle,
      status: 'pending',
    });

    if (error) {
      toast({ title: 'Erro ao salvar', description: error.message, variant: 'destructive' });
      setIsSubmitting(false);
      return;
    }

    // Send WhatsApp confirmation
    let instanceName = localStorage.getItem('evolution_instance');
    if (!instanceName) {
      const { data: dbInstance } = await supabase
        .from('site_content').select('value')
        .eq('section_key', 'evolution_instance_name').maybeSingle();
      instanceName = dbInstance?.value || null;
    }
    if (instanceName) {
      const rawPhone = formData.phone.replace(/\D/g, '');
      const phone = rawPhone.startsWith('55') ? rawPhone : `55${rawPhone}`;
      const message = `✅ *Cadastro Efetuado com Sucesso!*\n\nOlá, ${formData.name}! Seu cadastro para o curso "${courseTitle}" na Rota 360 Treinamentos foi realizado.\n\nEm breve nossa equipe entrará em contato. Obrigado pela confiança! 🚀`;
      try {
        await supabase.functions.invoke('evolution-api', {
          body: { action: 'send', instanceName, number: phone, text: message, recipientName: formData.name },
        });
      } catch (err) {
        console.error('Erro ao enviar WhatsApp:', err);
      }
    }

    // If course has price, redirect to MP checkout
    if (coursePrice && coursePrice > 0) {
      try {
        const { data: mpData, error: mpError } = await supabase.functions.invoke('mercadopago-create', {
          body: {
            title: courseTitle,
            price: coursePrice,
            slug: courseSlug,
            quantity: 1,
            studentName: formData.name,
            studentEmail: formData.email,
            studentWhatsapp: formData.phone,
            formSubmissionId: submission?.id,
          },
        });
        if (mpError) throw new Error(mpError.message);
        if (mpData?.init_point) {
          window.location.href = mpData.init_point;
          return;
        }
      } catch (err) {
        console.error('Erro ao criar pagamento:', err);
      }
    }

    toast({ title: 'Cadastro efetuado!', description: 'Você receberá uma confirmação no WhatsApp.' });
    setFormData({
      name: '', email: '', phone: '', cpf: '',
      cnh_register: '', cnh_category: '', birth_date: '',
      street: '', number: '', neighborhood: '',
      city: '', state: '', cep: '',
    });
    setAgreed(false);
    setIsSubmitting(false);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-heading text-xl">Matrícula — {courseTitle}</DialogTitle>
          {coursePrice && coursePrice > 0 && (
            <p className="text-sm text-primary font-semibold">
              R$ {coursePrice.toFixed(2).replace('.', ',')}
            </p>
          )}
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <h3 className="font-heading font-semibold text-foreground text-sm border-b border-border pb-2">Dados Pessoais</h3>

          <div>
            <Label htmlFor="d-name">Nome completo *</Label>
            <Input id="d-name" placeholder="Digite seu nome completo" value={formData.name} onChange={set('name')} required />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <Label htmlFor="d-email">E-mail *</Label>
              <Input id="d-email" type="email" placeholder="seu@email.com" value={formData.email} onChange={set('email')} required />
            </div>
            <div>
              <Label htmlFor="d-phone">Telefone / WhatsApp *</Label>
              <Input id="d-phone" placeholder="(64) 99999-9999" value={formData.phone} onChange={e => setFormData(p => ({ ...p, phone: formatPhone(e.target.value) }))} required />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <Label htmlFor="d-cpf">CPF *</Label>
              <Input id="d-cpf" placeholder="000.000.000-00" value={formData.cpf} onChange={e => setFormData(p => ({ ...p, cpf: formatCpf(e.target.value) }))} required />
            </div>
            <div>
              <Label htmlFor="d-birth">Data de nascimento *</Label>
              <Input id="d-birth" type="date" value={formData.birth_date} onChange={set('birth_date')} required />
            </div>
          </div>

          <h3 className="font-heading font-semibold text-foreground text-sm border-b border-border pb-2 pt-1">Dados da CNH</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <Label htmlFor="d-cnh">Registro da CNH *</Label>
              <Input id="d-cnh" placeholder="Nº do registro" value={formData.cnh_register} onChange={set('cnh_register')} required />
            </div>
            <div>
              <Label htmlFor="d-cat">Categoria da CNH *</Label>
              <Select value={formData.cnh_category} onValueChange={v => setFormData(p => ({ ...p, cnh_category: v }))}>
                <SelectTrigger id="d-cat"><SelectValue placeholder="Selecione" /></SelectTrigger>
                <SelectContent>
                  {['A','B','C','D','E','AB','AC','AD','AE'].map(c => (
                    <SelectItem key={c} value={c}>{c}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <h3 className="font-heading font-semibold text-foreground text-sm border-b border-border pb-2 pt-1">Endereço</h3>

          <div>
            <Label htmlFor="d-street">Rua *</Label>
            <Input id="d-street" placeholder="Nome da rua" value={formData.street} onChange={set('street')} required />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <Label htmlFor="d-num">Número *</Label>
              <Input id="d-num" placeholder="Nº" value={formData.number} onChange={set('number')} required />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="d-bairro">Bairro *</Label>
              <Input id="d-bairro" placeholder="Bairro" value={formData.neighborhood} onChange={set('neighborhood')} required />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <Label htmlFor="d-city">Cidade *</Label>
              <Input id="d-city" placeholder="Sua cidade" value={formData.city} onChange={set('city')} required />
            </div>
            <div>
              <Label htmlFor="d-state">Estado *</Label>
              <Select value={formData.state} onValueChange={v => setFormData(p => ({ ...p, state: v }))}>
                <SelectTrigger id="d-state"><SelectValue placeholder="UF" /></SelectTrigger>
                <SelectContent>
                  {ESTADOS_BR.map(uf => (
                    <SelectItem key={uf} value={uf}>{uf}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="d-cep">CEP *</Label>
              <Input id="d-cep" placeholder="00000-000" value={formData.cep} onChange={e => setFormData(p => ({ ...p, cep: formatCep(e.target.value) }))} required />
            </div>
          </div>

          <div className="flex items-start gap-2 pt-1">
            <Checkbox id="d-terms" checked={agreed} onCheckedChange={(v) => setAgreed(v === true)} />
            <Label htmlFor="d-terms" className="text-sm text-muted-foreground leading-tight cursor-pointer">
              Li e estou de acordo com os <a href="#" className="underline text-foreground">termos de uso</a> e <a href="#" className="underline text-foreground">política de privacidade</a>.
            </Label>
          </div>

          <Button type="submit" variant="whatsapp" size="xl" className="w-full gap-2" disabled={isSubmitting}>
            {isSubmitting ? (
              <><Loader2 className="w-4 h-4 animate-spin" /> Processando...</>
            ) : coursePrice && coursePrice > 0 ? (
              <><Send className="w-5 h-5" /> Matricular e Pagar</>
            ) : (
              <><Send className="w-5 h-5" /> Enviar Cadastro</>
            )}
          </Button>

          <p className="text-xs text-center text-muted-foreground">
            {coursePrice && coursePrice > 0
              ? 'Após o cadastro, você será redirecionado ao Mercado Pago para finalizar o pagamento.'
              : 'Ao enviar, nossa equipe entrará em contato pelo WhatsApp.'}
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
};

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { WhatsAppFloat } from '@/components/WhatsAppFloat';
import { motion } from 'framer-motion';
import { UserPlus, Send } from 'lucide-react';

const ESTADOS_BR = [
  'AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS','MG','PA',
  'PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO'
];

const Cadastro = () => {
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

    // 1. Save to database (admin panel)
    const { error } = await supabase.from('form_submissions').insert({
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
      course_title: 'Cadastro Completo',
      status: 'pending',
    });

    if (error) {
      toast({ title: 'Erro ao salvar', description: error.message, variant: 'destructive' });
      setIsSubmitting(false);
      return;
    }

    // 2. Send WhatsApp confirmation to the person
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
      const rawPhone = formData.phone.replace(/\D/g, '');
      const phone = rawPhone.startsWith('55') ? rawPhone : `55${rawPhone}`;
      const message = `✅ *Cadastro Efetuado com Sucesso!*\n\n` +
        `Olá, ${formData.name}! Seu cadastro na Rota 360 Treinamentos foi realizado com sucesso.\n\n` +
        `Em breve nossa equipe entrará em contato com as próximas orientações sobre o seu curso.\n\n` +
        `Obrigado pela confiança! 🚀`;

      try {
        await supabase.functions.invoke('evolution-api', {
          body: { action: 'send', instanceName, number: phone, text: message, recipientName: formData.name },
        });
      } catch (err) {
        console.error('Erro ao enviar WhatsApp:', err);
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
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <section className="relative py-20 bg-gradient-to-br from-primary/10 via-background to-accent/10">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto"
          >
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-4">
                <UserPlus className="w-5 h-5" />
                <span className="font-semibold text-sm">Cadastro do Aluno</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-3">
                Faça seu cadastro
              </h1>
              <p className="text-muted-foreground">
                Preencha os dados abaixo para efetuar seu cadastro no curso.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="bg-card rounded-2xl shadow-card p-8 space-y-5 border border-border">
              {/* Dados Pessoais */}
              <h2 className="font-heading font-semibold text-foreground text-lg border-b border-border pb-2">Dados Pessoais</h2>

              <div>
                <Label htmlFor="name">Nome completo *</Label>
                <Input id="name" placeholder="Digite seu nome completo" value={formData.name} onChange={set('name')} required />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email">E-mail *</Label>
                  <Input id="email" type="email" placeholder="seu@email.com" value={formData.email} onChange={set('email')} required />
                </div>
                <div>
                  <Label htmlFor="phone">Telefone *</Label>
                  <Input id="phone" placeholder="(64) 99999-9999" value={formData.phone} onChange={e => setFormData(p => ({ ...p, phone: formatPhone(e.target.value) }))} required />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="cpf">CPF *</Label>
                  <Input id="cpf" placeholder="000.000.000-00" value={formData.cpf} onChange={e => setFormData(p => ({ ...p, cpf: formatCpf(e.target.value) }))} required />
                </div>
                <div>
                  <Label htmlFor="birth_date">Data de nascimento *</Label>
                  <Input id="birth_date" type="date" value={formData.birth_date} onChange={set('birth_date')} required />
                </div>
              </div>

              {/* CNH */}
              <h2 className="font-heading font-semibold text-foreground text-lg border-b border-border pb-2 pt-2">Dados da CNH</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="cnh_register">Registro da CNH *</Label>
                  <Input id="cnh_register" placeholder="Nº do registro" value={formData.cnh_register} onChange={set('cnh_register')} required />
                </div>
                <div>
                  <Label htmlFor="cnh_category">Categoria da CNH *</Label>
                  <Select value={formData.cnh_category} onValueChange={v => setFormData(p => ({ ...p, cnh_category: v }))}>
                    <SelectTrigger id="cnh_category">
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      {['A', 'B', 'C', 'D', 'E', 'AB', 'AC', 'AD', 'AE'].map(c => (
                        <SelectItem key={c} value={c}>{c}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Endereço */}
              <h2 className="font-heading font-semibold text-foreground text-lg border-b border-border pb-2 pt-2">Endereço</h2>

              <div>
                <Label htmlFor="street">Rua *</Label>
                <Input id="street" placeholder="Nome da rua" value={formData.street} onChange={set('street')} required />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="number">Número *</Label>
                  <Input id="number" placeholder="Nº" value={formData.number} onChange={set('number')} required />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="neighborhood">Bairro *</Label>
                  <Input id="neighborhood" placeholder="Bairro" value={formData.neighborhood} onChange={set('neighborhood')} required />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="city">Cidade *</Label>
                  <Input id="city" placeholder="Sua cidade" value={formData.city} onChange={set('city')} required />
                </div>
                <div>
                  <Label htmlFor="state">Estado *</Label>
                  <Select value={formData.state} onValueChange={v => setFormData(p => ({ ...p, state: v }))}>
                    <SelectTrigger id="state">
                      <SelectValue placeholder="UF" />
                    </SelectTrigger>
                    <SelectContent>
                      {ESTADOS_BR.map(uf => (
                        <SelectItem key={uf} value={uf}>{uf}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="cep">CEP *</Label>
                  <Input id="cep" placeholder="00000-000" value={formData.cep} onChange={e => setFormData(p => ({ ...p, cep: formatCep(e.target.value) }))} required />
                </div>
              </div>

              {/* Termos */}
              <div className="flex items-start gap-2 pt-2">
                <Checkbox id="terms" checked={agreed} onCheckedChange={(v) => setAgreed(v === true)} />
                <Label htmlFor="terms" className="text-sm text-muted-foreground leading-tight cursor-pointer">
                  Li e estou de acordo com os <a href="#" className="underline text-foreground">termos de uso</a> e <a href="#" className="underline text-foreground">política de privacidade</a>.
                </Label>
              </div>

              <Button type="submit" variant="whatsapp" size="xl" className="w-full gap-2" disabled={isSubmitting}>
                <Send className="w-5 h-5" />
                {isSubmitting ? 'Enviando...' : 'Enviar Cadastro'}
              </Button>

              <p className="text-xs text-center text-muted-foreground">
                Ao enviar, seu cadastro será registrado e você receberá uma confirmação via WhatsApp.
              </p>
            </form>
          </motion.div>
        </div>
      </section>

      <Footer />
      <WhatsAppFloat />
    </div>
  );
};

export default Cadastro;

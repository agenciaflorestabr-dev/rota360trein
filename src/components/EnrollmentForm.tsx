import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from '@/hooks/use-toast';

interface EnrollmentFormProps {
  courseTitle: string;
}

export const EnrollmentForm = ({ courseTitle }: EnrollmentFormProps) => {
  const [agreed, setAgreed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) {
      toast({ title: 'Atenção', description: 'Você precisa concordar com os termos de uso e política de privacidade.', variant: 'destructive' });
      return;
    }
    toast({ title: 'Dados enviados!', description: 'Você será redirecionado para a página de pagamento.' });
  };

  return (
    <form onSubmit={handleSubmit} className="enrollment-form bg-background rounded-2xl shadow-card p-8 space-y-5 text-foreground">
      <div>
        <Label className="text-xs text-muted-foreground">Curso selecionado:</Label>
        <p className="font-heading font-semibold text-foreground">{courseTitle}</p>
      </div>

      <div>
        <Label htmlFor="name">Nome completo *</Label>
        <Input id="name" placeholder="Digite seu nome completo" required />
      </div>

      <div>
        <Label htmlFor="email">E-mail *</Label>
        <Input id="email" type="email" placeholder="seu@email.com" required />
      </div>

      <div>
        <Label htmlFor="whatsapp">WhatsApp *</Label>
        <Input id="whatsapp" placeholder="(11) 99999-9999" required />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="city">Cidade</Label>
          <Input id="city" placeholder="Sua cidade" />
        </div>
        <div>
          <Label htmlFor="state">Estado</Label>
          <Input id="state" placeholder="UF" maxLength={2} />
        </div>
      </div>

      <div>
        <Label>Categoria da CNH</Label>
        <Select>
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

      <Button type="submit" variant="whatsapp" size="xl" className="w-full">
        Prosseguir para pagamento
      </Button>

      <p className="text-xs text-center text-muted-foreground">
        Ao clicar em "Prosseguir", você será redirecionado para a página segura de pagamento.
      </p>
    </form>
  );
};

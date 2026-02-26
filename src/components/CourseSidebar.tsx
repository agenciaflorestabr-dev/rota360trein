import { CheckCircle, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { CourseDetail } from '@/data/coursesData';

interface CourseSidebarProps {
  course: CourseDetail;
}

export const CourseSidebar = ({ course }: CourseSidebarProps) => {
  const installmentValue = course.price && course.installments 
    ? (course.price / course.installments).toFixed(2).replace('.', ',')
    : null;

  return (
    <div className="lg:sticky lg:top-24 h-fit">
      <div className="bg-background rounded-2xl shadow-card p-6 space-y-4">
        <h3 className="font-heading font-bold text-lg text-foreground">{course.title}</h3>
        <p className="text-sm text-muted-foreground">{course.modality} • {course.duration}</p>
        
        {course.price ? (
          <div className="border-t border-border pt-4">
            <p className="font-heading font-bold text-3xl text-foreground">
              R$ {course.price.toFixed(2).replace('.', ',')}
            </p>
            {installmentValue && (
              <p className="text-xs text-muted-foreground">
                ou até {course.installments}x de R$ {installmentValue}
              </p>
            )}
          </div>
        ) : (
          <div className="border-t border-border pt-4">
            <p className="font-heading font-bold text-foreground mb-1">Consulte valores</p>
            <p className="text-xs text-muted-foreground">Entre em contato para condições especiais</p>
          </div>
        )}

        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 text-secondary">
            <CheckCircle className="w-4 h-4" />
            <span>Acesso imediato após pagamento</span>
          </div>
          <div className="flex items-center gap-2 text-secondary">
            <CheckCircle className="w-4 h-4" />
            <span>Certificado digital incluso</span>
          </div>
          <div className="flex items-center gap-2 text-secondary">
            <CheckCircle className="w-4 h-4" />
            <span>Suporte pelo WhatsApp</span>
          </div>
        </div>

        <Button variant="whatsapp" size="xl" className="w-full gap-2" asChild>
          <a href="#matricula" onClick={(e) => {
            e.preventDefault();
            document.querySelector('.enrollment-form')?.scrollIntoView({ behavior: 'smooth' });
          }}>
            <Phone className="w-5 h-5" />
            Preencher dados para matrícula
          </a>
        </Button>

        {course.price && (
          <p className="text-xs text-center text-muted-foreground">
            🔒 Pagamento seguro via Stripe
          </p>
        )}
      </div>
    </div>
  );
};

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Lock, Mail, Eye, EyeOff, User } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const { signIn, signUp, user, isAdmin, loading } = useAuth();
  const navigate = useNavigate();

  // Redirect when user is authenticated and is admin
  useEffect(() => {
    if (!loading && user && isAdmin) {
      navigate('/admin');
    }
  }, [user, isAdmin, loading, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    if (isRegister) {
      const { error } = await signUp(email, password, name);
      setIsLoading(false);
      if (error) {
        toast({ title: 'Erro ao registrar', description: error.message, variant: 'destructive' });
      } else {
        toast({ title: 'Conta criada!', description: 'Faça login para acessar o painel.' });
        setIsRegister(false);
      }
    } else {
      const { error } = await signIn(email, password);
      if (error) {
        setIsLoading(false);
        toast({ title: 'Erro ao entrar', description: error.message, variant: 'destructive' });
      }
      // Don't setIsLoading(false) on success — the useEffect redirect will handle it
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-heading font-bold text-foreground">Painel Administrativo</h1>
          <p className="text-muted-foreground mt-1">Rota 360 Treinamentos</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">{isRegister ? 'Criar Conta' : 'Entrar'}</CardTitle>
            <CardDescription>{isRegister ? 'Crie sua conta de administrador' : 'Acesse com suas credenciais'}</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {isRegister && (
                <div>
                  <Label htmlFor="name">Nome</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                    <Input id="name" placeholder="Seu nome" value={name} onChange={e => setName(e.target.value)} className="pl-10" required />
                  </div>
                </div>
              )}
              <div>
                <Label htmlFor="email">E-mail</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input id="email" type="email" placeholder="admin@rota360.com" value={email} onChange={e => setEmail(e.target.value)} className="pl-10" required />
                </div>
              </div>
              <div>
                <Label htmlFor="password">Senha</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input id="password" type={showPassword ? 'text' : 'password'} placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} className="pl-10 pr-10" required />
                  <button type="button" className="absolute right-3 top-3 text-muted-foreground hover:text-foreground" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                {isLoading ? 'Aguarde...' : isRegister ? 'Criar Conta' : 'Entrar'}
              </Button>
              <button type="button" className="w-full text-sm text-muted-foreground hover:text-foreground text-center" onClick={() => setIsRegister(!isRegister)}>
                {isRegister ? 'Já tem conta? Entrar' : 'Criar uma conta'}
              </button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminLogin;

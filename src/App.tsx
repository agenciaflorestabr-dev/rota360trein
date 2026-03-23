import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index";
import Cursos from "./pages/Cursos";
import Advocacia from "./pages/Advocacia";
import Treinamentos from "./pages/Treinamentos";
import Empresa from "./pages/Empresa";
import Cadastro from "./pages/Cadastro";
import CursoDetalhe from "./pages/CursoDetalhe";
import PagamentoStatus from "./pages/PagamentoStatus";
import AdminLogin from "./pages/AdminLogin";
import AdminLayout from "./components/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import Cadastros from "./pages/admin/Cadastros";
import Leads from "./pages/admin/Leads";
import Mensagens from "./pages/admin/Mensagens";
import Pagamentos from "./pages/admin/Pagamentos";
import Configuracoes from "./pages/admin/Configuracoes";
import Precos from "./pages/admin/Precos";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/cursos" element={<Cursos />} />
            <Route path="/advocacia" element={<Advocacia />} />
            <Route path="/treinamentos" element={<Treinamentos />} />
            <Route path="/empresa" element={<Empresa />} />
            <Route path="/curso/:slug" element={<CursoDetalhe />} />
            <Route path="/cadastro" element={<Cadastro />} />
            <Route path="/pagamento/sucesso" element={<PagamentoStatus />} />
            <Route path="/pagamento/erro" element={<PagamentoStatus />} />
            <Route path="/pagamento/pendente" element={<PagamentoStatus />} />
            
            {/* Admin routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="leads" element={<Leads />} />
              <Route path="cadastros" element={<Cadastros />} />
              <Route path="pagamentos" element={<Pagamentos />} />
              <Route path="mensagens" element={<Mensagens />} />
              <Route path="config" element={<Configuracoes />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

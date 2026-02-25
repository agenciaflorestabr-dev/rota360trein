import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Cursos from "./pages/Cursos";
import Advocacia from "./pages/Advocacia";
import Treinamentos from "./pages/Treinamentos";
import Empresa from "./pages/Empresa";
import CursoDetalhe from "./pages/CursoDetalhe";
import MaquinasPesadas from "./pages/MaquinasPesadas";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
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
          <Route path="/maquinas-pesadas" element={<MaquinasPesadas />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

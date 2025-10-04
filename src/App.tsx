import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import Dashboard from "./pages/Dashboard";
import Upload from "./pages/Upload";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="flex min-h-screen w-full bg-background">
          <Sidebar />
          <div className="flex-1 ml-64">
            <Header />
            <main className="pt-16 p-8">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/upload" element={<Upload />} />
                <Route path="/results" element={<div className="text-center p-12"><h1 className="text-3xl font-orbitron">Analysis Results - Coming Soon</h1></div>} />
                <Route path="/protocol" element={<div className="text-center p-12"><h1 className="text-3xl font-orbitron">Protocol Mapping - Coming Soon</h1></div>} />
                <Route path="/compliance" element={<div className="text-center p-12"><h1 className="text-3xl font-orbitron">Risk & Compliance - Coming Soon</h1></div>} />
                <Route path="/api" element={<div className="text-center p-12"><h1 className="text-3xl font-orbitron">API Integration - Coming Soon</h1></div>} />
                <Route path="/settings" element={<div className="text-center p-12"><h1 className="text-3xl font-orbitron">Settings - Coming Soon</h1></div>} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
          </div>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

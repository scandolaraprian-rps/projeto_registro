import React, { useState, useEffect } from 'react';
import { LogOut, Shield, LayoutDashboard, Search, PlusCircle, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: 'dashboard' | 'register' | 'verify';
  onTabChange: (tab: 'dashboard' | 'register' | 'verify') => void;
}

export default function Layout({ children, activeTab, onTabChange }: LayoutProps) {
  const [user, setUser] = useState<{ id: string, email: string, user_metadata: any } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for mock session
    const savedUser = localStorage.getItem('mock_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async () => {
    const mockUser = {
      id: 'mock-123',
      email: 'auditor@authledger.io',
      user_metadata: {
        full_name: 'Salsicha Auditor (Lead)',
        avatar_url: 'https://images.unsplash.com/photo-1612195583950-b8fd34c87093?q=80&w=200&auto=format&fit=crop'
      }
    };
    localStorage.setItem('mock_user', JSON.stringify(mockUser));
    setUser(mockUser);
  };

  const logout = async () => {
    localStorage.removeItem('mock_user');
    setUser(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--bg)]">
        <div className="flex flex-col items-center gap-4">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <Activity className="w-8 h-8 text-[var(--brand)]" />
          </motion.div>
          <span className="text-sm font-mono text-[var(--brand)] uppercase tracking-widest leading-none mt-2 opacity-70">Initializing Ledger...</span>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--bg)] p-6 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full"
        >
          <div className="flex justify-center mb-8">
            <div className="w-16 h-16 bg-[var(--surface)] border border-[var(--line)] rounded-2xl flex items-center justify-center shadow-2xl">
              <Shield className="w-8 h-8 text-[var(--brand)]" />
            </div>
          </div>
          <h1 className="text-4xl mb-4 font-bold tracking-tight text-[var(--ink)]">AuthLedger</h1>
          <p className="text-[var(--ink-muted)] mb-10 leading-relaxed max-w-sm mx-auto">
            Plataforma Corporativa de Registro Imutável de Eventos.
            Garantia de integridade Web3 para logística e compliance.
          </p>
          <button 
            onClick={login}
            className="w-full bg-[var(--brand)] text-[var(--bg)] py-4 rounded-xl font-bold uppercase tracking-widest text-sm hover:brightness-110 transition-all flex items-center justify-center gap-3 shadow-xl shadow-sky-900/20"
          >
            Acessar com Google Workspace
          </button>
          <p className="mt-12 text-[10px] font-mono text-[var(--ink-muted)] uppercase tracking-widest opacity-50">
            Enterprise Grade • Blockchain Anchoring • Zero Trust
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[var(--bg)] text-[var(--ink)]">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-[var(--bg)] border-r border-[var(--line)] flex flex-col">
        <div className="p-8 border-b border-[var(--line)] flex items-center gap-4">
          <div className="p-1.5 bg-[var(--brand)] rounded-lg">
             <Shield className="w-5 h-5 text-[var(--bg)]" />
          </div>
          <span className="font-bold tracking-tight text-xl">AuthLedger</span>
        </div>
        
        <nav className="flex-1 p-4 space-y-1">
          <NavItem 
            icon={<LayoutDashboard className="w-4 h-4" />} 
            label="Dashboard" 
            active={activeTab === 'dashboard'} 
            onClick={() => onTabChange('dashboard')}
          />
          <NavItem 
            icon={<PlusCircle className="w-4 h-4" />} 
            label="Novo Evento" 
            active={activeTab === 'register'} 
            onClick={() => onTabChange('register')}
          />
          <NavItem 
            icon={<Search className="w-4 h-4" />} 
            label="Audit Portal" 
            active={activeTab === 'verify'} 
            onClick={() => onTabChange('verify')}
          />
        </nav>

        <div className="p-6 border-t border-[var(--line)] bg-[var(--surface)]/30">
          <div className="flex items-center gap-3 p-3 bg-[var(--surface)] border border-[var(--line)] rounded-xl mb-6 overflow-hidden shadow-sm">
            <img src={user.user_metadata?.avatar_url || ''} alt="" className="w-10 h-10 rounded-lg grayscale hover:grayscale-0 transition-all" />
            <div className="min-w-0">
              <p className="text-xs font-bold truncate text-[var(--ink)]">{user.user_metadata?.full_name || user.email}</p>
              <p className="text-[9px] mono text-[var(--brand)] uppercase truncate opacity-80">Auditor Autorizado</p>
            </div>
          </div>
          <button 
            onClick={logout}
            className="w-full h-11 flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#f87171] bg-[#f87171]/10 border border-[#f87171]/20 rounded-xl hover:bg-[#f87171]/20 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            Sair do Sistema
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto bg-[var(--bg)]">
        <header className="h-20 bg-[var(--bg)]/80 backdrop-blur-md border-b border-[var(--line)] px-10 flex items-center justify-between sticky top-0 z-20">
          <div>
            <h2 className="text-lg font-bold tracking-tight capitalize">{activeTab}</h2>
            <p className="text-[10px] text-[var(--ink-muted)] font-mono uppercase tracking-widest leading-none mt-1.5 opacity-80">
              {activeTab === 'dashboard' && 'Visão Geral da Rede e Integridade'}
              {activeTab === 'register' && 'Ancoragem de Novo Payload Off-chain'}
              {activeTab === 'verify' && 'Verificação de Integridade Criptográfica'}
            </p>
          </div>
          <div className="flex items-center gap-4">
             <div className="hidden lg:flex items-center gap-2.5 px-4 py-2 bg-emerald-500/10 text-[var(--success)] border border-emerald-500/20 rounded-full">
                <div className="w-2 h-2 rounded-full bg-[var(--success)] animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest leading-none">Polygon L2: Active Node (42ms)</span>
             </div>
          </div>
        </header>

        <div className="p-10 max-w-7xl mx-auto min-h-[calc(100vh-80px)]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

function NavItem({ icon, label, active, onClick }: { icon: React.ReactNode, label: string, active?: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`w-full flex items-center gap-4 px-5 py-3.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${
        active 
          ? 'bg-[var(--surface)] text-[var(--brand)] border-r-4 border-[var(--brand)] shadow-lg' 
          : 'text-[var(--ink-muted)] hover:text-[var(--ink)] hover:bg-white/5'
      }`}
    >
      <div className={active ? 'text-[var(--brand)]' : 'text-inherit'}>
        {icon}
      </div>
      {label}
    </button>
  );
}

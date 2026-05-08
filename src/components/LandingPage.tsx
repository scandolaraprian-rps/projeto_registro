import React from 'react';
import { motion } from 'motion/react';
import { Shield, Lock, Zap, ArrowRight, Github, ExternalLink, Database, Globe } from 'lucide-react';

interface LandingPageProps {
  onEnter: () => void;
}

export default function LandingPage({ onEnter }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-[#0f172a] text-[#f8fafc] selection:bg-[#38bdf8] selection:text-[#0f172a] font-sans">
      {/* Navigation */}
      <nav className="h-20 border-b border-[#334155]/50 px-6 md:px-12 flex items-center justify-between backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="p-1.5 bg-[#38bdf8] rounded-lg">
            <Shield className="w-5 h-5 text-[#0f172a]" />
          </div>
          <span className="font-bold tracking-tight text-xl">AuthLedger</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-[#94a3b8]">
          <a href="#how" className="hover:text-[#38bdf8] transition-colors">Como Funciona</a>
          <a href="#tech" className="hover:text-[#38bdf8] transition-colors">Tecnologia</a>
          <button 
            onClick={onEnter}
            className="px-5 py-2 bg-white/5 border border-[#334155] rounded-full text-[#f8fafc] hover:bg-white/10 transition-all"
          >
            Acessar Console
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-6 pt-24 pb-32 md:pt-40 md:pb-48 max-w-7xl mx-auto text-center relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-[#38bdf8]/5 rounded-full blur-[120px] -z-10 animate-pulse"></div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-1.5 bg-[#38bdf8]/10 text-[#38bdf8] rounded-full text-xs font-bold uppercase tracking-[0.2em] mb-6 border border-[#38bdf8]/20">
            Open Source Integrity Protocol
          </span>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-[1.1]">
            Não aceite promessas.<br />
            Exija <span className="text-[#38bdf8]">provas matemáticas</span>.
          </h1>
          <p className="text-lg md:text-xl text-[#94a3b8] max-w-2xl mx-auto mb-12 leading-relaxed">
            Um sistema de registro que utiliza criptografia SHA-256 e a rede Polygon para garantir que seus dados nunca foram alterados após o registro original.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={onEnter}
              className="w-full sm:w-auto px-8 py-4 bg-[#38bdf8] text-[#0f172a] rounded-xl font-bold text-sm uppercase tracking-widest hover:brightness-110 transition-all shadow-xl shadow-[#38bdf8]/20 flex items-center justify-center gap-2"
            >
              Iniciar Verificação <ArrowRight className="w-4 h-4" />
            </button>
            <a 
              href="https://github.com" 
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto px-8 py-4 bg-white/5 border border-[#334155] text-[#f8fafc] rounded-xl font-bold text-sm uppercase tracking-widest hover:bg-white/10 transition-all flex items-center justify-center gap-2"
            >
              <Github className="w-4 h-4" /> Código Fonte
            </a>
          </div>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section id="how" className="px-6 py-32 bg-[#0f172a] relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard 
            icon={<Lock className="w-6 h-6" />}
            title="Imutabilidade Real"
            description="Cada dado gera um hash único. Se um único bit mudar no banco de dados, o selo de segurança quebra instantaneamente."
          />
          <FeatureCard 
            icon={<Globe className="w-6 h-6" />}
            title="Ancoragem Polygon"
            description="Registramos as provas na rede Polygon L2. Isso cria um registro público e independente que ninguém pode apagar."
          />
          <FeatureCard 
            icon={<Zap className="w-6 h-6" />}
            title="Transparência Total"
            description="Qualquer pessoa com o payload original e o ID pode verificar a validade do dado sem precisar da nossa autorização."
          />
        </div>
      </section>

      {/* Tech Stack */}
      <section id="tech" className="px-6 py-32 border-t border-[#334155]/30">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="flex-1 space-y-8">
              <h2 className="text-4xl font-bold tracking-tight">Construído sobre protocolos públicos.</h2>
              <div className="space-y-6">
                <TechItem 
                  title="Algoritmo SHA-256" 
                  desc="O mesmo padrão de segurança utilizado pelo Bitcoin para garantir que blocos de dados sejam únicos e encadeados." 
                />
                <TechItem 
                  title="Polygon L2 Strategy" 
                  desc="Escalabilidade para milhares de registros por segundo com custo de transação próximo de zero." 
                />
                <TechItem 
                  title="Zero-Trust Architecture" 
                  desc="Não confiamos em administradores de sistema. A segurança reside no código e na criptografia." 
                />
              </div>
            </div>
            <div className="flex-1 w-full flex justify-center">
              <div className="p-8 bg-[#1e293b] border border-[#334155] rounded-3xl shadow-2xl relative group">
                <div className="absolute inset-0 bg-[#38bdf8]/10 blur-3xl rounded-full -z-10 group-hover:bg-[#38bdf8]/20 transition-all"></div>
                <pre className="text-[11px] md:text-[13px] font-mono leading-relaxed text-[#38bdf8]">
{`{
  "protocol": "AuthLedger v2.4",
  "status": "SECURED",
  "anchoring": {
    "network": "Polygon Mainnet",
    "proof": "SHA-256-DETERMINISTIC",
    "verification": "PUBLIC_REST_API"
  },
  "security": {
    "tamper_proof": true,
    "audit_ready": true,
    "pii_shield": "ENABLED"
  }
}`}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="px-6 py-32 text-center overflow-hidden relative">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#38bdf8]/10 rounded-full blur-[100px] -z-10"></div>
        <div className="max-w-3xl mx-auto space-y-8">
          <h2 className="text-4xl font-bold tracking-tight">A integridade é o novo padrão.</h2>
          <p className="text-[#94a3b8] text-lg">
            Pare de apenas arquivar dados. Comece a provar que eles são reais.
          </p>
          <button 
            onClick={onEnter}
            className="px-10 py-5 bg-[#38bdf8] text-[#0f172a] rounded-2xl font-bold text-sm uppercase tracking-widest hover:scale-105 transition-all shadow-2xl"
          >
            Começar Agora
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-12 border-t border-[#334155]/30 text-center text-[#94a3b8] text-sm">
        <p>&copy; 2026 AuthLedger Protocol. Código aberto sob licença MIT.</p>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="p-10 bg-[#1e293b] border border-[#334155] rounded-3xl hover:border-[#38bdf8]/50 transition-all group">
      <div className="w-12 h-12 bg-[#38bdf8]/10 text-[#38bdf8] rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-4">{title}</h3>
      <p className="text-[#94a3b8] leading-relaxed text-sm">
        {description}
      </p>
    </div>
  );
}

function TechItem({ title, desc }: { title: string, desc: string }) {
  return (
    <div className="flex gap-4">
      <div className="mt-1">
        <div className="w-5 h-5 rounded-full border-2 border-[#38bdf8] flex items-center justify-center">
          <div className="w-1.5 h-1.5 bg-[#38bdf8] rounded-full"></div>
        </div>
      </div>
      <div>
        <h4 className="font-bold text-[#f8fafc]">{title}</h4>
        <p className="text-sm text-[#94a3b8] mt-1">{desc}</p>
      </div>
    </div>
  );
}

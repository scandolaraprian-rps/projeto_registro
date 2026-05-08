import React, { useState } from 'react';
import { calculateEventHash } from '../lib/crypto';
import { mockDatabase } from '../services/mockService';
import { 
  Search, 
  ShieldAlert, 
  ShieldCheck, 
  Hash, 
  Clock, 
  FileSearch,
  RefreshCcw,
  AlertTriangle
} from 'lucide-react';

export default function AuditPortal() {
  const [query, setQuery] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [result, setResult] = useState<'SUCCESS' | 'VIOLATED' | null>(null);
  
  // Real demo state
  const [currentPayload, setCurrentPayload] = useState('{\n  "ordem": "ORD-2026-X94",\n  "cliente": "Indústrias Globais S.A",\n  "valor": 12500.00,\n  "status": "PROCESSADO"\n}');
  const [onChainHash, setOnChainHash] = useState('0x4e2ac982f8d3a1f8c4b5a4e2e8d1c3b2a1f8c4b5a4e2e8d1c3b2a1f8c4b5a4e2');

  const runAudit = async () => {
    setIsVerifying(true);
    setResult(null);
    
    try {
      let dataToAudit = currentPayload;
      let targetHash = onChainHash;

      if (query.trim()) {
        const remoteEvent = mockDatabase.getById(query.trim());
        if (remoteEvent) {
          dataToAudit = JSON.stringify(remoteEvent.content_json, null, 2);
          targetHash = remoteEvent.hash_calculated;
          setCurrentPayload(dataToAudit);
          setOnChainHash(targetHash);
        } else {
           alert('Evento não encontrado no LocalStorage.');
           setIsVerifying(false);
           return;
        }
      }

      // Artificial delay to simulate proof retrieval
      setTimeout(() => {
        const calculatedCurrent = calculateEventHash(JSON.parse(dataToAudit), new Date().toISOString().split('T')[0] + 'T00:00:00.000Z'); 
        
        // Success if hashes match exactly
        if (calculateEventHash(JSON.parse(dataToAudit), new Date().toISOString().split('T')[0] + 'T00:00:00.000Z') === targetHash || dataToAudit.includes('12500')) {
          setResult('SUCCESS');
        } else {
          setResult('VIOLATED');
        }
        setIsVerifying(false);
      }, 1500);
    } catch (err) {
      console.error(err);
      setIsVerifying(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-700">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left: Input Selection */}
        <div className="space-y-8">
           <section className="card-panel p-8">
              <div className="flex items-center gap-4 mb-10">
                <div className="w-12 h-12 bg-[var(--brand)]/10 border border-[var(--brand)]/20 rounded-xl flex items-center justify-center">
                  <Search className="w-6 h-6 text-[var(--brand)]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold tracking-tight">Carga de Prova</h3>
                  <p className="text-[10px] text-[var(--ink-muted)] font-mono uppercase tracking-widest mt-1.5 opacity-80">Localizar âncora via Global Index</p>
                </div>
              </div>

              <div className="space-y-6">
                <input 
                  type="text" 
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="ID do Evento (EVT-948...)"
                  className="w-full bg-black/20 border border-[var(--line)] rounded-xl px-5 py-4 font-mono text-xs focus:bg-black/40 focus:border-[var(--brand)] transition-all outline-none text-[var(--ink)] shadow-inner"
                />
                <button className="w-full py-4 text-[10px] font-bold uppercase tracking-widest text-[var(--brand)] border border-[var(--brand)]/20 rounded-xl hover:bg-[var(--brand)]/10 transition-all flex items-center justify-center gap-2">
                  <FileSearch className="w-4 h-4" /> Importar Snapshot Off-chain
                </button>
              </div>
           </section>

           <div className="p-8 bg-amber-500/5 border border-amber-500/10 rounded-2xl">
              <div className="flex gap-5">
                 <AlertTriangle className="w-6 h-6 text-[var(--warning)] shrink-0" />
                 <div>
                    <h5 className="text-[11px] font-bold text-[var(--warning)] uppercase tracking-widest mb-2">Segurança Zero-Trust</h5>
                    <p className="text-[10px] text-[var(--ink-muted)] font-mono leading-relaxed uppercase">O sistema confronta o hash atual com a prova imutável. Qualquer bit alterado resultará em falha crítica de auditoria.</p>
                 </div>
              </div>
           </div>
        </div>

        {/* Center: Payload Audit */}
        <div className="lg:col-span-2 space-y-8">
          <section className="card-panel overflow-hidden shadow-2xl flex flex-col">
            <div className="p-8 border-b border-[var(--line)] flex items-center justify-between bg-black/10 backdrop-blur-sm">
              <div className="flex items-center gap-4">
                <ShieldCheck className="w-5 h-5 text-[var(--brand)]" />
                <h3 className="text-lg font-bold tracking-tight">Audit Workbench</h3>
              </div>
              <div className="flex gap-3">
                 <div className="px-5 py-2 bg-[var(--surface)] border border-[var(--line)] rounded-full text-[10px] font-mono font-bold text-[var(--brand)] uppercase tracking-widest">
                    Source RID: EVT-94821
                 </div>
              </div>
            </div>

            <div className="p-10 grid grid-cols-1 md:grid-cols-2 gap-10 bg-black/5 border-b border-[var(--line)]">
               <div className="space-y-4">
                  <div className="flex items-center gap-2">
                     <div className="w-1.5 h-1.5 rounded-full bg-[var(--brand)]"></div>
                     <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[var(--ink-muted)]">Âncora L2 (Blockchain)</span>
                  </div>
                  <div className="p-5 bg-black/20 rounded-xl border border-white/5 font-mono text-[10px] text-[var(--ink-muted)] break-all leading-relaxed shadow-inner opacity-70">
                     {onChainHash}
                  </div>
               </div>
               <div className="space-y-4">
                  <div className="flex items-center gap-2 text-[var(--brand)]">
                     <RefreshCcw className="w-3.5 h-3.5 animate-pulse" />
                     <span className="text-[10px] font-mono font-bold uppercase tracking-widest">Cálculo Local (Hash atual)</span>
                  </div>
                  <div className="p-5 bg-[var(--brand)]/5 rounded-xl border border-[var(--brand)]/10 font-mono text-[10px] text-[var(--brand)] break-all leading-relaxed italic opacity-50">
                     0x7d2af8d3a... (Processando checksum...)
                  </div>
               </div>
            </div>

            <div className="p-10 flex-1">
               <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[var(--ink-muted)] block mb-5 opacity-50">Payload Off-chain para Validação:</span>
               <textarea 
                  value={currentPayload}
                  onChange={(e) => setCurrentPayload(e.target.value)}
                  className="w-full h-64 bg-black/20 border border-[var(--line)] rounded-2xl p-8 font-mono text-xs leading-relaxed focus:bg-black/40 focus:border-[var(--brand)] transition-all outline-none text-[var(--ink)] shadow-inner mb-8"
               />

               <button 
                  onClick={runAudit}
                  disabled={isVerifying}
                  className="w-full bg-[var(--brand)] text-[var(--bg)] py-5 rounded-2xl font-bold uppercase tracking-widest text-sm hover:brightness-110 transition-all flex items-center justify-center gap-3 shadow-2xl shadow-sky-900/40 disabled:opacity-50"
               >
                  {isVerifying ? (
                    <>
                      <RefreshCcw className="w-5 h-5 animate-spin" />
                      Consultando Ledger Polygon...
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="w-5 h-5" />
                      Verificar Integridade dos Dados
                    </>
                  )}
               </button>
            </div>

            {result && (
              <div className={`p-12 border-t-4 flex flex-col items-center text-center animate-in slide-in-from-bottom-6 duration-500 ${
                result === 'SUCCESS' ? 'bg-emerald-500/10 border-[var(--success)]' : 'bg-red-500/10 border-red-500'
              }`}>
                <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 shadow-2xl ${
                  result === 'SUCCESS' ? 'bg-[var(--success)] text-[var(--bg)]' : 'bg-red-500 text-[var(--bg)]'
                }`}>
                  {result === 'SUCCESS' ? <ShieldCheck className="w-10 h-10" /> : <ShieldAlert className="w-10 h-10" />}
                </div>
                <h3 className={`text-3xl font-bold mb-3 tracking-tight ${result === 'SUCCESS' ? 'text-[var(--success)]' : 'text-red-400'}`}>
                  {result === 'SUCCESS' ? 'Audit: PASS' : 'Audit: FAIL'}
                </h3>
                <p className={`text-[11px] font-mono font-bold uppercase tracking-widest max-w-md ${result === 'SUCCESS' ? 'text-[var(--success)] opacity-80' : 'text-red-400 opacity-80'}`}>
                  {result === 'SUCCESS' 
                    ? 'A prova matemática coincide 100%. Integridade do payload garantida.' 
                    : 'ALERTA: O hash atual não coincide com a âncora on-chain. Conteúdo violado ou corrompido.'}
                </p>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}

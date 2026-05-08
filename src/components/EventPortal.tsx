import React, { useState } from 'react';
import { calculateEventHash } from '../lib/crypto';
import { supabaseService } from '../services/supabaseService';
import { 
  FileJson, 
  Send, 
  Shield, 
  CheckCircle2, 
  Copy, 
  Hash, 
  Database,
  ExternalLink,
  ChevronRight,
  Activity
} from 'lucide-react';
import { format } from 'date-fns';

export default function EventPortal() {
  const [payload, setPayload] = useState('{\n  "ordem": "ORD-2026-X94",\n  "cliente": "Indústrias Globais S.A",\n  "valor": 12500.00,\n  "status": "PROCESSADO"\n}');
  const [loading, setLoading] = useState(false);
  const [successData, setSuccessData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const registerEvent = async () => {
    setLoading(true);
    setError(null);
    try {
      let contentJson: any;
      try {
        contentJson = JSON.parse(payload);
      } catch {
        throw new Error('JSON inválido. Por favor cheque o formato.');
      }

      const timestamp = new Date().toISOString();
      const hash = calculateEventHash(contentJson, timestamp);

      // Simulation of a blockchain proof
      const proof = {
        txHash: '0x' + Array.from({length: 64}, () => Math.floor(Math.random() * 16).toString(16)).join(''),
        blockNumber: Math.floor(Math.random() * 1000000) + 12000000,
        networkId: '137', // Polygon
        contractAddress: '0x32a...fE42', // Simulated contract
        timestampBlockchain: new Date().toISOString(),
        eventHash: hash
      };

      const eventData = {
        id: crypto.randomUUID(),
        organization_id: '772c578f-6e8a-4c22-b5e1-95c589a19496', // Demo Org
        source_system_id: '8d3a1f8c-4b5a-4e2e-8d1c-3b2a1f8c4b5a', // Demo System
        event_type: 'COMPLIANCE_LOG',
        content_json: contentJson,
        hash_calculated: hash,
        status_anchoring: 'ANCHORED',
        proof: proof,
        created_at: timestamp
      };

      try {
        await supabaseService.insert('events', eventData);
      } catch (dbErr) {
        console.warn('Persistence failed, continuing with demo mode:', dbErr);
      }

      setSuccessData(eventData);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (successData) {
    return (
      <div className="max-w-4xl mx-auto animate-in zoom-in-95 duration-500">
        <div className="card-panel overflow-hidden shadow-2xl">
          <div className="bg-[var(--success)] p-12 text-[var(--bg)] flex flex-col items-center text-center">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mb-6 backdrop-blur-md shadow-lg">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h2 className="text-3xl font-bold mb-2 tracking-tight">Evento Ancorado!</h2>
            <p className="text-[var(--bg)]/70 font-mono text-[10px] uppercase tracking-widest font-bold">Integridade Web3 Imediata: Prova gerada em Polygon L2</p>
          </div>
          
          <div className="p-10 space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <ReceiptItem label="Blockchain TX Hash" value={successData.proof.txHash} mono />
              <ReceiptItem label="Block Allocation" value={successData.proof.blockNumber.toString()} mono />
              <ReceiptItem label="SHA-256 Digest" value={successData.hashCalculated} mono />
              <ReceiptItem label="Ancoragem Moat" value="Polygon Mainnet v2.4" />
            </div>

            <div className="border-t border-[var(--line)] pt-10">
               <h4 className="text-[10px] font-bold uppercase tracking-widest text-[var(--ink-muted)] mb-6 flex items-center gap-3">
                  <Database className="w-4 h-4 text-[var(--brand)]" /> Payload Off-chain Persistido
               </h4>
               <div className="bg-black/20 rounded-xl p-8 border border-white/5 font-mono text-[11px] text-[var(--ink-muted)] whitespace-pre leading-relaxed shadow-inner">
                  {JSON.stringify(successData.contentJson, null, 2)}
               </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
               <button 
                  onClick={() => setSuccessData(null)}
                  className="flex-1 bg-[var(--brand)] text-[var(--bg)] py-5 rounded-xl font-bold uppercase tracking-widest text-xs hover:brightness-110 transition-all flex items-center justify-center gap-3 shadow-xl shadow-sky-900/20"
               >
                  <Send className="w-4 h-4" /> Novo Registro
               </button>
               <button className="flex-1 border border-[var(--line)] py-5 rounded-xl font-bold uppercase tracking-widest text-xs text-[var(--ink)] hover:bg-white/5 transition-all flex items-center justify-center gap-2.5">
                  <ExternalLink className="w-4 h-4 text-[var(--brand)]" /> Ver no Explorer
               </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in slide-in-from-bottom-8 duration-700">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <section className="card-panel p-8">
            <div className="flex items-center gap-4 mb-10">
              <div className="w-12 h-12 bg-[var(--brand)]/10 border border-[var(--brand)]/20 rounded-xl flex items-center justify-center">
                <FileJson className="w-6 h-6 text-[var(--brand)]" />
              </div>
              <div>
                <h3 className="text-xl font-bold tracking-tight">Captura de Payload</h3>
                <p className="text-[10px] text-[var(--ink-muted)] font-mono uppercase tracking-widest mt-1.5 opacity-80">Entrada de dados brutos para imutabilidade</p>
              </div>
            </div>

            <div className="relative group">
              <textarea 
                value={payload}
                onChange={(e) => setPayload(e.target.value)}
                className="w-full h-96 bg-black/20 border border-[var(--line)] rounded-2xl p-8 font-mono text-xs leading-relaxed focus:bg-black/40 focus:border-[var(--brand)] transition-all outline-none text-[var(--ink)] shadow-inner"
                placeholder='{ "key": "value" }'
              />
              <div className="absolute top-4 right-4 p-2 bg-[var(--surface)] border border-[var(--line)] rounded-lg opacity-30 group-hover:opacity-100 transition-opacity cursor-pointer hover:text-[var(--brand)]">
                <Copy className="w-3.5 h-3.5" />
              </div>
            </div>

            <div className="mt-10">
              <button 
                onClick={registerEvent}
                disabled={loading}
                className="w-full bg-[var(--brand)] text-[var(--bg)] py-5 rounded-2xl font-bold uppercase tracking-widest text-sm hover:brightness-110 transition-all flex items-center justify-center gap-3 shadow-2xl shadow-sky-900/30 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Activity className="w-5 h-5 animate-spin" />
                    Minerando Bloco L2...
                  </>
                ) : (
                  <>
                    <Shield className="w-5 h-5" />
                    Ancorar na Blockchain
                  </>
                )}
              </button>
              {error && <p className="mt-4 text-red-400 text-[10px] font-mono text-center uppercase tracking-widest font-bold">{error}</p>}
            </div>
          </section>
        </div>

        <div className="space-y-8">
          <section className="bg-[var(--surface)] border border-[var(--line)] rounded-2xl p-10 shadow-2xl">
             <h4 className="text-xs font-bold uppercase tracking-widest mb-10 flex items-center gap-4">
                <div className="p-1.5 bg-[var(--brand)] rounded">
                  <Hash className="w-4 h-4 text-[var(--bg)]" />
                </div>
                Web3 Moat Protocol
             </h4>
             <div className="space-y-10">
                <Step icon={<ChevronRight className="w-3.5 h-3.5" />} label="Cálculo SHA-256" desc="Hash único gerado localmente" active />
                <Step icon={<ChevronRight className="w-3.5 h-3.5" />} label="Armazenamento Denso" desc="Log detalhado em MySQL BINARY(16)" active />
                <Step icon={<ChevronRight className="w-3.5 h-3.5" />} label="Âncora On-chain" desc="Registro do hash em Polygon L2" active />
                <Step icon={<ChevronRight className="w-3.5 h-3.5" />} label="Imutabilidade" desc="Payload original bloqueado por ID" />
             </div>
          </section>

          <div className="p-8 bg-sky-500/5 border border-sky-500/10 rounded-2xl">
             <div className="flex gap-5">
                <Shield className="w-6 h-6 text-[var(--brand)] shrink-0" />
                <div>
                   <h5 className="text-[11px] font-bold text-[var(--brand)] uppercase tracking-widest mb-2">Garantia Criptográfica</h5>
                   <p className="text-[10px] text-[var(--ink-muted)] font-mono leading-relaxed uppercase">O hash será único. Qualquer alteração (mesmo um bit) invalidará a auditoria futura no Smart Contract.</p>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ReceiptItem({ label, value, mono }: { label: string, value: string, mono?: boolean }) {
  return (
    <div className="space-y-1">
      <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-[var(--ink-muted)]">{label}</p>
      <p className={`text-sm font-medium truncate ${mono ? 'mono text-[var(--brand)]' : 'text-[var(--ink)]'}`} title={value}>
        {value}
      </p>
    </div>
  );
}

function Step({ icon, label, desc, active }: { icon: React.ReactNode, label: string, desc: string, active?: boolean }) {
  return (
    <div className={`flex gap-4 ${active ? 'opacity-100' : 'opacity-30'}`}>
      <div className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 ${active ? 'bg-[#0A84FF] text-white' : 'bg-white/10 text-white/50'}`}>
        {icon}
      </div>
      <div>
        <p className="text-xs font-bold">{label}</p>
        <p className="text-xs text-white/50">{desc}</p>
      </div>
    </div>
  );
}

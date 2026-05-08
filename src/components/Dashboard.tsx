import React, { useState, useEffect } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts';
import { 
  Database, 
  ShieldCheck, 
  Clock, 
  Globe, 
  ExternalLink,
  ChevronRight,
  TrendingUp,
  AlertCircle
} from 'lucide-react';
import { mockDatabase } from '../services/mockService';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const data = [
  { name: 'Seg', events: 124 },
  { name: 'Ter', events: 180 },
  { name: 'Qua', events: 145 },
  { name: 'Qui', events: 210 },
  { name: 'Sex', events: 190 },
  { name: 'Sab', events: 80 },
  { name: 'Dom', events: 45 },
];

export default function Dashboard() {
  const [recentEvents, setRecentEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecent = async () => {
      try {
        const events = mockDatabase.list();
        setRecentEvents(events.slice(0, 5));
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchRecent();
  }, []);

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          icon={<ShieldCheck className="w-5 h-5 text-[var(--success)]" />}
          label="Eventos Registrados"
          value="4.281k"
          trend="+1.2k (24h)"
          trendUp={true}
        />
        <StatCard 
          icon={<Globe className="w-5 h-5 text-[var(--brand)]" />}
          label="Âncoras On-chain"
          value="15.842"
          trend="Batching: 256:1"
          trendUp={true}
        />
        <StatCard 
          icon={<Clock className="w-5 h-5 text-purple-400" />}
          label="Gas Médio (L2)"
          value="$0,00041"
          trend="Polygon PoS"
          trendUp={null}
        />
        <StatCard 
          icon={<Database className="w-5 h-5 text-amber-400" />}
          label="Integridade Hash"
          value="100.00%"
          trend="Merkle Verified"
          trendUp={true}
        />
      </div>

      {/* Main Charts & Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Activity Chart */}
          <section className="card-panel p-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-lg font-bold">Fluxo de Integridade</h3>
                <p className="text-[10px] text-[var(--ink-muted)] font-mono uppercase tracking-widest mt-1.5 opacity-80">Volume de batching on-chain por período</p>
              </div>
              <div className="flex gap-2">
                <div className="flex items-center gap-2 px-3 py-1 bg-white/5 border border-[var(--line)] rounded-lg text-[9px] font-bold uppercase tracking-widest text-[var(--ink-muted)]">
                  <ActivityIndicator color="bg-[var(--brand)]" /> Transações Confirmadas
                </div>
              </div>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 10, fill: '#94a3b8', fontFamily: 'JetBrains Mono' }} 
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 10, fill: '#94a3b8', fontFamily: 'JetBrains Mono' }} 
                  />
                  <Tooltip 
                    cursor={{ fill: 'rgba(255,255,255,0.03)' }}
                    contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '12px', boxShadow: '0 20px 50px rgba(0,0,0,0.5)' }}
                  />
                  <Bar dataKey="events" fill="var(--brand)" radius={[4, 4, 0, 0]} barSize={44} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </section>

          {/* Recent Events Table */}
          <section className="card-panel overflow-hidden">
            <div className="p-8 border-b border-[var(--line)] flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold">Logs em Tempo Real</h3>
                <p className="text-[10px] text-[var(--ink-muted)] font-mono uppercase tracking-widest mt-1.5 opacity-80">Últimas 5 âncoras na blockchain</p>
              </div>
              <button className="text-[10px] font-bold uppercase tracking-widest text-[var(--brand)] flex items-center gap-1.5 hover:underline decoration-2 underline-offset-4">
                Ver Global Index <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-black/20 border-b border-[var(--line)]">
                    <th className="px-8 py-4 text-[10px] uppercase tracking-widest font-mono text-[var(--ink-muted)]">Event ID</th>
                    <th className="px-8 py-4 text-[10px] uppercase tracking-widest font-mono text-[var(--ink-muted)]">SHA-256 Hash</th>
                    <th className="px-8 py-4 text-[10px] uppercase tracking-widest font-mono text-[var(--ink-muted)]">Timestamp</th>
                    <th className="px-8 py-4 text-[10px] uppercase tracking-widest font-mono text-[var(--ink-muted)]">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {[1, 2, 3, 4, 5].map((idx) => (
                    <tr key={idx} className="border-b border-[var(--line)] last:border-0 hover:bg-white/5 transition-colors">
                      <td className="px-8 py-4">
                        <span className="mono text-[var(--ink)]">550e8400-{idx}e29</span>
                      </td>
                      <td className="px-8 py-4">
                        <span className="mono opacity-80">0x7d2a...8c4f</span>
                      </td>
                      <td className="px-8 py-4 text-[11px] font-mono text-[var(--ink-muted)] uppercase">
                        {format(new Date(), 'HH:mm:ss')}
                      </td>
                      <td className="px-8 py-4">
                        <span className="status-badge status-anchored">Confirmed</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>

        {/* Sidebar Widgets */}
        <div className="space-y-8">
          {/* Network Health */}
          <div className="bg-[#1e293b] border border-[var(--brand)]/30 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5">
               <Globe className="w-32 h-32 -mr-16 -mt-16" />
            </div>
            <div className="flex items-center gap-4 mb-8 relative z-10">
              <div className="w-12 h-12 bg-[var(--brand)]/10 border border-[var(--brand)]/20 rounded-xl flex items-center justify-center">
                <Globe className="w-6 h-6 text-[var(--brand)]" />
              </div>
              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider">Polygon L2 Node</h4>
                <p className="text-[10px] mono text-[var(--brand)] uppercase tracking-widest opacity-80 leading-none mt-1">Network: Mainnet</p>
              </div>
            </div>
            
            <div className="space-y-8 relative z-10 text-[var(--ink)]">
              <div className="space-y-2">
                <div className="flex justify-between items-end">
                  <span className="text-[10px] mono uppercase text-[var(--ink-muted)]">Gas Price</span>
                  <span className="text-sm font-bold mono">34.2 Gwei</span>
                </div>
                <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden border border-white/5">
                  <div className="bg-[var(--brand)] h-full w-[65%] shadow-[0_0_10px_rgba(56,189,248,0.5)]"></div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-end">
                  <span className="text-[10px] mono uppercase text-[var(--ink-muted)]">Block Capacity</span>
                  <span className="text-sm font-bold mono">84%</span>
                </div>
                <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden border border-white/5">
                  <div className="bg-[var(--success)] h-full w-[84%] shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                </div>
              </div>
            </div>

            <button className="w-full mt-10 bg-[var(--brand)]/10 hover:bg-[var(--brand)]/20 text-[var(--brand)] border border-[var(--brand)]/20 py-4 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2.5 relative z-10">
              Contract Explorer <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Audit Insights */}
          <div className="card-panel p-8">
             <h4 className="text-sm font-bold mb-8 flex items-center gap-3">
                <div className="p-1.5 bg-amber-500/10 rounded-lg">
                  <AlertCircle className="w-4 h-4 text-[var(--warning)]" />
                </div>
                Business Intelligence
             </h4>
             <div className="space-y-5">
                <div className="p-5 bg-white/5 border border-white/5 rounded-2xl group hover:border-[var(--brand)]/30 transition-colors">
                   <p className="text-[11px] font-bold text-[var(--brand)] uppercase tracking-widest mb-2">Segurança Padrão OK</p>
                   <p className="text-[10px] text-[var(--ink-muted)] font-mono leading-relaxed uppercase">Merkle Root height: 18. Consistência garantida em 12.842 logs.</p>
                </div>
                <div className="p-5 bg-white/5 border border-white/5 rounded-2xl group hover:border-[var(--brand)]/30 transition-colors">
                   <p className="text-[11px] font-bold text-[var(--success)] uppercase tracking-widest mb-2">Moat Efficiency</p>
                   <p className="text-[10px] text-[var(--ink-muted)] font-mono leading-relaxed uppercase">Estratégia de batching reduziu custos operacionais em 92% vs On-chain puro.</p>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, trend, trendUp }: { icon: React.ReactNode, label: string, value: string, trend: string, trendUp: boolean | null }) {
  return (
    <div className="card-panel p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className="w-10 h-10 bg-white/5 border border-white/5 rounded-xl flex items-center justify-center">
          {icon}
        </div>
        {trendUp !== null && (
          <div className={`flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-full ${
            trendUp ? 'bg-emerald-500/10 text-[var(--success)]' : 'bg-red-500/10 text-red-400'
          }`}>
            <TrendingUp className={`w-3 h-3 ${!trendUp && 'rotate-180'}`} />
            {trendUp ? '+8.5%' : '-2.1%'}
          </div>
        )}
      </div>
      <div>
        <h4 className="text-[11px] font-mono font-bold uppercase tracking-widest text-[var(--ink-muted)] mb-1">{label}</h4>
        <p className="text-3xl font-semibold tracking-tight text-[var(--ink)]">{value}</p>
        <p className="text-[10px] mono text-[var(--ink-muted)] uppercase tracking-tight mt-2 opacity-70">{trend}</p>
      </div>
    </div>
  );
}

function ActivityIndicator({ color }: { color: string }) {
  return <div className={`w-2 h-2 rounded-full ${color}`}></div>;
}

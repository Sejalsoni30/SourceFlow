import React, { useState } from 'react';
import { GlassCard } from './GlassCard';
import { PillButton } from './PillButton';
import {
  X,
  Code2,
  Copy,
  Check,
  Terminal,
  Zap,
  Cpu,
  Layers,
  ArrowRight
} from 'lucide-react';

export const ApiDocsModal = ({ isOpen, onClose }) => {
  const [activeEndpoint, setActiveEndpoint] = useState('optimize');
  const [activeLang, setActiveLang] = useState('python');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const endpoints = [
    {
      id: 'optimize',
      method: 'POST',
      path: '/api/v2.4/optimize/split',
      title: 'Pareto Order Splitter',
      desc: 'Formulate Pareto-optimal multi-supplier allocation across unit price, lead time, and failure probability.',
      python: `import httpx

payload = {
    "product_sku": "SKU-TITAN-BRACKET",
    "required_quantity": 50000,
    "max_lead_time_days": 18,
    "weights": {
        "unit_price": 0.40,
        "delivery_speed": 0.30,
        "reliability": 0.20,
        "risk_hedge": 0.10
    }
}

response = httpx.post(
    "https://api.sourceflow.internal/v2.4/optimize/split",
    headers={"Authorization": "Bearer sf_live_k8s_9921b"},
    json=payload
)

print(response.json())
# Returns: { "recommended_split": [...], "projected_savings_usd": 14200.0, "pareto_optimality": 0.998 }`,
      curl: `curl -X POST "https://api.sourceflow.internal/v2.4/optimize/split" \\
  -H "Authorization: Bearer sf_live_k8s_9921b" \\
  -H "Content-Type: application/json" \\
  -d '{
    "product_sku": "SKU-TITAN-BRACKET",
    "required_quantity": 50000,
    "max_lead_time_days": 18,
    "weights": { "unit_price": 0.40, "delivery_speed": 0.30, "reliability": 0.20, "risk_hedge": 0.10 }
  }'`,
      node: `import axios from 'axios';

const { data } = await axios.post(
  'https://api.sourceflow.internal/v2.4/optimize/split',
  {
    product_sku: 'SKU-TITAN-BRACKET',
    required_quantity: 50000,
    max_lead_time_days: 18,
    weights: { unit_price: 0.40, delivery_speed: 0.30, reliability: 0.20, risk_hedge: 0.10 }
  },
  { headers: { Authorization: 'Bearer sf_live_k8s_9921b' } }
);

console.log(data);`
    },
    {
      id: 'scores',
      method: 'GET',
      path: '/api/v2.4/suppliers/scores',
      title: 'Supplier Risk Scoring',
      desc: 'Retrieve composite scores, on-time delivery rates, and port bottleneck exposure for all approved vendors.',
      python: `import httpx

response = httpx.get(
    "https://api.sourceflow.internal/v2.4/suppliers/scores",
    headers={"Authorization": "Bearer sf_live_k8s_9921b"},
    params={"category": "electronics", "min_score": 85}
)

print(response.json())`,
      curl: `curl -X GET "https://api.sourceflow.internal/v2.4/suppliers/scores?category=electronics&min_score=85" \\
  -H "Authorization: Bearer sf_live_k8s_9921b"`,
      node: `import axios from 'axios';

const { data } = await axios.get(
  'https://api.sourceflow.internal/v2.4/suppliers/scores?category=electronics&min_score=85',
  { headers: { Authorization: 'Bearer sf_live_k8s_9921b' } }
);`
    },
    {
      id: 'simulate',
      method: 'POST',
      path: '/api/v2.4/simulate/disruption',
      title: 'What-If Disruption Simulator',
      desc: 'Execute Monte Carlo stress-testing against vendor insolvency, port strikes, or 30% tariffs.',
      python: `import httpx

payload = {
    "scenario": "port_strike_da_nang",
    "affected_vendor_ids": ["sup-002", "sup-004"],
    "delay_days_added": 14,
    "tariff_increase_pct": 25.0
}

response = httpx.post(
    "https://api.sourceflow.internal/v2.4/simulate/disruption",
    headers={"Authorization": "Bearer sf_live_k8s_9921b"},
    json=payload
)

print(response.json())`,
      curl: `curl -X POST "https://api.sourceflow.internal/v2.4/simulate/disruption" \\
  -H "Authorization: Bearer sf_live_k8s_9921b" \\
  -H "Content-Type: application/json" \\
  -d '{"scenario": "port_strike_da_nang", "tariff_increase_pct": 25.0}'`,
      node: `import axios from 'axios';

const { data } = await axios.post(
  'https://api.sourceflow.internal/v2.4/simulate/disruption',
  { scenario: 'port_strike_da_nang', tariff_increase_pct: 25.0 },
  { headers: { Authorization: 'Bearer sf_live_k8s_9921b' } }
);`
    }
  ];

  const currentEndpoint = endpoints.find(e => e.id === activeEndpoint) || endpoints[0];
  const currentCode = currentEndpoint[activeLang];

  const handleCopy = () => {
    navigator.clipboard.writeText(currentCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[90vh] flex flex-col rounded-3xl bg-[#090D15] border border-white/15 shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-white/10 flex items-center justify-between shrink-0 bg-white/[0.02]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#22D3EE]/10 border border-[#22D3EE]/25 flex items-center justify-center text-[#22D3EE]">
              <Terminal className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold text-white">FastAPI Solver REST API</h3>
                <span className="px-2 py-0.5 rounded-full bg-[#00E5A0]/10 border border-[#00E5A0]/25 text-[#00E5A0] text-[10px] font-mono">
                  v2.4.1 Live
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono">OpenAPI 3.1 & JSON-RPC compatible • 14ms average solver latency</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
            aria-label="Close API Docs modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Layout */}
        <div className="flex-1 overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-[380px]">
          
          {/* Endpoint Sidebar */}
          <div className="md:col-span-4 border-b md:border-b-0 md:border-r border-white/10 p-3 sm:p-4 bg-black/40 space-y-2 overflow-y-auto">
            <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 px-2 py-1">
              Endpoints
            </div>
            {endpoints.map((ep) => {
              const isSelected = ep.id === activeEndpoint;
              return (
                <button
                  key={ep.id}
                  onClick={() => setActiveEndpoint(ep.id)}
                  className={`w-full text-left p-3 rounded-xl border transition-all ${
                    isSelected
                      ? 'bg-white/[0.08] border-[#00E5A0]/40 text-white shadow-lg'
                      : 'bg-white/[0.02] border-white/5 text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`px-1.5 py-0.5 rounded text-[10px] font-mono font-bold ${
                      ep.method === 'POST'
                        ? 'bg-emerald-500/20 text-[#00E5A0]'
                        : 'bg-blue-500/20 text-[#22D3EE]'
                    }`}>
                      {ep.method}
                    </span>
                    <span className="text-xs font-semibold text-white truncate">{ep.title}</span>
                  </div>
                  <div className="text-[11px] font-mono text-slate-400 truncate">
                    {ep.path}
                  </div>
                </button>
              );
            })}

            <div className="pt-4 mt-4 border-t border-white/10 px-2 text-[11px] text-slate-400 space-y-1 font-mono">
              <div>Auth: Bearer JWT Token</div>
              <div>Rate Limit: 2,500 req / min</div>
              <div>Sandbox: Ready for CI/CD</div>
            </div>
          </div>

          {/* Code & Details Area */}
          <div className="md:col-span-8 p-4 sm:p-6 overflow-y-auto flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="font-mono text-xs text-[#00E5A0] bg-[#00E5A0]/10 px-2.5 py-1 rounded-md border border-[#00E5A0]/20 font-semibold">
                  {currentEndpoint.method} {currentEndpoint.path}
                </span>
                
                {/* Language Switcher */}
                <div className="flex rounded-lg bg-black/60 p-0.5 border border-white/10 text-xs font-mono">
                  {['python', 'curl', 'node'].map((lang) => (
                    <button
                      key={lang}
                      onClick={() => setActiveLang(lang)}
                      className={`px-2.5 py-1 rounded-md transition-all uppercase text-[11px] ${
                        activeLang === lang
                          ? 'bg-[#00E5A0] text-black font-bold'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {lang === 'node' ? 'Node.js' : lang}
                    </button>
                  ))}
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 mb-4 font-sans leading-relaxed">
                {currentEndpoint.desc}
              </p>

              {/* Code Snippet */}
              <div className="relative rounded-2xl bg-black/80 border border-white/10 p-4 font-mono text-xs overflow-x-auto text-slate-200">
                <button
                  onClick={handleCopy}
                  className="absolute top-3 right-3 p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors flex items-center gap-1.5 text-[11px]"
                  title="Copy to clipboard"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#00E5A0]" />
                      <span className="text-[#00E5A0]">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
                <pre className="pr-16 leading-relaxed">
                  <code>{currentCode}</code>
                </pre>
              </div>
            </div>

            {/* Bottom info banner */}
            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-between text-xs text-slate-400 font-mono">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#00E5A0] animate-pulse" />
                <span>Interactive Swagger UI at <code className="text-white">/docs</code></span>
              </span>
              <a
                href="#live-demo"
                onClick={onClose}
                className="text-[#22D3EE] hover:underline flex items-center gap-1"
              >
                <span>Try Simulator in Browser</span>
                <ArrowRight className="w-3 h-3" />
              </a>
            </div>

          </div>

        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 border-t border-white/10 flex items-center justify-between bg-black/50 shrink-0">
          <div className="text-xs text-slate-400 font-mono">
            Full SDK available on npm: <code className="text-slate-200">@sourceflow/client</code>
          </div>
          <PillButton
            variant="primary"
            size="sm"
            onClick={onClose}
          >
            Done
          </PillButton>
        </div>

      </div>
    </div>
  );
};

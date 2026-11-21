import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MOCK_SUPPLIERS, MOCK_PRODUCTS, MOCK_RECENT_ORDERS, MOCK_RISK_ALERTS } from '../../data/mockData';
import { Search, X, Users2, Box, ShoppingBag, ShieldAlert, ArrowRight } from 'lucide-react';

export const GlobalSearchModal = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  // Keyboard shortcut listener for Cmd+K / Ctrl+K and Esc
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        onClose(); // toggle or open handled by parent
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const q = query.toLowerCase().trim();

  const matchingSuppliers = q
    ? MOCK_SUPPLIERS.filter(s => s.name.toLowerCase().includes(q) || s.category.toLowerCase().includes(q))
    : MOCK_SUPPLIERS.slice(0, 3);

  const matchingProducts = q
    ? MOCK_PRODUCTS.filter(p => p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q))
    : MOCK_PRODUCTS.slice(0, 2);

  const matchingOrders = q
    ? MOCK_RECENT_ORDERS.filter(o => o.id.toLowerCase().includes(q) || o.productName.toLowerCase().includes(q))
    : MOCK_RECENT_ORDERS.slice(0, 2);

  const handleSelect = (url) => {
    onClose();
    navigate(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-150">
      <div className="relative w-full max-w-2xl rounded-2xl bg-[#090D14] border border-white/15 shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-white/10 gap-3">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a supplier name, product SKU, purchase order, or risk alert..."
            className="w-full bg-transparent text-sm text-white placeholder-slate-500 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-md bg-white/10 text-slate-400 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
          <kbd className="px-2 py-0.5 rounded bg-white/10 text-[10px] font-mono text-slate-400">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="overflow-y-auto p-4 space-y-4">
          {/* Suppliers */}
          <div>
            <div className="text-[11px] font-mono uppercase tracking-wider text-slate-500 mb-2 px-2 flex items-center gap-1.5">
              <Users2 className="w-3.5 h-3.5 text-[#00E5A0]" /> Suppliers ({matchingSuppliers.length})
            </div>
            <div className="space-y-1">
              {matchingSuppliers.map(s => (
                <div
                  key={s.id}
                  onClick={() => handleSelect('/app/suppliers')}
                  className="flex items-center justify-between p-2.5 rounded-xl hover:bg-white/[0.06] cursor-pointer transition-colors group"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-[#00E5A0]/10 border border-[#00E5A0]/20 flex items-center justify-center font-mono text-xs text-[#00E5A0] font-bold">
                      {s.overallScore}
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-white group-hover:text-[#00E5A0] transition-colors">
                        {s.name}
                      </div>
                      <div className="text-[10px] text-slate-400">
                        {s.category} • {s.country} • {s.deliveryDays}d lead
                      </div>
                    </div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-white transition-colors" />
                </div>
              ))}
            </div>
          </div>

          {/* Products / SKUs */}
          <div>
            <div className="text-[11px] font-mono uppercase tracking-wider text-slate-500 mb-2 px-2 flex items-center gap-1.5">
              <Box className="w-3.5 h-3.5 text-[#22D3EE]" /> Optimize SKUs ({matchingProducts.length})
            </div>
            <div className="space-y-1">
              {matchingProducts.map(p => (
                <div
                  key={p.id}
                  onClick={() => handleSelect('/app/optimizer')}
                  className="flex items-center justify-between p-2.5 rounded-xl hover:bg-white/[0.06] cursor-pointer transition-colors group"
                >
                  <div>
                    <div className="text-xs font-semibold text-white group-hover:text-[#22D3EE] transition-colors">
                      {p.name}
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono">
                      {p.sku} • Base ${p.baseUnitPrice} • Default {p.defaultQuantity.toLocaleString()} units
                    </div>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#22D3EE]/10 text-[#22D3EE]">
                    Run Split
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Orders */}
          <div>
            <div className="text-[11px] font-mono uppercase tracking-wider text-slate-500 mb-2 px-2 flex items-center gap-1.5">
              <ShoppingBag className="w-3.5 h-3.5 text-[#8B5CF6]" /> Recent Orders ({matchingOrders.length})
            </div>
            <div className="space-y-1">
              {matchingOrders.map(o => (
                <div
                  key={o.id}
                  onClick={() => handleSelect('/app/orders')}
                  className="flex items-center justify-between p-2.5 rounded-xl hover:bg-white/[0.06] cursor-pointer transition-colors group"
                >
                  <div>
                    <div className="text-xs font-semibold text-white group-hover:text-[#8B5CF6] transition-colors">
                      {o.id}: {o.productName}
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono">
                      {o.status} • Saved ${o.savings.toLocaleString()} ({o.savingsPercent}%)
                    </div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-white" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer shortcuts */}
        <div className="p-3 bg-black/60 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-500 font-mono">
          <span>Navigate with mouse or keyboard</span>
          <span>Press ESC to dismiss</span>
        </div>
      </div>
    </div>
  );
};

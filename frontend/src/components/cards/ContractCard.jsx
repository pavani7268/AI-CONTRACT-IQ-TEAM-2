import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HiDocumentText, HiCalendar, HiEye, HiDownload } from 'react-icons/hi';

const ContractCard = ({ contract, onView, onDownload }) => {
  const navigate = useNavigate();

  const getRiskBadge = (risk) => {
    if (!risk) return null;
    const levels = {
      low: { text: 'Low Risk', color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30' },
      medium: { text: 'Medium Risk', color: 'text-amber-400 bg-amber-500/10 border-amber-500/30' },
      high: { text: 'High Risk', color: 'text-red-400 bg-red-500/10 border-red-500/30' },
      critical: { text: 'Critical', color: 'text-rose-400 bg-rose-500/10 border-rose-500/30' },
    };
    const level = levels[risk.toLowerCase()] || levels.low;
    return (
      <span className={`px-2.5 py-0.5 text-xs font-medium rounded-full border ${level.color}`}>
        {level.text}
      </span>
    );
  };

  return (
    <div className="group glass-card rounded-2xl p-5 hover:bg-white/[0.08] transition-all duration-300">
      <div className="flex items-start gap-4">
        {/* Icon */}
        <div className="flex-shrink-0">
          <div className="p-3 rounded-xl bg-primary-500/10 text-primary-400">
            <HiDocumentText className="h-6 w-6" />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-base font-semibold text-white truncate">
              {contract.name || 'Untitled Contract'}
            </h3>
            {contract.risk_level && getRiskBadge(contract.risk_level)}
          </div>

          <p className="text-sm text-secondary-400 line-clamp-2 mb-3">
            {contract.description || 'No description available'}
          </p>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 text-xs text-secondary-500">
            <span className="flex items-center gap-1">
              <HiCalendar className="h-3.5 w-3.5" />
              {contract.created_at
                ? new Date(contract.created_at).toLocaleDateString()
                : 'Date not available'}
            </span>
            {contract.pages && (
              <span>{contract.pages} pages</span>
            )}
            {contract.clauses && (
              <span>{contract.clauses} clauses</span>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={() => {
              if (onView) onView(contract);
              else navigate('/viewer', { state: { contract } });
            }}
            className="p-2 rounded-lg bg-secondary-700/50 hover:bg-primary-500/20 text-secondary-300 hover:text-primary-400 transition-all"
            title="View Contract"
          >
            <HiEye className="h-4 w-4" />
          </button>
          {onDownload && (
            <button
              onClick={() => onDownload(contract)}
              className="p-2 rounded-lg bg-secondary-700/50 hover:bg-primary-500/20 text-secondary-300 hover:text-primary-400 transition-all"
              title="Download"
            >
              <HiDownload className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContractCard;


import React from 'react';
import { useNavigate } from 'react-router-dom';

const DashboardCard = ({ title, description, icon: Icon, route, color = 'primary' }) => {
  const navigate = useNavigate();

  const colorStyles = {
    primary: {
      bg: 'from-primary-500/20 to-primary-600/10',
      border: 'border-primary-500/30 hover:border-primary-400/60',
      icon: 'text-primary-400 bg-primary-500/10',
      glow: 'shadow-primary-500/10',
    },
    blue: {
      bg: 'from-blue-500/20 to-blue-600/10',
      border: 'border-blue-500/30 hover:border-blue-400/60',
      icon: 'text-blue-400 bg-blue-500/10',
      glow: 'shadow-blue-500/10',
    },
    emerald: {
      bg: 'from-emerald-500/20 to-emerald-600/10',
      border: 'border-emerald-500/30 hover:border-emerald-400/60',
      icon: 'text-emerald-400 bg-emerald-500/10',
      glow: 'shadow-emerald-500/10',
    },
    amber: {
      bg: 'from-amber-500/20 to-amber-600/10',
      border: 'border-amber-500/30 hover:border-amber-400/60',
      icon: 'text-amber-400 bg-amber-500/10',
      glow: 'shadow-amber-500/10',
    },
    purple: {
      bg: 'from-purple-500/20 to-purple-600/10',
      border: 'border-purple-500/30 hover:border-purple-400/60',
      icon: 'text-purple-400 bg-purple-500/10',
      glow: 'shadow-purple-500/10',
    },
    rose: {
      bg: 'from-rose-500/20 to-rose-600/10',
      border: 'border-rose-500/30 hover:border-rose-400/60',
      icon: 'text-rose-400 bg-rose-500/10',
      glow: 'shadow-rose-500/10',
    },
  };

  const style = colorStyles[color] || colorStyles.primary;

  return (
    <div
      onClick={() => navigate(route)}
      className={`
        group relative overflow-hidden rounded-2xl p-6 cursor-pointer
        bg-gradient-to-br ${style.bg}
        border ${style.border}
        ${style.glow}
        backdrop-blur-sm
        transition-all duration-300 ease-out
        hover:scale-[1.02] hover:shadow-2xl hover:${style.glow.replace('/10', '/20')}
        active:scale-[0.98]
      `}
    >
      {/* Background decoration */}
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-white/5 to-transparent rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />

      <div className="relative z-10">
        <div
          className={`inline-flex p-3 rounded-xl ${style.icon} mb-4 transition-transform duration-300 group-hover:scale-110`}
        >
          <Icon className="h-6 w-6" />
        </div>

        <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
        <p className="text-sm text-secondary-400 leading-relaxed">{description}</p>

        {/* Arrow indicator */}
        <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <svg
            className="h-5 w-5 text-primary-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 7l5 5m0 0l-5 5m5-5H6"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;


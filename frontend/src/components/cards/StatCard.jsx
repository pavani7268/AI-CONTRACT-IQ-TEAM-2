import React from 'react';

const StatCard = ({ title, value, icon: Icon, change, changeType = 'positive', color = 'primary' }) => {
  const colorStyles = {
    primary: {
      bg: 'from-primary-500/10 to-primary-600/5',
      border: 'border-primary-500/20',
      icon: 'text-primary-400 bg-primary-500/10',
    },
    blue: {
      bg: 'from-blue-500/10 to-blue-600/5',
      border: 'border-blue-500/20',
      icon: 'text-blue-400 bg-blue-500/10',
    },
    emerald: {
      bg: 'from-emerald-500/10 to-emerald-600/5',
      border: 'border-emerald-500/20',
      icon: 'text-emerald-400 bg-emerald-500/10',
    },
    amber: {
      bg: 'from-amber-500/10 to-amber-600/5',
      border: 'border-amber-500/20',
      icon: 'text-amber-400 bg-amber-500/10',
    },
    purple: {
      bg: 'from-purple-500/10 to-purple-600/5',
      border: 'border-purple-500/20',
      icon: 'text-purple-400 bg-purple-500/10',
    },
  };

  const style = colorStyles[color] || colorStyles.primary;

  return (
    <div
      className={`
        relative overflow-hidden rounded-2xl p-6
        bg-gradient-to-br ${style.bg}
        border ${style.border}
        backdrop-blur-sm
        transition-all duration-300
        hover:shadow-lg hover:shadow-primary-500/5
      `}
    >
      {/* Animated background */}
      <div className="absolute -top-10 -right-10 w-24 h-24 bg-gradient-to-br from-white/5 to-transparent rounded-full blur-xl" />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium text-secondary-400">{title}</span>
          <div className={`p-2 rounded-lg ${style.icon}`}>
            <Icon className="h-5 w-5" />
          </div>
        </div>

        {/* Value */}
        <div className="flex items-end gap-3">
          <span className="text-3xl font-bold text-white">{value}</span>

          {/* Change indicator */}
          {change && (
            <span
              className={`flex items-center gap-1 text-sm font-medium ${
                changeType === 'positive' ? 'text-emerald-400' : 'text-red-400'
              }`}
            >
              <svg
                className={`h-4 w-4 ${
                  changeType === 'positive' ? '' : 'rotate-180'
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 10l7-7m0 0l7 7m-7-7v18"
                />
              </svg>
              {change}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatCard;


import React from 'react';

const Loader = ({ size = 'md', fullScreen = false, text = 'Loading...' }) => {
  const sizes = {
    sm: 'h-6 w-6',
    md: 'h-10 w-10',
    lg: 'h-16 w-16',
  };

  const spinner = (
    <div className="flex flex-col items-center justify-center gap-3">
      <div className="relative">
        <div
          className={`${sizes[size]} border-4 border-secondary-700 rounded-full`}
        />
        <div
          className={`${sizes[size]} absolute top-0 left-0 border-4 border-transparent border-t-primary-500 rounded-full animate-spin`}
        />
      </div>
      {text && (
        <p className="text-sm text-secondary-400 animate-pulse">{text}</p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-secondary-950/80 backdrop-blur-sm">
        {spinner}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center py-12">{spinner}</div>
  );
};

export const SkeletonCard = () => (
  <div className="glass-card rounded-2xl p-6 animate-pulse">
    <div className="skeleton h-4 w-24 rounded mb-4" />
    <div className="skeleton h-8 w-16 rounded mb-2" />
    <div className="skeleton h-3 w-32 rounded" />
  </div>
);

export const SkeletonTable = ({ rows = 5 }) => (
  <div className="space-y-3">
    {[...Array(rows)].map((_, i) => (
      <div key={i} className="flex gap-4">
        <div className="skeleton h-4 w-1/4 rounded" />
        <div className="skeleton h-4 w-1/3 rounded" />
        <div className="skeleton h-4 w-1/5 rounded" />
      </div>
    ))}
  </div>
);

export const SkeletonPDF = () => (
  <div className="glass-card rounded-2xl p-8 animate-pulse">
    <div className="skeleton h-6 w-48 rounded mb-6" />
    <div className="skeleton h-96 w-full rounded-lg mb-4" />
    <div className="flex gap-3">
      <div className="skeleton h-10 w-32 rounded-xl" />
      <div className="skeleton h-10 w-32 rounded-xl" />
    </div>
  </div>
);

export default Loader;


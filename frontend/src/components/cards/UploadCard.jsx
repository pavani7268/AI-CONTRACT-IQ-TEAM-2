import React from 'react';
import { HiDocument, HiTrash, HiEye, HiCheck, HiClock } from 'react-icons/hi';
import Button from '../common/Button';

const UploadCard = ({ file, onDelete, onView, index }) => {
  const getStatusIcon = () => {
    switch (file.status) {
      case 'uploaded':
        return <HiCheck className="h-5 w-5 text-emerald-400" />;
      case 'uploading':
        return <HiClock className="h-5 w-5 text-amber-400 animate-pulse" />;
      default:
        return <HiClock className="h-5 w-5 text-secondary-400" />;
    }
  };

  const getStatusColor = () => {
    switch (file.status) {
      case 'uploaded':
        return 'text-emerald-400 bg-emerald-500/10';
      case 'uploading':
        return 'text-amber-400 bg-amber-500/10';
      default:
        return 'text-secondary-400 bg-secondary-500/10';
    }
  };

  return (
    <div className="group glass-card rounded-xl p-4 hover:bg-white/[0.08] transition-all duration-200">
      <div className="flex items-center gap-4">
        {/* Icon */}
        <div className="flex-shrink-0">
          <div className={`p-3 rounded-xl ${getStatusColor()}`}>
            <HiDocument className="h-6 w-6" />
          </div>
        </div>

        {/* File Info */}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-white truncate">
            {file.name || `Contract_${index + 1}.pdf`}
          </p>
          <p className="text-xs text-secondary-400 mt-0.5">
            {file.size
              ? `${(file.size / 1024 / 1024).toFixed(2)} MB`
              : 'Size not available'}
          </p>
          {/* Progress bar for uploading */}
          {file.status === 'uploading' && (
            <div className="mt-2 w-full bg-secondary-700 rounded-full h-1.5">
              <div
                className="progress-bar h-1.5 rounded-full"
                style={{ width: `${file.progress || 0}%` }}
              />
            </div>
          )}
        </div>

        {/* Status & Actions */}
        <div className="flex items-center gap-2">
          <div className="flex -space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            {onView && (
              <button
                onClick={() => onView(file)}
                className="p-2 rounded-lg bg-secondary-700/50 hover:bg-primary-500/20 text-secondary-300 hover:text-primary-400 transition-all"
                title="View"
              >
                <HiEye className="h-4 w-4" />
              </button>
            )}
            {onDelete && (
              <button
                onClick={() => onDelete(file)}
                className="p-2 rounded-lg bg-secondary-700/50 hover:bg-red-500/20 text-secondary-300 hover:text-red-400 transition-all"
                title="Delete"
              >
                <HiTrash className="h-4 w-4" />
              </button>
            )}
          </div>
          <div className="hidden group-hover:block">{getStatusIcon()}</div>
        </div>
      </div>
    </div>
  );
};

export default UploadCard;


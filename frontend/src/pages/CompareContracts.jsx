import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import {
  HiScale,
  HiUpload,
  HiDocumentText,
  HiArrowRight,
  HiCheckCircle,
  HiXCircle,
  HiExclamationCircle,
  HiArrowSmUp,
  HiArrowSmDown,
} from 'react-icons/hi';
import toast from 'react-hot-toast';
import Button from '../components/common/Button';
import Loader from '../components/common/Loader';

const CompareContracts = () => {
  const navigate = useNavigate();
  const [contractA, setContractA] = useState(null);
  const [contractB, setContractB] = useState(null);
  const [comparing, setComparing] = useState(false);
  const [differences, setDifferences] = useState([]);

  const onDropA = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      setContractA({ file, name: file.name, size: file.size });
      toast.success('Contract A uploaded');
    }
  };

  const onDropB = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      setContractB({ file, name: file.name, size: file.size });
      toast.success('Contract B uploaded');
    }
  };

  const dropzoneA = useDropzone({
    onDrop: onDropA,
    accept: { 'application/pdf': ['.pdf'] },
    maxFiles: 1,
    maxSize: 50 * 1024 * 1024,
  });

  const dropzoneB = useDropzone({
    onDrop: onDropB,
    accept: { 'application/pdf': ['.pdf'] },
    maxFiles: 1,
    maxSize: 50 * 1024 * 1024,
  });

  const handleCompare = async () => {
    if (!contractA || !contractB) {
      toast.error('Please upload both contracts');
      return;
    }

    setComparing(true);
    try {
      // Simulate comparison results for demo
      setTimeout(() => {
        setDifferences([
          {
            clause: 'Payment Terms',
            contractA: 'Net 30 days',
            contractB: 'Net 60 days',
            severity: 'high',
            type: 'modified',
          },
          {
            clause: 'Termination Clause',
            contractA: '30 days notice',
            contractB: '90 days notice',
            severity: 'medium',
            type: 'modified',
          },
          {
            clause: 'Confidentiality',
            contractA: 'Standard NDA',
            contractB: 'Standard NDA',
            severity: 'low',
            type: 'same',
          },
          {
            clause: 'Liability Cap',
            contractA: '$1M',
            contractB: '$500K',
            severity: 'high',
            type: 'modified',
          },
          {
            clause: 'Governing Law',
            contractA: 'New York',
            contractB: 'California',
            severity: 'medium',
            type: 'modified',
          },
        ]);
        toast.success('Comparison complete!');
      }, 2000);
    } catch (error) {
      toast.error('Failed to compare contracts');
    } finally {
      setComparing(false);
    }
  };

  const clearAll = () => {
    setContractA(null);
    setContractB(null);
    setDifferences([]);
    toast.success('Cleared all');
  };

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'high':
        return <HiXCircle className="h-5 w-5 text-red-400" />;
      case 'medium':
        return <HiExclamationCircle className="h-5 w-5 text-amber-400" />;
      default:
        return <HiCheckCircle className="h-5 w-5 text-emerald-400" />;
    }
  };

  const getSeverityBadge = (severity) => {
    const styles = {
      high: 'bg-red-500/10 text-red-400 border-red-500/30',
      medium: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
      low: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    };
    return (
      <span className={`px-2 py-0.5 text-xs font-medium rounded-full border ${styles[severity]}`}>
        {severity.toUpperCase()}
      </span>
    );
  };

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Compare Contracts</h1>
            <p className="text-secondary-400">Upload two contracts to compare and find differences</p>
          </div>
          {(contractA || contractB) && (
            <Button variant="ghost" size="sm" onClick={clearAll}>
              Clear All
            </Button>
          )}
        </div>

        {/* Upload Area */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Contract A */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">
              Contract A (Original)
            </h3>
            <div
              {...dropzoneA.getRootProps()}
              className={`dropzone ${
                dropzoneA.isDragActive ? 'active border-primary-500 bg-primary-500/5' : ''
              }`}
            >
              <input {...dropzoneA.getInputProps()} />
              {contractA ? (
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-primary-500/10 text-primary-400">
                    <HiDocumentText className="h-6 w-6" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-medium text-white">{contractA.name}</p>
                    <p className="text-xs text-secondary-400">
                      {(contractA.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                  <HiCheckCircle className="h-5 w-5 text-emerald-400 ml-auto" />
                </div>
              ) : (
                <div className="text-center py-6">
                  <HiUpload className="h-8 w-8 mx-auto mb-2 text-secondary-400" />
                  <p className="text-sm text-secondary-300">Drag & drop or click to upload</p>
                </div>
              )}
            </div>
          </div>

          {/* Contract B */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">
              Contract B (Revised)
            </h3>
            <div
              {...dropzoneB.getRootProps()}
              className={`dropzone ${
                dropzoneB.isDragActive ? 'active border-primary-500 bg-primary-500/5' : ''
              }`}
            >
              <input {...dropzoneB.getInputProps()} />
              {contractB ? (
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-primary-500/10 text-primary-400">
                    <HiDocumentText className="h-6 w-6" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-medium text-white">{contractB.name}</p>
                    <p className="text-xs text-secondary-400">
                      {(contractB.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                  <HiCheckCircle className="h-5 w-5 text-emerald-400 ml-auto" />
                </div>
              ) : (
                <div className="text-center py-6">
                  <HiUpload className="h-8 w-8 mx-auto mb-2 text-secondary-400" />
                  <p className="text-sm text-secondary-300">Drag & drop or click to upload</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Compare Button */}
        <div className="text-center mb-8">
          <Button
            variant="primary"
            size="lg"
            icon={HiScale}
            onClick={handleCompare}
            disabled={!contractA || !contractB || comparing}
            loading={comparing}
          >
            Compare Contracts
          </Button>
        </div>

        {/* Results */}
        {differences.length > 0 && (
          <div className="glass-card rounded-2xl overflow-hidden">
            <div className="p-4 border-b border-white/5">
              <h2 className="text-lg font-semibold text-white">Comparison Results</h2>
              <p className="text-sm text-secondary-400 mt-1">
                Found {differences.length} differences
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/5">
                    <th className="text-left px-4 py-3 text-xs font-semibold text-secondary-400 uppercase tracking-wider">
                      Clause
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-secondary-400 uppercase tracking-wider">
                      Contract A
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-secondary-400 uppercase tracking-wider">
                      Contract B
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-secondary-400 uppercase tracking-wider">
                      Severity
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {differences.map((diff, index) => (
                    <tr
                      key={index}
                      className={`hover:bg-white/[0.02] transition-colors ${
                        diff.type === 'same' ? 'opacity-60' : ''
                      }`}
                    >
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          {getSeverityIcon(diff.severity)}
                          <span className="text-sm font-medium text-white">{diff.clause}</span>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <span className="text-sm text-secondary-300">{diff.contractA}</span>
                      </td>
                      <td className="px-4 py-4">
                        <span className="text-sm text-secondary-300">{diff.contractB}</span>
                      </td>
                      <td className="px-4 py-4">{getSeverityBadge(diff.severity)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!contractA && !contractB && differences.length === 0 && (
          <div className="glass-card rounded-2xl p-12 text-center">
            <div className="inline-flex p-4 rounded-xl bg-secondary-700/50 text-secondary-400 mb-4">
              <HiScale className="h-8 w-8" />
            </div>
            <h3 className="text-lg font-medium text-white mb-2">Upload contracts to compare</h3>
            <p className="text-secondary-400">Upload two contract versions to see highlighted differences</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompareContracts;


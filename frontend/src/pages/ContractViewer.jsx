import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  HiDocumentText,
  HiDownload,
  HiLightningBolt,
  HiExclamationCircle,
  HiClipboardList,
  HiSearch,
  HiShieldCheck,
  HiArrowLeft,
  HiEye,
} from 'react-icons/hi';
import toast from 'react-hot-toast';
import Button from '../components/common/Button';
import Loader, { SkeletonPDF } from '../components/common/Loader';
import Modal from '../components/common/Modal';
import { getSummary, getClauses, getRiskAnalysis } from '../services/api';

const ContractViewer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const contract = location.state?.contract;

  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState('');
  const [clauses, setClauses] = useState([]);
  const [risks, setRisks] = useState([]);
  const [activeTab, setActiveTab] = useState('preview');
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  useEffect(() => {
    if (!contract) {
      navigate('/dashboard');
    }
  }, [contract, navigate]);

  const handleGetSummary = async () => {
    if (!contract?.id) {
      toast.error('No contract selected');
      return;
    }
    setLoading(true);
    try {
      const response = await getSummary(contract.id);
      setSummary(response.data.summary || response.data.text || 'Summary generated successfully');
      setActiveTab('summary');
      toast.success('Summary generated!');
    } catch (error) {
      toast.error('Failed to generate summary');
    } finally {
      setLoading(false);
    }
  };

  const handleGetClauses = async () => {
    if (!contract?.id) {
      toast.error('No contract selected');
      return;
    }
    setLoading(true);
    try {
      const response = await getClauses(contract.id);
      setClauses(response.data.clauses || []);
      setActiveTab('clauses');
      toast.success('Clauses extracted!');
    } catch (error) {
      toast.error('Failed to extract clauses');
    } finally {
      setLoading(false);
    }
  };

  const handleRiskDetection = async () => {
    if (!contract?.id) {
      toast.error('No contract selected');
      return;
    }
    setLoading(true);
    try {
      const response = await getRiskAnalysis(contract.id);
      setRisks(response.data.risks || []);
      setActiveTab('risks');
      toast.success('Risk analysis complete!');
    } catch (error) {
      toast.error('Failed to analyze risks');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    toast.success('Download started');
  };

  if (!contract) return null;

  const tabs = [
    { id: 'preview', label: 'Preview', icon: HiEye },
    { id: 'summary', label: 'Summary', icon: HiDocumentText },
    { id: 'clauses', label: 'Clauses', icon: HiClipboardList },
    { id: 'risks', label: 'Risk Detection', icon: HiExclamationCircle },
  ];

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="p-2 rounded-xl bg-secondary-800/50 hover:bg-secondary-700/50 text-secondary-300 hover:text-white transition-all"
            >
              <HiArrowLeft className="h-5 w-5" />
            </button>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-white">
                {contract.name || 'Contract Viewer'}
              </h1>
              <p className="text-sm text-secondary-400">
                {contract.created_at
                  ? new Date(contract.created_at).toLocaleDateString()
                  : 'No date'}
              </p>
            </div>
          </div>
          <Button variant="outline" size="sm" icon={HiDownload} onClick={handleDownload}>
            Download
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* PDF Preview */}
          <div className="lg:col-span-2">
            <div className="glass-card rounded-2xl overflow-hidden">
              <div className="p-4 border-b border-white/5 flex items-center justify-between">
                <span className="text-sm text-secondary-400">Document Preview</span>
                <span className="text-xs text-secondary-500">
                  {contract.pages || 'N/A'} pages
                </span>
              </div>
              <div className="p-8 flex items-center justify-center min-h-[500px] bg-secondary-900/50">
                <div className="text-center">
                  <div className="inline-flex p-6 rounded-2xl bg-secondary-800/50 text-secondary-500 mb-4">
                    <HiDocumentText className="h-16 w-16" />
                  </div>
                  <p className="text-secondary-400">PDF Preview Area</p>
                  <p className="text-sm text-secondary-500 mt-2">
                    PDF viewer will render the document here
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Actions & Analysis */}
          <div className="space-y-4">
            {/* Action Buttons */}
            <div className="glass-card rounded-2xl p-4 space-y-3">
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">
                Actions
              </h3>
              <Button
                variant="primary"
                size="sm"
                fullWidth
                icon={HiLightningBolt}
                onClick={handleGetSummary}
                loading={loading && activeTab === 'summary'}
              >
                Generate Summary
              </Button>
              <Button
                variant="secondary"
                size="sm"
                fullWidth
                icon={HiClipboardList}
                onClick={handleGetClauses}
                loading={loading && activeTab === 'clauses'}
              >
                Extract Clauses
              </Button>
              <Button
                variant="secondary"
                size="sm"
                fullWidth
                icon={HiExclamationCircle}
                onClick={handleRiskDetection}
                loading={loading && activeTab === 'risks'}
              >
                Detect Risks
              </Button>
            </div>

            {/* Quick Info */}
            <div className="glass-card rounded-2xl p-4">
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">
                Contract Info
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-secondary-400">Status</span>
                  <span className="text-emerald-400">Active</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-secondary-400">Type</span>
                  <span className="text-white">PDF Document</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-secondary-400">Size</span>
                  <span className="text-white">
                    {contract.size
                      ? `${(contract.size / 1024 / 1024).toFixed(2)} MB`
                      : 'N/A'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Analysis Results */}
        <div className="mt-6">
          <div className="glass-card rounded-2xl overflow-hidden">
            {/* Tabs */}
            <div className="flex border-b border-white/5 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap transition-all ${
                    activeTab === tab.id
                      ? 'text-primary-400 border-b-2 border-primary-400 bg-primary-500/5'
                      : 'text-secondary-400 hover:text-secondary-300 hover:bg-white/5'
                  }`}
                >
                  <tab.icon className="h-4 w-4" />
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="p-6">
              {loading ? (
                <Loader text="Analyzing contract..." />
              ) : (
                <>
                  {activeTab === 'preview' && (
                    <div className="text-center py-12 text-secondary-400">
                      <HiEye className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>Select an action to analyze this contract</p>
                    </div>
                  )}

                  {activeTab === 'summary' && (
                    <div>
                      {summary ? (
                        <div className="prose prose-invert max-w-none">
                          <p className="text-secondary-300 leading-relaxed">{summary}</p>
                        </div>
                      ) : (
                        <p className="text-secondary-500 text-center py-8">
                          Click "Generate Summary" to get AI-powered summary
                        </p>
                      )}
                    </div>
                  )}

                  {activeTab === 'clauses' && (
                    <div>
                      {clauses.length > 0 ? (
                        <div className="space-y-3">
                          {clauses.map((clause, index) => (
                            <div
                              key={index}
                              className="p-4 rounded-xl bg-secondary-800/30 border border-secondary-700/30"
                            >
                              <h4 className="text-sm font-semibold text-white mb-2">
                                {clause.title || `Clause ${index + 1}`}
                              </h4>
                              <p className="text-sm text-secondary-400">{clause.text}</p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-secondary-500 text-center py-8">
                          Click "Extract Clauses" to extract contract clauses
                        </p>
                      )}
                    </div>
                  )}

                  {activeTab === 'risks' && (
                    <div>
                      {risks.length > 0 ? (
                        <div className="space-y-3">
                          {risks.map((risk, index) => (
                            <div
                              key={index}
                              className={`p-4 rounded-xl border ${
                                risk.severity === 'high'
                                  ? 'bg-red-500/5 border-red-500/20'
                                  : risk.severity === 'medium'
                                  ? 'bg-amber-500/5 border-amber-500/20'
                                  : 'bg-emerald-500/5 border-emerald-500/20'
                              }`}
                            >
                              <div className="flex items-center gap-2 mb-2">
                                <HiExclamationCircle
                                  className={`h-5 w-5 ${
                                    risk.severity === 'high'
                                      ? 'text-red-400'
                                      : risk.severity === 'medium'
                                      ? 'text-amber-400'
                                      : 'text-emerald-400'
                                  }`}
                                />
                                <span className="text-sm font-semibold text-white">
                                  {risk.title || `Risk ${index + 1}`}
                                </span>
                                <span
                                  className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                                    risk.severity === 'high'
                                      ? 'bg-red-500/10 text-red-400'
                                      : risk.severity === 'medium'
                                      ? 'bg-amber-500/10 text-amber-400'
                                      : 'bg-emerald-500/10 text-emerald-400'
                                  }`}
                                >
                                  {risk.severity || 'Low'}
                                </span>
                              </div>
                              <p className="text-sm text-secondary-400">{risk.description}</p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-secondary-500 text-center py-8">
                          Click "Detect Risks" to analyze potential risks
                        </p>
                      )}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>

        {/* Modal for detailed view */}
        <Modal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          title="Detailed View"
          size="lg"
        >
          {modalContent}
        </Modal>
      </div>
    </div>
  );
};

export default ContractViewer;


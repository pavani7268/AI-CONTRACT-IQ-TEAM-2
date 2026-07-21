import React, { useState } from 'react';
import {
  HiShieldCheck,
  HiDownload,
  HiDocumentReport,
  HiCheckCircle,
  HiXCircle,
  HiExclamationCircle,
  HiLightningBolt,
  HiChartBar,
  HiClipboardList,
  HiArrowSmUp,
} from 'react-icons/hi';
import toast from 'react-hot-toast';
import Button from '../components/common/Button';
import Loader from '../components/common/Loader';

const ComplianceReport = () => {
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState(null);

  const handleGenerateReport = async () => {
    setLoading(true);
    try {
      // Simulate report generation
      setTimeout(() => {
        setReport({
          score: 78,
          riskLevel: 'Medium',
          summary: 'The contract has moderate compliance risks. Key areas requiring attention include data privacy provisions and termination clauses.',
          missingClauses: [
            'Data Protection Addendum',
            'Limitation of Liability Clause',
            'Force Majeure Clause',
            'Non-Compete Agreement',
          ],
          recommendations: [
            'Add a comprehensive Data Protection Addendum to ensure GDPR/CCPA compliance',
            'Include a Limitation of Liability clause to cap potential damages',
            'Add a Force Majeure clause to address unforeseen circumstances',
            'Consider adding a Non-Compete clause for key personnel',
          ],
          riskFactors: [
            { category: 'Data Privacy', level: 'High', status: 'non-compliant' },
            { category: 'Termination Terms', level: 'Medium', status: 'needs-review' },
            { category: 'Payment Terms', level: 'Low', status: 'compliant' },
            { category: 'Confidentiality', level: 'Low', status: 'compliant' },
            { category: 'Liability', level: 'High', status: 'non-compliant' },
          ],
          generatedAt: new Date().toISOString(),
        });
        toast.success('Compliance report generated!');
      }, 2000);
    } catch (error) {
      toast.error('Failed to generate report');
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadPDF = () => {
    toast.success('Downloading PDF report...');
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-emerald-400';
    if (score >= 60) return 'text-amber-400';
    return 'text-red-400';
  };

  const getScoreRingColor = (score) => {
    if (score >= 80) return 'stroke-emerald-400';
    if (score >= 60) return 'stroke-amber-400';
    return 'stroke-red-400';
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'compliant':
        return <HiCheckCircle className="h-5 w-5 text-emerald-400" />;
      case 'non-compliant':
        return <HiXCircle className="h-5 w-5 text-red-400" />;
      default:
        return <HiExclamationCircle className="h-5 w-5 text-amber-400" />;
    }
  };

  const getStatusBadge = (status) => {
    const styles = {
      compliant: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
      'non-compliant': 'bg-red-500/10 text-red-400 border-red-500/30',
      'needs-review': 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    };
    return (
      <span className={`px-2.5 py-0.5 text-xs font-medium rounded-full border ${styles[status] || styles['needs-review']}`}>
        {status.split('-').join(' ').toUpperCase()}
      </span>
    );
  };

  // Circular progress SVG
  const CircularScore = ({ score }) => {
    const radius = 54;
    const circumference = 2 * Math.PI * radius;
    const progress = ((100 - score) / 100) * circumference;
    const offset = circumference - (score / 100) * circumference;

    return (
      <div className="relative inline-flex items-center justify-center">
        <svg className="w-32 h-32 transform -rotate-90">
          <circle
            className="stroke-secondary-700"
            strokeWidth="8"
            fill="transparent"
            r={radius}
            cx="64"
            cy="64"
          />
          <circle
            className={`${getScoreRingColor(score)} transition-all duration-1000 ease-out`}
            strokeWidth="8"
            strokeLinecap="round"
            fill="transparent"
            r={radius}
            cx="64"
            cy="64"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`text-3xl font-bold ${getScoreColor(score)}`}>{score}%</span>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Compliance Report</h1>
            <p className="text-secondary-400">Generate and view compliance reports for your contracts</p>
          </div>
          {report && (
            <Button variant="outline" size="sm" icon={HiDownload} onClick={handleDownloadPDF}>
              Download PDF
            </Button>
          )}
        </div>

        {/* Generate Button */}
        {!report && (
          <div className="text-center mb-8">
            <Button
              variant="primary"
              size="lg"
              icon={HiShieldCheck}
              onClick={handleGenerateReport}
              loading={loading}
            >
              Generate Compliance Report
            </Button>
          </div>
        )}

        {/* Report Content */}
        {loading && <Loader text="Analyzing contract compliance..." />}

        {report && !loading && (
          <div className="space-y-6">
            {/* Score & Risk Level */}
            <div className="glass-card rounded-2xl p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row items-center gap-8">
                <CircularScore score={report.score} />
                <div className="text-center sm:text-left">
                  <h3 className="text-xl font-bold text-white mb-2">Compliance Score</h3>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-sm text-secondary-400">Risk Level:</span>
                    <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                      report.riskLevel === 'Low'
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                        : report.riskLevel === 'Medium'
                        ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                        : 'bg-red-500/10 text-red-400 border border-red-500/30'
                    }`}>
                      {report.riskLevel} Risk
                    </span>
                  </div>
                  <p className="text-sm text-secondary-400 leading-relaxed max-w-lg">
                    {report.summary}
                  </p>
                </div>
              </div>
            </div>

            {/* Risk Factors */}
            <div className="glass-card rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <HiChartBar className="h-5 w-5 text-primary-400" />
                Risk Factors
              </h3>
              <div className="space-y-3">
                {report.riskFactors.map((factor, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-xl bg-secondary-800/30 border border-secondary-700/30"
                  >
                    <div className="flex items-center gap-3">
                      {getStatusIcon(factor.status)}
                      <span className="text-sm font-medium text-white">{factor.category}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-medium ${
                        factor.level === 'High' ? 'text-red-400' :
                        factor.level === 'Medium' ? 'text-amber-400' : 'text-emerald-400'
                      }`}>
                        {factor.level}
                      </span>
                      {getStatusBadge(factor.status)}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Missing Clauses */}
            <div className="glass-card rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <HiClipboardList className="h-5 w-5 text-amber-400" />
                Missing Clauses
              </h3>
              <div className="space-y-2">
                {report.missingClauses.map((clause, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 rounded-xl bg-amber-500/5 border border-amber-500/20"
                  >
                    <HiXCircle className="h-5 w-5 text-amber-400 flex-shrink-0" />
                    <span className="text-sm text-secondary-200">{clause}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommendations */}
            <div className="glass-card rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <HiLightningBolt className="h-5 w-5 text-primary-400" />
                Recommendations
              </h3>
              <div className="space-y-3">
                {report.recommendations.map((rec, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-3 rounded-xl bg-primary-500/5 border border-primary-500/20"
                  >
                    <div className="p-0.5 rounded-full bg-primary-500/20 mt-0.5">
                      <HiCheckCircle className="h-4 w-4 text-primary-400" />
                    </div>
                    <span className="text-sm text-secondary-200">{rec}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Report Meta */}
            <div className="text-center text-xs text-secondary-500">
              Report generated on {new Date(report.generatedAt).toLocaleString()}
            </div>
          </div>
        )}

        {/* Empty State */}
        {!report && !loading && (
          <div className="glass-card rounded-2xl p-12 text-center">
            <div className="inline-flex p-4 rounded-xl bg-secondary-700/50 text-secondary-400 mb-4">
              <HiDocumentReport className="h-8 w-8" />
            </div>
            <h3 className="text-lg font-medium text-white mb-2">No report generated yet</h3>
            <p className="text-secondary-400">
              Upload and analyze a contract to generate a compliance report
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ComplianceReport;


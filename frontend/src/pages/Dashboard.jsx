import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  HiUpload,
  HiDocumentText,
  HiChat,
  HiScale,
  HiShieldCheck,
  HiExclamationCircle,
  HiCheckCircle,
  HiClock,
  HiDocument,
  HiEye,
  HiTrendingUp,
} from 'react-icons/hi';
import DashboardCard from '../components/cards/DashboardCard';
import StatCard from '../components/cards/StatCard';
import ContractCard from '../components/cards/ContractCard';
import Button from '../components/common/Button';
import { getContracts } from '../services/api';

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalContracts: 0,
    analyzed: 0,
    pending: 0,
    risksFound: 0,
  });

  useEffect(() => {
    fetchContracts();
  }, []);

  const fetchContracts = async () => {
    try {
      const response = await getContracts();
      const data = response.data;
      setContracts(data.contracts || []);
      setStats({
        totalContracts: data.total || data.contracts?.length || 0,
        analyzed: data.analyzed || 0,
        pending: data.pending || 0,
        risksFound: data.risks_found || 0,
      });
    } catch (error) {
      console.error('Failed to fetch contracts:', error);
    } finally {
      setLoading(false);
    }
  };

  const dashboardCards = [
    {
      title: 'Upload Contract',
      description: 'Upload PDF contracts for AI-powered analysis',
      icon: HiUpload,
      route: '/upload',
      color: 'primary',
    },
    {
      title: 'AI Summary',
      description: 'Get instant AI-generated contract summaries',
      icon: HiDocumentText,
      route: '/viewer',
      color: 'blue',
    },
    {
      title: 'Risk Detection',
      description: 'Identify potential risks and issues',
      icon: HiExclamationCircle,
      route: '/viewer',
      color: 'amber',
    },
    {
      title: 'Compare Contracts',
      description: 'Compare two contracts side by side',
      icon: HiScale,
      route: '/compare',
      color: 'purple',
    },
    {
      title: 'Compliance Report',
      description: 'Generate compliance and audit reports',
      icon: HiShieldCheck,
      route: '/report',
      color: 'emerald',
    },
    {
      title: 'AI Chat',
      description: 'Ask questions about your contracts',
      icon: HiChat,
      route: '/chat',
      color: 'rose',
    },
  ];

  const recentContracts = contracts.slice(0, 5);

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Banner */}
        <div className="relative overflow-hidden rounded-2xl gradient-primary p-8 mb-8">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
          
          <div className="relative z-10">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                  Welcome back, {user.name || 'User'}! 👋
                </h1>
                <p className="text-primary-100 text-sm sm:text-base">
                  Here's what's happening with your contracts today.
                </p>
              </div>
              <Link to="/upload">
                <Button variant="secondary" size="md" icon={HiUpload}>
                  Upload Contract
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            title="Total Contracts"
            value={stats.totalContracts}
            icon={HiDocument}
            color="primary"
          />
          <StatCard
            title="Analyzed"
            value={stats.analyzed}
            icon={HiCheckCircle}
            change="+12%"
            color="emerald"
          />
          <StatCard
            title="Pending Review"
            value={stats.pending}
            icon={HiClock}
            change="-3"
            changeType="negative"
            color="amber"
          />
          <StatCard
            title="Risks Found"
            value={stats.risksFound}
            icon={HiExclamationCircle}
            change="+5"
            changeType="negative"
            color="rose"
          />
        </div>

        {/* Dashboard Cards Grid */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {dashboardCards.map((card, index) => (
              <DashboardCard key={index} {...card} />
            ))}
          </div>
        </div>

        {/* Recent Contracts */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-white">Recent Contracts</h2>
            <Link
              to="/upload"
              className="text-sm text-primary-400 hover:text-primary-300 font-medium flex items-center gap-1"
            >
              View All
              <HiTrendingUp className="h-4 w-4" />
            </Link>
          </div>

          {loading ? (
            <div className="space-y-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="glass-card rounded-2xl p-5 animate-pulse">
                  <div className="flex gap-4">
                    <div className="skeleton h-12 w-12 rounded-xl" />
                    <div className="flex-1">
                      <div className="skeleton h-4 w-48 rounded mb-2" />
                      <div className="skeleton h-3 w-32 rounded" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : recentContracts.length > 0 ? (
            <div className="space-y-3">
              {recentContracts.map((contract, index) => (
                <ContractCard key={contract.id || index} contract={contract} />
              ))}
            </div>
          ) : (
            <div className="glass-card rounded-2xl p-12 text-center">
              <div className="inline-flex p-4 rounded-xl bg-secondary-700/50 text-secondary-400 mb-4">
                <HiDocumentText className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-medium text-white mb-2">No contracts yet</h3>
              <p className="text-secondary-400 mb-6">Upload your first contract to get started</p>
              <Link to="/upload">
                <Button variant="primary" icon={HiUpload}>
                  Upload Contract
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

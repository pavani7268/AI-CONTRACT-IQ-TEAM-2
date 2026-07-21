import React from 'react';
import { Link } from 'react-router-dom';
import {
  HiShieldCheck,
  HiDocumentText,
  HiScale,
  HiChat,
  HiChartBar,
  HiLightningBolt,
  HiArrowRight,
  HiCheckCircle,
  HiUserGroup,
  HiLockClosed,
} from 'react-icons/hi';
import Button from '../components/common/Button';

const Home = () => {
  const features = [
    {
      icon: HiDocumentText,
      title: 'Smart Contract Analysis',
      description: 'AI-powered analysis extracts key clauses, obligations, and terms from any contract document instantly.',
      color: 'from-blue-500/20 to-blue-600/10',
      border: 'border-blue-500/30',
      iconBg: 'text-blue-400 bg-blue-500/10',
    },
    {
      icon: HiShieldCheck,
      title: 'Risk Detection',
      description: 'Automatically identify high-risk clauses, non-standard terms, and potential compliance issues.',
      color: 'from-emerald-500/20 to-emerald-600/10',
      border: 'border-emerald-500/30',
      iconBg: 'text-emerald-400 bg-emerald-500/10',
    },
    {
      icon: HiScale,
      title: 'Contract Comparison',
      description: 'Side-by-side comparison highlighting differences between multiple contract versions.',
      color: 'from-purple-500/20 to-purple-600/10',
      border: 'border-purple-500/30',
      iconBg: 'text-purple-400 bg-purple-500/10',
    },
    {
      icon: HiChat,
      title: 'AI Chat Assistant',
      description: 'Ask questions about your contracts and get instant answers powered by advanced AI.',
      color: 'from-amber-500/20 to-amber-600/10',
      border: 'border-amber-500/30',
      iconBg: 'text-amber-400 bg-amber-500/10',
    },
    {
      icon: HiChartBar,
      title: 'Compliance Reports',
      description: 'Generate comprehensive compliance reports with actionable recommendations.',
      color: 'from-rose-500/20 to-rose-600/10',
      border: 'border-rose-500/30',
      iconBg: 'text-rose-400 bg-rose-500/10',
    },
    {
      icon: HiLightningBolt,
      title: 'Real-time Processing',
      description: 'Process contracts in real-time with instant analysis and feedback.',
      color: 'from-primary-500/20 to-primary-600/10',
      border: 'border-primary-500/30',
      iconBg: 'text-primary-400 bg-primary-500/10',
    },
  ];

  const stats = [
    { value: '99.9%', label: 'Accuracy Rate' },
    { value: '10K+', label: 'Contracts Analyzed' },
    { value: '5min', label: 'Average Analysis Time' },
    { value: '98%', label: 'Client Satisfaction' },
  ];

  const steps = [
    {
      step: '01',
      title: 'Upload Contract',
      description: 'Drag and drop your PDF contract or choose from your files.',
    },
    {
      step: '02',
      title: 'AI Analysis',
      description: 'Our AI analyzes the contract, extracts clauses, and detects risks.',
    },
    {
      step: '03',
      title: 'Get Insights',
      description: 'Review comprehensive reports, compare versions, and chat with AI.',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 gradient-hero" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.15)_0%,transparent_50%)]" />
        
        {/* Animated grid */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(rgba(59,130,246,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }} />
        </div>

        {/* Floating orbs */}
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary-500/20 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 lg:py-40">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-500/10 border border-primary-500/30 text-primary-300 text-sm font-medium mb-8 animate-fade-in">
              <HiLightningBolt className="h-4 w-4" />
              Powered by Advanced AI
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6 animate-slide-up">
              AI-Powered{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-blue-400">
                Contract Intelligence
              </span>
              {' '}& Compliance
            </h1>

            <p className="text-lg sm:text-xl text-secondary-300 max-w-3xl mx-auto mb-10 animate-slide-up" style={{ animationDelay: '0.1s' }}>
              Analyze, compare, and manage your contracts with cutting-edge AI. 
              Get instant insights, detect risks, and ensure compliance — all in one platform.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <Link to="/register">
                <Button variant="primary" size="lg" icon={HiArrowRight} iconPosition="right">
                  Get Started Free
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" size="lg">
                  Sign In
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-sm text-secondary-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-20 lg:py-28">
        <div className="absolute inset-0 bg-gradient-to-b from-secondary-950 via-secondary-900/50 to-secondary-950" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Powerful Features for{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-blue-400">
                Smart Contract Management
              </span>
            </h2>
            <p className="text-lg text-secondary-400 max-w-2xl mx-auto">
              Everything you need to analyze, compare, and manage your contracts efficiently.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`group relative overflow-hidden rounded-2xl p-6 bg-gradient-to-br ${feature.color} border ${feature.border} backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-xl`}
              >
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-white/5 to-transparent rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />
                
                <div className="relative z-10">
                  <div className={`inline-flex p-3 rounded-xl ${feature.iconBg} mb-4`}>
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-sm text-secondary-400 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="relative py-20 lg:py-28">
        <div className="absolute inset-0 bg-gradient-to-b from-secondary-950 via-secondary-900/30 to-secondary-950" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              How It{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-blue-400">
                Works
              </span>
            </h2>
            <p className="text-lg text-secondary-400 max-w-2xl mx-auto">
              Get started in three simple steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative text-center group">
                {/* Connector line */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-12 left-[60%] w-[80%] h-px bg-gradient-to-r from-primary-500/50 to-transparent" />
                )}
                
                <div className="inline-flex items-center justify-center w-24 h-24 rounded-full gradient-primary mb-6 shadow-lg shadow-primary-500/25 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl font-bold text-white">{step.step}</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{step.title}</h3>
                <p className="text-secondary-400">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="relative py-20 lg:py-28">
        <div className="absolute inset-0 bg-gradient-to-b from-secondary-950 via-secondary-900/50 to-secondary-950" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                Why Choose{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-blue-400">
                  AI Contract IQ
                </span>
              </h2>
              <p className="text-secondary-300 mb-8 leading-relaxed">
                AI Contract IQ leverages state-of-the-art artificial intelligence to transform 
                how you handle contracts. Our platform provides instant analysis, risk assessment, 
                and compliance checking, saving you hours of manual review time.
              </p>
              
              <div className="space-y-4">
                {[
                  { icon: HiCheckCircle, text: 'Powered by Gemini/OpenAI for accurate analysis' },
                  { icon: HiUserGroup, text: 'Used by legal professionals worldwide' },
                  { icon: HiLockClosed, text: 'Enterprise-grade security & encryption' },
                  { icon: HiLightningBolt, text: 'Real-time processing with instant results' },
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="p-1 rounded-lg bg-emerald-500/10">
                      <item.icon className="h-5 w-5 text-emerald-400" />
                    </div>
                    <span className="text-secondary-300">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="glass-card rounded-3xl p-8">
                <div className="grid grid-cols-2 gap-6">
                  {[
                    { label: 'Contracts Analyzed', value: '10,000+' },
                    { label: 'Active Users', value: '5,000+' },
                    { label: 'Accuracy Rate', value: '99.9%' },
                    { label: 'Avg. Analysis Time', value: '5 Min' },
                  ].map((stat, index) => (
                    <div key={index} className="text-center p-4 rounded-xl bg-white/5">
                      <div className="text-2xl font-bold text-primary-400 mb-1">{stat.value}</div>
                      <div className="text-sm text-secondary-400">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20">
        <div className="absolute inset-0 gradient-hero" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.1)_0%,transparent_70%)]" />
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to Transform Your{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-blue-400">
              Contract Management
            </span>
            ?
          </h2>
          <p className="text-lg text-secondary-300 mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who trust AI Contract IQ for their contract analysis needs.
          </p>
          <Link to="/register">
            <Button variant="primary" size="xl" icon={HiArrowRight} iconPosition="right">
              Get Started Free
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;

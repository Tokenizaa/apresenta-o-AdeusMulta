import React from 'react';
import {
  HelpCircle,
  Scale,
  Compass,
  FileSearch,
  Cpu,
  FileText,
  Sparkles,
  Database,
  GitMerge,
  History,
  ShieldAlert,
  Layers,
  BookOpen,
  FileCheck,
  Workflow,
  ShieldCheck,
  Users,
  TrendingUp,
  Building2,
  DollarSign,
  Target,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  ArrowRight,
  Sparkle
} from 'lucide-react';

interface DynamicIconProps {
  name?: string;
  className?: string;
  size?: number;
}

export const DynamicIcon: React.FC<DynamicIconProps> = ({ name, className = 'w-5 h-5', size = 20 }) => {
  switch (name) {
    case 'HelpCircle':
      return <HelpCircle className={className} size={size} />;
    case 'Scale':
      return <Scale className={className} size={size} />;
    case 'Compass':
      return <Compass className={className} size={size} />;
    case 'FileSearch':
      return <FileSearch className={className} size={size} />;
    case 'Cpu':
      return <Cpu className={className} size={size} />;
    case 'FileText':
      return <FileText className={className} size={size} />;
    case 'Sparkles':
      return <Sparkles className={className} size={size} />;
    case 'Database':
      return <Database className={className} size={size} />;
    case 'GitMerge':
      return <GitMerge className={className} size={size} />;
    case 'History':
      return <History className={className} size={size} />;
    case 'ShieldAlert':
      return <ShieldAlert className={className} size={size} />;
    case 'Layers':
      return <Layers className={className} size={size} />;
    case 'BookOpen':
      return <BookOpen className={className} size={size} />;
    case 'FileCheck':
      return <FileCheck className={className} size={size} />;
    case 'Workflow':
      return <Workflow className={className} size={size} />;
    case 'ShieldCheck':
      return <ShieldCheck className={className} size={size} />;
    case 'Users':
      return <Users className={className} size={size} />;
    case 'TrendingUp':
      return <TrendingUp className={className} size={size} />;
    case 'Building2':
      return <Building2 className={className} size={size} />;
    case 'DollarSign':
      return <DollarSign className={className} size={size} />;
    case 'Target':
      return <Target className={className} size={size} />;
    case 'CheckCircle2':
      return <CheckCircle2 className={className} size={size} />;
    case 'AlertTriangle':
      return <AlertTriangle className={className} size={size} />;
    case 'Lightbulb':
      return <Lightbulb className={className} size={size} />;
    case 'ArrowRight':
      return <ArrowRight className={className} size={size} />;
    case 'Sparkle':
      return <Sparkle className={className} size={size} />;
    default:
      return <Sparkles className={className} size={size} />;
  }
};

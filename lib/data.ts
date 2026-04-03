/**
 * Data loading and filtering utilities for the CACI demo application
 */

import type { Tool, UsageMetric, Integration, ComplianceCertification, OperatorCommand } from '@/types/data';

// Import mock data
import toolsData from '@/data/tools.json';
import usageData from '@/data/usage.json';
import integrationsData from '@/data/integrations.json';
import complianceData from '@/data/compliance.json';
import commandsData from '@/data/commands.json';

// Type-safe data access
export function getTools(): Tool[] {
  return toolsData as Tool[];
}

export function getUsageMetrics(): UsageMetric[] {
  return usageData as UsageMetric[];
}

export function getIntegrations(): Integration[] {
  return integrationsData as Integration[];
}

export function getComplianceCertifications(): ComplianceCertification[] {
  return complianceData as ComplianceCertification[];
}

export function getOperatorCommands(): OperatorCommand[] {
  return commandsData as OperatorCommand[];
}

// Tool queries
export function getToolById(id: string): Tool | undefined {
  return getTools().find(tool => tool.id === id);
}

export function getToolsByCategory(category: string): Tool[] {
  return getTools().filter(tool => tool.category === category);
}

export function getToolsByDepartment(department: string): Tool[] {
  return getTools().filter(tool => tool.department === department);
}

export function getToolsByFedRAMPStatus(status: string): Tool[] {
  return getTools().filter(tool => tool.fedrampStatus === status);
}

export function searchTools(query: string): Tool[] {
  const lowerQuery = query.toLowerCase();
  return getTools().filter(tool =>
    tool.name.toLowerCase().includes(lowerQuery) ||
    tool.vendor.toLowerCase().includes(lowerQuery) ||
    tool.category.toLowerCase().includes(lowerQuery) ||
    tool.department.toLowerCase().includes(lowerQuery)
  );
}

// Usage queries
export function getUsageByToolId(toolId: string): UsageMetric[] {
  return getUsageMetrics().filter(usage => usage.toolId === toolId);
}

export function getUsageByPeriod(period: string): UsageMetric[] {
  return getUsageMetrics().filter(usage => usage.period === period);
}

export function getLatestUsageByTool(toolId: string): UsageMetric | undefined {
  const usage = getUsageByToolId(toolId);
  return usage.sort((a, b) => b.period.localeCompare(a.period))[0];
}

// Integration queries
export function getIntegrationById(id: string): Integration | undefined {
  return getIntegrations().find(integration => integration.id === id);
}

export function getIntegrationsByTool(toolId: string): Integration[] {
  return getIntegrations().filter(
    integration => integration.sourceToolId === toolId || integration.targetToolId === toolId
  );
}

export function getIntegrationsByStatus(status: string): Integration[] {
  return getIntegrations().filter(integration => integration.status === status);
}

// Aggregation functions
export function calculateTotalSpend(): number {
  return getTools().reduce((total, tool) => {
    if (tool.licenseModel === 'enterprise') {
      return total + (tool.pricePerUnit / 12); // Convert annual to monthly
    }
    if (tool.pricingUnit.includes('year')) {
      return total + (tool.pricePerUnit * tool.assignedLicenses / 12);
    }
    return total + (tool.pricePerUnit * tool.assignedLicenses);
  }, 0);
}

export function calculateSpendByCategory(): Record<string, number> {
  const result: Record<string, number> = {};
  getTools().forEach(tool => {
    const monthlySpend = calculateToolMonthlySpend(tool);
    result[tool.category] = (result[tool.category] || 0) + monthlySpend;
  });
  return result;
}

export function calculateToolMonthlySpend(tool: Tool): number {
  if (tool.licenseModel === 'enterprise') {
    return tool.pricePerUnit / 12;
  }
  if (tool.pricingUnit.includes('year')) {
    return (tool.pricePerUnit * tool.assignedLicenses) / 12;
  }
  // For consumption-based, estimate based on typical usage
  if (tool.licenseModel === 'consumption') {
    // Rough estimate: assume 1000 GB/month average for consumption tools
    return tool.pricePerUnit * 1000;
  }
  return tool.pricePerUnit * tool.assignedLicenses;
}

export function calculateTotalLicenses(): { total: number; assigned: number; unused: number } {
  let total = 0;
  let assigned = 0;
  getTools().forEach(tool => {
    if (tool.licenseModel !== 'consumption' && tool.licenseModel !== 'enterprise') {
      total += tool.totalLicenses;
      assigned += tool.assignedLicenses;
    }
  });
  return { total, assigned, unused: total - assigned };
}

export function calculateOverallUtilization(): number {
  const { total, assigned } = calculateTotalLicenses();
  return total > 0 ? (assigned / total) * 100 : 0;
}

export function calculateFedRAMPCoverage(): { authorized: number; inProcess: number; notApplicable: number; total: number } {
  const tools = getTools();
  return {
    authorized: tools.filter(t => t.fedrampStatus === 'authorized').length,
    inProcess: tools.filter(t => t.fedrampStatus === 'in_process').length,
    notApplicable: tools.filter(t => t.fedrampStatus === 'not_applicable').length,
    total: tools.length,
  };
}

export function calculateComplianceScore(): number {
  const tools = getTools();
  const weights = {
    fedramp: 40,
    soc2: 25,
    sso: 15,
    mfa: 20,
  };
  
  const fedrampScore = tools.filter(t => t.fedrampStatus === 'authorized').length / tools.length * weights.fedramp;
  const soc2Score = tools.filter(t => t.certifications.some(c => c.includes('SOC 2'))).length / tools.length * weights.soc2;
  const ssoScore = tools.filter(t => t.ssoEnabled).length / tools.length * weights.sso;
  const mfaScore = tools.filter(t => t.mfaRequired).length / tools.length * weights.mfa;
  
  return Math.round(fedrampScore + soc2Score + ssoScore + mfaScore);
}

export function calculateIntegrationHealth(): { avgHealth: number; avgLatency: number; avgErrorRate: number } {
  const integrations = getIntegrations();
  if (integrations.length === 0) {
    return { avgHealth: 0, avgLatency: 0, avgErrorRate: 0 };
  }
  
  return {
    avgHealth: integrations.reduce((sum, i) => sum + i.healthScore, 0) / integrations.length,
    avgLatency: integrations.reduce((sum, i) => sum + i.avgLatencyMs, 0) / integrations.length,
    avgErrorRate: integrations.reduce((sum, i) => sum + i.errorRate, 0) / integrations.length,
  };
}

// Get unique values for filters
export function getUniqueCategories(): string[] {
  return [...new Set(getTools().map(t => t.category))];
}

export function getUniqueDepartments(): string[] {
  return [...new Set(getTools().map(t => t.department))];
}

export function getUniqueVendors(): string[] {
  return [...new Set(getTools().map(t => t.vendor))];
}

// Get tools with issues
export function getLowUtilizationTools(threshold = 50): Tool[] {
  return getTools().filter(tool => {
    if (tool.licenseModel === 'consumption' || tool.licenseModel === 'enterprise') return false;
    const utilization = (tool.assignedLicenses / tool.totalLicenses) * 100;
    return utilization < threshold;
  });
}

export function getExpiringContracts(daysThreshold = 90): Tool[] {
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() + daysThreshold);
  
  return getTools().filter(tool => {
    const endDate = new Date(tool.contractEndDate);
    return endDate <= cutoffDate;
  });
}

export function getNonCompliantTools(): Tool[] {
  return getTools().filter(tool => 
    tool.fedrampStatus !== 'authorized' && 
    tool.dataClassification !== 'Public'
  );
}

// Portfolio summary
export interface PortfolioSummary {
  totalTools: number;
  totalMonthlySpend: number;
  totalLicenses: number;
  assignedLicenses: number;
  overallUtilization: number;
  complianceScore: number;
  fedrampCoverage: number;
  integrationHealth: number;
  categories: Record<string, { count: number; spend: number }>;
}

export function getPortfolioSummary(): PortfolioSummary {
  const tools = getTools();
  const { total, assigned } = calculateTotalLicenses();
  const fedramp = calculateFedRAMPCoverage();
  const health = calculateIntegrationHealth();
  const spendByCategory = calculateSpendByCategory();
  
  const categories: Record<string, { count: number; spend: number }> = {};
  tools.forEach(tool => {
    if (!categories[tool.category]) {
      categories[tool.category] = { count: 0, spend: 0 };
    }
    categories[tool.category].count++;
    categories[tool.category].spend = spendByCategory[tool.category] || 0;
  });
  
  return {
    totalTools: tools.length,
    totalMonthlySpend: calculateTotalSpend(),
    totalLicenses: total,
    assignedLicenses: assigned,
    overallUtilization: calculateOverallUtilization(),
    complianceScore: calculateComplianceScore(),
    fedrampCoverage: (fedramp.authorized / fedramp.total) * 100,
    integrationHealth: health.avgHealth,
    categories,
  };
}

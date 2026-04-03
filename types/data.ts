/**
 * TypeScript interfaces for CACI demo data
 */

export type ToolCategory = 'AI/ML' | 'Analytics' | 'Automation' | 'Collaboration' | 'Security' | 'Developer';

export type LicenseModel = 'per_user' | 'per_seat' | 'per_endpoint' | 'per_robot' | 'enterprise' | 'consumption';

export type PricingUnit = 'user/month' | 'seat/month' | 'endpoint/year' | 'robot/month' | 'flat/annual' | 'GB/month';

export type FedRAMPStatus = 'authorized' | 'in_process' | 'ready' | 'not_applicable' | 'unknown';

export type DataClassification = 'Public' | 'CUI' | 'FOUO' | 'Secret' | 'Top Secret';

export type DeploymentType = 'SaaS' | 'PaaS' | 'IaaS' | 'On-Premise' | 'Hybrid' | 'GovCloud';

export type TrendDirection = 'increasing' | 'stable' | 'decreasing';

export type IntegrationType = 'api' | 'webhook' | 'native' | 'custom' | 'file_transfer' | 'database';

export type Protocol = 'REST' | 'GraphQL' | 'SOAP' | 'gRPC' | 'SFTP' | 'JDBC' | 'SAML';

export type AuthMethod = 'OAuth2' | 'API Key' | 'Basic Auth' | 'SAML' | 'mTLS' | 'JWT';

export type DataDirection = 'source' | 'target' | 'bidirectional';

export type SyncFrequency = 'realtime' | 'hourly' | 'daily' | 'weekly' | 'on_demand';

export type IntegrationStatus = 'active' | 'degraded' | 'failed' | 'maintenance' | 'disabled';

export interface Tool {
  id: string;
  name: string;
  vendor: string;
  category: ToolCategory;
  subcategory: string;
  licenseModel: LicenseModel;
  pricePerUnit: number;
  pricingUnit: PricingUnit;
  contractStartDate: string;
  contractEndDate: string;
  totalLicenses: number;
  assignedLicenses: number;
  certifications: string[];
  dataClassification: DataClassification;
  fedrampStatus: FedRAMPStatus;
  deploymentType: DeploymentType;
  ssoEnabled: boolean;
  apiAvailable: boolean;
  mfaRequired: boolean;
  department: string;
  businessOwner: string;
  technicalOwner: string;
  lastReviewed: string;
  riskScore: number;
}

export interface UsageMetric {
  id: string;
  toolId: string;
  period: string;
  licensedUsers: number;
  activeUsers: number;
  heavyUsers: number;
  lightUsers: number;
  inactiveUsers: number;
  totalSessions: number;
  totalMinutes: number;
  avgSessionMinutes: number;
  peakConcurrentUsers: number;
  featuresUsed: string[];
  apiCallsCount: number;
  integrationsActiveCount: number;
  monthlyCost: number;
  costPerActiveUser: number;
  utilizationRate: number;
  adoptionTrend: TrendDirection;
  complianceViolations: number;
  lastAuditDate: string;
}

export interface Integration {
  id: string;
  name: string;
  sourceToolId: string;
  targetToolId: string;
  integrationType: IntegrationType;
  protocol: Protocol;
  authMethod: AuthMethod;
  endpoint: string;
  dataDirection: DataDirection;
  dataTypes: string[];
  syncFrequency: SyncFrequency;
  lastSyncTime: string;
  status: IntegrationStatus;
  healthScore: number;
  errorRate: number;
  avgLatencyMs: number;
  dataClassification: DataClassification;
  encryptionInTransit: boolean;
  encryptionAtRest: boolean;
  auditLogging: boolean;
  owner: string;
  lastReviewDate: string;
}

export interface ComplianceCertification {
  certificationId: string;
  name: string;
  shortCode: string;
  category: 'federal' | 'security' | 'privacy' | 'industry';
  description: string;
  auditFrequency: 'continuous' | 'annual' | 'biennial' | 'triennial';
  criticalityLevel: 'required' | 'recommended' | 'optional';
  applicableCategories: ToolCategory[];
  controls?: number;
  requiredForDataTypes?: string[];
}

export interface CommandEntity {
  name: string;
  type: string;
  required: boolean;
  examples: string[];
}

export interface OperatorCommand {
  id: string;
  category: string;
  naturalLanguage: string;
  intent: string;
  entities: CommandEntity[];
  expectedResponse: string;
  toolsInvolved: string[];
  permissions: string[];
}

// Aggregate types
export interface CategorySummary {
  category: ToolCategory;
  toolCount: number;
  monthlySpend: number;
  utilizationRate: number;
  riskScore: number;
}

export interface PortfolioMetrics {
  totalTools: number;
  totalMonthlySpend: number;
  totalLicenses: number;
  totalActiveUsers: number;
  overallUtilizationRate: number;
  unusedLicenseValue: number;
  shadowITRisk: 'low' | 'medium' | 'high';
  complianceScore: number;
}

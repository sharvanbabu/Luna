export type Employee = {
  id: string;
  name: string;
  email: string;
  status: "connected" | "pending";
  department: "Engineering" | "Product" | "Sales" | "Design" | "Operations";
  // Luna metrics (Extended)
  avgSleepScore: number;
  avgSleepHours: number;
  recoveryPercentage: number;
  circadianAlignment: number; // 0-100
  // Jira metrics (Burnout Indicators)
  sprintPointsTotal: number;
  sprintPointsDone: number;
  daysRemaining: number;
  uniqueTicketsTouched24h: number; // Context Switching factor
  afterHoursSignals: number; // Number of late night interactions
  overdueTasks: number;
};

// Burnout Engine: Correlates Jira Overload with Luna's Recovery Data
// Identifies "High Risk" where High Workload meets Low Recovery
export const calculateAdvancedStressFactors = (emp: Employee) => {
  if (emp.status === "pending") return { workloadStress: 0, recoveryDebt: 0, totalBurnoutRisk: 0 };

  // 1. Workload Stress (Jira)
  // 35% Sprint Density
  const sprintDensity = emp.daysRemaining > 0 ? (emp.sprintPointsTotal - emp.sprintPointsDone) / emp.daysRemaining : 0;
  const sprintStress = Math.min(35, sprintDensity * 5); // 7 pts/day = max stress

  // 35% Context Switching (Unique tickets touched)
  const contextSwitchingStress = Math.min(35, emp.uniqueTicketsTouched24h * 3.5); // 10 tickets = max stress

  // 30% Overtime Signals (After 7 PM interactions)
  const overtimeStress = Math.min(30, emp.afterHoursSignals * 6); // 5 late nights = max stress

  const workloadStress = Math.round(sprintStress + contextSwitchingStress + overtimeStress);

  // 2. Recovery Debt (Luna)
  // Low recovery percentage and low sleep score increase debt
  const recoveryDebt = Math.round(
    (100 - emp.recoveryPercentage) * 0.4 + 
    (100 - emp.avgSleepScore) * 0.4 + 
    (100 - emp.circadianAlignment) * 0.2
  );

  // 3. Correlation: Burnout Risk
  // Risk is highest when Workload is High AND Recovery is Low
  const totalBurnoutRisk = Math.round((workloadStress * 0.6) + (recoveryDebt * 0.4));

  return { workloadStress, recoveryDebt, totalBurnoutRisk };
};

export const getBurnoutStatus = (riskScore: number) => {
  if (riskScore < 40) return { label: "Stable", color: "text-emerald-400", bg: "bg-emerald-400/10", icon: "Check" };
  if (riskScore < 75) return { label: "Warning", color: "text-amber-400", bg: "bg-amber-400/10", icon: "AlertTriangle" };
  return { label: "Burnout Alert", color: "text-red-400", bg: "bg-red-400/10", icon: "Flame" };
};

export const mockEmployees: Employee[] = [
  {
    id: "e1",
    name: "Alex Mercer",
    email: "alex@company.com",
    status: "connected",
    department: "Engineering",
    avgSleepScore: 62,
    avgSleepHours: 5.5,
    recoveryPercentage: 45,
    circadianAlignment: 70,
    sprintPointsTotal: 40,
    sprintPointsDone: 10,
    daysRemaining: 4,
    uniqueTicketsTouched24h: 8,
    afterHoursSignals: 4,
    overdueTasks: 8
  },
  {
    id: "e2",
    name: "Sarah Chen",
    email: "schen@company.com",
    status: "connected",
    department: "Design",
    avgSleepScore: 88,
    avgSleepHours: 7.5,
    recoveryPercentage: 92,
    circadianAlignment: 95,
    sprintPointsTotal: 20,
    sprintPointsDone: 18,
    daysRemaining: 10,
    uniqueTicketsTouched24h: 2,
    afterHoursSignals: 0,
    overdueTasks: 1
  },
  {
    id: "e3",
    name: "Jordan Hayes",
    email: "jordan@company.com",
    status: "connected",
    department: "Engineering",
    avgSleepScore: 45,
    avgSleepHours: 4.2,
    recoveryPercentage: 30,
    circadianAlignment: 40,
    sprintPointsTotal: 55,
    sprintPointsDone: 5,
    daysRemaining: 3,
    uniqueTicketsTouched24h: 12,
    afterHoursSignals: 6,
    overdueTasks: 15
  },
  {
    id: "e4",
    name: "Emily Torres",
    email: "emily@company.com",
    status: "pending",
    department: "Product",
    avgSleepScore: 0,
    avgSleepHours: 0,
    recoveryPercentage: 0,
    circadianAlignment: 0,
    sprintPointsTotal: 0,
    sprintPointsDone: 0,
    daysRemaining: 0,
    uniqueTicketsTouched24h: 0,
    afterHoursSignals: 0,
    overdueTasks: 0
  },
  {
    id: "e5",
    name: "Michael Ross",
    email: "mross@company.com",
    status: "connected",
    department: "Sales",
    avgSleepScore: 78,
    avgSleepHours: 6.8,
    recoveryPercentage: 75,
    circadianAlignment: 82,
    sprintPointsTotal: 15,
    sprintPointsDone: 12,
    daysRemaining: 5,
    uniqueTicketsTouched24h: 4,
    afterHoursSignals: 1,
    overdueTasks: 0
  }
];

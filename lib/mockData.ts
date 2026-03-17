export type Employee = {
  id: string;
  name: string;
  email: string;
  status: "connected" | "pending";
  // Luna metrics
  avgSleepScore: number;
  avgSleepHours: number;
  // Jira metrics
  tasksAssigned: number;
  tasksCompleted: number;
  overdueTasks: number;
};

// Formula: (Sleep Deficit Weight + Workload Pressure + Overdue Impact)
// Adjusted for 0-100 scale, higher is worse stress.
export const calculateStressScore = (emp: Employee): number => {
  if (emp.status === "pending") return 0;
  
  // Sleep deficit impact (Max 40 points)
  // Ideal sleep score is ~95. Below 60 gives max stress points.
  const sleepDeficit = Math.max(0, 95 - emp.avgSleepScore);
  const sleepImpact = Math.min(40, sleepDeficit * 1.5);
  
  // Workload pressure impact (Max 30 points)
  // 0% completion rate gives max 30 points.
  const completionRate = emp.tasksAssigned > 0 ? (emp.tasksCompleted / emp.tasksAssigned) : 1;
  const workloadImpact = Math.max(0, 30 * (1 - completionRate));
  
  // Overdue impact (Max 30 points)
  // 10+ overdue tasks gives max 30 points.
  const overdueImpact = Math.min(30, emp.overdueTasks * 3);
  
  const totalRawStress = sleepImpact + workloadImpact + overdueImpact;
  return Math.min(100, Math.round(totalRawStress));
};

export const getStressLevel = (score: number) => {
  if (score < 30) return { label: "Optimal", color: "text-emerald-400", bg: "bg-emerald-400/10" };
  if (score < 65) return { label: "Elevated", color: "text-amber-400", bg: "bg-amber-400/10" };
  return { label: "High Risk", color: "text-red-400", bg: "bg-red-400/10" };
};

export const mockEmployees: Employee[] = [
  {
    id: "e1",
    name: "Alex Mercer",
    email: "alex@company.com",
    status: "connected",
    avgSleepScore: 62,
    avgSleepHours: 5.5,
    tasksAssigned: 45,
    tasksCompleted: 30,
    overdueTasks: 8,
  },
  {
    id: "e2",
    name: "Sarah Chen",
    email: "schen@company.com",
    status: "connected",
    avgSleepScore: 88,
    avgSleepHours: 7.5,
    tasksAssigned: 25,
    tasksCompleted: 22,
    overdueTasks: 1,
  },
  {
    id: "e3",
    name: "Jordan Hayes",
    email: "jordan@company.com",
    status: "connected",
    avgSleepScore: 45,
    avgSleepHours: 4.2,
    tasksAssigned: 60,
    tasksCompleted: 20,
    overdueTasks: 15,
  },
  {
    id: "e4",
    name: "Emily Torres",
    email: "emily@company.com",
    status: "pending",
    avgSleepScore: 0,
    avgSleepHours: 0,
    tasksAssigned: 0,
    tasksCompleted: 0,
    overdueTasks: 0,
  }
];

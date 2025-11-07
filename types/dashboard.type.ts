export type DashboardSummaryResponse = {
  totalRevenue: number;
  totalSessions: number;
  totalOrders: number;
  tablesPlaying: number;
  tablesAvailable: number;
  topMenuItems: topMenuItem[];
};

export type topMenuItem = {
  id: number;
  name: string;
  totalQuantity: number;
  totalRevenue: number;
};

export type DashboardChartResponse = {
  date: string;
  revenue: number;
};

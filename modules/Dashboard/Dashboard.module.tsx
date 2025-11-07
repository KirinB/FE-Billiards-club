import DashboardChart from "@/components/Dashboard/DashboardChart";
import DashboardSummary from "@/components/Dashboard/DashboardSummary";

const DashboardModule = () => {
  return (
    <div className="flex flex-col gap-10 p-6">
      <DashboardSummary />
      <DashboardChart />
    </div>
  );
};

export default DashboardModule;

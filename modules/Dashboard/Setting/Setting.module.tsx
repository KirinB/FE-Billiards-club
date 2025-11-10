import StoreInfo from "@/components/Dashboard/Setting/StoreInfo";
import { ThemeSwitch } from "@/components/Dashboard/Setting/ThemeSwitch";

const SettingModule = () => {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Cài đặt tổng quát</h1>
      <StoreInfo />
      <div className="rounded-2xl border p-4 bg-background shadow">
        <h2 className="text-lg font-medium mb-2">Theme</h2>
        <ThemeSwitch />
      </div>
    </div>
  );
};

export default SettingModule;

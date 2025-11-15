import { ThemeSwitch } from "@/components/Dashboard/Setting/ThemeSwitch";
import React from "react";

const SettingAppModule = () => {
  return (
    <div className="p-6 space-y-6">
      <div className="rounded-2xl border p-4 bg-background shadow">
        <h2 className="text-lg font-medium mb-2">Theme</h2>
        <ThemeSwitch />
      </div>
    </div>
  );
};

export default SettingAppModule;

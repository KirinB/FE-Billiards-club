"use client";

import { useEffect, useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export function ThemeSwitch() {
  const [isDark, setIsDark] = useState(false);

  // Khi load lại trang, kiểm tra localStorage
  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    }
  }, []);

  // Khi toggle switch
  const handleThemeChange = (checked: boolean) => {
    setIsDark(checked);
    if (checked) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Label htmlFor="theme-switch">Dark Mode</Label>
      <Switch
        id="theme-switch"
        checked={isDark}
        onCheckedChange={handleThemeChange}
      />
    </div>
  );
}

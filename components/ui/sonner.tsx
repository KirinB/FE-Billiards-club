"use client";

import { Toaster as Sonner, toast, type ToasterProps } from "sonner";
import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from "lucide-react";
import { useTheme } from "next-themes";
import * as React from "react";

export const Toaster = (props: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      // Giữ nguyên màu icon
      icons={{
        success: <CircleCheckIcon className="w-4 h-4 text-green-600" />,
        info: <InfoIcon className="w-4 h-4 text-blue-600" />,
        warning: <TriangleAlertIcon className="w-4 h-4 text-yellow-600" />,
        error: <OctagonXIcon className="w-4 h-4 text-red-600" />,
        loading: <Loader2Icon className="w-4 h-4 animate-spin text-gray-600" />,
      }}
      toastOptions={{
        className: "rounded-lg font-medium shadow-lg text-sm",
        duration: 4000,

        classNames: {
          toast: "border-2",
          success: "!bg-green-50/90 !border-green-500 !text-green-800",
          error: "!bg-red-50/90 !border-red-500 !text-red-800",
          info: "!bg-blue-50/90 !border-blue-500 !text-blue-800",
          warning: "!bg-yellow-50/90 !border-yellow-500 !text-yellow-800",
          title: "font-semibold",
          description: "opacity-90",
        },
      }}
      {...props}
    />
  );
};

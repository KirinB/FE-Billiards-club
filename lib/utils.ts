import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

const REMOVE_LEADING_SLASH_REGEX = /^0\d+/;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Remove Leading zero from number value
export const removeLeadingZero = (value: string) => {
  if (!value) return 0;
  if (isNaN(Number(value))) return value;
  if (REMOVE_LEADING_SLASH_REGEX.test(value)) {
    return Number(value.replace(/^0+/, ""));
  }
  // Allow user to input (.) character when they are trying to enter a decimal number
  if (value.toString().endsWith(".")) return value;

  return Number(value);
};

export const formatCurrencyVND = (value: number) => {
  return value.toLocaleString("vi-VN") + "₫";
};

export const formatDateVn = (value: string) => {
  return new Date(value).toLocaleDateString("vi-VN");
};

export function formatHoursPlayed(hours: number) {
  const totalSeconds = Math.floor(hours * 3600); // giờ -> giây
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;

  if (h > 0) {
    return `${h} giờ ${m} phút ${s} giây`;
  } else if (m > 0) {
    return `${m} phút ${s} giây`;
  } else {
    return `${s} giây`;
  }
}

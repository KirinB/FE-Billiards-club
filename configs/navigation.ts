import {
  SquareTerminal,
  UserCog2,
  BookOpen,
  Settings2,
  Columns3,
  LayoutDashboardIcon,
} from "lucide-react";

export const NAV_CONFIG = {
  navMain: [
    {
      title: "Bàn bida",
      icon: SquareTerminal,
      url: "/dashboard/tables",
      items: [{ title: "Quản lý bàn", url: "/dashboard/tables" }],
    },
    {
      title: "Nhân viên",
      icon: UserCog2,
      url: "/dashboard/staff",
      items: [{ title: "Quản lý nhân viên", url: "/dashboard/staff" }],
    },
    {
      title: "Thực đơn",
      icon: BookOpen,
      url: "/dashboard/menu",
      items: [
        { title: "Quản lý thực đơn", url: "/dashboard/menu" },
        { title: "Quản lý danh mục món ăn", url: "/dashboard/category" },
        { title: "Quản lý món ăn", url: "/dashboard/menu-item" },
      ],
    },
    {
      title: "Cài đặt app",
      icon: Settings2,
      url: "/dashboard/settings",
      items: [{ title: "Tổng quan", url: "/dashboard/settings" }],
    },
  ],
  projects: [
    {
      name: "POS",
      url: "/pos",
      icon: Columns3,
    },
    {
      name: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboardIcon,
    },
  ],
};

import {
  SquareTerminal,
  UserCog2,
  BookOpen,
  Settings2,
  Columns3,
  LayoutDashboardIcon,
  Receipt,
  UserCheck2Icon,
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
      title: "Hóa đơn",
      icon: Receipt,
      url: "/dashboard/bill",
      items: [{ title: "Quản lý hóa đơn", url: "/dashboard/bill" }],
    },
    {
      title: "Thành viên",
      icon: UserCheck2Icon,
      url: "/dashboard/member",
      items: [
        { title: "Quản lý thành viên", url: "/dashboard/member" },
        { title: "Quản lý điểm", url: "/dashboard/point" },
      ],
    },
    {
      title: "Cài đặt",
      icon: Settings2,
      url: "/dashboard/setting",
      items: [
        { title: "Cài đặt app", url: "/dashboard/setting/app" },
        { title: "Cài đặt quán", url: "/dashboard/setting/store" },
      ],
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

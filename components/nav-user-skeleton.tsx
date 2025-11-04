"use client";

import { ChevronsUpDown } from "lucide-react";

import { Skeleton } from "@/components/ui/skeleton";
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";

export function NavUserSkeleton() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton size="lg">
          {/* Vị trí Avatar */}
          <Skeleton className="h-8 w-8 rounded-lg" />

          <div className="grid flex-1 text-left text-sm leading-tight">
            {/* Vị trí Tên người dùng */}
            <Skeleton className="h-4 w-32" />
            {/* Vị trí Email */}
            <Skeleton className="h-3 w-40" />
          </div>

          {/* Vị trí Icon ChevronsUpDown */}
          <ChevronsUpDown className="ml-auto size-4 text-transparent" />
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

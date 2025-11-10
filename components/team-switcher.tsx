"use client";

import * as React from "react";
import Image, { StaticImageData } from "next/image";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export type Team = {
  name: string;
  logo?: string | StaticImageData | null;
  plan: string;
};

type TeamSwitcherProps = {
  teams: Team[];
  fallbackLogo?: StaticImageData;
};

export function TeamSwitcher({ teams, fallbackLogo }: TeamSwitcherProps) {
  // Không dùng useState cố định, lấy team đầu tiên trực tiếp hoặc undefined
  const activeTeam = teams.length > 0 ? teams[0] : undefined;

  if (!activeTeam) return null;

  const logoToShow =
    typeof activeTeam.logo === "string"
      ? activeTeam.logo
      : activeTeam.logo || fallbackLogo;

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton size="lg">
              <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square w-8 h-8 items-center justify-center rounded-lg">
                {logoToShow ? (
                  <Image
                    src={logoToShow}
                    alt={`${activeTeam.name} logo`}
                    width={32}
                    height={32}
                    className="object-cover rounded"
                  />
                ) : (
                  <div className="w-8 h-8 bg-gray-300 rounded" />
                )}
              </div>
              <div className="ml-2 grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{activeTeam.name}</span>
                <span className="truncate text-xs">{activeTeam.plan}</span>
              </div>
            </SidebarMenuButton>
          </DropdownMenuTrigger>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

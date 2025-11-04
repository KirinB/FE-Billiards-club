"use client";

import * as React from "react";

import logo from "@/assets/images/logo.png";
import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

import { NAV_CONFIG } from "@/configs/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/stores";
import { NavUserSkeleton } from "./nav-user-skeleton";
import { useIsClient } from "@/hooks/use-is-client";

// This is data.
const data = {
  teams: [
    {
      name: "Kirin",
      logo: logo,
      plan: "Billiards",
    },
  ],
  ...NAV_CONFIG,
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const isClient = useIsClient();
  const { user } = useSelector((state: RootState) => state.auth);
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavProjects projects={data.projects} />
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        {isClient ? (
          <NavUser user={{ ...user!, avatar: "123.jpg" }} />
        ) : (
          <NavUserSkeleton />
        )}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

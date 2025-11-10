"use client";

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
import { useIsClient } from "@/hooks/use-is-client";
import { AppDispatch, RootState } from "@/stores";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavUserSkeleton } from "./nav-user-skeleton";
import { fetchStoreInfo } from "@/stores/storeInfoSlice";

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  const storeInfo = useSelector((state: RootState) => state.storeInfo);
  const { user } = useSelector((state: RootState) => state.auth);
  const isClient = useIsClient();
  const dispatch = useDispatch<AppDispatch>();

  React.useEffect(() => {
    const loadStoreInfo = async () => {
      try {
        const result = await dispatch(fetchStoreInfo()).unwrap();
        console.log("Fetched store info:", result);
      } catch (err) {
        console.error(err);
      }
    };

    loadStoreInfo();
  }, [dispatch]);

  const teams = [
    {
      name: storeInfo.name || "Quán của bạn",
      logo: storeInfo.logo,
      plan: "Billiards",
    },
  ];

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavProjects projects={NAV_CONFIG.projects} />
        <NavMain items={NAV_CONFIG.navMain} />
      </SidebarContent>
      <SidebarFooter>
        {isClient ? (
          <NavUser user={{ ...user!, avatar: "" }} />
        ) : (
          <NavUserSkeleton />
        )}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

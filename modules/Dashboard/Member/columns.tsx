"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { useState } from "react";
import { Member } from "@/types/member.type";
import { Badge } from "@/components/ui/badge";
import DialogUpdateMember from "@/components/Dashboard/Member/DialogUpdateMember";
import DialogDeleteMember from "@/components/Dashboard/Member/DialogDeleteMember";
import { formatDateVn } from "@/lib/utils";

type ActionType = "UPDATE" | "DELETE" | null;

export const useMemberColumns = (onSuccess: () => void) => {
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [openAction, setOpenAction] = useState<ActionType>(null);

  const closeDialog = () => {
    setOpenAction(null);
    setSelectedMember(null);
  };

  const columns: ColumnDef<Member>[] = [
    { accessorKey: "id", header: "ID" },
    {
      accessorKey: "name",
      header: "Tên",
      cell: ({ row }) => {
        const value = row.getValue("name");
        return value ? value : "Chưa được khai báo";
      },
    },
    { accessorKey: "phone", header: "SĐT" },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => {
        const value = row.getValue("email");
        return value ? value : "Chưa được khai báo";
      },
    },
    { accessorKey: "totalPoints", header: "Điểm" },
    // {
    //   accessorKey: "level",
    //   header: "Level",
    //   cell: ({ row }) => {
    //     const level = row.getValue("level") as string;

    //     const colorMap = {
    //       BRONZE: "secondary",
    //       SILVER: "active",
    //       GOLD: "destructive",
    //       DIAMOND: "default",
    //     } as const;

    //     return { level };
    //   },
    // },
    {
      accessorKey: "createdAt",
      header: "Ngày tạo",
      cell: ({ row }) => formatDateVn(row.getValue("createdAt")),
    },
    {
      id: "actions",
      header: "Hành động",
      cell: ({ row }) => {
        const member = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>

              {/* update */}
              <DropdownMenuItem
                onClick={() => {
                  setSelectedMember(member);
                  setOpenAction("UPDATE");
                }}
              >
                Cập nhật
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              {/* delete */}
              <DropdownMenuItem
                className="text-red-500"
                onClick={() => {
                  setSelectedMember(member);
                  setOpenAction("DELETE");
                }}
              >
                Xóa
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const Dialogs = selectedMember ? (
    <>
      <DialogUpdateMember
        member={selectedMember}
        isOpen={openAction === "UPDATE"}
        setIsOpen={(open) => !open && closeDialog()}
        onSuccess={() => {
          closeDialog();
          onSuccess();
        }}
      />

      <DialogDeleteMember
        member={selectedMember}
        isOpen={openAction === "DELETE"}
        setIsOpen={(open) => !open && closeDialog()}
        onSuccess={() => {
          closeDialog();
          onSuccess();
        }}
      />
    </>
  ) : null;

  return { columns, Dialogs };
};

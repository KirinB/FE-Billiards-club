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
import { PointHistory, PointTypeDB } from "@/types/pointHistory.type";
import DialogUpdatePoint from "@/components/Dashboard/PointHistory/DialogUpdatePoint";
import DialogDeletePoint from "@/components/Dashboard/PointHistory/DialogDeletePoint";
import { formatDateVn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { User } from "@/types/user.type";

type ActionType = "UPDATE" | "DELETE" | null;

export const usePointColumns = (onSuccess: () => void) => {
  const [selectedPoint, setSelectedPoint] = useState<PointHistory | null>(null);
  const [openAction, setOpenAction] = useState<ActionType>(null);

  const closeDialog = () => {
    setOpenAction(null);
    setSelectedPoint(null);
  };

  const columns: ColumnDef<PointHistory>[] = [
    { accessorKey: "id", header: "ID" },
    { accessorKey: "member.name", header: "Tên thành viên" },
    {
      accessorKey: "type",
      header: "Loại",
      cell: ({ row }) => {
        const type = row.getValue("type") as string;
        let variant: "default" | "secondary" | "active" | "destructive" =
          "secondary";
        let text = type;

        switch (type) {
          case "EARN":
            variant = "active";
            text = "Tích điểm";
            break;
          case "REDEEM":
            variant = "destructive";
            text = "Đổi điểm";
            break;
          case "ADJUST":
            variant = "secondary";
            text = "Điều chỉnh";
            break;
        }

        return (
          <Badge variant={variant} className="capitalize">
            {text}
          </Badge>
        );
      },
    },
    { accessorKey: "points", header: "Điểm" },
    { accessorKey: "reason", header: "Lý do" },
    {
      accessorKey: "staff",
      header: "Nhân viên tính điểm",
      cell: ({ row }) => {
        const staff = row.getValue("staff") as User;
        return staff.name;
      },
    },
    {
      accessorKey: "createdAt",
      header: "Ngày tạo",
      cell: ({ row }) => formatDateVn(row.getValue("createdAt")),
    },
    {
      id: "actions",
      header: "Hành động",
      cell: ({ row }) => {
        const point = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Hành động</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => {
                  setSelectedPoint(point);
                  setOpenAction("UPDATE");
                }}
              >
                Cập nhật
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  setSelectedPoint(point);
                  setOpenAction("DELETE");
                }}
                className="text-red-500 focus:text-red-600"
              >
                Xóa
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const Dialogs = selectedPoint ? (
    <>
      <DialogUpdatePoint
        point={selectedPoint}
        isOpen={openAction === "UPDATE"}
        setIsOpen={(open) => {
          if (!open) closeDialog();
        }}
        onSuccess={() => {
          closeDialog();
          onSuccess();
        }}
      />
      <DialogDeletePoint
        point={selectedPoint}
        isOpen={openAction === "DELETE"}
        setIsOpen={(open) => {
          if (!open) closeDialog();
        }}
        onSuccess={() => {
          closeDialog();
          onSuccess();
        }}
      />
    </>
  ) : null;

  return { columns, Dialogs };
};

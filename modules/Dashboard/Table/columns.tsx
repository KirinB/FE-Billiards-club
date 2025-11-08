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
import { Badge } from "@/components/ui/badge";

import DialogUpdateTable from "@/components/Dashboard/Tables/DialogUpdateTable";
import DialogDeleteTable from "@/components/Dashboard/Tables/DialogDeleteTable";
import { BilliardTable } from "@/types/table.type";

type ActionType = "UPDATE" | "DELETE" | null;

export const useTableColumns = (onSuccess: () => void) => {
  const [selectedTable, setSelectedTable] = useState<BilliardTable | null>(
    null
  );
  const [openAction, setOpenAction] = useState<ActionType>(null);

  const closeDialog = () => {
    setOpenAction(null);
    setSelectedTable(null);
  };

  const columns: ColumnDef<BilliardTable>[] = [
    { accessorKey: "id", header: "ID" },
    { accessorKey: "name", header: "Tên bàn" },
    { accessorKey: "type", header: "Loại" },
    {
      accessorKey: "pricePerHour",
      header: "Giá/giờ (VND)",
      cell: ({ row }) => {
        const value = row.getValue("pricePerHour") as number;
        return value.toLocaleString("vi-VN") + "₫";
      },
    },
    {
      accessorKey: "status",
      header: "Trạng thái",
      cell: ({ row }) => {
        const status = row.getValue("status") as string;
        let variant: "default" | "secondary" | "active" | "destructive" =
          "secondary";
        let text = status;

        switch (status) {
          case "AVAILABLE":
            variant = "active";
            text = "Sẵn sàng";
            break;
          case "OCCUPIED":
            variant = "destructive";
            text = "Đang sử dụng";
            break;
        }

        return (
          <Badge variant={variant} className="capitalize">
            {text}
          </Badge>
        );
      },
    },
    {
      accessorKey: "createdAt",
      header: "Ngày tạo",
      cell: ({ row }) =>
        new Date(row.getValue("createdAt")).toLocaleDateString("vi-VN"),
    },
    {
      id: "actions",
      header: "Hành động",
      cell: ({ row }) => {
        const table = row.original;
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
                  setSelectedTable(table);
                  setOpenAction("UPDATE");
                }}
              >
                Cập nhật bàn
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  setSelectedTable(table);
                  setOpenAction("DELETE");
                }}
                className="text-red-500 focus:text-red-600"
              >
                Delete table
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const Dialogs = selectedTable ? (
    <>
      <DialogUpdateTable
        table={selectedTable}
        isOpen={openAction === "UPDATE"}
        setIsOpen={(open) => {
          if (!open) closeDialog();
        }}
        onSuccess={() => {
          closeDialog();
          onSuccess();
        }}
      />
      <DialogDeleteTable
        table={selectedTable}
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

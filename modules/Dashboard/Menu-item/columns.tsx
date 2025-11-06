// @/app/dashboard/menu-item/columns.tsx
"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { useState } from "react";
import { MenuItem } from "@/types/menu-item.type"; // Import type MenuItem mới
import { Badge } from "@/components/ui/badge";
import { formatCurrencyVND, formatDateVn } from "@/lib/utils"; // Giả định hàm format tiền tệ đã có
import DialogDeleteMenuItem from "@/components/Dashboard/menu-item/DialogDeleteMenuItem";
import DialogUpdateMenuItem from "@/components/Dashboard/menu-item/DialogUpdateMenuItem";

type ActionType = "UPDATE" | "DELETE" | null;

export const useMenuItemColumns = (onSuccess: () => void) => {
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [openAction, setOpenAction] = useState<ActionType>(null);

  const closeDialog = () => {
    setOpenAction(null);
    setSelectedItem(null);
  };

  const columns: ColumnDef<MenuItem>[] = [
    { accessorKey: "id", header: "ID" },
    { accessorKey: "name", header: "Tên Món" },
    {
      accessorKey: "category",
      header: "Danh mục",
      cell: ({ row }) => {
        const item = row.original;
        // Hiển thị tên danh mục hoặc "Chưa phân loại"
        return item.category?.name || "Chưa phân loại";
      },
    },
    {
      accessorKey: "price",
      header: "Giá",
      cell: ({ row }) => formatCurrencyVND(row.getValue("price") as number),
    },
    {
      accessorKey: "available",
      header: "Trạng thái",
      cell: ({ row }) => {
        const isAvailable = row.getValue("available") as boolean;
        const text = isAvailable ? "Sẵn có" : "Hết hàng";
        const variant: "default" | "secondary" | "active" | "destructive" =
          isAvailable ? "active" : "destructive";
        return <Badge variant={variant}>{text}</Badge>;
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
        const item = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              {/* HÀNH ĐỘNG CẬP NHẬT */}
              <DropdownMenuItem
                onClick={() => {
                  setSelectedItem(item);
                  setOpenAction("UPDATE");
                }}
              >
                Chỉnh sửa Món
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setSelectedItem(item);
                  setOpenAction("DELETE");
                }}
                className="text-red-500 focus:text-red-600"
              >
                Xóa Món
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  // Giả định Dialogs tương tự như MenuModule
  const Dialogs = selectedItem ? (
    <>
      {/* DialogUpdateMenuItem, DialogDeleteMenuItem */}
      <DialogDeleteMenuItem
        menuItem={selectedItem}
        isOpen={openAction === "DELETE"}
        setIsOpen={(open) => {
          if (!open) closeDialog();
        }}
        onSuccess={() => {
          closeDialog();
          onSuccess();
        }}
      />
      <DialogUpdateMenuItem
        menuItem={selectedItem}
        isOpen={openAction === "UPDATE"}
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

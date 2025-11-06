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
import { Menu } from "@/types/menu.type";
import DialogUpdateMenu from "@/components/Dashboard/Menu/DialogUpdateMenu";
import DialogDeleteMenu from "@/components/Dashboard/Menu/DialogDeleteMenu";

type ActionType = "UPDATE" | "DELETE" | null;

export const useMenuColumns = (onSuccess: () => void) => {
  const [selectedMenu, setSelectedMenu] = useState<Menu | null>(null);
  const [openAction, setOpenAction] = useState<ActionType>(null);

  // Hàm đóng dialog chung, reset cả action và menu
  const closeDialog = () => {
    setOpenAction(null);
    setSelectedMenu(null);
  };

  const columns: ColumnDef<Menu>[] = [
    { accessorKey: "id", header: "ID" },
    { accessorKey: "name", header: "Tên Menu" },
    {
      accessorKey: "menuItems",
      header: "Số lượng món",
      cell: ({ row }) => {
        const items = row.original.menuItems;
        return items ? items.length : 0;
      },
    },
    {
      accessorKey: "createdAt",
      header: "Ngày tạo",
      cell: ({ row }) =>
        new Date(row.getValue("createdAt") as string).toLocaleDateString(
          "vi-VN"
        ),
    },
    {
      accessorKey: "updatedAt",
      header: "Cập nhật lần cuối",
      cell: ({ row }) =>
        new Date(row.getValue("updatedAt") as string).toLocaleDateString(
          "vi-VN"
        ),
    },
    {
      id: "actions",
      header: "Hành động",
      cell: ({ row }) => {
        const menu = row.original;
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
                  setSelectedMenu(menu);
                  setOpenAction("UPDATE");
                }}
              >
                Chỉnh sửa Menu
              </DropdownMenuItem>
              {/* HÀNH ĐỘNG XÓA */}
              <DropdownMenuItem
                onClick={() => {
                  setSelectedMenu(menu);
                  setOpenAction("DELETE");
                }}
                className="text-red-500 focus:text-red-600"
              >
                Xóa Menu
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const Dialogs = selectedMenu ? (
    <>
      <DialogUpdateMenu
        menu={selectedMenu}
        isOpen={openAction === "UPDATE"}
        setIsOpen={(open) => {
          if (!open) closeDialog();
        }}
        onSuccess={() => {
          closeDialog();
          onSuccess();
        }}
      />
      <DialogDeleteMenu
        menu={selectedMenu}
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

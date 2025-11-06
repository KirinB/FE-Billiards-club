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
import { Category } from "@/types/category.type";
import { formatDateVn } from "@/lib/utils";
import DialogUpdateCategory from "@/components/Dashboard/Category/DialogUpdateCategory";
import DialogDeleteCategory from "@/components/Dashboard/Category/DialogDeleteCategory";

type ActionType = "UPDATE" | "DELETE" | null;

export const useCategoryColumns = (onSuccess: () => void) => {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [openAction, setOpenAction] = useState<ActionType>(null);

  const closeDialog = () => {
    setOpenAction(null);
    setSelectedCategory(null);
  };

  const columns: ColumnDef<Category>[] = [
    { accessorKey: "id", header: "ID" },
    { accessorKey: "name", header: "Tên Danh mục" },
    {
      accessorKey: "createdAt",
      header: "Ngày tạo",
      cell: ({ row }) => formatDateVn(row.getValue("createdAt")),
    },
    {
      accessorKey: "updatedAt",
      header: "Cập nhật lần cuối",
      cell: ({ row }) => formatDateVn(row.getValue("updatedAt")),
    },
    {
      id: "actions",
      header: "Hành động",
      cell: ({ row }) => {
        const category = row.original;
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
                  setSelectedCategory(category);
                  setOpenAction("UPDATE");
                }}
              >
                Chỉnh sửa
              </DropdownMenuItem>
              {/* HÀNH ĐỘNG XÓA */}
              <DropdownMenuItem
                onClick={() => {
                  setSelectedCategory(category);
                  setOpenAction("DELETE");
                }}
                className="text-red-500 focus:text-red-600"
              >
                Xóa Danh mục
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const Dialogs = selectedCategory ? (
    <>
      <DialogUpdateCategory
        category={selectedCategory}
        isOpen={openAction === "UPDATE"}
        setIsOpen={(open) => {
          if (!open) closeDialog();
        }}
        onSuccess={() => {
          closeDialog();
          onSuccess();
        }}
      />

      <DialogDeleteCategory
        category={selectedCategory}
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

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

export type User = {
  id: number;
  name: string;
  email: string;
  username: string;
  role: string;
  createdAt: string;
};

export const columns: ColumnDef<User>[] = [
  { accessorKey: "id", header: "ID" },
  { accessorKey: "name", header: "Tên" },
  { accessorKey: "email", header: "Email" },
  { accessorKey: "username", header: "Username" },
  { accessorKey: "role", header: "Role" },
  {
    accessorKey: "createdAt",
    header: "Ngày tạo",
    cell: ({ row }) =>
      new Date(row.getValue("createdAt")).toLocaleDateString("vi-VN"),
  },
  {
    id: "actions",
    header: "Hành động",
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => alert(`View ${row.getValue("name")}`)}
          >
            View detail
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => alert(`Edit ${row.getValue("name")}`)}
          >
            Edit user
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => alert(`Delete ${row.getValue("name")}`)}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];

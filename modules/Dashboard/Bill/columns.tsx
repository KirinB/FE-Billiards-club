import { ColumnDef } from "@tanstack/react-table";
import { Bill } from "@/types/bill.type";
import { useState } from "react";
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
import DialogUpdateBill from "@/components/Dashboard/Bill/DialogUpdateBill";
import DialogDeleteBill from "@/components/Dashboard/Bill/DialogDeleteBill";
import { formatCurrencyVND, formatDateVn } from "@/lib/utils";

type ActionType = "UPDATE" | "DELETE" | null;

export const useBillColumns = (onSuccess: () => void) => {
  const [selectedBill, setSelectedBill] = useState<Bill | null>(null);
  const [openAction, setOpenAction] = useState<ActionType>(null);

  const closeDialog = () => {
    setSelectedBill(null);
    setOpenAction(null);
  };

  const columns: ColumnDef<Bill>[] = [
    { accessorKey: "id", header: "ID" },
    { accessorKey: "sessionId", header: "Session ID" },
    {
      accessorKey: "createdBy",
      header: "Nhân viên",
      cell: ({ row }) => {
        const createdBy = row.getValue("createdBy") as { name: string };
        return createdBy.name;
      },
    },
    {
      accessorKey: "totalAmount",
      header: "Tổng tiền",
      cell: ({ row }) => formatCurrencyVND(row.getValue("totalAmount")),
    },
    {
      accessorKey: "createdAt",
      header: "Ngày tạo",
      cell: ({ row }) => formatDateVn(row.getValue("createdAt")),
    },
    // {
    //   id: "actions",
    //   header: "Hành động",
    //   cell: ({ row }) => {
    //     const bill = row.original;
    //     return (
    //       <DropdownMenu>
    //         <DropdownMenuTrigger asChild>
    //           <Button variant="ghost" className="h-8 w-8 p-0">
    //             <span className="sr-only">Open menu</span>
    //             <MoreHorizontal />
    //           </Button>
    //         </DropdownMenuTrigger>
    //         <DropdownMenuContent align="end">
    //           <DropdownMenuLabel>Actions</DropdownMenuLabel>
    //           <DropdownMenuItem
    //             onClick={() => {
    //               setSelectedBill(bill);
    //               setOpenAction("UPDATE");
    //             }}
    //           >
    //             Edit bill
    //           </DropdownMenuItem>
    //           <DropdownMenuSeparator />
    //           <DropdownMenuItem
    //             onClick={() => {
    //               setSelectedBill(bill);
    //               setOpenAction("DELETE");
    //             }}
    //             className="text-red-500 focus:text-red-600"
    //           >
    //             Delete bill
    //           </DropdownMenuItem>
    //         </DropdownMenuContent>
    //       </DropdownMenu>
    //     );
    //   },
    // },
  ];

  const Dialogs =
    selectedBill === null ? null : (
      <>
        <DialogUpdateBill
          bill={selectedBill}
          isOpen={openAction === "UPDATE"}
          setIsOpen={(open) => {
            if (!open) closeDialog();
          }}
          onSuccess={() => {
            closeDialog();
            onSuccess();
          }}
        />
        <DialogDeleteBill
          bill={selectedBill}
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
    );

  return { columns, Dialogs };
};

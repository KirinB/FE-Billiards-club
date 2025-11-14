import BillDialog from "@/components/POS/BillDialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatCurrencyVND, formatDateVn } from "@/lib/utils";
import { billService } from "@/services/bill.service";
import { Bill, CreateBillResponse } from "@/types/bill.type";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { useState } from "react";

type ActionType = "VIEW" | null;

export const useBillColumns = (onSuccess: () => void) => {
  const [selectedBill, setSelectedBill] = useState<CreateBillResponse | null>(
    null
  );
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
    {
      id: "actions",
      header: "Hành động",
      cell: ({ row }) => {
        const bill = row.original;
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
              <DropdownMenuItem
                onClick={async () => {
                  const billDetail = await billService.getDetail(bill.id);
                  setSelectedBill(billDetail);
                  setOpenAction("VIEW");
                }}
              >
                View bill
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const Dialogs =
    selectedBill === null ? null : (
      <>
        <BillDialog
          lastBill={selectedBill}
          isOpen={openAction === "VIEW"}
          setIsOpen={(open) => {
            if (!open) closeDialog();
          }}
        />
      </>
    );

  return { columns, Dialogs };
};

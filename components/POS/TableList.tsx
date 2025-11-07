import { tableService } from "@/services/tables.service";
import { BilliardTable } from "@/types/table.type";
import React, { useEffect, useState } from "react";
import TableCard from "./TableCard";
import { SimpleDialog } from "../custom/SimpleDialog";
import TableDialog from "./TableDialog";
import { sessionService } from "@/services/session.service";
import { billService } from "@/services/bill.service";
import { Session } from "@/types/session.type";
import { toast } from "sonner";
import { CreateBillResponse } from "@/types/bill.type";
import QRCode from "react-qr-code";
import BillDialog from "./BillDialog";

const TableList = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [tables, setTables] = useState<BilliardTable[]>([]);
  const [selectedTable, setSelectedTable] = useState<BilliardTable | null>(
    null
  );
  const [lastBill, setLastBill] = useState<CreateBillResponse | null>(null);
  const [isBillDialogOpen, setIsBillDialogOpen] = useState(false);

  const handleCardClick = (table: BilliardTable) => {
    setSelectedTable(table);
    setIsDialogOpen(true);
  };

  const fetchDataTable = async () => {
    try {
      const res = await tableService.getListWithoutPagination();
      setTables(res.tables);
    } catch (error) {
      console.log(error);
    }
  };

  const handleStartSession = async (table: BilliardTable) => {
    try {
      await sessionService.create({ tableId: table.id });
      fetchDataTable();
      toast.success("Mở bàn thành công!");
    } catch (error) {
      toast.error("Có lỗi gì đó !");
      console.log(error);
    }
  };

  const handleEndSession = async (table: BilliardTable) => {
    try {
      const bill = await billService.create({ tableId: table.id });
      fetchDataTable();
      setLastBill(bill);
      setIsBillDialogOpen(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDataTable();
  }, []);

  return (
    <div className="grid grid-cols-5 gap-10">
      {tables.map((table) => {
        return (
          <TableCard
            key={table.id}
            status={table.status}
            tableName={table.name}
            onClick={() => handleCardClick(table)}
          />
        );
      })}
      {selectedTable && (
        <TableDialog
          isOpen={isDialogOpen}
          setIsOpen={setIsDialogOpen}
          table={selectedTable}
          onStartSession={() => handleStartSession(selectedTable)}
          onEndSession={() => handleEndSession(selectedTable)}
        />
      )}

      {lastBill && (
        <BillDialog
          isOpen={isBillDialogOpen}
          setIsOpen={setIsBillDialogOpen}
          lastBill={lastBill}
        />
      )}
    </div>
  );
};

export default TableList;

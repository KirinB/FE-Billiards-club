"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { billService } from "@/services/bill.service";
import { sessionService } from "@/services/session.service";
import { tableService } from "@/services/tables.service";
import { BilliardTable } from "@/types/table.type";
import { CreateBillResponse } from "@/types/bill.type";

import TableCard from "./TableCard";
import { TableDetailPanel } from "./TableDetailPanel";
import BillDialog from "./BillDialog";

const TableList = () => {
  const [tables, setTables] = useState<BilliardTable[]>([]);
  const [selectedTable, setSelectedTable] = useState<BilliardTable | null>(
    null
  );
  const [lastBill, setLastBill] = useState<CreateBillResponse | null>(null);
  const [isBillDialogOpen, setIsBillDialogOpen] = useState(false);

  const fetchDataTables = async () => {
    try {
      const res = await tableService.getListWithoutPagination();
      setTables(res.tables);
    } catch (error) {
      console.log(error);
    }
  };

  const handleTableUpdate = async () => {
    await fetchDataTables(); // update danh sách bàn
    if (selectedTable) {
      try {
        const res = await tableService.getWithId(selectedTable.id);
        setSelectedTable(res.table); // cập nhật selectedTable
      } catch (error) {
        console.log(error);
        toast.error("Cập nhật thông tin bàn thất bại");
      }
    }
  };

  const updateSelectedTable = async (tableId: number) => {
    try {
      const res = await tableService.getWithId(tableId);
      setSelectedTable(res.table);
    } catch (error) {
      console.log(error);
      toast.error("Cập nhật thông tin bàn thất bại");
    }
  };

  const handleCardClick = async (table: BilliardTable) => {
    try {
      const res = await tableService.getWithId(table.id);
      setSelectedTable(res.table);
      // console.log(res.table);
    } catch (error) {
      console.log(error);
      toast.error("Lấy thông tin bàn thất bại");
    }
  };

  const handleStartSession = async (table: BilliardTable) => {
    try {
      await sessionService.create({ tableId: table.id });
      await fetchDataTables();
      await updateSelectedTable(table.id);
      toast.success("Mở bàn thành công!");
    } catch (error) {
      console.log(error);
      toast.error("Có lỗi gì đó!");
    }
  };

  const handleEndSession = async (table: BilliardTable) => {
    try {
      const bill = await billService.create({ tableId: table.id });
      await fetchDataTables();
      await updateSelectedTable(table.id);
      setLastBill(bill);
      setIsBillDialogOpen(true);
    } catch (error) {
      console.log(error);
      toast.error("Kết thúc bàn thất bại!");
    }
  };

  useEffect(() => {
    fetchDataTables();
  }, []);

  return (
    <div className="flex gap-6">
      {/* LEFT: Bàn */}
      <div className="flex-1">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {tables.map((table) => (
            <TableCard
              key={table.id}
              status={table.status}
              tableName={table.name}
              onClick={() => handleCardClick(table)}
            />
          ))}
        </div>
      </div>

      {/* RIGHT: chi tiết bàn */}
      <TableDetailPanel
        table={selectedTable}
        onStartSession={() =>
          selectedTable && handleStartSession(selectedTable)
        }
        onEndSession={() => selectedTable && handleEndSession(selectedTable)}
        onTableUpdate={handleTableUpdate} // callback khi gọi món xong
      />

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

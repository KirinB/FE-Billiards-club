"use client";

import { DataTable } from "@/components/data-table";
import { DataTableSkeleton } from "@/components/data-table-skeleton";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { pointHistoryService } from "@/services/pointHistory.service";
import { SortOrder } from "@/types/api.type";
import { PointHistory, PointTypeDB } from "@/types/pointHistory.type";
import { useEffect, useState } from "react";
import { usePointColumns } from "./columns";
import DialogCreatePoint from "@/components/Dashboard/PointHistory/DialogCreatePoint";

export default function PointModule() {
  const [data, setData] = useState<PointHistory[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [type, setType] = useState<PointTypeDB | "ALL">("ALL");
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [isOpenDialogCreate, setIsOpenDialogCreate] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const { pointHistories, total } = await pointHistoryService.getList({
        page,
        pageSize,
        type,
      });
      setData(pointHistories);
      setTotal(total);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const { columns, Dialogs } = usePointColumns(fetchData);

  useEffect(() => {
    fetchData();
  }, [page, pageSize, type]);

  if (loading) return <DataTableSkeleton columnsCount={7} rowsCount={5} />;

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">💎 Quản lý điểm thành viên</h1>

      {/* Toolbar */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:flex md:flex-row md:items-center">
          <Select
            onValueChange={(v) => {
              setPage(1);
              setType(v as PointTypeDB | "ALL");
            }}
            value={type}
          >
            <SelectTrigger className="w-full sm:w-[150px]">
              <SelectValue placeholder="Chọn loại điểm" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">Tất cả</SelectItem>
              <SelectItem value="EARN">Tích điểm</SelectItem>
              <SelectItem value="REDEEM">Đổi điểm</SelectItem>
              <SelectItem value="ADJUST">Điều chỉnh</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button
          variant="green"
          className="w-full sm:w-auto"
          onClick={() => setIsOpenDialogCreate(true)}
        >
          Thêm điểm
        </Button>

        <DialogCreatePoint
          isOpen={isOpenDialogCreate}
          setIsOpen={setIsOpenDialogCreate}
          onSuccess={fetchData}
        />
      </div>

      <DataTable
        columns={columns}
        data={data}
        total={total}
        page={page}
        pageSize={pageSize}
        onPageChange={setPage}
      />

      {Dialogs}
    </div>
  );
}

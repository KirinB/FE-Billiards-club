"use client";

import React, { useEffect, useState } from "react";
import { DataTable } from "@/components/data-table";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { DataTableSkeleton } from "@/components/data-table-skeleton";
import { BilliardTable, TableType } from "@/types/table.type";
import { tableService } from "@/services/tables.service";
import { SortOrder } from "@/types/api.type";
import { SimpleDialog } from "@/components/custom/SimpleDialog";
import DialogCreateTable from "@/components/Dashboard/Tables/DialogCreateTable";
import { useTableColumns } from "./columns";

// Mock API
const mockApi = async ({
  page,
  pageSize,
  search,
  priceSort,
  type,
}: {
  page: number;
  pageSize: number;
  search: string;
  priceSort: "asc" | "desc";
  type: string;
}) => {
  const mockData: BilliardTable[] = [
    {
      id: 1,
      name: "Bàn VIP 1",
      type: "CAROM",
      pricePerHour: 70000,
      status: "AVAILABLE",
      createdAt: "2025-11-01T06:24:32.644Z",
    },
    {
      id: 2,
      name: "Bàn Pool 1",
      type: "POOL",
      pricePerHour: 50000,
      status: "OCCUPIED",
      createdAt: "2025-11-02T08:24:32.644Z",
    },
    {
      id: 3,
      name: "Bàn VIP 2",
      type: "CAROM",
      pricePerHour: 80000,
      status: "AVAILABLE",
      createdAt: "2025-11-03T10:24:32.644Z",
    },
  ];

  // Lọc search
  let filtered = mockData.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  // Lọc type
  if (type && type !== "all")
    filtered = filtered.filter((item) => item.type === type);

  // Sort
  filtered.sort((a, b) =>
    priceSort === "asc"
      ? a.pricePerHour - b.pricePerHour
      : b.pricePerHour - a.pricePerHour
  );

  // Pagination
  const total = filtered.length;
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const tables = filtered.slice(start, end);

  return {
    success: true,
    message: "Fetched successfully",
    metaData: {
      tables,
      total,
      page,
      pageSize,
      totalPage: Math.ceil(total / pageSize),
    },
  };
};

export default function TableModule() {
  const [data, setData] = useState<BilliardTable[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [search, setSearch] = useState("");
  const [priceSort, setPriceSort] = useState<SortOrder>("asc");
  const [loading, setLoading] = useState(true);
  const [type, setType] = useState<TableType>("ALL");
  const [isOpenDialogCreate, setIsOpenDialogCreate] = useState<boolean>(false);

  const [total, setTotal] = useState(0);

  const fetchData = async () => {
    try {
      const { metaData } = await tableService.getList({
        page,
        pageSize,
        search,
        priceSort,
        type,
      });

      setData(metaData.tables);
      setLoading(false);
      setTotal(metaData.total);
    } catch (error) {
      console.log(error);
    }
  };

  const { Dialogs, columns } = useTableColumns(fetchData);

  useEffect(() => {
    // mockApi({ page, pageSize, search, priceSort, type }).then((res) => {
    //   setData(res.metaData.tables);
    //   setTotal(res.metaData.total);
    //   setLoading(false);
    // });
    fetchData();
  }, [page, pageSize, search, priceSort, type]);

  if (loading) return <DataTableSkeleton columnsCount={7} rowsCount={5} />;

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Quản lý bàn billiards</h1>

      {/* Toolbar */}
      <div className="flex justify-between">
        <div className="flex items-center gap-2">
          <Input
            placeholder="Tìm bàn..."
            value={search}
            onChange={(e) => {
              setPage(1);
              setSearch(e.target.value);
            }}
            className="w-[200px]"
          />

          <Select
            onValueChange={(v) => setType(v as TableType)}
            defaultValue="ALL"
          >
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Loại bàn" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">Tất cả</SelectItem>
              <SelectItem value="CAROM">CAROM</SelectItem>
              <SelectItem value="POOL">POOL</SelectItem>
            </SelectContent>
          </Select>

          <Button
            variant="outline"
            onClick={() => setPriceSort(priceSort === "asc" ? "desc" : "asc")}
          >
            Sắp xếp giá: {priceSort === "asc" ? "Tăng dần" : "Giảm dần"}
          </Button>
        </div>
        <Button
          variant={"green"}
          onClick={() => {
            setIsOpenDialogCreate(true);
          }}
        >
          Thêm bàn
        </Button>
        <DialogCreateTable
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

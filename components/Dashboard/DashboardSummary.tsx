"use client";
import { formatCurrencyVND } from "@/lib/utils";
import { SimpleCard } from "../custom/SimpleCard";
import { useEffect, useState } from "react";
import { DashboardSummaryResponse } from "@/types/dashboard.type";
import { DashboardService } from "@/services/dashboard.service";
import { Skeleton } from "../ui/skeleton";

const DashboardSummarySkeleton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <SimpleCard
        title="Tổng số session"
        description="Số phiên chơi trong tháng"
      >
        <Skeleton className="h-8 w-24" />
      </SimpleCard>

      <SimpleCard
        title="Tổng đơn hàng"
        description="Số đơn hàng đã tạo"
        titleType="success"
      >
        <Skeleton className="h-8 w-24" />
      </SimpleCard>

      <SimpleCard
        title="Tổng doanh thu"
        description="Tổng tiền từ tất cả hóa đơn"
        titleType="warning"
      >
        <Skeleton className="h-8 w-32" />
      </SimpleCard>

      <SimpleCard
        title="Bàn đang chơi"
        description="Số bàn hiện đang được sử dụng"
        titleType="danger"
      >
        <Skeleton className="h-8 w-24" />
      </SimpleCard>
    </div>
  );
};

const DashboardSummary = () => {
  const [summary, setSummary] = useState<DashboardSummaryResponse | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchSummary = async () => {
    try {
      setLoading(true);
      const data = await DashboardService.getSummary();
      setSummary(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSummary();
  }, []);

  if (loading) return <DashboardSummarySkeleton />;

  if (!summary) return <p>Không có dữ liệu</p>;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <SimpleCard
        title="Tổng số session"
        description="Số phiên chơi trong tháng"
        titleType="default"
      >
        <p className="text-2xl font-semibold">{summary.totalSessions}</p>
      </SimpleCard>

      <SimpleCard
        title="Tổng đơn hàng"
        description="Số đơn hàng đã tạo"
        titleType="success"
      >
        <p className="text-2xl font-semibold">{summary.totalOrders}</p>
      </SimpleCard>

      <SimpleCard
        title="Tổng doanh thu"
        description="Tổng tiền từ tất cả hóa đơn"
        titleType="warning"
      >
        <p className="text-2xl font-semibold">
          {formatCurrencyVND(summary.totalRevenue)}
        </p>
      </SimpleCard>

      <SimpleCard
        title="Bàn đang chơi"
        description="Số bàn hiện đang được sử dụng"
        titleType="danger"
      >
        <p className="text-2xl font-semibold">{summary.tablesPlaying}</p>
      </SimpleCard>
    </div>
  );
};

export default DashboardSummary;

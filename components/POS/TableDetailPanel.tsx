"use client";

import { useEffect, useState } from "react";
import { Spinner } from "@/components/ui/spinner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "../ui/button";
import { TableOrders } from "./TableOrders";
import { BilliardTable } from "@/types/table.type";

type Props = {
  table: BilliardTable | null;
  onStartSession?: () => void;
  onEndSession?: () => void;
  onTableUpdate: () => Promise<void>; // callback để fetch lại table
};

export const TableDetailPanel = ({
  table,
  onStartSession,
  onEndSession,
  onTableUpdate,
}: Props) => {
  const [duration, setDuration] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"info" | "orders">("info");

  useEffect(() => {
    setActiveTab("info");
  }, [table?.id]);

  useEffect(() => {
    if (!table || !table.currentSession) {
      setDuration("");
      return;
    }

    setLoading(true);
    const interval = setInterval(() => {
      const now = new Date();
      const start = new Date(table.currentSession!.startTime);
      const diffMs = now.getTime() - start.getTime();
      const hours = Math.floor(diffMs / (1000 * 60 * 60));
      const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);
      setDuration(
        `${hours.toString().padStart(2, "0")}:${minutes
          .toString()
          .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
      );
      setLoading(false);
    }, 1000);

    return () => clearInterval(interval);
  }, [table]);

  if (!table) {
    return (
      <div className="flex justify-center items-center w-1/2 md:w-[400px] border-l h-screen text-gray-400">
        Chọn một bàn để xem chi tiết
      </div>
    );
  }

  const isPlaying = table.status === "PLAYING";

  return (
    <div className="border-l p-6 h-screen overflow-y-auto w-1/2 md:w-[400px]">
      {loading ? (
        <div className="flex justify-center items-center h-full">
          <Spinner />
        </div>
      ) : (
        <>
          <h2 className="text-2xl font-bold mb-2">{table.name}</h2>
          <p className="text-gray-500 mb-4">
            Trạng thái:{" "}
            <span className={isPlaying ? "text-destructive" : "text-green-500"}>
              {isPlaying ? "Đang chơi" : "Sẵn sàng"}
            </span>
          </p>

          <Tabs
            value={activeTab}
            onValueChange={(v) => setActiveTab(v as any)}
            className="w-full"
          >
            <TabsList className="mb-6 w-full">
              <TabsTrigger value="info">Thông tin</TabsTrigger>
              {isPlaying && <TabsTrigger value="orders">Orders</TabsTrigger>}
            </TabsList>

            <TabsContent value="info">
              {/* Playing */}
              {isPlaying && table.currentSession && (
                <div className="text-sm space-y-1 mb-4">
                  <p>Thời gian chơi: {duration}</p>
                  <p>
                    Số order đã gọi: {table.currentSession?._count?.orders ?? 0}
                  </p>
                </div>
              )}
              <Button
                className="w-full mt-6"
                variant={isPlaying ? "destructive" : "green"}
                onClick={isPlaying ? onEndSession : onStartSession}
              >
                {isPlaying ? "Kết thúc giờ chơi" : "Bắt đầu giờ chơi"}
              </Button>
            </TabsContent>

            {isPlaying && (
              <TabsContent value="orders">
                <TableOrders tableId={table.id} onSuccess={onTableUpdate} />
              </TabsContent>
            )}
          </Tabs>
        </>
      )}
    </div>
  );
};

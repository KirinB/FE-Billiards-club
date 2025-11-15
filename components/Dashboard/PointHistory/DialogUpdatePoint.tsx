"use client";

import { FormInput } from "@/components/custom/form/FormInput";
import { FormSelect } from "@/components/custom/form/FormSelect";
import { FormTextarea } from "@/components/custom/form/FromTextarea";
import { SimpleDialog } from "@/components/custom/SimpleDialog";
import { Button } from "@/components/ui/button";
import { pointHistoryService } from "@/services/pointHistory.service";
import { ApiErrorResponse } from "@/types/api.type";
import {
  PointHistory,
  PointTypeDB,
  UpdatePointHistoryPayload,
} from "@/types/pointHistory.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const updatePointSchema = z.object({
  type: z.enum(["EARN", "REDEEM", "ADJUST"]),
  points: z.number().min(1, "Điểm phải lớn hơn 0"),
  reason: z.string().optional(),
});

type IUpdatePointSchema = z.infer<typeof updatePointSchema>;

const DialogUpdatePoint = ({
  isOpen,
  setIsOpen,
  point,
  onSuccess,
}: {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  point: PointHistory;
  onSuccess: () => void;
}) => {
  const formMethods = useForm<IUpdatePointSchema>({
    resolver: zodResolver(updatePointSchema),
    defaultValues: {
      type: point.type as PointTypeDB,
      points: point.points,
      reason: point.reason ?? "",
    },
  });

  const handleSubmit = async (data: IUpdatePointSchema) => {
    try {
      const payload: UpdatePointHistoryPayload = data;
      await pointHistoryService.update(point.id, payload);
      onSuccess();
      setIsOpen(false);
      toast.success("Cập nhật điểm thành công!");
    } catch (error) {
      const err = error as ApiErrorResponse;
      toast.error(err.message);
    }
  };

  return (
    <SimpleDialog isOpen={isOpen} setIsOpen={setIsOpen} title="Cập nhật điểm">
      <FormProvider {...formMethods}>
        <form
          onSubmit={formMethods.handleSubmit(handleSubmit)}
          className="space-y-6"
        >
          <FormSelect
            name="type"
            label="Loại điểm"
            options={[
              { label: "Tích điểm", value: "EARN" },
              { label: "Đổi điểm", value: "REDEEM" },
              { label: "Điều chỉnh", value: "ADJUST" },
            ]}
          />
          <FormInput
            name="points"
            label="Số điểm"
            placeholder="Nhập số điểm"
            type="number"
          />
          <FormTextarea
            name="reason"
            label="Lý do"
            placeholder="Nhập lý do (tùy chọn)"
          />

          <Button type="submit" className="w-full">
            Cập nhật
          </Button>
        </form>
      </FormProvider>
    </SimpleDialog>
  );
};

export default DialogUpdatePoint;

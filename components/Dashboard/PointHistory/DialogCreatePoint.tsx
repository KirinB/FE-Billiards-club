"use client";

import { FormInput } from "@/components/custom/form/FormInput";
import { FormSelect } from "@/components/custom/form/FormSelect";
import { SimpleDialog } from "@/components/custom/SimpleDialog";
import { Button } from "@/components/ui/button";
import { pointHistoryService } from "@/services/pointHistory.service";
import { ApiErrorResponse } from "@/types/api.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { CreatePointHistoryPayload } from "@/types/pointHistory.type";
import { FormTextarea } from "@/components/custom/form/FromTextarea";

const createPointSchema = z.object({
  memberPhone: z.string(),
  type: z.enum(["EARN", "REDEEM", "ADJUST"]),
  points: z.number().min(1, "Điểm phải lớn hơn 0"),
  reason: z.string().optional(),
});

type ICreatePointSchema = z.infer<typeof createPointSchema>;

const DialogCreatePoint = ({
  isOpen,
  setIsOpen,
  onSuccess,
}: {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onSuccess: () => void;
}) => {
  const formMethods = useForm<ICreatePointSchema>({
    resolver: zodResolver(createPointSchema),
    defaultValues: { memberPhone: "", type: "EARN", points: 0 },
  });

  const handleSubmit = async (data: ICreatePointSchema) => {
    try {
      await pointHistoryService.create(data as CreatePointHistoryPayload);
      onSuccess();
      setIsOpen(false);
      formMethods.reset();
      toast.success("Thêm điểm thành công!");
    } catch (error) {
      const err = error as ApiErrorResponse;
      toast.error(err.message);
    }
  };

  return (
    <SimpleDialog isOpen={isOpen} setIsOpen={setIsOpen} title="Thêm điểm">
      <FormProvider {...formMethods}>
        <form
          onSubmit={formMethods.handleSubmit(handleSubmit)}
          className="space-y-6"
        >
          <FormInput
            name="memberPhone"
            label="Số điện thoại Thành viên"
            placeholder="Nhập số điện thoại thành viên"
          />
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
            Thêm
          </Button>
        </form>
      </FormProvider>
    </SimpleDialog>
  );
};

export default DialogCreatePoint;

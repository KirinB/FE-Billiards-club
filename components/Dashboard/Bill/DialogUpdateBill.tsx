"use client";

import { SimpleDialog } from "@/components/custom/SimpleDialog";
import { Button } from "@/components/ui/button";
import { Bill, IPayloadUpdateBill } from "@/types/bill.type";
import { billService } from "@/services/bill.service";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import { FormInput } from "@/components/custom/form/FormInput";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

const updateBillSchema = z.object({
  totalAmount: z.number().min(0, "Tổng tiền không thể âm"),
});

export type IUpdateBillSchema = z.infer<typeof updateBillSchema>;

const DialogUpdateBill = ({
  bill,
  isOpen,
  setIsOpen,
  onSuccess,
}: {
  bill: Bill;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onSuccess: () => void;
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formMethods = useForm<IUpdateBillSchema>({
    resolver: zodResolver(updateBillSchema),
    defaultValues: {
      totalAmount: bill.totalAmount,
    },
  });

  const handleSubmit = async (data: IUpdateBillSchema) => {
    const payload: IPayloadUpdateBill = {
      totalAmount: data.totalAmount,
    };
    setIsSubmitting(true);
    try {
      await billService.update(bill.id, payload);
      toast.success("Cập nhật hóa đơn thành công!");
      onSuccess();
      setIsOpen(false);
    } catch (error: any) {
      toast.error(error?.message || "Có lỗi xảy ra");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SimpleDialog
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title={`Cập nhật hóa đơn #${bill.id}`}
    >
      <FormProvider {...formMethods}>
        <form
          onSubmit={formMethods.handleSubmit(handleSubmit)}
          className="space-y-4"
        >
          <FormInput
            name="totalAmount"
            type="number"
            label="Tổng tiền"
            placeholder="Nhập tổng tiền"
          />

          <Button type="submit" className="w-full">
            {isSubmitting ? "Đang cập nhật..." : "Cập nhật hóa đơn"}
          </Button>
        </form>
      </FormProvider>
    </SimpleDialog>
  );
};

export default DialogUpdateBill;

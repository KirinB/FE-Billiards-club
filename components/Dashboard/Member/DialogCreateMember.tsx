"use client";

import { FormInput } from "@/components/custom/form/FormInput";
import { SimpleDialog } from "@/components/custom/SimpleDialog";
import { Button } from "@/components/ui/button";
import { memberService } from "@/services/member.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

export const createMemberSchema = z.object({
  name: z.string().min(2),
  phone: z.string().min(8),
  email: z.email(),
});

export type ICreateMember = z.infer<typeof createMemberSchema>;

export default function DialogCreateMember({
  isOpen,
  setIsOpen,
  onSuccess,
}: {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onSuccess: () => void;
}) {
  const [loading, setLoading] = useState(false);

  const formMethods = useForm<ICreateMember>({
    resolver: zodResolver(createMemberSchema),
    defaultValues: { name: "", phone: "", email: "" },
  });

  const handleSubmit = async (data: ICreateMember) => {
    try {
      setLoading(true);
      await memberService.create(data);
      toast.success("Tạo thành viên thành công");
      formMethods.reset();
      setIsOpen(false);
      onSuccess();
    } catch (error) {
      toast.error("Có lỗi xảy ra");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SimpleDialog isOpen={isOpen} setIsOpen={setIsOpen} title="Thêm thành viên">
      <FormProvider {...formMethods}>
        <form
          className="space-y-6"
          onSubmit={formMethods.handleSubmit(handleSubmit)}
        >
          <FormInput
            name="name"
            label="Tên thành viên"
            placeholder="Nhập tên"
          />
          <FormInput
            name="email"
            label="Email thành viên"
            placeholder="Nhập email"
          />
          <FormInput
            name="phone"
            label="Số điện thoại"
            placeholder="Nhập SĐT"
          />

          <Button type="submit" className="w-full">
            {loading ? "Đang tạo..." : "Tạo mới"}
          </Button>
        </form>
      </FormProvider>
    </SimpleDialog>
  );
}

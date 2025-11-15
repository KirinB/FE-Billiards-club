"use client";

import { FormInput } from "@/components/custom/form/FormInput";
import { SimpleDialog } from "@/components/custom/SimpleDialog";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import z from "zod";
import { Member } from "@/types/member.type";
import { toast } from "sonner";
import { memberService } from "@/services/member.service";

const updateMemberSchema = z.object({
  name: z.string().min(2),
  phone: z.string().min(8),
  email: z.email(),
});

type IUpdateMember = z.infer<typeof updateMemberSchema>;

export default function DialogUpdateMember({
  isOpen,
  setIsOpen,
  member,
  onSuccess,
}: {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  member: Member;
  onSuccess: () => void;
}) {
  const [loading, setLoading] = useState(false);

  const formMethods = useForm<IUpdateMember>({
    resolver: zodResolver(updateMemberSchema),
    defaultValues: {
      name: member.name,
      phone: member.phone,
      email: member.email,
    },
  });

  const handleSubmit = async (data: IUpdateMember) => {
    try {
      setLoading(true);
      await memberService.update(member.id, data);
      toast.success("Cập nhật thành viên thành công");
      setIsOpen(false);
      onSuccess();
    } catch (error) {
      toast.error("Có lỗi xảy ra");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SimpleDialog
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title="Cập nhật thành viên"
    >
      <FormProvider {...formMethods}>
        <form
          className="space-y-6"
          onSubmit={formMethods.handleSubmit(handleSubmit)}
        >
          <FormInput name="name" label="Tên thành viên" />
          <FormInput name="email" label="Email thành viên" />
          <FormInput name="phone" label="Số điện thoại" />

          <Button className="w-full" type="submit">
            {loading ? "Đang cập nhật..." : "Cập nhật"}
          </Button>
        </form>
      </FormProvider>
    </SimpleDialog>
  );
}

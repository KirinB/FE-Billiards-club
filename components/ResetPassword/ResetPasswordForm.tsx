"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { FormInput } from "../custom/form/FormInput";
import { Button } from "../ui/button";
import { authService } from "@/services/auth.service";
import { useRouter } from "next/navigation";
import { ApiErrorResponse } from "@/types/api.type";

const resetPasswordSchema = z
  .object({
    password: z.string().min(6, "Mật khẩu phải ít nhất 6 ký tự"),
    rePassword: z.string().min(6, "Mật khẩu phải ít nhất 6 ký tự"),
  })
  .refine((data) => data.password === data.rePassword, {
    message: "Mật khẩu xác nhận không khớp",
    path: ["rePassword"],
  });

type IResetPasswordSchema = z.infer<typeof resetPasswordSchema>;

const ResetPasswordForm = ({ token }: { token: string }) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formMethods = useForm<IResetPasswordSchema>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      rePassword: "",
    },
  });

  const onSubmit = async (data: IResetPasswordSchema) => {
    console.log(data);
    const payload = {
      password: data.password,
      token,
    };
    try {
      setIsSubmitting(true);

      await authService.resetPassword(payload);

      toast.success("Cập nhật mật khẩu thành công!");

      router.push("/login");
    } catch (error) {
      toast.error("Có lỗi gì đấy vui lòng liên hệ Admin");
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <FormProvider {...formMethods}>
      <form onSubmit={formMethods.handleSubmit(onSubmit)} className="space-y-6">
        <FormInput
          name="password"
          label="Mật khẩu"
          placeholder="Nhập mật khẩu"
          type="password"
        />
        <FormInput
          name="rePassword"
          label="Nhập lại mật khẩu"
          placeholder="Nhập mật khẩu"
          type="password"
        />
        <Button type="submit" className="w-full">
          {isSubmitting ? "Đang xử lý..." : "Cập nhật mật khẩu"}
        </Button>
      </form>
    </FormProvider>
  );
};

export default ResetPasswordForm;

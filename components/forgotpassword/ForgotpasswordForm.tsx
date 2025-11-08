"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import z from "zod";
import { FormInput } from "../custom/form/FormInput";
import { Button } from "../ui/button";
import { useState } from "react";
import { authService } from "@/services/auth.service";
import { toast } from "sonner";

export const forgotPasswordSchema = z.object({
  email: z.email(),
});

type IForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;

const ForgotpasswordForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formMethods = useForm<IForgotPasswordSchema>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: IForgotPasswordSchema) => {
    console.log(data);
    try {
      setIsSubmitting(true);
      authService.forgot(data);
    } catch (error) {
    } finally {
      setIsSubmitting(false);
      toast.success("Đã gửi đến email của bạn vui lòng kiểm tra hộp thư");
    }
  };
  return (
    <FormProvider {...formMethods}>
      <form onSubmit={formMethods.handleSubmit(onSubmit)} className="space-y-6">
        <FormInput name="email" label="Email" placeholder="Nhập tên email" />
        <Button type="submit" className="w-full">
          {isSubmitting ? "Đang xử lý..." : "Gửi đến email"}
        </Button>
      </form>
    </FormProvider>
  );
};

export default ForgotpasswordForm;

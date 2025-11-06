import { FormInput } from "@/components/custom/form/FormInput";
import { FormSelect } from "@/components/custom/form/FormSelect";
import { SimpleDialog } from "@/components/custom/SimpleDialog";
import { Button } from "@/components/ui/button";
import { MESSAGES } from "@/constants/message";
import { role } from "@/schemas/user.schema";
import { userService } from "@/services/user.service";
import { ApiErrorResponse } from "@/types/api.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

export const optinalRoleUser = [
  { label: "Nhân viên", value: "STAFF" },
  { label: "Quản trị viên", value: "ADMIN" },
];

export const createUserSchema = z.object({
  name: z.string().min(3, MESSAGES.VALIDATION.NAME_LENGTH),
  email: z.string().email(MESSAGES.VALIDATION.EMAIL_NOT_AVAILABLE),
  role: z.enum(["ADMIN", "STAFF"]),
  username: z.string().min(3, MESSAGES.VALIDATION.USER_NAME_LENGTH),
  password: z.string().min(6, MESSAGES.VALIDATION.PASSWORD_LENGTH),
});

export type ICreateUserSchema = z.infer<typeof createUserSchema>;

const DialogCreateUser = ({
  isOpen,
  setIsOpen,
  onSuccess,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onSuccess: () => void;
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formMethods = useForm<ICreateUserSchema>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      email: "",
      name: "",
      role: "STAFF",
      username: "",
      password: "",
    },
  });

  const handleSubmit = async (data: ICreateUserSchema) => {
    try {
      console.log(data);
      setIsSubmitting(true);
      const res = await userService.create(data);
      console.log(res.user);
      onSuccess();
      setIsOpen(false);
      formMethods.reset();
      toast.success("Tạo tài khoản thành công!");
    } catch (error) {
      const err = error as ApiErrorResponse;
      toast.error(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SimpleDialog
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title="Tạo mới tài khoản nhân viên"
    >
      <FormProvider {...formMethods}>
        <form
          onSubmit={formMethods.handleSubmit(handleSubmit)}
          className="space-y-6"
        >
          <FormInput name="name" label="Tên" placeholder="Nhập tên đăng nhập" />

          <FormInput
            name="username"
            label="Tên đăng nhập"
            placeholder="Nhập tên đăng nhập"
          />
          <FormInput name="email" label="Email" placeholder="Nhập tên email" />
          <FormInput
            name="password"
            type="password"
            label="Mật khẩu"
            placeholder="Nhập mật khẩu"
          />

          <FormSelect name="role" label="Chức vụ" options={optinalRoleUser} />

          <Button type="submit" className="w-full">
            {isSubmitting ? "Đang tạo mới..." : "Tạo mới tài khoản"}
          </Button>
        </form>
      </FormProvider>
    </SimpleDialog>
  );
};

export default DialogCreateUser;

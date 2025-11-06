import { FormInput } from "@/components/custom/form/FormInput";
import { FormSelect } from "@/components/custom/form/FormSelect";
import { SimpleDialog } from "@/components/custom/SimpleDialog";
import { Button } from "@/components/ui/button";
import { IUpdateUserSchema, updateUserSchema } from "@/schemas/user.schema";
import { userService } from "@/services/user.service";
import { IPayloadUpdateUser, Role, User } from "@/types/user.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { optinalRoleUser } from "./DialogCreateUser";
import { ApiErrorResponse } from "@/types/api.type";
import { toast } from "sonner";

const DialogUpdateTable = ({
  isOpen,
  setIsOpen,
  user,
  onSuccess,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  user: User;
  onSuccess: () => void;
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formMethods = useForm<IUpdateUserSchema>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      email: user.email,
      name: user.name,
      role: user.role,
      username: user.username,
    },
  });

  const handleSubmit = async (data: IUpdateUserSchema) => {
    const payload: IPayloadUpdateUser = {
      name: data.name,
      username: data.username,
      email: data.email,
      role: data.role as Role,
    };
    // console.log({ payload });
    setIsSubmitting(true);
    try {
      await userService.update(user.id, payload);
      onSuccess();
      setIsOpen(false);
      toast.success("Cập nhật tài khoản thành công!");
    } catch (error) {
      const err = error as ApiErrorResponse;
      toast.error(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <SimpleDialog isOpen={isOpen} setIsOpen={setIsOpen} title="Cập nhật bàn">
        <FormProvider {...formMethods}>
          <form
            onSubmit={formMethods.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            <FormInput
              name="name"
              label="Tên"
              placeholder="Nhập tên đăng nhập"
            />

            <FormInput
              name="username"
              label="Tên đăng nhập"
              placeholder="Nhập tên đăng nhập"
            />

            <FormInput
              name="email"
              label="Email"
              placeholder="Nhập tên email"
            />

            <FormSelect name="role" label="Chức vụ" options={optinalRoleUser} />

            <Button type="submit" className="w-full">
              {isSubmitting ? "Đang cập nhật..." : "Cập nhật thông tin"}
            </Button>
          </form>
        </FormProvider>
      </SimpleDialog>
    </>
  );
};

export default DialogUpdateTable;

import { FormInput } from "@/components/custom/form/FormInput";
import { SimpleDialog } from "@/components/custom/SimpleDialog";
import { Button } from "@/components/ui/button";
import { menuService } from "@/services/menu.service";
import { ApiErrorResponse } from "@/types/api.type";
import { Menu } from "@/types/menu.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const updateMenuSchema = z.object({
  name: z.string().min(2),
});

type IUpdateMenuSchema = z.infer<typeof updateMenuSchema>;

const DialogUpdateTable = ({
  isOpen,
  setIsOpen,
  menu,
  onSuccess,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  menu: Menu;
  onSuccess: () => void;
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formMethods = useForm<IUpdateMenuSchema>({
    resolver: zodResolver(updateMenuSchema),
    defaultValues: {
      name: menu.name,
    },
  });

  const handleSubmit = async (data: IUpdateMenuSchema) => {
    setIsSubmitting(true);
    try {
      await menuService.update(menu.id, data);
      onSuccess();
      setIsOpen(false);
      toast.success("Cập nhật thực đơn thành công!");
    } catch (error) {
      const err = error as ApiErrorResponse;
      toast.error(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <SimpleDialog
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title="Cập nhật thực đơn"
      >
        <FormProvider {...formMethods}>
          <form
            onSubmit={formMethods.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            <FormInput
              name="name"
              label="Tên thực đơn"
              placeholder="Nhập tên thực đơn"
            />

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

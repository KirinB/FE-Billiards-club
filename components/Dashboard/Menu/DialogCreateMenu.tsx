import { FormInput } from "@/components/custom/form/FormInput";
import { SimpleDialog } from "@/components/custom/SimpleDialog";
import { Button } from "@/components/ui/button";
import { menuService } from "@/services/menu.service";
import { ApiErrorResponse } from "@/types/api.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const createMenuSchema = z.object({
  name: z.string().min(2),
});

type ICreateMenuSchema = z.infer<typeof createMenuSchema>;

const DialogCreateMenu = ({
  isOpen,
  setIsOpen,
  onSuccess,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onSuccess: () => void;
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formMethods = useForm<ICreateMenuSchema>({
    resolver: zodResolver(createMenuSchema),
    defaultValues: {
      name: "",
    },
  });

  const handleSubmit = async (data: ICreateMenuSchema) => {
    setIsSubmitting(true);
    try {
      await menuService.create(data);
      onSuccess();
      setIsOpen(false);
      formMethods.reset();
      toast.success("Tạo mới thực đơn thành công!");
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
      title="Tạo mới thực đơn"
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
            {isSubmitting ? "Đang tạo mới..." : "Tạo mới thực đơn"}
          </Button>
        </form>
      </FormProvider>
    </SimpleDialog>
  );
};

export default DialogCreateMenu;

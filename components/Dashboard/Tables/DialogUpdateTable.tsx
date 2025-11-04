import { FormInput } from "@/components/custom/form/FormInput";
import { FormSelect } from "@/components/custom/form/FormSelect";
import { SimpleDialog } from "@/components/custom/SimpleDialog";
import { Button } from "@/components/ui/button";
import { tableService } from "@/services/tables.service";
import { BilliardTable } from "@/types/table.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import z from "zod";

const updateTableSchema = z.object({
  name: z.string(),
  type: z.enum(["POOL", "CAROM"]),
  pricePerHour: z.number().min(1000, "Giá tối thiểu 1000 VNĐ"),
});

type IUpdateTableSchema = z.infer<typeof updateTableSchema>;

const DialogUpdateTable = ({
  isOpen,
  setIsOpen,
  table,
  onSuccess,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  table: BilliardTable;
  onSuccess: () => void;
}) => {
  const formMethods = useForm<IUpdateTableSchema>({
    resolver: zodResolver(updateTableSchema),
    defaultValues: {
      name: table.name,
      type: table.type as "POOL" | "CAROM",
      pricePerHour: table.pricePerHour,
    },
  });

  const handleSubmit = async (data: IUpdateTableSchema) => {
    console.log(data);
    try {
      await tableService.update(table.id, data);
      onSuccess();
      setIsOpen(false);
    } catch (error) {
      console.log(error);
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
            <FormInput name="name" label="Tên bàn" placeholder="Nhập tên bàn" />
            <FormSelect
              name="type"
              label="Loại bàn"
              options={[
                { label: "Pool", value: "POOL" },
                { label: "Carom", value: "CAROM" },
              ]}
            />
            <FormInput
              name="pricePerHour"
              label="Giá theo giờ"
              placeholder="Nhập giá (VND)"
              type="number"
            />

            <Button type="submit" className="w-full">
              Cập nhật thông tin
            </Button>
          </form>
        </FormProvider>
      </SimpleDialog>
    </>
  );
};

export default DialogUpdateTable;

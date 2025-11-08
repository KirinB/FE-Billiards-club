"use client";

import { useEffect, useState } from "react";
import { useForm, FormProvider, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { FormSelect } from "../custom/form/FormSelect";
import { FormInput } from "../custom/form/FormInput";
import { Button } from "../ui/button";
import { X } from "lucide-react";
import { menuItemService } from "@/services/menu-item.service";
import { orderService } from "@/services/order.service";
import { toast } from "sonner";
import { MenuItem } from "@/types/menu-item.type";

// Schema order
const createOrderSchema = z.object({
  tableId: z.number(),
  items: z
    .array(
      z.object({
        menuItemId: z.number().min(1, { message: "Vui lòng chọn món " }),
        quantity: z.number().min(1),
      })
    )
    .nonempty(),
});

export type ICreateOrderSchema = z.infer<typeof createOrderSchema>;

type Props = {
  tableId: number;
  onSuccess: () => Promise<void>; // callback fetch lại table
};

export const TableOrders = ({ tableId, onSuccess }: Props) => {
  const [menuItemList, setMenuItemList] = useState<
    { label: string; value: number }[]
  >([]);

  const formMethods = useForm<ICreateOrderSchema>({
    resolver: zodResolver(createOrderSchema),
    defaultValues: { tableId, items: [] },
  });

  const { fields, append, remove } = useFieldArray({
    control: formMethods.control,
    name: "items",
  });

  useEffect(() => {
    const fetchMenuItems = async () => {
      const res = await menuItemService.getListWithoutPagination();
      setMenuItemList(
        res.items.map((item: MenuItem) => ({
          label: item.name,
          value: item.id,
        }))
      );
    };
    fetchMenuItems();
  }, []);

  const handleSubmitOrder = async (data: ICreateOrderSchema) => {
    try {
      await orderService.create(data);
      toast.success("Gọi món thành công");
      formMethods.reset();
      await onSuccess(); // fetch lại table/session
    } catch (error) {
      console.log(error);
      toast.error("Gọi món thất bại");
    }
  };

  return (
    <FormProvider {...formMethods}>
      <form
        onSubmit={formMethods.handleSubmit(handleSubmitOrder)}
        className="space-y-4"
      >
        {fields.map((field, index) => (
          <div key={field.id} className="flex gap-4">
            <FormSelect
              options={menuItemList}
              name={`items.${index}.menuItemId`}
              label="Món ăn"
              className="w-full"
            />
            <FormInput
              name={`items.${index}.quantity`}
              label="Số lượng"
              className="w-24"
              type="number"
            />
            <div className="my-auto pt-4">
              <Button
                type="button"
                variant="destructive"
                size="icon-sm"
                onClick={() => remove(index)}
              >
                <X />
              </Button>
            </div>
          </div>
        ))}
        <Button
          type="button"
          onClick={() => append({ menuItemId: 0, quantity: 1 })}
        >
          + Thêm món
        </Button>
        <Button type="submit" className="w-full">
          Xác nhận order
        </Button>
      </form>
    </FormProvider>
  );
};

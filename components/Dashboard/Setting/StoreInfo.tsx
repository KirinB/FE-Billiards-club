"use client";

import { FormInput } from "@/components/custom/form/FormInput";
import { FormUploadInput } from "@/components/custom/form/FormUploadInput";
import { Button } from "@/components/ui/button";
import { AppDispatch, RootState } from "@/stores";
import {
  fetchStoreInfo,
  setLocalStoreInfo,
  updateStoreInfo,
} from "@/stores/storeInfoSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import * as z from "zod";

// ---------- Zod schema ----------
const storeInfoSchema = z.object({
  name: z.string().min(1, "Tên quán không được để trống"),
  address: z.string().min(1, "Địa chỉ không được để trống"),
  phone: z.string().min(1, "Số điện thoại không được để trống"),
  vat: z.number().min(0, "VAT phải >= 0"),
  logo: z.string().url().optional(),
});

type StoreInfoForm = z.infer<typeof storeInfoSchema>;

// ---------- Component ----------
export default function StoreInfoSettings() {
  const dispatch = useDispatch<AppDispatch>();
  const storeInfo = useSelector((state: RootState) => state.storeInfo);

  const formMethods = useForm<StoreInfoForm>({
    resolver: zodResolver(storeInfoSchema),
    defaultValues: {
      name: storeInfo.name ?? "",
      address: storeInfo.address ?? "",
      phone: storeInfo.phone ?? "",
      vat: storeInfo.vat ?? 0,
      logo: storeInfo.logo ?? "",
    },
  });

  const { handleSubmit, reset, watch } = formMethods;
  const watchedLogo = watch("logo");

  useEffect(() => {
    dispatch(fetchStoreInfo());
  }, [dispatch]);

  useEffect(() => {
    reset({
      name: storeInfo.name ?? "",
      address: storeInfo.address ?? "",
      phone: storeInfo.phone ?? "",
      vat: storeInfo.vat ?? 0,
      logo: storeInfo.logo ?? "",
    });
  }, [storeInfo, reset]);

  const onSubmit = async (data: StoreInfoForm) => {
    let finalLogo = data.logo;

    // Nếu logo là file local (Blob URL) -> upload Cloudinary
    if (watchedLogo && watchedLogo.startsWith("blob:")) {
      const fileInput =
        document.querySelector<HTMLInputElement>('input[type="file"]');
      if (fileInput?.files?.[0]) {
        const file = fileInput.files[0];
        const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
        const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", uploadPreset || "");

        const res = await fetch(
          `https://api.cloudinary.com/v1_1/${cloudName}/upload`,
          { method: "POST", body: formData }
        );
        const uploadData = await res.json();
        finalLogo = uploadData.secure_url;
      }
    }

    const finalData = { ...data, logo: finalLogo };

    await dispatch(updateStoreInfo(finalData));
    dispatch(setLocalStoreInfo(finalData));
  };

  return (
    <div className="space-y-4 p-4">
      <h2 className="text-xl font-semibold">Cài đặt quán</h2>

      <FormProvider {...formMethods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-2 gap-3 w-full"
        >
          <FormInput label="Tên quán" name="name" placeholder="Tên quán" />
          <FormInput
            label="Địa chỉ"
            name="address"
            placeholder="Địa chỉ quán"
          />
          <FormInput
            label="Số điện thoại quán"
            name="phone"
            placeholder="Số điện thoại"
          />
          <FormInput label="VAT (%)" type="number" name="vat" />

          <FormUploadInput
            label="Logo quán"
            name="logo"
            fallback={storeInfo.logo ?? undefined}
          />

          <div className="flex gap-2 col-span-2 justify-end">
            <Button type="submit" disabled={storeInfo.status === "loading"}>
              {storeInfo.status === "loading" ? "Đang lưu..." : "Lưu"}
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}

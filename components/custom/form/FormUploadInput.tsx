"use client";

import * as React from "react";
import { useFormContext, Controller } from "react-hook-form";

interface FormUploadInputProps {
  name: string;
  label: string;
  accept?: string;
  fallback?: string; // logo mặc định
}

export const FormUploadInput: React.FC<FormUploadInputProps> = ({
  name,
  label,
  accept = "image/*",
  fallback,
}) => {
  const { control, setValue, watch } = useFormContext();
  const fieldValue = watch(name); // giá trị hiện tại từ form
  const [preview, setPreview] = React.useState<string | null>(
    fieldValue || fallback || null
  );
  const [file, setFile] = React.useState<File | null>(null);

  React.useEffect(() => {
    if (fieldValue && fieldValue !== preview) {
      setPreview(fieldValue);
    }
  }, [fieldValue]);

  const handleFileChange = (selectedFile: File) => {
    setFile(selectedFile);
    const url = URL.createObjectURL(selectedFile);
    setPreview(url);
    setValue(name, url); // tạm lưu URL local
  };

  return (
    <Controller
      name={name}
      control={control}
      render={() => (
        <div className="flex flex-col gap-2">
          <label className="font-medium">{label}</label>

          <div className="relative w-32 h-32 border border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-50">
            {preview ? (
              <img
                src={preview}
                alt="preview"
                className="w-full h-full object-cover rounded-lg"
              />
            ) : (
              <span className="text-gray-400 text-sm">Click để chọn ảnh</span>
            )}

            <input
              type="file"
              accept={accept}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              onChange={(e) => {
                const selectedFile = e.target.files?.[0];
                if (selectedFile) handleFileChange(selectedFile);
              }}
            />
          </div>
        </div>
      )}
    />
  );
};

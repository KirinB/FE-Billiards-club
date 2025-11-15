"use client";

import { useState } from "react";
import { SimpleDialog } from "../custom/SimpleDialog";
import { Button } from "../ui/button";

type Props = {
  onConfirmPhone: (phone: string) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
};

export const AskPhoneDialog = ({
  onConfirmPhone,
  isOpen,
  setIsOpen,
}: Props) => {
  const [phone, setPhone] = useState("");

  const handleConfirm = () => {
    onConfirmPhone(phone);
    setPhone("");
    setIsOpen(false);
  };

  const handleCancel = () => {
    setPhone("");
    setIsOpen(false);
  };

  return (
    <SimpleDialog
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title="Nhập số điện thoại khách"
      variant="confirm"
      onConfirm={handleConfirm}
      onCancel={handleCancel}
      confirmText="Xác nhận"
      cancelText="Hủy"
      confirmVariant="green"
    >
      <div className="flex flex-col gap-2">
        <label htmlFor="tel" className="text-sm">
          Số điện thoại(không bắt buộc)
        </label>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Nhập số điện thoại"
          className="border rounded px-3 py-2 w-full"
        />
      </div>
    </SimpleDialog>
  );
};

"use client";

import { CreateBillResponse } from "@/types/bill.type";
import { SimpleDialog } from "../custom/SimpleDialog";
import { Button } from "../ui/button";
import { formatCurrencyVND, formatHoursPlayed } from "@/lib/utils";
import Image from "next/image";
import fallbackLogo from "@/assets/images/logo.png";
import QRCode from "react-qr-code";
import { useSelector } from "react-redux";
import { RootState } from "@/stores";

type BillDialogProps = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  lastBill: CreateBillResponse;
};

const BillDialog = ({ lastBill, isOpen, setIsOpen }: BillDialogProps) => {
  const { bill } = lastBill;
  const storeInfo = useSelector((state: RootState) => state.storeInfo);
  const logo = storeInfo.logo || fallbackLogo;
  const name = storeInfo.name || "Quán của bạn";
  const phone = storeInfo.phone || "Chưa có";
  const address = storeInfo.address || "Chưa có";

  const handlePrintDemo = () => {
    alert("Demo: In hóa đơn thành công!");
  };

  return (
    <SimpleDialog isOpen={isOpen} setIsOpen={setIsOpen} title={name}>
      <div className="font-mono text-sm text-center w-full">
        <div className="space-y-2">
          <div className="flex w-full justify-center">
            <Image
              src={logo}
              alt="logo"
              width={80}
              height={80}
              className="w-20 h-20"
            />
          </div>
          <p>{address}</p>
          <p>ĐT: {phone}</p>
        </div>

        <hr className="my-4 border-dashed" />

        <div className="text-left space-y-1 flex justify-between">
          <div className="text-sm">
            <p>Giờ in: {new Date(bill.createdAt).toLocaleString()}</p>
            <p>Thời gian chơi: {formatHoursPlayed(bill.hoursPlayed)}</p>
          </div>
          <div className="text-sm">
            <p>Hóa đơn số: {bill.sessionId}</p>
            <p>Tiền bàn/giờ: {formatCurrencyVND(bill.pricePerHour)}</p>
          </div>
        </div>

        <hr className="my-4 border-dashed" />

        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-300">
              <th>Tên</th>
              <th className="text-right">SL</th>
              <th className="text-right">Giá</th>
              <th className="text-right">Tổng</th>
            </tr>
          </thead>
          <tbody>
            {bill.items.map((item) => (
              <tr key={item.id}>
                <td>{item.menuItem.name}</td>
                <td className="text-right">{item.quantity}</td>
                <td className="text-right">{item.price.toLocaleString()}</td>
                <td className="text-right">
                  {(item.quantity * item.price).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <hr className="my-4 border-dashed" />

        <div className="text-right space-y-1">
          <p>Tiền bàn: {bill.sessionAmount.toLocaleString()}đ</p>
          <p>Tiền đồ ăn: {bill.totalOrder.toLocaleString()}đ</p>
          <p className="font-bold text-lg">
            Tổng cộng: {bill.totalAmount.toLocaleString()}đ
          </p>
        </div>

        <hr className="my-4 border-dashed mb-4" />
        <div className="space-y-4">
          <div className="flex justify-center">
            <QRCode value={bill.sessionId.toString()} size={100} />
          </div>
          <p className="text-center text-xs italic mt-2">
            Xin cảm ơn và hẹn gặp lại!
          </p>
        </div>
      </div>

      <div className="flex justify-center mt-4">
        <Button onClick={handlePrintDemo}>In hóa đơn (demo)</Button>
      </div>
    </SimpleDialog>
  );
};

export default BillDialog;

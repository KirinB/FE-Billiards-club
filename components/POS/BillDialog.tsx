import { CreateBillResponse } from "@/types/bill.type";
import { SimpleDialog } from "../custom/SimpleDialog";
import { Button } from "../ui/button";

type BillDialogProps = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  lastBill: CreateBillResponse;
};

const BillDialog = ({ lastBill, isOpen, setIsOpen }: BillDialogProps) => {
  const { bill } = lastBill;

  const handlePrintDemo = () => {
    alert("Demo: In hóa đơn thành công!");
  };

  return (
    <SimpleDialog
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title={`HÓA ĐƠN BÀN #${bill.sessionId}`}
    >
      <div className="font-mono text-sm text-center w-full">
        <h2 className="font-bold text-lg mb-1">Billiards Kirin</h2>
        <p>Quận 10, thành phố Hồ Chí Minh</p>
        <p>ĐT: 0909090909</p>
        <hr className="my-2 border-dashed" />

        <div className="text-left space-y-1">
          <p>Giờ in: {new Date(bill.createdAt).toLocaleString()}</p>
          <p>Thời gian chơi: {bill.hoursPlayed.toFixed(2)} giờ</p>
        </div>

        <hr className="my-2 border-dashed" />

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
                <td>{item.menuItem?.name || `Món #${item.menuItem}`}</td>
                <td className="text-right">{item.quantity}</td>
                <td className="text-right">{item.price.toLocaleString()}</td>
                <td className="text-right">
                  {(item.quantity * item.price).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <hr className="my-2 border-dashed" />

        <div className="text-right space-y-1">
          <p>Tiền bàn: {bill.sessionAmount.toLocaleString()}đ</p>
          <p>Tiền đồ ăn: {bill.totalOrder.toLocaleString()}đ</p>
          <p className="font-bold text-lg">
            Tổng cộng: {bill.totalAmount.toLocaleString()}đ
          </p>
        </div>

        <hr className="my-2 border-dashed" />
        <p className="text-center text-xs italic mt-2">
          Xin cảm ơn và hẹn gặp lại!
        </p>
      </div>

      <div className="flex justify-center mt-4">
        <Button onClick={handlePrintDemo}>In hóa đơn (demo)</Button>
      </div>
    </SimpleDialog>
  );
};

export default BillDialog;

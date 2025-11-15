"use client";

import { SimpleDialog } from "@/components/custom/SimpleDialog";
import { memberService } from "@/services/member.service";
import { Member } from "@/types/member.type";
import { toast } from "sonner";

export default function DialogDeleteMember({
  isOpen,
  setIsOpen,
  onSuccess,
  member,
}: {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onSuccess: () => void;
  member: Member;
}) {
  const handleDelete = async () => {
    try {
      await memberService.delete(member.id);
      toast.success("Xóa thành viên thành công");
      onSuccess();
    } catch (error) {
      toast.error("Có lỗi xảy ra");
    }
  };

  return (
    <SimpleDialog
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      variant="confirm"
      title="Xóa thành viên"
      onConfirm={handleDelete}
    >
      Bạn chắc chắn muốn xóa member có số điện thoại{" "}
      <strong>{member.phone}</strong>?
    </SimpleDialog>
  );
}

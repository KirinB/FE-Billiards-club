"use client";
import ResetPasswordForm from "@/components/ResetPassword/ResetPasswordForm";
import { useSearchParams } from "next/navigation";
import React from "react";

const ResetPasswordModule = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  if (!token) {
    return (
      <div className="flex justify-center items-center my-10">
        <p>Token không hợp lệ hoặc bị thiếu.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 py-6">
      <h2 className="text-center text-2xl">Welcome back</h2>
      <p className="text-center text-muted-foreground">
        Login to your Kirin Billards account
      </p>
      <ResetPasswordForm token={token} />
    </div>
  );
};

export default ResetPasswordModule;

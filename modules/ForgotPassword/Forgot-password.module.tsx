import ForgotpasswordForm from "@/components/forgotpassword/ForgotpasswordForm";
import React from "react";

const ForgotPasswordModule = () => {
  return (
    <div className="space-y-6 py-6">
      <h2 className="text-center text-2xl">Welcome back</h2>
      <p className="text-center text-muted-foreground">
        Login to your Kirin Billards account
      </p>
      <ForgotpasswordForm />
    </div>
  );
};

export default ForgotPasswordModule;

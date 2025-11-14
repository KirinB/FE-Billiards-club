"use client";
import { cn } from "@/lib/utils";

import { MESSAGES } from "@/constants/message";
import { useState } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { Button } from "./ui/button";
import { authService } from "@/services/auth.service";
import { useDispatch } from "react-redux";
import { setUser } from "@/stores/authSlice";
import { useRouter } from "next/navigation";

export const loginSchema = z.object({
  usernameOrEmail: z
    .string()
    .min(3, MESSAGES.VALIDATION.USERNAME_OR_EMAIL_LENGTH),
  password: z.string().min(6, MESSAGES.VALIDATION.PASSWORD_LENGTH),
});

type LoginFormData = z.infer<typeof loginSchema>;

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();
  const dispatch = useDispatch();

  const [message, setMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    // console.log(data);
    try {
      const { metaData } = await authService.login(data);
      dispatch(setUser(metaData.accessToken));

      setMessage("");
      router.push("/");
    } catch (error) {
      console.log(error);
      setMessage(MESSAGES.AUTH.INVALID_CREDENTIALS);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-1">
          Username or email
        </label>
        <input
          type="text"
          {...register("usernameOrEmail")}
          className="w-full border rounded-md p-2 text-sm focus:ring focus:ring-primary"
          placeholder="Enter your email or username"
        />
        {errors.usernameOrEmail && (
          <p className="text-red-500 text-sm mt-1">
            {errors.usernameOrEmail.message}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Password</label>
        <input
          type="password"
          {...register("password")}
          className="w-full border rounded-md p-2 text-sm focus:ring focus:ring-primary"
          placeholder="Enter your password"
        />
        {errors.password && (
          <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
        )}
      </div>

      <div className="text-sm underline text-right w-full text-gray-500 cursor-pointer">
        <Link href={"/forgot-password"}>Forgot password?</Link>
      </div>

      <div className="flex justify-center w-full">
        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? "Signing in..." : "Sign in"}
        </Button>
      </div>

      {message && (
        <p className="text-red-500 text-center text-sm mt-2">{message}</p>
      )}
    </form>
  );
}

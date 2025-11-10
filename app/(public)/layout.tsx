"use client";

import { Card, CardContent } from "@/components/ui/card";
import { FieldDescription } from "@/components/ui/field";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/stores";
import fallback from "@/assets/images/logo.png";
import Image from "next/image";
import { useEffect, useState } from "react";
import { fetchStoreInfo } from "@/stores/storeInfoSlice";
import Link from "next/link";

type AuthLayoutProps = {
  children: React.ReactNode;
};

export const AuthLayout = ({ children }: AuthLayoutProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { logo } = useSelector((state: RootState) => state.storeInfo);
  const [imageLoaded, setImageLoaded] = useState(false);
  useEffect(() => {
    const loadStoreInfo = async () => {
      try {
        const result = await dispatch(fetchStoreInfo()).unwrap();
        console.log("Fetched store info:", result);
      } catch (err) {
        console.error(err);
      }
    };

    loadStoreInfo();
  }, [dispatch]);
  return (
    <div className="bg-muted flex min-h-screen flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-4xl">
        <div className="flex flex-col gap-6">
          <Card className="overflow-hidden p-0">
            <CardContent className="grid p-0 md:grid-cols-2">
              {/* Left: Form */}
              <div className="p-6 md:p-8">
                <div className="flex flex-col items-center gap-2 text-center">
                  <div>
                    {!logo || !imageLoaded ? (
                      <div className="h-20 w-20 rounded-full bg-gray-300 animate-pulse" />
                    ) : null}

                    {/* Image */}
                    {logo && (
                      <Link href={"/login"}>
                        <Image
                          src={logo}
                          alt="logo"
                          width={80}
                          height={80}
                          className={`h-20 w-20 rounded-full transition-opacity duration-300 ${
                            imageLoaded ? "opacity-100" : "opacity-0"
                          }`}
                          onLoadingComplete={() => setImageLoaded(true)}
                        />
                      </Link>
                    )}
                  </div>
                  <h1 className="text-2xl font-bold">Kirin Billiards Club</h1>
                </div>
                {children}
              </div>

              {/* Right: Background */}
              <div className="bg-muted relative hidden md:block">
                <img
                  src="/bg-login.jpg"
                  alt="Background"
                  className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                />
                <div className="bg-black/40 w-full h-full absolute"></div>
              </div>
            </CardContent>
          </Card>

          <FieldDescription className="px-6 text-center">
            By clicking continue, you agree to our{" "}
            <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
          </FieldDescription>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;

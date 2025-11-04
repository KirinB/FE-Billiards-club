import { LoginForm } from "@/components/login-form";
import { Card, CardContent } from "@/components/ui/card";
import { FieldDescription } from "@/components/ui/field";
import logo from "@/assets/images/logo.png";
import Image from "next/image";

const LoginModule = () => {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-4xl">
        <div className="flex flex-col gap-6">
          <Card className="overflow-hidden p-0">
            <CardContent className="grid p-0 md:grid-cols-2">
              <div className="p-6 md:p-8">
                <div className="flex flex-col items-center gap-2 text-center mb-10">
                  <div>
                    <Image src={logo} alt="logo" className="h-20 w-20" />
                  </div>
                  <h1 className="text-2xl font-bold">Welcome back</h1>
                  <p className="text-muted-foreground text-balance">
                    Login to your Kirin Billards account
                  </p>
                </div>
                <LoginForm />
              </div>
              <div className="bg-muted relative hidden md:block">
                <img
                  src="/bg-login.jpg"
                  alt="Image"
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

export default LoginModule;

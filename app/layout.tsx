import type { Metadata } from "next";
import "@/app/globals.css";
import Providers from "./provider";

export const metadata: Metadata = {
  title: "Kirin",
  description: "billards",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={``}>
      <body className="antialiased" suppressHydrationWarning={true}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

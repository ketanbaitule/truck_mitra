import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const client = createClient();
  if ((await client.auth.getUser()).data.user) redirect("/agency");
  return <>{children}</>;
}

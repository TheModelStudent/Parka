import type { Metadata } from "next";
import { AccountForm } from "@/components/ui/AccountForm";

export const metadata: Metadata = { title: "Sign In" };

export default function LoginPage() {
  return <AccountForm mode="login" />;
}

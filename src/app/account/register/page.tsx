import type { Metadata } from "next";
import { AccountForm } from "@/components/ui/AccountForm";

export const metadata: Metadata = { title: "Create Account" };

export default function RegisterPage() {
  return <AccountForm mode="register" />;
}

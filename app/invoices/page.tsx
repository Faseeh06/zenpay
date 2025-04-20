"use client"

import { redirect } from "next/navigation"

export default function InvoicesPage() {
  // Redirect to invoice creation page
  redirect("/invoices/new")
}

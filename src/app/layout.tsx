import type { ReactNode } from "react";
import "./globals.css";
import "./style.css";
export const metadata = { title: "Admin Panel", description: "Staff administration console", robots: { index: false, follow: false } };
export default function Layout({ children }: { children: ReactNode }) { return <html lang="en"><body style={{ margin: 0, padding: 0 }}>{children}</body></html>; }

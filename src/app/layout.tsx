import type { ReactNode } from "react";
import "./globals.css";
import "./style.css";
import "./admin-dark.css";
export const metadata = { title: "Admin Panel", description: "Staff administration console", robots: { index: false, follow: false } };
export default function Layout({ children }: { children: ReactNode }) {
  return <html lang="en" suppressHydrationWarning>
    <head><script dangerouslySetInnerHTML={{ __html: `try{var t=localStorage.getItem('nammapros.admin.theme');document.documentElement.dataset.adminTheme=t==='dark'||(t!=='light'&&matchMedia('(prefers-color-scheme: dark)').matches)?'dark':'light'}catch(e){}` }} /></head>
    <body style={{ margin: 0, padding: 0 }}>{children}</body>
  </html>;
}

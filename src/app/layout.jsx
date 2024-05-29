import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "EZnema",
  description: "Prueba técnica para Vortex Bird",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
        <body className={`${inter.className} min-h-screen`}>
            <Header />
            <main className="min-h-[100vh]">
              {children}
            </main>
            <Footer />
        </body>
    </html>
  );
}

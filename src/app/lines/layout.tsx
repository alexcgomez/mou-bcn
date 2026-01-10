import { Navbar } from "@/components/navbar";

export default function LinesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="container py-6">{children}</main>
    </>
  );
}

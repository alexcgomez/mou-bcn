import { Navbar } from "@/components/navbar";

export default function LinesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="container pt-6 pb-8 flex-grow">
        {children}
      </main>
      <footer className="border-t bg-white py-4 mt-auto">
        <div className="container text-center text-sm text-gray-500">
          <p>© 2026 MouBCN - Informació del metro de Barcelona</p>
          <p className="mt-1">Dades proporcionades per TMB (Transports Metropolitans de Barcelona)</p>
        </div>
      </footer>
    </div>
  );
}

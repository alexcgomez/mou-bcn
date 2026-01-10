import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-red-600 to-red-800">
      <div className="flex flex-col items-center gap-8 text-white">
        <Image
          src="/metro-logo.png"
          alt="Logo del Metro de Barcelona"
          width={150}
          height={150}
          className="drop-shadow-2xl"
          priority
        />
        <Link href="/lines" aria-label="Entrar a MouBCN - Veure línies de metro">
          <Button
            size="lg"
            variant="secondary"
            className="text-2xl font-bold px-12 py-8 rounded-xl shadow-xl hover:scale-105 transition-transform focus:outline-none focus:ring-4 focus:ring-white focus:ring-offset-4 focus:ring-offset-red-600"
          >
            MouBCN
          </Button>
        </Link>
        <div className="text-center mt-4">
          <h1 className="text-xl font-semibold">Metro de Barcelona</h1>
          <p className="text-white/80 mt-2">Fes clic a MouBCN per entrar</p>
        </div>
      </div>
    </main>
  );
}

import Link from "next/link";
import Image from "next/image";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 shadow-sm">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <Image
            src="/metro-logo.png"
            alt="Metro Barcelona"
            width={40}
            height={40}
            className="h-10 w-10"
          />
          <div className="flex flex-col">
            <span className="font-bold text-xl text-gray-900">MouBCN</span>
            <span className="text-xs text-gray-500 hidden sm:block">Metro de Barcelona</span>
          </div>
        </Link>
        <nav className="flex items-center gap-6">
          <Link
            href="/lines"
            className="text-sm font-semibold text-gray-600 transition-colors hover:text-red-600"
          >
            Línies de Metro
          </Link>
        </nav>
      </div>
    </header>
  );
}

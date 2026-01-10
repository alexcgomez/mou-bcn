import Link from "next/link";
import Image from "next/image";

export function Navbar() {
  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/metro-logo.png"
            alt="Metro Barcelona"
            width={32}
            height={32}
            className="h-8 w-8"
          />
          <span className="font-bold text-lg">MouBCN</span>
        </Link>
        <div className="ml-auto flex items-center gap-4">
          <Link
            href="/lines"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            Línies
          </Link>
        </div>
      </div>
    </nav>
  );
}

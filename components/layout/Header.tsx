"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-800 bg-white/90 dark:bg-gray-950/90 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-medium tracking-tight text-primary">
              Autora
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/resultats"
              className={cn(
                "text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors",
                pathname === "/resultats" && "text-gray-900 dark:text-white font-medium"
              )}
            >
              Comparer
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/partenaire">
              <Button variant="outline" size="sm">
                Devenir partenaire
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 dark:border-gray-800 bg-white/90 dark:bg-gray-950/90 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-[88px] items-center justify-between">
          {/* Logo — cliquable, renvoie vers l'accueil */}
          <Link href="/" className="flex items-center shrink-0">
            {/*
              Wrapper crops top whitespace + bottom subtitle out of the PNG,
              keeping only the car + "AUTORA" band.
              object-cover + object-[center_60%] zooms into that band.
            */}
            <div className="relative h-24 w-[288px] overflow-hidden">
              <Image
                src="/logo.png"
                alt="Autora — Location de voitures"
                fill
                priority
                className="object-cover object-bottom"
              />
            </div>
          </Link>

          {/* Navigation centrale */}
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

          {/* CTA droite */}
          <div className="flex items-center gap-3 shrink-0">
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

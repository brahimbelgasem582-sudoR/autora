import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
      <p className="text-sm font-medium text-primary mb-3 uppercase tracking-wide">404</p>
      <h1 className="text-3xl font-medium text-gray-900 dark:text-white mb-3">
        Page introuvable
      </h1>
      <p className="text-gray-400 dark:text-gray-500 mb-8 max-w-sm">
        La page que vous cherchez n&apos;existe pas ou a été déplacée.
      </p>
      <div className="flex gap-3">
        <Link href="/">
          <Button>Retour à l&apos;accueil</Button>
        </Link>
        <Link href="/resultats">
          <Button variant="outline">Comparer des voitures</Button>
        </Link>
      </div>
    </div>
  );
}

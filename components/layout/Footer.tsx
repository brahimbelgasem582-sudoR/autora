import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 mt-auto">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <span className="text-lg font-medium text-primary">Autora</span>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 max-w-xs">
              Comparez et réservez votre voiture de location au Maroc parmi les meilleures agences.
            </p>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-900 dark:text-white mb-3">Navigation</p>
            <ul className="space-y-2">
              {[
                { href: "/", label: "Accueil" },
                { href: "/resultats", label: "Comparer" },
                { href: "/partenaire", label: "Devenir partenaire" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-900 dark:text-white mb-3">Villes populaires</p>
            <ul className="space-y-2">
              {["Casablanca", "Marrakech", "Agadir", "Rabat", "Fès"].map((city) => (
                <li key={city}>
                  <Link
                    href={`/resultats?location=${city}`}
                    className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                  >
                    {city}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-gray-200 dark:border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-400 dark:text-gray-500">
            &copy; {new Date().getFullYear()} Autora. Tous droits réservés.
          </p>
          <div className="flex items-center gap-4">
            <Link href="#" className="text-xs text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors">
              Confidentialité
            </Link>
            <Link href="#" className="text-xs text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors">
              Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

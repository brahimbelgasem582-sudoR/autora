import { SearchBar } from "@/components/search/SearchBar";
import { cars } from "@/data/cars";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";

export default function HomePage() {
  const avgRating = (
    cars.reduce((sum, c) => sum + c.agency.rating, 0) / cars.length
  ).toFixed(1);
  const agencyCount = new Set(cars.map((c) => c.agency.id)).size;

  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden hero-gradient border-b border-gray-200 dark:border-gray-800">
        {/* Decorative blobs */}
        <div aria-hidden="true" className="absolute -top-24 -right-24 w-[560px] h-[560px] rounded-full bg-primary/[0.06] dark:bg-primary/[0.10] blur-[120px] pointer-events-none" />
        <div aria-hidden="true" className="absolute -bottom-20 left-[12%] w-[340px] h-[340px] rounded-full bg-primary/[0.04] dark:bg-primary/[0.07] blur-[90px] pointer-events-none" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="max-w-2xl mb-10">
            <p className="text-sm font-medium text-primary mb-4 tracking-wide uppercase">
              Location de voiture au Maroc
            </p>
            <h1 className="text-4xl sm:text-5xl font-medium text-gray-900 dark:text-white leading-tight mb-4">
              Comparez et réservez votre voiture au Maroc
            </h1>
            <p className="text-lg text-gray-500 dark:text-gray-400">
              Toutes les agences de confiance en un seul endroit. Meilleur prix garanti.
            </p>
          </div>

          <SearchBar />

          {/* Trust badges */}
          <div className="mt-6 flex flex-wrap gap-6 items-center">
            <TrustItem value={`${agencyCount}+`} label="agences partenaires" />
            <Divider />
            <TrustItem value={avgRating} label="note moyenne" suffix="/5" />
            <Divider />
            <TrustItem value="Livraison" label="aéroport disponible" />
            <Divider />
            <TrustItem value="Gratuit" label="aucune commission cachée" />
          </div>
        </div>
      </section>

      {/* Catégories populaires */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-xl font-medium text-gray-900 dark:text-white mb-8">
          Catégories populaires
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.label}
              href={`/resultats?category=${cat.label}`}
              className="group flex flex-col items-center gap-3 p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-card hover:border-primary/40 hover:shadow-card-hover transition-all duration-200"
            >
              <span className="text-2xl font-medium text-gray-300 dark:text-gray-600 group-hover:text-primary/40 transition-colors select-none">
                {cat.abbr}
              </span>
              <div className="text-center">
                <p className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-primary transition-colors">
                  {cat.label}
                </p>
                <p className="text-xs text-gray-400 mt-0.5">
                  dès {formatPrice(cat.from)} / jour
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Voitures mises en avant */}
      <section className="border-t border-gray-200 dark:border-gray-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-medium text-gray-900 dark:text-white">
              Sélection du moment
            </h2>
            <Link
              href="/resultats"
              className="text-sm text-primary hover:text-primary-700 font-medium transition-colors"
            >
              Voir tout
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {cars.slice(0, 6).map((car) => (
              <Link
                key={car.id}
                href={`/voiture/${car.id}`}
                className="group bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-5 shadow-card hover:border-primary/30 hover:shadow-card-hover transition-all duration-200"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-xs text-gray-400 dark:text-gray-500">{car.agency.name}</p>
                    <p className="font-medium text-gray-900 dark:text-white mt-0.5">
                      {car.brand} {car.model}
                    </p>
                  </div>
                  <span className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded px-2 py-0.5">
                    {car.category}
                  </span>
                </div>

                <div className="h-px bg-gray-100 dark:bg-gray-800 mb-4" />

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="text-yellow-400 text-sm">★</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {car.agency.rating}
                    </span>
                    <span className="text-xs text-gray-400">
                      ({car.agency.reviewCount} avis)
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-medium text-primary">
                      {formatPrice(car.pricePerDay)}
                    </p>
                    <p className="text-xs text-gray-400">par jour</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Partenaire */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-primary rounded-2xl p-8 sm:p-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <p className="text-primary-100 text-sm font-medium mb-2">Pour les agences</p>
            <h3 className="text-2xl font-medium text-white mb-2">
              Remplissez votre flotte toute l&apos;année
            </h3>
            <p className="text-primary-200 text-sm max-w-sm">
              Rejoignez Autora et accédez à des milliers de clients chaque mois. Audit gratuit de votre flotte.
            </p>
          </div>
          <Link
            href="/partenaire"
            className="shrink-0 inline-flex items-center h-12 px-6 bg-white text-primary text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors"
          >
            Devenir partenaire
          </Link>
        </div>
      </section>
    </main>
  );
}

function TrustItem({
  value,
  label,
  suffix,
}: {
  value: string;
  label: string;
  suffix?: string;
}) {
  return (
    <div className="flex items-baseline gap-1">
      <span className="text-base font-medium text-gray-900 dark:text-white">
        {value}
        {suffix && <span className="text-sm text-gray-500 dark:text-gray-400">{suffix}</span>}
      </span>
      <span className="text-sm text-gray-500 dark:text-gray-400">{label}</span>
    </div>
  );
}

function Divider() {
  return <span className="text-gray-300 dark:text-gray-700 select-none">|</span>;
}

const CATEGORIES = [
  { label: "Citadine" as const, abbr: "City", from: 160 },
  { label: "Berline" as const, abbr: "Sedan", from: 320 },
  { label: "SUV" as const, abbr: "SUV", from: 380 },
  { label: "4x4" as const, abbr: "4×4", from: 650 },
];

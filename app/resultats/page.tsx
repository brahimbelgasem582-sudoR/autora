"use client";

import { useMemo, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { cars, agencies } from "@/data/cars";
import { CarCard } from "@/components/cars/CarCard";
import { SearchBar } from "@/components/search/SearchBar";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import type { CarCategory, FilterState, SortOption, Transmission } from "@/types";
import { cn } from "@/lib/utils";

const CATEGORIES: CarCategory[] = ["Citadine", "Berline", "SUV", "4x4", "Utilitaire"];
const TRANSMISSIONS: Transmission[] = ["Manuelle", "Automatique"];

const SORT_LABELS: Record<SortOption, string> = {
  price_asc: "Prix croissant",
  price_desc: "Prix décroissant",
  rating_desc: "Meilleures notes",
};

function ResultsContent() {
  const params = useSearchParams();

  const defaultFilters: FilterState = {
    categories: params.get("category")
      ? [params.get("category") as CarCategory]
      : [],
    priceMin: 0,
    priceMax: 2000,
    transmission: null,
    agencyId: null,
    airportDelivery: false,
  };

  const [filters, setFilters] = useState<FilterState>(defaultFilters);
  const [sort, setSort] = useState<SortOption>("price_asc");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const pickupDate = params.get("pickupDate") || "";
  const returnDate = params.get("returnDate") || "";

  const filtered = useMemo(() => {
    let list = [...cars];

    if (filters.categories.length > 0) {
      list = list.filter((c) => filters.categories.includes(c.category));
    }
    if (filters.transmission) {
      list = list.filter((c) => c.transmission === filters.transmission);
    }
    if (filters.agencyId) {
      list = list.filter((c) => c.agency.id === filters.agencyId);
    }
    if (filters.airportDelivery) {
      list = list.filter((c) => c.airportDelivery);
    }
    list = list.filter(
      (c) => c.pricePerDay >= filters.priceMin && c.pricePerDay <= filters.priceMax
    );

    if (sort === "price_asc") list.sort((a, b) => a.pricePerDay - b.pricePerDay);
    else if (sort === "price_desc") list.sort((a, b) => b.pricePerDay - a.pricePerDay);
    else if (sort === "rating_desc")
      list.sort((a, b) => b.agency.rating - a.agency.rating);

    return list;
  }, [filters, sort]);

  const cheapestId = useMemo(() => {
    if (filtered.length === 0) return null;
    return [...filtered].sort((a, b) => a.pricePerDay - b.pricePerDay)[0].id;
  }, [filtered]);

  function toggleCategory(cat: CarCategory) {
    setFilters((f) => ({
      ...f,
      categories: f.categories.includes(cat)
        ? f.categories.filter((c) => c !== cat)
        : [...f.categories, cat],
    }));
  }

  function resetFilters() {
    setFilters({
      categories: [],
      priceMin: 0,
      priceMax: 2000,
      transmission: null,
      agencyId: null,
      airportDelivery: false,
    });
  }

  const hasActiveFilters =
    filters.categories.length > 0 ||
    filters.transmission !== null ||
    filters.agencyId !== null ||
    filters.airportDelivery ||
    filters.priceMin > 0 ||
    filters.priceMax < 2000;

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      {/* Compact search */}
      <div className="mb-10">
        <SearchBar
          compact
          defaultValues={{
            location: params.get("location") || "",
            pickupDate,
            pickupTime: params.get("pickupTime") || "09:00",
            returnDate,
            returnTime: params.get("returnTime") || "09:00",
          }}
        />
      </div>

      <div className="flex gap-8">
        {/* Sidebar filters — desktop */}
        <aside className="hidden lg:block w-64 shrink-0">
          <FiltersPanel
            filters={filters}
            setFilters={setFilters}
            toggleCategory={toggleCategory}
            resetFilters={resetFilters}
            hasActiveFilters={hasActiveFilters}
          />
        </aside>

        {/* Results */}
        <div className="flex-1 min-w-0">
          {/* Toolbar */}
          <div className="flex items-center justify-between mb-5 gap-4 flex-wrap">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              <span className="font-medium text-gray-900 dark:text-white">{filtered.length}</span>{" "}
              véhicule{filtered.length !== 1 ? "s" : ""} disponible{filtered.length !== 1 ? "s" : ""}
            </p>
            <div className="flex items-center gap-2">
              {/* Mobile filters toggle */}
              <button
                className="lg:hidden flex items-center gap-2 h-9 px-3 text-sm border border-gray-200 dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                onClick={() => setFiltersOpen(!filtersOpen)}
              >
                Filtres
                {hasActiveFilters && (
                  <span className="h-2 w-2 rounded-full bg-primary" />
                )}
              </button>

              {/* Sort */}
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortOption)}
                className="h-9 px-3 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
              >
                {(Object.keys(SORT_LABELS) as SortOption[]).map((k) => (
                  <option key={k} value={k}>
                    {SORT_LABELS[k]}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Mobile filters panel */}
          {filtersOpen && (
            <div className="lg:hidden mb-6 border border-gray-200 dark:border-gray-800 rounded-xl p-4">
              <FiltersPanel
                filters={filters}
                setFilters={setFilters}
                toggleCategory={toggleCategory}
                resetFilters={resetFilters}
                hasActiveFilters={hasActiveFilters}
              />
            </div>
          )}

          {/* Active filter chips */}
          {hasActiveFilters && (
            <div className="flex flex-wrap gap-2 mb-4">
              {filters.categories.map((cat) => (
                <Badge
                  key={cat}
                  variant="success"
                  className="cursor-pointer"
                  onClick={() => toggleCategory(cat)}
                >
                  {cat} ×
                </Badge>
              ))}
              {filters.transmission && (
                <Badge
                  variant="success"
                  className="cursor-pointer"
                  onClick={() => setFilters((f) => ({ ...f, transmission: null }))}
                >
                  {filters.transmission} ×
                </Badge>
              )}
              {filters.airportDelivery && (
                <Badge
                  variant="success"
                  className="cursor-pointer"
                  onClick={() => setFilters((f) => ({ ...f, airportDelivery: false }))}
                >
                  Livraison aéroport ×
                </Badge>
              )}
              <button
                onClick={resetFilters}
                className="text-xs text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
              >
                Tout effacer
              </button>
            </div>
          )}

          {/* Car list */}
          {filtered.length === 0 ? (
            <div className="py-24 text-center">
              <p className="text-gray-400 dark:text-gray-600 mb-4">
                Aucun véhicule ne correspond à vos critères.
              </p>
              <Button variant="outline" onClick={resetFilters}>
                Réinitialiser les filtres
              </Button>
            </div>
          ) : (
            <div className="space-y-5">
              {filtered.map((car) => (
                <CarCard
                  key={car.id}
                  car={car}
                  pickupDate={pickupDate}
                  returnDate={returnDate}
                  isCheapest={car.id === cheapestId}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

interface FiltersPanelProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  toggleCategory: (cat: CarCategory) => void;
  resetFilters: () => void;
  hasActiveFilters: boolean;
}

function FiltersPanel({
  filters,
  setFilters,
  toggleCategory,
  resetFilters,
  hasActiveFilters,
}: FiltersPanelProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-900 dark:text-white">Filtres</h3>
        {hasActiveFilters && (
          <button
            onClick={resetFilters}
            className="text-xs text-primary hover:text-primary-700 transition-colors"
          >
            Effacer
          </button>
        )}
      </div>

      {/* Catégorie */}
      <div>
        <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
          Catégorie
        </p>
        <div className="space-y-1.5">
          {CATEGORIES.map((cat) => (
            <label key={cat} className="flex items-center gap-2.5 cursor-pointer group">
              <input
                type="checkbox"
                checked={filters.categories.includes(cat)}
                onChange={() => toggleCategory(cat)}
                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary/30 accent-primary"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                {cat}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Prix */}
      <div>
        <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">
          Prix / jour (DH)
        </p>
        <div className="flex items-center gap-2">
          <input
            type="number"
            min={0}
            max={filters.priceMax}
            value={filters.priceMin}
            onChange={(e) =>
              setFilters((f) => ({ ...f, priceMin: Number(e.target.value) }))
            }
            className="w-20 h-8 text-sm border border-gray-200 dark:border-gray-700 rounded-lg px-2 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
          />
          <span className="text-gray-400 text-sm">—</span>
          <input
            type="number"
            min={filters.priceMin}
            max={5000}
            value={filters.priceMax}
            onChange={(e) =>
              setFilters((f) => ({ ...f, priceMax: Number(e.target.value) }))
            }
            className="w-20 h-8 text-sm border border-gray-200 dark:border-gray-700 rounded-lg px-2 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
          />
        </div>
      </div>

      {/* Transmission */}
      <div>
        <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
          Transmission
        </p>
        <div className="space-y-1.5">
          {TRANSMISSIONS.map((t) => (
            <label key={t} className="flex items-center gap-2.5 cursor-pointer group">
              <input
                type="radio"
                name="transmission"
                checked={filters.transmission === t}
                onChange={() =>
                  setFilters((f) => ({
                    ...f,
                    transmission: f.transmission === t ? null : t,
                  }))
                }
                className="h-4 w-4 border-gray-300 text-primary focus:ring-primary/30 accent-primary"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                {t}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Agence */}
      <div>
        <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
          Agence
        </p>
        <div className="space-y-1.5">
          {agencies.map((ag) => (
            <label key={ag.id} className="flex items-center gap-2.5 cursor-pointer group">
              <input
                type="radio"
                name="agency"
                checked={filters.agencyId === ag.id}
                onChange={() =>
                  setFilters((f) => ({
                    ...f,
                    agencyId: f.agencyId === ag.id ? null : ag.id,
                  }))
                }
                className="h-4 w-4 border-gray-300 text-primary focus:ring-primary/30 accent-primary"
              />
              <span
                className={cn(
                  "text-sm text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors",
                  filters.agencyId === ag.id && "text-primary dark:text-primary"
                )}
              >
                {ag.name}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Livraison aéroport */}
      <label className="flex items-center gap-2.5 cursor-pointer group">
        <input
          type="checkbox"
          checked={filters.airportDelivery}
          onChange={(e) =>
            setFilters((f) => ({ ...f, airportDelivery: e.target.checked }))
          }
          className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary/30 accent-primary"
        />
        <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
          Livraison aéroport
        </span>
      </label>
    </div>
  );
}

export default function ResultsPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-7xl px-4 py-16 text-center text-gray-400">
          Chargement...
        </div>
      }
    >
      <ResultsContent />
    </Suspense>
  );
}

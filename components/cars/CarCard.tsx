import Link from "next/link";
import { Car } from "@/types";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { formatPrice, calcTotalDays } from "@/lib/utils";

interface CarCardProps {
  car: Car;
  pickupDate?: string;
  returnDate?: string;
  isCheapest?: boolean;
}

export function CarCard({ car, pickupDate, returnDate, isCheapest }: CarCardProps) {
  const days = calcTotalDays(pickupDate || "", returnDate || "");
  const total = car.pricePerDay * days;

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-5 flex flex-col sm:flex-row gap-5 shadow-card hover:shadow-card-hover hover:border-primary/30 transition-all duration-200">
      {/* Image placeholder */}
      <div className="sm:w-44 sm:shrink-0 h-36 sm:h-auto bg-[#F5F5F4] dark:bg-gray-800 rounded-xl flex flex-col items-center justify-center gap-2.5">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-12 h-12 text-gray-300 dark:text-gray-600"
        >
          <path d="M19 17H5a2 2 0 01-2-2v-3l2.5-5h13L21 12v3a2 2 0 01-2 2z" />
          <circle cx="7.5" cy="17" r="2" />
          <circle cx="16.5" cy="17" r="2" />
          <path d="M7 9.5h10" />
        </svg>
        <span className="text-xs text-gray-400 dark:text-gray-500 font-medium text-center px-2">
          {car.brand} {car.model}
        </span>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-between gap-4">
        <div>
          {/* Header */}
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="text-xs text-gray-400 dark:text-gray-500">{car.agency.name}</p>
              <h3 className="font-medium text-gray-900 dark:text-white mt-0.5">
                {car.brand} {car.model}{" "}
                <span className="font-normal text-gray-400 text-sm">{car.year}</span>
              </h3>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <span className="text-yellow-400 text-sm">★</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {car.agency.rating}
              </span>
              <span className="text-xs text-gray-400">({car.agency.reviewCount})</span>
            </div>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap gap-1.5 mt-3">
            <Badge variant="muted">{car.category}</Badge>
            <Badge variant="muted">{car.seats} places</Badge>
            <Badge variant="muted">{car.transmission}</Badge>
            {car.airportDelivery && (
              <Badge variant="success">Livraison aéroport</Badge>
            )}
            {car.unlimitedKm && (
              <Badge variant="muted">Km illimités</Badge>
            )}
            {isCheapest && (
              <Badge
                variant="success"
                className="bg-primary-100 text-primary-700 dark:bg-primary-900/20 dark:text-primary-400"
              >
                Meilleur prix
              </Badge>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-end justify-between gap-4 flex-wrap">
          <div className="text-xs text-gray-400 dark:text-gray-500 space-y-0.5">
            <p>Caution : {formatPrice(car.deposit)}</p>
            <p>Âge minimum : {car.minAge} ans</p>
          </div>
          <div className="flex items-end gap-4">
            <div className="text-right">
              <p className="text-2xl font-semibold text-primary">
                {formatPrice(car.pricePerDay)}
                <span className="text-sm text-gray-400 font-normal"> /jour</span>
              </p>
              {days > 1 && (
                <p className="text-xs text-gray-400">
                  Total {days} jours : {formatPrice(total)}
                </p>
              )}
            </div>
            <Link href={`/voiture/${car.id}`}>
              <Button variant="primary" size="md">Réserver</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

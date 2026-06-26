"use client";

import { useState } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { use } from "react";
import { cars } from "@/data/cars";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";
import { formatPrice, calcTotalDays } from "@/lib/utils";
import { cn } from "@/lib/utils";

const today = () => new Date().toISOString().split("T")[0];
const tomorrow = () => {
  const d = new Date();
  d.setDate(d.getDate() + 3);
  return d.toISOString().split("T")[0];
};

export default function CarDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const car = cars.find((c) => c.id === id);

  if (!car) notFound();

  return <CarDetail car={car} />;
}

function CarDetail({ car }: { car: (typeof cars)[0] }) {
  const [pickupDate, setPickupDate] = useState(today());
  const [returnDate, setReturnDate] = useState(tomorrow());
  const [pickupTime, setPickupTime] = useState("09:00");
  const [returnTime, setReturnTime] = useState("09:00");
  const [babySeat, setBabySeat] = useState(false);
  const [additionalDriver, setAdditionalDriver] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const days = calcTotalDays(pickupDate, returnDate);
  const baseTotal = car.pricePerDay * days;
  const babySeatFee = babySeat ? 50 * days : 0;
  const additionalDriverFee = additionalDriver ? 100 * days : 0;
  const total = baseTotal + babySeatFee + additionalDriverFee;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="mx-auto max-w-lg px-4 py-24 text-center">
        <div className="w-12 h-12 rounded-full bg-primary-50 dark:bg-primary-900/20 flex items-center justify-center mx-auto mb-6">
          <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-medium text-gray-900 dark:text-white mb-3">
          Réservation confirmée
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mb-8">
          Votre demande a bien été envoyée. {car.agency.name} vous contactera dans les prochaines heures pour confirmer les détails.
        </p>
        <Link href="/resultats">
          <Button variant="outline">Retour aux résultats</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-400 dark:text-gray-500 mb-8">
        <Link href="/" className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
          Accueil
        </Link>
        <span>/</span>
        <Link href="/resultats" className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
          Résultats
        </Link>
        <span>/</span>
        <span className="text-gray-700 dark:text-gray-300">
          {car.brand} {car.model}
        </span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left — vehicle info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Header */}
          <div>
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div>
                <p className="text-sm text-gray-400 dark:text-gray-500 mb-1">{car.agency.name}</p>
                <h1 className="text-3xl font-medium text-gray-900 dark:text-white">
                  {car.brand} {car.model}
                </h1>
                <p className="text-gray-400 dark:text-gray-500 mt-1">{car.year}</p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-medium text-primary">
                  {formatPrice(car.pricePerDay)}
                </p>
                <p className="text-sm text-gray-400">par jour</p>
              </div>
            </div>

            {/* Agency rating */}
            <div className="flex items-center gap-2 mt-4">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <svg
                    key={s}
                    className={cn(
                      "w-4 h-4",
                      s <= Math.round(car.agency.rating)
                        ? "text-yellow-400"
                        : "text-gray-200 dark:text-gray-700"
                    )}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {car.agency.rating}
              </span>
              <span className="text-sm text-gray-400">
                · {car.agency.reviewCount} avis
              </span>
            </div>
          </div>

          {/* Photo placeholder */}
          <div className="h-64 sm:h-80 bg-gray-100 dark:bg-gray-800 rounded-xl flex items-center justify-center">
            <p className="text-sm text-gray-400 dark:text-gray-600">
              {car.brand} {car.model} — photo à venir
            </p>
          </div>

          {/* Specs */}
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6">
            <h2 className="text-base font-medium text-gray-900 dark:text-white mb-4">
              Caractéristiques
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <Spec label="Catégorie" value={car.category} />
              <Spec label="Transmission" value={car.transmission} />
              <Spec label="Places" value={`${car.seats}`} />
              <Spec label="Kilométrage" value={car.unlimitedKm ? "Illimité" : "Limité"} />
            </div>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {car.features.map((f) => (
                <Badge key={f} variant="muted">{f}</Badge>
              ))}
            </div>
          </div>

          {/* Conditions */}
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6">
            <h2 className="text-base font-medium text-gray-900 dark:text-white mb-4">
              Conditions de location
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
              <CondItem
                label="Caution"
                value={formatPrice(car.deposit)}
                sub="Remboursée à la restitution"
              />
              <CondItem
                label="Age minimum"
                value={`${car.minAge} ans`}
                sub="Permis valide requis"
              />
              <CondItem
                label="Kilométrage"
                value={car.unlimitedKm ? "Illimité" : "Limité"}
                sub={car.unlimitedKm ? "Inclus dans le prix" : "Supplément selon usage"}
              />
            </div>
            {car.airportDelivery && (
              <div className="mt-4 p-3 bg-primary-50 dark:bg-primary-900/20 rounded-lg">
                <p className="text-sm text-primary-700 dark:text-primary-300 font-medium">
                  Livraison aéroport disponible
                </p>
                <p className="text-xs text-primary-500 dark:text-primary-400 mt-0.5">
                  Ce véhicule peut être livré directement à l&apos;aéroport de votre arrivée.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Right — booking form */}
        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6">
              <h2 className="text-base font-medium text-gray-900 dark:text-white mb-6">
                Réserver ce véhicule
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Dates */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">
                      Prise en charge
                    </label>
                    <input
                      type="date"
                      value={pickupDate}
                      min={today()}
                      onChange={(e) => setPickupDate(e.target.value)}
                      required
                      className="w-full h-10 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">
                      Retour
                    </label>
                    <input
                      type="date"
                      value={returnDate}
                      min={pickupDate}
                      onChange={(e) => setReturnDate(e.target.value)}
                      required
                      className="w-full h-10 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <select
                    value={pickupTime}
                    onChange={(e) => setPickupTime(e.target.value)}
                    className="h-10 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                  >
                    {TIMES.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                  <select
                    value={returnTime}
                    onChange={(e) => setReturnTime(e.target.value)}
                    className="h-10 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                  >
                    {TIMES.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>

                {/* Price summary */}
                <div className="bg-surface-muted dark:bg-gray-800 rounded-lg p-4 space-y-2">
                  <PriceLine label={`${formatPrice(car.pricePerDay)} × ${days} jour${days > 1 ? "s" : ""}`} value={formatPrice(baseTotal)} />
                  {babySeat && <PriceLine label="Siège bébé" value={formatPrice(babySeatFee)} />}
                  {additionalDriver && <PriceLine label="Conducteur additionnel" value={formatPrice(additionalDriverFee)} />}
                  <div className="h-px bg-gray-200 dark:bg-gray-700 my-1" />
                  <PriceLine label="Total" value={formatPrice(total)} bold />
                </div>

                <div className="h-px bg-gray-100 dark:bg-gray-800" />

                {/* Personal info */}
                <div className="grid grid-cols-2 gap-3">
                  <Input
                    label="Prénom"
                    placeholder="Mohamed"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                  <Input
                    label="Nom"
                    placeholder="Alami"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                </div>
                <Input
                  label="Email"
                  type="email"
                  placeholder="vous@exemple.ma"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Input
                  label="Téléphone"
                  type="tel"
                  placeholder="+212 6 00 00 00 00"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />

                {/* Options */}
                <div className="space-y-2">
                  <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Options</p>
                  <Option
                    label="Siège bébé"
                    sub={`+${formatPrice(50)}/jour`}
                    checked={babySeat}
                    onChange={setBabySeat}
                  />
                  <Option
                    label="Conducteur additionnel"
                    sub={`+${formatPrice(100)}/jour`}
                    checked={additionalDriver}
                    onChange={setAdditionalDriver}
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">
                    Remarques (optionnel)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Heure d'arrivée, demandes spéciales..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary resize-none"
                  />
                </div>

                <Button type="submit" size="lg" className="w-full" loading={loading}>
                  Confirmer la réservation
                </Button>

                <p className="text-xs text-gray-400 dark:text-gray-500 text-center">
                  Sans paiement immédiat — l&apos;agence vous contacte sous 2h.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-gray-400 dark:text-gray-500">{label}</p>
      <p className="text-sm font-medium text-gray-900 dark:text-white mt-0.5">{value}</p>
    </div>
  );
}

function CondItem({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div>
      <p className="text-xs text-gray-400 dark:text-gray-500">{label}</p>
      <p className="font-medium text-gray-900 dark:text-white mt-0.5">{value}</p>
      <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{sub}</p>
    </div>
  );
}

function PriceLine({
  label,
  value,
  bold,
}: {
  label: string;
  value: string;
  bold?: boolean;
}) {
  return (
    <div className={cn("flex justify-between text-sm", bold && "font-medium")}>
      <span className={bold ? "text-gray-900 dark:text-white" : "text-gray-500 dark:text-gray-400"}>
        {label}
      </span>
      <span className={bold ? "text-primary" : "text-gray-700 dark:text-gray-300"}>
        {value}
      </span>
    </div>
  );
}

function Option({
  label,
  sub,
  checked,
  onChange,
}: {
  label: string;
  sub: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex items-center justify-between gap-3 p-3 border border-gray-200 dark:border-gray-700 rounded-lg cursor-pointer hover:border-primary/30 transition-colors">
      <div>
        <p className="text-sm text-gray-900 dark:text-white">{label}</p>
        <p className="text-xs text-gray-400">{sub}</p>
      </div>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="h-4 w-4 rounded border-gray-300 text-primary accent-primary focus:ring-primary/30"
      />
    </label>
  );
}

const TIMES = [
  "00:00", "01:00", "02:00", "03:00", "04:00", "05:00",
  "06:00", "07:00", "08:00", "09:00", "10:00", "11:00",
  "12:00", "13:00", "14:00", "15:00", "16:00", "17:00",
  "18:00", "19:00", "20:00", "21:00", "22:00", "23:00",
];

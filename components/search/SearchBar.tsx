"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { LOCATIONS } from "@/data/cars";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  compact?: boolean;
  defaultValues?: {
    location?: string;
    pickupDate?: string;
    pickupTime?: string;
    returnDate?: string;
    returnTime?: string;
  };
}

const today = () => new Date().toISOString().split("T")[0];
const tomorrow = () => {
  const d = new Date();
  d.setDate(d.getDate() + 3);
  return d.toISOString().split("T")[0];
};

export function SearchBar({ compact = false, defaultValues }: SearchBarProps) {
  const router = useRouter();
  const [location, setLocation] = useState(defaultValues?.location || "");
  const [pickupDate, setPickupDate] = useState(defaultValues?.pickupDate || today());
  const [pickupTime, setPickupTime] = useState(defaultValues?.pickupTime || "09:00");
  const [returnDate, setReturnDate] = useState(defaultValues?.returnDate || tomorrow());
  const [returnTime, setReturnTime] = useState(defaultValues?.returnTime || "09:00");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const suggestions = LOCATIONS.filter((l) =>
    l.toLowerCase().includes(location.toLowerCase())
  ).slice(0, 6);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams({
      location,
      pickupDate,
      pickupTime,
      returnDate,
      returnTime,
    });
    router.push(`/resultats?${params.toString()}`);
  }

  const fieldClass =
    "h-12 w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors";

  return (
    <form
      onSubmit={handleSearch}
      className={cn(
        "bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-card",
        compact ? "p-4" : "p-6"
      )}
    >
      <div
        className={cn(
          "grid gap-3",
          compact
            ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-5"
            : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-5"
        )}
      >
        {/* Lieu de prise */}
        <div className="relative sm:col-span-2 lg:col-span-1" ref={wrapperRef}>
          <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">
            Lieu de prise en charge
          </label>
          <input
            ref={inputRef}
            type="text"
            placeholder="Ville ou aéroport"
            value={location}
            onChange={(e) => {
              setLocation(e.target.value);
              setShowSuggestions(true);
            }}
            onFocus={() => setShowSuggestions(true)}
            required
            className={fieldClass}
          />
          {showSuggestions && suggestions.length > 0 && location.length > 0 && (
            <ul className="absolute top-full left-0 right-0 z-50 mt-1 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-card-hover overflow-hidden">
              {suggestions.map((s) => (
                <li key={s}>
                  <button
                    type="button"
                    className="w-full text-left px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    onClick={() => {
                      setLocation(s);
                      setShowSuggestions(false);
                    }}
                  >
                    {s}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Date prise */}
        <div>
          <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">
            Date de prise
          </label>
          <div className="grid grid-cols-2 gap-2">
            <input
              type="date"
              value={pickupDate}
              min={today()}
              onChange={(e) => setPickupDate(e.target.value)}
              required
              className={cn(fieldClass, "col-span-1")}
            />
            <select
              value={pickupTime}
              onChange={(e) => setPickupTime(e.target.value)}
              className={cn(fieldClass, "col-span-1")}
            >
              {TIMES.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Date retour */}
        <div>
          <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">
            Date de retour
          </label>
          <div className="grid grid-cols-2 gap-2">
            <input
              type="date"
              value={returnDate}
              min={pickupDate}
              onChange={(e) => setReturnDate(e.target.value)}
              required
              className={cn(fieldClass, "col-span-1")}
            />
            <select
              value={returnTime}
              onChange={(e) => setReturnTime(e.target.value)}
              className={cn(fieldClass, "col-span-1")}
            >
              {TIMES.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Bouton */}
        <div className="flex items-end">
          <Button type="submit" size="lg" className="w-full h-12">
            Comparer
          </Button>
        </div>
      </div>
    </form>
  );
}

const TIMES = [
  "00:00", "01:00", "02:00", "03:00", "04:00", "05:00",
  "06:00", "07:00", "08:00", "09:00", "10:00", "11:00",
  "12:00", "13:00", "14:00", "15:00", "16:00", "17:00",
  "18:00", "19:00", "20:00", "21:00", "22:00", "23:00",
];

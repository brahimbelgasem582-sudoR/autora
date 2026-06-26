export type CarCategory = "Citadine" | "Berline" | "SUV" | "4x4" | "Utilitaire";
export type Transmission = "Manuelle" | "Automatique";

export interface Agency {
  id: string;
  name: string;
  rating: number;
  reviewCount: number;
  cities: string[];
  airportDelivery: boolean;
}

export interface Car {
  id: string;
  brand: string;
  model: string;
  year: number;
  category: CarCategory;
  transmission: Transmission;
  seats: number;
  pricePerDay: number;
  agency: Agency;
  images: string[];
  airportDelivery: boolean;
  unlimitedKm: boolean;
  minAge: number;
  deposit: number;
  features: string[];
  available: boolean;
}

export interface SearchParams {
  location: string;
  pickupDate: string;
  pickupTime: string;
  returnDate: string;
  returnTime: string;
}

export interface BookingFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  pickupDate: string;
  pickupTime: string;
  returnDate: string;
  returnTime: string;
  babySeat: boolean;
  additionalDriver: boolean;
  notes: string;
}

export interface FilterState {
  categories: CarCategory[];
  priceMin: number;
  priceMax: number;
  transmission: Transmission | null;
  agencyId: string | null;
  airportDelivery: boolean;
}

export type SortOption = "price_asc" | "price_desc" | "rating_desc";

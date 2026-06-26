"use client";

import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { CITIES } from "@/data/cars";

const BENEFITS = [
  {
    title: "Remplissez votre flotte toute l'année",
    body: "Accédez à des milliers de clients qui recherchent une voiture au Maroc chaque mois, y compris hors saison.",
  },
  {
    title: "Audit gratuit de votre offre",
    body: "Notre équipe analyse votre flotte, vos tarifs et votre présence en ligne, et vous propose un plan d'action personnalisé.",
  },
  {
    title: "Zéro commission cachée",
    body: "Notre modèle est transparent : vous définissez vos prix, nous vous apportons les réservations.",
  },
  {
    title: "Tableau de bord simple",
    body: "Gérez vos disponibilités, vos réservations et vos avis depuis une interface pensée pour les agences.",
  },
];

const STATS = [
  { value: "12 000+", label: "recherches par mois" },
  { value: "4,6", label: "note moyenne des partenaires" },
  { value: "40+", label: "agences partenaires" },
];

export default function PartenairePage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [agency, setAgency] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
  }

  return (
    <main>
      {/* Hero */}
      <section className="bg-surface-muted dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="max-w-2xl">
            <p className="text-sm font-medium text-primary mb-4 tracking-wide uppercase">
              Pour les agences de location
            </p>
            <h1 className="text-4xl sm:text-5xl font-medium text-gray-900 dark:text-white mb-5">
              Développez votre activité avec Autora
            </h1>
            <p className="text-lg text-gray-500 dark:text-gray-400 mb-8">
              Rejoignez la plateforme de référence pour la location de voitures au Maroc. Audit gratuit de votre offre, sans engagement.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap gap-8">
              {STATS.map((s) => (
                <div key={s.label}>
                  <p className="text-2xl font-medium text-gray-900 dark:text-white">{s.value}</p>
                  <p className="text-sm text-gray-400 dark:text-gray-500 mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left — benefits */}
          <div>
            <h2 className="text-2xl font-medium text-gray-900 dark:text-white mb-8">
              Pourquoi rejoindre Autora ?
            </h2>
            <div className="space-y-6">
              {BENEFITS.map((b, i) => (
                <div key={i} className="flex gap-4">
                  <div className="shrink-0 w-8 h-8 rounded-full bg-primary-50 dark:bg-primary-900/20 flex items-center justify-center text-primary text-xs font-medium">
                    {i + 1}
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                      {b.title}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{b.body}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Social proof */}
            <div className="mt-10 p-5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl">
              <p className="text-sm text-gray-600 dark:text-gray-300 italic leading-relaxed">
                &ldquo;Depuis qu&apos;on a rejoint Autora, notre taux d&apos;occupation a augmenté de 35% en trois mois. L&apos;interface est claire et le support réactif.&rdquo;
              </p>
              <div className="mt-3 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-xs font-medium text-gray-500">
                  AB
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-900 dark:text-white">Ahmed B.</p>
                  <p className="text-xs text-gray-400 dark:text-gray-500">Directeur, Atlas Auto — Casablanca</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right — form */}
          <div>
            {submitted ? (
              <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-8 text-center">
                <div className="w-12 h-12 rounded-full bg-primary-50 dark:bg-primary-900/20 flex items-center justify-center mx-auto mb-5">
                  <svg
                    className="w-6 h-6 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
                  Demande reçue
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Notre équipe partenaires vous contactera dans les 24h pour organiser l&apos;audit gratuit de votre agence.
                </p>
              </div>
            ) : (
              <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6">
                <h2 className="text-base font-medium text-gray-900 dark:text-white mb-6">
                  Demander un audit gratuit
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
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
                    label="Nom de l'agence"
                    placeholder="Atlas Auto"
                    value={agency}
                    onChange={(e) => setAgency(e.target.value)}
                    required
                  />

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                      Ville principale
                    </label>
                    <select
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      required
                      className="w-full h-10 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                    >
                      <option value="" disabled>
                        Sélectionner une ville
                      </option>
                      {CITIES.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>

                  <Input
                    label="Téléphone"
                    type="tel"
                    placeholder="+212 6 00 00 00 00"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />

                  <Input
                    label="Email professionnel"
                    type="email"
                    placeholder="contact@agence.ma"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />

                  <Button type="submit" size="lg" className="w-full" loading={loading}>
                    Demander l&apos;audit gratuit
                  </Button>

                  <p className="text-xs text-center text-gray-400 dark:text-gray-500">
                    Sans engagement. Réponse sous 24h.
                  </p>
                </form>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

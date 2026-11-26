"use client";

import { useEffect, useState } from "react";
import { api } from "../lib/api";

type AreaPrice = {
  zone_id: string;
  zone_name: string;
  postal_code: string;
  price_paise: number | null;
  rule_id: string | null;
};
type PackagePrice = {
  id: string;
  name: string;
  pricing_model: "FIXED_PRICE" | "INSPECTION_BASED";
  duration_minutes: number;
  is_active: boolean;
  original_price_paise: number | null;
  zones: AreaPrice[];
};
type PriceSettings = {
  service_id: string;
  service_name: string;
  starting_price_paise: number | null;
  zones: Array<{ id: string; name: string; postal_code: string }>;
  packages: PackagePrice[];
};
type PriceDraft = {
  original: string;
  duration: string;
  activate: boolean;
  common: string;
};

const rupees = (paise: number | null) => paise == null ? "" : String(paise / 100);
const money = (value: string): number | null => {
  const trimmed = value.trim();
  return /^\d+(?:\.\d{1,2})?$/.test(trimmed) ? Math.round(Number(trimmed) * 100) : null;
};
const inputClass = "mt-1 h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none focus:border-[#2c5270] focus:ring-2 focus:ring-[#2c5270]/15 disabled:bg-slate-50";

function makeDrafts(data: PriceSettings): Record<string, PriceDraft> {
  const packages = data.packages.length ? data.packages : [{
    id: "new", name: data.service_name, pricing_model: "FIXED_PRICE" as const,
    duration_minutes: 60, is_active: true, original_price_paise: null,
    zones: data.zones.map((zone) => ({
      zone_id: zone.id, zone_name: zone.name, postal_code: zone.postal_code,
      price_paise: null, rule_id: null,
    })),
  }];
  return Object.fromEntries(packages.map((pkg) => [pkg.id, {
    original: rupees(pkg.original_price_paise),
    duration: String(pkg.duration_minutes || 60),
    activate: pkg.is_active,
    common: rupees(pkg.zones.find((zone) => zone.price_paise != null)?.price_paise ?? null),
  }]));
}

export function ServicePricingEditor({
  serviceId, canEdit, onSaved,
}: {
  serviceId: string;
  canEdit: boolean;
  onSaved: () => void;
}) {
  const [data, setData] = useState<PriceSettings | null>(null);
  const [drafts, setDrafts] = useState<Record<string, PriceDraft>>({});
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  useEffect(() => {
    let current = true;
    setLoading(true);
    setError("");
    setData(null);
    void api<PriceSettings>(`/admin/services/${serviceId}/price-settings/`)
      .then((result) => {
        if (!current) return;
        setData(result);
        setDrafts(makeDrafts(result));
      })
      .catch((err) => {
        if (current) setError(err instanceof Error ? err.message : "Could not load service prices.");
      })
      .finally(() => {
        if (current) setLoading(false);
      });
    return () => { current = false; };
  }, [serviceId]);

  const changeDraft = (packageId: string, patch: Partial<PriceDraft>) => {
    setDrafts((current) => ({
      ...current,
      [packageId]: { ...current[packageId], ...patch },
    }));
    setNotice("");
  };

  const save = async (pkg: PackagePrice) => {
    if (!data) return;
    const draft = drafts[pkg.id];
    if (!draft) return;
    setError("");
    setNotice("");
    const original = draft.original.trim() ? money(draft.original) : null;
    if (draft.original.trim() && (original == null || original <= 0)) {
      setError("Enter a valid original price or leave it blank to remove the crossed out price.");
      return;
    }
    const commonPrice = money(draft.common);
    if (commonPrice == null || commonPrice <= 0) {
      setError("Enter a valid selling price for all service areas.");
      return;
    }
    if (original != null && original <= commonPrice) {
      setError("Original price must be higher than the selling price.");
      return;
    }
    const duration = Number(draft.duration);
    if (pkg.id === "new" && (!Number.isInteger(duration) || duration < 15 || duration > 1440)) {
      setError("Enter an estimated duration from 15 to 1440 minutes.");
      return;
    }
    setSavingId(pkg.id);
    try {
      const result = await api<PriceSettings>(`/admin/services/${serviceId}/price-settings/`, "PATCH", {
        package_id: pkg.id === "new" ? null : pkg.id,
        duration_minutes: pkg.id === "new" ? duration : undefined,
        original_price_paise: original,
        common_price_paise: commonPrice,
        activate_package: draft.activate,
      });
      setData(result);
      setDrafts(makeDrafts(result));
      setNotice(`Pricing saved for ${pkg.name}.`);
      onSaved();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save prices.");
    } finally {
      setSavingId(null);
    }
  };

  if (loading) return <p className="rounded-xl border border-slate-200 bg-white p-4 text-xs text-slate-500">Loading package prices...</p>;
  if (!data) return <p role="alert" className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-xs text-rose-700">{error || "Pricing is unavailable."}</p>;

  const packages: PackagePrice[] = data.packages.length ? data.packages : [{
    id: "new", name: data.service_name, pricing_model: "FIXED_PRICE",
    duration_minutes: 60, is_active: true, original_price_paise: null,
    zones: data.zones.map((zone) => ({
      zone_id: zone.id, zone_name: zone.name, postal_code: zone.postal_code,
      price_paise: null, rule_id: null,
    })),
  }];

  return (
    <section className="space-y-4 rounded-2xl border border-[#e7e5df] bg-white p-6 shadow-xs" aria-labelledby="service-pricing-heading">
      <div>
        <h3 id="service-pricing-heading" className="text-sm font-bold text-slate-900">Customer price and crossed out price</h3>
        <p className="mt-1 text-xs text-slate-500">Set one selling price for all service areas and an optional higher original price.</p>
      </div>
      {error && <p role="alert" className="rounded-lg bg-rose-50 p-3 text-xs text-rose-700">{error}</p>}
      {notice && <p role="status" className="rounded-lg bg-emerald-50 p-3 text-xs text-emerald-800">{notice}</p>}
      {packages.map((pkg) => {
        const draft = drafts[pkg.id];
        if (!draft) return null;
        return (
          <div key={pkg.id} className="space-y-4 rounded-xl border border-slate-200 bg-[#faf9f6] p-4">
            <div>
              <h4 className="text-sm font-bold text-slate-900">{pkg.name}</h4>
              <p className="text-xs text-slate-500">{pkg.id === "new" ? "Create the first bookable package for this service." : pkg.is_active ? "Active package" : "Inactive package"}</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="text-xs font-semibold text-slate-700">Original price (₹), optional
                <input type="number" min="0" step="0.01" value={draft.original} disabled={!canEdit || savingId !== null}
                  onChange={(event) => changeDraft(pkg.id, { original: event.target.value })} placeholder="800" className={inputClass} />
              </label>
              {pkg.id === "new" && <label className="text-xs font-semibold text-slate-700">Estimated duration (minutes)
                <input type="number" min="15" max="1440" step="1" value={draft.duration} disabled={!canEdit || savingId !== null}
                  onChange={(event) => changeDraft(pkg.id, { duration: event.target.value })} className={inputClass} />
              </label>}
            </div>
            <label className="block text-xs font-semibold text-slate-700">Selling price for all service areas (₹)
              <input type="number" min="0.01" step="0.01" value={draft.common}
                disabled={!canEdit || savingId !== null}
                onChange={(event) => changeDraft(pkg.id, { common: event.target.value })}
                placeholder="650" className={inputClass} />
            </label>
            {!pkg.is_active && pkg.id !== "new" && <label className="flex items-center gap-2 text-xs font-semibold text-slate-700">
              <input type="checkbox" checked={draft.activate} disabled={!canEdit || savingId !== null}
                onChange={(event) => changeDraft(pkg.id, { activate: event.target.checked })} />
              Activate this package for customers
            </label>}
            {canEdit && <button type="button" disabled={savingId !== null} onClick={() => void save(pkg)}
              className="rounded-xl bg-[#2c5270] px-4 py-2 text-xs font-bold text-white hover:bg-[#23425b] disabled:opacity-50">
              {savingId === pkg.id ? "Saving prices..." : "Save package prices"}
            </button>}
          </div>
        );
      })}
    </section>
  );
}

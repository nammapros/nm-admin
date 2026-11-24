"use client";

import { useCallback, useEffect, useState } from "react";
import { api } from "../lib/api";

type PaymentPolicy = "PAY_AT_VISIT" | "PREPAID" | "ADVANCE";
type AdvanceType = "NONE" | "FIXED" | "PERCENTAGE";

type PriceRule = {
  id: string;
  package_name: string;
  zone_name: string;
  base_paise: number;
  inspection_paise: number;
  fee_paise: number;
  tax_paise: number;
  payment_policy: PaymentPolicy;
  advance_type: AdvanceType;
  advance_amount_paise: number;
  advance_percentage: number;
};

const rupees = (paise: number) =>
  `₹${(paise / 100).toLocaleString("en-IN", { maximumFractionDigits: 2 })}`;

function PricePaymentRow({
  rule,
  canEdit,
  onSaved,
}: {
  rule: PriceRule;
  canEdit: boolean;
  onSaved: () => Promise<void>;
}) {
  const [policy, setPolicy] = useState<PaymentPolicy>(rule.payment_policy);
  const [advanceType, setAdvanceType] = useState<"FIXED" | "PERCENTAGE">(
    rule.advance_type === "PERCENTAGE" ? "PERCENTAGE" : "FIXED"
  );
  const [value, setValue] = useState(
    rule.advance_type === "PERCENTAGE"
      ? String(rule.advance_percentage)
      : String(rule.advance_amount_paise / 100)
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const total = rule.base_paise + rule.inspection_paise + rule.fee_paise + rule.tax_paise;
  const unchanged =
    policy === rule.payment_policy &&
    (policy !== "ADVANCE" ||
      (advanceType === rule.advance_type &&
        Number(value) ===
          (advanceType === "FIXED" ? rule.advance_amount_paise / 100 : rule.advance_percentage)));

  const save = async () => {
    setError("");
    const amount = Number(value);
    if (policy === "ADVANCE" && (!Number.isFinite(amount) || amount <= 0)) {
      setError("Enter an advance greater than zero.");
      return;
    }
    if (policy === "ADVANCE" && advanceType === "PERCENTAGE" && (amount > 100 || !Number.isInteger(amount))) {
      setError("Enter a whole percentage from 1 to 100.");
      return;
    }
    if (policy === "ADVANCE" && advanceType === "FIXED" && Math.round(amount * 100) > total) {
      setError("Advance cannot exceed the booking price.");
      return;
    }
    setSaving(true);
    try {
      await api(`/admin/pricing/${rule.id}/`, "PATCH", {
        payment_policy: policy,
        advance_type: policy === "ADVANCE" ? advanceType : "NONE",
        advance_amount_paise: policy === "ADVANCE" && advanceType === "FIXED" ? Math.round(amount * 100) : 0,
        advance_percentage: policy === "ADVANCE" && advanceType === "PERCENTAGE" ? amount : 0,
      });
      await onSaved();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not update booking payment.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <div>
          <p className="text-sm font-bold text-slate-900">{rule.package_name}</p>
          <p className="text-xs text-slate-500">{rule.zone_name}</p>
        </div>
        <span className="text-sm font-bold text-slate-800">Booking price {rupees(total)}</span>
      </div>
      <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_auto] sm:items-end">
        <label className="text-xs font-semibold text-slate-700">
          Payment at booking
          <select
            value={policy}
            disabled={!canEdit || saving}
            onChange={(event) => setPolicy(event.target.value as PaymentPolicy)}
            className="mt-1 block h-10 w-full rounded-lg border border-slate-300 bg-white px-2 text-sm"
          >
            <option value="PAY_AT_VISIT">Pay at visit</option>
            <option value="ADVANCE">Pay advance online</option>
            <option value="PREPAID">Pay full amount online</option>
          </select>
        </label>
        {policy === "ADVANCE" && (
          <>
            <label className="text-xs font-semibold text-slate-700">
              Advance type
              <select
                value={advanceType}
                disabled={!canEdit || saving}
                onChange={(event) => {
                  setAdvanceType(event.target.value as "FIXED" | "PERCENTAGE");
                  setValue("");
                }}
                className="mt-1 block h-10 w-full rounded-lg border border-slate-300 bg-white px-2 text-sm"
              >
                <option value="FIXED">Fixed amount</option>
                <option value="PERCENTAGE">Percentage</option>
              </select>
            </label>
            <label className="text-xs font-semibold text-slate-700">
              {advanceType === "FIXED" ? "Advance (₹)" : "Advance (%)"}
              <input
                type="number"
                min={advanceType === "FIXED" ? "0.01" : "1"}
                max={advanceType === "FIXED" ? String(total / 100) : "100"}
                step={advanceType === "FIXED" ? "0.01" : "1"}
                value={value}
                disabled={!canEdit || saving}
                onChange={(event) => setValue(event.target.value)}
                className="mt-1 block h-10 w-full rounded-lg border border-slate-300 px-3 text-sm"
              />
            </label>
          </>
        )}
        {canEdit && (
          <button
            type="button"
            disabled={saving || unchanged}
            onClick={() => void save()}
            className="h-10 rounded-lg bg-[#961b36] px-4 text-xs font-bold text-white disabled:opacity-50"
          >
            {saving ? "Saving…" : "Save payment"}
          </button>
        )}
      </div>
      {error && <p role="alert" className="mt-2 text-xs text-red-700">{error}</p>}
    </div>
  );
}

export function ServiceAdvanceEditor({
  serviceId,
  canEdit,
}: {
  serviceId: string;
  canEdit: boolean;
}) {
  const [rules, setRules] = useState<PriceRule[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadRules = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const all: PriceRule[] = [];
      let page = 1;
      let count = 0;
      do {
        const result = await api<{ count: number; results: PriceRule[] }>(
          `/admin/pricing/?service_id=${encodeURIComponent(serviceId)}&page=${page}`
        );
        all.push(...result.results);
        count = result.count;
        if (result.results.length === 0) break;
        page += 1;
      } while (all.length < count);
      setRules(all);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load booking payments.");
    } finally {
      setLoading(false);
    }
  }, [serviceId]);

  useEffect(() => {
    void loadRules();
  }, [loadRules]);

  return (
    <section className="rounded-2xl border border-[#e7e5df] bg-[#faf9f6] p-5">
      <h3 className="text-sm font-bold text-slate-900">Advance payment for bookings</h3>
      <p className="mt-1 text-xs text-slate-600">
        Set what customers pay when booking each service option and area. The remaining balance is due at the visit.
      </p>
      {loading ? (
        <p className="mt-4 text-xs text-slate-500">Loading payment settings…</p>
      ) : error ? (
        <p role="alert" className="mt-4 text-xs text-red-700">{error}</p>
      ) : rules.length === 0 ? (
        <p className="mt-4 text-xs text-slate-600">
          No active package pricing exists for this service. Add a package and active price in Pricing first.
        </p>
      ) : (
        <div className="mt-4 space-y-3">
          {rules.map((rule) => (
            <PricePaymentRow key={rule.id} rule={rule} canEdit={canEdit} onSaved={loadRules} />
          ))}
        </div>
      )}
    </section>
  );
}

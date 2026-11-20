"use client";

import React, { useState } from "react";
import { User, Lock, Eye, EyeOff, Loader2 } from "lucide-react";

export function AdminLoginPage({
  onSignIn,
  busy,
  error,
}: {
  onSignIn: (identifier: string, pass: string) => Promise<void>;
  busy: boolean;
  error?: string;
}) {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [keepSignedIn, setKeepSignedIn] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (busy || !identifier.trim() || !password) return;
    void onSignIn(identifier.trim(), password);
  };

  return (
    <main className="relative min-h-screen w-full flex flex-col lg:flex-row bg-[#530e1f] overflow-hidden selection:bg-[#961b36] selection:text-white">
      {/* ===================================================================== */}
      {/* LEFT SECTION (HERO & BRANDING)                                        */}
      {/* ===================================================================== */}
      <section className="relative flex-1 flex flex-col justify-between p-6 sm:p-10 lg:p-14 lg:pr-8 text-white min-h-[500px] lg:min-h-screen z-10">
        {/* Subtle Watermark Vector Illustrations (Bottom Left) */}
        <div className="pointer-events-none absolute bottom-0 left-0 z-0 opacity-[0.06] max-w-[480px] select-none p-6">
          <svg viewBox="0 0 450 360" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-full h-auto text-white">
            {/* Outline Sofa */}
            <path d="M40 260 h300 v35 h-20 v18 h-18 v-18 h-224 v18 h-18 v-18 h-20 z" />
            <path d="M40 260 v-70 a18 18 0 0 1 18 -18 h28 v50 h208 v-50 h28 a18 18 0 0 1 18 18 v70" />
            <path d="M86 172 v-35 a28 28 0 0 1 28 -28 h152 a28 28 0 0 1 28 28 v35" />
            {/* Hammer Outline */}
            <path d="M60 80 l35 35 m-8 -26 l-45 45 a9 9 0 0 0 13 13 l45 -45" />
            <path d="M96 54 l14 14 -14 14 -14 -14 z" />
            {/* Wrench Outline */}
            <path d="M220 70 l-45 45 a9 9 0 0 0 13 13 l45 -45 m-18 -27 a18 18 0 0 1 18 18 l-9 9 -14 -14 9 -9" />
          </svg>
        </div>

        {/* Top Header */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="text-2xl font-black tracking-tight text-white">namma</span>
            <span className="rounded-md bg-[#961b36] px-2 py-0.5 text-2xl font-black tracking-tight text-white shadow-2xs">
              pros.
            </span>
          </div>
          <span className="text-white/40 font-light text-xl">|</span>
          <span className="text-sm font-medium tracking-wide text-white/90">Admin Panel</span>
        </div>

        {/* Hero Title & Subtitle */}
        <div className="relative z-10 mt-10 sm:mt-14 lg:mt-18 max-w-xl">
          <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold tracking-tight text-white leading-tight">
            India&apos;s trusted home service
          </h1>
          <p className="mt-2 text-sm sm:text-base font-normal text-white/80">
            Managing the platform that powers home service
          </p>
        </div>

        {/* Technician Duo Cutout Image */}
        <div className="relative z-10 mt-auto pt-6 flex justify-start items-end max-w-md lg:max-w-lg">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/brand/hero-technicians-pair.webp"
            alt="NammaPros Technicians"
            className="w-full max-w-[380px] sm:max-w-[420px] lg:max-w-[460px] object-contain drop-shadow-2xl"
          />
        </div>
      </section>

      {/* ===================================================================== */}
      {/* RIGHT SECTION (LOGIN CARD)                                            */}
      {/* ===================================================================== */}
      <section className="relative lg:w-[480px] xl:w-[530px] shrink-0 bg-[#f5f6f9] flex items-center justify-center p-6 sm:p-10 lg:p-12 z-20">
        {/* White Rounded Card */}
        <div className="w-full max-w-[410px] rounded-3xl bg-white p-7 sm:p-9 shadow-[0_20px_50px_rgba(0,0,0,0.08)] border border-slate-100">
          {/* Card Top Logo */}
          <div className="flex items-center justify-center gap-1">
            <span className="text-2xl font-black text-slate-900 tracking-tight">namma</span>
            <span className="rounded-md bg-[#961b36] px-2 py-0.5 text-2xl font-black text-white tracking-tight">
              pros.
            </span>
          </div>

          <div className="mt-4 text-center">
            <h2 className="text-2xl font-extrabold text-[#540e1e] tracking-tight">Admin Login</h2>
            <p className="mt-1 text-xs text-slate-500">Sign in to access the management panel.</p>
          </div>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            {/* Email / Username Field */}
            <div>
              <label htmlFor="admin-identifier" className="block text-xs font-semibold text-slate-700 mb-1.5">
                Email / Username
              </label>
              <div className="relative flex items-center rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 transition focus-within:border-[#961b36] focus-within:ring-2 focus-within:ring-[#961b36]/20 shadow-2xs">
                <User className="h-4 w-4 text-slate-400 shrink-0" />
                <input
                  id="admin-identifier"
                  type="text"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  autoComplete="username"
                  required
                  placeholder=""
                  className="w-full pl-2.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none bg-transparent"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="admin-password" className="block text-xs font-semibold text-slate-700 mb-1.5">
                Password
              </label>
              <div className="relative flex items-center rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 transition focus-within:border-[#961b36] focus-within:ring-2 focus-within:ring-[#961b36]/20 shadow-2xs">
                <Lock className="h-4 w-4 text-slate-400 shrink-0" />
                <input
                  id="admin-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                  placeholder=""
                  className="w-full pl-2.5 pr-14 text-sm text-slate-900 placeholder:text-slate-400 outline-none bg-transparent"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-slate-800 transition"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                  <span>{showPassword ? "Hide" : "Show"}</span>
                </button>
              </div>
            </div>

            {/* Keep Signed In & Forgot Password */}
            <div className="flex items-center justify-between pt-0.5">
              <label className="inline-flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={keepSignedIn}
                  onChange={(e) => setKeepSignedIn(e.target.checked)}
                  className="h-4 w-4 rounded border-slate-300 text-[#961b36] focus:ring-[#961b36]"
                />
                <span className="text-xs text-slate-600">Keep me signed in</span>
              </label>

              <button
                type="button"
                onClick={() => alert("Please contact Super Admin at +919629025814 or support@nammapros.com to reset password.")}
                className="text-xs font-semibold text-[#8B1D42] hover:underline"
              >
                Forgot Password?
              </button>
            </div>

            {/* Error Message */}
            {error && (
              <div role="alert" className="rounded-xl border border-red-200 bg-red-50 p-2.5 text-center text-xs font-semibold text-red-700">
                {error}
              </div>
            )}

            {/* Sign In Submit Button */}
            <button
              type="submit"
              disabled={busy || !identifier.trim() || !password}
              className="mt-2 w-full rounded-xl bg-[#540e1e] py-3 text-sm font-bold text-white shadow-md shadow-[#540e1e]/25 hover:bg-[#430b18] active:bg-[#350913] disabled:opacity-50 transition-all flex items-center justify-center gap-2"
            >
              {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
              <span>{busy ? "Signing in..." : "Sign In"}</span>
            </button>

            {/* Contact Support */}
            <p className="pt-2 text-center text-xs text-slate-500">
              Facing issues?{" "}
              <a href="mailto:support@nammapros.com" className="font-semibold text-[#8B1D42] hover:underline">
                Contact Support.
              </a>
            </p>
          </form>
        </div>
      </section>
    </main>
  );
}

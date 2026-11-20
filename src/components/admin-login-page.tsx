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
  const [inputFocused, setInputFocused] = useState<"id" | "pass" | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (busy || !identifier.trim() || !password) return;
    void onSignIn(identifier.trim(), password);
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        height: "100vh",
        maxHeight: "100vh",
        width: "100vw",
        overflow: "hidden",
        display: "flex",
        flexDirection: "row",
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
      }}
    >
      {/* =================================================================== */}
      {/* LEFT HERO SECTION (Burgundy Brand + Technicians)                    */}
      {/* =================================================================== */}
      <div
        style={{
          flex: 1,
          height: "100vh",
          backgroundColor: "#4a0e1c",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "36px 48px 0 48px",
          overflow: "hidden",
        }}
      >
        {/* Subtle Watermark Vector (Bottom Left Behind Technicians) */}
        <div
          style={{
            position: "absolute",
            bottom: "10px",
            left: "10px",
            width: "420px",
            opacity: 0.07,
            pointerEvents: "none",
            userSelect: "none",
            zIndex: 1,
          }}
        >
          <svg viewBox="0 0 420 320" fill="none" stroke="#ffffff" strokeWidth="2.5" style={{ width: "100%", height: "auto" }}>
            {/* Sofa */}
            <path d="M30 240 h300 v30 h-18 v16 h-16 v-16 h-232 v16 h-16 v-16 h-18 z" />
            <path d="M30 240 v-60 a16 16 0 0 1 16 -16 h24 v44 h220 v-44 h24 a16 16 0 0 1 16 16 v60" />
            <path d="M70 164 v-30 a24 24 0 0 1 24 -24 h172 a24 24 0 0 1 24 24 v30" />
            {/* Hammer */}
            <path d="M50 70 l30 30 m-6 -22 l-40 40 a8 8 0 0 0 11 11 l40 -40" />
            <path d="M82 48 l12 12 -12 12 -12 -12 z" />
            {/* Wrench */}
            <path d="M200 60 l-40 40 a8 8 0 0 0 11 11 l40 -40 m-16 -24 a16 16 0 0 1 16 16 l-8 8 -12 -12 8 -8" />
          </svg>
        </div>

        {/* Top Header: Logo + Divider + Admin Panel */}
        <div style={{ position: "relative", zIndex: 10, display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span style={{ fontSize: "24px", fontWeight: 900, color: "#ffffff", letterSpacing: "-0.5px" }}>
              namma
            </span>
            <span
              style={{
                fontSize: "24px",
                fontWeight: 900,
                color: "#ffffff",
                backgroundColor: "#8B1D42",
                padding: "2px 8px",
                borderRadius: "6px",
                letterSpacing: "-0.5px",
              }}
            >
              pros.
            </span>
          </div>
          <span style={{ color: "rgba(255, 255, 255, 0.4)", fontSize: "18px", fontWeight: 300 }}>|</span>
          <span style={{ color: "rgba(255, 255, 255, 0.9)", fontSize: "14px", fontWeight: 500, letterSpacing: "0.2px" }}>
            Admin Panel
          </span>
        </div>

        {/* Hero Headline & Subtitle */}
        <div style={{ position: "relative", zIndex: 10, marginTop: "24px", maxWidth: "560px" }}>
          <h1
            style={{
              fontSize: "36px",
              fontWeight: 800,
              color: "#ffffff",
              letterSpacing: "-0.5px",
              lineHeight: 1.15,
              margin: 0,
            }}
          >
            India&apos;s trusted home service
          </h1>
          <p
            style={{
              fontSize: "14px",
              color: "rgba(255, 255, 255, 0.8)",
              margin: "8px 0 0 0",
              fontWeight: 400,
            }}
          >
            Managing the platform that powers home service
          </p>
        </div>

        {/* Technicians Cutout Photo (Pinned cleanly to bottom) */}
        <div
          style={{
            position: "relative",
            zIndex: 10,
            marginTop: "auto",
            display: "flex",
            alignItems: "flex-end",
            lineHeight: 0,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/brand/hero-technicians-pair.webp"
            alt="NammaPros Technicians"
            style={{
              height: "58vh",
              maxHeight: "480px",
              width: "auto",
              objectFit: "contain",
              objectPosition: "bottom left",
              filter: "drop-shadow(0 15px 30px rgba(0,0,0,0.35))",
              userSelect: "none",
            }}
          />
        </div>
      </div>

      {/* =================================================================== */}
      {/* RIGHT LOGIN SECTION (Light Gray Background + Floating White Card)   */}
      {/* =================================================================== */}
      <div
        style={{
          width: "480px",
          minWidth: "420px",
          height: "100vh",
          backgroundColor: "#f5f6f9",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "24px",
          boxSizing: "border-box",
        }}
      >
        {/* Floating White Card */}
        <div
          style={{
            width: "100%",
            maxWidth: "390px",
            backgroundColor: "#ffffff",
            borderRadius: "24px",
            padding: "32px 32px 28px 32px",
            boxShadow: "0 20px 50px rgba(0, 0, 0, 0.08), 0 1px 3px rgba(0, 0, 0, 0.04)",
            border: "1px solid #f1f2f5",
            boxSizing: "border-box",
          }}
        >
          {/* Card Top Logo */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }}>
            <span style={{ fontSize: "23px", fontWeight: 900, color: "#111827", letterSpacing: "-0.5px" }}>
              namma
            </span>
            <span
              style={{
                fontSize: "23px",
                fontWeight: 900,
                color: "#ffffff",
                backgroundColor: "#8B1D42",
                padding: "1px 7px",
                borderRadius: "6px",
                letterSpacing: "-0.5px",
              }}
            >
              pros.
            </span>
          </div>

          {/* Heading & Subtitle */}
          <div style={{ textAlign: "center", marginTop: "14px" }}>
            <h2
              style={{
                fontSize: "22px",
                fontWeight: 800,
                color: "#540e1e",
                letterSpacing: "-0.3px",
                margin: 0,
              }}
            >
              Admin Login
            </h2>
            <p
              style={{
                fontSize: "12px",
                color: "#6b7280",
                margin: "4px 0 0 0",
              }}
            >
              Sign in to access the management panel.
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
            {/* Email / Username Field */}
            <div style={{ marginBottom: "14px" }}>
              <label
                htmlFor="admin-identifier"
                style={{
                  display: "block",
                  fontSize: "12px",
                  fontWeight: 600,
                  color: "#374151",
                  marginBottom: "5px",
                }}
              >
                Email / Username
              </label>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  borderRadius: "10px",
                  border: inputFocused === "id" ? "1.5px solid #8B1D42" : "1.5px solid #d1d5db",
                  backgroundColor: "#ffffff",
                  padding: "9px 12px",
                  boxShadow: inputFocused === "id" ? "0 0 0 3px rgba(139, 29, 66, 0.12)" : "none",
                  transition: "all 0.15s ease",
                }}
              >
                <User size={16} color="#9ca3af" style={{ flexShrink: 0 }} />
                <input
                  id="admin-identifier"
                  type="text"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  onFocus={() => setInputFocused("id")}
                  onBlur={() => setInputFocused(null)}
                  autoComplete="username"
                  required
                  placeholder=""
                  style={{
                    width: "100%",
                    border: "none",
                    outline: "none",
                    backgroundColor: "transparent",
                    paddingLeft: "10px",
                    fontSize: "13px",
                    color: "#111827",
                  }}
                />
              </div>
            </div>

            {/* Password Field */}
            <div style={{ marginBottom: "12px" }}>
              <label
                htmlFor="admin-password"
                style={{
                  display: "block",
                  fontSize: "12px",
                  fontWeight: 600,
                  color: "#374151",
                  marginBottom: "5px",
                }}
              >
                Password
              </label>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  borderRadius: "10px",
                  border: inputFocused === "pass" ? "1.5px solid #8B1D42" : "1.5px solid #d1d5db",
                  backgroundColor: "#ffffff",
                  padding: "9px 12px",
                  boxShadow: inputFocused === "pass" ? "0 0 0 3px rgba(139, 29, 66, 0.12)" : "none",
                  transition: "all 0.15s ease",
                  position: "relative",
                }}
              >
                <Lock size={16} color="#9ca3af" style={{ flexShrink: 0 }} />
                <input
                  id="admin-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setInputFocused("pass")}
                  onBlur={() => setInputFocused(null)}
                  autoComplete="current-password"
                  required
                  placeholder=""
                  style={{
                    width: "100%",
                    border: "none",
                    outline: "none",
                    backgroundColor: "transparent",
                    paddingLeft: "10px",
                    paddingRight: "55px",
                    fontSize: "13px",
                    color: "#111827",
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: "absolute",
                    right: "10px",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    fontSize: "11px",
                    fontWeight: 600,
                    color: "#6b7280",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: 0,
                  }}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                  <span>{showPassword ? "Hide" : "Show"}</span>
                </button>
              </div>
            </div>

            {/* Checkbox & Forgot Password */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                paddingTop: "2px",
              }}
            >
              <label
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  cursor: "pointer",
                  userSelect: "none",
                }}
              >
                <input
                  type="checkbox"
                  checked={keepSignedIn}
                  onChange={(e) => setKeepSignedIn(e.target.checked)}
                  style={{
                    width: "14px",
                    height: "14px",
                    accentColor: "#8B1D42",
                    cursor: "pointer",
                  }}
                />
                <span style={{ fontSize: "12px", color: "#4b5563" }}>Keep me signed in</span>
              </label>

              <button
                type="button"
                onClick={() =>
                  alert("Please contact your Super Admin (+919629025814 / support@nammapros.com) to reset your password.")
                }
                style={{
                  fontSize: "12px",
                  fontWeight: 600,
                  color: "#8B1D42",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                  textDecoration: "none",
                }}
              >
                Forgot Password?
              </button>
            </div>

            {/* Error Banner */}
            {error && (
              <div
                role="alert"
                style={{
                  marginTop: "12px",
                  borderRadius: "10px",
                  border: "1px solid #fecaca",
                  backgroundColor: "#fef2f2",
                  padding: "8px 12px",
                  textAlign: "center",
                  fontSize: "12px",
                  fontWeight: 600,
                  color: "#b91c1c",
                }}
              >
                {error}
              </div>
            )}

            {/* Sign In Button */}
            <button
              type="submit"
              disabled={busy || !identifier.trim() || !password}
              style={{
                marginTop: "18px",
                width: "100%",
                borderRadius: "10px",
                backgroundColor: "#540e1e",
                padding: "11px 16px",
                fontSize: "13px",
                fontWeight: 700,
                color: "#ffffff",
                border: "none",
                cursor: busy || !identifier.trim() || !password ? "not-allowed" : "pointer",
                opacity: busy || !identifier.trim() || !password ? 0.6 : 1,
                boxShadow: "0 4px 12px rgba(84, 14, 30, 0.3)",
                transition: "all 0.15s ease",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
              }}
            >
              {busy ? <Loader2 size={16} className="animate-spin" /> : null}
              <span>{busy ? "Signing in..." : "Sign In"}</span>
            </button>

            {/* Support Footer */}
            <p
              style={{
                paddingTop: "14px",
                textAlign: "center",
                fontSize: "12px",
                color: "#6b7280",
                margin: 0,
              }}
            >
              Facing issues?{" "}
              <a
                href="mailto:support@nammapros.com"
                style={{
                  fontWeight: 600,
                  color: "#540e1e",
                  textDecoration: "none",
                }}
              >
                Contact Support.
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

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
  const [keepSignedIn, setKeepSignedIn] = useState(false);
  const [activeField, setActiveField] = useState<"id" | "pass">("id");

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
        width: "100vw",
        height: "100vh",
        maxHeight: "100vh",
        overflow: "hidden",
        background: "linear-gradient(to right, #400716 0%, #400716 75.4%, #f1f3f6 75.4%, #f1f3f6 100%)",
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
        userSelect: "none",
      }}
    >
      {/* =================================================================== */}
      {/* WATERMARK ICONS (Bottom Left)                                       */}
      {/* =================================================================== */}
      <div
        style={{
          position: "absolute",
          bottom: "10px",
          left: "20px",
          width: "440px",
          opacity: 0.07,
          pointerEvents: "none",
          zIndex: 1,
        }}
      >
        <svg viewBox="0 0 450 340" fill="none" stroke="#ffffff" strokeWidth="2.5" style={{ width: "100%", height: "auto" }}>
          {/* Sofa */}
          <path d="M40 250 h300 v32 h-18 v16 h-16 v-16 h-232 v16 h-16 v-16 h-18 z" />
          <path d="M40 250 v-65 a16 16 0 0 1 16 -16 h24 v48 h220 v-48 h24 a16 16 0 0 1 16 16 v65" />
          <path d="M80 169 v-30 a26 26 0 0 1 26 -26 h168 a26 26 0 0 1 26 26 v30" />
          {/* Hammer */}
          <path d="M55 75 l32 32 m-7 -24 l-42 42 a8 8 0 0 0 12 12 l42 -42" />
          <path d="M89 51 l14 14 -14 14 -14 -14 z" />
          {/* Wrench */}
          <path d="M210 65 l-42 42 a8 8 0 0 0 12 12 l42 -42 m-16 -25 a16 16 0 0 1 16 16 l-8 8 -13 -13 8 -8" />
        </svg>
      </div>

      {/* =================================================================== */}
      {/* SPARKLE WATERMARK (Bottom Right Light Background)                   */}
      {/* =================================================================== */}
      <div
        style={{
          position: "absolute",
          bottom: "32px",
          right: "36px",
          width: "36px",
          height: "36px",
          opacity: 0.45,
          pointerEvents: "none",
          zIndex: 1,
        }}
      >
        <svg viewBox="0 0 100 100" fill="#ffffff" style={{ width: "100%", height: "100%", filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.06))" }}>
          <path d="M50 0 C50 32 68 50 100 50 C68 50 50 68 50 100 C50 68 32 50 0 50 C32 50 50 32 50 0 Z" />
        </svg>
      </div>

      {/* =================================================================== */}
      {/* TOP-LEFT HEADER (Logo + Admin Panel)                                */}
      {/* =================================================================== */}
      <div
        style={{
          position: "absolute",
          top: "40px",
          left: "60px",
          display: "flex",
          alignItems: "center",
          gap: "14px",
          zIndex: 10,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <span style={{ fontSize: "24px", fontWeight: 900, color: "#ffffff", letterSpacing: "-0.5px" }}>
            namma
          </span>
          <span
            style={{
              fontSize: "24px",
              fontWeight: 900,
              color: "#ffffff",
              backgroundColor: "#7b092a",
              padding: "2px 8px",
              borderRadius: "6px",
              letterSpacing: "-0.5px",
            }}
          >
            pros.
          </span>
        </div>
        <span style={{ color: "rgba(255, 255, 255, 0.4)", fontSize: "20px", fontWeight: 300 }}>|</span>
        <span style={{ color: "rgba(255, 255, 255, 0.9)", fontSize: "14px", fontWeight: 500, letterSpacing: "0.2px" }}>
          Admin Panel
        </span>
      </div>

      {/* =================================================================== */}
      {/* HERO HEADLINE & SUBTITLE                                            */}
      {/* =================================================================== */}
      <div
        style={{
          position: "absolute",
          top: "98px",
          left: "60px",
          maxWidth: "520px",
          zIndex: 10,
        }}
      >
        <h1
          style={{
            fontSize: "34px",
            fontWeight: 800,
            color: "#ffffff",
            letterSpacing: "-0.6px",
            lineHeight: 1.18,
            margin: 0,
          }}
        >
          India&apos;s trusted home service
        </h1>
        <p
          style={{
            fontSize: "14px",
            color: "rgba(255, 255, 255, 0.78)",
            margin: "6px 0 0 0",
            fontWeight: 400,
          }}
        >
          Managing the platform that powers home service
        </p>
      </div>

      {/* =================================================================== */}
      {/* TECHNICIANS CUTOUT (Positioned at Left ~11%, Pinned to Bottom)      */}
      {/* =================================================================== */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: "10.5%",
          height: "68vh",
          maxHeight: "510px",
          zIndex: 10,
          display: "flex",
          alignItems: "flex-end",
          lineHeight: 0,
          pointerEvents: "none",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/brand/hero-technicians-pair.webp"
          alt="NammaPros Technicians"
          style={{
            height: "100%",
            width: "auto",
            objectFit: "contain",
            objectPosition: "bottom left",
            filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.45))",
            userSelect: "none",
          }}
        />
      </div>

      {/* =================================================================== */}
      {/* FLOATING ADMIN LOGIN CARD (Overlapping the 75.4% Split Boundary)    */}
      {/* =================================================================== */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          right: "7.5%",
          transform: "translateY(-50%)",
          width: "410px",
          maxWidth: "90vw",
          backgroundColor: "#ffffff",
          borderRadius: "24px",
          padding: "36px 36px 30px 36px",
          boxShadow: "0 25px 60px -15px rgba(0, 0, 0, 0.28), 0 0 1px rgba(0, 0, 0, 0.15)",
          border: "1px solid rgba(255, 255, 255, 0.8)",
          boxSizing: "border-box",
          zIndex: 20,
        }}
      >
        {/* Card Top Logo */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "5px" }}>
          <span style={{ fontSize: "24px", fontWeight: 900, color: "#111827", letterSpacing: "-0.5px" }}>
            namma
          </span>
          <span
            style={{
              fontSize: "24px",
              fontWeight: 900,
              color: "#ffffff",
              backgroundColor: "#7b092a",
              padding: "1px 7px",
              borderRadius: "6px",
              letterSpacing: "-0.5px",
            }}
          >
            pros.
          </span>
        </div>

        {/* Card Heading & Subtitle */}
        <div style={{ textAlign: "center", marginTop: "14px" }}>
          <h2
            style={{
              fontSize: "23px",
              fontWeight: 800,
              color: "#532031",
              letterSpacing: "-0.4px",
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
              fontWeight: 400,
            }}
          >
            Sign in to access the management panel.
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} style={{ marginTop: "22px" }}>
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
                border: activeField === "id" ? "1.5px solid #8B1D42" : "1.5px solid #d1d5db",
                backgroundColor: "#ffffff",
                padding: "9px 12px",
                boxShadow: activeField === "id" ? "0 0 0 3px rgba(139, 29, 66, 0.12)" : "none",
                transition: "all 0.15s ease",
              }}
            >
              <User size={16} color="#4b5563" style={{ flexShrink: 0 }} />
              <input
                id="admin-identifier"
                type="text"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                onFocus={() => setActiveField("id")}
                autoComplete="username"
                required
                placeholder=""
                autoFocus
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
                border: activeField === "pass" ? "1.5px solid #8B1D42" : "1.5px solid #d1d5db",
                backgroundColor: "#ffffff",
                padding: "9px 12px",
                boxShadow: activeField === "pass" ? "0 0 0 3px rgba(139, 29, 66, 0.12)" : "none",
                transition: "all 0.15s ease",
                position: "relative",
              }}
            >
              <Lock size={16} color="#6b7280" style={{ flexShrink: 0 }} />
              <input
                id="admin-password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setActiveField("pass")}
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
                  color: "#4b5563",
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

          {/* Keep Signed In Checkbox & Forgot Password */}
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
                  accentColor: "#7b092a",
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
                color: "#7b092a",
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
              marginTop: "20px",
              width: "100%",
              borderRadius: "10px",
              backgroundColor: "#7b092a",
              padding: "11px 16px",
              fontSize: "13px",
              fontWeight: 700,
              color: "#ffffff",
              border: "none",
              cursor: busy || !identifier.trim() || !password ? "not-allowed" : "pointer",
              opacity: busy || !identifier.trim() || !password ? 0.6 : 1,
              boxShadow: "0 4px 14px rgba(123, 9, 42, 0.35)",
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

          {/* Contact Support Footer */}
          <p
            style={{
              paddingTop: "16px",
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
                color: "#7b092a",
                textDecoration: "none",
              }}
            >
              Contact Support.
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

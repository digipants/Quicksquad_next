"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";

type Preferences = { analytics: boolean; advertising: boolean };

const STORAGE_KEY = "resolve-us-optional-cookies-v1";
const GA4_ID = "G-K82JB039DQ";
const ADS_ID = "AW-18376694937";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export default function CookieConsent() {
  const [choice, setChoice] = useState<Preferences | null>(null);
  const [initialized, setInitialized] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [enableGoogleTag, setEnableGoogleTag] = useState(false);
  const initializedGoogle = useRef(false);
  const configuredMeasurement = useRef({ analytics: false, advertising: false });

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed: unknown = JSON.parse(stored);
        if (
          parsed &&
          typeof parsed === "object" &&
          "analytics" in parsed &&
          "advertising" in parsed &&
          typeof parsed.analytics === "boolean" &&
          typeof parsed.advertising === "boolean"
        ) {
          setChoice({ analytics: parsed.analytics, advertising: parsed.advertising });
        }
      }
    } catch {
      // Malformed or unavailable storage means no optional tracking.
    }
    setInitialized(true);
  }, []);

  useEffect(() => {
    if (!initialized || !choice || !window.gtag) return;

    // The inline root-layout default is denied; update it only after a choice.
    window.gtag("consent", "update", {
      analytics_storage: choice.analytics ? "granted" : "denied",
      ad_storage: choice.advertising ? "granted" : "denied",
      ad_user_data: choice.advertising ? "granted" : "denied",
      ad_personalization: choice.advertising ? "granted" : "denied",
    });

    if (choice.analytics || choice.advertising) {
      if (!initializedGoogle.current) {
        window.gtag("js", new Date());
        initializedGoogle.current = true;
      }
      if (choice.analytics && !configuredMeasurement.current.analytics) {
        window.gtag("config", GA4_ID);
        configuredMeasurement.current.analytics = true;
      }
      if (choice.advertising && !configuredMeasurement.current.advertising) {
        window.gtag("config", ADS_ID);
        configuredMeasurement.current.advertising = true;
      }
      setEnableGoogleTag(true);
    } else {
      // Also revokes future tracking on the current page after an opt-out.
      setEnableGoogleTag(false);
    }
  }, [choice, initialized]);

  const select = (preferences: Preferences) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
    } catch {
      // The current-page choice still applies when persistence is unavailable.
    }
    setChoice(preferences);
    setSettingsOpen(false);
  };

  if (!initialized) return null;

  return (
    <>
      {enableGoogleTag && (
        <Script
          id="resolve-us-consented-google-tag"
          src={`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`}
          strategy="afterInteractive"
        />
      )}

      {(!choice || settingsOpen) ? (
        <section
          role="dialog"
          aria-label="Cookie preferences"
          className="fixed inset-x-4 bottom-4 z-[100] mx-auto max-w-3xl rounded-2xl border border-slate-300 bg-white p-5 text-slate-900 shadow-2xl sm:p-6"
        >
          <h2 className="text-lg font-bold">Your privacy choices</h2>
          <p className="mt-2 text-sm leading-6 text-slate-700">
            Essential site functionality does not need optional cookies. You can allow
            Google Analytics, or both analytics and advertising measurement. We do not
            load Google tracking tags until you opt in. Read our{" "}
            <a className="font-semibold text-teal-700 underline" href="/privacy-policy">Privacy Policy</a>.
          </p>
          <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
            <button type="button" onClick={() => select({ analytics: false, advertising: false })}
              className="rounded-lg border border-slate-400 px-4 py-2 text-sm font-semibold hover:bg-slate-100">
              Reject optional
            </button>
            <button type="button" onClick={() => select({ analytics: true, advertising: false })}
              className="rounded-lg border border-teal-700 px-4 py-2 text-sm font-semibold text-teal-700 hover:bg-teal-50">
              Analytics only
            </button>
            <button type="button" onClick={() => select({ analytics: true, advertising: true })}
              className="rounded-lg bg-teal-700 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-800">
              Accept all
            </button>
            {choice && (
              <button type="button" onClick={() => setSettingsOpen(false)}
                className="rounded-lg px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100">
                Close
              </button>
            )}
          </div>
        </section>
      ) : (
        <button type="button" onClick={() => setSettingsOpen(true)}
          className="fixed bottom-4 left-4 z-[80] rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-md hover:bg-slate-100">
          Cookie settings
        </button>
      )}
    </>
  );
}

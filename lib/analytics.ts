/**
 * Conversion event hooks. Components mark links with `data-track="<event>"` (see trackAttrs)
 * and AnalyticsListener forwards clicks here. Events are pushed to `window.dataLayer` only
 * when Google Tag Manager is configured (NEXT_PUBLIC_GTM_ID); otherwise nothing is sent.
 */
export type TrackEvent =
  | "whatsapp_click"
  | "phone_click"
  | "email_click"
  | "package_enquiry_click"
  | "contact_form_submit";

export type TrackParams = Record<string, string | undefined>;

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

export function track(event: TrackEvent, params: TrackParams = {}) {
  if (typeof window === "undefined") return;
  if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push({ event, ...params });
  } else if (process.env.NODE_ENV === "development") {
    console.debug("[analytics]", event, params);
  }
}

/** Spread onto any <a>/<Link> to make its clicks measurable. */
export function trackAttrs(event: TrackEvent, label?: string) {
  return label ? { "data-track": event, "data-track-label": label } : { "data-track": event };
}

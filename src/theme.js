// Automatic theme layer with optional manual override.
//
// Resolution order:
//   1. User preference from localStorage (set by the footer toggle)
//   2. System color preference (prefers-color-scheme: dark | light)
//   3. Day/night based on geolocation sunrise/sunset (if permission granted)
//   4. Local-time fallback (06:00–17:59 = light, else dark)
//
// The synchronous bootstrap in index.html sets a best-guess theme before paint.
// This module then attaches listeners and may upgrade the theme once async data
// (geolocation, prefers-color-scheme change, user toggle) resolves.

const STORAGE_KEY = "metz-theme";
const DARK_HOUR_START = 18; // 6 PM local
const DARK_HOUR_END = 6; // 6 AM local

const subscribers = new Set();

function applyTheme(theme) {
  if (theme !== "dark" && theme !== "light") return;
  document.documentElement.setAttribute("data-theme", theme);
}

function timeBasedTheme(date = new Date()) {
  const hour = date.getHours();
  return hour >= DARK_HOUR_END && hour < DARK_HOUR_START ? "light" : "dark";
}

// NOAA-style sunrise/sunset solver. Returns minutes from UTC midnight, or null
// when the sun does not rise/set on the given day at the given latitude.
function sunTimesUtcMinutes(latitude, longitude, date = new Date()) {
  const rad = Math.PI / 180;
  const startOfYear = Date.UTC(date.getUTCFullYear(), 0, 0);
  const dayOfYear = Math.floor((date.getTime() - startOfYear) / 86_400_000);
  const gamma =
    ((2 * Math.PI) / 365) * (dayOfYear - 1 + (date.getUTCHours() - 12) / 24);

  const decl =
    0.006918 -
    0.399912 * Math.cos(gamma) +
    0.070257 * Math.sin(gamma) -
    0.006758 * Math.cos(2 * gamma) +
    0.000907 * Math.sin(2 * gamma) -
    0.002697 * Math.cos(3 * gamma) +
    0.00148 * Math.sin(3 * gamma);

  const zenith = 90.833 * rad;
  const cosH =
    (Math.cos(zenith) - Math.sin(latitude * rad) * Math.sin(decl)) /
    (Math.cos(latitude * rad) * Math.cos(decl));

  if (cosH > 1 || cosH < -1) return { sunrise: null, sunset: null };

  const hourAngleDeg = Math.acos(cosH) / rad;
  const eqTime =
    229.18 *
    (0.000075 +
      0.001868 * Math.cos(gamma) -
      0.032077 * Math.sin(gamma) -
      0.014615 * Math.cos(2 * gamma) -
      0.040849 * Math.sin(2 * gamma));
  const solarNoon = 720 - 4 * longitude - eqTime;
  return {
    sunrise: solarNoon - 4 * hourAngleDeg,
    sunset: solarNoon + 4 * hourAngleDeg,
  };
}

function locationBasedTheme(latitude, longitude, date = new Date()) {
  const { sunrise, sunset } = sunTimesUtcMinutes(latitude, longitude, date);
  if (sunrise == null) return timeBasedTheme(date);
  const nowUtcMinutes = date.getUTCHours() * 60 + date.getUTCMinutes();
  return nowUtcMinutes >= sunrise && nowUtcMinutes < sunset ? "light" : "dark";
}

function getSystemPreference() {
  if (!window.matchMedia) return null;
  if (window.matchMedia("(prefers-color-scheme: dark)").matches) return "dark";
  if (window.matchMedia("(prefers-color-scheme: light)").matches) return "light";
  return null;
}

function tryGeolocation() {
  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      resolve(null);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => resolve(position.coords),
      () => resolve(null),
      { timeout: 6_000, maximumAge: 6 * 60 * 60 * 1000 },
    );
  });
}

export function getUserPreference() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "dark" || stored === "light" || stored === "auto") {
      return stored;
    }
  } catch (e) {
    // localStorage may be unavailable (private mode, SSR, etc.)
  }
  return "auto";
}

function notify(preference) {
  subscribers.forEach((cb) => {
    try {
      cb(preference);
    } catch (e) {
      // Subscriber errors shouldn't break the runtime.
    }
  });
}

let lastCoords = null;

function resolveTheme() {
  const pref = getUserPreference();
  if (pref === "dark" || pref === "light") return pref;

  const system = getSystemPreference();
  if (system) return system;

  if (lastCoords) {
    return locationBasedTheme(lastCoords.latitude, lastCoords.longitude);
  }
  return timeBasedTheme();
}

function reapply() {
  applyTheme(resolveTheme());
}

export function setUserPreference(preference) {
  if (preference !== "dark" && preference !== "light" && preference !== "auto") {
    return;
  }
  try {
    if (preference === "auto") {
      localStorage.removeItem(STORAGE_KEY);
    } else {
      localStorage.setItem(STORAGE_KEY, preference);
    }
  } catch (e) {
    // Ignore storage failures — the theme still applies for the session.
  }
  reapply();
  notify(preference);
}

export function subscribe(callback) {
  subscribers.add(callback);
  return () => subscribers.delete(callback);
}

let scheduledRolloverTimeout = null;

function scheduleNextRollover() {
  if (scheduledRolloverTimeout) {
    clearTimeout(scheduledRolloverTimeout);
  }
  scheduledRolloverTimeout = setTimeout(
    () => {
      reapply();
      scheduleNextRollover();
    },
    60 * 60 * 1000,
  );
}

export function initTheme() {
  reapply();

  if (window.matchMedia) {
    const darkMql = window.matchMedia("(prefers-color-scheme: dark)");
    const lightMql = window.matchMedia("(prefers-color-scheme: light)");
    const onChange = () => reapply();
    darkMql.addEventListener?.("change", onChange);
    lightMql.addEventListener?.("change", onChange);
  }

  // Cross-tab sync — a toggle in another tab updates this one.
  window.addEventListener("storage", (event) => {
    if (event.key === STORAGE_KEY) {
      reapply();
      notify(getUserPreference());
    }
  });

  scheduleNextRollover();

  // Only ask for geolocation if we'd actually use it: no manual override AND
  // no system preference. Otherwise the prompt would just be noise.
  if (getUserPreference() === "auto" && !getSystemPreference()) {
    tryGeolocation().then((coords) => {
      if (coords) {
        lastCoords = coords;
        reapply();
      }
    });
  }
}

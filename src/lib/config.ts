// Site-wide configuration knobs.

// --- Working contact form (Web3Forms) ---------------------------------------
// The contact form really sends email — it just needs a free access key.
// 1. Go to https://web3forms.com  →  enter your email  →  you'll receive a key.
// 2. Paste that key below (it's safe to expose publicly; it only forwards to
//    YOUR inbox and Web3Forms handles spam protection).
// Until a key is set, the form gracefully falls back to opening the user's
// mail client (mailto) instead.
export const WEB3FORMS_ACCESS_KEY = "";

// --- GitHub -----------------------------------------------------------------
export const GITHUB_USER = "Armitorenk";
// Contribution heatmap is rendered by ghchart (teal tint to match the theme).
export const GITHUB_CHART_URL = `https://ghchart.rshah.org/0FA4B7/${GITHUB_USER}`;

// --- CV ----------------------------------------------------------------------
export const CV_PATH = "/Armagan-Aydogan-CV.pdf";
export const CV_DOWNLOAD_NAME = "Armagan-Aydogan-CV.pdf";

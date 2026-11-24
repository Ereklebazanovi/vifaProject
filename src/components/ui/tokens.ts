export const productColors = {
  web: { soft: "#b3cfea", wash: "#d8f0fd", deep: "#1e71a5" },
  chatbot: { soft: "#c4b7ec", wash: "#e4dff6", deep: "#7869bb" },
  invento: { soft: "#9aceaa", wash: "#d2e9d9", deep: "#397a59" },
  lineup: { soft: "#f8cdb0", wash: "#fce8db", deep: "#e8743b" },
  // Marketing tones since 2026-11-23: Apple Store's "The latest" card colors. Lime and coral as Apple has them,
  // jade a little lighter, and a clear rose instead of Apple's dark burgundy (dark cards read as too harsh).
  // The pastel versions of the same hues (11-22) read as dull. Washes stay light so the page bands stay calm.
  // 2026-11-25 (Luka): production and advertising moved to the hub's top row and took its colors (lime,
  // coral); social media and branding moved down with jade and rose.
  production: { soft: "#dfe387", wash: "#f6f7e4", deep: "#5d6214" },
  branding: { soft: "#e597b3", wash: "#f6e8ef", deep: "#8a3c62" },
  socialMedia: { soft: "#6cc5a2", wash: "#dff2e9", deep: "#1d6b4e" },
  advertising: { soft: "#ffab94", wash: "#fdebe5", deep: "#a23f27" },
  // The marketing direction as a whole (home card, About panel, home wash). Lavender (owner's choice).
  marketing: { soft: "#dcd2f2", wash: "#f2eefb", deep: "#5c438e" },
} as const;

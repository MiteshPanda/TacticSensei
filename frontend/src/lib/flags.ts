// Team slug -> flagcdn.com country code.
const FLAG_CODES: Record<string, string> = {
  argentina: "ar",
  brazil: "br",
  france: "fr",
  germany: "de",
  spain: "es",
  portugal: "pt",
  england: "gb-eng",
  netherlands: "nl",
  italy: "it",
  croatia: "hr",
  morocco: "ma",
  japan: "jp",
  usa: "us",
  senegal: "sn",
};

// flagcdn only serves these widths; anything else 404s.
type FlagWidth = 160 | 320 | 640 | 1280;

export function teamFlagUrl(slug: string, width: FlagWidth = 640): string {
  return `https://flagcdn.com/w${width}/${FLAG_CODES[slug] ?? "un"}.png`;
}

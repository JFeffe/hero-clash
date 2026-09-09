// Presentation only: career floors and all progression rules remain in career.js.
export const BASTION_SCENES = Object.freeze([
  { id: "lower", min: 1, max: 5, fr: "Les fondations", en: "The foundations" },
  {
    id: "middle",
    min: 6,
    max: 10,
    fr: "Les grandes tribunes",
    en: "The grand galleries",
  },
  {
    id: "upper",
    min: 11,
    max: 14,
    fr: "Les galeries des nuages",
    en: "The cloud galleries",
  },
  {
    id: "summit",
    min: 15,
    max: 15,
    fr: "Le dôme des champions",
    en: "The champions’ dome",
  },
]);

export function sceneForFloor(floor = 1) {
  const value = Number.isFinite(Number(floor))
    ? Math.max(1, Math.min(15, Math.floor(Number(floor))))
    : 1;
  return BASTION_SCENES.find((scene) => value <= scene.max);
}

const images = new Map();
export function loadScene(floor = 1) {
  const scene = sceneForFloor(floor);
  if (typeof Image === "undefined") return Promise.resolve(false);
  if (images.has(scene.id)) return images.get(scene.id).ready;
  const img = new Image();
  const entry = { img, loaded: false, ready: null };
  entry.ready = new Promise((resolve) => {
    img.onload = () => {
      entry.loaded = true;
      resolve(true);
    };
    img.onerror = () => resolve(false);
  });
  images.set(scene.id, entry);
  img.src = new URL(`./assets/bastion/${scene.id}.webp`, import.meta.url).href;
  return entry.ready;
}

export function drawBastionBackdrop(ctx, w, h, floor = 1) {
  const scene = sceneForFloor(floor),
    entry = images.get(scene.id);
  if (!entry?.loaded) {
    if (!entry) void loadScene(floor);
    return false;
  }
  // Cover without stretching. Top alignment preserves the summit's open dome;
  // the empty stone floor stays below the fighters' shared ground line.
  const img = entry.img,
    scale = Math.max(w / img.naturalWidth, h / img.naturalHeight);
  ctx.drawImage(
    img,
    (w - img.naturalWidth * scale) / 2,
    0,
    img.naturalWidth * scale,
    img.naturalHeight * scale,
  );
  return true;
}

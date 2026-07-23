/** Shared pointer state for cursor UI + dither interaction */
export const pointer = {
  x: -9999,
  y: -9999,
  /** Smoothed follow position for background reaction */
  sx: -9999,
  sy: -9999,
  active: false,
  hover: false,
};

export function isInteractiveTarget(el: EventTarget | null): boolean {
  if (!(el instanceof Element)) return false;
  return Boolean(
    el.closest(
      "a, button, [role='button'], summary, label[for], .company-link, input, textarea, select",
    ),
  );
}

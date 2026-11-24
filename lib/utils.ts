import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * Teach tailwind-merge about the project's custom editorial type scale.
 * Without this, `text-headline-lg` can be mistaken for a text colour and
 * removed when combined with `text-navy`.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        {
          text: [
            "display-lg",
            "display-md",
            "display-sm",
            "headline-lg",
            "headline-md",
            "headline-sm",
            "title-lg",
            "title-md",
            "body-lg",
            "body-md",
            "body-sm",
            "label-md",
            "label-sm",
          ],
        },
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

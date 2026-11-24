const HTML_ENTITIES: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

/** Escapes user-supplied values before they are interpolated into email HTML. */
export function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => HTML_ENTITIES[character] ?? character);
}

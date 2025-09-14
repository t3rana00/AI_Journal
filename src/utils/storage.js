const KEY = "aiJournal.entries";

export function getEntries() {
  try { return JSON.parse(localStorage.getItem(KEY)) ?? []; }
  catch { return []; }
}

export function saveEntry(entry) {
  const all = getEntries();
  const withId = { id: crypto.randomUUID?.() || String(Date.now()), ...entry };
  all.unshift(withId);
  localStorage.setItem(KEY, JSON.stringify(all));
  return withId;
}

export function deleteEntry(id) {
  const all = getEntries().filter(e => e.id !== id);
  localStorage.setItem(KEY, JSON.stringify(all));
}

export function clearAll() {
  localStorage.removeItem(KEY);
}

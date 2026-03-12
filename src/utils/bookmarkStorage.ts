const BOOKMARK_KEY = "cafeCorner_bookmarks";

export const getBookmarks = (): string[] => {
  return JSON.parse(localStorage.getItem(BOOKMARK_KEY) ?? "[]");
};

export const toggleBookmark = (id: string): string[] => {
  const current = getBookmarks();

  const updated = current.includes(id)
    ? current.filter((b) => b !== id)
    : [...current, id];

  localStorage.setItem(BOOKMARK_KEY, JSON.stringify(updated));

  return updated;
};
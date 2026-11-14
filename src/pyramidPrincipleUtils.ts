export type Detail = {
  id: string;
  text: string;
};

export type Evidence = {
  id: string;
  text: string;
  details: Detail[];
};

export function updateText(items: Evidence[], id: string, text: string): Evidence[] {
  return items.map((item) =>
    item.id === id
      ? { ...item, text }
      : {
          ...item,
          details: item.details.map((detail) => (detail.id === id ? { ...detail, text } : detail)),
        },
  );
}

export function addDetail(items: Evidence[], evidenceId: string, detail: Detail): Evidence[] {
  return items.map((item) =>
    item.id === evidenceId ? { ...item, details: [...item.details, detail] } : item,
  );
}

export function removeItem(items: Evidence[], id: string): Evidence[] {
  return items
    .filter((item) => item.id !== id)
    .map((item) => ({ ...item, details: item.details.filter((detail) => detail.id !== id) }));
}

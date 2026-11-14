import { expect, test } from "vite-plus/test";

import { addDetail, removeItem, updateText } from "./pyramidPrincipleUtils";
import type { Evidence } from "./pyramidPrincipleUtils";

const items: Evidence[] = [
  { id: "evidence", text: "Reason", details: [{ id: "detail", text: "Fact" }] },
  { id: "other", text: "Other reason", details: [] },
];

test("edits evidence and details without changing siblings or the original data", () => {
  expect(updateText(items, "evidence", "New reason")[0]).toEqual({
    ...items[0],
    text: "New reason",
  });
  const updated = updateText(items, "detail", "New fact");
  expect(updated[0]?.details[0]?.text).toBe("New fact");
  expect(updated[0]?.text).toBe("Reason");
  expect(updated[1]).toEqual(items[1]);
  expect(items[0]?.details[0]?.text).toBe("Fact");
});

test("adds details only to the selected evidence, never to another detail", () => {
  const detail = { id: "new", text: "Source" };
  const updated = addDetail(items, "evidence", detail);
  expect(updated[0]?.details).toEqual([...items[0]!.details, detail]);
  expect(updated[1]).toEqual(items[1]);
  expect(items[0]?.details).toHaveLength(1);
  expect(addDetail(items, "detail", detail)).toEqual(items);
});

test("removes a detail or evidence and its details without removing siblings", () => {
  expect(removeItem(items, "detail")[0]?.details).toEqual([]);
  expect(removeItem(items, "evidence")).toEqual([items[1]]);
  expect(items[0]?.details).toHaveLength(1);
});

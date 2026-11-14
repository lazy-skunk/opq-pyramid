import { useState } from "react";

import { addDetail, removeItem, updateText } from "./pyramidPrincipleUtils";
import type { Detail, Evidence } from "./pyramidPrincipleUtils";
import TextField from "./TextField";

function EvidenceNode({
  node,
  kind,
  path,
  onEdit,
  onAdd,
  onRemove,
}: {
  path: string;
  onEdit: (id: string, text: string) => void;
  onAdd: (id: string) => void;
  onRemove: (id: string) => void;
} & ({ kind: "evidence"; node: Evidence } | { kind: "detail"; node: Detail })) {
  const isDetail = kind === "detail";
  const label = isDetail ? "Detail" : "Evidence";

  return (
    <li className="before:border-foreground/50 after:border-foreground/50 relative flex flex-1 flex-col items-center px-2 pt-4 before:absolute before:inset-x-0 before:top-0 before:border-t after:absolute after:top-0 after:left-1/2 after:h-4 after:border-l first:before:left-1/2 last:before:right-1/2 only:before:hidden motion-safe:transition-opacity motion-safe:starting:opacity-0">
      <div className="bg-foreground/3 w-72 shrink-0 space-y-4 rounded p-4">
        <TextField
          label={`${label} ${path}`}
          value={node.text}
          onChange={(text) => onEdit(node.id, text)}
        />
        <div className="flex flex-wrap gap-2">
          {!isDetail && (
            <button
              type="button"
              className="cursor-pointer rounded bg-green-100 px-4 py-2 text-green-900 motion-safe:transition motion-safe:active:translate-y-px dark:bg-green-900 dark:text-green-100"
              onClick={() => onAdd(node.id)}
            >
              Add detail
            </button>
          )}
          <button
            type="button"
            className="cursor-pointer rounded bg-red-100 px-4 py-2 text-red-900 motion-safe:transition motion-safe:active:translate-y-px dark:bg-red-900 dark:text-red-100"
            aria-label={
              isDetail ? `Remove detail ${path}` : `Remove evidence ${path} and its details`
            }
            onClick={() => {
              if (
                (!node.text.trim() && (isDetail || node.details.length === 0)) ||
                window.confirm(
                  isDetail ? "Remove this detail?" : `Remove this ${kind} and all its details?`,
                )
              ) {
                onRemove(node.id);
              }
            }}
          >
            Remove
          </button>
        </div>
      </div>
      {!isDetail && node.details.length > 0 && (
        <ol className="before:border-foreground/50 relative flex items-start pt-4 before:absolute before:top-0 before:left-1/2 before:h-4 before:border-l">
          {node.details.map((child, index) => (
            <EvidenceNode
              key={child.id}
              node={child}
              kind="detail"
              path={`${index + 1}`}
              onEdit={onEdit}
              onAdd={onAdd}
              onRemove={onRemove}
            />
          ))}
        </ol>
      )}
    </li>
  );
}

export default function PyramidPrinciple() {
  const [answer, setAnswer] = useState("");
  const [supports, setSupports] = useState<Evidence[]>([
    { id: "initial", text: "", details: [] },
    { id: "initial-2", text: "", details: [] },
  ]);

  const addSupport = (parentId?: string) => {
    const child: Detail = { id: crypto.randomUUID(), text: "" };
    setSupports((nodes) =>
      parentId ? addDetail(nodes, parentId, child) : [...nodes, { ...child, details: [] }],
    );
  };

  return (
    <section aria-labelledby="pyramid-heading" className="bg-foreground/3 space-y-4 rounded p-4">
      <h2 id="pyramid-heading" className="font-semibold">
        Pyramid Principle
      </h2>
      <p className="text-foreground/50">
        Ask yourself “Why so?” — what evidence supports your answer?
        <br />
        Ask yourself “So what?” — what answer follows from your evidence?
      </p>
      <div className="overflow-auto" role="region" aria-label="Editable pyramid" tabIndex={0}>
        <div className="flex w-max min-w-full flex-col items-center">
          <div className="bg-foreground/3 w-72 shrink-0 space-y-4 rounded p-4">
            <TextField label="Answer" value={answer} onChange={setAnswer} />
            <button
              type="button"
              className="cursor-pointer rounded bg-green-100 px-4 py-2 text-green-900 motion-safe:transition motion-safe:active:translate-y-px dark:bg-green-900 dark:text-green-100"
              onClick={() => addSupport()}
            >
              Add evidence
            </button>
          </div>
          {supports.length > 0 && (
            <ol className="before:border-foreground/50 relative flex items-start pt-4 before:absolute before:top-0 before:left-1/2 before:h-4 before:border-l">
              {supports.map((node, index) => (
                <EvidenceNode
                  key={node.id}
                  node={node}
                  kind="evidence"
                  path={`${index + 1}`}
                  onEdit={(id, text) => setSupports((nodes) => updateText(nodes, id, text))}
                  onAdd={addSupport}
                  onRemove={(id) => setSupports((nodes) => removeItem(nodes, id))}
                />
              ))}
            </ol>
          )}
        </div>
      </div>
    </section>
  );
}

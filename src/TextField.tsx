import { useId } from "react";

export default function TextField({
  label,
  hint,
  multiline = true,
  value,
  onChange,
}: {
  label: string;
  hint?: string;
  multiline?: boolean;
  value: string;
  onChange: (value: string) => void;
}) {
  const id = useId();

  return (
    <div className="grid gap-2">
      <label htmlFor={id}>{label}</label>
      {hint && (
        <p id={`${id}-hint`} className="text-foreground/50">
          {hint}
        </p>
      )}
      {multiline ? (
        <textarea
          id={id}
          aria-describedby={hint ? `${id}-hint` : undefined}
          className="bg-foreground/3 hover:bg-foreground/6 min-w-0 rounded p-2 motion-safe:transition-colors"
          rows={2}
          value={value}
          onChange={(event) => onChange(event.target.value)}
        />
      ) : (
        <input
          id={id}
          type="text"
          aria-describedby={hint ? `${id}-hint` : undefined}
          className="bg-foreground/3 hover:bg-foreground/6 min-w-0 rounded p-2 motion-safe:transition-colors"
          value={value}
          onChange={(event) => onChange(event.target.value)}
        />
      )}
    </div>
  );
}

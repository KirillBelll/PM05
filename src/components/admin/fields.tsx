type BaseProps = {
  name: string;
  label: string;
  defaultValue?: string | number | null;
  required?: boolean;
  type?: string;
  step?: string;
  placeholder?: string;
};

export function TextField({
  name,
  label,
  defaultValue,
  required,
  type = "text",
  step,
  placeholder,
}: BaseProps) {
  return (
    <label className="block">
      <span className="block font-mono text-[10px] uppercase tracking-[0.1em] text-ink-soft">
        {label}
      </span>
      <input
        name={name}
        type={type}
        step={step}
        required={required}
        placeholder={placeholder}
        defaultValue={defaultValue ?? undefined}
        className="mt-1.5 w-full border border-line bg-paper px-3 py-2 text-[14px] text-ink outline-none focus:border-blue"
      />
    </label>
  );
}

export function TextAreaField({
  name,
  label,
  defaultValue,
  rows = 4,
}: {
  name: string;
  label: string;
  defaultValue?: string | null;
  rows?: number;
}) {
  return (
    <label className="block">
      <span className="block font-mono text-[10px] uppercase tracking-[0.1em] text-ink-soft">
        {label}
      </span>
      <textarea
        name={name}
        rows={rows}
        defaultValue={defaultValue ?? undefined}
        className="mt-1.5 w-full resize-y border border-line bg-paper px-3 py-2 text-[14px] text-ink outline-none focus:border-blue"
      />
    </label>
  );
}

export function SelectField({
  name,
  label,
  defaultValue,
  options,
}: {
  name: string;
  label: string;
  defaultValue?: string;
  options: { value: string; label: string }[];
}) {
  return (
    <label className="block">
      <span className="block font-mono text-[10px] uppercase tracking-[0.1em] text-ink-soft">
        {label}
      </span>
      <select
        name={name}
        defaultValue={defaultValue}
        className="mt-1.5 w-full border border-line bg-paper px-3 py-2 text-[14px] text-ink outline-none focus:border-blue"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}

export function CheckboxField({
  name,
  label,
  defaultChecked,
}: {
  name: string;
  label: string;
  defaultChecked?: boolean;
}) {
  return (
    <label className="flex items-center gap-2.5">
      <input
        type="checkbox"
        name={name}
        defaultChecked={defaultChecked}
        className="h-4 w-4 border border-line accent-current text-blue"
      />
      <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-ink-soft">{label}</span>
    </label>
  );
}

export function SubmitButton({ children }: { children: React.ReactNode }) {
  return (
    <button
      type="submit"
      className="border border-ink bg-ink px-5 py-2.5 font-mono text-[12px] uppercase tracking-[0.14em] text-paper transition-colors hover:bg-blue hover:border-blue"
    >
      {children}
    </button>
  );
}

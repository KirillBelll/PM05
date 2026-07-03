"use client";

export function ConfirmForm({
  action,
  confirmText,
  className,
  children,
}: {
  action: (formData: FormData) => void;
  confirmText: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (!window.confirm(confirmText)) e.preventDefault();
      }}
      className={className}
    >
      {children}
    </form>
  );
}

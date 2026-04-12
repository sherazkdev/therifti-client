import { Link } from "react-router-dom";

import styles from "./ContentFallback.module.css";

export type ContentFallbackAction = {
  label: string;
  to?: string;
  onClick?: () => void;
};

type ContentFallbackProps = {
  title: string;
  description: string;
  primaryAction?: ContentFallbackAction;
  secondaryAction?: ContentFallbackAction;
};

function ActionButton({ action, variant }: { action: ContentFallbackAction; variant: "primary" | "secondary" }) {
  const className = variant === "primary" ? styles.buttonPrimary : styles.buttonSecondary;

  if (action.to) {
    return (
      <Link className={className} to={action.to}>
        {action.label}
      </Link>
    );
  }

  return (
    <button type="button" className={className} onClick={action.onClick}>
      {action.label}
    </button>
  );
}

/**
 * Minimal centered fallback for empty / not-found states (matches SellItem button styling).
 */
export function ContentFallback({ title, description, primaryAction, secondaryAction }: ContentFallbackProps) {
  return (
    <div className={styles.root} role="status">
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.description}>{description}</p>
      {(primaryAction || secondaryAction) && (
        <div className={styles.actions}>
          {secondaryAction && <ActionButton action={secondaryAction} variant="secondary" />}
          {primaryAction && <ActionButton action={primaryAction} variant="primary" />}
        </div>
      )}
    </div>
  );
}

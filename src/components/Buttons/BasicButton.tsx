interface BasicButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  color?: "primary" | "secondary" | "accent" | "dark";
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean
}

export default function BasicButton({
  children,
  onClick,
  href,
  color = "primary",
  className = "",
  type = "button",
  disabled = false
}: BasicButtonProps) {

  const colorClasses = {
    primary: "bg-primary text-secondary",
    secondary: "bg-secondary text-dark",
    accent: "bg-accent text-white",
    dark: "bg-dark text-secondary",
  };

  const baseClasses = `
    flex items-center justify-center
    px-4 md:py-2 py-4 rounded-lg font-semibold
    transition-all duration-300
    hover:brightness-125
    shadow-md hover:shadow-lg
    active:scale-95 transform
    disabled:cursor-not-allowed
    disabled:bg-opacity-50
    disabled:brightness-100 
    disabled:shadow-none
    ${colorClasses[color]}
    ${className}
  `;

  // Si hay href → renderizamos un <a>
  if (href) {
    return (
      <a href={href} className={baseClasses}>
        {children}
      </a>
    );
  }

  // Si NO hay href → renderizamos un <button>
  return (
    <button onClick={onClick} type={type} disabled={disabled} className={baseClasses}>
      {children}
    </button>
  );
}

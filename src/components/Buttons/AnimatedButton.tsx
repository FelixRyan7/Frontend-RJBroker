interface AnimatedButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  href?: string;
  color?: string;
  className?: string;
  border?: string;
  rounded?: boolean;
}

export default function AnimatedButton({
  children,
  onClick,
  type = "button",
  border = "border-2",
  href,
  color = "secondary",
  className = "",
  rounded = true
}: AnimatedButtonProps) {
  const classes = `
    relative overflow-hidden px-4 md:py-2 py-4 ${rounded ? 'rounded-xl' : 'rounded-none'}
    ${border} border-${color} text-${color} font-semibold
    transition-all duration-150 isolate
    before:absolute before:inset-0 before:bg-secondary
    before:scale-x-0 before:origin-center before:transition-transform before:duration-150
    before:z-0
    hover:before:scale-x-100
    hover:border-transparent
    group
    ${className}
  `;

  // 🔹 Si tiene href → renderizamos un <a>
  if (href) {
    return (
      <a href={href} onClick={onClick} className={classes}>
        <span className="relative z-10 group-hover:text-primary transition-colors duration-150">
          {children}
        </span>
      </a>
    );
  }

  // 🔹 Si no tiene href → renderizamos un <button>
  return (
    <button onClick={onClick} type={type} className={classes}>
      <span className="relative z-10 group-hover:text-primary transition-colors duration-150">
        {children}
      </span>
    </button>
  );
}

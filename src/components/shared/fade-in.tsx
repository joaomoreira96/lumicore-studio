import { cn } from "@/lib/utils";

type FadeInProps = React.HTMLAttributes<HTMLDivElement> & {
  delay?: number;
};

export function FadeIn({
  className,
  delay = 0,
  style,
  children,
  ...props
}: FadeInProps) {
  return (
    <div
      className={cn("animate-fade-in-up", className)}
      style={{ ...style, animationDelay: `${delay}s` }}
      {...props}
    >
      {children}
    </div>
  );
}

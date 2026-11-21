import type { ReactNode } from "react";

interface SectionHeadingProps {
  children: ReactNode;
  secondary?: ReactNode;
  as?: "h1" | "h2";
  id?: string;
  className?: string;
}

export function SectionHeading({ children, secondary, as: Heading = "h2", id, className = "" }: SectionHeadingProps) {
  const hero = Heading === "h1";
  return (
    <Heading id={id} className={`${hero ? "it-h1" : "it-h2"} ${className}`}>
      {secondary ? (
        <>
          <span className={hero ? "it-h1-dark" : "it-tone-1"}>{children}</span>{" "}
          <span className={hero ? "it-h1-gray" : "it-tone-2"}>{secondary}</span>
        </>
      ) : children}
    </Heading>
  );
}

import type { ReactNode } from "react";
import "./Text.scss";

interface Props {
  className: string;
  children: ReactNode;
}

export const Text = ({ children, className }: Props) => {
  return <span className={className}>{children}</span>;
};

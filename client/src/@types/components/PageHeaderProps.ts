import { ReactNode } from "react";

export interface PageHeaderProps {
  title: string;
  type: "purple" | "white";
  icons?: Array<(size: number, color: string, index: number) => ReactNode>,
  search?: {state: any, setState: (param: any) => void} | undefined;
}
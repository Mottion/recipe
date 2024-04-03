import { ReactNode } from "react";

export interface PageHeaderProps {
  title: string;
  icons?: Array<{
    icon: ReactNode,
    cb: Function
  }>
}
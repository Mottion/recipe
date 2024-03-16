export interface NotifyContextProps {
  visible: boolean,
  message: string,
  type: "positive" | "negative",
  showNotify: (message: string, type: NotifyContextProps["type"]) => void,
}
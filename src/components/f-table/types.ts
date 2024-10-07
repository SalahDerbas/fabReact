import { ColumnProps } from "primereact/column"

export interface ColumnType extends ColumnProps {
  type?: "number" | "text" | "boolean" | "select" | "not-editable" | "time"
  optionName?: string
  options?: any[]
}

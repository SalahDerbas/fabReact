import React from "react"
import { TreeTable, TreeTableProps } from "primereact/treetable"
import { Column } from "primereact/column"
import { ColumnType } from "../f-table/types"

interface props extends TreeTableProps {
  columns: ColumnType[]
}

export const FTreeTable: React.FC<props> = ({ columns, ...rest }) => {
  return (
    <TreeTable paginator rows={10} {...rest}>
      {columns.map((col) => (
        <Column {...col}></Column>
      ))}
    </TreeTable>
  )
}

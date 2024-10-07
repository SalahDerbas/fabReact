import { FC, useEffect, useState, useRef, useMemo, ReactNode, ReactElement } from "react"
import { DataTable, DataTableProps } from "primereact/datatable"
import { Column } from "primereact/column"
import { ColumnType } from "./types"
import { FButton, FGrid } from ".."
import { useWidth } from "src/utils"
import { Toolbar } from "primereact/toolbar"
import { CSSProperties } from "react"

const toolbarmobileStyle: CSSProperties = { height: "50px", backgroundColor: "#f2f2f2" }
export interface FTableProps extends DataTableProps {
  columns?: ColumnType[]
  sortable?: boolean
  exportType?: "CSV" // may be need to add another types Ex: "CSV" | "PDF"
  onClear?: () => void
  paginator?: boolean
  paginatorLeft?: ReactNode
  paginatorRight?: ReactNode
}

export const FTable: FC<FTableProps> = ({
  paginator,
  paginatorLeft,
  paginatorRight,
  rows = 16,
  scrollable = true,
  stripedRows = true,
  scrollHeight = "70vh",
  sortable,
  style,
  children,
  columns = [],
  exportFilename,
  exportType,
  onClear,
  ...rest
}) => {
  const [data, setdata] = useState<any[]>(rest.value!)

  const dataTableRef = useRef<any>(null)
  const resetData = () => {
    setdata(rest.value!)
  }

  useEffect(() => {
    resetData()
  }, [rest])

  const exportCSV = () => {
    dataTableRef.current.exportCSV({ selectionOnly: false })
  }

  let { header }: { header: ReactElement | null } = useMemo(() => {
    if (exportType || onClear) {
      //you can adding another condition (Or)
      return {
        header: (
          <FGrid justify="end">
            {exportType === "CSV" && (
              <FButton bg="primary" label="Export" icon="pi pi-file" onClick={exportCSV} disabled={!exportFilename} />
            )}
            {onClear && (
              <FButton
                bg="primary"
                label="Clear"
                icon="pi pi-times"
                onClick={onClear}
                disabled={!exportFilename || exportFilename === "un-fixed-data"}
                className="p-ml-auto"
              />
            )}
          </FGrid>
        ),
      }
    } else {
      return {
        header: null,
      }
    }
  }, [exportType, exportFilename, onClear])
  const { isMobile } = useWidth()

  return (
    <>
      {
        <DataTable
          ref={dataTableRef}
          rows={rows}
          dataKey="id"
          header={header}
          showGridlines
          value={data}
          paginator={paginator}
          paginatorRight={!isMobile ? paginatorRight : undefined}
          paginatorLeft={!isMobile ? paginatorLeft : undefined}
          paginatorTemplate={isMobile ? "PrevPageLink PageLinks NextPageLink" : undefined}
          paginatorClassName="jc-end"
          scrollable={true}
          stripedRows={stripedRows}
          scrollHeight={scrollHeight}
          style={{ ...style, width: "100%" }}
          className="f-table w-full"
          selectionMode="single"
          exportFilename={exportFilename}
          filterDisplay="menu"
          emptyMessage="No data found."
          size="small"
          {...rest}
        >
          {columns.map((col, index) => (
            <Column
              style={{ width: 220 }}
              filter
              {...col}
              key={index}
              frozen={col.frozen}
              className="f-column"
              sortable={sortable}
            />
          ))}

          {children}
        </DataTable>
      }
      {(paginatorRight || paginatorLeft) && isMobile && (
        <Toolbar className="w-full" left={paginatorRight} right={paginatorLeft} style={toolbarmobileStyle} />
      )}
    </>
  )
}

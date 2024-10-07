import { Column } from "primereact/column"
import { DataTable } from "primereact/datatable"
import { Dropdown } from "primereact/dropdown"
import { InputNumber } from "primereact/inputnumber"
import { InputText } from "primereact/inputtext"
import React, { useEffect, useMemo, useRef, useState } from "react"
import { FTableProps } from ".."
import { ContextMenu } from "primereact/contextmenu"
import { Calendar } from "primereact/calendar"
import moment from "moment"

// FTableCrud props
export type FEditableTableProps = FTableProps & {
  height?: string
  initialRow: any
  fixedRows?: boolean
  rerenderTheEdditableTableWhenGetNewData?: boolean
  onUpdateData: (data: any[]) => void
}
const groupedItemTemplate = (option: any) => {
  return (
    <div className="flex align-items-center country-item">
      <div>{option.name}</div>
    </div>
  )
}

export const FEditableTable: React.FC<FEditableTableProps> = ({
  children,
  onUpdateData,
  initialRow,
  value = [],
  columns = [],
  fixedRows,
  className,
  height,
  rerenderTheEdditableTableWhenGetNewData,
  ...rest
}) => {
  const cellEditor = (options: any) => {
    const { value, field, rowIndex, type, optionName, header, options: selectOptions } = options
    let inputNumberExtraProps = {}
    if (header === "Percentage") {
      inputNumberExtraProps = {
        max: 100,
      }
    }
    const getTheDate = (date: number) => {
      var d = new Date()
      var quotient = Math.floor(date / 60)
      var remainder = date % 60
      d.setHours(quotient, remainder, 0)
      return d
    }
    let newValue: any = value
    if(type == "time" && value !== null) {
      newValue = getTheDate(value)
    }
    
    let dropoptions: any = selectOptions ?? []
    switch (type) {
      case "text":
        return (
          <InputText
            // style={inputStyle}
            className="p-input-table"
            type="text"
            value={newValue ?? ""}
            onChange={(e) => options.editorCallback(e.target.value)}
            style={{
              height: "10px",
              marginBottom: "-14px",
              marginTop: "-12px",
            }}
          />
        )
      case "number":
        return (
          <InputNumber
            // inputStyle={inputStyle}
            className="p-input-table"
            value={newValue ?? ""}
            minFractionDigits={2}
            // min={0}
            // max={100}
            onValueChange={(e) => options.editorCallback(e.value)}
            onChange={(e) => options.editorCallback(e.value)}
            {...inputNumberExtraProps}
            style={{ height: "10px", marginBottom: "-32px", marginTop: "-52px" }}
          />
        )
      case "select":
        return (
          <Dropdown
            value={optionName ? newValue[optionName] : newValue.name}
            options={dropoptions}
            onChange={(e) => {
              data[rowIndex][field] = e.value
              checkComplete(rowIndex)
            }}
            className="p-input-table"
            // placeholder={field === "material" ? "Select a material" : "Select a supplier"}
            optionGroupTemplate={groupedItemTemplate}
            optionLabel={optionName ? optionName : "name"}
            editable
            style={{
              height: "30px",
              marginBottom: "-12px",
              marginTop: "-10px",
            }}
          />
        )
      case "time":
        return (
          <Calendar
            className="p-input-table"
            timeOnly
            showTime
            hourFormat="24"
            style={{ height: "34px", borderWidth: "0px" }}
            value={ newValue ? newValue : new Date()} 
            onChange={(e) => {
              var convertToMinutes: number = 0
              if(e.value) {
                var newDate = new Date(e.value.toString())
                options.editorCallback(newDate.getMinutes() + (newDate.getHours() * 60))
              }
              else {
                options.editorCallback(convertToMinutes)
              }
            }}
          />
        )
      default:
        return (
          <InputText
            type="text"
            value={value ?? ""}
            style={{
              height: "10px",
              marginBottom: "-14px",
              marginTop: "-12px",
            }}
            onChange={(e) => options.editorCallback(e.target.value)}
          />
        )
    }
  }
  const checkComplete = (rowIndex: number) => {
    let complete = true,
      row = data[rowIndex]
    Object.keys(row).forEach((key) => {
      let element = row[key]
      if (key !== "index" && key !== "id") {
        if (element === "" || element === 0 || element === null || element?.name === "") {
          complete = false
          return
        }
      }
    })

    if (complete) {
      if (rowIndex === data.length - 1) {
        if (initialRow) data.push(Object.assign({}, { ...initialRow, index: data.length }))
      }
      //update data with out empty row
      let newData = data.concat()
      if (fixedRows === false) {
        newData.pop()
      }
      onUpdateData(newData)
    }
  }
  const onCellEditComplete = (e: any) => {
    let { rowIndex, rowData, newValue, field, originalEvent: event } = e
    if (typeof newValue !== "object")
      if (newValue !== "" && newValue !== 0) {
        rowData[field] = newValue
        checkComplete(rowIndex)
      } else event.preventDefault()
  }

  const rowsWithInitial: any[] = useMemo(() => {
    let valueTemp = value.concat().map((val, index) => ({ ...val, index }))
    if (initialRow) valueTemp.push(Object.assign({}, { ...initialRow, index: valueTemp.length }))
    return valueTemp
  }, [value, initialRow])

  const menuModel = [
    {
      label: "Delete",
      icon: "pi pi-fw pi-times",
      command: () => {
        deleteItem(selectedItem)
      },
    },
  ]
  const deleteItem = (item: any) => {
    let complete = true
    Object.keys(item).forEach((key) => {
      let element = item[key]
      if (key !== "index" && key !== "startTime" && key !== "endTime")
        if (element === "" || element === 0 || element?.name === "") {
          complete = false
          return
        }
    })
    if (complete) {
      let _data = [...data]
      _data = _data.filter((p: any) => p.index !== item.index)
      setData(_data)
      let newData = _data.concat()
      newData.pop()
      onUpdateData(newData)
    }
  }
  //states
  let newData = rowsWithInitial
  if (rerenderTheEdditableTableWhenGetNewData == true) {
    newData = []
  }
  const [data, setData] = useState<any[]>(newData)
  const [selectedItem, setSelectedItem] = useState<any>(null)
  const contextMenuRef: any = useRef(null)

  useEffect(() => {
    if (rerenderTheEdditableTableWhenGetNewData == true) {
      setData(rowsWithInitial)
    }
  }, [rowsWithInitial])
  return (
    <>
      <ContextMenu model={menuModel} ref={contextMenuRef} onHide={() => setSelectedItem(null)} />
      <DataTable
        value={data}
        style={height ? { height: height } : {}}
        className={className || "f-editable-table"}
        editMode="cell"
        scrollable
        scrollHeight="100%"
        stripedRows
        size="small"
        contextMenuSelection={selectedItem}
        onContextMenuSelectionChange={(e) => setSelectedItem(e.value)}
        onContextMenu={(e) => contextMenuRef.current.show(e.originalEvent)}
      >
        {columns.map(({ field, type, optionName, header, options, ...restCol }) => {
          return (
            <Column
              key={field}
              field={field}
              header={header}
              editor={
                type !== "not-editable" && ((editOptions) => cellEditor({ type, optionName, header, options, ...editOptions }))
              }
              onCellEditComplete={onCellEditComplete}
              {...restCol}
            />
          )
        })}
        {/* <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: "8rem" }}></Column> */}
      </DataTable>
    </>
  )
}

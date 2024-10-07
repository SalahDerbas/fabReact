import React, { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Route, useHistory, useParams } from "react-router-dom"
import { FButton, FTable } from "src/components"
import { ClearProductionTargetData, FetchProductionTargetsAsync, FetchUsersAsync } from "src/core/redux"
import { RootState } from "src/core/redux/store"
import { moments } from "src/utils"
import { AddProdductionTarget } from "./add-prodduction-target/add-prodduction-target"
import { AddBatchParameters } from "src/pages/operations/batch-parameter/add-batch-parameter/add-batch-parameter"

interface props {}

export const ProdductionTarget: React.FC<props> = (props) => {
  let history = useHistory()
  const dispatch = useDispatch()
  const { status, productionTargets, productionTarget } = useSelector((state: RootState) => state.ProductionTargets)
  useEffect(() => {
    dispatch(FetchProductionTargetsAsync())
    dispatch(FetchUsersAsync())
  }, [])

  const onRowClick = (e: any) => {
    history.push("/operations/production-targets/" + e.data.id)
  }

  const newProdTarg = () => {
    dispatch(ClearProductionTargetData())
    // productionTarget = undefined
    history.push("/operations/production-targets/new/production-target")
  }
  const tableActions = <FButton onClick={newProdTarg}>New Prod. Trg.</FButton>
  const paginatorLeft = (
    <FButton onClick={() => dispatch(FetchProductionTargetsAsync())} icon="pi pi-refresh" className="p-button-text" />
  )
  // const [selectedItem, setSelectedItem] = useState<any>(null)

  // const menuModel = [
  //   {
  //     label: "Open",
  //     icon: "pi pi-refresh",
  //     command: () => {
  //       OpenItem(selectedItem)
  //     },
  //   },
  //   {
  //     label: "Execute",
  //     icon: "pi pi-lock-open",
  //     // style : ,
  //     // className: `${selectedItem.id === "PUBLISHED_AKNOWLEDGED" ?? "w-1"}`,
  //     command: () => {
  //       ExecuteItem(selectedItem)
  //     },
  //   },
  // ]

  // const OpenItem = (selectedItem: any) => {
  //   // console.log(selectedItem)

  //   history.push("/operations/production-targets/" + selectedItem.id)
  // }
  // const ExecuteItem = (selectedItem: any) => {
  //   dispatch(ShowProductionTargetAsync(selectedItem.id))
  //   history.push("/operations/batch-parameters/new/batch/" + selectedItem.id)
  //   // dispatch(ShowProductionTargetAsync(selectedItem.id))
  // }

  const cols = [
    { field: "date", header: "Day" },
    { field: "status", header: "Status" },

    { field: "version", header: "Version" },
    {
      field: "createdDate",
      header: "Created Date",
      body: (el: any) => {
        return moments(el.createdDate)
      },
    },
    {
      field: "lastModifiedDate",
      header: "Last Modified Date",
      body: (el: any) => {
        return moments(el.createdDate)
      },
    },
    { field: "createdByUser", header: "Created By" },
    { field: "modifiedByUser", header: "Modified By" },

    // { field: "current", header: "Current" },
    // { field: "co2Amount", header: "CO2 Amount" },
    // {
    //   field: "mix_design",
    //   header: "Mix Design",
    //   body: (rec: any) => {
    //     return rec?.mix?.name
    //   },
    // },
    // { field: "dryingCyclePeriod", header: "Drying Cycle Time" },
  ]

  // let menu: any
  // const items = [
  //   {
  //     label: "Open",
  //     icon: "pi pi-refresh",
  //     command: (e: any) => {
  //       history.push("/operations/production-targets/" + e.data.id)
  //     },
  //   },
  //   {
  //     label: "Execute",
  //     icon: "pi pi-lock-open",
  //     command: (e: any) => {
  //       history.push("/operations/batch-parameters/new/batch/" + e.data.id)
  //     },
  //   },
  // ]
  // const actionBodyTemplate = (e: any) => {
  //   return (
  //     <div>
  //       <Menu model={items} popup={true} ref={(e) => (menu = e)} className="menuStyles1" />
  //       <FButton onClick={(e) => menu.toggle(e)} icon="pi pi-cog" />
  //     </div>
  //   )
  // }
  return (
    <>
      <Route exact path={`/operations/production-targets/new/production-target`} render={() => <AddProdductionTarget />} />
      <Route exact path={`/operations/production-targets/:production_target_id`} render={() => <AddProdductionTarget />} />
      <Route exact path={`/operations/batch-parameters/new/batch/:production_target_id`} render={() => <AddBatchParameters />} />
      <Route
        path={`/operations/production-targets`}
        exact
        render={() => (
          <>
            <FTable
              value={productionTargets}
              paginatorRight={tableActions}
              paginator
              dataKey="id"
              sortable
              scrollable={false}
              // header={header}
              // loading={status === "loading"}
              editMode="row"
              columns={cols}
              loading={status === "loading"}
              paginatorLeft={paginatorLeft}
              onRowClick={onRowClick}
              // contextMenuSelection={selectedItem}
              // onContextMenuSelectionChange={(e) => setSelectedItem(e.value)}
              // onContextMenu={(e) => contextMenuRef.current.show(e.originalEvent)}
              // globalFilter={globalFilter}
            />

            {/* <div className="datatable-doc-demo"> */}
            {/* <div className="card"> */}
            {/* <DataTable
              dataKey="id"
              value={productionTargets}
              // onRowClick={onRowClick}
              // onRowDoubleClick={onRowDoubleClick}
              paginator
              className="f-table w-full"
              onRowSelect={onRowSelect}
              selectionMode="single"
              filterDisplay="menu"
              emptyMessage="No data found."
              size="small"
              showGridlines
              // className="p-datatable-customers"
              rows={10}
              paginatorClassName="jc-end"
              stripedRows
              contextMenuSelection={selectedItem}
              scrollHeight="70vh"
              paginatorLeft={paginatorLeft}
              paginatorRight={tableActions}
              rowHover
              style={{ width: "100%" }}
              loading={status === "loading"}
              responsiveLayout="scroll"
              globalFilterFields={["name", "country.name", "representative.name", "balance", "status"]}
              // currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
            >
              <Column
                field="date"
                header="Day"
                frozen
                sortable
                filter
                style={{ width: 220 }}
                //  style={{ minWidth: "14rem" }}
                className="f-column"
              />
              <Column
                field="status"
                header="Status"
                sortable
                frozen
                style={{ width: 220 }}
                filter
                // filterMenuStyle={{ width: "14rem" }}
                // style={{ minWidth: "10rem" }}
                // body={statusBodyTemplate}
                className="f-column"
              />
              <Column
                field="version"
                header="Version"
                sortable
                frozen
                className="f-column"
                // style={{ minWidth: "14rem" }}
                filter
                style={{ width: 220 }}
              />
              <Column
                field="createdDate"
                header="Created Date"
                sortable
                frozen
                filter
                style={{ width: 220 }}
                className="f-column"
                // style={{ minWidth: "14rem" }}
                body={(el: any) => {
                  return moments(el.createdDate)
                }}
              />
              <Column
                field="lastModifiedDate"
                header="Last Modified Date"
                sortable
                frozen
                filter
                style={{ width: 220 }}
                className="f-column"
                // style={{ minWidth: "14rem" }}
                body={(el: any) => {
                  return moments(el.lastModifiedDate)
                }}
              />

              <Column
                field="createdByUser"
                className="f-column"
                header="Created By User"
                sortable
                frozen
                filter
                style={{ width: 220 }}
              />
              <Column
                field="modifiedByUser"
                className="f-column"
                header="Modified By User"
                sortable
                frozen
                filter
                style={{ width: 220 }}
              />
              <Column
                header="Edit"
                // headerStyle={{ width: "4rem", textAlign: "center" }}
                bodyStyle={{ textAlign: "center", width: "10px" }}
                body={actionBodyTemplate}
              />
            </DataTable> */}
            {/* </div> */}
            {/* </div> */}

            {/* <ContextMenu model={menuModel} ref={contextMenuRef} onHide={() => setSelectedItem(null)} /> */}
          </>
        )}
      />
    </>
  )
}

import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Route, Switch, useHistory } from "react-router-dom"
import { FButton, FTable } from "src/components"
import { FetchSuppliersAsync } from "src/core/redux"
import { RootState } from "src/core/redux/store"
import { moments } from "src/utils"
import { AddSupplier } from "./add-supplier/add-supplier"

interface props {}
const cols = [
  { field: "name", header: "Name" },
  { field: "phone", header: "Phone" },
  { field: "email", header: "Email" },
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
  // { field: "address", header: "Address" },
]
export const Suppliers: React.FC<props> = (props) => {
  const dispatch = useDispatch()
  const { status, suppliers } = useSelector((state: RootState) => state.Suppliers)

  let history = useHistory()

  const newSupplier = () => history.push("/definitions/suppliers/new")
  const paginatorRight = <FButton onClick={newSupplier}>New Supplier</FButton>
  const paginatorLeft = <FButton onClick={() => dispatch(FetchSuppliersAsync())} icon="pi pi-refresh" className="p-button-text" />
  // const { isMobile } = useWidth()
  useEffect(() => {
    dispatch(FetchSuppliersAsync())
  }, [])
  return (
    <Switch>
      <Route path={`/definitions/suppliers/new`} render={() => <AddSupplier />} />
      <Route path={`/definitions/suppliers/:supplier_id`} render={() => <AddSupplier />} />

      <Route
        path={`/definitions/suppliers`}
        render={() => (
          <FTable
            sortable
            paginator
            dataKey="id"
            columns={cols}
            editMode="row"
            value={suppliers}
            scrollable={false}
            loading={status === "loading"}
            paginatorLeft={paginatorLeft}
            paginatorRight={paginatorRight}
            onRowClick={(e) => history.push("/definitions/suppliers/" + e.data.id)}
          />
        )}
      />
    </Switch>
  )
}

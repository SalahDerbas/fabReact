//import { FormBuilder } from "src/components/form-builder";
import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Route, Switch, useHistory } from "react-router-dom"
import { FButton, FTable } from "src/components"
import { FetchMaterialsAsync } from "src/core/redux"
import { RootState } from "src/core/redux/store"
import { moments } from "src/utils"
import { AddMaterial } from "./add-materials/add-materials"

interface props {}
const cols = [
  { field: "name", header: "Name" },
  { field: "desc", header: "Description" },
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
]

export const Materials: React.FC<props> = (props) => {
  //Hooks
  let history = useHistory()
  const dispatch = useDispatch()
  const { status, materials } = useSelector((state: RootState) => state.Materials)
  useEffect(() => {
    dispatch(FetchMaterialsAsync())
  }, [])

  const newMaterial = () => {
    history.push("/definitions/materials/new")
  }
  const paginatorRight = <FButton onClick={newMaterial}>New Material</FButton>
  const paginatorLeft = <FButton onClick={() => dispatch(FetchMaterialsAsync())} icon="pi pi-refresh" className="p-button-text" />
  const onClickRow = (e: any) => history.push(`/definitions/materials/${e.data.id}`)

  return (
    <Switch>
      <Route path={"/definitions/materials/new"} render={() => <AddMaterial />} />
      <Route path={"/definitions/materials/:material_id"} render={() => <AddMaterial />} />

      <Route
        path={"/definitions/materials"}
        render={() => (
          <FTable
            dataKey="id"
            paginator
            sortable
            editMode="row"
            columns={cols}
            value={materials}
            scrollable={false}
            loading={status === "loading"}
            paginatorRight={paginatorRight}
            paginatorLeft={paginatorLeft}
            onRowClick={onClickRow}
          />
        )}
      />
    </Switch>
  )
}

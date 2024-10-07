//import { FormBuilder } from "src/components/form-builder";
import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Route, Switch, useHistory } from "react-router-dom"
import { FButton, FTable } from "src/components"
import { FetchBlockTypesAsync } from "src/core/redux"
import { RootState } from "src/core/redux/store"
import { AddBlockType } from "./add-block/add-block-type"
import { moments } from "src/utils"
interface props {}

const cols = [
  { field: "type", header: "Type" },
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
export const BlocksType: React.FC<props> = (props) => {
  //Hooks
  const dispatch = useDispatch()
  const { status, blockTypes } = useSelector((state: RootState) => state.BlocksType)

  let { push } = useHistory()

  useEffect(() => {
    dispatch(FetchBlockTypesAsync())
  }, [])

  const newBlockType = () => push("/definitions/block-type/new")
  const paginatorRight = <FButton onClick={newBlockType}>New Block Type</FButton>
  const paginatorLeft = (
    <FButton onClick={() => dispatch(FetchBlockTypesAsync())} icon="pi pi-refresh" className="p-button-text" />
  )

  //Events
  const onClickRow = (e: any) => push("/definitions/block-type/" + e.data.id)
  return (
    <Switch>
      <Route path={`/definitions/block-type/new`} render={() => <AddBlockType />} />
      <Route path={`/definitions/block-type/:blockType_id`} render={() => <AddBlockType />} />

      <Route
        path={`/definitions/block-type`}
        render={() => (
          <FTable
            sortable
            paginator
            dataKey="id"
            columns={cols}
            editMode="row"
            value={blockTypes}
            scrollable={false}
            loading={status === "loading"}
            paginatorLeft={paginatorLeft}
            paginatorRight={paginatorRight}
            onRowClick={onClickRow}
          />
        )}
      />
    </Switch>
  )
}

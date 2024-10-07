import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Route, Switch, useHistory } from "react-router-dom"
import { FButton, FTable } from "src/components"
import { FetchMixDesignsAsync } from "src/core/redux"
import { RootState } from "src/core/redux/store"
import { moments } from "src/utils"
import { AddMixDesign } from "./add-mixdesign/add-mixdesign"

interface props {}

const cols = [
  { field: "name", header: "Name" },
  { field: "desc", header: "Descriptions" },
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

export const MixDesigns: React.FC<props> = () => {
  let history = useHistory()
  const dispatch = useDispatch()
  const { status, mixDesigns } = useSelector((state: RootState) => state.MixDesigns)

  useEffect(() => {
    dispatch(FetchMixDesignsAsync())
  }, [])

  const newMixDesign = () => history.push("/definitions/mix-design/new")
  const paginatorRight = <FButton onClick={newMixDesign}>New Mix design</FButton>
  const paginatorLeft = (
    <FButton onClick={() => dispatch(FetchMixDesignsAsync())} icon="pi pi-refresh" className="p-button-text" />
  )

  return (
    <Switch>
      <Route path={`/definitions/mix-design/new`} render={() => <AddMixDesign />} />
      <Route path={`/definitions/mix-design/:mixdesign_id`} render={() => <AddMixDesign />} />
      <Route
        path={`/definitions/mix-design`}
        render={() => (
          <FTable
            sortable
            paginator
            dataKey="id"
            editMode="row"
            columns={cols}
            value={mixDesigns}
            loading={status === "loading"}
            paginatorRight={paginatorRight}
            paginatorLeft={paginatorLeft}
            onRowClick={(e) => history.push("/definitions/mix-design/" + e.data.id)}
          />
        )}
      />
    </Switch>
  )
}

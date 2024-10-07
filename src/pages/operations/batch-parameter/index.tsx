import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Route, useHistory } from "react-router-dom"
import { FTable } from "src/components"
import { RootState } from "src/core/redux/store"
import { AddBatchParameters } from "./add-batch-parameter/add-batch-parameter"

interface props {}
const cols = [
  { field: "productionTarget.date", header: "Batch parameters" },
  { field: "productionTarget.status", header: "Acknowledged By " },
  { field: "batchNumber", header: "Batches Count" },
  { field: "productionTarget.state", header: "Status" },
  // { field: "productionTarget.operator", header: "Operator Name" },
  // { field: "startTime", header: "Start Time" },
  // { field: "productionTarget", header: "productionTarget" },
  // { field: "version", header: "version" },
  // { field: "humidety", header: "humidety" },
  // { field: "createdDate", header: "createdDate" },
  // { field: "lastModifiedDate", header: "lastModifiedDate" },
  // { field: "createdByUser", header: "createdByUser" },
  // { field: "modifiedByUser", header: "modifiedByUser" },
]
export const BatchParameters: React.FC<props> = (props) => {
  let history = useHistory()
  const dispatch = useDispatch()
  const { status, batchParameters } = useSelector((state: RootState) => state.BatchParameters)
  useEffect(() => {
    // dispatch(FetchBatchParametersAsync())
  }, [])

  const onRowClick = (row: any) => {
    // dispatch(setCurrentBatch(row.data?.productionTarget?.state))
    history.push("/operations/batch-parameters/new/batch-parameter")
  }
  // const newBatchPara = () => {
  //   history.push("/operations/batch-parameters/new/batch-parameter")
  // }
  // const tableActions = <FButton onClick={newBatchPara}>New Batch Para.</FButton>
  // const paginatorLeft = (
  //   <FButton onClick={() => dispatch(FetchBatchParametersAsync())} icon="pi pi-refresh" className="p-button-text" />
  // )

  return (
    <>
      <Route exact path={"/operations/batch-parameters/new/batch-parameter"} render={() => <AddBatchParameters />} />
      <Route exact path={`/operations/batch-parameters/:batch-parameter_id`} render={() => <AddBatchParameters />} />
      <Route exact path={`/operations/batch-parameters/new/batch/:production_target_id`} render={() => <AddBatchParameters />} />
      <Route
        path={`/operations/batch-parameters`}
        exact
        render={() => (
          <FTable
            value={batchParameters}
            paginator
            //paginatorRight={tableActions}
            dataKey="id"
            sortable
            scrollable={false}
            // header={header}
            // loading={status === "loading"}
            editMode="row"
            columns={cols}
            loading={status === "loading"}
            // paginatorLeft={paginatorLeft}
            onRowClick={onRowClick}
            // globalFilter={globalFilter}
          />
        )}
      />
    </>
  )
}

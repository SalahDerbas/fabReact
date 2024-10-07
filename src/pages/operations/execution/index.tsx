import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
import { FTreeTable } from "src/components"
import { FetchProductionTargetsAsync } from "src/core/redux"
// import { RootState } from "src/core/redux/store"

interface props {}
const cols = [
  { field: "name", header: "Name", expander: true },

  { field: "date", header: "Day" },
  { field: "status", header: "Status" },

  { field: "version", header: "Version" },

  { field: "createdByUser", header: "Created By" },
  { field: "modifiedByUser", header: "Modified By" },
]
export const Execution: React.FC<props> = (props) => {
  //hooks
  const dispatch = useDispatch()
  // const { productionTree, status } = useSelector((state: RootState) => state.ProductionTargets)
  useEffect(() => {
    dispatch(FetchProductionTargetsAsync())
  }, [])

  return (
    <>
      <FTreeTable columns={cols} value={[]} loading={false} />
    </>
  )
}

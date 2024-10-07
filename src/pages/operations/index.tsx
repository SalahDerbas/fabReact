import React from "react"
import { FSpace } from "src/components"
import { Redirect, Route, Switch } from "react-router-dom"
import { BatchParameters } from "./batch-parameter"
import { ProdductionTarget } from "./production-target"
import { Execution } from "./execution"

interface props {}

export const Operations: React.FC<props> = () => {
  return (
    <FSpace direction="vertical">
      <Switch>
        <Route path={"/operations/batch-parameters"} render={() => <BatchParameters />} />
        <Route path={"/operations/production-targets"} render={() => <ProdductionTarget />} />
        <Route path={"/operations/execution"} render={() => <Execution />} />
        <Route path="*" render={() => <Redirect to="/otherPages/notFound" />} />
      </Switch>
    </FSpace>
  )
}

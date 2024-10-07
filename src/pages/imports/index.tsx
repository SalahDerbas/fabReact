//import { FormBuilder } from "src/components/form-builder";
import React from "react"
import { Redirect, Route, Switch } from "react-router-dom"
import { AhutrendTable } from "./ahu"
import { StillagetrendTable } from "./stillage"

interface props {}

export const Imports: React.FC<props> = (props) => {
  return (
    <Switch>
      <Route path={"/imports/ahu"} render={() => <AhutrendTable />} />
      <Route path={"/imports/stillage"} render={() => <StillagetrendTable />} />
      <Route path="*" render={() => <Redirect to="/otherPages/notFound" />} />
    </Switch>
  )
}

//import { FormBuilder } from "src/components/form-builder";
import React from "react"
import { FSpace } from "src/components"
import { Redirect, Route, Switch } from "react-router-dom"
import { Suppliers } from "./suppliers"
import { Materials } from "./materials"
import { MixDesigns } from "./mix-design"
import { BlocksType } from "./block-type"

interface props {}

export const Definitions: React.FC<props> = (props) => {
  return (
    <FSpace direction="vertical">
      <Switch>
        <Route path={`/definitions/suppliers`} render={() => <Suppliers />} />
        <Route path={"/definitions/materials"} render={() => <Materials />} />
        <Route path={"/definitions/block-type"} render={() => <BlocksType />} />
        <Route path={"/definitions/mix-design"} render={() => <MixDesigns />} />
        <Route path="*" render={() => <Redirect to="/otherPages/notFound" />} />
      </Switch>
    </FSpace>
  )
}

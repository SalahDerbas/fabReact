import React from "react"
import { Route } from "react-router-dom"
import { AccessDenied } from "./accessDenied"
import { NotFound } from "./notFound"

interface props {}

export const OtherPages: React.FC<props> = (props) => {
  return (
    <div style={{ marginLeft: "30px" }}>
      <Route path={`/otherPages/accessDenied`} render={() => <AccessDenied />} />
      <Route path={`/otherPages/notFound`} render={() => <NotFound />} />
    </div>
  )
}

import React from "react"
import { Route } from "react-router-dom"
import { Generals } from "./general"

interface props {}

export const Setting: React.FC<props> = () => {
  return (
    <>
      <Route path={`/setting`} render={() => <Generals />} />
    </>
  )
}

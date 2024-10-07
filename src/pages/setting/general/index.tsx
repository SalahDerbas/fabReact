//import { FormBuilder } from "src/components/form-builder";
import React from "react"
import { Route, Switch, useParams } from "react-router-dom"
import { FCol, FGrid, FPaper } from "src/components"
import { TabView, TabPanel } from "primereact/tabview"
import { AddGeneral } from "./add-general"
import { AddBoard } from "./add-board"
interface props {}

export const Generals: React.FC<props> = () => {
  return (
    <Switch>
      <Route
        path={`/setting`}
        render={() => (
          <FPaper>
            <TabView>
              <TabPanel header="Board">
                <AddBoard />
              </TabPanel>
              <TabPanel header="General">
                <AddGeneral />
              </TabPanel>

              <TabPanel header="Stacker">
                <FGrid>
                  <FCol lg={12} sm={12}>
                    <FGrid justify="center" style={{ height: "647px" }}></FGrid>
                  </FCol>
                </FGrid>
              </TabPanel>
              <TabPanel header="Fingers Cart">
                <FGrid>
                  <FCol lg={12} sm={12}>
                    <FGrid justify="center" style={{ height: "647px" }}></FGrid>
                  </FCol>
                </FGrid>
              </TabPanel>
            </TabView>
          </FPaper>
        )}
      />
    </Switch>
  )
}

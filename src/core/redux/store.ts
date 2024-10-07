import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import Authentication from "src/core/redux/auth"
import App from "src/core/redux/app"
import Stillage from "src/core/redux/import/stillage"
import Ahu from "src/core/redux/import/ahu"
import Dashboard from "src/core/redux/home/dashboard"
import Suppliers from "src/core/redux/definitions/supplier"
import MixDesigns from "src/core/redux/definitions/mixdesign"
import Materials from "src/core/redux/definitions/material"
import ProductionTargets from "src/core/redux/operations/productionTarget"
import BlocksType from "src/core/redux/definitions/blockType"
import Boards from "src/core/redux/board"
import BatchParameters from "src/core/redux/operations/batchParameter"
import DryingCycle from "src/core/redux/operations/dryingCycle"
import CuringCycle from "src/core/redux/operations/curingCycle"
import Summary from "src/core/redux/operations/summary"
import PurgingCycle from "src/core/redux/operations/purgingCycle"
import GeneralSetting from "src/core/redux/settings/general"

export const store = configureStore({
  reducer: {
    App,
    Authentication,
    Stillage,
    Ahu,
    Dashboard,
    Suppliers,
    MixDesigns,
    Materials,
    ProductionTargets,
    BlocksType,
    Boards,
    BatchParameters,
    DryingCycle,
    CuringCycle,
    Summary,
    PurgingCycle,
    GeneralSetting,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>

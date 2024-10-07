import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import RequestStatus from "src/constants/enums/request-status"
import { AppState } from "src/core/interface"

let initialState: AppState = {
  status: "no-thing",
  sidebarOpen: true,
}

const App = createSlice({
  name: "App",
  initialState,
  reducers: {
    setStatus: (state, { payload }: PayloadAction<RequestStatus>) => {
      state.status = payload
    },
    setSidebarOpen: (state) => {
      state.sidebarOpen = !state.sidebarOpen
    },
  },
})
export const { setSidebarOpen } = App.actions
export default App.reducer

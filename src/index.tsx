import React from "react"
import ReactDOM from "react-dom"
import { store } from "./core/redux/store"
import { Provider } from "react-redux"
import * as serviceWorker from "./serviceWorker"
import PrimeReact from "primereact/api"
import { CookiesProvider } from "react-cookie"
import { Routes } from "./routes/Routes"
import { Toast } from "primereact/toast"

//08-May-2022
//  checked by drbas
//Imports all custom styles
// import "./shared/style.global.scss"
import "./assets/layout/style.global.scss"

//prime react config
PrimeReact.ripple = true
PrimeReact.appendTo = document.getElementsByTagName("body")[0]

//Reference to active toast in any page in project
export var toast = React.createRef<Toast>()

/*------------------------------|| Render ||------------------------------------------------*/
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      {/*Assign reference to primereact Toast component */}
      <Toast ref={toast} />
      <CookiesProvider>
        <Routes />
      </CookiesProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()

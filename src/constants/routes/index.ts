import { Home, Imports, Login, Operations, OtherPages, Setting } from "src/pages"
import { Definitions } from "src/pages/definitions"
import { RouteType } from "src/core/interface/routeType"
import { AdminRoutes } from "src/core/interface/adminRoutes"


export const publicRoutes: RouteType[] = [
  {
    path: "/login",
    component: Login,
  },
]

export const priveateRoutesRD: RouteType[] = [
  { path: "/", component: Home, exact: true },
  { path: "/imports", component: Imports },
  { path: "/operations", component: Operations },
  { path: "/setting", component: Setting },
  { path: "/definitions", component: Definitions },
  { path: "/otherPages", component: OtherPages },
]

export const priveateRoutesOperator: RouteType[] = [
  { path: "/", component: Home, exact: true },
  { path: "/imports", component: Imports },
  { path: "/operations", component: Operations },
  { path: "/setting", component: Setting },
  { path: "/otherPages", component: OtherPages },
]

export const priveateRoutesAnalyst: RouteType[] = [
  { path: "/", component: Home, exact: true },
  { path: "/imports", component: Imports },
  { path: "/operations", component: Operations },
  { path: "/setting", component: Setting },
  { path: "/definitions", component: Definitions },
  { path: "/otherPages", component: OtherPages },
]

export const priveateRoutesUser: RouteType[] = [
  { path: "/", component: Home, exact: true },
  { path: "/imports", component: Imports },
  { path: "/operations", component: Operations },
  { path: "/setting", component: Setting },
  { path: "/definitions", component: Definitions },
  { path: "/otherPages", component: OtherPages },
]


export const adminsRoutes: AdminRoutes[] = [
  { routes: priveateRoutesRD, adminName: "ROLE_ADMIN", priority: 1 },
  { routes: priveateRoutesOperator, adminName: "ROLE_OPERATOR", priority: 2 },
  { routes: priveateRoutesAnalyst, adminName: "ROLE_ANALYST", priority: 2 },
  { routes: priveateRoutesUser, adminName: "ROLE_USER", priority: 2 },
]

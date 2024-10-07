// import { Dispatch, SetStateAction, useState } from "react"

import { useMemo } from "react"
import { AdminRoutes, RouteType } from "src/core/interface"

//This hook for get routes by admin types.
export const useRoutesForAdmin = (userRoles: string[], adminsRoutes: AdminRoutes[]): RouteType[] => {
  const privateRoutesByAdminType = useMemo(() => {
    let currentRoutes: any = null
    //Get the best priority of the user role.
    //Best priority has minimum value.
    adminsRoutes.forEach((adminRoutes) => {
      const { adminName, priority } = adminRoutes
      if (userRoles.includes(adminName) && (!currentRoutes || currentRoutes.priority > priority)) {
        currentRoutes = adminRoutes
      }
    })
    //If no user role in adminsRoutes return first routes.
    return currentRoutes ? currentRoutes.routes : adminsRoutes[0].routes
  }, [userRoles, adminsRoutes])
  return privateRoutesByAdminType
}

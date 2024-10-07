import { PageInformationType } from "src/core/interface/pageInformationType"

export enum PageType {
  LOGIN,
  REGISTER,
  VERIFY,
}


export const getPageInformations = (pageType: PageType): PageInformationType => {
  switch (pageType) {
    case PageType.LOGIN:
      return {
        pageTitle: "Fabsight Management",
        redirectMessage: " if you don't have an account",
        redirectPath: "/register",
        redirectWord: "Register",
      }
    case PageType.REGISTER:
      return {
        pageTitle: "Create an account",
        redirectMessage: " if you have an account",
        redirectPath: "/login",
        redirectWord: "Login",
      }
    case PageType.VERIFY:
      return {
        pageTitle: "Verify your email",
      }
    default:
      return { pageTitle: "Can't found this page name" }
  }
}

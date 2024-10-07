import { capitalize } from "./capitalize"

export const splitToCapitalized = (string: string) => {
  return string.split(/(?=[A-Z])/)?.map((word) => capitalize(word) + " ")
}

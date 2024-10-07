//Used to remove some keys from object
export const filterObjectKeys = (obj: any, notNeededItem: any[]): any => {
  return Object.entries(obj).filter(([key, _]: [string, any]) => !notNeededItem.includes(key))
}

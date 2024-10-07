let url = (window as any)?.env ? (window as any)?.env.REACT_APP_SERVER_HOST : process.env.REACT_APP_SERVER_HOST
export const apiUrl = `${url}/api`

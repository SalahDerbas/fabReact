import moment from "moment"

export const moments = (string: string) => {
    return moment(string).format("LLL")
}

import RequestStatus from "src/constants/enums/request-status"

export interface Supplier {
  id: string
  name: string
  phone: string
  email: string
  address: string
  createdDate: string
  createdByUser: string
  modifiedByUser: string
  lastModifiedDate: string
}

export interface SuppliersState {
  status: RequestStatus
  suppliers: Supplier[]
  supplier?: Supplier
}

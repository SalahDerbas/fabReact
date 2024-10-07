function isNumeric(value: string): boolean {
  return !isNaN(parseFloat(value))
}

export const importValidate = (data: any) => {
  let errors: { number?: string; date?: string; weight?: string } = {}
  // if (!data.id) {
  //   errors.id = "id is required."
  // }
  if (!data.number) {
    errors.number = "number is required"
  }
  if (!data.date) {
    errors.date = "date is required"
  }
  // if (!data.weight) {
  //   errors.weight = "weight is required."
  // }
  if (
    typeof data.date !== "string"
    // || !moment(data.date, "yyyy-MM-dd HH:mm:ss.SSS").isValid()
  ) {
    errors.date = "Invalid date format"
  }
  if (!isNumeric(data.number)) {
    errors.number = "Invalid number type"
  }
  // if (typeof data.id !== "string") {
  //   errors.id = "Invalid id type."
  // }
  //console.log(data.weight)
  if (data.weight && !isNumeric(data.weight)) {
    errors.weight = "Invalid weight type"
  }
  return errors
}
export const loginValidate = (data: any) => {
  let errors: {
    username?: string
    password?: string
  } = {}

  if (!data.username) {
    errors.username = "username is required."
  }
  //  else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)) {
  //   errors.email = "Invalid email address. E.g. example@email.com";
  // }

  if (!data.password) {
    errors.password = "Password is required."
  }
  return errors
}

// export const registerValidate = (data: any) => {
//   let errors: {
//     username?: string
//     first_name?: string
//     last_name?: string
//     email?: string
//     password?: string
//     confirmPassword?: string
//     phone?: string
//     date?: null
//     country?: null
//     accept?: any
//   } = {}
//   if (!data.username) {
//     errors.username = "User name is required."
//   }
//   if (!data.first_name) {
//     errors.first_name = "First name is required."
//   }
//   if (!data.last_name) {
//     errors.last_name = "Last name is required."
//   }

//   if (!data.email) {
//     errors.email = "Email is required."
//   } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)) {
//     errors.email = "Invalid email address. E.g. example@email.com"
//   }

//   if (!data.password) {
//     errors.password = "Password is required."
//   } else if (
//     !/^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})./i.test(data.password) &&
//     !/^^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/i.test(data.password)
//   ) {
//     errors.password = "Password is weak."
//   }
//   if (!data.confirmPassword) {
//     errors.confirmPassword = "Confirm Password is required."
//   } else if (data.confirmPassword !== data.password) {
//     errors.confirmPassword = "confirm password not match."
//   }

//   if (!data.accept) {
//     errors.accept = "You need to agree to the terms and conditions."
//   }
//   if (!data.phone) {
//     errors.phone = "Phone Number is required."
//   }

//   return errors
// }

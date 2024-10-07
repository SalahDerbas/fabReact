import React from "react"
import { FCol, FForm, FInputFormProps } from "src/components"
import { AuthComponent } from "src/components/auth"
import { PageType } from "src/constants/enums"
import { useDispatch, useSelector } from "react-redux"
import { SigninInput } from "src/core/models/auth"
import { RootState } from "src/core/redux/store"
import { LoginUserAsync } from "src/core/redux/auth"

interface props {}

export const Login: React.FC<props> = () => {
  const dispatch = useDispatch()
  const { status } = useSelector((state: RootState) => state.Authentication)

  const onSubmitLogin = (data: any) => {
    const signinData: SigninInput = {
      username: data.username,
      password: data.password,
      //email: data.email
    }
    dispatch(LoginUserAsync(signinData))
  }
  const inputs: FInputFormProps[] = [
    {
      type: "text",
      name: "username",
      label: "User Name",
      placeholder: "User Name",
      validate: {
        required: true,
      },
    },

    {
      type: "password",
      name: "password",
      label: "Password",
      feedback: false,
      placeholder: "●●●●●●●●",
      validate: {
        required: true,
      },
    },
  ]

  return (
    <AuthComponent type={PageType.LOGIN}>
      <FCol span={12}>
        <FForm inputs={inputs} onSubmit={onSubmitLogin} submitLable="Login" status={status} />
      </FCol>
    </AuthComponent>
  )
}

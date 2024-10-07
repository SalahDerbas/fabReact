import { FC, ReactChild } from "react"
import { PageType, getPageInformations } from "src/constants/enums"
import { PageInformationType } from "src/core/interface/pageInformationType"

import { FGrid, FCol, FText } from "src/components"
interface AuthProps {
  children: ReactChild | ReactChild[]
  type?: PageType
  withLogo?: boolean
  withTitle?: boolean
}

export const AuthComponent: FC<AuthProps> = (props) => {
  const { children, type = PageType.LOGIN, withLogo = true, withTitle = true, ...restProps } = props
  const { pageTitle }: PageInformationType = getPageInformations(type)

  /*------------------------------|| Render ||------------------------------------------------*/
  return (
    <FGrid className="auth h-screen m-0" gap={1} justify="center" align="center" direction="column" {...restProps}>
      <FGrid gap={1} direction="column" align="center">
        {withLogo && (
          <FCol>
            <img id="app-logo" src="/images/logo.png" alt="fabsight" />
          </FCol>
        )}
        {withTitle && (
          <FCol>
            <FText fw="bold" color="primary" fs={3}>
              {pageTitle}
            </FText>
          </FCol>
        )}
      </FGrid>

      <FGrid className="form w-10 p-3" shadow={3} align="center" justify="center">
        {children}
      </FGrid>

      <FGrid className="footer w-10 text-center" justify="between" align="center">
        <FCol span={12} md={4}>
          <FText fw="bold" fs={4}>
            Fabsight
          </FText>
        </FCol>
        <FCol span={12} md={8}>
          <FText fw="bold" fs={5}>
            Copyright Ⓒ Fabsight Innovobot
          </FText>
        </FCol>
      </FGrid>
    </FGrid>
  )
}

import React from "react"
import { useHistory } from "react-router-dom"
import { FButton, FCol, FGrid, FSpace } from "src/components"
import notFound from "src/assets/images/Notfound.jpg"
interface props {}

export const NotFound: React.FC<props> = () => {
  let history = useHistory()
  const toHome = () => {
    history.push("/")
  }
  return (
    <>
      <div>
        <FGrid className="containerStyle" gap={1} justify="center" align="center" direction="column">
          <FGrid shadow={3} align="center" justify="center" className="formStyle">
            <FGrid gap={1} direction="column" align="center">
              <img src={notFound} alt="404" className="imageNotPage" />

              <FCol lg={12} sm={12} md={12} style={{ justifyContent: "flex-center" }}>
                <FSpace direction="horizontal" gap={40} style={{ justifyContent: "center" }}>
                  <FButton onClick={toHome}>Go To Home</FButton>
                </FSpace>
              </FCol>
            </FGrid>
          </FGrid>
        </FGrid>
      </div>
    </>
  )
}

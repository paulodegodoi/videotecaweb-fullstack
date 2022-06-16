import React from "react"
import { Footer } from "../Footer"
import { Header } from "../Header"
import { VideoList } from "../VideoList"

import { Container } from "./styles"

export const Layout = () => {
  return (
    <Container>
      <Header />
      <VideoList />
      <Footer />
    </Container>
  )
}

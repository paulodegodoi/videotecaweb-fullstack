import React, { useContext } from "react"

import { VideoContext } from "../../contexts/VideoContext"

import { IoTrashBin, IoThumbsUp, IoPencil } from "react-icons/io5"

import { Container, ButtonArea, Button } from "./styles"

import { VideosInterface } from "../VideoList"

interface VideoProps {
  id: string
  title: string
  link: string
  liked: boolean
}

export const Video = ({ _id, title, link, liked }: VideosInterface) => {
  const { handleEdit, handleLike, handleDelete } = useContext(VideoContext)

  return (
    <li>
      <Container>
        <h2>{title}</h2>
        <a href={link} target="_blank">
          {link}
        </a>
        <ButtonArea>
          <Button liked={liked} onClick={() => handleLike && handleLike(_id)}>
            <IoThumbsUp />
          </Button>
          <Button onClick={() => handleEdit && handleEdit(_id, title, link)}>
            <IoPencil />
          </Button>
          <Button onClick={() => handleDelete && handleDelete(_id)}>
            <IoTrashBin />
          </Button>
        </ButtonArea>
      </Container>
    </li>
  )
}

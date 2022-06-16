import React, { ChangeEvent, createContext, ReactNode, useState } from "react"
import { useAxios } from "../hooks/useAxios"

import { FormModal } from "../components/FormModal"

import api from "../services/api"

import { VideosInterface } from "../components/VideoList"

interface UserContextProps {
  children: ReactNode
}

// interface HandleEditProps {
//   videoTitle: string
//   videoLink: string
// }

type UserContextType = {
  openFormModal?: boolean
  setOpenFormModal?: (newState: boolean) => void
  handleAdd?: () => void
  handleClose?: () => void
  title?: string
  setTitle?: (newState: string) => void
  link?: string
  setLink?: (newState: string) => void
  titleHandler?: (event: React.ChangeEvent<HTMLInputElement>) => void
  linkHandler?: (event: React.ChangeEvent<HTMLInputElement>) => void
  handleSubmit?: (event: React.SyntheticEvent) => void
  handleEdit?: (videoId: string, videoTitle: string, videoLink: string) => void
  handleLike?: (id: string) => void
  handleDelete?: (id: string) => void
  id: string
  setId?: (videoId: string) => void
}

type VideoFormValuesType = {
  videoTitle: string
  videoLink: string
}

const initialValue = {
  openFormModal: false,
  // setOpenFormModal: () => {},
  // handleAdd: () => {},
  // handleClose: () => {},
  title: "",
  // setTitle: () => {},
  link: "",
  // setLink: () => {},
  // titleHandler: () => {},
  // linkHandler: () => {},
  // handleSubmit: () => {},
  id: "",
  // setId: () => {},
}

export const VideoContext = createContext<UserContextType>(initialValue)

export const VideoContextProvider = ({ children }: UserContextProps) => {
  const { data, mutate } = useAxios("videos")

  const [openFormModal, setOpenFormModal] = useState(initialValue.openFormModal)
  const [title, setTitle] = useState(initialValue.title)
  const [link, setLink] = useState(initialValue.link)
  const [id, setId] = useState(initialValue.id)

  function handleEdit(videoId: string, videoTitle: string, videoLink: string) {
    setTitle(videoTitle)
    setLink(videoLink)
    setId(videoId)

    setOpenFormModal(true)
  }

  function handleAdd() {
    setOpenFormModal(true)
  }

  function handleClose() {
    if (title) setTitle("")
    if (link) setLink("")

    setOpenFormModal(false)
  }

  function handleLike(id: string) {
    api.patch(`videos/${id}`)

    const updateVideos = {
      videos: data.videos?.map((video: VideosInterface) => {
        if (video._id === id) {
          return {
            ...video,
            title: video.title,
            link: video.link,
            liked: !video.liked,
          }
        }
        return video
      }),
    }

    mutate(updateVideos, false)
  }

  function handleDelete(id: string) {
    api.delete(`videos/${id}`)

    const updatedVideos = {
      videos: data.videos?.filter((video: VideosInterface) => video._id !== id),
    }

    mutate(updatedVideos, false)
  }

  function titleHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setTitle(event.target.value)
  }

  function linkHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setLink(event.target.value)
  }

  function handleSubmit(event: React.SyntheticEvent) {
    event.preventDefault()

    const video = {
      title,
      link,
    }

    if (id) {
      api.put(`videos/${id}`, video)

      const updatedVideos = {
        videos: data.videos?.map((video: VideosInterface) => {
          if (video._id === id) {
            return { ...video, title, link }
          }
          return video
        }),
      }

      mutate(updatedVideos, false)
    } else {
      api.post("videos", video)

      const updatedVideos = {
        videos: [...data.videos, video],
      }

      mutate(updatedVideos, false)
    }

    setOpenFormModal(false)
  }

  return (
    <VideoContext.Provider
      value={{
        handleAdd,
        handleClose,
        handleLike,
        handleDelete,
        handleSubmit,
        handleEdit,
        title,
        setTitle,
        link,
        setLink,
        id,
        setId,
        titleHandler,
        linkHandler,
      }}
    >
      {children}
      {openFormModal && <FormModal />}
    </VideoContext.Provider>
  )
}

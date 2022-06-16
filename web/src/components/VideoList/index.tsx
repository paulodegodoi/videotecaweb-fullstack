import { Video } from "../VIdeo"
import { AddVideo } from "../AddVideo"

import { Container, VideoListWrapper } from "./styles"

import { useAxios } from "../../hooks/useAxios"
import api from "../../services/api"

export interface VideosInterface {
  _id: string
  title: string
  link: string
  liked: boolean
}

export const VideoList = () => {
  const { data } = useAxios("videos")

  return (
    <Container>
      <VideoListWrapper>
        {data?.videos?.map((video: VideosInterface) => (
          <Video
            key={video._id}
            _id={video._id}
            title={video.title}
            link={video.link}
            liked={video.liked}
          />
        ))}
        <AddVideo />
      </VideoListWrapper>
    </Container>
  )
}

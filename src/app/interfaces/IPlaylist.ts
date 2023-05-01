import { ITrack } from "./ITrack"

export interface IPlaylist {
    id: string
    name: string
    imageUrl: string
    tracks?: ITrack[]
}
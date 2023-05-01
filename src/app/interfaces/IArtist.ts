import { ITrack } from "./ITrack";

export interface IArtist {
  id: string,
  name: string,
  imageUrl: string,
  tracks?: ITrack[]
}

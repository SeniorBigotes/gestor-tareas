import { Activities } from './IActivity';
import { Event } from './IEvent';

export interface Group {
  id: number,
  name: string,
  description: string,
  photoUrl: string,
  invitationCode?: string,
  creationDate: Date,
  activities: Activities[], 
  privacy: boolean, // miembros_: true vista publica | false vista solo participantes
  events: Event[],
  authors: number[],
  participants: number[]
}
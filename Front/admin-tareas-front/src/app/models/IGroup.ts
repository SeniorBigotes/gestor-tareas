import { Activities } from './IActivity';
import { Event } from './IEvent';

export interface Group {
  id: number,
  name: string,
  description: string,
  photoUrl: string,
  invitationCode?: string,
  creationDate: Date,
  privacy: boolean, // miembros_: true vista publica | false vista solo participantes
}
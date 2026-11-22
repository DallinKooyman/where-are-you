import { Position } from './position.js';
import { User } from './user.js';

export interface Location {
  id: string;
  user: User;
  position: Position;
  time: Date;
  createdAt: Date;
}

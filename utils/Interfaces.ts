export enum Role {
  User = 0,
  Bot = 1,
}

export interface Message {
  content: string;
  role: Role;
  timestamp: Date;
  source?: string;
}

export interface Chat {
  id: number;
  title: string;
}

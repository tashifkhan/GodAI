export enum Role {
  User = 0,
  Bot = 1,
}

export interface Source {
  title: string;
  url: string;
}

export interface Message {
  content: string;
  role: Role;
  timestamp: Date;
  sources?: Source[];
}

export interface Chat {
  id: number;
  title: string;
}

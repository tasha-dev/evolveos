// Codes by mahdi tasha
// Defining type for general things in whole app
export interface journal {
  id: number;
  createdAt: string;
  title: string;
  content: string;
}

export interface note {
  id: number;
  createdAt: string;
  content: string;
}

export interface task {
  id: number;
  createdAt: string;
  title: string;
  content: string;
  done: boolean;
}

export interface project {
  id: number;
  createdAt: string;
  title: string;
  content: string;
  done: boolean;
}

export interface habit {
  id: number;
  createdAt: string;
  title: string;
  doneAt: string[];
}

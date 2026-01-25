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
  title: string;
}

export interface task {
  id: number;
  createdAt: string;
  title: string;
  content: string;
  done: boolean;
  on: string; // ISO string of date and time, once
}

export interface project {
  id: number;
  createdAt: string;
  title: string;
  content: string;
  done: boolean;
  timing: {
    start: string;
    deadLine: string;
  };
}

export interface habit {
  id: number;
  createdAt: string;
  title: string;
  doneAt: string[];
  on: {
    days: 0 | 1 | 2 | 3 | 4 | 5 | 6 | "everyday";
    time: string;
  };
}

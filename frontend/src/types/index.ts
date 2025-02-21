export interface Task {
  id: string;
  title: string;
  isComplete: boolean;
  description?: string

}

export interface TaskPool {
  id: string;
  title: string;
  is_complete: boolean;
  description?: string;
}

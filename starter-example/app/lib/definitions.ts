export type User = {
    id: string;
    name: string;
    email: string;
    password: string;
    image_url:string;
  };
  

  export type Task= {
    id: string;
    user_id: string;
    description: string;
    date: string;
    status: 'pending' | 'finished';
  };

  export type LatestTask = {
    id: string;
    name: string;
    image_url: string;
    email: string;
    amount: string;
  };

  export type TasksTable = {
    id: string;
    user_id: string;
    name: string;
    email: string;
    image_url: string;
    date: string;
    description: string;
    status: 'pending' | 'finished';
  };
  
  export type UsersTableType = {
    id: string;
    name: string;
    email: string;
    image_url: string;
    total_tasks: number;
    total_pending: number;
    total_finished: number;
  };
  

export type FormattedUsersTable = {
    id: string;
    name: string;
    email: string;
    image_url: string;
    total_tasks: number;
    total_pending: string;
    total_finished: string;
  };
  
  export type UserField = {
    id: string;
    name: string;
  };
  
  export type TaskForm = {
    id: string;
    user_id: string;
    description: string;
    status: 'pending' | 'finished';
  };
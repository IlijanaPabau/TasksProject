// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.
// However, these types are generated automatically if you're using an ORM such as Prisma.
export type User = {
    id: string;
    name: string;
    email: string;
    password: string;
    image_url: string;
  };
  

  
  export type Task = {
    id: string;
    user_id: string;
    description: string;
    date: string;
    // In TypeScript, this is called a string union type.
    // It means that the "status" property can only be one of the two strings: 'pending' or 'finished'.
    status: 'pending' | 'finished';
  };
  
  
  export type LatestTask = {
    id: string;
    name: string;
    image_url: string;
    email: string;
    description: string;
    
  };
  
  export type LatestTaskRaw = Omit<LatestTask, 'description'> & {
    description: string;
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

  export type FormDataBody = {
    userId: string;
    description: string;
    status: string;
  };
  
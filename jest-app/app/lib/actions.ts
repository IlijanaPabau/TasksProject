'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signIn } from '../../auth';
import { AuthError } from 'next-auth';

const FormSchema = z.object({
  id: z.string(),
  userId: z.string({
    invalid_type_error: 'Please select a user.',
  }),
  description: z.string().nonempty("Description is required"),
  date: z.string(),
  status: z.enum(['pending', 'finished'], {
    invalid_type_error: 'Please select an task status.',
  }),
});

const CreateTask = FormSchema.omit({ id: true, date: true });
const UpdateTask = FormSchema.omit({ date: true, id: true });

export type State = {
  errors?: {
    userId?: string[];
    description?: string[];
    status?: string[];
  };
  message?: string | null;
};

export async function createTask(prevState: State, formData: FormData) {
  //Validate form fields using Zod
  const validatedFields = CreateTask.safeParse({
    userId: formData.get('userId'),
    description: formData.get('description'),
    status: formData.get('status'),
  });

  //If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Task.',
    };
  }

  // Prepare data for insertion into the database
  const { userId, description, status } = validatedFields.data;
  const date = new Date().toISOString().split('T')[0];

  // Insert data into the database
  try {
    await sql`
      INSERT INTO tasks (user_id, description, status, date)
      VALUES (${userId}, ${description}, ${status}, ${date})
    `;
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return {
      message: 'Database Error: Failed to Create Task.',
    };
  }
  // console.log('Form Data:', {
  //   userId: formData.get('userId'),
  //   description: formData.get('description'),
  //   status: formData.get('status'),
  // });

  console.log('here');
  
  
  // //Revalidate the cache for the tasks page and redirect the user.
  revalidatePath('/dashboard/tasks');
  redirect('/dashboard/tasks');
}

export async function updateTask(
  id: string,
  prevState: State,
  formData: FormData,
) {
  const validatedFields = UpdateTask.safeParse({
    userId: formData.get('userId'),
    description: formData.get('description'),
    status: formData.get('status'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Task.',
    };
  }

  const { userId, description, status } = validatedFields.data;

  try {
    await sql`
      UPDATE tasks
      SET user_id = ${userId}, description=${description}, status = ${status}
      WHERE id = ${id}
    `;
    }
    catch (error) {
    return { message: 'Database Error: Failed to Update Task.' };
  }

  revalidatePath('/dashboard/tasks');
  redirect('/dashboard/tasks');
}

export async function deleteTask(id: string) {
  // throw new Error('Failed to Delete Task');

  try {
    await sql`DELETE FROM tasks WHERE id = ${id}`;
    revalidatePath('/dashboard/tasks');
    return { message: 'Deleted Task' };
  } catch (error) {
    return { message: 'Database Error: Failed to Delete Task.' };
  }
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}
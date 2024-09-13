import { sql } from '@vercel/postgres';
import {
  UserField,
  UsersTableType,
  TaskForm,
  TasksTable,
  LatestTaskRaw
} from './definitions';

export async function fetchLatestTasks() {
  try {
    const data = await sql<LatestTaskRaw>`
      SELECT tasks.description, users.name, users.image_url, users.email, tasks.id
      FROM tasks
      JOIN users ON tasks.user_id = users.id
      ORDER BY tasks.date DESC
      LIMIT 5`;

    const latestTasks = data.rows.map((task) => ({
      ...task
    }));
    return latestTasks;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the latest tasks.');
  }
}

export async function fetchCardData() {
  try {

    const taskCountPromise = sql`SELECT COUNT(*) FROM tasks`;
    const userCountPromise = sql`SELECT COUNT(*) FROM users`;
    const taskStatusPromise = sql`SELECT
         COUNT(CASE WHEN status = 'finished' THEN 1 END) AS "finished",
         COUNT(CASE WHEN status = 'pending' THEN 1 END) AS "pending"
         FROM tasks`;

    const data = await Promise.all([
      taskCountPromise,
      userCountPromise,
      taskStatusPromise,
    ]);

    const numberOfTasks = Number(data[0].rows[0].count ?? '0');
    const numberOfUsers = Number(data[1].rows[0].count ?? '0');
    const totalFinishedTasks = Number(data[2].rows[0].finished ?? '0');
    const totalPendingTasks = Number(data[2].rows[0].pending ?? '0');

    return {
      numberOfUsers,
      numberOfTasks,
      totalFinishedTasks,
      totalPendingTasks,
    };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch card data.');
  }
}

const ITEMS_PER_PAGE = 6;
export async function fetchFilteredTasks(
  query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const tasks = await sql<TasksTable>`
      SELECT
        tasks.id,
        tasks.description,
        tasks.date,
        tasks.status,
        users.name,
        users.email,
        users.image_url
      FROM tasks
      JOIN users ON tasks.user_id = users.id
      WHERE
        users.name ILIKE ${`%${query}%`} OR
        users.email ILIKE ${`%${query}%`} OR
        tasks.description::text ILIKE ${`%${query}%`} OR
        tasks.date::text ILIKE ${`%${query}%`} OR
        tasks.status ILIKE ${`%${query}%`}
      ORDER BY tasks.date DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return tasks.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch tasks.');
  }
}

export async function fetchTasksPages(query: string) {
  try {
    const count = await sql`
      SELECT COUNT(*)
      FROM tasks
      JOIN users ON tasks.user_id = users.id
      WHERE
        users.name ILIKE ${`%${query}%`} OR
        users.email ILIKE ${`%${query}%`} OR
        tasks.description::text ILIKE ${`%${query}%`} OR
        tasks.date::text ILIKE ${`%${query}%`} OR
        tasks.status ILIKE ${`%${query}%`}
    `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of tasks.');
  }
}

export async function fetchTaskById(id: string) {
  try {
    const data = await sql<TaskForm>`
      SELECT
        tasks.id,
        tasks.user_id,
        tasks.description,
        tasks.status
      FROM tasks
      WHERE tasks.id = ${id};
    `;

    const task = data.rows.map((task) => ({
      ...task,
    }));

    return task[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch Task.');
  }
}

export async function fetchUsers() {
  try {
    const data = await sql<UserField>`
      SELECT
        id,
        name
      FROM users
      ORDER BY name ASC
    `;

    const users = data.rows;
    return users;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all users.');
  }
}


export async function fetchFilteredUsers(query: string) {
  try {
    const data = await sql<UsersTableType>`
		SELECT
		  users.id,
		  users.name,
		  users.email,
		  users.image_url,
		  COUNT(tasks.id) AS total_tasks,
		  COUNT(CASE WHEN status = 'finished' THEN 1 END) AS "finished",
      COUNT(CASE WHEN status = 'pending' THEN 1 END) AS "pending"
		FROM users
		LEFT JOIN tasks ON users.id = tasks.user_id
		WHERE
		  users.name ILIKE ${`%${query}%`} OR
        users.email ILIKE ${`%${query}%`}
		GROUP BY users.id, users.name, users.email, users.image_url
		ORDER BY users.name ASC
	  `;

    const users = data.rows.map((user) => ({
      ...user,
      total_pending: user.total_pending,
      total_finished: user.total_finished,
    }));

    return users;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch user table.');
  }
}
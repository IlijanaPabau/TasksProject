import { sql } from '@vercel/postgres';
import {
    UserField,
    UsersTableType,
    TasksTable,
    LatestTask,
    TaskForm
  } from './definitions';

  export async function fetchLatestInvoices() {
    try {
      const data = await sql<LatestTask>`
        SELECT tasks.description, users.name, users.image_url, users.email, tasks.id
        FROM tasks
        JOIN users ON tasks.user_id = users.id
        ORDER BY tasks.date DESC`;
  
      const latestTasks= data.rows.map((task: any) => ({
        ...task
      }));
      return latestTasks;
    } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Failed to fetch the latest invoices.');
    }
  }




  export async function fetchCardData() {
    try {

      const taskCountPromise = sql`SELECT COUNT(*) FROM tasks`;
      const userCountPromise = sql`SELECT COUNT(*) FROM users`;
  
      const data = await Promise.all([
        taskCountPromise,
        userCountPromise
      ]);
  
      const numberOfTasks = Number(data[0].rows[0].count ?? '0');
      const numberOfUsers = Number(data[1].rows[0].count ?? '0');
      const totalPaidTasks = Number(data[1].rows[0].finished ?? '0');
      const totalPendingTasks = Number(data[1].rows[0].pending ?? '0');
  
      return {
        numberOfUsers,
        numberOfTasks,
        totalPaidTasks,
        totalPendingTasks,
      };
    } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Failed to fetch card data.');
    }
  }
  


  const ITEMS_PER_PAGE = 6;
  export async function fetchFilteredTasks
  (
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
        JOIN users ON tasks,user_id = users.id
        WHERE
          users.name ILIKE ${`%${query}%`} OR
          users.email ILIKE ${`%${query}%`} OR
          tasks.amount::text ILIKE ${`%${query}%`} OR
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
      const count = await sql`SELECT COUNT(*)
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
      `
      const task = data.rows.map((task: any) => ({
        ...task
      }));
      return task[0];
      } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Failed to fetch task.');
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
  
//   export async function fetchFilteredCUsers(query: string) {
//     try {
//       const data = await sql<UsersTableType>`
//           SELECT
//             users.id,
//             users.name,
//             users.email,
//             users.image_url,
//             COUNT(invoices.id) AS total_invoices,
//             SUM(CASE WHEN invoices.status = 'pending' THEN invoices.amount ELSE 0 END) AS total_pending,
//             SUM(CASE WHEN invoices.status='paid' THEN invoices.amount ELSE 0 END) AS total_paid
//           FROM customers
//           LEFT JOIN invoices ON customers.id = invoices.customer_id
//           WHERE
//             customers.name ILIKE ${`%${query}%`} OR
//           customers.email ILIKE ${`%${query}%`}
//           GROUP BY customers.id, customers.name, customers.email, customers.image_url
//           ORDER BY customers.name ASC
//         `;
  
//       const users= data.rows.map((customer) => ({
//         ...customer,
//         total_pending: formatCurrency(customer.total_pending),
//         total_paid: formatCurrency(customer.total_paid),
//       }));
  
//       return users;
//     } catch (err) {
//       console.error('Database Error:', err);
//       throw new Error('Failed to fetch user table.');
//     }
//   }
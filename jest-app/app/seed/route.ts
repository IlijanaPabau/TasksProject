// import bcrypt from 'bcrypt';
// import { db } from '@vercel/postgres';
// import { invoices, customers, revenue, users } from '../lib/placeholder-data';

// const client = await db.connect();

// async function seedUsers() {
//   await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
//   await client.sql`
//     CREATE TABLE IF NOT EXISTS users (
//       id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
//       name VARCHAR(255) NOT NULL,
//       email TEXT NOT NULL UNIQUE,
//       password TEXT NOT NULL,
//       image_url VARCHAR(255) NOT NULL
//     );
//   `;

//   const insertedUsers = await Promise.all(
//     users.map(async (user) => {
//       const hashedPassword = await bcrypt.hash(user.password, 10);
//       return client.sql`
//         INSERT INTO users (id, name, email, password,image_url)
//         VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword}, ${image_url})
//         ON CONFLICT (id) DO NOTHING;
//       `;
//     }),
//   );

//   return insertedUsers;
// }

// async function seedTasks() {
//   await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

//   await client.sql`
//     CREATE TABLE IF NOT EXISTS tasks(
//       id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
//       user_id UUID NOT NULL,
//       description VARCHAR(255) NOT NULL,
//       status VARCHAR(255) NOT NULL,
//       date DATE NOT NULL
//     );
//   `;

//   const insertedTasks = await Promise.all(
//     tasks.map(
//       (task) => client.sql`
//         INSERT INTO tasks (user_id, description, status, date)
//         VALUES (${task.user_id}, ${task.description}, ${task.status}, ${task.date})
//         ON CONFLICT (id) DO NOTHING;
//       `,
//     ),
//   );

//   return insertedTasks;
// }

export async function GET() {
    return Response.json({
      message:
        'Uncomment this file and remove this line. You can delete this file when you are finished.',
    });
    // try {
    //   await client.sql`BEGIN`;
    //   await seedUsers();
    //   await seedCustomers();
    //   await seedInvoices();
    //   await seedRevenue();
    //   await client.sql`COMMIT`;
  
    //   return Response.json({ message: 'Database seeded successfully' });
    // } catch (error) {
    //   await client.sql`ROLLBACK`;
    //   return Response.json({ error }, { status: 500 });
    // }
  }
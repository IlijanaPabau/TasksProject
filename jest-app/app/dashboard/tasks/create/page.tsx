import { fetchUsers } from '@/app/lib/data';
import Form from '@/app/ui/tasks/create-form';
import Breadcrumbs from '@/app/ui/tasks/breadcrumbs';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create Task',
};

export default async function Page() {
  const users = await fetchUsers();

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Tasks', href: '/dashboard/tasks' },
          {
            label: 'Create Task',
            href: '/dashboard/tasks/create',
            active: true,
          },
        ]}
      />
      <Form users={users} />
    </main>
  );
}

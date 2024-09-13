import Form from '../../../../ui/tasks/edit-form';
import Breadcrumbs from '../../../../ui/tasks/breadcrumbs';
import { fetchTaskById, fetchUsers } from '../../../../lib/data';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Edit Task',
};

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const [task,users] = await Promise.all([
    fetchTaskById(id),
    fetchUsers(),
  ]);

  if (!task) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Tasks', href: '/dashboard/tasks' },
          {
            label: 'Edit Task',
            href: `/dashboard/tasks/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form task={task} users={users} />
    </main>
  );
}

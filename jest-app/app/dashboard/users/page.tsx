import { fetchFilteredUsers } from '@/app/lib/data';
import UsersTable from '@/app/ui/users/table';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Users',
};

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || '';

  const users = await fetchFilteredUsers(query);

  return (
    <main>
      <UsersTable users={users} />
    </main>
  );
}

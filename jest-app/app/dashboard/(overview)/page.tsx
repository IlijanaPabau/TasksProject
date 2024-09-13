import CardWrapper from '../../ui/dashboard/cards';
import LatestTasks from '../../ui/dashboard/latest-tasks';
import { lusitana } from '../../ui/fonts';
import { Suspense } from 'react';
import {
  LatestTasksSkeleton,
  CardsSkeleton,
} from '../../ui/skeletons';

export default async function Page() {
  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Suspense fallback={<CardsSkeleton />}>
          <CardWrapper />
        </Suspense>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <Suspense fallback={<LatestTasksSkeleton />}>
          <LatestTasks />
        </Suspense>
      </div>
    </main>
  );
}


'use client'
import { UserField } from '../../lib/definitions';
import Link from 'next/link';
import {
  CheckIcon,
  ClockIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import { Button } from '../button';
import { createTask } from '@/app/lib/actions';
import {useActionState} from "react"

export default function Form({ users }: { users: UserField[] }) {
  const initialState: State={message: null, errors: {}}
  const [state, formAction]=useActionState(createTask, initialState)
  return (
    <form action={formAction}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* User Name */}
        <div className="mb-4">
          <label htmlFor="user" className="mb-2 block text-sm font-medium">
            Choose user
          </label>
          <div className="relative">
            <select
              id="user"
              name="userId"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue=""
              aria-describedby="customer-error"
            >
              <option value="" disabled>
                Select a user
              </option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* Task Description */}
        <div className="mb-4">
          <label htmlFor="description" className="mb-2 block text-sm font-medium">
            Task Description
          </label>
          <textarea
            id="description"
            name="description"
            placeholder="Enter task description"
            className="peer block w-full rounded-md border border-gray-200 py-2 px-3 text-sm outline-2 placeholder:text-gray-500"
            rows={4}
          />
        </div>

        {/* Task Status */}
        <fieldset>
          <legend className="mb-2 block text-sm font-medium">
            Set the task status
          </legend>
          <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
            <div className="flex gap-4">
              <div className="flex items-center">
                <input
                  id="pending"
                  name="status"
                  type="radio"
                  value="pending"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="pending"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                >
                  Pending <ClockIcon className="h-4 w-4" />
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="finished"
                  name="status"
                  type="radio"
                  value="finished"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="finished"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white"
                >
                  Finished<CheckIcon className="h-4 w-4" />
                </label>
              </div>
            </div>
          </div>
        </fieldset>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/tasks"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Create Task</Button>
      </div>
    </form>
  );
}
// "use client"
// import { useState } from 'react';
// import { UserField } from '../../lib/definitions';
// import Link from 'next/link';
// import { CheckIcon, ClockIcon, UserCircleIcon } from '@heroicons/react/24/outline';
// import { Button } from '../button';

// export default function Form({ users }: { users: UserField[] }) {
//   const [errors, setErrors] = useState<{ [key: string]: string[] }>({});
//   const [message, setMessage] = useState<string | null>(null);
 
//   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
  
//     const formData = new FormData(event.currentTarget);
    
//     // Log form data for debugging
//     for (const [key, value] of formData.entries()) {
//       console.log(`${key}: ${value}`);
//     }
  
//     try {
//       const response = await fetch('/api/create-task', {
//         method: 'POST',
//         body: formData,
//       });
  
//       if (!response.ok) {
//         console.error('Server response:', response.status, await response.text());
//         throw new Error(`Server error: ${response.status}`);
//       }
  
//       const result = await response.json();
  
//       if (result.errors) {
//         setErrors(result.errors);
//         setMessage(result.message || null);
//       } else if (result.message) {
//         setMessage(result.message);
//       }
//     } catch (error) {
//       console.error('Fetch error:', error);
//       setMessage('An error occurred while creating the task.');
//     }
//   };
  
  

//   return (
//     <form onSubmit={handleSubmit}>
//       <div className="rounded-md bg-gray-50 p-4 md:p-6">
//         {/* User Name */}
//         <div className="mb-4">
//           <label htmlFor="user" className="mb-2 block text-sm font-medium">
//             Choose user
//           </label>
//           <div className="relative">
//             <select
//               id="user"
//               name="userId"
//               //value="userId"
//               className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
//               defaultValue=""
//             >
//               <option value="" disabled>Select a user</option>
//               {users.map((user) => (
//                 <option key={user.id} value={user.id}>
//                   {user.name}
//                 </option>
//               ))}
//             </select>
//             <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
//           </div>
//         </div>

//         {/* Task Description */}
//         <div className="mb-4">
//           <label htmlFor="description" className="mb-2 block text-sm font-medium">
//             Task Description
//           </label>
//           <textarea
//             id="description"
//             name="description"
//             //value="decription"
//             placeholder="Enter task description"
//             className="peer block w-full rounded-md border border-gray-200 py-2 px-3 text-sm outline-2 placeholder:text-gray-500"
//             rows={4}
//           />
//         </div>

//         {/* Task Status */}
//         <fieldset>
//           <legend className="mb-2 block text-sm font-medium">
//             Set the task status
//           </legend>
//           <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
//             <div className="flex gap-4">
//               <div className="flex items-center">
//                 <input
//                   id="pending"
//                   name="status"
//                   type="radio"
//                   value="pending"
//                   className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
//                 />
//                 <label
//                   htmlFor="pending"
//                   className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
//                 >
//                   Pending <ClockIcon className="h-4 w-4" />
//                 </label>
//               </div>
//               <div className="flex items-center">
//                 <input
//                   id="finished"
//                   name="status"
//                   type="radio"
//                   value="finished"
//                   className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
//                 />
//                 <label
//                   htmlFor="finished"
//                   className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white"
//                 >
//                   Finished <CheckIcon className="h-4 w-4" />
//                 </label>
//               </div>
//             </div>
//           </div>
//         </fieldset>
//       </div>

//       {/* Error and Message Display */}
//       {message && (
//         <div className="mt-4 p-4 bg-green-100 text-green-800 rounded">
//           {message}
//         </div>
//       )}
//       {Object.keys(errors).length > 0 && (
//         <div className="mt-4 p-4 bg-red-100 text-red-800 rounded">
//           <ul>
//             {Object.entries(errors).map(([key, messages]) => (
//               <li key={key}>
//                 <strong>{key}:</strong> {messages.join(', ')}
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}

//       <div className="mt-6 flex justify-end gap-4">
//         <Link
//           href="/dashboard/tasks"
//           className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
//         >
//           Cancel
//         </Link>
//         <Button type="submit">Create Task</Button>
//       </div>
//     </form>
//   );
// }

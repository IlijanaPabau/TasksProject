import React from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

type SearchProps = {
    placeholder: string;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
};

export default function Search({ placeholder, onChange }: SearchProps) {
    return (
        <div className="relative flex flex-1 flex-shrink-0">
            <label htmlFor="search" className="sr-only">
                Search
            </label>
            <input
                id="search"
                type="text"
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                placeholder={placeholder}
                onChange={onChange}
            />
        </div>
    );
}

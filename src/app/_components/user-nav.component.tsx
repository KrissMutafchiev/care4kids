// components/Navbar.tsx

"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Avatar, Dropdown } from "flowbite-react"; // Ensure you have Flowbite installed
import { useRouter } from "next/navigation"; // For client-side navigation
import { destroyCookie } from 'nookies'; // For cookie management

type User = {
  firstName: string;
  lastName: string;
  email: string;
  roles: { name: string }[];
};

interface NavbarProps {
  user: User | null; // Define prop for user data
}

export default function UserNav({ user }: NavbarProps) {
  const router = useRouter();

  const handleSignOut = async () => {
    // Clear the cookies (jwtToken, userData)
    await fetch('/api/auth/logout', {
        method: 'POST',
      });
    router.push("/login");
  };

  return (
    <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start rtl:justify-end">
            <button
              data-drawer-target="logo-sidebar"
              data-drawer-toggle="logo-sidebar"
              aria-controls="logo-sidebar"
              type="button"
              className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            >
              <span className="sr-only">Open sidebar</span>
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  clipRule="evenodd"
                  fillRule="evenodd"
                  d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                ></path>
              </svg>
            </button>
            <a href="https://care4kids.com" className="flex ">
              <Image
                className="w-24 h-14 mr-2 "
                src="/logo.png"
                alt="logo"
                width={400}
                height={300}
              />
            </a>
          </div>
          <Dropdown
            label={
              <Avatar
                alt="User settings"
                img="/default-man-avatar.png" // Replace with user-specific image if available
                rounded
              />
            }
            arrowIcon={false}
            inline
          >
            <Dropdown.Header>
              <span className="block text-md font-bold ">
                {user?.firstName} {user?.lastName}
              </span>
              {user?.roles.map((role: any, index: number) => (
                <span
                  key={index}
                  className=" bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300"
                >
                  {role?.name}
                </span>
              ))}
              <span className="block truncate text-sm font-medium">
                {user?.email}
              </span>
              <hr />
            </Dropdown.Header>
            <Dropdown.Item>Dashboard</Dropdown.Item>
            <Dropdown.Item>Settings</Dropdown.Item>
            <Dropdown.Item>Earnings</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleSignOut}>Sign out</Dropdown.Item>
          </Dropdown>
        </div>
      </div>
    </nav>
  );
}

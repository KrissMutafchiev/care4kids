"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import UserNav from "@/app/_components/user-nav.component";
import { LayoutDashboard, Users, School, Baby, BookA } from "lucide-react";

const icons = {
  dashboard: LayoutDashboard,
  teachers: Users,
  children: Baby,
  institution: School,
  classes: BookA,
} as any;

const PanelLayout = ({ children }: any) => {
  const [user, setUser] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { data: session, status }: any = useSession();
  const userId = session?.user?.id ?? null;

  // Define role-based navigation
  const roleBasedNav = {
    superAdmin: [
      { label: "Dashboard", href: "/panels/admin-dashboard/", icon: "dashboard" },
      {
        label: "Institutions",
        href: "/panels/admin-dashboard/institution",
        icon: "institution",
      },
      {
        label: "Teachers",
        href: "/panels/admin-dashboard/teachers",
        icon: "teachers",
      },
      {
        label: "Children",
        href: "/panels/admin-dashboard/children",
        icon: "children",
      },
      {
        label: "Classes",
        href: "/panels/admin-dashboard/group-classes",
        icon: "classes",
      },
    ],
    teacher: [
      { label: "Dashboard", href: "/panels/teacher/", icon: "dashboard" },
      { label: "My Classes", href: "/panels/teacher/classes", icon: "classes" },
    ],
    parent: [
      { label: "My Dashboard", href: "/panels/parent/", icon: "dashboard" },
      {
        label: "My Children",
        href: "/panels/parent/children",
        icon: "children",
      },
    ],
  } as any;

  useEffect(() => {
    async function fetchUserData() {
      try {
        setLoading(true);
        if (!userId) return;

        const response = await fetch(`/api/operative/users/${userId}`);

        if (!response.ok) {
          throw new Error("User not found or server error");
        }

        const userData = await response.json();
        setUser(userData);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchUserData();
  }, [userId]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (!session) {
    return <p>You are not logged in.</p>;
  }

  // Determine user role and navigation links
  const userRole = user?.role || "Guest"; // Default to "Guest" if no role
  const navigationLinks = roleBasedNav[userRole] || [];

  return (
    <div>
      <UserNav userData={user} />
      <aside
        id="logo-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
          <ul>
            {navigationLinks.map((link: any) => {
              // Get the icon component from the icons mapping
              const IconComponent = icons[link.icon] || null;

              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                  >
                    {/* Render the dynamic icon */}
                    {IconComponent && (
                      <IconComponent className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                    )}

                    <span className="ms-3">{link.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </aside>

      <div className="p-4 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
          {children}
        </div>
      </div>
    </div>
  );
};

export default PanelLayout;

"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import UserNav from "@/components/layout/UserNav";
import {
  LayoutDashboard,
  Users,
  School,
  Baby,
  BookA,
  Settings,
  Home,
  UserCircle,
  LogOut,
} from "lucide-react";
import { fetchUsers } from "@/services/user-service";
import { Spinner } from "flowbite-react";

const icons = {
  dashboard: LayoutDashboard,
  teachers: Users,
  children: Baby,
  institution: School,
  classes: BookA,
  settings: Settings,
  home: Home,
  profile: UserCircle,
} as any;

const PanelLayout = ({ children }: any) => {
  const [user, setUser] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeLink, setActiveLink] = useState("");

  const { data: session, status }: any = useSession();
  const userId = session?.user?.id ?? null;

  // Define role-based navigation
  const roleBasedNav = {
    superAdmin: [
      {
        label: "Dashboard",
        href: "/panels/admin-dashboard/",
        icon: "dashboard",
      },
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
      { label: "My Profile", href: "/panels/teacher/profile", icon: "profile" },
    ],
    parent: [
      { label: "Dashboard", href: "/panels/parent/", icon: "dashboard" },
      {
        label: "My Children",
        href: "/panels/parent/children",
        icon: "children",
      },
      { label: "My Profile", href: "/panels/parent/profile", icon: "profile" },
    ],
    director: [
      { label: "Dashboard", href: "/panels/institution/", icon: "dashboard" },
      {
        label: "Teachers",
        href: "/panels/institution/teachers",
        icon: "teachers",
      },
      {
        label: "Children",
        href: "/panels/institution/children",
        icon: "children",
      },
      {
        label: "Classes",
        href: "/panels/institution/group-class",
        icon: "classes",
      },
      {
        label: "Settings",
        href: "/panels/institution/settings",
        icon: "settings",
      },
    ],
  } as any;

  useEffect(() => {
    async function fetchUserData() {
      try {
        setLoading(true);
        if (!userId) return;

        // Use the getUserById service to fetch user data
        const userData = await fetchUsers({ id: userId });
        setUser(userData);
      } catch (err: any) {
        setError(err.message || "Failed to fetch user data.");
      } finally {
        setLoading(false);
      }
    }

    fetchUserData();

    // Set active link based on current path
    if (typeof window !== "undefined") {
      setActiveLink(window.location.pathname);
    }
  }, [userId]);

  if (status === "loading" || loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner size="xl" />
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-xl mb-4">You are not logged in.</p>
        <Link
          href="/login"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Go to Login
        </Link>
      </div>
    );
  }

  // Determine user role and navigation links
  const userRole = user[0]?.role || session?.user?.role || "Guest"; // Try to get role from user data or session
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
          <div className="py-4 px-2 mb-4 border-b border-gray-200">
            <p className="text-sm font-medium text-gray-500">Logged in as:</p>
            <p className="text-base font-semibold text-gray-800">
              {user[0]?.firstName} {user[0]?.lastName}
            </p>
            <p className="text-xs text-gray-500 capitalize">{userRole}</p>
          </div>
          <ul className="space-y-2">
            {navigationLinks.map((link: any) => {
              // Get the icon component from the icons mapping
              const IconComponent = icons[link.icon] || null;
              const isActive = activeLink === link.href;

              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group ${isActive ? "bg-blue-50 text-blue-700" : ""}`}
                    onClick={() => setActiveLink(link.href)}
                  >
                    {/* Render the dynamic icon */}
                    {IconComponent && (
                      <IconComponent
                        className={`w-5 h-5 transition duration-75 ${isActive ? "text-blue-600" : "text-gray-500 group-hover:text-gray-900"}`}
                      />
                    )}

                    <span className="ms-3">{link.label}</span>
                  </Link>
                </li>
              );
            })}

            {/* Logout Button */}
            <li className="mt-auto pt-4 border-t border-gray-200">
              <button
                onClick={() => signOut({ callbackUrl: "/login" })}
                className="flex w-full items-center p-2 text-gray-900 rounded-lg hover:bg-red-50 hover:text-red-700 group"
              >
                <LogOut className="w-5 h-5 text-gray-500 group-hover:text-red-600" />
                <span className="ms-3">Logout</span>
              </button>
            </li>
          </ul>
        </div>
      </aside>

      <div className="p-4 sm:ml-64">
        <div className="p-4 bg-white shadow-sm rounded-lg mt-14">
          {children}
        </div>
      </div>
    </div>
  );
};

export default PanelLayout;

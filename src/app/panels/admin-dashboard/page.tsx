"use client";

import React, { useEffect, useState } from "react";
import { Card, Spinner } from "flowbite-react";
import { School, Users, Baby, BookA } from "lucide-react";
import { fetchInstitutions } from "@/services/institution-service";
import { fetchUsers } from "@/services/user-service";
import { fetchKids } from "@/services/kid-service";
import { fetchGroupClasses } from "@/services/group-class-service";
import Link from "next/link";

const AdminPanel = () => {
  const [stats, setStats] = useState({
    institutions: 0,
    teachers: 0,
    children: 0,
    classes: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const [institutions, users, kids, groupClasses] = await Promise.all([
          fetchInstitutions(),
          fetchUsers({ role: "teacher" }),
          fetchKids(),
          fetchGroupClasses(),
        ]);

        setStats({
          institutions: institutions.length,
          teachers: users.length,
          children: kids.length,
          classes: groupClasses.length,
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner size="xl" />
      </div>
    );
  }

  const statCards = [
    {
      title: "Institutions",
      value: stats.institutions,
      icon: <School className="h-8 w-8 text-blue-600" />,
      link: "/panels/admin-dashboard/institution",
      color: "bg-blue-50 border-blue-200",
    },
    {
      title: "Teachers",
      value: stats.teachers,
      icon: <Users className="h-8 w-8 text-green-600" />,
      link: "/panels/admin-dashboard/teachers",
      color: "bg-green-50 border-green-200",
    },
    {
      title: "Children",
      value: stats.children,
      icon: <Baby className="h-8 w-8 text-purple-600" />,
      link: "/panels/admin-dashboard/children",
      color: "bg-purple-50 border-purple-200",
    },
    {
      title: "Classes",
      value: stats.classes,
      icon: <BookA className="h-8 w-8 text-amber-600" />,
      link: "/panels/admin-dashboard/group-classes",
      color: "bg-amber-50 border-amber-200",
    },
  ];

  return (
    <div className="flex flex-col space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, index) => (
          <Link href={card.link} key={index}>
            <Card
              className={`${card.color} hover:shadow-lg transition-shadow cursor-pointer`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-lg font-medium text-gray-700">
                    {card.title}
                  </p>
                  <h5 className="text-3xl font-bold mt-2">{card.value}</h5>
                </div>
                <div className="p-3 rounded-full bg-white shadow-sm">
                  {card.icon}
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <Card>
          <h5 className="text-xl font-bold mb-4">Recent Activities</h5>
          <div className="space-y-4">
            <p className="text-gray-500">No recent activities to display</p>
          </div>
        </Card>

        <Card>
          <h5 className="text-xl font-bold mb-4">Quick Actions</h5>
          <div className="grid grid-cols-2 gap-4">
            <Link
              href="/panels/admin-dashboard/institution"
              className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
            >
              <School className="h-6 w-6 text-blue-600 mb-2" />
              <p className="font-medium">Add Institution</p>
            </Link>
            <Link
              href="/panels/admin-dashboard/teachers"
              className="p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
            >
              <Users className="h-6 w-6 text-green-600 mb-2" />
              <p className="font-medium">Add Teacher</p>
            </Link>
            <Link
              href="/panels/admin-dashboard/children"
              className="p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
            >
              <Baby className="h-6 w-6 text-purple-600 mb-2" />
              <p className="font-medium">Add Child</p>
            </Link>
            <Link
              href="/panels/admin-dashboard/group-classes"
              className="p-4 bg-amber-50 rounded-lg hover:bg-amber-100 transition-colors"
            >
              <BookA className="h-6 w-6 text-amber-600 mb-2" />
              <p className="font-medium">Add Class</p>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AdminPanel;

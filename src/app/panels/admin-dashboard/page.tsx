"use client";

import React, { useEffect, useState } from "react";
import { Card, Spinner, Badge } from "flowbite-react";
import { School, Users, Baby, BookA, Activity, Bell } from "lucide-react";
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
        <Spinner size="xl" color="purple" />
      </div>
    );
  }

  const statCards = [
    {
      title: "Institutions",
      value: stats.institutions,
      icon: <School className="h-8 w-8 text-indigo-600" />,
      link: "/panels/admin-dashboard/institution",
      color: "bg-gradient-to-br from-indigo-50 to-blue-50 border-indigo-200",
      textColor: "text-indigo-700",
    },
    {
      title: "Teachers",
      value: stats.teachers,
      icon: <Users className="h-8 w-8 text-teal-600" />,
      link: "/panels/admin-dashboard/teachers",
      color: "bg-gradient-to-br from-teal-50 to-emerald-50 border-teal-200",
      textColor: "text-teal-700",
    },
    {
      title: "Children",
      value: stats.children,
      icon: <Baby className="h-8 w-8 text-violet-600" />,
      link: "/panels/admin-dashboard/children",
      color: "bg-gradient-to-br from-violet-50 to-purple-50 border-violet-200",
      textColor: "text-violet-700",
    },
    {
      title: "Classes",
      value: stats.classes,
      icon: <BookA className="h-8 w-8 text-rose-600" />,
      link: "/panels/admin-dashboard/group-classes",
      color: "bg-gradient-to-br from-rose-50 to-pink-50 border-rose-200",
      textColor: "text-rose-700",
    },
  ];

  // Mock recent activities
  const recentActivities = [
    {
      id: 1,
      message: "New teacher John Doe registered",
      time: "2 hours ago",
      type: "teacher",
    },
    {
      id: 2,
      message: "Happy Kids Institution updated their profile",
      time: "5 hours ago",
      type: "institution",
    },
    {
      id: 3,
      message: "New child added to Sunshine Class",
      time: "1 day ago",
      type: "child",
    },
  ];

  return (
    <div className="flex flex-col space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">
          Dashboard Overview
        </h1>
        <div className="flex items-center space-x-2">
          <Badge color="indigo" className="px-3 py-1.5">
            <Bell size={14} className="mr-1" /> 3 Notifications
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, index) => (
          <Link href={card.link} key={index}>
            <Card
              className={`${card.color} hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer border border-opacity-50 h-full`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-lg font-medium ${card.textColor}`}>
                    {card.title}
                  </p>
                  <h5 className={`text-3xl font-bold mt-2 ${card.textColor}`}>
                    {card.value}
                  </h5>
                </div>
                <div className="p-3 rounded-full bg-white shadow-md">
                  {card.icon}
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-6">
        <Card className="border-0 shadow-lg">
          <div className="flex items-center mb-4">
            <Activity className="h-6 w-6 text-indigo-600 mr-2" />
            <h5 className="text-xl font-bold text-gray-800">
              Recent Activities
            </h5>
          </div>
          <div className="space-y-4">
            {recentActivities.length > 0 ? (
              recentActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <div
                    className={`p-2 rounded-full mr-3 ${
                      activity.type === "teacher"
                        ? "bg-teal-100 text-teal-600"
                        : activity.type === "institution"
                          ? "bg-indigo-100 text-indigo-600"
                          : "bg-violet-100 text-violet-600"
                    }`}
                  >
                    {activity.type === "teacher" ? (
                      <Users size={16} />
                    ) : activity.type === "institution" ? (
                      <School size={16} />
                    ) : (
                      <Baby size={16} />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800">
                      {activity.message}
                    </p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-4">
                No recent activities to display
              </p>
            )}
          </div>
        </Card>

        <Card className="border-0 shadow-lg">
          <div className="flex items-center mb-4">
            <Bell className="h-6 w-6 text-violet-600 mr-2" />
            <h5 className="text-xl font-bold text-gray-800">Quick Actions</h5>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Link
              href="/panels/admin-dashboard/institution"
              className="p-4 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 border border-indigo-100 border-opacity-50"
            >
              <School className="h-6 w-6 text-indigo-600 mb-2" />
              <p className="font-medium text-indigo-700">Add Institution</p>
            </Link>
            <Link
              href="/panels/admin-dashboard/teachers"
              className="p-4 bg-gradient-to-br from-teal-50 to-emerald-50 rounded-xl hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 border border-teal-100 border-opacity-50"
            >
              <Users className="h-6 w-6 text-teal-600 mb-2" />
              <p className="font-medium text-teal-700">Add Teacher</p>
            </Link>
            <Link
              href="/panels/admin-dashboard/children"
              className="p-4 bg-gradient-to-br from-violet-50 to-purple-50 rounded-xl hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 border border-violet-100 border-opacity-50"
            >
              <Baby className="h-6 w-6 text-violet-600 mb-2" />
              <p className="font-medium text-violet-700">Add Child</p>
            </Link>
            <Link
              href="/panels/admin-dashboard/group-classes"
              className="p-4 bg-gradient-to-br from-rose-50 to-pink-50 rounded-xl hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 border border-rose-100 border-opacity-50"
            >
              <BookA className="h-6 w-6 text-rose-600 mb-2" />
              <p className="font-medium text-rose-700">Add Class</p>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AdminPanel;

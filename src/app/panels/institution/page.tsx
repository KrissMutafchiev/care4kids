"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Card, Spinner } from "flowbite-react";
import { Users, Baby, BookA, Bell, MessageCircle, Calendar } from "lucide-react";
import { fetchInstitutions } from "@/services/institution-service";
import { fetchUsers } from "@/services/user-service";
import { fetchKids } from "@/services/kid-service";
import { fetchGroupClasses } from "@/services/group-class-service";
import { useAlert } from "@/app/context/AlertContext";

const InstitutionPanel: React.FC = () => {
  const { data: session } = useSession();
  const { showAlert } = useAlert();
  const [loading, setLoading] = useState(true);
  const [institution, setInstitution] = useState<any>(null);
  const [stats, setStats] = useState({
    teachers: 0,
    kids: 0,
    classes: 0
  });
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'event', title: 'Parent-Teacher Meeting', date: '2023-10-15', description: 'Annual parent-teacher conference' },
    { id: 2, type: 'payment', title: 'Monthly Fee Due', date: '2023-10-10', description: 'Monthly tuition payment deadline' },
    { id: 3, type: 'invoice', title: 'Supplies Invoice', date: '2023-10-05', description: 'Invoice from ABC Supplies pending approval' }
  ]);
  const [teacherNotes, setTeacherNotes] = useState([
    { id: 1, teacherName: 'John Smith', date: '2023-10-02', message: 'Several students showing great progress in mathematics' },
    { id: 2, teacherName: 'Sarah Johnson', date: '2023-10-01', message: 'Need additional art supplies for next week's project' }
  ]);
  const [parentNotes, setParentNotes] = useState([
    { id: 1, parentName: 'Michael Brown', kidName: 'Emma Brown', date: '2023-10-03', message: 'Emma will be absent next Monday for a doctor appointment' },
    { id: 2, parentName: 'Jennifer Davis', kidName: 'Noah Davis', date: '2023-09-30', message: 'Noah has been enjoying the new reading program' }
  ]);

  useEffect(() => {
    const loadInstitutionData = async () => {
      try {
        setLoading(true);
        // Get user's institution based on session
        const userId = session?.user?.id;
        if (!userId) return;

        // Fetch user data to get institution ID
        const userData = await fetchUsers({ id: userId });
        const user = userData[0];
        if (!user?.institution) return;

        // Fetch institution details
        const institutionData = await fetchInstitutions();
        const userInstitution = institutionData.find((inst: any) => inst._id === user.institution);
        setInstitution(userInstitution);

        if (userInstitution?._id) {
          // Fetch stats for the institution
          const [teachers, kids, classes] = await Promise.all([
            fetchUsers({ institution: userInstitution._id, role: 'teacher' }),
            fetchKids({ institution: userInstitution._id }),
            fetchGroupClasses(userInstitution._id)
          ]);

          setStats({
            teachers: Array.isArray(teachers) ? teachers.length : 0,
            kids: Array.isArray(kids) ? kids.length : 0,
            classes: Array.isArray(classes) ? classes.length : 0
          });
        }
      } catch (error: any) {
        showAlert(error.message || 'Failed to load institution data', 'error');
      } finally {
        setLoading(false);
      }
    };

    loadInstitutionData();
  }, [session]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner size="xl" />
      </div>
    );
  }

  return (
    <div className="w-full space-y-6">
      {/* Institution Header */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-6 text-white shadow-lg">
        <h1 className="text-3xl font-bold mb-2">{institution?.name || 'Institution Dashboard'}</h1>
        <p className="text-blue-100">{institution?.address || 'Welcome to your institution dashboard'}</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-none hover:shadow-lg transition-all">
          <div className="flex items-center">
            <div className="p-3 bg-blue-500 rounded-full mr-4">
              <Users className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-blue-600 font-medium">Teachers</p>
              <h3 className="text-2xl font-bold text-blue-900">{stats.teachers}</h3>
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-none hover:shadow-lg transition-all">
          <div className="flex items-center">
            <div className="p-3 bg-green-500 rounded-full mr-4">
              <Baby className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-green-600 font-medium">Kids</p>
              <h3 className="text-2xl font-bold text-green-900">{stats.kids}</h3>
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-none hover:shadow-lg transition-all">
          <div className="flex items-center">
            <div className="p-3 bg-purple-500 rounded-full mr-4">
              <BookA className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-purple-600 font-medium">Classes</p>
              <h3 className="text-2xl font-bold text-purple-900">{stats.classes}</h3>
            </div>
          </div>
        </Card>
      </div>

      {/* Notifications and Notes Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Notifications */}
        <Card className="overflow-hidden">
          <div className="flex items-center mb-4">
            <Bell className="h-5 w-5 text-amber-500 mr-2" />
            <h2 className="text-xl font-semibold">Notifications & Reminders</h2>
          </div>
          <div className="space-y-3 max-h-80 overflow-y-auto">
            {notifications.map(notification => (
              <div key={notification.id} className="p-3 bg-amber-50 rounded-lg border-l-4 border-amber-400">
                <div className="flex justify-between">
                  <h3 className="font-medium text-amber-800">{notification.title}</h3>
                  <span className="text-xs text-amber-600 bg-amber-100 px-2 py-1 rounded-full">
                    {notification.type === 'event' ? 'Event' : 
                     notification.type === 'payment' ? 'Payment' : 'Invoice'}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-1">{notification.description}</p>
                <p className="text-xs text-amber-700 mt-2 flex items-center">
                  <Calendar className="h-3 w-3 mr-1" /> {notification.date}
                </p>
              </div>
            ))}
          </div>
        </Card>

        {/* Teacher & Parent Notes */}
        <div className="space-y-6">
          {/* Teacher Notes */}
          <Card className="overflow-hidden">
            <div className="flex items-center mb-4">
              <MessageCircle className="h-5 w-5 text-blue-500 mr-2" />
              <h2 className="text-xl font-semibold">Teacher Notes</h2>
            </div>
            <div className="space-y-3 max-h-40 overflow-y-auto">
              {teacherNotes.map(note => (
                <div key={note.id} className="p-3 bg-blue-50 rounded-lg">
                  <div className="flex justify-between">
                    <h3 className="font-medium text-blue-800">{note.teacherName}</h3>
                    <span className="text-xs text-gray-500">{note.date}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{note.message}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* Parent Notes */}
          <Card className="overflow-hidden">
            <div className="flex items-center mb-4">
              <MessageCircle className="h-5 w-5 text-green-500 mr-2" />
              <h2 className="text-xl font-semibold">Parent Notes</h2>
            </div>
            <div className="space-y-3 max-h-40 overflow-y-auto">
              {parentNotes.map(note => (
                <div key={note.id} className="p-3 bg-green-50 rounded-lg">
                  <div className="flex justify-between">
                    <h3 className="font-medium text-green-800">{note.parentName} <span className="text-xs text-gray-500">(Parent of {note.kidName})</span></h3>
                    <span className="text-xs text-gray-500">{note.date}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{note.message}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default InstitutionPanel;

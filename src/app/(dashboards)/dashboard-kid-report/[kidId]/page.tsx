// components/DashboardKidReport.tsx

import React from 'react';

const DashboardKidReport: React.FC = () => {

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Left Sidebar */}
      <div className="w-1/4 bg-white p-4 shadow-lg">
        <div className="flex flex-col items-center">
          <img
            className="w-24 h-24 rounded-full"
            src="/profile-pic.jpg" // Replace with actual image path
            alt="Profile"
          />
          <h2 className="mt-4 text-xl font-semibold">Kid's Name</h2>
          <p className="mt-2 text-gray-600">Some info about the kid.</p>
        </div>
      </div>

      {/* Right Content */}
      <div className="w-3/4 p-6">
        {/* Kid's Name and Date */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Kid's Name</h1>
          <p className="text-gray-600">Date: 2024-07-17</p>
        </div>

        {/* Happiness Section */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Happiness</h2>
          <div className="grid grid-cols-4 gap-4">
            <div className="p-4 bg-white shadow-md rounded-lg flex items-center justify-center">
              <img src="/happy-icon1.png" alt="Happy 1" className="w-12 h-12" /> {/* Replace with actual image path */}
            </div>
            <div className="p-4 bg-white shadow-md rounded-lg flex items-center justify-center">
              <img src="/happy-icon2.png" alt="Happy 2" className="w-12 h-12" /> {/* Replace with actual image path */}
            </div>
            <div className="p-4 bg-white shadow-md rounded-lg flex items-center justify-center">
              <img src="/happy-icon3.png" alt="Happy 3" className="w-12 h-12" /> {/* Replace with actual image path */}
            </div>
            <div className="p-4 bg-white shadow-md rounded-lg flex items-center justify-center">
              <img src="/happy-icon4.png" alt="Happy 4" className="w-12 h-12" /> {/* Replace with actual image path */}
            </div>
          </div>
        </div>

        {/* Meals Section */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Meals</h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 bg-white shadow-md rounded-lg">
              <h3 className="font-semibold">Breakfast</h3>
              <textarea className="mt-2 w-full p-2 border rounded-md" rows={2} placeholder="Comment"></textarea>
            </div>
            <div className="p-4 bg-white shadow-md rounded-lg">
              <h3 className="font-semibold">Lunch</h3>
              <textarea className="mt-2 w-full p-2 border rounded-md" rows={2} placeholder="Comment"></textarea>
            </div>
            <div className="p-4 bg-white shadow-md rounded-lg">
              <h3 className="font-semibold">Snacks</h3>
              <textarea className="mt-2 w-full p-2 border rounded-md" rows={2} placeholder="Comment"></textarea>
            </div>
          </div>
        </div>

        {/* Sleep Section */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Sleep</h2>
          <div className="flex items-center space-x-4">
            <div className="p-4 bg-white shadow-md rounded-lg flex items-center justify-center">
              <img src="/clock-icon.png" alt="Clock" className="w-12 h-12" /> {/* Replace with actual image path */}
            </div>
            <textarea className="mt-2 w-full p-2 border rounded-md" rows={2} placeholder="Comment"></textarea>
          </div>
        </div>

        {/* Behavior Section */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Behavior</h2>
          <div className="grid grid-cols-4 gap-4">
            <div className="p-4 bg-white shadow-md rounded-lg">
              <img src="/behavior-icon1.png" alt="Behavior 1" className="w-12 h-12 mx-auto" /> {/* Replace with actual image path */}
              <textarea className="mt-2 w-full p-2 border rounded-md" rows={2} placeholder="Comment"></textarea>
            </div>
            <div className="p-4 bg-white shadow-md rounded-lg">
              <img src="/behavior-icon2.png" alt="Behavior 2" className="w-12 h-12 mx-auto" /> {/* Replace with actual image path */}
              <textarea className="mt-2 w-full p-2 border rounded-md" rows={2} placeholder="Comment"></textarea>
            </div>
            <div className="p-4 bg-white shadow-md rounded-lg">
              <img src="/behavior-icon3.png" alt="Behavior 3" className="w-12 h-12 mx-auto" /> {/* Replace with actual image path */}
              <textarea className="mt-2 w-full p-2 border rounded-md" rows={2} placeholder="Comment"></textarea>
            </div>
            <div className="p-4 bg-white shadow-md rounded-lg">
              <img src="/behavior-icon4.png" alt="Behavior 4" className="w-12 h-12 mx-auto" /> {/* Replace with actual image path */}
              <textarea className="mt-2 w-full p-2 border rounded-md" rows={2} placeholder="Comment"></textarea>
            </div>
          </div>
        </div>

        {/* Activities Section */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Activities</h2>
          <div className="grid grid-cols-4 gap-4">
            <div className="p-4 bg-white shadow-md rounded-lg">
              <img src="/activity-icon1.png" alt="Activity 1" className="w-12 h-12 mx-auto" /> {/* Replace with actual image path */}
              <textarea className="mt-2 w-full p-2 border rounded-md" rows={2} placeholder="Comment"></textarea>
            </div>
            <div className="p-4 bg-white shadow-md rounded-lg">
              <img src="/activity-icon2.png" alt="Activity 2" className="w-12 h-12 mx-auto" /> {/* Replace with actual image path */}
              <textarea className="mt-2 w-full p-2 border rounded-md" rows={2} placeholder="Comment"></textarea>
            </div>
            <div className="p-4 bg-white shadow-md rounded-lg">
              <img src="/activity-icon3.png" alt="Activity 3" className="w-12 h-12 mx-auto" /> {/* Replace with actual image path */}
              <textarea className="mt-2 w-full p-2 border rounded-md" rows={2} placeholder="Comment"></textarea>
            </div>
            <div className="p-4 bg-white shadow-md rounded-lg">
              <img src="/activity-icon4.png" alt="Activity 4" className="w-12 h-12 mx-auto" /> {/* Replace with actual image path */}
              <textarea className="mt-2 w-full p-2 border rounded-md" rows={2} placeholder="Comment"></textarea>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardKidReport;

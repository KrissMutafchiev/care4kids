"use client";

import React from 'react';
import ChildrenListComponent from "@/app/_components/children-list.component";
import Image from "next/image";

type Props = {};

const ParentPanel: React.FC = () => {

  const children = [
    {
      id: 1,
      name: "Alice",
      midname: "A",
      lastname: "Johnson",
      age: 10,
      class: "5A",
      teacher: "Mr. Doe",
      gender: "Female",
      avatarImg: "/default-woman-avatar.png",
    },
    {
      id: 2,
      name: "Bob",
      midname: "B",
      lastname: "Smith",
      age: 11,
      class: "5B",
      teacher: "Mrs. Green",
      gender: "Male",
      avatarImg: "/default-kid-avatar.png",
    }]


  return (
    <div >
      <h1>Parent Panel</h1>
      <ChildrenListComponent childrenData={children}/>
      {/* Right Content */}
      <div className="w-full p-6 ">
        {/* Kid's Name and Date */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Kid`s Name</h1>
          <p className="text-gray-600">Date: 2024-07-17</p>
        </div>
        {/* Happiness Section */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Happiness</h2>
          <div className="grid grid-cols-4 gap-4">
            <div className="p-4 bg-white border-2 shadow-md rounded-lg flex items-center justify-center">
              <Image src="/sad.png" alt="Happy 1" width={250} height={250} className="w-32 h-28" /> {/* Replace with actual image path */}
            </div>
            <div className="p-4 bg-white border-2 shadow-md rounded-lg flex items-center justify-center">
              <Image src="/average.png" alt="Happy 2" width={250} height={250} className="w-32 h-28" /> {/* Replace with actual image path */}
            </div>
            <div className="p-4 bg-white border-2 shadow-md rounded-lg flex items-center justify-center">
              <Image src="/happy.png" alt="Happy 3" width={250} height={250} className="w-32 h-28" /> {/* Replace with actual image path */}
            </div>
            <div className="p-4 bg-white border-2  shadow-md rounded-lg flex items-center justify-center">
              <Image src="/excitet.png" alt="Happy 4" width={250} height={250} className="w-32 h-28" /> {/* Replace with actual image path */}
            </div>
          </div>

          <label htmlFor="happiness" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Min-max
            range</label>


        </div>

        {/* Meals Section */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Meals</h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 bg-white border-2 shadow-md rounded-lg">
              <h3 className="font-semibold">Breakfast</h3>
              <Image src="/breakfast.png" alt="Happy 4" width={250} height={250} className="w-28 h-28" /> {/* Replace with actual image path */}
              <p>Comment ...</p>
            </div>
            <div className="p-4 bg-white border-2 shadow-md rounded-lg">
              <h3 className="font-semibold">Lunch</h3>
              <Image src="/lunch.png" alt="Happy 4" width={250} height={250}  className="w-28 h-28" /> {/* Replace with actual image path */}

              <p>Comment ...</p>
            </div>
            <div className="p-4 bg-white border-2 shadow-md rounded-lg">
              <h3 className="font-semibold">Snacks</h3>
              <Image src="/snacks.png" alt="Happy 4" width={250} height={250}  className="w-28 h-28" /> {/* Replace with actual image path */}

              <p>Comment ...</p>
            </div>
          </div>
        </div>

        {/* Sleep Section */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Sleep</h2>
          <div className="flex items-center space-x-4">
            <div className=" bg-white border-2 shadow-md rounded-lg flex items-center justify-center">
              <Image src="/clock-2.png" alt="Clock" width={250} height={250} className="w-36 h-36" /> {/* Replace with actual image path */}
              <div>
                <label htmlFor="sleepStart" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Start
                  time:</label>
                <div className="relative">
                  <div className="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                         xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd"
                            d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z"
                            clipRule="evenodd"/>
                    </svg>
                  </div>

                </div>
              </div>
              <div>
                <label htmlFor="sleepEnd" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">End
                  time:</label>
                <div className="relative">
                  <div className="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                         xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd"
                            d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z"
                            clipRule="evenodd"/>
                    </svg>
                  </div>

                </div>
              </div>
            </div>
            <p className=" w-full h-36 p-4 border shadow-md rounded-md " >Comments ...</p>
          </div>
        </div>

        {/* Behavior Section */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Behavior</h2>
          <div className="grid grid-cols-4 gap-4">
            <div className="p-4 bg-white border-2 shadow-md rounded-lg">
              <Image src="/agressive-behavior.png" alt="Behavior 1" width={250} height={250} className="w-36 h-36 mx-auto" /> {/* Replace with actual image path */}
              <textarea className="mt-2 w-full p-2 border rounded-md" rows={2} placeholder="Comment"></textarea>
            </div>
            <div className="p-4 bg-white border-2 shadow-md rounded-lg">
              <Image src="" alt="Behavior 2" width={250} height={250} className="w-12 h-12 mx-auto" /> {/* Replace with actual image path */}
              <textarea className="mt-2 w-full p-2 border rounded-md" rows={2} placeholder="Comment"></textarea>
            </div>
            <div className="p-4 bg-white border-2 shadow-md rounded-lg">
              <Image src="" alt="Behavior 3" width={250} height={250} className="w-12 h-12 mx-auto" /> {/* Replace with actual image path */}
              <textarea className="mt-2 w-full p-2 border rounded-md" rows={2} placeholder="Comment"></textarea>
            </div>
            <div className="p-4 bg-white border-2 shadow-md rounded-lg">
              <Image src="" alt="Behavior 4" width={250} height={250} className="w-12 h-12 mx-auto" /> {/* Replace with actual image path */}
              <textarea className="mt-2 w-full p-2 border rounded-md" rows={2} placeholder="Comment"></textarea>
            </div>
          </div>
        </div>

        {/* Activities Section */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Activities</h2>
          <div className="grid grid-cols-4 gap-4">
            <div className="p-4 bg-white border-2 shadow-md rounded-lg">
              <Image src="" alt="Activity 1" width={250} height={250} className="w-12 h-12 mx-auto" /> {/* Replace with actual image path */}
              <textarea className="mt-2 w-full p-2 border rounded-md" rows={2} placeholder="Comment"></textarea>
            </div>
            <div className="p-4 bg-white border-2 shadow-md rounded-lg">
              <Image src="" alt="Activity 2" width={250} height={250} className="w-12 h-12 mx-auto" /> {/* Replace with actual image path */}
              <textarea className="mt-2 w-full p-2 border rounded-md" rows={2} placeholder="Comment"></textarea>
            </div>
            <div className="p-4 bg-white border-2 shadow-md rounded-lg">
              <Image src="" alt="Activity 3" width={250} height={250} className="w-12 h-12 mx-auto" /> {/* Replace with actual image path */}
              <textarea className="mt-2 w-full p-2 border rounded-md" rows={2} placeholder="Comment"></textarea>
            </div>
            <div className="p-4 bg-white border-2 shadow-md rounded-lg">
              <Image src="" alt="Activity 4" width={250} height={250} className="w-12 h-12 mx-auto" /> {/* Replace with actual image path */}
              <textarea className="mt-2 w-full p-2 border rounded-md" rows={2} placeholder="Comment"></textarea>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default ParentPanel
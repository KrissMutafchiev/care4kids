"use client";

import React, {useState} from 'react';
import Image from "next/image";
import { Datepicker ,  } from "flowbite-react";
const KidReportComponent: React.FC = () => {

  const [formData, setFormData] = useState({
    happiness: '',
    meals: '',
    sleepStart: '',
    sleepEnd: '',
    behavior: '',
    activities: '',
  });


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Here, you would typically send formData to your server
  };


  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Left Sidebar */}


      {/* Right Content */}
      <div className="w-full p-6">

  <form onSubmit={handleSubmit}>
    {/* Happiness Section */}
    <div className="mb-6">
  <h2 className="text-xl font-semibold mb-4">Happiness</h2>
    <div className="grid grid-cols-4 gap-4">
  <div className="p-4 bg-white shadow-md rounded-lg flex items-center justify-center">
  <Image src="/sad.png" alt="Happy 1" width={250} height={250} className="w-28 h-24" /> {/* Replace with actual image path */}
    </div>
    <div className="p-4 bg-white shadow-md rounded-lg flex items-center justify-center">
  <Image src="/average.png" alt="Happy 2" width={250} height={250} className="w-28 h-24" /> {/* Replace with actual image path */}
    </div>
    <div className="p-4 bg-white shadow-md rounded-lg flex items-center justify-center">
  <Image src="/happy.png" alt="Happy 3" width={250} height={250} className="w-28 h-24" /> {/* Replace with actual image path */}
    </div>
    <div className="p-4 bg-white shadow-md rounded-lg flex items-center justify-center">
  <Image src="/excitet.png" alt="Happy 4" width={250} height={250} className="w-28 h-24" /> {/* Replace with actual image path */}
    </div>
    </div>

    <label htmlFor="happiness" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Min-max
  range</label>
  <input id="happiness" value={formData.happiness} onChange={handleChange} name="happiness" type="range" min="1" max="4"
  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"/>

    </div>

  {/* Meals Section */}
  <div className="mb-6">
  <h2 className="text-xl font-semibold mb-4">Meals</h2>
    <div className="grid grid-cols-3 gap-4">
  <div className="p-4 bg-white shadow-md rounded-lg">
  <h3 className="font-semibold">Breakfast</h3>
    <Image src="/breakfast.png" alt="Happy 4" width={250} height={250} className="w-28 h-28" /> {/* Replace with actual image path */}

    <textarea className="mt-2 w-full p-2 border rounded-md" rows={2} placeholder="Comment"></textarea>
    </div>
    <div className="p-4 bg-white shadow-md rounded-lg">
  <h3 className="font-semibold">Lunch</h3>
    <Image src="/lunch.png" alt="Happy 4" width={250} height={250}  className="w-28 h-28" /> {/* Replace with actual image path */}

    <textarea className="mt-2 w-full p-2 border rounded-md" rows={2} placeholder="Comment"></textarea>
    </div>
    <div className="p-4 bg-white shadow-md rounded-lg">
  <h3 className="font-semibold">Snacks</h3>
    <Image src="/snacks.png" alt="Happy 4" width={250} height={250}  className="w-28 h-28" /> {/* Replace with actual image path */}

    <textarea className="mt-2 w-full p-2 border rounded-md" rows={2} placeholder="Comment"></textarea>
    </div>
    </div>
    </div>

  {/* Sleep Section */}
  <div className="mb-6">
  <h2 className="text-xl font-semibold mb-4">Sleep</h2>
    <div className="grid grid-cols-2 p-4 bg-white shadow-lg rounded-lg">
  <div className="flex flex-row sm:flex-row ">
  <div class="">
  <Image src="/clock-2.png" alt="Clock" width={350} height={250} className="w-40 h-40" /> {/* Replace with actual image path */}
    </div>
    <div class="grid grid-cols-2 flex flex-row justify-between p-4">
  <div className=" ">
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
    <input   value={formData.sleepStart} onChange={handleChange} type="time" name="sleepStart" id="sleepStart"
  className="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
  min="09:00" max="18:00"  required/>
  </div>
  </div>
  <div className=" ">
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
    <input  onChange={handleChange}  value={formData.sleepEnd}  name="sleepEnd" type="time" id="sleepEnd"
  className="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
  min="09:00" max="18:00" required/>
  </div>
  </div>
  <div class="mt-4 w-full">
  <textarea className=" flex-row p-2 border rounded-md" rows={2} placeholder="Comment"></textarea>
    </div>
    </div>
    </div>
    <div class="flex justify-end">
  <Image src="/sleep-kid.png" alt="Clock" width={350} height={250} className="w-72 h-56 " /> {/* Replace with actual image path */}
    </div>
    </div>
    </div>

  {/* Behavior Section */}
  <div className="mb-6">
  <h2 className="text-xl font-semibold mb-4">Behavior</h2>
    <div className="grid grid-cols-4 gap-4">
  <div className="p-4 bg-white shadow-md rounded-lg">
  <Image src="/agressive-behavior.png" alt="Behavior 1" width={250} height={250} className="w-36 h-36 mx-auto" /> {/* Replace with actual image path */}
    <textarea className="mt-2 w-full p-2 border rounded-md" rows={2} placeholder="Comment"></textarea>
    </div>
    <div className="p-4 bg-white shadow-md rounded-lg">
  <Image src="" alt="Behavior 2" width={250} height={250} className="w-12 h-12 mx-auto" /> {/* Replace with actual image path */}
    <textarea className="mt-2 w-full p-2 border rounded-md" rows={2} placeholder="Comment"></textarea>
    </div>
    <div className="p-4 bg-white shadow-md rounded-lg">
  <Image src="" alt="Behavior 3" width={250} height={250} className="w-12 h-12 mx-auto" /> {/* Replace with actual image path */}
    <textarea className="mt-2 w-full p-2 border rounded-md" rows={2} placeholder="Comment"></textarea>
    </div>
    <div className="p-4 bg-white shadow-md rounded-lg">
  <Image src="" alt="Behavior 4" width={250} height={250} className="w-12 h-12 mx-auto" /> {/* Replace with actual image path */}
    <textarea className="mt-2 w-full p-2 border rounded-md" rows={2} placeholder="Comment"></textarea>
    </div>
    </div>
    </div>

  {/* Activities Section */}
  <div>
    <h2 className="text-xl font-semibold mb-4">Activities</h2>
    <div className="grid grid-cols-4 gap-4">
  <div className="p-4 bg-white shadow-md rounded-lg">
  <Image src="" alt="Activity 1" width={250} height={250} className="w-12 h-12 mx-auto" /> {/* Replace with actual image path */}
    <textarea className="mt-2 w-full p-2 border rounded-md" rows={2} placeholder="Comment"></textarea>
    </div>
    <div className="p-4 bg-white shadow-md rounded-lg">
  <Image src="" alt="Activity 2" width={250} height={250} className="w-12 h-12 mx-auto" /> {/* Replace with actual image path */}
    <textarea className="mt-2 w-full p-2 border rounded-md" rows={2} placeholder="Comment"></textarea>
    </div>
    <div className="p-4 bg-white shadow-md rounded-lg">
  <Image src="" alt="Activity 3" width={250} height={250} className="w-12 h-12 mx-auto" /> {/* Replace with actual image path */}
    <textarea className="mt-2 w-full p-2 border rounded-md" rows={2} placeholder="Comment"></textarea>
    </div>
    <div className="p-4 bg-white shadow-md rounded-lg">
  <Image src="" alt="Activity 4" width={250} height={250} className="w-12 h-12 mx-auto" /> {/* Replace with actual image path */}
    <textarea className="mt-2 w-full p-2 border rounded-md" rows={2} placeholder="Comment"></textarea>
    </div>
    </div>
    </div>
    </form>
    </div>
    </div>
);
};

export default KidReportComponent;

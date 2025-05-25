"use client";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import { Button, Navbar, DarkThemeToggle } from "flowbite-react";

export default function Home() {
  return (
    <main className="bg-white min-h-screen">
      {/* Navigation Bar */}
      <Navbar fluid className="shadow-sm py-4">
        <Navbar.Brand href="/">
          <Image
            className="mr-3"
            src="/logo.png"
            alt="Care4Kids Logo"
            width={150}
            height={50}
            priority
          />
        </Navbar.Brand>
        <div className="flex md:order-2 gap-2">
          <Link href="/login">
            <Button gradientDuoTone="purpleToBlue">Sign In</Button>
          </Link>
          <Navbar.Toggle />
        </div>
        <Navbar.Collapse>
          <Navbar.Link href="#" active>
            Home
          </Navbar.Link>
          <Navbar.Link href="#">About</Navbar.Link>
          <Navbar.Link href="#">Services</Navbar.Link>
          <Navbar.Link href="#">Contact</Navbar.Link>
        </Navbar.Collapse>
      </Navbar>

      {/* Hero Section */}
      <div className="py-20 px-4 text-center bg-gradient-to-b from-white to-blue-50">
        <div className="max-w-screen-xl mx-auto">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl">
            Childcare Management Made Simple
          </h1>
          <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48">
            Care4Kids helps childcare centers, parents, and teachers collaborate
            seamlessly for better early childhood education.
          </p>
          <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 justify-center">
            <Button size="xl" gradientDuoTone="purpleToBlue">
              Get Started
            </Button>
            <Button size="xl" color="light">
              Learn More
            </Button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 px-4 bg-white">
        <div className="max-w-screen-xl mx-auto">
          <h2 className="mb-8 text-3xl font-bold text-center text-gray-900">
            Our Features
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="p-6 bg-white rounded-lg border border-gray-200 shadow-md">
              <div className="flex justify-center mb-4">
                <Image
                  src="/class-sun.png"
                  alt="Class Management"
                  width={80}
                  height={80}
                />
              </div>
              <h3 className="mb-2 text-xl font-bold text-center">
                Class Management
              </h3>
              <p className="text-gray-500 text-center">
                Organize classes, track attendance, and manage daily activities.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-6 bg-white rounded-lg border border-gray-200 shadow-md">
              <div className="flex justify-center mb-4">
                <Image
                  src="/happy.png"
                  alt="Kid Reports"
                  width={80}
                  height={80}
                />
              </div>
              <h3 className="mb-2 text-xl font-bold text-center">
                Kid Reports
              </h3>
              <p className="text-gray-500 text-center">
                Track child development, share updates, and document milestones.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-6 bg-white rounded-lg border border-gray-200 shadow-md">
              <div className="flex justify-center mb-4">
                <Image
                  src="/clock-1.png"
                  alt="Parent Communication"
                  width={80}
                  height={80}
                />
              </div>
              <h3 className="mb-2 text-xl font-bold text-center">
                Parent Communication
              </h3>
              <p className="text-gray-500 text-center">
                Keep parents informed with real-time updates and notifications.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="p-4 bg-white md:p-8 lg:p-10 border-t">
        <div className="mx-auto max-w-screen-xl text-center">
          <div className="flex justify-center items-center mb-5">
            <Image
              src="/logo.png"
              alt="Care4Kids Logo"
              width={120}
              height={40}
            />
          </div>
          <p className="my-6 text-gray-500">
            Simplifying childcare management for institutions, teachers, and
            parents.
          </p>
          <ul className="flex flex-wrap justify-center items-center mb-6 text-gray-900">
            <li>
              <a href="#" className="mr-4 hover:underline md:mr-6">
                About
              </a>
            </li>
            <li>
              <a href="#" className="mr-4 hover:underline md:mr-6">
                Features
              </a>
            </li>
            <li>
              <a href="#" className="mr-4 hover:underline md:mr-6">
                Pricing
              </a>
            </li>
            <li>
              <a href="#" className="mr-4 hover:underline md:mr-6">
                Contact
              </a>
            </li>
          </ul>
          <span className="text-sm text-gray-500 sm:text-center">
            © 2023-2024{" "}
            <a href="#" className="hover:underline">
              Care4Kids™
            </a>
            . All Rights Reserved.
          </span>
        </div>
      </footer>
    </main>
  );
}

"use client";
import React from "react";
import { useState } from "react";

type Props = {};

const ForgotPassword = (props: Props) => {

  // State to hold form data
  const [formData, setFormData] = useState({
    username: '',
    email: ''
  });

  // State to hold form errors
  const [formErrors, setFormErrors] = useState({
    username: '',
    email: ''
  });

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate form data
    const errors = validateForm(formData);
    setFormErrors(errors);

    // Check if there are no errors
    const isValid = Object.values(errors).every(error => error === '');
    if (isValid) {
      // Submit form data
      console.log('Form submitted successfully:', formData);
      // You can add API call here to submit the form data to the server
    }
  };

  // Validate form data
  const validateForm = (data: typeof formData) => {
    const errors: typeof formErrors = {
      username: '',
      email: ''
    };

    if (!data.username) errors.username = 'Username is required';
    if (!data.email) errors.email = 'Email is required';

    return errors;
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center">Forgot Password</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {formErrors.username && <p className="mt-1 text-xs text-red-600">{formErrors.username}</p>}
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {formErrors.email && <p className="mt-1 text-xs text-red-600">{formErrors.email}</p>}
          </div>
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;

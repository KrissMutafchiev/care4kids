"use client";

import React, { useRef  , useEffect,useState } from "react";
import Image from "next/image";
import { signIn } from "next-auth/react";

type Props = {};

const Login = (props: Props) => {

  const [csrfToken, setCsrfToken] = useState(null);

  const email = useRef("");
  const pass = useRef("");


  useEffect(() => {
    const fetchCsrfToken = async () => {
      try {
        const response = await fetch('/api/auth/csrf');
        const data = await response.json();
        setCsrfToken(data.csrfToken);
      } catch (error) {
        console.error('Error fetching CSRF token:', error);
      }
    };

    fetchCsrfToken();
  }, []);



  const onSubmit = async (event:any) => {
    event.preventDefault();

    // const result = await signIn("credentials", {
    //   username: email.current,
    //   password: pass.current,
    // csrfToken,
    //   redirect: true,
    //   callbackUrl: "/panels/institution",
    // });

    const res = await fetch(
      "http://ec2-3-125-52-214.eu-central-1.compute.amazonaws.com:8080/login",
      {
        method: "POST",
        headers: {
          'Access-Control-Allow-Origin':'*',
          "X-XSRF-TOKEN": `086f1196-278d-4485-9f87-af5044aa689c`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: `${email.current}`,
          password: `${pass.current}`,
        }),
      }
    );

    const user = await res.json();
    console.log(user)

  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
          href="#"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <Image
            className="w-40 h-32 mr-2"
            src="/logo.png"
            alt="logo"
            width={400}
            height={300}
          />
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            <form className="max-w-sm mx-auto">
              <div className="mb-5">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  onChange={e => (email.current = e.target.value)}
                  type="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@flowbite.com"
                  required
                />
              </div>
              <div className="mb-5">
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your password
                </label>
                <input
                  onChange={e => (pass.current = e.target.value)}
                  type="password"
                  id="password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
              <div className="flex items-start mb-5">
                <div className="flex items-center h-5">
                  <input
                    id="remember"
                    type="checkbox"
                    value=""
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                    required
                  />
                </div>
                <label
                  htmlFor="remember"
                  className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Remember me
                </label>
              </div>
              <button
                onClick={onSubmit}
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Submit
              </button>
              <span>{ csrfToken}</span>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;

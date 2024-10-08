
import React from 'react';
import { Card } from "flowbite-react";
import Image from "next/image";

type Props = {};

const GroupClass: React.FC = async () => {


  return (
    <div class="grid grid-cols-3 gap-3 ">
      <Card
        className="max-w-sm"
        renderImage={() => <Image width={300} height={300} src="/class-sun.png" alt="image 1" />}
      >
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Noteworthy technology acquisitions 2021
        </h5>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
        </p>
      </Card>
      <Card
        className="max-w-sm"
        renderImage={() => <Image width={300} height={300} src="/class-sun.png" alt="image 1" />}
      >
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Noteworthy technology acquisitions 2021
        </h5>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
        </p>
      </Card>
      <Card
        className="max-w-sm"
        renderImage={() => <Image width={300} height={300} src="/class-sun.png" alt="image 1" />}
      >
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Noteworthy technology acquisitions 2021
        </h5>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
        </p>
      </Card>
      <Card
        className="max-w-sm"
        renderImage={() => <Image width={300} height={300} src="/class-sun.png" alt="image 1" />}
      >
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Noteworthy technology acquisitions 2021
        </h5>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
        </p>
      </Card>
      <Card
        className="max-w-sm"
        renderImage={() => <Image width={300} height={300} src="/class-sun.png" alt="image 1" />}
      >
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Noteworthy technology acquisitions 2021
        </h5>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
        </p>
      </Card>
      <Card
        className="max-w-sm"
        renderImage={() => <Image width={300} height={300} src="/class-sun.png" alt="image 1" />}
      >
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Noteworthy technology acquisitions 2021
        </h5>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
        </p>
      </Card>
    </div>
  );
};


export default GroupClass
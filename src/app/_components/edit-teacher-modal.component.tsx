"use client";

import React, {useState ,useEffect } from "react";
import { Button, Checkbox, Label, Modal, TextInput ,FileInput} from "flowbite-react";
import {customThemeButton, customThemeModal} from "@/app/_components/custom-flowbite-theme"
import { HiUserAdd } from "react-icons/hi";

export const EditTeacherModalComponent: React.FC = ({ openModal, closeModal ,teacher }) => {
  const [firstName, setFirstName] = useState('');
  const [midName, setMidName] = useState('');
  const [lastName, setLastName] =  useState('');
  const [role, setRole] = useState('');
  const [classes, setClasses] =  useState('');
  const [email, setEmail] =  useState('');
  const [phone, setPhone] =  useState('');
  const [avatar, setAvatar] =  useState('');


  const [teacherData, setTeacherData] = useState({});

  // To Do : add functionality to load the selected teacher data into inputs fields .

  useEffect(() => {

    if(teacher){
      setFirstName(teacher.name);
      setMidName(teacher.midname);
      setLastName(teacher.lastname);
      setRole(teacher.role);
      setClasses(teacher.classes);
      setEmail(teacher.email);
      setPhone(teacher.phone);
      setAvatar(teacher.avatarImg);
    }

  }, [openModal,closeModal , teacher]); // someProp is the dependency


  const handleSubmit = (e) => {
    e.preventDefault();

    // Collect all data from inputs into a single object
    const collectedData = {
      firstName,
      midName,
      lastName,
      role,
      classes,
      email,
      phone,
      avatar
    };

    // Set the teacherData state to this object
    setTeacherData(collectedData);

    // You can clear the form inputs if needed
    // setFirstName('');
    // setMidName('');
    // setLastName('');
    // setRole('');
    // setClasses('');
    // setEmail('');
    // setPhone('');
    // setAvatar('');

    console.log('Collected Data: ', collectedData); // You can remove this once it works
  };

  return (
    <div>
      {
        openModal && (
          <Modal show={openModal}  onClose={closeModal}  theme={customThemeModal} size="3xl"  popup>
            <Modal.Header />
            <Modal.Body>
              <form onSubmit={handleSubmit} className="">
              <div className="space-y-6">
                <h3 className="text-xl font-medium text-gray-900 dark:text-white">Edit Teacher</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="mb-2 block">
                      <Label htmlFor="firstName" value="First Name" />
                    </div>
                    <TextInput
                      id="firstName"
                      placeholder="First Name"
                      value={firstName}
                      onChange={(event) => setFirstName(event.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <div className="mb-2 block">
                      <Label htmlFor="midName" value="Mid Name" />
                    </div>
                    <TextInput
                      id="midName"
                      placeholder="Mid Name"
                      value={midName}
                      onChange={(event) => setMidName(event.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <div className="mb-2 block">
                      <Label htmlFor="lastName" value="Last Name" />
                    </div>
                    <TextInput
                      id="lastName"
                      placeholder="Last Name"
                      value={lastName}
                      onChange={(event) => setLastName(event.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <div className="mb-2 block">
                      <Label htmlFor="role" value="Role" />
                    </div>
                    <TextInput
                      id="role"
                      placeholder="Role"
                      value={role}
                      onChange={(event) => setRole(event.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <div className="mb-2 block">
                      <Label htmlFor="classes" value="Classes" />
                    </div>
                    <TextInput
                      id="classes"
                      placeholder="Classes"
                      value={classes}
                      onChange={(event) => setClasses(event.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <div className="mb-2 block">
                      <Label htmlFor="email" value="Email" />
                    </div>
                    <TextInput
                      id="email"
                      placeholder="Email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <div className="mb-2 block">
                      <Label htmlFor="phone" value="Phone" />
                    </div>
                    <TextInput
                      id="phone"
                      placeholder="Phone"
                      value={phone}
                      onChange={(event) => setPhone(event.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <div className="mb-2 block">
                      <Label htmlFor="avatar" value="Avatar" />
                    </div>
                    <FileInput id="avatar" placeholder="Avatar"  onChange={(event) => setAvatar(event.target.value)} />
                  </div>
                  <div className="flex items-center">
                    <Button type="submit" theme={customThemeButton}  size="md" >
                      <HiUserAdd className=" mr-2 h-5 w-5" />
                      Submit
                    </Button>
                  </div>
                </div>

              </div>
              </form>
            </Modal.Body>
          </Modal>

        )
      }
    </div>
  );
};
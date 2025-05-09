"use client";

import React, { useState } from "react";
import { Label, TextInput, Button, Alert } from "flowbite-react";
import { createInstitution } from "@/services/institution-service";

export const InstitutionCreation: React.FC = () => {
  const [institutionName, setInstitutionName] = useState("");
  const [address, setAddress] = useState("");
  const [institutionEmail, setInstitutionEmail] = useState("");
  const [uic, setUic] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (!institutionName || !address || !institutionEmail || !uic) {
      setErrorMessage("All fields are required.");
      return;
    }

    try {
      await createInstitution({
        name: institutionName,
        address,
        email: institutionEmail,
        uic,
        contactPerson,
      })

      setSuccessMessage("Institution created successfully!");
      setInstitutionName("");
      setAddress("");
      setInstitutionEmail("");
      setUic("");
      setContactPerson("");
    } catch (error: any) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold text-center mb-6">
        Create Institution
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="institutionName" value="Institution Name" />
          <TextInput
            id="institutionName"
            type="text"
            placeholder="Enter Institution Name"
            value={institutionName}
            onChange={e => setInstitutionName(e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="address" value="Address" />
          <TextInput
            id="address"
            type="text"
            placeholder="Enter Address"
            value={address}
            onChange={e => setAddress(e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="institutionEmail" value="Email" />
          <TextInput
            id="institutionEmail"
            type="email"
            placeholder="Enter Email"
            value={institutionEmail}
            onChange={e => setInstitutionEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="uic" value="UIC (Unique Identification Code)" />
          <TextInput
            id="uic"
            type="text"
            placeholder="Enter UIC"
            value={uic}
            onChange={e => setUic(e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="contactPerson" value="Contact Person (Optional)" />
          <TextInput
            id="contactPerson"
            type="text"
            placeholder="Enter Contact Person Name"
            value={contactPerson}
            onChange={e => setContactPerson(e.target.value)}
          />
        </div>
        {errorMessage && (
          <Alert color="failure">
            <span>{errorMessage}</span>
          </Alert>
        )}
        {successMessage && (
          <Alert color="success">
            <span>{successMessage}</span>
          </Alert>
        )}
        <div className="text-center">
          <Button type="submit" color="success">
            Create Institution
          </Button>
        </div>
      </form>
    </div>
  );
};

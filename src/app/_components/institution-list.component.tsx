"use client";

import React, { useState, useEffect } from "react";
import { Table, Spinner, Alert } from "flowbite-react";
import { Institution } from "@/types/interfaces";

export const InstitutionList: React.FC = () => {
  const [institutions, setInstitutions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchInstitutions = async () => {
      try {
        const response = await fetch(
          "/api/operative/institution/get-institution"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch institutions");
        }

        const data = await response.json();
        setInstitutions(data); 
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchInstitutions();
  }, []);


  if (error) {
    return (
      <Alert color="failure">
        <span>{error}</span>
      </Alert>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-center mb-6">Institution List</h2>
      {loading ? (
          <div className="flex justify-center items-center">
            <Spinner size="lg" />
          </div>
        ) : institutions.length > 0 ? (
          <Table>
            <Table.Head>
              <Table.HeadCell>Name</Table.HeadCell>
              <Table.HeadCell>Email</Table.HeadCell>
              <Table.HeadCell>Address</Table.HeadCell>
              <Table.HeadCell>UIC</Table.HeadCell>
            </Table.Head>
            <Table.Body>
              {institutions.map((institution : Institution) => (
                <Table.Row key={institution._id}>
                  <Table.Cell>{institution.name}</Table.Cell>
                  <Table.Cell>{institution.email}</Table.Cell>
                  <Table.Cell>{institution.address}</Table.Cell>
                  <Table.Cell>{institution.uic}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        ) : (
          <p>No institutions available.</p>
        )}
    </div>
  );
};

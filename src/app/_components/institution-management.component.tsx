"use client";

import { useState, useEffect } from "react";
import {
  Label,
  TextInput,
  Button,
  Table,
  Spinner,
  Modal,
} from "flowbite-react";
import { InstitutionModel } from "@/types/interfaces";
import { useAlert } from "@/app/context/AlertContext"; // Import the hoo

export const InstitutionManagement: React.FC = () => {
  const [institutions, setInstitutions] = useState<InstitutionModel[]>([]);
  const { showAlert } = useAlert();

  const [loading, setLoading] = useState(true);

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [uic, setUic] = useState("");
  const [contactPerson, setContactPerson] = useState("");

  const [selectedInstitution, setSelectedInstitution] =
    useState<InstitutionModel | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");

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
      } catch (error) {
        showAlert("Error fetching institutions", "error");
        console.error("Error fetching institutions:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchInstitutions();
  }, []);

  const handleSubmit = async () => {
    if (!name || !address || !email || !uic) {
      showAlert("All fields are required.", "error"); // Show error alert
      return;
    }

    const payload = {
      name,
      address,
      email,
      uic,
      contactPerson,
    };

    try {
      const url =
        modalMode === "create"
          ? "/api/operative/institution/create-institution"
          : `/api/operative/institution/update-institution/${selectedInstitution?._id}`;

      const method = modalMode === "create" ? "POST" : "PUT";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(
          modalMode === "create"
            ? "Failed to create institution."
            : "Failed to update institution."
        );
      }

      const updatedInstitutions = await response.json();
      setInstitutions(updatedInstitutions);
      showAlert("Institution created successfully!", "success");

      setName("");
      setAddress("");
      setEmail("");
      setUic("");
      setContactPerson("");
      setShowModal(false);
    } catch (error: any) {
      showAlert(error.message, "error"); // Show error alert
    }
  };

  const openCreateModal = () => {
    setModalMode("create");
    setName("");
    setAddress("");
    setEmail("");
    setUic("");
    setContactPerson("");
    setShowModal(true);
  };

  const openEditModal = (institution: InstitutionModel) => {
    setModalMode("edit");
    setSelectedInstitution(institution);
    setName(institution.name);
    setAddress(institution.address);
    setEmail(institution.email);
    setUic(institution.uic);
    setContactPerson(institution.contactPerson || "");
    setShowModal(true);
  };

  return (
    <div className="flex flex-col">
      {/* Action Button */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Institution Management
        </h2>
        <Button
          className="bg-teal hover:bg-teal-dark text-white"
          onClick={openCreateModal}
        >
          Add New Institution
        </Button>
      </div>

      {/* Institution List */}
      <div className="bg-white shadow-lg rounded-lg p-6">
        {loading ? (
          <div className="flex justify-center items-center h-24">
            <Spinner size="lg" />
          </div>
        ) : institutions.length > 0 ? (
          <div className="overflow-x-auto">
            <Table className="min-w-full">
              <Table.Head>
                <Table.HeadCell>Name</Table.HeadCell>
                <Table.HeadCell>Email</Table.HeadCell>
                <Table.HeadCell>Address</Table.HeadCell>
                <Table.HeadCell>UIC</Table.HeadCell> 
                <Table.HeadCell>Actions</Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y divide-gray-200">
                {institutions.map((institution: InstitutionModel, index: number) => (
                  <Table.Row
                    key={institution._id}
                    className={`${
                      index % 2 === 0 ? "bg-gray-100" : "bg-white"
                    } hover:bg-gray-200`}
                  >
                    <Table.Cell className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {institution.name}
                    </Table.Cell>
                    <Table.Cell className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {institution.email}
                    </Table.Cell>
                    <Table.Cell className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {institution.address}
                    </Table.Cell>
                    <Table.Cell className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {institution.uic}
                    </Table.Cell>
                    <Table.Cell className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      <Button
                        color="warning"
                        size="xs"
                        onClick={() => openEditModal(institution)}
                      >
                        Edit
                      </Button>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </div>
        ) : (
          <p className="text-center text-gray-500">
            No institutions available.
          </p>
        )}
      </div>

      {/* Modal */}
      <Modal
        show={showModal}
        size="md"
        popup
        onClose={() => setShowModal(false)}
      >
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-700 text-center">
              {modalMode === "create"
                ? "Add New Institution"
                : "Edit Institution"}
            </h3>
            <div>
              <Label
                htmlFor="institutionName"
                className="mb-2 block font-medium text-gray-700"
                value="Institution Name"
              />
              <TextInput
                id="institutionName"
                type="text"
                placeholder="Enter Institution Name"
                value={name}
                onChange={e => setName(e.target.value)}
                required
                shadow
              />
            </div>
            <div>
              <Label
                htmlFor="address"
                className="mb-2 block font-medium text-gray-700"
                value="Address"
              />
              <TextInput
                id="address"
                type="text"
                placeholder="Enter Address"
                value={address}
                onChange={e => setAddress(e.target.value)}
                required
                shadow
              />
            </div>
            <div>
              <Label
                htmlFor="institutionEmail"
                className="mb-2 block font-medium text-gray-700"
                value="Email"
              />
              <TextInput
                id="institutionEmail"
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                shadow
              />
            </div>
            <div>
              <Label
                htmlFor="uic"
                className="mb-2 block font-medium text-gray-700"
                value="UIC (Unique Identification Code)"
              />
              <TextInput
                id="uic"
                type="text"
                placeholder="Enter UIC"
                value={uic}
                onChange={e => setUic(e.target.value)}
                required
                shadow
              />
            </div>
            <div>
              <Label
                htmlFor="contactPerson"
                className="mb-2 block font-medium text-gray-700"
                value="Contact Person (Optional)"
              />
              <TextInput
                id="contactPerson"
                type="text"
                placeholder="Enter Contact Person Name"
                value={contactPerson}
                onChange={e => setContactPerson(e.target.value)}
                shadow
              />
            </div>
            <div className="flex justify-end gap-4 mt-4">
              <Button color="gray" onClick={() => setShowModal(false)}>
                Cancel
              </Button>
              <Button color="success" onClick={handleSubmit}>
                {modalMode === "create" ? "Create" : "Save Changes"}
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

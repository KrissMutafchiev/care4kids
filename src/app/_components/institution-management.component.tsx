"use client";
import { useState } from "react";
import { useFetchData } from "@/utils/useFetchData";
import  Modal   from "@/app/_components/ui/modal.component";
import InstitutionForm from "@/app/_components/managment/institution/institution-form.component";
import ListInstitution from "@/app/_components/managment/institution/institution-list.component";
import HeaderToolbar from "@/app/_components/managment/institution/header-toolbar.component";
import DetailInstitution from "@/app/_components/managment/institution/institution-detail.component";
import { Card } from "flowbite-react";
import { deleteInstitution ,fetchInstitutions } from "@/services/institution-service";

const InstitutionManagement = () => {
  const { data: institutions, setData: setInstitutions ,loading, error} = useFetchData<any[]>("/api/institutions");
  const [selectedInstitution, setSelectedInstitution] = useState<{ _id: string } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingInstitution, setEditingInstitution] = useState<{ _id: string } | null>(null);

  const handleSelectInstitution = (institution:any) => {
    setSelectedInstitution(institution);
  };

  const handleAdd = () => {
    setEditingInstitution(null);
    setIsModalOpen(true);
  };

  const handleUpdate = () => {
    setEditingInstitution(selectedInstitution);
    setIsModalOpen(true);
  };

  const handleDelete = async () => {
    if (!selectedInstitution) return;
    await deleteInstitution(selectedInstitution._id)
    setInstitutions(institutions?.filter(inst => inst._id !== selectedInstitution._id) || []);
    setSelectedInstitution(null);
  };

  if (loading) return <p>Loading institutions...</p>;
  
if (error) return <p className="text-red-500">Failed to load institutions.</p>;

  return (
    <div className="h-screen p-4 flex flex-col bg-gray-100">
      {/* Header Toolbar at the Top */}
      <div className="mb-4 bg-white shadow-md rounded-lg p-4">
        <HeaderToolbar 
          selectedInstitution={selectedInstitution} 
          onAdd={handleAdd} 
          onUpdate={handleUpdate} 
          onDelete={handleDelete} 
        />
      </div>

      {/* Main Content Layout */}
      <div className="flex flex-1 gap-4">
        {/* Left - Institution List */}
        <div className="w-1/3 bg-white shadow-md p-4 rounded-lg overflow-auto border border-gray-300">
          <ListInstitution institutions={institutions} onSelect={handleSelectInstitution} />
        </div>

        {/* Right - Institution Detail View */}
        <div className="w-2/3">
          {selectedInstitution ? (
            <DetailInstitution institution={selectedInstitution} />
          ) : (
            <Card className="p-4 bg-gray-50 shadow-sm border border-gray-300">
              <p className="text-gray-500">Select an institution to view details.</p>
            </Card>
          )}
        </div>
      </div>

      {/* Modal for Add/Edit Institution */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <InstitutionForm 
          initialData={editingInstitution} 
          onSuccess={async () => {
            const updatedInstitutions = await fetchInstitutions() // Fetch latest institutions
            setInstitutions(updatedInstitutions); // Update the list
            setIsModalOpen(false);
          }}
          
        />
      </Modal>
    </div>
  );
};

export default InstitutionManagement;
"use client";
import { useState, useEffect } from "react";
import Modal from "@/app/_components/ui/modal.component";
import HeaderToolbar from "@/app/_components/managment/group-class/group-class-toolbar.component";
import ListInstitutions from "@/app/_components/managment/institution/institution-list.component";
import GroupClassCards from "@/app/_components/managment/group-class/group-class-cards.component";
import GroupClassForm from "@/app/_components/managment/group-class/group-class-form.component";
import { fetchInstitutions } from "@/services/institution-service";
import {
  fetchGroupClasses,
  deleteGroupClass,
} from "@/services/group-class-service";

const GroupClass = () => {
  const [institutions, setInstitutions] = useState<any[]>([]);
  const [selectedInstitution, setSelectedInstitution] = useState<{
    _id: string;
  } | null>(null);
  const [groupClasses, setGroupClasses] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingGroupClass, setEditingGroupClass] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch institutions on component mount
  useEffect(() => {
    const loadInstitutions = async () => {
      setLoading(true);
      try {
        const data = await fetchInstitutions();
        setInstitutions(data);
      } catch (err: any) {
        setError("Failed to load institutions.");
      } finally {
        setLoading(false);
      }
    };
    loadInstitutions();
  }, []);

  // Fetch group classes when an institution is selected
  useEffect(() => {
    const loadGroupClasses = async () => {
      if (!selectedInstitution) {
        setGroupClasses([]);
        return;
      }
      setLoading(true);
      try {
        const data = await fetchGroupClasses({ institution: selectedInstitution._id });
        setGroupClasses(data);
      } catch (err: any) {
        setError("Failed to load group classes.");
      } finally {
        setLoading(false);
      }
    };
    loadGroupClasses();
  }, [selectedInstitution]);

  const handleSelectInstitution = (institution: any) => {
    setSelectedInstitution(institution);
  };

  const handleAdd = () => {
    setEditingGroupClass(null);
    setIsModalOpen(true);
  };

  const handleUpdate = (groupClass: any) => {
    setEditingGroupClass(groupClass);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteGroupClass(id);
      setGroupClasses(groupClasses.filter((gc: any) => gc._id !== id));
    } catch (err: any) {
      setError("Failed to delete group class.");
    }
  };

  if (loading) return <p>Loading Group Classes...</p>;

  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="flex flex-col h-screen p-4 gap-4">
      {/* Header Toolbar */}
      <HeaderToolbar
        selectedInstitution={selectedInstitution}
        onAdd={handleAdd}
        onUpdate={() => {}}
        onDelete={() => {}}
      />

      <div className="flex flex-grow gap-4">
        {/* Left Side: Institution List */}
        <div className="w-1/3 bg-white shadow-md p-4 rounded-lg overflow-auto">
          <ListInstitutions
            institutions={institutions}
            onSelect={handleSelectInstitution}
          />
        </div>

        {/* Right Side: Group Class Cards */}
        <div className="w-2/3 bg-white shadow-md p-4 rounded-lg overflow-auto">
          {selectedInstitution ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {groupClasses?.map((groupClass: any) => (
                <GroupClassCards
                  key={groupClass._id}
                  groupClass={groupClass}
                  onEdit={handleUpdate}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          ) : (
            <p className="text-gray-500">
              Select an institution to view group classes.
            </p>
          )}
        </div>
      </div>

      {/* Modal for Adding/Editing Group Class */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <GroupClassForm
          initialData={editingGroupClass}
          institutionId={selectedInstitution?._id}
          onSuccess={(newGroupClass: any) => {
            if (editingGroupClass) {
              setGroupClasses(
                groupClasses.map((gc: any) =>
                  gc._id === newGroupClass._id ? newGroupClass : gc
                )
              );
            } else {
              setGroupClasses([...groupClasses, newGroupClass]);
            }
            setIsModalOpen(false);
          }}
        />
      </Modal>
    </div>
  );
};

export default GroupClass;
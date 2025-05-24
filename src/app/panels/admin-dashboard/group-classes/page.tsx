"use client";
import { useState, useEffect } from "react";
import { Button, Spinner, Card } from "flowbite-react";
import Modal from "@/app/_components/ui/modal.component";
import HeaderToolbar from "@/app/_components/managment/group-class/group-class-toolbar.component";
import ListInstitutions from "@/app/_components/managment/institution/institution-list.component";
import GroupClassCards from "@/app/_components/managment/group-class/group-class-cards.component";
import GroupClassForm from "@/app/_components/managment/group-class/group-class-form.component";
import { fetchInstitutions } from "@/services/institution-service";
import { useAlert } from "@/app/context/AlertContext";
import {
  fetchGroupClasses,
  deleteGroupClass,
} from "@/services/group-class-service";

const GroupClass = () => {
  const { showAlert } = useAlert();
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
        if (data.length > 0) {
          setSelectedInstitution(data[0]);
        }
      } catch (err: any) {
        setError("Failed to load institutions.");
        showAlert("Failed to load institutions.", "error");
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
        const data = await fetchGroupClasses({
          institution: selectedInstitution._id,
        });
        setGroupClasses(data);
      } catch (err: any) {
        setError("Failed to load group classes.");
        showAlert("Failed to load group classes.", "error");
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
    if (!confirm("Are you sure you want to delete this group class?")) return;

    try {
      await deleteGroupClass(id);
      setGroupClasses(groupClasses.filter((gc: any) => gc._id !== id));
      showAlert("Group class deleted successfully", "success");
    } catch (err: any) {
      setError("Failed to delete group class.");
      showAlert("Failed to delete group class.", "error");
    }
  };

  if (loading && institutions.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner size="xl" />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full gap-4">
      {/* Header with title and add button */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-gray-800">
          Group Classes Management
        </h1>
        <Button
          color="primary"
          onClick={handleAdd}
          disabled={!selectedInstitution}
        >
          Add Group Class
        </Button>
      </div>

      {/* Main content area */}
      <div className="flex flex-grow gap-4">
        {/* Left Side: Institution List */}
        <Card className="w-1/3 overflow-auto">
          <h2 className="text-lg font-semibold mb-4">Select Institution</h2>
          <ListInstitutions
            institutions={institutions}
            onSelect={handleSelectInstitution}
            selectedInstitution={selectedInstitution}
          />
        </Card>

        {/* Right Side: Group Class Cards */}
        <Card className="w-2/3 overflow-auto">
          {selectedInstitution ? (
            loading ? (
              <div className="flex justify-center items-center h-64">
                <Spinner size="lg" />
              </div>
            ) : groupClasses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {groupClasses.map((groupClass: any) => (
                  <GroupClassCards
                    key={groupClass._id}
                    groupClass={groupClass}
                    onEdit={handleUpdate}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                <p className="mb-4">
                  No group classes found for this institution.
                </p>
                <Button color="primary" onClick={handleAdd}>
                  Create First Group Class
                </Button>
              </div>
            )
          ) : (
            <p className="text-gray-500 text-center py-12">
              Select an institution to view group classes.
            </p>
          )}
        </Card>
      </div>

      {/* Modal for Adding/Editing Group Class */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="p-4">
          <h2 className="text-xl font-bold mb-4">
            {editingGroupClass ? "Edit Group Class" : "Add New Group Class"}
          </h2>
          <GroupClassForm
            initialData={editingGroupClass}
            institutionId={selectedInstitution?._id}
            onSuccess={(newGroupClass: any) => {
              if (editingGroupClass) {
                setGroupClasses(
                  groupClasses.map((gc: any) =>
                    gc._id === newGroupClass._id ? newGroupClass : gc,
                  ),
                );
                showAlert("Group class updated successfully", "success");
              } else {
                setGroupClasses([...groupClasses, newGroupClass]);
                showAlert("Group class created successfully", "success");
              }
              setIsModalOpen(false);
            }}
          />
        </div>
      </Modal>
    </div>
  );
};

export default GroupClass;

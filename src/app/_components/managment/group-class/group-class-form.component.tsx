import { useState, useEffect } from "react";
import { Button, Label, Select, TextInput, Spinner } from "flowbite-react";
import { useFetchData } from "@/utils/useFetchData";
import {
  createGroupClass,
  updateGroupClass,
} from "@/services/group-class-service";
import { useAlert } from "@/app/context/AlertContext";

const GroupClassForm = ({ initialData, institutionId, onSuccess }: any) => {
  const [name, setName] = useState(initialData?.name || "");
  const [selectedTeachers, setSelectedTeachers] = useState<string[]>(
    initialData?.teacher || [],
  );
  const [isLoading, setIsLoading] = useState(false);
  const { showAlert } = useAlert();

  // Fetch teachers for the selected institution
  const { data } = useFetchData(
    institutionId ? `/api/users?role=teacher&institution=${institutionId}` : "",
  );
  const teachers = Array.isArray(data) ? data : [];

  useEffect(() => {
    if (initialData) {
      setName(initialData.name || "");
      setSelectedTeachers(initialData.teacher || []);
    }
  }, [initialData]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!name || selectedTeachers.length === 0) {
      alert("Please enter a class name and select at least one teacher.");
      return;
    }

    setIsLoading(true);

    try {
      let result;
      if (initialData) {
        // Use the updateGroupClass service for PUT requests
        result = await updateGroupClass(initialData._id, {
          _id: initialData._id,
          name,
          teacher: selectedTeachers,
          institution: institutionId,
          kids: initialData.kids || [],
        });
      } else {
        // Use the createGroupClass service for POST requests
        result = await createGroupClass({
          _id: "", // Provide a default or generated ID if necessary
          name,
          teacher: selectedTeachers,
          institution: institutionId,
          kids: [],
        });
      }

      onSuccess(result); // Notify parent component of success
    } catch (error: any) {
      console.error("Failed to save group class:", error);
      showAlert(error.message || "Failed to save group class.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Group Class Name */}
      <div>
        <Label
          htmlFor="name"
          value="Group Class Name"
          className="text-gray-700"
        />
        <TextInput
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter class name"
          required
          className="mt-1"
        />
      </div>

      {/* Multi-Select Teachers */}
      <div>
        <Label
          htmlFor="teacher"
          value="Assign Teachers"
          className="text-gray-700"
        />
        <Select
          id="teacher"
          multiple
          value={selectedTeachers}
          onChange={(e) =>
            setSelectedTeachers(
              Array.from(e.target.selectedOptions, (option) => option.value),
            )
          }
          required
          className="mt-1"
        >
          {teachers?.length > 0 ? (
            teachers.map((t) => (
              <option key={t._id} value={t._id}>
                {t.firstName} {t.lastName}
              </option>
            ))
          ) : (
            <option disabled value="">
              No teachers available for this institution
            </option>
          )}
        </Select>
        <p className="mt-1 text-xs text-gray-500">
          Hold Ctrl/Cmd to select multiple teachers
        </p>
      </div>

      {/* Submit Button */}
      <div className="pt-2">
        <Button
          type="submit"
          isProcessing={isLoading}
          gradientDuoTone="purpleToBlue"
          className="w-full"
        >
          {initialData ? "Update Group Class" : "Add Group Class"}
        </Button>
      </div>
    </form>
  );
};

export default GroupClassForm;

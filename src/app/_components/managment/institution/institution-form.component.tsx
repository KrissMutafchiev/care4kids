import { useState, useEffect } from "react";
import { Button, Label, TextInput } from "flowbite-react";
import { createInstitution, updateInstitution } from "@/services/institution-service";

const InstitutionForm = ({ initialData, onSuccess }:any) => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    email: "",
    uic: "",
    contactPerson: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        name: "",
        address: "",
        email: "",
        uic: "",
        contactPerson: "",
      });
    }
  }, [initialData]);

  const handleChange = (e:any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      let result;
      if (initialData) {
        result = await updateInstitution(initialData._id, formData);
      } else {
        result = await createInstitution(formData);
      }

      onSuccess(result); 
    } catch (error) {
      console.error("Error saving institution:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Institution Name</Label>
        <TextInput id="name" name="name" value={formData.name} onChange={handleChange} required />
      </div>

      <div>
        <Label htmlFor="address">Address</Label>
        <TextInput id="address" name="address" value={formData.address} onChange={handleChange} required />
      </div>

      <div>
        <Label htmlFor="email">Email</Label>
        <TextInput id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
      </div>

      <div>
        <Label htmlFor="uic">UIC</Label>
        <TextInput id="uic" name="uic" value={formData.uic} onChange={handleChange} required />
      </div>

      <div>
        <Label htmlFor="contactPerson">Contact Person</Label>
        <TextInput id="contactPerson" name="contactPerson" value={formData.contactPerson} onChange={handleChange} required />
      </div>

      <Button type="submit">{initialData ? "Update" : "Add"} Institution</Button>
    </form>
  );
};

export default InstitutionForm;

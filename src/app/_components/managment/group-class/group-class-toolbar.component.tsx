import { Button } from "flowbite-react";

const HeaderToolbar = ({ selectedInstitution, onAdd, onUpdate, onDelete }: any) => {
    return (
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Group Class Management</h1>
        <div className="flex gap-2">
          <Button className="mr-2" onClick={onAdd}>Add Group Class</Button>
        </div>
      </div>
    );
};
  
export default HeaderToolbar; 
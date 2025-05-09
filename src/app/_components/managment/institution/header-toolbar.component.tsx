import { Button } from "flowbite-react";

interface HeaderToolbarProps {
  selectedInstitution: any | null;
  onAdd: () => void;
  onUpdate: () => void;
  onDelete: () => void;
}

const HeaderToolbar: React.FC<HeaderToolbarProps> = ({
  selectedInstitution,
  onAdd,
  onUpdate,
  onDelete,
}) => {
  return (
    <div className="flex justify-between mb-4">
      <h1 className="text-2xl font-bold">Institution Management</h1>
      <div>
        <Button className="mr-2" onClick={onAdd}>Add Institution</Button>
        {selectedInstitution && (
          <>
            <Button className="mr-2" onClick={onUpdate}>Update Institution</Button>
            <Button color="failure" onClick={onDelete}>Delete Institution</Button>
          </>
        )}
      </div>
    </div>
  );
};

export default HeaderToolbar;

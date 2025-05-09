import TeachersList from "@/app/panels/institution/teachers/page";
import { Button, Card } from "flowbite-react";

const GroupClassCards = ({ groupClass, onEdit, onDelete }: any) => {
  console.log(groupClass)
  return (
    <Card className="p-4 shadow-md bg-gray-100 rounded-lg">
      <h3 className="text-lg font-semibold">{groupClass.name}</h3>
      <p>
        <strong>Teachers:</strong>{" "}
        {groupClass.teacher && groupClass.teacher.length > 0
          ? groupClass.teacher
              .map((item: any) => `${item.firstName} ${item.lastName}`)
              .join(", ")
          : "N/A"}
      </p>{" "}
      <p>
        <strong>Students:</strong> {groupClass.kids?.length || 0}
      </p>
      <div className="flex mt-2">
        <Button size="sm" className="mr-2" onClick={() => onEdit(groupClass)}>
          Edit
        </Button>
        <Button
          size="sm"
          color="failure"
          onClick={() => onDelete(groupClass._id)}
        >
          Delete
        </Button>
      </div>
    </Card>
  );
};

export default GroupClassCards;

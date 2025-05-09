import { Card } from "flowbite-react";

const InstitutionDetail = ({ institution }: any) => {
    return (
      <Card className="p-4 bg-gray-50 shadow-sm border border-gray-300">
      <h2 className="text-xl font-semibold text-gray-700 mb-2">{institution.name}</h2>
      <p className="text-gray-600"><strong>Address:</strong> {institution.address}</p>
      <p className="text-gray-600"><strong>Email:</strong> {institution.email}</p>
      <p className="text-gray-600"><strong>UIC:</strong> {institution.uic}</p>
      <p className="text-gray-600"><strong>Contact Person:</strong> {institution.contactPerson}</p>
    </Card>
    );
};
  export default InstitutionDetail;
const ListInstitution = ({ institutions, onSelect }:any) => {
    return (
      <ul className="divide-y divide-gray-300">
      {institutions.map((institution: any) => (
        <li
          key={institution._id}
          className="p-3 cursor-pointer bg-gray-50 hover:bg-gray-100 rounded-md transition"
          onClick={() => onSelect(institution)}
        >
          {institution.name}
        </li>
      ))}
    </ul>
    );
};
  
export default ListInstitution;
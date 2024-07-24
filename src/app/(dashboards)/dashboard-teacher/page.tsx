

type Props = {};

const DashboardTeacher = (props: Props) => { 

  // Dummy data for grid and table
  const gridItems = [
    { id: 1, title: "Grid Item 1" },
    { id: 2, title: "Grid Item 2" },
    { id: 3, title: "Grid Item 3" },
    { id: 4, title: "Grid Item 4" },
  ];

  const tableData = [
    { id: 1, name: "John", midname: "A", lastname: "Doe", gender: "Male", age: 30 },
    { id: 2, name: "Jane", midname: "B", lastname: "Doe", gender: "Female", age: 28 },
    { id: 3, name: "Sam", midname: "C", lastname: "Smith", gender: "Male", age: 22 },
    { id: 4, name: "Alice", midname: "D", lastname: "Johnson", gender: "Female", age: 35 },
    { id: 5, name: "Bob", midname: "E", lastname: "Brown", gender: "Male", age: 40 },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Left Sidebar */}
      <div className="w-1/4 bg-white p-4 shadow-lg">
        <div className="flex flex-col items-center">
          <img
            className="w-24 h-24 rounded-full"
            src="/profile-pic.jpg" // Replace with actual image path
            alt="Profile"
          />
          <h2 className="mt-4 text-xl font-semibold">Teacher Name</h2>
          <p className="mt-2 text-gray-600">Some info about the teacher.</p>
        </div>
      </div>

      {/* Right Content */}
      <div className="w-3/4 p-6">
        {/* Grid List */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {gridItems.map(item => (
            <div key={item.id} className="p-4 bg-white shadow-md rounded-lg">
              {item.title}
            </div>
          ))}
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg">
            <thead>
              <tr>
                <th className="px-4 py-2 border-b">Name</th>
                <th className="px-4 py-2 border-b">Midname</th>
                <th className="px-4 py-2 border-b">Lastname</th>
                <th className="px-4 py-2 border-b">Gender</th>
                <th className="px-4 py-2 border-b">Age</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map(row => (
                <tr key={row.id}>
                  <td className="px-4 py-2 border-b">{row.name}</td>
                  <td className="px-4 py-2 border-b">{row.midname}</td>
                  <td className="px-4 py-2 border-b">{row.lastname}</td>
                  <td className="px-4 py-2 border-b">{row.gender}</td>
                  <td className="px-4 py-2 border-b">{row.age}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

}

export default DashboardTeacher;

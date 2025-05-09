const Table = ({ columns, data, onEdit, onDelete }:any) => {
    return (
      <table className="w-full border rounded-lg">
        <thead>
          <tr>{columns.map((col:any) => <th key={col}>{col}</th>)}</tr>
        </thead>
        <tbody>
          {data.map((item:any) => (
            <tr key={item._id}>
              {columns.map((col:any) => <td key={col}>{item[col]}</td>)}
              <td>
                <button onClick={() => onEdit(item)}>Edit</button>
                <button onClick={() => onDelete(item._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };
  
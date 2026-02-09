export default function DataTable({ data }) {
  if (!data || data.length === 0) {
    return (
      <div className="table-empty">
        <p>No data available</p>
      </div>
    );
  }

  const columns = Object.keys(data[0]);

  return (
    <div className="table-wrapper">
      <table className="data-table">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col}>{col.replace(/([A-Z])/g, " $1").toUpperCase()}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.map((row, idx) => (
            <tr key={idx}>
              {columns.map((col) => (
                <td key={col}>{row[col]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
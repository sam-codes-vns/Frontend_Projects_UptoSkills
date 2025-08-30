const Table = ({ columns, data }) => (
  <table className="min-w-full border">
    <thead>
      <tr>
        {columns.map(col => (
          <th key={col} className="border px-2 py-1 bg-gray-100">{col}</th>
        ))}
      </tr>
    </thead>
    <tbody>
      {data.map((row, idx) => (
        <tr key={idx}>
          {columns.map(col => (
            <td key={col} className="border px-2 py-1">{row[col]}</td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
)

export default Table

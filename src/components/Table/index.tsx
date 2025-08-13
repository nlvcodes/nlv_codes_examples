
export const Table = <T extends Record<string, any>>({ columns, rows, title }: {
  columns: Array<{
    key: keyof T,
    label: string;
    formatter?: (value: any) => string;
  }>
  rows: T[];
  title: string;
}) => {
  return <div className="collection-list__tables" style={{marginBottom: '2rem'}}>
    <div className="table-wrap">
      <h3 style={{marginBottom: '1rem'}}>{title}</h3>
      <div className="table">
        <table cellPadding="0" cellSpacing="0">
          <thead>
          <tr>
            {columns.map((column, idx) => (
              <th key={idx}>{column.label}</th>
            ))}
          </tr>
          </thead>
          <tbody>
          {rows.map((row, idx) => (
            <tr key={idx} className={`row-${idx + 1}`}>
              {columns.map((column, colIdx) => (
                <td key={colIdx}>
                  {column.formatter ? column.formatter(row[column.key]) : String(row[column.key])}
                </td>
              ))}
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
}
import React from "react";
import { useTable } from "react-table";
import styles from "./Table.module.css";


const PaymentHistoryTable = ({ elements }) => {
    console.log(`ELement: ${JSON.stringify(elements)}`)
    // const data = elements["data"]
    const formattedData = elements.map(entry => {
        const formattedCreatedAt = new Date(entry["created_at"]).toISOString().replace('T', ' ').slice(0, 23);
        const formattedClosedAt = new Date(entry["closed_at"]).toISOString().replace('T', ' ').slice(0, 23);
        
        return {
            id: entry["foreign_id"],
            amount: entry["amount"],
            requisites: entry["requisite"],
            method: entry["name"],
            clientName: entry["client_initials"],
            status: entry["status"],
            express: entry["express"],
            createdAt: formattedCreatedAt,
            closedAt: formattedClosedAt
        };
    });

  const columns = React.useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id"
      },
      {
        Header: "Сумма",
        accessor: "amount"
      },
      {
        Header: "Реквизиты",
        accessor: "requisites"
      },
      {
        Header: "Метод",
        accessor: "method"
      },
      {
        Header: "ФИО",
        accessor: "clientName"
      },
      {
        Header: "Статус",
        accessor: "status"
      },
      {
        Header: "Время создания",
        accessor: "createdAt"
      },
      {
        Header: "Время закрытия",
        accessor: "closedAt"
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable({ columns, data: formattedData });

  return (
    <table className={styles.table} {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th className={styles.th} {...column.getHeaderProps()}>{column.render("Header")}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
      {rows.length > 0 ? rows.map(row => {
            prepareRow(row);
            return (
                <tr className={styles.tr} {...row.getRowProps()}>
                {row.cells.map(cell => {
                    return <td className={styles.td} {...cell.getCellProps()}>{cell.render("Cell")}</td>;
                })}
                </tr>
            );
            }): (
            <tr>
                <td colSpan={columns.length} className={styles.td}>
                Информации нет
                </td>
            </tr>
            )}
      </tbody>
    </table>
  );
};

export default PaymentHistoryTable;

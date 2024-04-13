import React from "react";
import { useTable } from "react-table";
import styles from "./Table.module.css"



const AdminPaymentsTable = ({ payments }) => {
  const columns = React.useMemo(
    () => [
      {
        Header: "Айди заявки",
        accessor: "foreign_id"
      },
      {
        Header: "ID команды",
        accessor: "team_id"
      },
      {
        Header: "ID юзера",
        accessor: "worker_id"
      },
      {
        Header: "Сумма",
        accessor: "amount"
      },
      {
        Header: "Реквизиты",
        accessor: "requisite"
      },
      {
        Header: "Метод",
        accessor: "name"
      },
      {
        Header: "ФИО",
        accessor: "client_initials"
      },
      {
        Header: "Статус",
        accessor: "status"
      },
      {
        Header: "Время создания",
        accessor: "created_at"
      },
      {
        Header: "Время закрытия",
        accessor: "closed_at"
      }
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable({ columns, data: payments });

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

export default AdminPaymentsTable;

import React from "react";
import { useTable } from "react-table";
import styles from "./Table.module.css"; // Подключаем модульные стили

const SessionTable = ({ sessions, delSession }) => {
  const columns = React.useMemo(
    () => [
      {
        Header: "Пользователь",
        accessor: "user"
      },
      {
        Header: "IP",
        accessor: "ip"
      },
      {
        Header: "Город",
        accessor: "city"
      },
      {
        Header: "Действия",
        Cell: ({ row }) => (
          <button className={styles.button_red} onClick={() => delSession(row.original?.id)}>Завершить</button>
        )
      }
    ],
    [delSession]
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable({ columns, data: sessions });

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

export default SessionTable;

import React from "react";
import { useTable } from "react-table";
import styles from "./Table.module.css"


const AdminTeamTable = ({ teams }) => {
  const columns = React.useMemo(
    () => [
      {
        Header: "ID команды",
        accessor: "team_id"
      },
      {
        Header: "Название",
        accessor: "team_name"
      },
      {
        Header: "Контакт",
        accessor: "admin_contact"
      },
      {
        Header: "Активных реквизитов",
        accessor: "requisites_count"
      },
      {
        Header: "Кол-во работников",
        accessor: "count"
      },
      {
        Header: "Общий баланс",
        accessor: "sum"
      },
      {
        Header: "В бане",
        accessor: "active"
      },
      {
        Header: "Действия",
        accessor: ""
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
  } = useTable({ columns, data: teams });

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

export default AdminTeamTable;

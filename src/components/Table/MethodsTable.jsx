import React from "react";
import { useTable } from "react-table";
import styles from "./Table.module.css";

export const MethodsTable = ({ methodsData, switchActive }) => {
    const columns = React.useMemo(
      () => [
        {
          Header: "Банк",
          accessor: "name"
        },
        {
          Header: "Статус",
          accessor: "active",
          Cell: ({ value }) => value ? 'Включен' : 'Выключен'
        },
        {
          Header: "Действия",
          Cell: ({ row }) => (
            <button className={styles.button_green} onClick={() => switchActive(row.original)}>
              {row.original.active ? 'Выключить' : 'Включить'}
            </button>
          )
        }
      ],
      [switchActive]
    );
  
    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      rows,
      prepareRow
    } = useTable({ columns, data: methodsData });
  
    return (
      <table {...getTableProps()} className={styles.table}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => (
                  <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  };
  
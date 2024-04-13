import React from "react";
import { useTable } from "react-table";
import styles from "./Table.module.css";


export const AdminWithDrawsTable = ({ data, actionClick }) => {
    const columns = React.useMemo(
      () => [
        {
          Header: "ID заявки",
          accessor: "id"
        },
        {
            Header: "ID Команды",
            accessor: "team_id"
        },
        {
            Header: "Имя",
            accessor: "name"
        },
        {
            Header: "Сумма",
            accessor: "amount"
        },
        {
          Header: "Действия",
          Cell: ({ row }) => (
            <>
            <button className={styles.button_green} onClick={() => actionClick({userId: row.original.id, action: "ok"})}>
              Подтвердить
            </button>
            <button className={styles.button_red} onClick={() => actionClick({userId: row.original.id, action: "cancel"})}>
              Отменить
            </button>
            </>
            
          )
        }
      ],
      [actionClick]
    );
  
    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      rows,
      prepareRow
    } = useTable({ columns, data: data });
  
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
  
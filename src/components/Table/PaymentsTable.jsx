import React from "react";
import { useTable } from "react-table";
import styles from "./Table.module.css";
import CopyToClipboard from "react-copy-to-clipboard";
import { toast } from "react-toastify";


const PaymentTable = ({elements, updateStat}) => {
    console.log(`ELement: ${JSON.stringify(elements)}`)
    const formattedData = elements.map(entry => {
        const formattedCreatedAt = new Date(entry["created_at"]).toISOString().replace('T', ' ').slice(0, 23);
        
        return {
            id: entry["foreign_id"],
            amount: entry["amount"],
            requisites: entry["requisite"],
            method: entry["name"],
            clientName: entry["client_initials"],
            status: entry["status"],
            express: entry["express"],
            createdAt: formattedCreatedAt
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
        accessor: "requisites",
        Cell: ({ row }) => (
          <CopyToClipboard text={row?.original?.requisites}>
            <span style={{ cursor: "pointer"}} onClick={()=> toast.info(`Реквизиты для ${row?.original?.clientName} скопированы!`)}>{row?.original?.requisites}</span>
          </CopyToClipboard>
        )
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
        Header: "Действия",
        Cell: ({ row }) => (
            <div>
                <button className={styles.button_green} onClick={() => updateStat({ newStatus: "paid", key: row.original.id, clientName: row.original.clientName })}>Подтвердить</button>
                <button className={styles.button_red} onClick={() => updateStat({ newStatus: "canceled", key: row.original.id, clientName: row.original.clientName })}>Отменить</button>
            </div>
        )
      }
    ],
    [updateStat]
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

export default PaymentTable;

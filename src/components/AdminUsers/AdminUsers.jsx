import React, { useCallback } from "react";
import AddTeamForm from "./Forms/AddTeam";
import AddUserForm from "./Forms/AddUser";
import AddApiForm from "./Forms/AddApiKey";
import styles from "./AdminUsers.module.css"
import { teamsapi } from "../../api/teamsApi";
import Table from "../Table/MainTable";
import { toast } from "react-toastify";



const AdminUsers = () =>{

    const { data: teamsData } = teamsapi.useTeamsQuery()

    const [banTeamTrigger, { status: banQueryStatus }] = teamsapi.useBanTeamMutation()

    const actionHandler = useCallback(({ action, teamId })=> {
        if(action === "ban") {
            banTeamTrigger({id: teamId, banned: true})
        } else 
        if(action === "unban") {
            banTeamTrigger({id: teamId, banned: false})
        } else if (action === "delete") {
            toast.info(`Need delete function`)
        }
    }, [banTeamTrigger])

    if(banQueryStatus) {
        console.log(banQueryStatus)
    }

    const columns = React.useMemo(
        () => [
          {
            Header: "ID КОМАНДЫ",
            accessor: "team_id"
          },
          {
            Header: "НАЗВАНИЕ",
            accessor: "team_name"
          },
          {
            Header: "КОНТАКТ",
            accessor: "admin_contact"
          },
          {
            Header: "АКТИВНЫХ РЕКВИЗИТОВ",
            accessor: "requisites_count"
          },
          {
            Header: "КОЛ-ВО РАБОТНИКОВ",
            accessor: "count"
          },
          {
            Header: "БАЛАНС",
            accessor: "sum"
          },
          {
            Header: "В БАНЕ",
            accessor: "active",
            Cell: ({ row }) => (
                <>{row.original.active === false ? "Да" : "Нет"}</>
            )
          },
          {
            Header: "ДЕЙСТВИЯ",
            accessor: "action",
            Cell: ({ row }) => (
                <>
                    <div>
                    {
                        row.original.active === false ? 
                        <button className='button green' style={{ marginBottom: "5px"}} onClick={() => actionHandler({ action: "unban", teamId: row.original.team_id})}>Разбанить</button>
                        : 
                        <button className='button red' style={{ marginBottom: "5px"}} onClick={() => actionHandler({ action: "ban", teamId: row.original.team_id})}>Забанить</button>
                    }
                    </div>
                    <button className='button red' onClick={() => actionHandler({ action: "delete", teamId: row.original.team_id})}>Удалить</button>
                </>
            )
          }
        ],
        [actionHandler]
      );

    return (
        <div className={styles.dashboard}>
            <h2>Команды и пользователи</h2>
            <div className={styles.table_container}>
                <Table data={teamsData ? teamsData["result"] : []} columns={columns}/>
            </div>
            <div className={styles.forms_block}>
                <AddTeamForm />
                <AddUserForm />
                <AddApiForm />
            </div>
        </div>
    )
}

export default AdminUsers;
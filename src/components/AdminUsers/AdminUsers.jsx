import AddTeamForm from "./Forms/AddTeam";
import AddUserForm from "./Forms/AddUser";
import AddApiForm from "./Forms/AddApiKey";
import styles from "./AdminUsers.module.css"
import { teamsapi } from "../../api/teamsApi";
import AdminTeamTable from "../Table/AdminTeamTable";



const AdminUsers = () =>{

    const { data: teamsData } = teamsapi.useTeamsQuery()
    console.log(`Teams: ${JSON.stringify(teamsData)}`)
    return (
        <div className={styles.dashboard}>
            <h2>Команды и пользователи</h2>
            <div className={styles.table_container}>
                <AdminTeamTable teams={teamsData ? teamsData["result"] : []}/>
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
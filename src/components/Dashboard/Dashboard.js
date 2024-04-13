import React, { useEffect, useState } from "react";
import styles from './Dashboard.module.css'
import { userapi } from "../../api/userApi";
import { useNavigate } from "react-router-dom";
import SessionTable from "../Table/SessionTable";
import WithdrawBlock from "./WithdrawBlock/WithdrawBlock";
import useAuthRedirect from "../../hooks/keyCheckHook";
import { Table } from "../Table/Table";
import { toast } from "react-toastify";


const columns = [
    { id: "name", Header: "Имя", accessor: "name" },
    { id: "balance", Header: "Баланс", accessor: "balance" },
    { id: "status", Header: "Статус", accessor: "status" }
  ];



const Dashboard = () => {
    useAuthRedirect()
    const navigate = useNavigate()
    const [workerD, setWorkerD] = useState(null)
    
    const { data: workersData, error: workersError, isError: workersIsError, refetch: workersRefetch } = userapi.useWorkersQuery()

    const [deleteSession, {error, isError}] = userapi.useDeleteSessionMutation()

    useEffect(()=> {
        setWorkerD(workersData)
    }, [workersData ])

    // console.log(workersData)
    if (isError || workersIsError) {
        if (error) {
            if (error.status === 401) {
                console.log(error.message)
                navigate('/auth')
            } else {
                console.log(error.message)
            }
        }
        if(workersError) {
            if (workersError.status === 401) {
                console.log(workersError.message)
                navigate('/auth')
            } else {
                console.log(workersError.message)
            }
        }
        
    }

    function delSession(user_id) {
        const body = {'user_id': user_id}
        deleteSession(body)
        workersRefetch()
        toast.success("Сессия удалена!")
        window.location.reload()
    }


    if (workersData) {
        if (workersData['status'] === 'user'){
            return (
                <div className={styles.user_dashboard}>
                    <h2>Дашборд</h2>
                    <div className={styles.user_row}>
                        <p>Имя: {workersData['user']['name']}</p>
                        <p>Баланс: {workersData['user']['balance']}</p>
                        <p>Статус: {workersData['user']['status']}</p>
                        <WithdrawBlock />
                    </div>
                </div>
            );
        } else {
            return (
                <div className={styles.all_dashboard}>
                    <h2>Дашборд</h2>
                    <div className={styles.your_data}>
                        <p className={styles.big_p}>Ваши данные:</p>
                        <p className={styles.little_p}>Имя: {workersData['user']['name']} Баланс: {workersData['user']['balance']} Статус: {workersData['user']['status']}</p>
                    </div>
                    <div className={styles.dashboard}>
                        <div className={styles.user_dashboard}>
                            <div className={styles.users_row}>
                                <p className={styles.big_p}>Данные о команде:</p>
                                <Table columns={columns} data={workersData['users']}/>
                                <WithdrawBlock />
                            </div>
                        </div>
                        <div className={styles.user_dashboard}>
                            <p className={styles.session_p}>Данные о сессиях:</p>
                            <SessionTable sessions={workerD ? workerD.sessions.map(session => session.WorkersSessions): []} delSession={delSession} />
                        </div>
                    </div>
                </div>
            )
        }
    }
};


export default Dashboard;
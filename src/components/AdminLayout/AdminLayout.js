import React from 'react';
import {Outlet} from 'react-router-dom';
import styles from '../Layout/Layout.module.css'
import AdminSidePanel from "../AdminSidePanel/AdminSidePanel";

const AdminLayout = () => {
    return (
        <div className={styles.layout}>
            <AdminSidePanel />
            <div className={styles.outlet}>
                <Outlet />
            </div>
        </div>
    );
};

export default AdminLayout;
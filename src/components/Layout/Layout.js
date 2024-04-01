import React from 'react';
import {Outlet} from 'react-router-dom';
import SidePanel from "../SidePanel/SidePanel";
import styles from './Layout.module.css'
import Header from "../Header/Header";

const Layout = () => {
    return (
        <div className={styles.layout}>
            <SidePanel />
            <div className={styles.outlet}>
                <Header />
                <Outlet />
            </div>
        </div>
    );
};

export default Layout;
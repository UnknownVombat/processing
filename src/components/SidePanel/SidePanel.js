import React from 'react';
import styles from './SidePanel.module.css'
import PanelHeader from "./PanelHeader/PanelHeader";
import MainIcons from "./MainIcons/MainIcons";
import SupportIcons from "./SupportIcons/SupportIcons";

const SidePanel = () => {
    return (
        <div className={styles.side_panel}>
            <PanelHeader />
            <MainIcons />
            <SupportIcons />
        </div>
    );
};

export default SidePanel;
import React from 'react';
import {Helmet} from "react-helmet";
import styles from "./SesssionRefresh.module.css";

const SessionRefresh = () => {
    return (
        <div className={styles.main}>
            <Helmet>
                <title> Session Refresh</title>
            </Helmet>
            <div className={styles.loader}></div>
        </div>
    );
}

export default SessionRefresh;

import React from 'react';

/** Styles */
import styles from "./Loader.module.css";

const Loader = () => {
    return (
        <div id='loader' className={styles.loaderMain}>
            <div className='mediumLoader'></div>
        </div>
    );
}

export default Loader;

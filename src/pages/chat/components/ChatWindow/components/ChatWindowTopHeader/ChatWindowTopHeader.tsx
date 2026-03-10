import React from 'react';

/** Types */
import type { ChatWindowTopHeaderPropsInterface } from './ChatWindowTopHeader.types';

/** Styles */
import styles from "./ChatWindowTopHeader.module.css";
import { Link } from 'react-router-dom';
import { AlignLeft, Info, InfoIcon, X, XCircle, XCircleIcon } from 'lucide-react';

const ChatWindowTopHeader:React.FC<ChatWindowTopHeaderPropsInterface> = ({onBack}) => {
    return (
        <header id='header' className={styles.header}>
            
            <div id="topHeader" className={styles.topHeader}>
                
                <div>
                    <button onClick={onBack} className={styles.backBtn}>
                        <svg fill="none" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><path fill="currentColor" d="M13.015 4.23a.727.727 0 0 1-.033 1.028l-6.416 6.015h12.707a.727.727 0 1 1 0 1.454H6.566l6.416 6.015a.727.727 0 1 1-.995 1.061L4.23 12.531a.727.727 0 0 1 0-1.062l7.757-7.272a.727.727 0 0 1 1.028.033"></path></svg>
                    </button>
                </div>

                <div>
                    <button className={styles.infoBtn}>
                        <svg fill="none" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><path fill="currentColor" d="M13 7a1 1 0 1 1-2 0 1 1 0 0 1 2 0m-1 3a.75.75 0 0 0-.75.75v5.5a.75.75 0 0 0 1.5 0v-5.5A.75.75 0 0 0 12 10"></path><path fill="currentColor" d="M12 23c6.075 0 11-4.925 11-11S18.075 1 12 1 1 5.925 1 12s4.925 11 11 11m0-1.5a9.5 9.5 0 1 1 0-19 9.5 9.5 0 0 1 0 19"></path></svg>
                    </button>
                </div>

            </div>

            <div id="second-section" className={styles.secondSection}>
                <div id="left-section" className={styles.leftSection}>
                    {/* avatar */}
                    <div>
                        <img className={styles.avatar} src="https://media-sin6-1.cdn.whatsapp.net/v/t61.24694-24/491872103_1019666860368295_3477692785140997537_n.jpg?stp=dst-jpg_s96x96_tt6&ccb=11-4&oh=01_Q5Aa4AHNh4S8kv2qiUe2DMP9hV9lUQ9uLOW43734M_sjN_o-lw&oe=69B973FE&_nc_sid=5e03e0&_nc_cat=111" loading='lazy' />
                    </div>

                    <div className={styles.memberInfo}>
                        {/* name */}
                        <span className={styles.memberName}>Karamat Guru</span>

                        {/* about */}
                        <span className={styles.memberAbout}>Mistake Reminder you are working.</span>

                        {/* is Online status */}
                        <span className={styles.isOnline}>Active now</span>
                    </div>
                </div>
                
                <div id="right-section" className={styles.rightSection}>
                    <span>
                        <Link to="/" className={styles.makeAPaymentBtn}>Make a payment</Link>
                    </span>
                    <span>
                        <Link to="/" className={styles.cancelBtn}>
                            <span><XCircleIcon /></span>
                            Cancel offer
                        </Link>
                    </span>
                </div>
            </div>

        </header>
    );
}

export default ChatWindowTopHeader;

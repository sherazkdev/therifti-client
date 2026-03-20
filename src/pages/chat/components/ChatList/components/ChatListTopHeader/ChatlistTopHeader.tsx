import React from 'react';

/** Styles */
import styles from "./ChatListTopHeader.module.css";

/** Types  */
import type { ChatListTopHeaderPropsInterface } from './ChatListTopHeader.types';
import { Search } from 'lucide-react';

/** Wrapped Icons */
import { FilterIcon } from '../../../../../../assets/icons/svgs/svg';

const ChatlistTopHeader:React.FC<ChatListTopHeaderPropsInterface> = ({handleSearchChat}) => {

    return (
        <header className={styles.header}>
            <div id="top-header" className={styles.topHeader}>
                <span className={styles.heading}>Inbox</span>

                <span>
                    <FilterIcon />
                </span>
            </div>
            {/* Search Section */}
            <div id="search-section" className={styles.searchSection}>
                <div className={styles.searchInput}>
                    <input onChange={ (e) => handleSearchChat(e.target.value)} type="text" placeholder='Search or start a new chat' />
                    <button className={styles.searchIcon}><Search color='#aeaeae' width="20px"/></button>
                </div>
            </div>
        </header>
    );
}

export default ChatlistTopHeader;

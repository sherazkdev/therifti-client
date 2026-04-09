import React from 'react';

/** Types */
import type { CoverzationDetailsPropsInterface } from './CoverzationDetails.types';

/** Styls */
import styles from "./CoverzationDetails.module.css";
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import useEmptyState from "../../../../../../assets/icons/user-empty-state.svg";
import { CloseIcon, DeleteIcon, UndoIcon } from '../../../../../../assets/icons/svgs/svg';

const CoverzationDetails:React.FC<CoverzationDetailsPropsInterface> = ({handleToggleWindowSection, selectedChat}) => {
    return (
        <div id="coveration-main" className={styles.coverzationDetails}>
            
            <div id="topHeader" className={styles.topHeader}>
                
                <div>
                </div>
                
                <div>
                    <span>Details</span>
                </div>

                <div>
                    <button onClick={ () => handleToggleWindowSection('COVERZATION_MESSAGES')} className={styles.infoBtn}>
                        <CloseIcon />
                    </button>
                </div>

            </div>

            <ul>
                {/* Product Ref */}
                <li id='product-ref' className={styles.productRefLi}>
                    <Link to={"/"} className={styles.productRef}>
                        <div className={styles.productRefImage}>
                            <img src={selectedChat?.product.coverImage} loading='lazy' />
                            <span>{selectedChat?.product.title}</span>
                        </div>
                        
                        <div className={styles.angleRightSection}>
                            <button>
                                <ChevronDown color='#5a6566'/>
                            </button>
                        </div>
                    </Link>
                </li>
                
                {/* Seller Profile */}
                <li className={styles.profileLi}>
                    <Link to={"/profile"} className={styles.profile}>
                        <span className={styles.profileImg}>
                            <img src={selectedChat?.member.avatar || useEmptyState} onError={ (e) => e.currentTarget.src = useEmptyState} loading='lazy' alt="" />
                        </span>
                        <span>{selectedChat?.member.fullname}</span>
                    </Link>
                </li>
                
                {/* Delete Converzation */}
                <li className={styles.deleteConverzation}>
                    <span>
                        <DeleteIcon />
                    </span>
                    <span>Delete conversation</span>
                </li>

                {/* Block */}
                <li className={styles.blockSeller}>
                    <span>
                        <UndoIcon />
                    </span>
                    <span>Block</span>
                </li>
            </ul>
        </div>
    );
}

export default CoverzationDetails;

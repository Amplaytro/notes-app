import styles from './GroupItem.module.css';
import { getInitials } from '../../utils/helpers';

const GroupItem = ({ group, isSelected, onClick }) => {
    return (
        <div
            className={`${styles.groupItem} ${isSelected ? styles.groupItemSelected : ''}`}
            onClick={onClick}
        >
            <div
                className={styles.avatar}
                style={{ backgroundColor: group.color }}
            >
                <span className={styles.initials}>{getInitials(group.name)}</span>
            </div>
            <span className={styles.groupName}>{group.name}</span>
        </div>
    );
};

export default GroupItem;

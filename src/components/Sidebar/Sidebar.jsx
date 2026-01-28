import styles from './Sidebar.module.css';
import GroupItem from '../GroupItem/GroupItem';

const Sidebar = ({ groups, selectedGroup, onSelectGroup, onCreateGroup }) => {
    return (
        <aside className={styles.sidebar}>
            <header className={styles.header}>
                <h1 className={styles.title}>Pocket Notes</h1>
            </header>

            <div className={styles.groupList}>
                {groups.map((group) => (
                    <GroupItem
                        key={group.id}
                        group={group}
                        isSelected={selectedGroup?.id === group.id}
                        onClick={() => onSelectGroup(group)}
                    />
                ))}
            </div>

            <button className={styles.createButton} onClick={onCreateGroup} aria-label="Create new group">
                <svg className={styles.plusIcon} viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
                </svg>
            </button>
        </aside>
    );
};

export default Sidebar;

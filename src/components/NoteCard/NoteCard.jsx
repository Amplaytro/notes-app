import styles from './NoteCard.module.css';
import { formatDate, formatTime } from '../../utils/helpers';

const NoteCard = ({ note }) => {
    return (
        <div className={styles.noteCard}>
            <p className={styles.noteContent}>{note.content}</p>
            <div className={styles.noteMetadata}>
                <span className={styles.noteDate}>{formatDate(note.createdAt)}</span>
                <span className={styles.noteDot}>•</span>
                <span className={styles.noteTime}>{formatTime(note.createdAt)}</span>
            </div>
        </div>
    );
};

export default NoteCard;

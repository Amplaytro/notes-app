import { useEffect, useRef } from 'react';
import styles from './NotesArea.module.css';
import NoteCard from '../NoteCard/NoteCard';
import TextInput from '../TextInput/TextInput';
import { getInitials } from '../../utils/helpers';

const NotesArea = ({ group, notes, onAddNote, onBack }) => {
    const notesContainerRef = useRef(null);

    useEffect(() => {
        if (notesContainerRef.current) {
            notesContainerRef.current.scrollTop = notesContainerRef.current.scrollHeight;
        }
    }, [notes]);

    const groupNotes = notes.filter((note) => note.groupId === group.id);

    return (
        <div className={styles.notesArea}>
            <header className={styles.header}>
                <button className={styles.backButton} onClick={onBack} aria-label="Go back">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
                    </svg>
                </button>
                <div className={styles.avatar} style={{ backgroundColor: group.color }}>
                    <span className={styles.initials}>{getInitials(group.name)}</span>
                </div>
                <h2 className={styles.groupName}>{group.name}</h2>
            </header>

            <div className={styles.notesContainer} ref={notesContainerRef}>
                {groupNotes.length === 0 ? (
                    <div className={styles.emptyState}>
                        <span className={styles.emptyIcon}>{'\uD83D\uDCDD'}</span>
                        <p className={styles.emptyText}>No notes yet. Start typing below!</p>
                    </div>
                ) : (
                    <div className={styles.notesList}>
                        {groupNotes.map((note) => (
                            <NoteCard key={note.id} note={note} />
                        ))}
                    </div>
                )}
            </div>

            <TextInput onSubmit={(content) => onAddNote(group.id, content)} />
        </div>
    );
};

export default NotesArea;

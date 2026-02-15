import { useState } from 'react';
import styles from './App.module.css';
import Sidebar from './components/Sidebar/Sidebar';
import NotesArea from './components/NotesArea/NotesArea';
import CreateGroupModal from './components/CreateGroupModal/CreateGroupModal';
import { useLocalStorage } from './hooks/useLocalStorage';
import { STORAGE_KEYS } from './utils/constants';
import { generateId } from './utils/helpers';
import notesIllustration from './assets/notes-illustration.png';

function App() {
  const [groups, setGroups] = useLocalStorage(STORAGE_KEYS.GROUPS, []);
  const [notes, setNotes] = useLocalStorage(STORAGE_KEYS.NOTES, []);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreateGroup = ({ name, color }) => {
    const newGroup = {
      id: generateId(),
      name,
      color,
      createdAt: new Date().toISOString(),
    };
    setGroups([...groups, newGroup]);
    setSelectedGroup(newGroup);
  };

  const handleAddNote = (groupId, content) => {
    const now = new Date().toISOString();
    const newNote = {
      id: generateId(),
      groupId,
      content,
      createdAt: now,
      updatedAt: now,
    };
    setNotes([...notes, newNote]);
  };

  const handleSelectGroup = (group) => {
    setSelectedGroup(group);
  };

  const handleBack = () => {
    setSelectedGroup(null);
  };

  const containerClassName = `${styles.container} ${
    selectedGroup ? styles.mobileShowNotes : styles.mobileShowSidebar
  }`;

  return (
    <div className={containerClassName}>
      <div className={styles.sidebar}>
        <Sidebar
          groups={groups}
          selectedGroup={selectedGroup}
          onSelectGroup={handleSelectGroup}
          onCreateGroup={() => setIsModalOpen(true)}
        />
      </div>

      <main className={styles.mainContent}>
        {selectedGroup ? (
          <NotesArea
            group={selectedGroup}
            notes={notes}
            onAddNote={handleAddNote}
            onBack={handleBack}
          />
        ) : (
          <div className={styles.welcomeScreen}>
            <img
              src={notesIllustration}
              alt="Notes illustration"
              className={styles.welcomeImage}
            />
            <h2 className={styles.welcomeTitle}>Pocket Notes</h2>
            <p className={styles.welcomeText}>
              Send and receive messages without keeping your phone online.
              Use Pocket Notes on up to 4 linked devices and 1 mobile phone.
            </p>
            <div className={styles.encryptionNote}>
              <svg className={styles.lockIcon} viewBox="0 0 24 24" fill="currentColor">
                <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
              </svg>
              <span>end-to-end encrypted</span>
            </div>
          </div>
        )}
      </main>

      <CreateGroupModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreateGroup={handleCreateGroup}
        existingGroups={groups}
      />
    </div>
  );
}

export default App;

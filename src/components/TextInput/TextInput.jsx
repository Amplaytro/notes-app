import { useState } from 'react';
import styles from './TextInput.module.css';

const TextInput = ({ onSubmit }) => {
    const [content, setContent] = useState('');

    const hasContent = content.trim().length > 0;

    const handleSubmit = () => {
        if (!hasContent) return;

        onSubmit(content.trim());
        setContent('');
    };

    const handleKeyDown = (e) => {
        // Submit on Enter (without Shift)
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
        }
    };

    return (
        <div className={styles.inputContainer}>
            <div className={styles.textareaWrapper}>
                <textarea
                    className={styles.textarea}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Enter your text here..."
                    rows={1}
                />
                <button
                    className={`${styles.sendButton} ${hasContent ? styles.sendButtonActive : styles.sendButtonInactive}`}
                    onClick={handleSubmit}
                    disabled={!hasContent}
                    aria-label="Send note"
                >
                    <svg
                        className={styles.sendIcon}
                        viewBox="0 0 24 24"
                        fill="currentColor"
                    >
                        <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default TextInput;

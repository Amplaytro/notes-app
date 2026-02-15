import { useState, useRef, useEffect, useCallback } from 'react';
import styles from './CreateGroupModal.module.css';
import { GROUP_COLORS, VALIDATION } from '../../utils/constants';
import { isDuplicateGroup } from '../../utils/helpers';

const CreateGroupModal = ({ isOpen, onClose, onCreateGroup, existingGroups }) => {
    const [groupName, setGroupName] = useState('');
    const [selectedColor, setSelectedColor] = useState(GROUP_COLORS[0]);
    const [error, setError] = useState('');

    const modalRef = useRef(null);
    const inputRef = useRef(null);

    const handleClose = useCallback(() => {
        setGroupName('');
        setSelectedColor(GROUP_COLORS[0]);
        setError('');
        onClose();
    }, [onClose]);

    // Focus input when modal opens
    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    // Handle click outside modal
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                handleClose();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, handleClose]);

    const validateForm = () => {
        const trimmedName = groupName.trim();

        if (trimmedName.length < VALIDATION.MIN_GROUP_NAME_LENGTH) {
            setError(`Group name must be at least ${VALIDATION.MIN_GROUP_NAME_LENGTH} characters`);
            return false;
        }

        if (isDuplicateGroup(existingGroups, trimmedName)) {
            setError('A group with this name already exists');
            return false;
        }

        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        onCreateGroup({
            name: groupName.trim(),
            color: selectedColor,
        });

        handleClose();
    };

    if (!isOpen) return null;

    return (
        <div className={styles.overlay}>
            <div className={styles.modal} ref={modalRef}>
                <h2 className={styles.title}>Create New group</h2>

                <form onSubmit={handleSubmit}>
                    <div className={styles.row}>
                        <label className={styles.rowLabel} htmlFor="groupName">
                            Group Name
                        </label>
                        <div className={styles.rowField}>
                            <input
                                ref={inputRef}
                                id="groupName"
                                type="text"
                                className={`${styles.input} ${error ? styles.inputError : ''}`}
                                value={groupName}
                                onChange={(e) => {
                                    setGroupName(e.target.value);
                                    setError('');
                                }}
                                placeholder="Enter group name"
                            />
                        </div>
                    </div>
                    {error && <p className={styles.errorText}>{error}</p>}

                    <div className={styles.row}>
                        <span className={styles.rowLabel}>Choose colour</span>
                        <div className={styles.colorPicker}>
                            {GROUP_COLORS.map((color) => (
                                <button
                                    key={color}
                                    type="button"
                                    className={`${styles.colorOption} ${selectedColor === color ? styles.colorOptionSelected : ''}`}
                                    style={{ backgroundColor: color }}
                                    onClick={() => setSelectedColor(color)}
                                    aria-label={`Select color ${color}`}
                                />
                            ))}
                        </div>
                    </div>

                    <div className={styles.actions}>
                        <button
                            type="submit"
                            className={styles.createButtonModal}
                            disabled={groupName.trim().length < VALIDATION.MIN_GROUP_NAME_LENGTH}
                        >
                            Create
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateGroupModal;

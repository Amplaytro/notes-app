/**
 * Generate a unique ID
 * @returns {string} UUID
 */
export const generateId = () => {
    return crypto.randomUUID();
};

/**
 * Get initials from a group name (only alphabetic characters)
 * @param {string} name - Group name
 * @returns {string} Initials (first alphabet of words that contain letters)
 */
export const getInitials = (name) => {
    if (!name || name.length < 1) return '';

    // Get first alphabetic character from a string
    const getFirstAlpha = (str) => {
        const match = str.match(/[a-zA-Z]/);
        return match ? match[0] : '';
    };

    const words = name.trim().split(/\s+/);

    // Filter to only words that contain at least one alphabet
    const wordsWithAlpha = words
        .map(word => getFirstAlpha(word))
        .filter(alpha => alpha !== '');

    if (wordsWithAlpha.length >= 2) {
        // First alphabet of first two words that have letters
        return (wordsWithAlpha[0] + wordsWithAlpha[1]).toUpperCase();
    } else if (wordsWithAlpha.length === 1) {
        // Only one word has letters
        return wordsWithAlpha[0].toUpperCase();
    } else {
        // No alphabets found
        return '';
    }
};

/**
 * Format date for display
 * @param {string} timestamp - ISO timestamp
 * @returns {string} Formatted date (e.g., "26 Jan 2026")
 */
export const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const day = date.getDate();
    const month = date.toLocaleString('en-US', { month: 'short' });
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
};

/**
 * Format time for display
 * @param {string} timestamp - ISO timestamp
 * @returns {string} Formatted time (e.g., "11:09 PM")
 */
export const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
    });
};

/**
 * Check if a group name already exists (case-insensitive)
 * @param {Array} groups - Array of group objects
 * @param {string} name - Name to check
 * @returns {boolean} True if duplicate exists
 */
export const isDuplicateGroup = (groups, name) => {
    const normalizedName = name.trim().toLowerCase();
    return groups.some(group => group.name.toLowerCase() === normalizedName);
};

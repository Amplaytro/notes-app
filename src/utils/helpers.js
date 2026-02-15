export const generateId = () => crypto.randomUUID();

export const getInitials = (name) => {
    if (!name) return '';
    const words = name.trim().split(/\s+/);
    const letters = words
        .map(w => w.match(/[a-zA-Z]/)?.[0] || '')
        .filter(Boolean);
    return letters.slice(0, 2).join('').toUpperCase();
};

export const formatDate = (timestamp) => {
    const d = new Date(timestamp);
    return `${d.getDate()} ${d.toLocaleString('en-US', { month: 'short' })} ${d.getFullYear()}`;
};

export const formatTime = (timestamp) =>
    new Date(timestamp).toLocaleString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
    });

export const isDuplicateGroup = (groups, name) =>
    groups.some(g => g.name.toLowerCase() === name.trim().toLowerCase());

export const hasEmptyStringOnly = (obj) => {
    return Object.values(obj).every(value => value === '');
}

export const formatTo12HoursTime = (dateString) => {
    if (dateString) {
        const date = new Date(dateString);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
    }
    return '';
}

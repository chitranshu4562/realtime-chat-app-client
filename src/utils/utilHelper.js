export const hasEmptyStringOnly = (obj) => {
    return Object.values(obj).every(value => value === '');
}

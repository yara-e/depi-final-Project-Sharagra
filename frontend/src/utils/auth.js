export const isLoggedIn = () => {
    const userId = localStorage.getItem('userId');
    return userId !== null;
};
export const isAdmin = () => {
    const adminId = localStorage.getItem('adminId');
    return adminId !== null;
};
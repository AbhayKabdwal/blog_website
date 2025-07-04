document.addEventListener('DOMContentLoaded', () => {
    const isAdmin = sessionStorage.getItem('isAdmin');
    if (!isAdmin) {
        window.location.href = 'login.html';
    }
});

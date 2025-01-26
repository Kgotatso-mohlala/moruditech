document.addEventListener('DOMContentLoaded', function () {

    const hamburgerToggle = document.getElementById('hamburger-toggle');
    const sidebar = document.getElementById('sidebar');
    const sidebarClose = document.getElementById('sidebar-close');

    hamburgerToggle.addEventListener('click', function() {
        sidebar.classList.toggle('open');
    });

    sidebarClose.addEventListener('click', function() {
        sidebar.classList.remove('open');
    });
    document.addEventListener('click', function (e) {
        if (!sidebar.contains(e.target) && !hamburgerToggle.contains(e.target)) {
            sidebar.classList.remove('open');
        }
    });

    
    const navLinks = document.querySelectorAll('a[href^="#"], .sidebar-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            window.scrollTo({
                top: targetElement.offsetTop - 50, // Adjust for navbar height
                behavior: 'smooth'
            });
            // Close sidebar on mobile after navigation
            if (window.innerWidth <= 768) {
                sidebar.classList.remove('open');
            }
        });
    });
});

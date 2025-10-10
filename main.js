
// set year
document.getElementById('year').textContent = new Date().getFullYear();

// Mobile nav toggle
function toggleMobileNav() {
    const nav = document.getElementById('mobileNav');
    const shown = nav.style.display === 'block';
    nav.style.display = shown ? 'none' : 'block';
    nav.setAttribute('aria-hidden', shown ? 'true' : 'false');
}

// Smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        const targetId = a.getAttribute('href').slice(1);
        if (!targetId) return;
        const el = document.getElementById(targetId);
        if (el) {
            e.preventDefault();
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Reveal on scroll (IntersectionObserver)
const revealEls = document.querySelectorAll('.reveal, .fade-left, .fade-right, .fade-up');
const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('show');
    });
}, { threshold: 0.12 });
revealEls.forEach(el => io.observe(el));

// Project modal data
const projects = {
    1: {
        title: 'Food Recipe Website',
        body: `<p>A colorful and responsive recipe website built using HTML, CSS, and JavaScript. Features: search, mobile-first layout, recipe cards, and subtle animations.</p>
               <ul style="margin-top:8px;color:var(--muted);margin-left:18px">
                 <li>Responsive design</li>
                 <li>Search & filter recipes</li>
                 <li>Mobile-friendly</li>
               </ul>`,
        demo: '#',
        git: '#'
    },
    2: {
        title: 'Travel Landing Page',
        body: `<p>Image-rich landing page with hero slider, card layout for destinations, and clear CTAs. Built using Bootstrap utilities and Tailwind-like utility classes.</p>`,
        demo: '#',
        git: '#'
    },
    3: {
        title: 'To-Do List App',
        body: `<p>Task manager app built in JavaScript using LocalStorage. Add/edit/delete tasks and mark tasks as complete.</p>`,
        demo: '#',
        git: '#'
    }
};

function openModal(id) {
    const m = document.getElementById('modal');
    const data = projects[id];
    if (!data) return;
    document.getElementById('modalTitle').textContent = data.title;
    document.getElementById('modalBody').innerHTML = data.body;
    document.getElementById('modalDemo').href = data.demo;
    document.getElementById('modalGit').href = data.git;
    m.classList.add('active');
    m.setAttribute('aria-hidden', 'false');
}
function closeModal() {
    const m = document.getElementById('modal');
    m.classList.remove('active');
    m.setAttribute('aria-hidden', 'true');
}
// close modal on background click
document.getElementById('modal').addEventListener('click', (e) => {
    if (e.target.id === 'modal') closeModal();
});

// Contact form handler (demo only)
function handleContact(e) {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    const status = document.getElementById('formStatus');

    if (!name || !email || !message) {
        status.textContent = 'Please fill all fields.';
        return;
    }

    const subject = encodeURIComponent(`Portfolio message from ${name}`);
    const body = encodeURIComponent(message + "\n\n--\n" + name + " | " + email);
    const mailto = `mailto:hamzashahid@example.com?subject=${subject}&body=${body}`;

    status.textContent = 'Opening email client...';
    window.location.href = mailto;

    setTimeout(() => {
        status.textContent = 'If your email client did not open, copy your message and email: hamzashahid@example.com';
    }, 1500);
}

// close modals with Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
});



// Mode Toggle System
const body = document.body;
const toggleBtn = document.getElementById('modeToggle');

// Load saved mode
if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark');
    toggleBtn.textContent = '🌞';
}

toggleBtn.addEventListener('click', () => {
    body.classList.toggle('dark');
    const isDark = body.classList.contains('dark');
    toggleBtn.textContent = isDark ? '🌞' : '🌙';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

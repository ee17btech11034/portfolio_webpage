const journeyData = [
    { type: 'exp', title: 'Software Engineer', date: '2026', org: 'Tech Corp', desc: 'Developing high-performance microservices.' },
    { type: 'proj', title: 'AI Portfolio', date: '2025', org: 'Personal', desc: 'A dynamic timeline with comet animations.' },
    { type: 'exp', title: 'Full Stack Intern', date: '2024', org: 'Startup Inc', desc: 'Optimized frontend rendering by 30%.' },
    { type: 'proj', title: 'Data Visualizer', date: '2023', org: 'Open Source', desc: 'Interactive charts using D3.js.' }
];

const container = document.querySelector('.timeline-container');
const rope = document.querySelector('.timeline-rope');

// 1. Create the Comet element dynamically
const comet = document.createElement('div');
comet.className = 'comet';
container.appendChild(comet);

// Helper function to get the exact Y position relative to the container
function getRelativeY(element, parent) {
    const rect = element.getBoundingClientRect();
    const parentRect = parent.getBoundingClientRect();
    return rect.top - parentRect.top;
}

journeyData.forEach((item, index) => {
    // 2. Create the Work Box
    const box = document.createElement('div');
    box.className = `work-box ${item.type === 'exp' ? 'type-experience' : 'type-project'}`;
    const activeColor = item.type === 'exp' ? '#10b981' : '#f59e0b';

    box.innerHTML = `
        <div class="timeline-dot"></div>
        <div class="work-content">
            <div class="work-header">
                <h2 class="work-title">${item.title}</h2>
                <span class="work-date">${item.date}</span>
            </div>
            <h3 class="work-org">${item.org}</h3>
            <p class="work-desc">${item.desc}</p>
        </div>
    `;

    const dot = box.querySelector('.timeline-dot');
    const content = box.querySelector('.work-content');

    // 3. Hover Interaction Logic
    box.addEventListener('mouseenter', () => {
        // Set the current active color for CSS variables
        // const activeColor = item.type === 'exp' ? '#10b981' : '#f59e0b';
        container.style.setProperty('--active-color', activeColor);
        
        // Launch Comet from top to dot's Y position
        const targetY = getRelativeY(dot, container); // Offset to center comet head on dot
        comet.style.transform = `translateY(${targetY - 20}px)`;
        comet.classList.add('active');

        // Step A: Dot glows when comet arrives (~350ms)
        setTimeout(() => {
            if (box.matches(':hover')) {
                dot.classList.add('dot-active');
                box.classList.add('arm-active');
            }
        }, 350);

        // Step B: Content box glows and slides shortly after
        setTimeout(() => {
            if (box.matches(':hover')) {
                content.classList.add('content-active');
            }
        }, 500);
    });

    box.addEventListener('mouseleave', () => {
        // Reset comet and all active classes
        comet.classList.remove('active');
        comet.style.transform = `translateY(-100px)`; // Move back up off-screen
        dot.classList.remove('dot-active');
        box.classList.remove('arm-active');
        content.classList.remove('content-active');
    });

    container.appendChild(box);

    // 4. Set Rope length to the last dot center
    if (index === journeyData.length - 1) {
        setTimeout(() => {
            rope.style.height = `${dot.offsetTop + 6}px`;
        }, 100);
    }
});
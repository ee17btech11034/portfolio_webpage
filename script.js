const journeyData = [
    { type: 'exp', title: 'Node.js Backend Developer', date: '2026', desc: 'Working on scalable microservices and cloud architecture.' },
    { type: 'proj', title: 'Multiplayer Snake Game', date: '2025', desc: 'Real-time WebSockets implementation with Canvas API.' },
    { type: 'exp', title: 'Frontend Intern', date: '2024', desc: 'React performance tuning and design system development.' },
    { type: 'proj', title: 'Netflix Clone', date: '2025', desc: 'Advanced CSS Grid and responsive video streaming UI.' }
];

const container = document.querySelector('.timeline-container');
const rope = document.querySelector('.timeline-rope');

// 1. Create the two Comet parts (Vertical and Horizontal)
const vComet = document.createElement('div');
const hComet = document.createElement('div');
vComet.className = 'comet-v';
hComet.className = 'comet-h';
container.appendChild(vComet);
container.appendChild(hComet);

// 2. Loop through your data to create the HTML
journeyData.forEach((item, index) => {
    const box = document.createElement('div');
    const isExp = item.type === 'exp';
    box.className = `work-box ${isExp ? 'type-experience' : 'type-project'}`;
    const color = isExp ? '#10b981' : '#f59e0b';

    box.innerHTML = `
        <div class="timeline-dot"></div>
        <div class="work-content">
            <div class="work-header">
                <h2 class="work-title">${item.title}</h2>
                <span class="work-date">${item.date}</span>
            </div>
            <p class="work-desc">${item.desc}</p>
        </div>
    `;

    container.appendChild(box);

    const dot = box.querySelector('.timeline-dot');
    const content = box.querySelector('.work-content');

    // 3. The Animation Journey Logic
    box.addEventListener('mouseenter', () => {
        container.style.setProperty('--active-color', color);

        // Get live coordinates
        const cRect = container.getBoundingClientRect();
        const dRect = dot.getBoundingClientRect();
        const bRect = content.getBoundingClientRect();

        // Calculate Y (center of dot) and X (distance to box)
        const dotY = dRect.top - cRect.top + (dRect.height / 2);
        const boxXStart = dRect.left - cRect.left + (dRect.width / 2);
        const boxXEnd = bRect.left - cRect.left;

        // A. RESET & START VERTICAL
        vComet.style.transition = 'none';
        vComet.style.transform = `translateY(-100px)`; 
        vComet.style.opacity = '0';

        // Small timeout to allow reset to trigger
        setTimeout(() => {
            vComet.style.transition = 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.1s';
            vComet.style.opacity = '1';
            // Stop exactly at dot center (comet height is 40px)
            vComet.style.transform = `translateY(${dotY - 40}px)`;
        }, 10);

        // B. REACH DOT (400ms after vertical starts)
        setTimeout(() => {
            if (!box.matches(':hover')) return;

            vComet.style.opacity = '0'; // Hide vertical comet
            dot.classList.add('dot-glow'); // Light up the dot

            // Setup Horizontal Spark
            hComet.style.top = `${dotY - 1}px`; // Align with dot center
            hComet.style.left = `${boxXStart}px`;
            hComet.style.width = '0';
            hComet.style.opacity = '1';

            // Grow Spark to Box
            setTimeout(() => {
                hComet.style.width = `${boxXEnd - boxXStart}px`;
            }, 10);
        }, 400);

        // C. REACH BOX (600ms total)
        setTimeout(() => {
            if (!box.matches(':hover')) return;
            content.classList.add('box-glow');
            hComet.style.opacity = '0'; // Dissolve spark into the box
        }, 600);
    });

    box.addEventListener('mouseleave', () => {
        // Instant Reset
        vComet.style.opacity = '0';
        hComet.style.opacity = '0';
        hComet.style.width = '0';
        dot.classList.remove('dot-glow');
        content.classList.remove('box-glow');
    });

    // 4. Set Rope height to end at the center of the last dot
    if (index === journeyData.length - 1) {
        setTimeout(() => {
            rope.style.height = `${dot.offsetTop + 6}px`;
        }, 100);
    }
});
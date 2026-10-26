/**
 * JGTECH Portfolio — Centralized Content Management System (CMS) Engine
 * Manages skills, categories, ratings, and synchronizes dynamically across
 * both the AI ChatFolio (index.html) and Classic Portfolio (classic.html).
 */

(function (window) {
    'use strict';

    const STORAGE_KEY = 'jgtech_portfolio_skills_v1';

    // Baseline Default Skills
    const DEFAULT_SKILLS = [
        {
            id: 'skill-1',
            name: 'React & Next.js',
            category: 'Frontend Architecture',
            rating: 5,
            tag: 'App Router & SSR',
            icon: 'fa-brands fa-react'
        },
        {
            id: 'skill-2',
            name: 'TypeScript & JavaScript',
            category: 'Frontend Architecture',
            rating: 5,
            tag: 'ESNext & Strict Types',
            icon: 'fa-brands fa-js'
        },
        {
            id: 'skill-3',
            name: 'Tailwind CSS & Modern UI',
            category: 'Frontend Architecture',
            rating: 5,
            tag: 'Fluid Glassmorphism',
            icon: 'fa-brands fa-css3-alt'
        },
        {
            id: 'skill-4',
            name: 'Vue & Svelte',
            category: 'Frontend Architecture',
            rating: 4,
            tag: 'Component Systems',
            icon: 'fa-brands fa-vuejs'
        },
        {
            id: 'skill-5',
            name: 'Node.js & Express',
            category: 'Backend & Cloud',
            rating: 5,
            tag: 'High-Throughput APIs',
            icon: 'fa-brands fa-node-js'
        },
        {
            id: 'skill-6',
            name: 'PHP 8.x & Laravel',
            category: 'Backend & Cloud',
            rating: 5,
            tag: 'Enterprise MVC & OOP',
            icon: 'fa-brands fa-php'
        },
        {
            id: 'skill-7',
            name: 'Python & Django / FastAPI',
            category: 'Backend & Cloud',
            rating: 4,
            tag: 'Async Services & AI APIs',
            icon: 'fa-brands fa-python'
        },
        {
            id: 'skill-8',
            name: 'PostgreSQL & MongoDB',
            category: 'Databases & Architecture',
            rating: 5,
            tag: 'Relational & Document Stores',
            icon: 'fa-solid fa-database'
        },
        {
            id: 'skill-9',
            name: 'MySQL & MariaDB',
            category: 'Databases & Architecture',
            rating: 5,
            tag: 'Query Optimization & Indexing',
            icon: 'fa-solid fa-server'
        },
        {
            id: 'skill-10',
            name: 'AWS & Docker DevOps',
            category: 'Cloud, DevOps & Tools',
            rating: 4,
            tag: 'CI/CD & Micro-containers',
            icon: 'fa-brands fa-aws'
        },
        {
            id: 'skill-11',
            name: 'Git & Linux Systems',
            category: 'Cloud, DevOps & Tools',
            rating: 5,
            tag: 'Automations & Terminal',
            icon: 'fa-brands fa-git-alt'
        }
    ];

    const SkillsCMS = {
        STORAGE_KEY: STORAGE_KEY,

        /**
         * Get all active skills (from localStorage if customized, otherwise defaults)
         */
        getAll: function () {
            try {
                const stored = localStorage.getItem(STORAGE_KEY);
                if (stored) {
                    const parsed = JSON.parse(stored);
                    if (Array.isArray(parsed) && parsed.length > 0) {
                        return parsed;
                    }
                }
            } catch (err) {
                console.warn('[CMS] Using default skills:', err);
            }
            return JSON.parse(JSON.stringify(DEFAULT_SKILLS));
        },

        /**
         * Save skills to localStorage
         */
        saveAll: function (skills) {
            try {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(skills));
                window.dispatchEvent(new CustomEvent('jgtech-skills-updated', { detail: skills }));
                return true;
            } catch (err) {
                console.error('[CMS] Failed to save skills:', err);
                return false;
            }
        },

        /**
         * Add a new skill
         */
        add: function (skillData) {
            const skills = this.getAll();
            const newSkill = {
                id: 'skill-' + Date.now(),
                name: (skillData.name || 'Untitled Skill').trim(),
                category: (skillData.category || 'Frontend Architecture').trim(),
                rating: Math.min(5, Math.max(1, parseInt(skillData.rating, 10) || 5)),
                tag: (skillData.tag || '').trim(),
                icon: (skillData.icon || 'fa-solid fa-code').trim()
            };
            skills.push(newSkill);
            this.saveAll(skills);
            return newSkill;
        },

        /**
         * Update an existing skill
         */
        update: function (id, updatedFields) {
            const skills = this.getAll();
            const index = skills.findIndex(s => s.id === id);
            if (index !== -1) {
                skills[index] = {
                    ...skills[index],
                    name: (updatedFields.name || skills[index].name).trim(),
                    category: (updatedFields.category || skills[index].category).trim(),
                    rating: updatedFields.rating !== undefined ? Math.min(5, Math.max(1, parseInt(updatedFields.rating, 10))) : skills[index].rating,
                    tag: updatedFields.tag !== undefined ? updatedFields.tag.trim() : skills[index].tag,
                    icon: updatedFields.icon !== undefined ? updatedFields.icon.trim() : skills[index].icon
                };
                this.saveAll(skills);
                return skills[index];
            }
            return null;
        },

        /**
         * Delete a skill by ID
         */
        remove: function (id) {
            let skills = this.getAll();
            const initialLength = skills.length;
            skills = skills.filter(s => s.id !== id);
            if (skills.length !== initialLength) {
                this.saveAll(skills);
                return true;
            }
            return false;
        },

        /**
         * Reset skills to original defaults
         */
        resetToDefaults: function () {
            localStorage.removeItem(STORAGE_KEY);
            window.dispatchEvent(new CustomEvent('jgtech-skills-updated', { detail: DEFAULT_SKILLS }));
            return JSON.parse(JSON.stringify(DEFAULT_SKILLS));
        },

        /**
         * Group skills by category
         */
        getByCategories: function () {
            const skills = this.getAll();
            const categories = {};
            skills.forEach(skill => {
                const cat = skill.category || 'General';
                if (!categories[cat]) {
                    categories[cat] = [];
                }
                categories[cat].push(skill);
            });
            return categories;
        },

        /**
         * Export current skills as formatted JS code for git persistence
         */
        exportJSCode: function () {
            const skills = this.getAll();
            return `// Updated Skills Configuration for JGTECH Portfolio\nconst DEFAULT_SKILLS = ${JSON.stringify(skills, null, 4)};\n`;
        },

        /**
         * Render dynamic skills into index.html's #flow-skills before app.js runs
         */
        renderToAIIntro: function () {
            const flowSkills = document.getElementById('flow-skills');
            if (!flowSkills) return;

            const categories = this.getByCategories();
            const categoryIcons = {
                'Frontend Architecture': 'fa-solid fa-laptop',
                'Backend & Cloud': 'fa-solid fa-database',
                'Databases & Architecture': 'fa-solid fa-server',
                'Cloud, DevOps & Tools': 'fa-solid fa-cloud',
                'General': 'fa-solid fa-gear'
            };

            let html = `
                <p>Here are the primary tools, languages, and frameworks I use every day to build performant, enterprise-grade software:</p>
            `;

            for (const [catName, skillList] of Object.entries(categories)) {
                const iconClass = categoryIcons[catName] || 'fa-solid fa-code';
                html += `
                    <h2 class="category-skills"><i class="${iconClass}"></i>${catName}</h2>
                    <ul class="list-skills">
                `;
                skillList.forEach(skill => {
                    const rating = Math.min(5, Math.max(1, skill.rating || 5));
                    html += `<li>${skill.name}<span class="stars" data-rating="${rating}"></span></li>`;
                });
                html += `</ul>`;
            }

            html += `
                <ul class="options">
                    <li data-action="projects">View My Projects</li>
                    <li data-link="assets/link-to-cv.pdf" data-class="btn-secondary">Download CV</li>
                </ul>
            `;

            flowSkills.innerHTML = html;
        },

        /**
         * Render dynamic skills into classic.html's #skills section
         */
        renderToClassic: function () {
            const gridContainer = document.querySelector('#skills .grid');
            if (!gridContainer) return;

            const categories = this.getByCategories();
            const categoryColors = {
                'Frontend Architecture': { bg: 'bg-brand-500/10 dark:bg-brand-500/20', text: 'text-brand-600 dark:text-brand-400', border: 'border-brand-500/20' },
                'Backend & Cloud': { bg: 'bg-emerald-500/10 dark:bg-emerald-500/20', text: 'text-emerald-600 dark:text-emerald-400', border: 'border-emerald-500/20' },
                'Databases & Architecture': { bg: 'bg-purple-500/10 dark:bg-purple-500/20', text: 'text-purple-600 dark:text-purple-400', border: 'border-purple-500/20' },
                'Cloud, DevOps & Tools': { bg: 'bg-amber-500/10 dark:bg-amber-500/20', text: 'text-amber-600 dark:text-amber-400', border: 'border-amber-500/20' }
            };

            const categorySVGs = {
                'Frontend Architecture': `<svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/></svg>`,
                'Backend & Cloud': `<svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"/></svg>`,
                'Databases & Architecture': `<svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"/></svg>`,
                'Cloud, DevOps & Tools': `<svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 00-9.78 2.096A4.001 4.001 0 003 15z"/></svg>`
            };
            const defaultSVG = `<svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>`;

            let gridHtml = '';

            for (const [catName, skillList] of Object.entries(categories)) {
                const colors = categoryColors[catName] || { bg: 'bg-brand-500/10 dark:bg-brand-500/20', text: 'text-brand-600 dark:text-brand-400', border: 'border-brand-500/20' };
                const iconSvg = categorySVGs[catName] || defaultSVG;

                gridHtml += `
                    <div class="glass-card p-6">
                        <div class="w-10 h-10 rounded-xl ${colors.bg} ${colors.text} flex items-center justify-center mb-4 border ${colors.border}">
                            ${iconSvg}
                        </div>
                        <h3 class="font-display font-bold text-lg text-slate-900 dark:text-white mb-3">${catName}</h3>
                        <ul class="space-y-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                `;

                skillList.forEach((skill, idx) => {
                    const isLast = idx === skillList.length - 1;
                    const borderClass = isLast ? '' : 'pb-1.5 border-b border-slate-100 dark:border-slate-800/80';
                    const starsDisplay = '★'.repeat(skill.rating) + '☆'.repeat(5 - skill.rating);
                    gridHtml += `
                        <li class="flex items-center justify-between ${borderClass}">
                            <span class="font-medium flex items-center gap-2">
                                <i class="${skill.icon || 'fa-solid fa-code'} opacity-60 text-xs"></i>
                                ${skill.name}
                            </span>
                            <span class="text-[11px] font-mono text-amber-500 dark:text-amber-400" title="${skill.rating} of 5 Stars">${starsDisplay}</span>
                        </li>
                    `;
                });

                gridHtml += `
                        </ul>
                    </div>
                `;
            }

            gridContainer.innerHTML = gridHtml;
        }
    };

    // Auto-inject on DOM Ready if on frontend pages
    document.addEventListener('DOMContentLoaded', function () {
        if (document.getElementById('flow-skills')) {
            SkillsCMS.renderToAIIntro();
        }
        if (document.getElementById('skills')) {
            SkillsCMS.renderToClassic();
        }
    });

    // Listen for live updates across tabs or windows
    window.addEventListener('storage', function (e) {
        if (e.key === STORAGE_KEY) {
            if (document.getElementById('flow-skills')) {
                SkillsCMS.renderToAIIntro();
            }
            if (document.getElementById('skills')) {
                SkillsCMS.renderToClassic();
            }
        }
    });

    window.SkillsCMS = SkillsCMS;

})(window);

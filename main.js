/* ============================================================
   ZenLyft Official Startup Company Website : Core Scripts
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  // Navigation scroll effect
  const nav = document.querySelector('.nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 20) {
        nav.classList.add('nav--scrolled');
      } else {
        nav.classList.remove('nav--scrolled');
      }
    }, { passive: true });
  }

  // Mobile navigation drawer toggle
  const hamburger = document.querySelector('.nav__hamburger');
  const drawer = document.getElementById('mobile-drawer');

  if (hamburger && drawer) {
    hamburger.addEventListener('click', () => {
      const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
      hamburger.setAttribute('aria-expanded', !isExpanded);
      drawer.classList.toggle('nav__drawer--open');
      document.body.style.overflow = isExpanded ? '' : 'hidden';
    });

    // Close mobile drawer when clicking links
    const drawerLinks = drawer.querySelectorAll('a');
    drawerLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.setAttribute('aria-expanded', 'false');
        drawer.classList.remove('nav__drawer--open');
        document.body.style.overflow = '';
      });
    });
  }

  // Interactive Ecosystem Flow in Hero
  const ecosystemNodes = document.querySelectorAll('.ecosystem-node');
  if (ecosystemNodes.length > 0) {
    ecosystemNodes.forEach(node => {
      node.addEventListener('mouseenter', () => {
        ecosystemNodes.forEach(n => n.classList.remove('ecosystem-node--active'));
        node.classList.add('ecosystem-node--active');
      });
    });
  }

  // Contact form submission handling
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      if (submitBtn) {
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Message Received';
        submitBtn.style.backgroundColor = 'var(--color-success)';
        submitBtn.style.color = '#FFFFFF';
        submitBtn.disabled = true;
        setTimeout(() => {
          contactForm.reset();
          submitBtn.textContent = originalText;
          submitBtn.style.backgroundColor = '';
          submitBtn.style.color = '';
          submitBtn.disabled = false;
        }, 4000);
      }
    });
  }

  // ============================================================
  // EDITORIAL PAPER-CUT TEAM INTERACTIVITY, DOSSIER MODAL & vCARD
  // ============================================================
  const teamDossiers = {
    niresh: {
      name: "Niresh Senthoor U",
      role: "Founder & Chief Executive Officer",
      tag: "REF #01 // EXECUTIVE LEADERSHIP",
      cutout: "./Images/niresh senthoor.png",
      bio: "Directing product strategy, high-level architecture, and vision across all ZenLyft ventures. Focused on building intelligent digital products that turn real-world complexity into simple, accessible experiences.",
      email: "niresh@zenlyft.in",
      phone: "+91 8015929139",
      linkedin: "papercut-person papercut-person--pravinraj",
      skills: ["Product Strategy", "System Architecture", "Executive Leadership", "Platform Scaling", "UX Vision"]
    },
    sanjay: {
      name: "Sanjay S",
      role: "Co-Founder & Chief Technology Officer",
      tag: "REF #02 // SOFTWARE ARCHITECTURE",
      cutout: "./Images/sanjay.jpeg",
      bio: "Leading software architecture, backend infrastructure, and scalable system engineering. Driving core technical execution and microservices architecture across ZenLyft's digital product lines.",
      email: "sanjay@zenlyft.in",
      phone: "+91 8144184660",
      linkedin: "https://www.linkedin.com/in/sanjay-s-018-code/",
      skills: ["Cloud Infrastructure", "Distributed Systems", "Backend Microservices", "Database Design", "DevOps Pipeline"]
    },
    pravinraj: {
      name: "Pravinraj Raja",
      role: "Co-Founder & CTO (AI Engineering)",
      tag: "REF #03 // AI & FRONTEND UX",
      cutout: "./Images/pravinraj.jpeg",
      bio: "Spearheading AI model integration, intelligent search pipelines, and seamless user experiences. Transforming complex machine learning intelligence into intuitive, human-centered web platforms.",
      email: "pravinraj@zenlyft.in",
      phone: "+91 9498830875",
      linkedin: "https://www.linkedin.com/in/pravinrajraja/",
      skills: ["AI & ML Pipelines", "Frontend UX", "Data Processing", "Interactive UI", "Generative Workflows"]
    }
  };

  const editorialModal = document.getElementById('editorial-profile-modal');
  const modalBackdrop = document.getElementById('editorial-modal-backdrop');
  const modalCloseBtn = document.getElementById('editorial-modal-close');
  const modalBody = document.getElementById('editorial-modal-body');

  // Create floating toast notification for copy action
  let copyToast = document.querySelector('.editorial-toast');
  if (!copyToast) {
    copyToast = document.createElement('div');
    copyToast.className = 'editorial-toast';
    document.body.appendChild(copyToast);
  }

  function showToast(message) {
    copyToast.textContent = message;
    copyToast.classList.add('editorial-toast--visible');
    setTimeout(() => {
      copyToast.classList.remove('editorial-toast--visible');
    }, 2500);
  }

  // Dynamic vCard (.vcf) Generator
  function downloadVCard(memberKey) {
    const data = teamDossiers[memberKey];
    if (!data) return;

    const vCardData = 
`BEGIN:VCARD
VERSION:3.0
FN:${data.name}
TITLE:${data.role}
ORG:ZenLyft Startup
EMAIL;TYPE=WORK:${data.email}
TEL;TYPE=CELL:${data.phone}
URL:${data.linkedin}
NOTE:Leadership Team at ZenLyft
END:VCARD`;

    const blob = new Blob([vCardData], { type: 'text/vcard;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${data.name.replace(/\s+/g, '_')}_ZenLyft.vcf`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast(`Downloaded ${data.name}'s vCard (.vcf)! ✓`);
  }

  function openEditorialModal(memberKey) {
    const data = teamDossiers[memberKey];
    if (!data || !editorialModal || !modalBody) return;

    modalBody.innerHTML = `
      <div class="modal-dossier">
        <div class="modal-dossier__portrait-wrap">
          <img src="${teamDossiers.cutout}" alt="${data.name}" class="modal-dossier__portrait-img" />
          <div class="modal-dossier__caption">ZenLyft Leadership Archive</div>
        </div>

        <div class="modal-dossier__body">
          <div class="modal-dossier__meta">${data.tag}</div>
          <h2 class="modal-dossier__name" id="modal-member-name">${data.name}</h2>
          <div class="modal-dossier__role">${data.role}</div>

          <div class="modal-dossier__section-title">BIOGRAPHY &amp; IMPACT</div>
          <p class="modal-dossier__bio">${data.bio}</p>

          <div class="modal-dossier__section-title">CORE EXPERTISE</div>
          <div class="editorial-card__skills">
            ${data.skills.map(s => `<span class="editorial-skill-pill">${s}</span>`).join('')}
          </div>

          <div class="modal-dossier__section-title">DIRECT CONTACT &amp; CONNECT</div>
          <div class="modal-dossier__actions">
            <a href="mailto:${data.email}" class="editorial-act-btn editorial-act-btn--primary">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              <span>Email (${data.email})</span>
            </a>

            <a href="${data.linkedin}" target="_blank" rel="noopener noreferrer" class="editorial-act-btn editorial-act-btn--outline">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-1.2.7-1.74 1.54-1.74.83 0 1.21.6 1.21 1.74v4.93h2.79M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.74a1.6 1.6 0 1 0 1.6 1.6 1.6 1.6 0 0 0-1.6-1.6z"/></svg>
              <span>LinkedIn Profile</span>
            </a>

            <button class="editorial-act-btn editorial-act-btn--ghost js-modal-copy-email" data-email="${data.email}">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
              <span>Copy Email</span>
            </button>

            <button class="editorial-act-btn editorial-act-btn--vcard js-modal-vcard" data-member="${memberKey}">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              <span>Save vCard (.vcf)</span>
            </button>
          </div>
        </div>
      </div>
    `;

    // Add inside modal action listeners
    const modalCopyBtn = modalBody.querySelector('.js-modal-copy-email');
    if (modalCopyBtn) {
      modalCopyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(data.email).then(() => {
          showToast(`Copied ${data.email} to clipboard! ✓`);
        });
      });
    }

    const modalVCardBtn = modalBody.querySelector('.js-modal-vcard');
    if (modalVCardBtn) {
      modalVCardBtn.addEventListener('click', () => {
        downloadVCard(memberKey);
      });
    }

    editorialModal.classList.add('editorial-modal--active');
    editorialModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeEditorialModal() {
    if (editorialModal) {
      editorialModal.classList.remove('editorial-modal--active');
      editorialModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  }

  // Trigger from paper cutout canvas buttons
  document.querySelectorAll('.papercut-person').forEach(btn => {
    btn.addEventListener('click', () => {
      const member = btn.dataset.member;
      if (member) openEditorialModal(member);
    });
  });

  // Trigger from card portrait buttons
  document.querySelectorAll('[data-member-trigger]').forEach(btn => {
    btn.addEventListener('click', () => {
      const member = btn.dataset.memberTrigger;
      if (member) openEditorialModal(member);
    });
  });

  // Copy Email triggers in grid cards
  document.querySelectorAll('.js-copy-email').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const email = btn.dataset.email;
      if (email) {
        navigator.clipboard.writeText(email).then(() => {
          showToast(`Copied ${email} to clipboard! ✓`);
        });
      }
    });
  });

  // vCard triggers in grid cards
  document.querySelectorAll('.js-download-vcard').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const member = btn.dataset.member;
      if (member) downloadVCard(member);
    });
  });

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeEditorialModal);
  if (modalBackdrop) modalBackdrop.addEventListener('click', closeEditorialModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && editorialModal && editorialModal.classList.contains('editorial-modal--active')) {
      closeEditorialModal();
    }
  });
});

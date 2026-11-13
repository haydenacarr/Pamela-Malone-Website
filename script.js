document.addEventListener('DOMContentLoaded', () => {
  const WHATSAPP_NUMBER = '353861231774';

  // Footer year
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  // Mobile navigation
  const navToggle = document.querySelector('.nav-toggle');
  const primaryNav = document.getElementById('primary-nav');

  if (navToggle && primaryNav) {
    const closeMenu = () => {
      navToggle.setAttribute('aria-expanded', 'false');
      primaryNav.classList.remove('is-open');
    };

    navToggle.addEventListener('click', () => {
      const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!isExpanded));
      primaryNav.classList.toggle('is-open', !isExpanded);
    });

    primaryNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        closeMenu();
      }
    });
  }

  // Group day filter tabs
  const filterTabs = document.querySelectorAll('.filter-tab');
  const groupCards = document.querySelectorAll('.group-card');

  filterTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const filter = tab.dataset.filter;

      filterTabs.forEach((btn) => {
        const active = btn === tab;
        btn.classList.toggle('is-active', active);
        btn.setAttribute('aria-selected', String(active));
      });

      groupCards.forEach((card) => {
        const matches = filter === 'all' || card.dataset.day === filter;
        card.classList.toggle('is-hidden', !matches);
      });
    });
  });

  // Pre-fill enquiry service from CTA buttons
  const serviceSelect = document.getElementById('enquiry-service');
  const nameInput = document.getElementById('enquiry-name');
  const noteInput = document.getElementById('enquiry-note');
  const contactSection = document.getElementById('contact');
  const feedbackEl = document.getElementById('form-feedback');

  document.querySelectorAll('.select-enquiry').forEach((button) => {
    button.addEventListener('click', () => {
      const selectedService = button.dataset.service;
      if (serviceSelect && selectedService) {
        serviceSelect.value = selectedService;
      }
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
      if (nameInput) {
        setTimeout(() => nameInput.focus({ preventScroll: true }), 450);
      }
    });
  });

  // Build formatted WhatsApp / clipboard message
  const buildMessage = () => {
    const name = nameInput ? nameInput.value.trim() : '';
    const service = serviceSelect ? serviceSelect.value : 'Online 1-on-1 Life & Weight Coaching';
    const note = noteInput ? noteInput.value.trim() : '';

    const greeting = name ? `Hi Pamela, my name is ${name}.` : 'Hi Pamela,';
    const lines = [
      greeting,
      `I'm interested in: ${service}.`
    ];

    if (note) {
      lines.push(`Details: ${note}`);
    }

    return lines.join('\n');
  };

  // Enquiry form submit -> WhatsApp
  const enquiryForm = document.getElementById('enquiry-form');
  if (enquiryForm) {
    enquiryForm.addEventListener('submit', (event) => {
      event.preventDefault();

      if (nameInput && !nameInput.value.trim()) {
        nameInput.focus();
        if (feedbackEl) {
          feedbackEl.textContent = 'Please enter your name so Pamela knows who is messaging.';
        }
        return;
      }

      const message = buildMessage();
      const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
      if (feedbackEl) {
        feedbackEl.textContent = 'Opening WhatsApp with your message ready to send...';
      }
      window.open(url, '_blank', 'noopener,noreferrer');
    });
  }

  // Copy message button
  const copyBtn = document.getElementById('copy-message-btn');
  if (copyBtn) {
    copyBtn.addEventListener('click', async () => {
      const message = buildMessage();
      try {
        await navigator.clipboard.writeText(message);
        if (feedbackEl) {
          feedbackEl.textContent = 'Message copied! You can paste it into a text, WhatsApp, or Instagram DM.';
        }
      } catch {
        if (feedbackEl) {
          feedbackEl.textContent = 'Could not access clipboard automatically — please use "Send via WhatsApp" or text 086 123 1774.';
        }
      }
    });
  }
});

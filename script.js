(() => {
  const rooms = {
    R1: {
      title: 'HUMANITAS',
      purpose: 'Command Center',
      tag: 'orchestration',
      copy: 'The front door to the house. Bring a messy thought, a clear request, or the whole day — HUMANITAS turns it into a considered route.'
    },
    R2: {
      title: 'PATIENTIA',
      purpose: 'Second Brain',
      tag: 'memory',
      copy: 'A patient archive for notes, context, decisions, and the things worth remembering. Retrieve the signal without losing the story.'
    },
    R3: {
      title: 'TEMPERANTIA',
      purpose: 'Trading Room',
      tag: 'risk / reward',
      copy: 'A composed space for market research, thesis building, journaling, and disciplined execution. No impulse gets the final word.'
    },
    R4: {
      title: 'INDUSTRIA',
      purpose: 'Dev Lab',
      tag: 'shipping',
      copy: 'Where ideas become reliable systems. Plan, build, test, and ship with a bias toward elegant, useful momentum.'
    },
    R5: {
      title: 'LUXURIA',
      purpose: 'Creative Studio',
      tag: 'direction',
      copy: 'The room for taste, references, concepts, and creative direction — turning a spark into a world with a point of view.'
    },
    R6: {
      title: 'GULA',
      purpose: 'Editing Suite',
      tag: 'refinement',
      copy: 'A focused finishing room for words, cuts, captions, and rhythm. Every detail gets the time it deserves.'
    },
    R7: {
      title: 'SUPERBIA',
      purpose: 'Broadcast Room',
      tag: 'presence',
      copy: 'Shape the message, prepare the stage, and send work into the world with confidence and a clean signal.'
    },
    R8: {
      title: 'INVIDIA',
      purpose: 'Photo Studio',
      tag: 'visual language',
      copy: 'A visual workshop for references, treatments, art direction, and the image that makes the whole idea click.'
    },
    R9: {
      title: 'CARITAS',
      purpose: 'Client Lounge',
      tag: 'relationships',
      copy: 'Make collaboration feel generous. Keep briefs, follow-ups, delivery, and trust in one warm, well-run room.'
    },
    R10: {
      title: 'HUMILITAS',
      purpose: 'Study Room',
      tag: 'learning',
      copy: 'A quiet table for deep work, deliberate practice, and the questions that are more valuable than quick answers.'
    },
    R11: {
      title: 'AVARITIA',
      purpose: 'Business Ops',
      tag: 'leverage',
      copy: 'See the moving parts: offers, money, systems, and decisions. Turn operational drag into compounding advantage.'
    },
    R12: {
      title: 'ACEDIA',
      purpose: 'Research & Intelligence',
      tag: 'signal',
      copy: 'Go looking with intention. Gather evidence, pressure-test assumptions, and return with what actually matters.'
    },
    R13: {
      title: 'IRA',
      purpose: 'QA & Security',
      tag: 'trust',
      copy: 'The uncompromising last look. Catch errors, challenge assumptions, and keep every output safe, sound, and ready.'
    },
    R14: {
      title: 'CASTITAS',
      purpose: 'Life OS',
      tag: 'alignment',
      copy: 'The whole-life view: routines, health, home, and the small choices that keep the person behind the work well.'
    }
  };

  function initRooms() {
    const detail = document.querySelector('#room-detail');
    const cards = document.querySelectorAll('.room-card');
    const closeButton = document.querySelector('.detail-close');
    const fields = {
      number: document.querySelector('#detail-number'),
      title: document.querySelector('#detail-title'),
      purpose: document.querySelector('#detail-purpose'),
      copy: document.querySelector('#detail-copy'),
      tag: document.querySelector('#detail-tag')
    };

    if (!detail || !closeButton || !cards.length || Object.values(fields).some((field) => !field)) {
      return;
    }

    let lastFocusedCard = null;

    const closeRoom = () => {
      detail.classList.remove('is-open');
      detail.setAttribute('aria-hidden', 'true');
      cards.forEach((card) => card.setAttribute('aria-expanded', 'false'));
      if (lastFocusedCard) {
        lastFocusedCard.focus();
        lastFocusedCard = null;
      }
    };

    const openRoom = (roomId, card) => {
      const room = rooms[roomId];
      if (!room) return;

      fields.number.textContent = roomId;
      fields.title.textContent = room.title;
      fields.purpose.textContent = room.purpose;
      fields.copy.textContent = room.copy;
      fields.tag.textContent = room.tag;
      detail.classList.add('is-open');
      detail.setAttribute('aria-hidden', 'false');
      cards.forEach((roomCard) => {
        roomCard.setAttribute('aria-expanded', roomCard === card ? 'true' : 'false');
      });
      lastFocusedCard = card || document.activeElement;
      detail.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      closeButton.focus();
    };

    cards.forEach((card) => {
      card.setAttribute('aria-controls', 'room-detail');
      card.setAttribute('aria-expanded', 'false');
      card.addEventListener('click', () => openRoom(card.dataset.room, card));
      if (card.tagName !== 'BUTTON') {
        card.addEventListener('keydown', (event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            openRoom(card.dataset.room, card);
          }
        });
      }
    });

    closeButton.addEventListener('click', closeRoom);
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && detail.classList.contains('is-open')) {
        closeRoom();
      }
    });
  }

  function initRevealAnimations() {
    const revealElements = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) {
      revealElements.forEach((element) => element.classList.add('in-view'));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('in-view');
      });
    }, { threshold: 0.12 });

    revealElements.forEach((element) => observer.observe(element));
  }

  function init() {
    initRooms();
    initRevealAnimations();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();

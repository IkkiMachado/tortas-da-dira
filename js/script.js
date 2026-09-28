/**
 * ==========================================================================
 * TORTAS DA DIRA — JAVASCRIPT DE INTERAÇÃO & CONVERSÃO
 * Metodologia LRGZ / Daniel Largueza (Método Site Premium)
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {

  // Constantes de Configuração do Negócio
  const CONFIG = {
    whatsappNumber: "5551991147384",
    whatsappDisplay: "(51) 99114-7384",
    city: "Porto Alegre - RS",
    businessName: "Tortas da Dira"
  };

  // Base de Dados de Produtos & Preços
  const CAKE_DATA = {
    redonda: {
      name: "Redonda Tradicional",
      sizes: [
        { id: "pequena", label: "Pequena (20 fatias)", price: 160, serves: "Rende em média 20 fatias generosas" },
        { id: "media", label: "Média (25 fatias) [Mais Pedida]", price: 180, serves: "Rende em média 25 fatias generosas" },
        { id: "grande", label: "Grande (30 fatias)", price: 200, serves: "Rende em média 30 fatias generosas" }
      ]
    },
    retangular: {
      name: "Retangular de Festa",
      sizes: [
        { id: "ret-pequena", label: "Retangular Pequena (30 fatias)", price: 260, serves: "Rende em média 30 fatias padronizadas" },
        { id: "ret-media", label: "Retangular Média (40 fatias)", price: 280, serves: "Rende em média 40 fatias padronizadas" },
        { id: "ret-grande", label: "Retangular Grande (60 fatias)", price: 300, serves: "Rende em média 60 fatias padronizadas" }
      ]
    },
    martarocha: {
      name: "Especial Marta Rocha Gaúcha",
      sizes: [
        { id: "marta-pequena", label: "Marta Rocha Pequena (15 a 20 fatias)", price: 170, serves: "Rende em média 15 a 20 fatias com fios de ovos e nozes" },
        { id: "marta-media", label: "Marta Rocha Média (25 fatias) [Aclamada]", price: 200, serves: "Rende em média 25 fatias com fios de ovos e nozes" },
        { id: "marta-grande", label: "Marta Rocha Grande (30 fatias)", price: 220, serves: "Rende em média 30 fatias com fios de ovos e nozes" }
      ]
    }
  };

  /* --------------------------------------------------------------------------
     1. HEADER SCROLL & MENU MOBILE
     -------------------------------------------------------------------------- */
  const header = document.getElementById('header');
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });

  if (hamburgerBtn && navMenu) {
    hamburgerBtn.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      hamburgerBtn.classList.toggle('active', isOpen);
      hamburgerBtn.setAttribute('aria-expanded', isOpen);
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        hamburgerBtn.classList.remove('active');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
      });
    });

    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !hamburgerBtn.contains(e.target) && navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        hamburgerBtn.classList.remove('active');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* --------------------------------------------------------------------------
     2. ABAS DO CARDÁPIO (TABS)
     -------------------------------------------------------------------------- */
  const menuTabBtns = document.querySelectorAll('.menu-tab-btn');
  const tabPanels = document.querySelectorAll('.tab-panel');

  menuTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');

      menuTabBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      tabPanels.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      const activePanel = document.getElementById(`tab-${targetTab}`);
      if (activePanel) {
        activePanel.classList.add('active');
      }
    });
  });

  /* --------------------------------------------------------------------------
     3. SIMULADOR INTERATIVO DE ENCOMENDA
     -------------------------------------------------------------------------- */
  const simCategoryRadios = document.querySelectorAll('input[name="cakeCategory"]');
  const simSizeSelect = document.getElementById('simSize');
  const sizeServingHint = document.getElementById('sizeServingHint');
  const simFillingSelect = document.getElementById('simFilling');
  const simEventDateInput = document.getElementById('simEventDate');
  const simEventTurnSelect = document.getElementById('simEventTurn');
  const simNotesInput = document.getElementById('simNotes');

  // Elementos do Resumo
  const sumCategoryEl = document.getElementById('sumCategory');
  const sumSizeEl = document.getElementById('sumSize');
  const sumFillingEl = document.getElementById('sumFilling');
  const sumDateEl = document.getElementById('sumDate');
  const sumPriceEl = document.getElementById('sumPrice');
  const sumNotesLine = document.getElementById('sumNotesLine');
  const sumNotesEl = document.getElementById('sumNotes');
  const btnSendWhatsAppOrder = document.getElementById('btnSendWhatsAppOrder');

  // Define data mínima como amanhã
  if (simEventDateInput) {
    const today = new Date();
    today.setDate(today.getDate() + 1);
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    simEventDateInput.min = `${yyyy}-${mm}-${dd}`;
  }

  function getSelectedCategory() {
    const checked = document.querySelector('input[name="cakeCategory"]:checked');
    return checked ? checked.value : 'redonda';
  }

  function populateSizesForCategory(categoryKey, preselectedSizeId = null) {
    if (!simSizeSelect) return;
    const catData = CAKE_DATA[categoryKey];
    if (!catData) return;

    simSizeSelect.innerHTML = '';
    catData.sizes.forEach((s, idx) => {
      const option = document.createElement('option');
      option.value = s.id;
      option.textContent = `${s.label} — R$ ${s.price},00`;
      option.setAttribute('data-price', s.price);
      option.setAttribute('data-serves', s.serves);
      if (preselectedSizeId && s.id === preselectedSizeId) {
        option.selected = true;
      } else if (!preselectedSizeId && idx === 1) { // Seleciona a média por padrão
        option.selected = true;
      }
      simSizeSelect.appendChild(option);
    });

    // Se for Marta Rocha, o recheio é a receita exclusiva
    if (categoryKey === 'martarocha') {
      simFillingSelect.value = "Marta Rocha Tradicional (Fios de Ovos, Suspiro & Nozes)";
      simFillingSelect.disabled = true;
    } else {
      simFillingSelect.disabled = false;
      if (simFillingSelect.value.startsWith("Marta Rocha")) {
        simFillingSelect.value = "Nata com Morango";
      }
    }

    updateSimulatorSummary();
  }

  function updateSimulatorSummary() {
    const catKey = getSelectedCategory();
    const catData = CAKE_DATA[catKey];
    if (!catData || !simSizeSelect) return;

    const selectedOption = simSizeSelect.options[simSizeSelect.selectedIndex];
    if (!selectedOption) return;

    const currentSizeObj = catData.sizes.find(s => s.id === selectedOption.value) || catData.sizes[0];

    // Atualiza hint de rendimento
    if (sizeServingHint) {
      sizeServingHint.textContent = currentSizeObj.serves;
    }

    // Atualiza Resumo Lateral
    if (sumCategoryEl) sumCategoryEl.textContent = catData.name;
    if (sumSizeEl) sumSizeEl.textContent = currentSizeObj.label;
    if (sumPriceEl) sumPriceEl.textContent = currentSizeObj.price;

    let fillingText = simFillingSelect ? simFillingSelect.value : "Nata com Morango";
    if (catKey === 'martarocha') {
      fillingText = "Tradicional (Fios de ovos, suspiro e nozes crocantes)";
    }
    if (sumFillingEl) sumFillingEl.textContent = fillingText;

    // Data e Turno
    if (simEventDateInput && sumDateEl) {
      if (simEventDateInput.value) {
        const parts = simEventDateInput.value.split('-');
        const formattedDate = `${parts[2]}/${parts[1]}/${parts[0]}`;
        const turn = simEventTurnSelect ? ` (${simEventTurnSelect.value})` : '';
        sumDateEl.textContent = `${formattedDate}${turn}`;
      } else {
        sumDateEl.textContent = "A combinar na confirmação";
      }
    }

    // Observações
    if (simNotesInput && sumNotesLine && sumNotesEl) {
      const val = simNotesInput.value.trim();
      if (val) {
        sumNotesLine.style.display = 'flex';
        sumNotesEl.textContent = val;
      } else {
        sumNotesLine.style.display = 'none';
      }
    }

    // Atualiza classes ativas dos radio cards
    document.querySelectorAll('.radio-card').forEach(card => {
      const input = card.querySelector('input');
      if (input && input.checked) {
        card.classList.add('active');
      } else {
        card.classList.remove('active');
      }
    });
  }

  // Listeners do Simulador
  simCategoryRadios.forEach(radio => {
    radio.addEventListener('change', () => {
      populateSizesForCategory(radio.value);
    });
  });

  if (simSizeSelect) simSizeSelect.addEventListener('change', updateSimulatorSummary);
  if (simFillingSelect) simFillingSelect.addEventListener('change', updateSimulatorSummary);
  if (simEventDateInput) simEventDateInput.addEventListener('change', updateSimulatorSummary);
  if (simEventTurnSelect) simEventTurnSelect.addEventListener('change', updateSimulatorSummary);
  if (simNotesInput) simNotesInput.addEventListener('input', updateSimulatorSummary);

  // Botões "Escolher Esta Torta" dos cards de preço (Redirecionam para o simulador já preenchido)
  const selectSizeBtns = document.querySelectorAll('.select-size-btn');
  selectSizeBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const category = btn.getAttribute('data-category');
      const sizeId = btn.getAttribute('data-size');

      // Seleciona o radio da categoria correspondente
      const targetRadio = document.querySelector(`input[name="cakeCategory"][value="${category}"]`);
      if (targetRadio) {
        targetRadio.checked = true;
        populateSizesForCategory(category, sizeId);
      }
    });
  });

  // Inicializa o simulador na carga da página
  populateSizesForCategory('redonda', 'media');

  // Envio da Encomenda para o WhatsApp
  if (btnSendWhatsAppOrder) {
    btnSendWhatsAppOrder.addEventListener('click', () => {
      const catKey = getSelectedCategory();
      const catData = CAKE_DATA[catKey];
      const selectedOption = simSizeSelect.options[simSizeSelect.selectedIndex];
      const currentSizeObj = catData.sizes.find(s => s.id === selectedOption.value) || catData.sizes[0];

      let fillingText = simFillingSelect.value;
      if (catKey === 'martarocha') {
        fillingText = "Receita Tradicional (Pão de ló, nata, suspiro crocante, nozes e fios de ovos)";
      }

      let dateText = "A combinar";
      if (simEventDateInput.value) {
        const parts = simEventDateInput.value.split('-');
        dateText = `${parts[2]}/${parts[1]}/${parts[0]} - ${simEventTurnSelect.value}`;
      }

      const notes = simNotesInput.value.trim();

      // Monta mensagem personalizada e polida
      let message = `Olá, Dira! Tudo bem?\n`;
      message += `Montei uma encomenda pelo site e gostaria de confirmar a data com você:\n\n`;
      message += `🎂 *Formato:* ${catData.name}\n`;
      message += `📏 *Tamanho:* ${currentSizeObj.label}\n`;
      message += `🍓 *Recheio:* ${fillingText}\n`;
      message += `💰 *Valor Estimado:* R$ ${currentSizeObj.price},00\n`;
      message += `📅 *Data Desejada:* ${dateText}\n`;
      if (notes) {
        message += `✨ *Observações / Tema:* ${notes}\n`;
      }
      message += `📍 *Local:* ${CONFIG.city}\n\n`;
      message += `Você teria disponibilidade para essa data? Aguardo seu retorno! Obrigado(a)!`;

      const encodedUrl = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
      window.open(encodedUrl, '_blank', 'noopener');
    });
  }

  /* --------------------------------------------------------------------------
     4. CALCULADORA DE CONVIDADOS / FATIAS
     -------------------------------------------------------------------------- */
  const guestCountInput = document.getElementById('guestCount');
  const btnIncGuests = document.getElementById('incGuests');
  const btnDecGuests = document.getElementById('decGuests');
  const calcCakeName = document.getElementById('calcCakeName');
  const calcCakeDesc = document.getElementById('calcCakeDesc');

  function calculateRecommendedCake(guests) {
    if (!calcCakeName || !calcCakeDesc) return;

    if (guests <= 20) {
      calcCakeName.textContent = "Torta Pequena (20 fatias) ou Marta Rocha Pequena";
      calcCakeDesc.textContent = "Perfeita para reuniões familiares e almoços de fim de semana em Porto Alegre.";
    } else if (guests <= 26) {
      calcCakeName.textContent = "Torta Média (25 fatias) [Mais Pedida]";
      calcCakeDesc.textContent = "O tamanho ideal para a maioria das festas de aniversário, com sobra para repetir.";
    } else if (guests <= 32) {
      calcCakeName.textContent = "Torta Grande Redonda (30 fatias) ou Retangular Pequena";
      calcCakeDesc.textContent = "Excelente rendimento. Se quiser facilidade máxima para cortar, opte pela retangular.";
    } else if (guests <= 45) {
      calcCakeName.textContent = "Torta Retangular Média (40 fatias)";
      calcCakeDesc.textContent = "Fatias em formato retangular padronizadas, perfeitas para aniversários maiores.";
    } else {
      calcCakeName.textContent = "Torta Retangular Grande (60 fatias) ou 2 Tortas Médias";
      calcCakeDesc.textContent = "Para grandes comemorações, formaturas e casamentos. Você também pode escolher 2 sabores diferentes!";
    }
  }

  if (guestCountInput) {
    guestCountInput.addEventListener('input', () => {
      let val = parseInt(guestCountInput.value, 10);
      if (isNaN(val) || val < 5) val = 5;
      if (val > 100) val = 100;
      calculateRecommendedCake(val);
    });

    if (btnIncGuests) {
      btnIncGuests.addEventListener('click', () => {
        let val = parseInt(guestCountInput.value, 10) || 20;
        if (val < 100) {
          guestCountInput.value = val + 5;
          calculateRecommendedCake(val + 5);
        }
      });
    }

    if (btnDecGuests) {
      btnDecGuests.addEventListener('click', () => {
        let val = parseInt(guestCountInput.value, 10) || 25;
        if (val > 5) {
          guestCountInput.value = val - 5;
          calculateRecommendedCake(val - 5);
        }
      });
    }
  }

  /* --------------------------------------------------------------------------
     5. FILTRO DA GALERIA & LIGHTBOX
     -------------------------------------------------------------------------- */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightboxDialog = document.getElementById('lightboxDialog');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxOrderBtn = document.getElementById('lightboxOrderBtn');
  const lightboxClose = document.getElementById('lightboxClose');

  // Filtro
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');

      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      galleryItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        if (filter === 'all' || itemCategory === filter) {
          item.classList.remove('hide');
        } else {
          item.classList.add('hide');
        }
      });
    });
  });

  // Lightbox
  const openLightboxBtns = document.querySelectorAll('.open-lightbox-btn');
  openLightboxBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const imgSrc = btn.getAttribute('data-img');
      const title = btn.getAttribute('data-title');

      if (lightboxDialog && lightboxImg && lightboxTitle && lightboxOrderBtn) {
        lightboxImg.src = imgSrc;
        lightboxImg.alt = title;
        lightboxTitle.textContent = title;

        const orderMsg = `Olá, Dira! Vi a foto da "${title}" no seu site e gostaria de encomendar uma torta parecida.`;
        lightboxOrderBtn.href = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(orderMsg)}`;

        if (typeof lightboxDialog.showModal === 'function') {
          lightboxDialog.showModal();
        } else {
          lightboxDialog.setAttribute('open', '');
        }
      }
    });
  });

  if (lightboxClose && lightboxDialog) {
    lightboxClose.addEventListener('click', () => {
      if (typeof lightboxDialog.close === 'function') {
        lightboxDialog.close();
      } else {
        lightboxDialog.removeAttribute('open');
      }
    });

    // Fechar ao clicar no fundo
    lightboxDialog.addEventListener('click', (e) => {
      const rect = lightboxDialog.getBoundingClientRect();
      const isInDialog = (rect.top <= e.clientY && e.clientY <= rect.top + rect.height &&
                          rect.left <= e.clientX && e.clientX <= rect.left + rect.width);
      if (!isInDialog) {
        if (typeof lightboxDialog.close === 'function') {
          lightboxDialog.close();
        } else {
          lightboxDialog.removeAttribute('open');
        }
      }
    });
  }

  /* --------------------------------------------------------------------------
     6. FAQ ACCORDION (Acessível)
     -------------------------------------------------------------------------- */
  const accordionItems = document.querySelectorAll('.accordion-item');

  accordionItems.forEach(item => {
    const headerBtn = item.querySelector('.accordion-header');
    const body = item.querySelector('.accordion-body');

    if (headerBtn && body) {
      headerBtn.addEventListener('click', () => {
        const isOpen = item.classList.contains('active');

        // Fecha todos os outros itens para manter o accordion limpo
        accordionItems.forEach(otherItem => {
          if (otherItem !== item) {
            otherItem.classList.remove('active');
            const otherBtn = otherItem.querySelector('.accordion-header');
            const otherBody = otherItem.querySelector('.accordion-body');
            if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
            if (otherBody) otherBody.style.maxHeight = null;
          }
        });

        // Alterna o item clicado
        if (isOpen) {
          item.classList.remove('active');
          headerBtn.setAttribute('aria-expanded', 'false');
          body.style.maxHeight = null;
        } else {
          item.classList.add('active');
          headerBtn.setAttribute('aria-expanded', 'true');
          body.style.maxHeight = body.scrollHeight + 30 + 'px';
        }
      });
    }
  });

  /* --------------------------------------------------------------------------
     7. DESTAQUE DO LINK ATIVO NA NAVEGAÇÃO
     -------------------------------------------------------------------------- */
  const sections = document.querySelectorAll('section[id], main[id]');

  window.addEventListener('scroll', () => {
    let currentId = '';
    const scrollPosition = window.scrollY + 120;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentId = section.getAttribute('id');
      }
    });

    if (currentId) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentId}`) {
          link.classList.add('active');
        }
      });
    }
  }, { passive: true });

});

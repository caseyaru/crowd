// бегущая строка

const initLine = (line) => {
  const marquee = line.querySelector(".line__marquee");
  const clone = marquee.cloneNode(true);
  marquee.parentElement.appendChild(clone);
};

const lineBlock = document.querySelector(".line");
const cardsBlock = document.querySelector(".cards");

if (lineBlock && cardsBlock) {
  const clonedLine = lineBlock.cloneNode(true);
  cardsBlock.parentNode.insertBefore(clonedLine, cardsBlock.nextSibling);

  const lineBlocks = document.querySelectorAll(".line");
  lineBlocks.forEach((line) => {
    initLine(line);
  });
}

// разрыв текста

const textElement = document.querySelector("#previewMainText");
const startText = textElement.innerHTML;
const imageElement = document.querySelector(".preview__image");
const firstPart = "Чтобы поддержать Международный васюкинский турнир";
const secondPart = `
            посетите лекцию на тему: 
          <span class="preview__text_special">«Плодотворная дебютная идея»</span>
          `;

const addMobileText = () => {
  if (!document.querySelector(".preview__text_second")) {
    textElement.textContent = firstPart;
    const secondPartElement = document.createElement("p");
    secondPartElement.classList.add("preview__text", "preview__text_second");
    secondPartElement.innerHTML = secondPart;
    textElement.parentElement.appendChild(secondPartElement);
  }
};

const addDesktopText = () => {
  const secondPartElement = document.querySelector(".preview__text_second");
  if (secondPartElement) {
    secondPartElement.remove();
  }
  textElement.innerHTML = startText;
};

const changeTexts = () => {
  if (window.innerWidth < 1024) {
    addMobileText();
  } else {
    addDesktopText();
  }
};
changeTexts();

window.addEventListener("resize", () => {
  changeTexts();
  checkSliderGrid();
  updateButtons();
});

// сетка

const setSlidePrev = (currentSlide) => {
  currentSlide = currentSlideGrid > 0 ? currentSlide - 1 : slides.length - 1;
  return currentSlide;
};

const setSlideNext = (currentSlide) => {
  currentSlide = currentSlide < slides.length - 1 ? currentSlide + 1 : 0;
  return currentSlide;
};

const buttonPrevGrid = document.querySelector("#buttonPrevGrid");
const buttonNextGrid = document.querySelector("#buttonNextGrid");

const blocksForGrid = document.querySelectorAll(".grid__slide");
const slides = [
  [0, 1], // Блоки 1 и 2 (для первого слайда)
  [2], // Блок 3 (для второго слайда)
  [3, 4], // Блоки 4 и 5 (для третьего слайда)
  [5], // Блок 6 (для четвертого слайда)
  [6], // Блок 7 (для пятого слайда)
];
let currentSlideGrid = 0;

function mergeBlocksContent(blockIndexes) {
  const slideContainer = blocksForGrid[blockIndexes[0]].cloneNode(true);
  if (blockIndexes.length > 1) {
    const secondBlockContent = blocksForGrid[blockIndexes[1]]
      .querySelector(".grid__item")
      .cloneNode(true);
    slideContainer.appendChild(secondBlockContent);
  }
  return slideContainer;
}

function showSlideGrid(index) {
  const slider = document.querySelector(".grid__slider");
  slider.innerHTML = "";
  const slideContent = mergeBlocksContent(slides[index]);
  slider.appendChild(slideContent);
}

const paginationDots = document.querySelectorAll(".grid__pagination-dot");

function updatePagination() {
  paginationDots.forEach((dot, index) => {
    dot.classList.remove("grid__pagination-dot_active");
    if (index === currentSlideGrid) {
      dot.classList.add("grid__pagination-dot_active");
    }
  });
}

const updateButtons = () => {
  if (currentSlideGrid === 0) {
    buttonPrevGrid.classList.add("block__slider-button_disabled");
  } else {
    buttonPrevGrid.classList.remove("block__slider-button_disabled");
  }

  if (currentSlideGrid === slides.length - 1) {
    buttonNextGrid.classList.add("block__slider-button_disabled");
  } else {
    buttonNextGrid.classList.remove("block__slider-button_disabled");
  }
};

buttonPrevGrid.addEventListener("click", () => {
  if (currentSlideGrid > 0) {
    currentSlideGrid = setSlidePrev(currentSlideGrid);
    showSlideGrid(currentSlideGrid);
  }
  updateButtons();
  updatePagination();
});

buttonNextGrid.addEventListener("click", () => {
  if (currentSlideGrid < slides.length - 1) {
    currentSlideGrid = setSlideNext(currentSlideGrid);
    showSlideGrid(currentSlideGrid);
  }
  updateButtons();
  updatePagination();
});

paginationDots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    currentSlideGrid = index;
    showSlideGrid(currentSlideGrid);
    updateButtons();
    updatePagination();
  });
});

if (window.innerWidth <= 1024) {
  showSlideGrid(currentSlideGrid);
  updateButtons();
  updatePagination();
}

const checkSliderGrid = () => {
  if (window.innerWidth > 1024) {
    const slider = document.querySelector(".grid__slider");
    slider.innerHTML = "";
    blocksForGrid.forEach((block) => slider.appendChild(block));
    blocksForGrid.forEach((block) => (block.style.display = "flex"));
  } else {
    showSlideGrid(currentSlideGrid);
    updateButtons();
    updatePagination();
  }
};

// слайдер с карточками

// в дальнейшем сюда можно добавить вывод разных href ссылок, картинок, ролей
// в дизайне меняется только имя, его и оставим

const persons = [
  {
    name: 'Хозе-Рауль Капабланка',
  },
  {
    name: 'Эммануил Ласкер',
  },
  {
    name: 'Александр Алехин',
  },
  {
    name: 'Арон Нимцович',
  },
  {
    name: 'Рихард Рети',
  },
  {
    name: 'Остап Бендер',
  }
];

const sliderCards = document.querySelector('.cards__slider');

// отрисовка человечков
const createCards = (persons) => {
  const originalCard = document.querySelector('.cards__item');
  persons.forEach((person) => {
    const newCard = originalCard.cloneNode(true);
    const nameElement = newCard.querySelector('.cards__name');
    nameElement.textContent = person.name;
    sliderCards.appendChild(newCard);
  });
  originalCard.remove();
}
createCards(persons);

//=========
const allCards = document.querySelectorAll('.cards__item');
const prevButton = document.getElementById('buttonPrevCards');
const nextButton = document.getElementById('buttonNextCards');
const currentCardNumber = document.getElementById('currentCardNumber');
const allCardsLength = document.getElementById('allCardsLength');

let currentIndex = 0;
let slidesToShow = 3;
let slideWidth = sliderCards.offsetWidth / slidesToShow;
let autoSlideInterval;

function setSlidesToShow() {
  const windowWidth = window.innerWidth;
  
  if (windowWidth > 1200) {
    slidesToShow = 3;
  } else if (windowWidth > 768) {
    slidesToShow = 2;
  } else {
    slidesToShow = 1;
  }
  
  slideWidth = sliderCards.offsetWidth / slidesToShow;
  
  allCards.forEach(card => {
    card.style.minWidth = `${100 / slidesToShow}%`;
  });
  
  updateSlider();
}

function updateSlider() {
  const totalCards = allCards.length;
  const translateX = -(currentIndex * slideWidth);
  
  sliderCards.style.transform = `translateX(${translateX}px)`;
  
  const lastVisibleCardIndex = Math.min(currentIndex + slidesToShow, totalCards);
  currentCardNumber.textContent = lastVisibleCardIndex;
  allCardsLength.textContent = totalCards;
}

function nextSlide() {
  const totalSlides = allCards.length;
  currentIndex = (currentIndex + slidesToShow) % totalSlides;
  
  if (currentIndex >= totalSlides) {
    currentIndex = 0;
  }
  
  updateSlider();
}

function prevSlide() {
  const totalSlides = allCards.length;
  currentIndex = (currentIndex - slidesToShow + totalSlides) % totalSlides;
  
  updateSlider();
}

function startAutoSlide() {
  autoSlideInterval = setInterval(nextSlide, 4000);
}

function stopAutoSlide() {
  clearInterval(autoSlideInterval);
}

nextButton.addEventListener('click', () => {
  stopAutoSlide();
  nextSlide();
  startAutoSlide();
});

prevButton.addEventListener('click', () => {
  stopAutoSlide();
  prevSlide();
  startAutoSlide();
});

window.addEventListener('resize', setSlidesToShow);

setSlidesToShow();
startAutoSlide();
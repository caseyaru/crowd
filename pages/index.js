// переменные

const MOBILE = 768;
const LAPTOP = 1024;
const DESKTOP = 1200;
const slidesForMobile = 1;
const slidesForLaptop = 2;
const slidesForDesktop = 3;

const lineBlock = document.querySelector(".line");
const cardsBlock = document.querySelector(".cards");

const textElement = document.querySelector("#previewMainText");
const startText = textElement.innerHTML;
const imageElement = document.querySelector(".preview__image");
const firstPart = "Чтобы поддержать Международный васюкинский турнир";
const secondPart = `
            посетите лекцию на тему: 
          <span class="preview__text_special">«Плодотворная дебютная идея»</span>
          `;

const buttonPrevGrid = document.querySelector("#buttonPrevGrid");
const buttonNextGrid = document.querySelector("#buttonNextGrid");

const blocksForGrid = document.querySelectorAll(".grid__slide");
const slides = [
  [0, 1], // блоки 1 и 2 (для первого слайда)
  [2], // блок 3 (для второго слайда)
  [3, 4], // блоки 4 и 5 (для третьего слайда)
  [5], // блок 6 (для четвертого слайда)
  [6], // блок 7 (для пятого слайда)
];
let currentSlideGrid = 0;

const paginationDots = document.querySelectorAll(".grid__pagination-dot");

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

let allCards;
const buttonPrevCards = document.getElementById('buttonPrevCards');
const buttonNextCards = document.getElementById('buttonNextCards');
const currentCardNumber = document.getElementById('currentCardNumber');
const allCardsLength = document.getElementById('allCardsLength');

let currentIndex = 0;
let slidesToShow = 3;
let slideWidth = sliderCards.offsetWidth / slidesToShow;
let autoSlideInterval;

// бегущая строка

const initLine = (line) => {
  const marquee = line.querySelector(".line__marquee");
  const clone = marquee.cloneNode(true);
  marquee.parentElement.appendChild(clone);
};

if (lineBlock && cardsBlock) {
  const clonedLine = lineBlock.cloneNode(true);
  cardsBlock.parentNode.insertBefore(clonedLine, cardsBlock.nextSibling);

  const lineBlocks = document.querySelectorAll(".line");
  lineBlocks.forEach((line) => {
    initLine(line);
  });
}

// разрыв текста

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
  if (window.innerWidth < LAPTOP) {
    addMobileText();
  } else {
    addDesktopText();
  }
};

// сетка

const setSlidePrev = (currentSlide) => {
  currentSlide = currentSlideGrid > 0 ? currentSlide - 1 : slides.length - 1;
  return currentSlide;
};

const setSlideNext = (currentSlide) => {
  currentSlide = currentSlide < slides.length - 1 ? currentSlide + 1 : 0;
  return currentSlide;
};

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

const checkSliderGrid = () => {
  if (window.innerWidth > LAPTOP) {
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
  allCards = document.querySelectorAll('.cards__item');
  setCardsToShow();
  updateSliderCards();
}

// слайдер с карточками

function setCardsToShow() {
  const windowWidth = window.innerWidth;
  
  if (windowWidth > DESKTOP) {
    slidesToShow = slidesForDesktop;
  } else if (windowWidth > MOBILE) {
    slidesToShow = slidesForLaptop;
  } else {
    slidesToShow = slidesForMobile;
  }
  
  slideWidth = sliderCards.offsetWidth / slidesToShow;
  
  allCards.forEach(card => {
    card.style.minWidth = `${100 / slidesToShow}%`;
  });
  
  updateSliderCards();
}

function updateSliderCards() {
  const totalCards = allCards.length;
  const translateX = -(currentIndex * slideWidth);
  sliderCards.style.transform = `translateX(${translateX}px)`;
  const lastVisibleCardIndex = Math.min(currentIndex + slidesToShow, totalCards);
  currentCardNumber.textContent = lastVisibleCardIndex;
  allCardsLength.textContent = totalCards;
}

function setNextCards() {
  const totalSlides = allCards.length;
  currentIndex = (currentIndex + slidesToShow) % totalSlides;
  if (currentIndex >= totalSlides) {
    currentIndex = 0;
  }
  updateSliderCards();
}

function setPrevCards() {
  const totalSlides = allCards.length;
  currentIndex = (currentIndex - slidesToShow + totalSlides) % totalSlides;
  updateSliderCards();
}

function startAutoSlide() {
  autoSlideInterval = setInterval(setNextCards, 4000);
}

function stopAutoSlide() {
  clearInterval(autoSlideInterval);
}

buttonPrevCards.addEventListener('click', () => {
  stopAutoSlide();
  setPrevCards();
  startAutoSlide();
});

buttonNextCards.addEventListener('click', () => {
  stopAutoSlide();
  setNextCards();
  startAutoSlide();
});

changeTexts();
createCards(persons);
setCardsToShow();
startAutoSlide();

if (window.innerWidth <= LAPTOP) {
  showSlideGrid(currentSlideGrid);
  updateButtons();
  updatePagination();
}

window.addEventListener("resize", () => {
  changeTexts();
  checkSliderGrid();
  updateButtons();
  setCardsToShow();
});
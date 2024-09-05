// бегущая строка

const marquee = document.querySelector(".line__marquee");
const clone = marquee.cloneNode(true);
marquee.parentElement.appendChild(clone);

//разрыв текста

const textElement = document.querySelector('#previewMainText');
const startText = textElement.innerHTML;
const imageElement = document.querySelector('.preview__image');
const firstPart = "Чтобы поддержать Международный васюкинский турнир";
const secondPart = `
            посетите лекцию на тему: 
          <span class="preview__text_special">«Плодотворная дебютная идея»</span>
          `;

const addMobileText = () => {
    if (!document.querySelector('.preview__text_second')) {
        textElement.textContent = firstPart;
        const secondPartElement = document.createElement('p');
        secondPartElement.classList.add('preview__text', 'preview__text_second');
        secondPartElement.innerHTML = secondPart;
        textElement.parentElement.appendChild(secondPartElement);
    }
}

const addDesktopText = () => {
    const secondPartElement = document.querySelector('.preview__text_second');
    if (secondPartElement) {
        secondPartElement.remove();
    }
    textElement.innerHTML = startText;
}

const changeTexts = () => {
    if (window.innerWidth < 1024) {
        addMobileText();
    } else {
        addDesktopText();
    }
}
changeTexts()

window.addEventListener('resize', () => changeTexts())


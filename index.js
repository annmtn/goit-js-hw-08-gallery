import { galleryItems } from './app.js';

// Создание и рендер разметки по массиву данных galleryItems из app.js и предоставленному шаблону.
// Реализация делегирования на галерее ul.js-gallery и получение url большого изображения.
// Открытие модального окна по клику на элементе галереи.
// Подмена значения атрибута src элемента img.lightbox__image.
// Закрытие модального окна по клику на кнопку button[data-action="close-lightbox"].
// Очистка значения атрибута src элемента img.lightbox__image.Это необходимо для того, чтобы при следующем открытии модального окна, пока грузится изображение, мы не видели предыдущее.

const galleryEl = document.querySelector('.js-gallery');
const lightboxEl = document.querySelector('.js-lightbox');
const lightboxImageEl = document.querySelector('.lightbox__image');
const buttonCloseModal = document.querySelector(
  '[data-action="close-lightbox"]'
);
const overlay = document.querySelector('.lightbox__overlay');

const galleryMarkup = createGalleryMarkup(galleryItems);
galleryEl.innerHTML = galleryMarkup;

galleryEl.addEventListener('click', onImageClick);
buttonCloseModal.addEventListener('click', onButtonCloseModalClick);

function createGalleryMarkup(galleryItems) {
  return galleryItems
    .map(elem => {
      return `<li class="gallery__item">
  <a
    class="gallery__link"
    href="${elem.original}"
  >
    <img
      class="gallery__image"
      src="${elem.preview}"
      data-source="${elem.original}"
      data-index ='${galleryItems.indexOf(elem)}'
      alt="${elem.description}"
    />
  </a>
</li>`;
    })
    .join('');
}

function onImageClick(event) {
  event.preventDefault();

  if (event.target.nodeName !== 'IMG') {
    return;
  }

  const urlSelectedImage = event.target.dataset.source;
  const altSelectedImage = event.target.alt;

  lightboxEl.classList.add('is-open');

  lightboxImageEl.src = urlSelectedImage;
  lightboxImageEl.alt = altSelectedImage;

  overlay.addEventListener('click', onOverlayClick);
  window.addEventListener('keydown', onEscKeyDown);

  galleryEl.addEventListener('keydown', onArrowRight);
  galleryEl.addEventListener('keydown', onArrowLeft);
}

function onButtonCloseModalClick(event) {
  lightboxEl.classList.remove('is-open');
  lightboxImageEl.src = '';
  lightboxImageEl.alt = '';
  window.removeEventListener('keydown', onEscKeyDown);

  galleryEl.removeEventListener('keydown', onArrowRight);
  galleryEl.removeEventListener('keydown', onArrowLeft);
}

function onOverlayClick(event) {
  if (event.currentTarget === event.target) {
    onButtonCloseModalClick();
  }
}

function onEscKeyDown(event) {
  if (event.code === 'Escape') {
    onButtonCloseModalClick();
  }
}

function onArrowRight(event) {
  if (event.code === 'ArrowRight') {
    const activeImage = galleryItems.findIndex(
      img => img.original === lightboxImageEl.src
    );

    let index = activeImage ? activeImage : 0;

    if (index < galleryItems.length - 1) {
      index += 1;
    } else {
      index = 0;
    }

    lightboxImageEl.src = galleryItems[index].original;
    lightboxImageEl.alt = galleryItems[index].alt;
  }
}

function onArrowLeft(event) {
  if (event.code === 'ArrowLeft') {
    const activeImage = galleryItems.findIndex(
      img => img.original === lightboxImageEl.src
    );

    let index = activeImage ? activeImage : galleryItems.length;

    if (index > 0) {
      index -= 1;
    } else {
      index = galleryItems.length - 1;
    }

    lightboxImageEl.src = galleryItems[index].original;
    lightboxImageEl.alt = galleryItems[index].alt;
  }
}

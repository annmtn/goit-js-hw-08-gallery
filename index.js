import {galleryItems} from './app.js'

// Создание и рендер разметки по массиву данных 
//galleryItems из app.js и предоставленному шаблону.

const galleryEl = document.querySelector('.js-gallery');
const lightboxEl = document.querySelector('.js-lightbox');
const lightboxImageEl = document.querySelector('.lightbox__image');
const buttonCloseModal = document.querySelector('[data-action="close-lightbox"]');

const galleryMarkup = createGalleryMarkup(galleryItems);
galleryEl.innerHTML = galleryMarkup
  
function createGalleryMarkup(galleryItems) {
    return galleryItems.map(({preview,original,description}) => {
        return `<li class="gallery__item">
  <a
    class="gallery__link"
    href="${original}"
  >
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>`
    }).join('')
}
  
// Реализация делегирования на галерее ul.js-gallery и получение url 
//большого изображения.

// Открытие модального окна по клику на элементе галереи.

// Подмена значения атрибута src элемента img.lightbox__image.

galleryEl.addEventListener('click', onImageClick)

function onImageClick(event) {
    event.preventDefault();

    if (event.target.nodeName !== "IMG") {
        return
    }

    const urlSelectedImage = event.target.dataset.source;
    const altSelectedImage = event.target.alt;
 
    lightboxEl.classList.add("is-open");

    lightboxImageEl.src = urlSelectedImage;
    lightboxImageEl.alt = altSelectedImage;
}

// Закрытие модального окна по клику на кнопку button[data-action="close-lightbox"].
// Очистка значения атрибута src элемента img.lightbox__image.
//Это необходимо для того, чтобы при следующем открытии модального окна, 
//пока грузится изображение, мы не видели предыдущее.

buttonCloseModal.addEventListener('click', onButtonCloseModalClick)

function onButtonCloseModalClick(event) {
    lightboxEl.classList.remove("is-open");
    lightboxImageEl.src = '';
    lightboxImageEl.alt = '';
}







import {galleryItems} from './app.js'

// Создание и рендер разметки по массиву данных 
//galleryItems из app.js и предоставленному шаблону.

const galleryEl = document.querySelector('.js-gallery');
console.log(galleryEl);
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

// Закрытие модального окна по клику на кнопку button[data-action="close-lightbox"].

// Очистка значения атрибута src элемента img.lightbox__image.
//Это необходимо для того, чтобы при следующем открытии модального окна, 
//пока грузится изображение, мы не видели предыдущее.



// 1. Görüntü dizisini (images) dosyanın en üstüne yerleştiriyoruz.
// Şablonda bu hazır gelmediyse, sana verilen diziyi buraya yapıştırabilirsin.
const images = [
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/rchids-4202820__480.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/rchids-4202820_1280.jpg',
    description: 'Hokkaido Flower',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
    description: 'Container Haulage Freight',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
    description: 'Aerial Beach View',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
    description: 'Flower Blooms',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
    description: 'Alpine Mountains',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
    description: 'Mountain Lake Sailing',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
    description: 'Alpine Spring Meadows',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
    description: 'Nature Landscape',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
    description: 'Lighthouse Coast Sea',
  },
];

// 2. DOM elementini seçme
const galleryContainer = document.querySelector('.gallery');

// 3. Galeri öğelerini dinamik olarak oluşturma (Render)
function createGalleryMarkup(imagesArray) {
  return imagesArray
    .map(({ preview, original, description }) => {
      return `
        <li class="gallery-item">
          <a class="gallery-link" href="${original}">
            <img
              class="gallery-image"
              src="${preview}"
              data-source="${original}"
              alt="${description}"
            />
          </a>
        </li>
      `;
    })
    .join('');
}

// Oluşturulan HTML şablonunu ul.gallery içerisine basıyoruz
galleryContainer.insertAdjacentHTML('beforeend', createGalleryMarkup(images));

// 4. Olay Temsili (Event Delegation) ile tıklama dinleyicisi ekleme
galleryContainer.addEventListener('click', onGalleryItemClick);

function onGalleryItemClick(event) {
  // Varsayılan davranışı engelle (Resmin tarayıcı tarafından indirilmesini/açılmasını önler)
  event.preventDefault();

  // Tıklanan elementin bir resim (IMG) olup olmadığını kontrol et
  const isGalleryImage = event.target.classList.contains('gallery-image');
  if (!isGalleryImage) {
    return; // Eğer resme tıklanmadıysa fonksiyondan çık
  }

  // Tıklanan resmin büyük versiyonunun URL'sini 'data-source' özniteliğinden al
  const largeImageUrl = event.target.dataset.source;
  const imageAlt = event.target.alt;

  // 5. basicLightbox Modalı oluşturma ve klavye takibi
  const instance = basicLightbox.create(
    `
    <div class="modal">
        <img src="${largeImageUrl}" alt="${imageAlt}" width="1112" height="640">
    </div>
    `,
    {
      // Mentor Kriteri: Klavye dinlemesi yalnızca modal pencere açıkken gerçekleşir
      onShow: (instance) => {
        window.addEventListener('keydown', onEscapePress);
      },
      // Mentor Kriteri: Modal kapandığında klavye dinleyicisi kaldırılır
      onClose: (instance) => {
        window.removeEventListener('keydown', onEscapePress);
      },
    }
  );

  // Modalı ekranda göster
  instance.show();

  // Escape tuşuna basıldığında modalı kapatan fonksiyon
  function onEscapePress(event) {
    if (event.code === 'Escape') {
      instance.close();
    }
  }
}
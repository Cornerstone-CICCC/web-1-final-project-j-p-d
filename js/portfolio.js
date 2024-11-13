const makeupTab = document.querySelector('#makeup-tab');
const hairstyleTab = document.querySelector('#hairstyle-tab');
const makeupImgList = document.querySelector('#makeup-imgs');
const hairstyleImgList = document.querySelector('#hairstyle-imgs');
const viewMoreButton = document.querySelector('#view-more');

// Initial visible image count for smart phone screen width (360px)
const INITIAL_VISIBLE_COUNT = 4;

let makeupVisibleCount = INITIAL_VISIBLE_COUNT;
let hairstyleVisibleCount = INITIAL_VISIBLE_COUNT;

// Update visible images based on the smart phone screen width (360px)
function updateVisibleImagesForSmartPhone() {
  const makeupImages = makeupImgList.querySelectorAll('#makeup-imgs img');
  const hairstyleImages = hairstyleImgList.querySelectorAll('#hairstyle-imgs img');

  makeupImages.forEach((img, index) => {
    if (index < makeupVisibleCount) {
      img.classList.remove('hide-imgs');
      img.classList.add('show-imgs');
    } else {
      img.classList.remove('show-imgs');
      img.classList.add('hide-imgs');
    }
  });

  hairstyleImages.forEach((img, index) => {
    if (index < hairstyleVisibleCount) {
      img.classList.remove('hide-imgs');
      img.classList.add('show-imgs');
    } else {
      img.classList.remove('show-imgs');
      img.classList.add('hide-imgs');
    }
  });
}

// Switch between makeup and hairstyle tabs
makeupTab.addEventListener('click', () => {
  makeupTab.classList.remove('opacity');
  hairstyleTab.classList.add('opacity');
  makeupImgList.classList.remove('hide-imgs');
  makeupImgList.classList.add('show-imgs');
  hairstyleImgList.classList.remove('show-imgs');
  hairstyleImgList.classList.add('hide-imgs');
});

hairstyleTab.addEventListener('click', () => {
  hairstyleTab.classList.remove('opacity');
  makeupTab.classList.add('opacity');
  hairstyleImgList.classList.remove('hide-imgs');
  hairstyleImgList.classList.add('show-imgs');
  makeupImgList.classList.remove('show-imgs');
  makeupImgList.classList.add('hide-imgs');
});

// Load visible images
viewMoreButton.addEventListener('click', (e) => {
  e.preventDefault();
  if (! makeupImgList.classList.contains('hide-imgs')) {
    makeupVisibleCount += 4;
  } else if (! hairstyleImgList.classList.contains('hide-imgs')) {
    hairstyleVisibleCount += 4;
  }
  // For smart phone screen width (360px)
  if (window.innerWidth <= 360) {
    updateVisibleImagesForSmartPhone();
  }
});


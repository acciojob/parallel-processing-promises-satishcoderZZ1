//your JS code here. If required.
const output = document.getElementById("output");
const btn = document.getElementById("download-images-button");
const loading = document.getElementById("loading");
const error = document.getElementById("error");

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];

function downloadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = url;
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Failed to load image: ${url}`));
  });
}

function downloadImages() {
  error.textContent = '';
  output.innerHTML = '';
  loading.style.display = "block";

  Promise.all(images.map(imgObj => downloadImage(imgObj.url)))
    .then(downloadedImages => {
      loading.style.display = "none";
      downloadedImages.forEach(img => output.appendChild(img));
    })
    .catch(err => {
      loading.style.display = "none";
      error.textContent = err.message;
    });
}

btn.addEventListener("click", downloadImages);
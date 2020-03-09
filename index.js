const input = document.getElementById("img-input");
const canvasElement = document.getElementById("filter-canvas");
const canvasCtx = canvasElement.getContext("2d");

const worker = new Worker("./worker.js");
worker.addEventListener("message", d => {
  const imageData = d.data;
  canvasCtx.putImageData(imageData, 0, 0);
});

function applyFilter() {
  /**
   * ImageData represents pixels in the canvas.
   * Every pixel is defined by 4 numbers, representing r,g,b,a values.
   */
  let imageData = canvasCtx.getImageData(
    0,
    0,
    canvasElement.width,
    canvasElement.height
  );
  worker.postMessage(imageData, [imageData.data.buffer]);
}

input.addEventListener("change", e => {
  const fileMetaData = e.target.files[0];
  /**
   * The createImageBitmap() method creates a bitmap from a given source, without holding the main thread
   * The method exists on the global scope in both windows and workers.
   * It returns a Promise which resolves to an ImageBitmap.
   */
  createImageBitmap(fileMetaData).then(bitmap => {
    canvasElement.width = bitmap.width;
    canvasElement.height = bitmap.height;
    canvasCtx.drawImage(bitmap, 0, 0); //canvas
    applyFilter();
  });
});

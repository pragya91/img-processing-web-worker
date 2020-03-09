onmessage = d=> {
    let imageData = d.data; // d is a buffer here
    const width = imageData.width;
    const height = imageData.height;
    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        const index = (x + y * width) * 4;
        //change the image's red values
        imageData.data[index] = imageData.data[index] * 1.3;
      }
    }
    postMessage(imageData, [imageData.data.buffer]);
  };
  
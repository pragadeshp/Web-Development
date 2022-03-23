let fImage = document.getElementById("img-file");
let canvas = document.getElementById("can1");
let image = null;
let point1, point2, point3, point4, point5, point6;
let height;
let avg;
var blurImage = null;

function upload() {
    image = new SimpleImage(fImage);
    blurImage = new SimpleImage(fImage);
    image.drawTo(canvas);
}

function doGray() {
    let filteredImg = image;
    if (imageIsLoaded(filteredImg)) {
        for (let pixel of filteredImg.values()) {
            let avg = (pixel.getRed() + pixel.getGreen() + pixel.getBlue()) / 3;
            pixel.setRed(avg);
            pixel.setGreen(avg);
            pixel.setBlue(avg);
        }
        filteredImg.drawTo(canvas);
    } else {
        alert("Image has not been loaded");
    }
    image = new SimpleImage(fImage);
}

function doBlue() {
    let filteredImg = image;
    if (imageIsLoaded(filteredImg)) {
        for (let pixel of filteredImg.values()) {
            pixel.setBlue(255);
        }
        filteredImg.drawTo(canvas);
    } else {
        alert("Image has not been loaded");
    }
    image = new SimpleImage(fImage);
}

function doGreen() {
    let filteredImg = image;
    if (imageIsLoaded(filteredImg)) {
        for (let pixel of filteredImg.values()) {
            pixel.setGreen(255);
        }
        filteredImg.drawTo(canvas);
    } else {
        alert("Image has not been loaded");
    }
    image = new SimpleImage(fImage);
}

function doRed() {
    let filteredImg = image;
    if (imageIsLoaded(filteredImg)) {
        for (let pixel of filteredImg.values()) {
            pixel.setRed(255);
        }
        filteredImg.drawTo(canvas);
    } else {
        alert("Image has not been loaded");
    }
    image = new SimpleImage(fImage);
}

function doBright() {
    let filteredImg = image;
    if (imageIsLoaded(filteredImg)) {
        for (let pixel of filteredImg.values()) {
            let red = pixel.getRed() * 1.5;
            let green = pixel.getGreen() * 1.5;
            let blue = pixel.getBlue() * 1.5;
            pixel.setRed(red);
            pixel.setGreen(green);
            pixel.setBlue(blue);
        }
        filteredImg.drawTo(canvas);
    } else {
        alert("Image has not been loaded");
    }
    image = new SimpleImage(fImage);
}

function doDark() {
    let filteredImg = image;
    if (imageIsLoaded(filteredImg)) {
        for (let pixel of filteredImg.values()) {
            let red = pixel.getRed() / 1.5;
            let green = pixel.getGreen() / 1.5;
            let blue = pixel.getBlue() / 1.5;
            pixel.setRed(red);
            pixel.setGreen(green);
            pixel.setBlue(blue);
        }
        filteredImg.drawTo(canvas);
    } else {
        alert("Image has not been loaded");
    }
    image = new SimpleImage(fImage);
}

/* Divide image into rows */
function divideIntoSevenRows(img) {
    height = img.getHeight();
    point1 = height / 7;
    point2 = (height * 2) / 7;
    point3 = (height * 3) / 7;
    point4 = (height * 4) / 7;
    point5 = (height * 5) / 7;
    point6 = (height * 6) / 7;
}

// print(height)
// print(point0, point1, point2, point3, point4, point5, point6, point7)
function filterColor(pixel, red, green, blue, avg) {
    if (avg < 128) {
        pixel.setRed((red / 127.5) * avg);
        pixel.setGreen((green / 127.5) * avg);
        pixel.setBlue((blue / 127.5) * avg);
    } else if (avg >= 128) {
        pixel.setRed((2 - red / 127.5) * avg + 2 * red - 255);
        pixel.setGreen((2 - green / 127.5) * avg + 2 * green - 255);
        pixel.setBlue((2 - blue / 127.5) * avg + 2 * blue - 255);
    }
    return pixel;
}

function avgRgbValues(pixel) {
    var avg = (pixel.getRed() + pixel.getGreen() + pixel.getBlue()) / 3;
    return avg;
}

function filterRow(img, red, green, blue, startPoint, endPoint) {
    for (var pixel of img.values()) {
        var avg = avgRgbValues(pixel);
        if (pixel.getY() > startPoint && pixel.getY() <= endPoint) {
            filterColor(pixel, red, green, blue, avg);
        }
    }
    return img;
}

function doRainbow() {
    let image = image;
    divideIntoSevenRows(image);
    filterRow(image, 255, 0, 0, 0, point1);
    filterRow(image, 255, 165, 0, point1, point2);
    filterRow(image, 255, 255, 0, point2, point3);
    filterRow(image, 0, 255, 0, point3, point4);
    filterRow(image, 0, 0, 255, point4, point5);
    filterRow(image, 75, 0, 130, point5, point6);
    filterRow(image, 143, 0, 255, point6, height);
    image.drawTo(canvas);
}


function doBlur() {
    var newImage = new SimpleImage(blurImage.getWidth(), blurImage.getHeight());
    for (var pixel of blurImage.values()) {
        var x = pixel.getX();
        var y = pixel.getY();
        if (Math.random() < 0.5) {
            newImage.setPixel(x, y, pixel);
        } else {
            var random = Math.floor(Math.random() * 23 - 11);
            var newX = random + x;
            var newY = random + y;
            if (newX > 0 && newX <= blurImage.getWidth() - 1) {
                if (newY > 0 && newY <= blurImage.getHeight() - 1) {
                    var newPixel = blurImage.getPixel(newX, newY);
                    newImage.setPixel(x, y, newPixel);
                }
            }
        }
    }
    newImage.drawTo(canvas);
}

function doReset() {
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
    image = new SimpleImage(fImage);
    image.drawTo(canvas);
}

function imageIsLoaded(imageFile) {
    if (imageFile === null || !imageFile.complete()) {
        return false;
    }
    return true;
}

/*
function divideIntoSevenRows() {
  let img = image;
  height = img.getHeight();
  point1 = height / 7;
  point2 = (height * 2) / 7;
  point3 = (height * 3) / 7;
  point4 = (height * 4) / 7;
  point5 = (height * 5) / 7;
  point6 = (height * 6) / 7;
}

function filterColor(pixel, red, green, blue, avg) {
  if (avg < 128) {
    pixel.setRed((red / 127.5) * avg);
    pixel.setGreen((green / 127.5) * avg);
    pixel.setBlue((blue / 127.5) * avg);
  } else if (avg >= 128) {
    pixel.setRed((2 - red / 127.5) * avg + 2 * red - 255);
    pixel.setGreen((2 - green / 127.5) * avg + 2 * green - 255);
    pixel.setBlue((2 - blue / 127.5) * avg + 2 * blue - 255);
  }
  return pixel;
}

function avgRgbValues(pixel) {
  avg = (pixel.getRed() + pixel.getGreen() + pixel.getBlue()) / 3;
  return avg;
}
function filterRow(img, red, green, blue, startPoint, endPoint) {
  for (var pixel of img.values()) {
    var avg = avgRgbValues(pixel);
    if (pixel.getY() > startPoint && pixel.getY() <= endPoint) {
      filterColor(pixel, red, green, blue, avg);
    }
  }
  return img;
}

*************************************************
filter by row individual functions

function filterRow1(img, red, green, blue) {
  for (var pixel of img.values()) {
    var avg = avgRgbValues(pixel);
    if (pixel.getY() <= point1) {
      filterColor(pixel, red, green, blue, avg);
    }
  }
  return img;
}

function filterRow2(img, red, green, blue) {
  for (var pixel of img.values()) {
    var avg = avgRgbValues(pixel);
    if (pixel.getY() > point1 && pixel.getY() <= point2) {
      filterColor(pixel, red, green, blue, avg);
    }
  }
  return img;
}

function filterRow3(img, red, green, blue) {
  for (var pixel of img.values()) {
    var avg = avgRgbValues(pixel);
    if (pixel.getY() > point2 && pixel.getY() <= point3) {
      filterColor(pixel, red, green, blue, avg);
    }
  }
  return img;
}

function filterRow4(img, red, green, blue) {
  for (var pixel of img.values()) {
    var avg = avgRgbValues(pixel);
    if (pixel.getY() > point3 && pixel.getY() <= point4) {
      filterColor(pixel, red, green, blue, avg);
    }
  }
  return img;
}

function filterRow5(img, red, green, blue) {
  for (var pixel of img.values()) {
    var avg = avgRgbValues(pixel);
    if (pixel.getY() > point4 && pixel.getY() <= point5) {
      filterColor(pixel, red, green, blue, avg);
    }
  }
  return img;
}

function filterRow6(img, red, green, blue) {
  for (var pixel of img.values()) {
    var avg = avgRgbValues(pixel);
    if (pixel.getY() > point5 && pixel.getY() <= point6) {
      filterColor(pixel, red, green, blue, avg);
    }
  }
  return img;
}

function filterRow7(img, red, green, blue) {
  console.log("from filterRow7");
  for (var pixel of img.values()) {
    var avg = avgRgbValues(pixel);

    if (pixel.getY() > point6 && pixel.getY() <= height) {
      filterColor(pixel, red, green, blue, avg);
    }
  }
  return img;
}


*/
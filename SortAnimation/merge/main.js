const WIDTH = 1600,
  HEIGHT = 600;
const column_width = 10,
  column_margin = 1;
const size = ~~(WIDTH / (column_width + column_margin));

let sortArr = new Array();
let ctx;
let animationTime = 0;
let time = 60;

window.onload = function () {
  let canvasDom = document.getElementById("can");
  canvasDom.width = WIDTH;
  canvasDom.height = HEIGHT;
  ctx = canvasDom.getContext("2d");

  init();
  render(ctx, sortArr, -1, -1, -1);
  sort(sortArr);
};
function sort(arr) {
  sortRecursion(arr, 0, arr.length - 1);
  animation(ctx, arr, -1, -1, -1);
}

function sortRecursion(arr, l, r) {
  if (l >= r) return;
  let mid = ~~((l + r) / 2);
  sortRecursion(arr, l, mid);
  sortRecursion(arr, mid + 1, r);
  merge(arr, l, mid, r);
}

function merge(arr, l, mid, r) {
  let itemArr = copyArray(arr, l, r);

  let i = l;
  j = mid + 1;
  for (let k = l; k <= r; k++) {
    if (i > mid) {
      arr[k] = itemArr[j - l];
      j++;
    } else if (j > r) {
      arr[k] = itemArr[i - l];
      i++;
    } else if (itemArr[i - l] < itemArr[j - l]) {
      arr[k] = itemArr[i - l];
      i++;
    } else {
      arr[k] = itemArr[j - l];
      j++;
    }
    animation(ctx, arr, k, l, r);
  }
}
function animation(ctx, arr, orderIndex, leftIndex, rightIndex) {
  let itemArr = copyArray(arr, 0, arr.length - 1);
  setTimeout(function () {
    render(ctx, itemArr, orderIndex, leftIndex, rightIndex);
  }, animationTime++ * time);
}

function copyArray(arr, start, end) {
  let itemArr = new Array();
  let index = 0;
  for (let i = start; i <= end; i++) {
    itemArr[index++] = arr[i];
  }
  return itemArr;
}

function render(ctx, arr, orderIndex, leftIndex, rightIndex) {
  ctx.clearRect(0, 0, WIDTH, HEIGHT);
  let color;
  for (let i = 0; i < arr.length; i++) {
    if (i == orderIndex && i == arr.length - 1) color = "orange";
    else if (i === orderIndex) color = "red";
    else if (i >= leftIndex && i <= rightIndex) color = "yellow";
    else color = "orange";
    drawColumn(ctx, i, arr[i], color);
  }
}

function drawColumn(ctx, index, height, color) {
  ctx.fillStyle = color;
  let x = index * (column_margin + column_width);
  let y = HEIGHT;
  ctx.fillRect(x, y, column_width, -height);
}

function init() {
  sortArr = Array.from({ length: size }, (_) => ~~(Math.random() * HEIGHT) + 1);
}

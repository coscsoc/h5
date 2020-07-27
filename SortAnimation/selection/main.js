const WIDTH = 600,
  HEIGHT = 400;
const DEFAULT_COLOR = "#293462",
  CURRENT_SELECT_COLOR = "#f7be16",//
  CURRENT_MIN_COLOR = "#ed1250",
  COMPLATE_COLOR = "#ff935c";

//柱子宽,边距
const COLUMN_WIDTH = 10,
  COLUMN_MARGIN = 1;

//数组大小,根据画布宽,组织大小,边距计算得出
const LENGTH = ~~(WIDTH / (COLUMN_MARGIN + COLUMN_WIDTH));

let sortArr = new Array();
let animationTime = 10;

window.onload = () => {
  const canDom = document.getElementById("canvas");
  canDom.width = WIDTH;
  canDom.height = HEIGHT;
  const ctx = canDom.getContext("2d");

  init();
  sort(ctx);
};

function sort(ctx) {
  for (let i = 0; i < sortArr.length; i++) {
    let minIndex = i;
    for (let j = i + 1; j < sortArr.length; j++) {
      if (sortArr[j] < sortArr[minIndex]) {
        minIndex = j;
      }
      updateView(ctx, copyArray(sortArr), i, j, minIndex);
    }
    swap(sortArr, i, minIndex);
    //完成后颜色统一
    console.log(1);
    updateView(ctx, copyArray(sortArr), i, -1, -1);
  }
}

function render(ctx, drowArray, orderIndex, currentCompareIndex, minIndex) {
  ctx.clearRect(0, 0, WIDTH, HEIGHT);
  for (let i = 0; i < LENGTH; i++) {
    if (i < orderIndex) {
      drowColumn(ctx, i, drowArray[i], COMPLATE_COLOR);
    } else if (i == currentCompareIndex) {
      drowColumn(ctx, i, drowArray[i], CURRENT_SELECT_COLOR);
    } else if (i == minIndex) {
      drowColumn(ctx, i, drowArray[i], CURRENT_MIN_COLOR);
    } else if (i == orderIndex) {
      if (i == LENGTH - 1) {
        drowColumn(ctx, i, drowArray[i], COMPLATE_COLOR);
      } else {
        drowColumn(ctx, i, drowArray[i], "black");
      }
    } else {
      drowColumn(ctx, i, drowArray[i], DEFAULT_COLOR);
    }
  }
}

/**
 *
 * @param {canvas} ctx
 * @param {待渲染的数组} array
 * @param {已排序索引} orderIndx
 * @param {当前正在比对索引} currentCompareIndex
 * @param {当前内重循环最小值的索引} currentMinIndex
 */
function updateView(ctx, array, orderIndex, currentCompareIndex, minIndex) {
  setTimeout(() => {
    render(ctx, array, orderIndex, currentCompareIndex, minIndex);
  }, animationTime++ * 20);
}

function copyArray(array) {
  let itemArr = [];
  for (let i = 0; i < array.length; i++) {
    itemArr[i] = array[i];
  }
  return itemArr;
}

function swap(array, i, j) {
  let item = array[i];
  sortArr[i] = array[j];
  sortArr[j] = item;
}

function drowColumn(ctx, index, height, color) {
  let x = index * (COLUMN_WIDTH + COLUMN_MARGIN);
  let y = HEIGHT;
  ctx.fillStyle = color;
  ctx.fillRect(x, y, COLUMN_WIDTH, -height);
}

function init() {
  sortArr = Array.from(
    { length: LENGTH },
    (_) => ~~(Math.random() * HEIGHT) + 1
  );
}
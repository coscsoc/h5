const WIDTH = 800,
  HEIGHT = 800;

//柱子宽,边距
const COLUMN_WIDTH = 6,
  COLUMN_MARGIN = 2;

const COLUMN_COLOR = "black";

let round = 0;

let moneyArr = new Array();
//房间里一共有多少人,根据画布和柱子宽确定
const COUNT = ~~(WIDTH / (COLUMN_WIDTH + COLUMN_MARGIN));
console.log(COUNT);

window.onload = function () {
  let canDom = document.getElementById("canvas");
  canDom.width = WIDTH;
  canDom.height = HEIGHT;
  let ctx = canDom.getContext("2d");

  init();
  setInterval(() => {
    for (let i = 0; i < 1000; i++) {
      shareMoney();
      round++;
    }

    clear(ctx);
    sort();
    render(ctx);
    let result =
      "max:" + moneyArr[COUNT - 1] + ",min:" + moneyArr[0] + ",round:" + round;
    document.getElementById("result").innerHTML = result;
  }, 100);
};

//排序
function sort() {
  let item;
  for (let i = 0; i < COUNT - 1; i++) {
    for (let j = i + 1; j < COUNT; j++) {
      if (moneyArr[j] < moneyArr[i]) {
        item = moneyArr[j];
        moneyArr[j] = moneyArr[i];
        moneyArr[i] = item;
      }
    }
  }
}

function clear(ctx) {
  ctx.beginPath();
  ctx.clearRect(0, 0, WIDTH, HEIGHT);
  ctx.closePath();
}

function shareMoney() {
  /* //收钱的人
  let inIndex = ~~(Math.random() * COUNT);
  //付钱的人
  let outIndex = ~~(Math.random() * COUNT);

  moneyArr[inIndex]++;
  //if (moneyArr[outIndex] === 0) {
  //  moneyArr[outIndex] = 0;
  //  return;
  //}
  moneyArr[outIndex]--; */
  for (let i = 0; i < COUNT; i++) {
    if (moneyArr[i] > 0) {
      let j = ~~(Math.random() * COUNT);
      moneyArr[i]--;
      moneyArr[j]++;
    }
  }
}

function render(ctx) {
  for (let i = 0; i < COUNT; i++) {
    drawColumn(i, moneyArr[i], ctx);
  }
}

function drawColumn(index, height, ctx) {
  //开始一条路径
  ctx.beginPath();

  let x = index * (COLUMN_WIDTH + COLUMN_MARGIN);
  let y = HEIGHT / 2;
  //canvas的坐标是反的
  if (height > 0) {
    ctx.fillStyle = "green";
  } else {
    ctx.fillStyle = "red";
  }
  ctx.fillRect(x, y, COLUMN_WIDTH, -height);
  ctx.closePath();
}

function init() {
  moneyArr = Array.from({ length: 100 }, (_) => 100);
}

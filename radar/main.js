const WIDTH = 15,
  HEIGHT = 15,
  COUNT = 30;
let randarArr = [];
let randarDom = document.getElementById("map");
let flagCount = 0;

window.onload = function () {
  init();
  createRandar();
  roundRandarCount();
  render();
};

function render() {
  let table = document.createElement("table");
  let tr;
  for (let i = 0; i < HEIGHT; i++) {
    tr = document.createElement("tr");
    for (let j = 0; j < WIDTH; j++) {
      let td = document.createElement("td");
      td.className = "block";
      td.style.backgroundColor = "#BDBDBD";
      td.id = i + "-" + j;
      td.onclick = function () {
        click(i, j);
        success();
      };
      td.oncontextmenu = function (e) {
        e.preventDefault();
        insertFlag(i, j);
        success();
        return false;
      };
      /*  if (randarArr[i][j].isRandar) {
        td.innerHTML = "@";
      } else {
        td.innerHTML = randarArr[i][j].roundCount;
      } */
      tr.appendChild(td);
    }
    table.appendChild(tr);
  }
  randarDom.appendChild(table);
}

function init() {
  for (let i = 0; i < HEIGHT; i++) {
    randarArr[i] = [];
    for (let j = 0; j < WIDTH; j++) {
      randarArr[i][j] = { isShow: false, isRandar: false, roundCount: "" };
    }
  }
}

//造雷
function createRandar() {
  let count = 0,
    i,
    j;
  while (count < COUNT) {
    i = Math.floor(Math.random() * HEIGHT);
    j = Math.floor(Math.random() * WIDTH);
    if (!randarArr[i][j].isRandar) {
      randarArr[i][j].isRandar = true;
      count++;
    }
  }
}

//计算方格周围有多少个雷
function roundRandarCount() {
  let count = 0;
  for (let i = 0; i < HEIGHT; i++) {
    for (let j = 0; j < WIDTH; j++) {
      // 左上
      if (i - 1 >= 0 && j - 1 >= 0) {
        if (randarArr[i - 1][j - 1].isRandar) {
          count++;
        }
      }
      // 上
      if (i - 1 >= 0) {
        if (randarArr[i - 1][j].isRandar) {
          count++;
        }
      }
      // 右上
      if (i - 1 >= 0 && j + 1 < WIDTH) {
        if (randarArr[i - 1][j + 1].isRandar) {
          count++;
        }
      }
      // 右
      if (j + 1 < WIDTH) {
        if (randarArr[i][j + 1].isRandar) {
          count++;
        }
      }
      // 右下
      if (i + 1 < HEIGHT && j + 1 < WIDTH) {
        if (randarArr[i + 1][j + 1].isRandar) {
          count++;
        }
      }
      // 下
      if (i + 1 < HEIGHT) {
        if (randarArr[i + 1][j].isRandar) {
          count++;
        }
      }
      // 左下
      if (i + 1 < HEIGHT && j - 1 >= 0) {
        if (randarArr[i + 1][j - 1].isRandar) {
          count++;
        }
      }
      // 左
      if (j - 1 >= 0) {
        if (randarArr[i][j - 1].isRandar) {
          count++;
        }
      }
      if (count > 0) {
        randarArr[i][j].roundCount = count;
        count = 0;
      }
    }
  }
}

function click(i, j) {
  let currentDom = document.getElementById(i + "-" + j);
  let current = randarArr[i][j];
  if (current.isRandar) {
    showAllrandar();
    alert("game over");
    return;
  }
  showNumber(i, j);
}

function showNumber(i, j) {
  let currentDom = document.getElementById(i + "-" + j);
  let current = randarArr[i][j];
  if (current.isShow === false) {
    currentDom.style.backgroundColor = "#848484";
    currentDom.innerHTML = current.roundCount;
    current.isShow = true;
    if (current.roundCount === "") {
      // 左上
      if (i - 1 >= 0 && j - 1 >= 0) {
        showNumber(i - 1, j - 1);
      }
      // 上
      if (i - 1 >= 0) {
        showNumber(i - 1, j);
      }
      // 右上
      if (i - 1 >= 0 && j + 1 < WIDTH) {
        showNumber(i - 1, j + 1);
      }
      // 右
      if (j + 1 < WIDTH) {
        showNumber(i, j + 1);
      }
      // 右下
      if (i + 1 < HEIGHT && j + 1 < WIDTH) {
        showNumber(i + 1, j + 1);
      }
      // 下
      if (i + 1 < HEIGHT) {
        showNumber(i + 1, j);
      }
      // 左下
      if (i + 1 < HEIGHT && j - 1 >= 0) {
        showNumber(i + 1, j - 1);
      }
      // 左
      if (j - 1 >= 0) {
        showNumber(i, j - 1);
      }
    }
  }
}

function showAllrandar() {
  for (let i = 0; i < HEIGHT; i++) {
    for (let j = 0; j < WIDTH; j++) {
      if (randarArr[i][j].isRandar) {
        let currentDom = document.getElementById(i + "-" + j);
        currentDom.style.backgroundColor = "#A4A4A4";
        currentDom.innerHTML = "<span style='color:red'>@</span>";
      }
    }
  }
}

function insertFlag(i, j) {
  let current = randarArr[i][j];
  let currentDom = document.getElementById(i + "-" + j);

  if (current.isShow === false && flagCount < COUNT) {
    let img = document.createElement("img");
    img.src =
      "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1596478455876&di=09767b9226a93b5d96901b7a3b299f75&imgtype=0&src=http%3A%2F%2Fst3.cdn.yestone.com%2Fthumbs%2F4168345%2Fvector%2F15700%2F157009534%2Fapi_thumb_450.jpg";
    img.style.height = "20px";
    img.style.width = "20px";
    currentDom.appendChild(img);
    current.isShow = true;
    flagCount++;
  }
}

function success() {
  for (let i = 0; i < HEIGHT; i++) {
    for (let j = 0; j < WIDTH; j++) {
      if (randarArr[i][j].isShow === false) return;
    }
  }
  alert("You Win !!");
}

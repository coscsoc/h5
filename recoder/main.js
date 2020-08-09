function Node(e) {
  this.e = e;
  this.left = null;
  this.right = null;
  this.isCheck = false; //标记节点颜色
}

function BST() {
  this.root = null;
  this.RoundSize = 20;
  this.VerticalDirection = 60;
  this.time = 0;

  this.add = function (e) {
    if (this.root == null) {
      this.root = new Node(e);
    } else {
      this.addRecursion(this.root, e);
    }
  };

  this.addRecursion = function (node, e) {
    if (e < node.e && node.left == null) {
      node.left = new Node(e);
      return;
    } else if (e > node.e && node.right == null) {
      node.right = new Node(e);
      return;
    }

    if (e < node.e && node.left != null) {
      this.addRecursion(node.left, e);
      return;
    } else if (e > node.e && node.right != null) {
      this.addRecursion(node.right, e);
      return;
    }
    /* if (e < node.e) {
      if (node.left == null) {
        node.left = new Node(e);
      } else {
        this.addRecursion(node.left, e);
      }
    } else {
      if (node.right == null) {
        node.right = new Node(e);
      } else {
        this.addRecursion(node.right, e);
      }
    } */
  };

  this.render = function (canDom) {
    this.renderByRoot(canDom, this.root);
  };

  this.renderByRoot = function (canDom, root) {
    let deep = this.getDeep();
    let count = Math.pow(2, deep - 1);

    let canvasWidth = 2 * count * (this.RoundSize * 2 + 10),
      canvasHeight = (deep + 1) * this.VerticalDirection;

    canDom.width = canvasWidth;
    canDom.height = canvasHeight;

    let ctx = canDom.getContext("2d");

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    if (root)
      this.drawRecurision(ctx, root, canvasWidth / 2, this.RoundSize, deep);
  };

  this.drawRecurision = function (ctx, node, beginX, beginY, level) {
    if (node) {
      //画左线
      if (node.left)
        this.drawLine(
          ctx,
          beginX,
          beginY,
          beginX - Math.pow(2, level - 2) * this.RoundSize * 2 + 5,
          beginY + this.VerticalDirection
        );
      //画右线
      if (node.right)
        this.drawLine(
          ctx,
          beginX,
          beginY,
          beginX + Math.pow(2, level - 2) * this.RoundSize * 2 + 5,
          beginY + this.VerticalDirection
        );
      //画圆
      this.drawRound(ctx, node, beginX, beginY);
    }

    if (node.left) {
      this.drawRecurision(
        ctx,
        node.left,
        beginX - Math.pow(2, level - 2) * this.RoundSize * 2 + 5,
        beginY + this.VerticalDirection,
        level - 1
      );
    }
    if (node.right) {
      this.drawRecurision(
        ctx,
        node.right,
        beginX + Math.pow(2, level - 2) * this.RoundSize * 2 + 5,
        beginY + this.VerticalDirection,
        level - 1
      );
    }
  };

  this.drawLine = function (ctx, beginX, beginY, endX, endY) {
    //线经过圆会被圆覆盖
    ctx.beginPath();
    //起始
    ctx.moveTo(beginX, beginY);
    //终点
    ctx.lineTo(endX, endY);
    ctx.strokeStyle = "yellow";
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.closePath();
  };

  this.drawRound = function (ctx, node, x, y) {
    ctx.beginPath();
    if (node.isCheck) {
      ctx.fillStyle = "red";
    } else {
      ctx.fillStyle = "yellow";
    }
    //arc(圆心x,圆心y,半径,起始角,结束角)
    ctx.arc(x, y, this.RoundSize, 0, Math.PI * 2);

    ctx.fill();

    ctx.fillStyle = "black";
    ctx.font = "20px Arial";
    ctx.fillText(node.e, x - this.RoundSize / 2, y + this.RoundSize / 2);
    ctx.closePath();
  };

  this.getDeep = function () {
    if (this.root == null) return 0;

    let deep = 0;
    return Math.max(
      this.getDeepRecursion(this.root.left, deep),
      this.getDeepRecursion(this.root.right, deep)
    );
  };

  this.getDeepRecursion = function (node, deep) {
    /* if (node == null) return deep;
    return Math.max(
      this.getDeepRecursion(node.left, deep + 1),
      this.getDeepRecursion(node.right, deep + 1)
    ); */
    return node == null
      ? deep
      : Math.max(
          this.getDeepRecursion(node.left, deep),
          this.getDeepRecursion(node.right, deep)
        ) + 1;
  };

  this.getMin = function () {
    return this.getMinRecursion(this.root);
  };

  this.getMinRecursion = function (node) {
    if (node.left === null) return node;
    return this.getMinRecursion(node.left);
  };

  this.getMax = function () {
    return this.getMaxRecursion(this.root);
  };

  this.getMaxRecursion = function (node) {
    if (node.right === null) return node;
    return this.getMaxRecursion(node.right);
  };

  this.getNode = function (e) {
    return this.getNodeRecursion(this.root, e);
  };

  this.getNodeRecursion = function (node, e) {
    if (node == null) return null;
    if (e == node.e) return node;
    else if (e < node.e) return this.getNodeRecursion(node.left, e);
    else if (e > node.e) return this.getNodeRecursion(node.right, e);
  };

  this.initNodeColor = function () {
    this.initNodeColorRecursion(this.root);
  };

  this.initNodeColorRecursion = function (node) {
    if (node) {
      this.initNodeColorRecursion(node.left);
      this.initNodeColorRecursion(node.right);
      node.isCheck = false;
    }
  };

  this.removeMin = function () {
    this.root = this.removeMinRecursion(this.root);
  };
  this.removeMinRecursion = function (node) {
    if (node == null) return null;
    if (node.left == null) {
      return node.right;
    }
    node.left = this.removeMinRecursion(node.left);
    console.log(node.left);
    return node;
  };

  this.removeMax = function () {
    this.removeMaxRecursion(this.root);
  };
  this.removeMaxRecursion = function (node) {
    if (node == null) return null;
    if (node.right == null) {
      return node.left;
    }
    node.right = this.removeMaxRecursion(node.right);
    return node;
  };

  this.remove = function (e) {
    this.root = this.removeRecursion(this.root, e);
  };

  this.removeRecursion = function (node, e) {
    if (node == null) return null;
    if (e < node.e) {
      node.left = this.removeRecursion(node.left, e);
      return node;
    }
    if (e > node.e) {
      node.right = this.removeRecursion(node.right, e);
      return node;
    }
    if (node.left == null) {
      return node.right;
    } else if (node.right == null) {
      return node.left;
    }

    let itemNode = this.getMinRecursion(node.right); //17
    itemNode.right = this.removeMinRecursion(node.right);
    itemNode.left = node.left;
    return itemNode;
  };

  //前序遍历
  this.preOrder = function (canDom) {
    this.initNodeColor();
    this.time = 0;
    this.render(canDom);
    this.preOrderRecusion(canDom, this.root);
  };

  this.preOrderRecusion = function (canDom, node) {
    if (node) {
      node.isCheck = true;
      let newRoot = this.copyTree(this.root);
      setTimeout(() => {
        this.renderByRoot(canDom, newRoot);
      }, 1000 * ++this.time);
      this.preOrderRecusion(canDom, node.left);
      this.preOrderRecusion(canDom, node.right);
    }
  };

  //中序遍历
  this.inOrder = function (canDom) {
    this.initNodeColor();
    this.time = 0;
    this.render(canDom);
    this.inOrderRecusion(canDom, this.root);
  };

  this.inOrderRecusion = function (canDom, node) {
    if (node) {
      this.inOrderRecusion(canDom, node.left);
      node.isCheck = true;
      let newRoot = this.copyTree(this.root);
      setTimeout(() => {
        this.renderByRoot(canDom, newRoot);
      }, 1000 * ++this.time);
      this.inOrderRecusion(canDom, node.right);
    }
  };
  
  //后序遍历
  this.postOrder = function (canDom) {
    this.initNodeColor();
    this.time = 0;
    this.render(canDom);
    this.inOrderRecusion(canDom, this.root);
  };

  this.postOrderRecusion = function (canDom, node) {
    if (node) {
      this.postOrderRecusion(canDom, node.left);
      this.postOrderRecusion(canDom, node.right);
      node.isCheck = true;
      let newRoot = this.copyTree(this.root);
      setTimeout(() => {
        this.renderByRoot(canDom, newRoot);
      }, 1000 * ++this.time);
    }
  };

  this.copyTree = function (root) {
    let newRoot = new Node(root.e);
    newRoot.isCheck = root.isCheck;
    this.copyTreeRecursion(root, newRoot);
    return newRoot;
  };

  this.copyTreeRecursion = function (node, newRoot) {
    if (node.left) {
      newRoot.left = new Node(node.left.e);
      newRoot.left.isCheck = node.left.isCheck;
      this.copyTreeRecursion(node.left, newRoot.left);
    }
    if (node.right) {
      newRoot.right = new Node(node.right.e);
      newRoot.right.isCheck = node.right.isCheck;
      this.copyTreeRecursion(node.right, newRoot.right);
    }
  };
}

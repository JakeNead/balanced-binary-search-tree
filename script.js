class Node {
  constructor(d, left = null, right = null) {
    this.data = d;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(arr) {
    this.root = this.buildTree(this.sortedArr(arr));
  }

  sortedArr = (arr) => [...new Set(arr.sort((a, b) => a - b))];

  buildTree(arr, start = 0, end = arr.length - 1) {
    if (start > end) return null;
    const mid = Math.floor((start + end) / 2);
    const root = new Node(arr[mid]);

    root.left = this.buildTree(arr, start, mid - 1);
    root.right = this.buildTree(arr, mid + 1, end);

    return root;
  }

  insert(data, node = this.root) {
    if (node === null) node = new Node(data);
    else if (node.data === data) return;
    else if (node.data > data) {
      if (node.left === null) {
        return (node.left = new Node(data));
      }
      this.insert(data, node.left);
    } else if (node.data < data) {
      if (node.right === null) {
        return (node.right = new Node(data));
      }
      this.insert(data, node.right);
    }
  }

  delete(data, node = this.root) {
    if (node === null) return null;
    if (data < node.data) {
      node.left = this.delete(data, node.left);
      return node;
    } else if (data > node.data) {
      node.right = this.delete(data, node.right);
      return node;
    }
    if (node.left === null && node.right === null) {
      return null;
    }
    // one child case
    if (node.left === null) return node.right;
    if (node.right === null) return node.left;

    // two children case
    let tempNode = node.right;
    while (tempNode.left !== null) {
      tempNode = tempNode.left;
    }
    node.data = tempNode.data;
    console.log(tempNode.data);
    node.right = this.delete(tempNode.data, node.right);
    return node;
  }

  find(val, node = this.root) {
    let result;
    if (val === node.data) return node;
    else if (val < node.data) {
      result = this.find(val, node.left);
    } else if (val > node.data) {
      result = this.find(val, node.right);
    }
    return result;
  }

  levelOrder(callback) {
    if (this.root === null) return;
    const arr = [];
    const queue = [this.root];
    while (queue.length > 0) {
      if (callback != undefined) arr.push(callback(queue[0].data));
      else arr.push(queue[0].data);
      if (queue[0].left !== null) queue.push(queue[0].left);
      if (queue[0].right !== null) queue.push(queue[0].right);
      queue.shift();
    }
    return arr;
  }

  preorder(callback, node = this.root, arr = []) {
    if (node === null) return;
    if (callback) {
      arr.push(callback(node.data));
    } else arr.push(node.data);
    this.preorder(callback, node.left, arr);
    this.preorder(callback, node.right, arr);
    return arr;
  }

  inorder(callback, node = this.root, arr = []) {
    if (node === null) return;
    this.preorder(callback, node.left, arr);

    if (callback) {
      arr.push(callback(callback, node.data));
    } else arr.push(node.data);

    this.preorder(callback, node.right, arr);

    return arr;
  }

  postorder(callback, node = this.root, arr = []) {
    if (node === null) return;
    this.preorder(callback, node.left, arr);
    this.preorder(callback, node.right, arr);
    if (callback !== undefined) {
      arr.push(callback(node.data));
    } else arr.push(node.data);
    return arr;
  }

  height(val, node = this.root) {
    if (node === null) return -1;
    if (val === node.data) return this.heightFromNode(node);
    else if (val < node.data) return this.height(val, node.left);
    else if (val > node.data) return this.height(val, node.right);
  }

  heightFromNode(node = this.root) {
    if (node === null) return -1;

    const leftHeight = this.heightFromNode(node.left);
    const rightHeight = this.heightFromNode(node.right);

    return Math.max(leftHeight, rightHeight) + 1;
  }

  depth(val, node = this.root, num = 0) {
    if (node === null) return "error";
    else if (val === node.data) return num;
    else if (val < node.data) return this.depth(val, node.left, (num += 1));
    else if (val > node.data) return this.depth(val, node.right, (num += 1));
  }

  isBalanced(node = this.root) {
    if (node === null) return true;
    let left = this.heightFromNode(node.left);
    let right = this.heightFromNode(node.right);
    return (
      Math.abs(left - right) <= 1 &&
      this.isBalanced(node.left) == true &&
      this.isBalanced(node.right) == true
    );
  }

  rebalance() {
    this.root = this.buildTree(this.preorder());
  }
}

function prettyPrint(node, prefix = "", isLeft = true) {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
}

function randomNumbers() {
  const arr = [];
  for (let i = 0; i < 100; i++) {
    arr.push(Math.floor(Math.random() * 100));
  }
  return arr;
}

function randomBigNumbers() {
  const arr = [];
  for (let i = 0; i < 15; i++) {
    arr.push(Math.floor(Math.random() * 100 + 100));
  }
  return arr;
}

function showOffBST() {
  const tree = new Tree(randomNumbers());

  console.log("Tree is balanced?", tree.isBalanced());
  console.log(
    "preorder",
    tree.preorder(),
    "inorder",
    tree.inorder(),
    "postorder",
    tree.postorder()
  );
  randomBigNumbers().forEach((n) => tree.insert(n));
  console.log("Tree is balanced?", tree.isBalanced());
  tree.rebalance();
  console.log("Tree is balanced?", tree.isBalanced());
  prettyPrint(tree.root);
}

showOffBST();

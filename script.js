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
    node.right = this.delete(tempNode.data, node.right);
    return node;
  }
}

const tree = new Tree([
  1, 1, 1, 7, 4, 23, 8, 9, 2, 3, 5, 17, 90, 67, 6345, 324,
]);
// tree.insert(6);
tree.delete(8);
console.log(tree);
prettyPrint(tree.root);

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

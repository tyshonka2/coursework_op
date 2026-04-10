export class TreeNode {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

export function insert(node, value) {
    if (!node) return new TreeNode(value);
    if (value < node.value) node.left = insert(node.left, value);
    else node.right = insert(node.right, value);
    return node;
}

export function traverse(node, result = []) {
    if (!node) return result;
    
    traverse(node.left, result);
    result.push(node.value); 
    traverse(node.right, result);
    
    return result;
}
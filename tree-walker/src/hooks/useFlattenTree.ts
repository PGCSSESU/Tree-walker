import type {TreeNode } from "../types/tree";

export type FlatNode = TreeNode & {
  level: number;
  hasChildren: boolean;
};

export function flattenTree(
  nodes: TreeNode[],
  expanded: Set<string>
): FlatNode[] {
  const map = new Map<number | null, TreeNode[]>();

  nodes.forEach((node) => {
    if (!map.has(node.parentId)) {
      map.set(node.parentId, []);
    }
    map.get(node.parentId)!.push(node);
  });

  const result: FlatNode[] = [];

  function walk(parentId: number | null, level: number) {
    const children = map.get(parentId) || [];

    for (const node of children) {
      const numericId = Number(node.id);
      const hasChildren = map.has(numericId);

      result.push({ ...node, level, hasChildren });

      if (expanded.has(node.id)) {
        walk(numericId, level + 1);
      }
    }
  }

  walk(null, 0);
  return result;
}

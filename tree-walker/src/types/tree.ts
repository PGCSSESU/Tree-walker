export type TreeNode = {
  id: string;
  name: string;
  parentId: number | null;
  type: "folder" | "file";
};

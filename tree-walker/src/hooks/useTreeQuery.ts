import { useQuery } from "@tanstack/react-query";
import { fetchNodes } from "../lib/api";
import type { TreeNode } from "../types/tree";

export function useTreeQuery() {
  return useQuery<TreeNode[]>({
    queryKey: ["tree-nodes"],
    queryFn: fetchNodes,
    staleTime: 1000 * 60 * 5,
  });
}

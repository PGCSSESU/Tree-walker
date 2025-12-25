import {
  ChevronRight,
  ChevronDown,
  Folder,
  FolderOpen,
  FileCode,
  FileCode2,
  Image,
  Video,
} from "lucide-react";
import type { FlatNode } from "../hooks/useFlattenTree";
import { cn } from "../lib/utils";

type Props = {
  node: FlatNode;
  expanded: boolean;
  toggle: () => void;
  active: boolean; 
};

function getFolderColor(name: string) {
  const n = name.toLowerCase();
  if (n.includes("src")) return "text-blue-600";
  if (n.includes("component")) return "text-yellow-600";
  if (n.includes("asset") || n.includes("media")) return "text-purple-600";
  if (n.includes("hook")) return "text-green-600";
  return "text-gray-700";
}

function getFileIcon(name: string, active: boolean) {
  const base = "h-4 w-4";

  if (active) {
    return <FileCode2 className={cn(base, "text-blue-600")} />;
  }

  if (name.endsWith(".js"))
    return <FileCode className={cn(base, "text-yellow-600")} />;
  if (name.endsWith(".ts"))
    return <FileCode className={cn(base, "text-blue-600")} />;
  if (name.endsWith(".jsx"))
    return <FileCode className={cn(base, "text-cyan-600")} />;
  if (name.endsWith(".tsx"))
    return <FileCode className={cn(base, "text-sky-600")} />;
  if (name.match(/\.(png|jpg|jpeg|webp)$/))
    return <Image className={cn(base, "text-pink-600")} />;

  return <Video className={cn(base, "text-green-600")} />;
}

export function TreeRow({ node, expanded, toggle, active }: Props) {
  const isFolder = node.type === "folder";

  return (
    <div
      onClick={isFolder ? toggle : undefined}
      className={cn(
        "group flex items-center h-8 rounded px-2 text-sm",
        "cursor-pointer select-none transition-colors ",
        active
          ? "bg-blue-50 text-blue-700 font-medium"
          : "hover:bg-gray-100"
      )}
      style={{ paddingLeft: node.level * 16 }}
    >
      {isFolder ? (
        <span className="mr-1 text-gray-500 group-hover:text-gray-700">
          {expanded ? (
            <ChevronDown className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </span>
      ) : (
        <span className="mr-1 w-4" />
      )}

      <span className="mr-2">
        {isFolder ? (
          expanded ? (
            <FolderOpen
              className={cn("h-4 w-4", getFolderColor(node.name))}
            />
          ) : (
            <Folder
              className={cn("h-4 w-4", getFolderColor(node.name))}
            />
          )
        ) : (
          getFileIcon(node.name, active)
        )}
      </span>
      <span className="truncate">
        {node.name} 
      </span>
    </div>
  );
}

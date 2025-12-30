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
  if (n.includes("src")) return "text-emerald-600";
  if (n.includes("component")) return "text-lime-600";
  if (n.includes("hook")) return "text-green-600";
  if (n.includes("asset") || n.includes("media")) return "text-purple-600";
  return "text-slate-600";
}

function getFileIcon(name: string, active: boolean) {
  const base = "h-4 w-4";

  if (active) {
    return <FileCode2 className={cn(base, "text-emerald-600")} />;
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
        "group flex items-center h-8 px-2 rounded-md text-sm",
        "cursor-pointer select-none",
        "transition-colors duration-150",
        active
          ? `
              bg-white
              text-emerald-700
              ring-1 ring-emerald-300
              shadow-[0_0_12px_rgba(16,185,129,0.18)]
            `
          : "text-slate-700 hover:bg-emerald-50"
      )}
      style={{ paddingLeft: node.level * 16 }}
    >
      {/* Chevron */}
      {isFolder ? (
        <span
          className={cn(
            "mr-1 transition-colors",
            active
              ? "text-emerald-600"
              : "text-slate-400 group-hover:text-emerald-600"
          )}
        >
          {expanded ? (
            <ChevronDown className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </span>
      ) : (
        <span className="mr-1 w-4" />
      )}

      {/* Icon */}
      <span className="mr-2 flex items-center">
        {isFolder ? (
          expanded ? (
            <FolderOpen
              className={cn(
                "h-4 w-4 transition-colors",
                active ? "text-emerald-600" : getFolderColor(node.name)
              )}
            />
          ) : (
            <Folder
              className={cn(
                "h-4 w-4 transition-colors",
                active ? "text-emerald-600" : getFolderColor(node.name)
              )}
            />
          )
        ) : (
          getFileIcon(node.name, active)
        )}
      </span>

      {/* Name */}
      <span
        className={cn(
          "truncate",
          active ? "text-emerald-700" : "text-slate-700"
        )}
      >
        {node.name}
      </span>
    </div>
  );
}

import { useRef, useState } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useTreeQuery } from "../hooks/useTreeQuery";
import { flattenTree } from "../hooks/useFlattenTree";
import { TreeRow } from "../components/TreeRow";

export function Tree() {
  const parentRef = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  const { data = [], isLoading, isError } = useTreeQuery();
  const flat = flattenTree(data, expanded);

  const rowVirtualizer = useVirtualizer({
    count: flat.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 40,
    overscan: 5,
  });

  if (isLoading) return <p>Loading tree…</p>;
  if (isError) return <p>Failed to load tree</p>;

  return (
    <div
  ref={parentRef}
  className="
    h-[520px]
    overflow-auto
    rounded-md
    border-2
    border-black
    bg-white
    px-1
    py-1
  "
>
      <div
        style={{
          height: rowVirtualizer.getTotalSize(),
          position: "relative",
        }}
      >
        {rowVirtualizer.getVirtualItems().map((row) => {
          const node = flat[row.index];

          return (
            <div
              key={node.id}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                transform: `translateY(${row.start}px)`,
              }}
            >
              <TreeRow
                node={node}
                expanded={expanded.has(node.id)}
                toggle={() => setExpanded((prev) => {
                  const next = new Set(prev);
                  next.has(node.id)
                    ? next.delete(node.id)
                    : next.add(node.id);
                  return next;
                })} active={false}              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

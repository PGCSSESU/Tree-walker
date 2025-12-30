import { useRef, useState } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useTreeQuery } from "../hooks/useTreeQuery";
import { flattenTree } from "../hooks/useFlattenTree";
import { TreeRow } from "../components/TreeRow";
import type { FlatNode } from "../hooks/useFlattenTree";

export function Tree() {
  const parentRef = useRef<HTMLDivElement | null>(null);
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  const { data = [], isLoading, isError } = useTreeQuery();
  const flat: FlatNode[] = flattenTree(data, expanded);

  const rowVirtualizer = useVirtualizer({
    count: flat.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 32,
    overscan: 6,
  });

  if (isLoading) {
    return (
      <div className="h-[520px] rounded-xl bg-emerald-50 flex items-center justify-center">
        <span className="text-sm text-emerald-700">Loading files…</span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="h-[520px] rounded-xl bg-emerald-50 flex items-center justify-center">
        <span className="text-sm text-red-600">Failed to load tree</span>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-emerald-50 p-3">
      {/* White surface */}
      <div
        ref={parentRef}
        className="
          h-[520px]
          overflow-auto
          rounded-xl
          bg-white
          border border-emerald-200
          shadow-[0_0_30px_rgba(16,185,129,0.15)]
          px-1 py-1
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
                className="will-change-transform"
              >
                <TreeRow
                  node={node}
                  expanded={expanded.has(node.id)}
                  toggle={() => {
                    setExpanded((prev) => {
                      const next = new Set(prev);
                      next.has(node.id)
                        ? next.delete(node.id)
                        : next.add(node.id);
                      return next;
                    });
                  }}
                  active={false}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

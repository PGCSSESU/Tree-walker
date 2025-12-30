import { Tree } from "./components/Tree";

export default function App() {
  return (
    <div className="min-h-screen bg-emerald-50">
      <div className="max-w-xl mx-auto px-6 py-10">
        {/* Header */}
        <header className="mb-6 text-center">
          <h1
            className="
              text-4xl md:text-5xl font-extrabold
              text-emerald-800
              tracking-tight
            "
          >
            Tree Walker
          </h1>

          <p className="mt-2 text-sm text-emerald-700/80">
            Navigate and explore your project structure
          </p>

          {/* Subtle divider */}
          <div className="mt-4 mx-auto h-[2px] w-16 rounded-full bg-emerald-300" />
        </header>

        {/* Tree */}
        <Tree />
      </div>
    </div>
  );
}

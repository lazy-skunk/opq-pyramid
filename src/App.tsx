import { useState } from "react";

import reactLogo from "./assets/react.svg";

function App() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");

  return (
    <div className="bg-background text-foreground flex min-h-screen flex-col">
      <header className="flex items-center justify-between px-6 py-4">
        <h1 className="text-lg font-semibold">
          <a href="#">web-app-template</a>
        </h1>
        <nav>
          <ul className="flex gap-4 text-sm">
            <li>
              <a
                href="https://www.google.com/"
                target="_blank"
                className="visited:text-purple-500 hover:underline"
              >
                Google
              </a>
            </li>

            <li>
              <a href="#" className="hover:underline">
                Dummy
              </a>
            </li>
          </ul>
        </nav>
      </header>

      <main className="flex flex-1 flex-col items-center justify-center gap-6 p-8">
        <div className="bg-foreground/3 w-full max-w-sm rounded p-4">
          <label htmlFor="name" className="mb-2 block text-sm font-medium">
            Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Enter your name"
            className="bg-foreground/3 w-full rounded px-3 py-2"
          />
          {name && <p className="text-foreground/50 mt-2 text-sm">Hello, {name}!</p>}
        </div>

        <div className="bg-foreground/3 w-full max-w-sm rounded p-4">
          <label htmlFor="category" className="mb-2 block text-sm font-medium">
            Category
          </label>
          <select
            id="category"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            className="bg-foreground/3 w-full rounded px-3 py-2"
          >
            <option value="" disabled hidden>
              Select a category
            </option>
            <option value="Option1" className="bg-background text-foreground">
              Option1
            </option>
            <option value="Option2" className="bg-background text-foreground">
              Option2
            </option>
            <option value="Option3" className="bg-background text-foreground">
              Option3
            </option>
          </select>
          {category && <p className="text-foreground/50 mt-2 text-sm">Hello, {category}!</p>}
        </div>

        <div className="bg-foreground/3 flex w-full max-w-sm flex-wrap items-center gap-2 rounded p-4">
          <button
            type="button"
            className="cursor-pointer rounded bg-green-100 px-4 py-2 text-sm font-medium text-green-900 motion-safe:transition motion-safe:active:translate-y-px dark:bg-green-900 dark:text-green-100"
            onClick={() => setCount((count) => count + 1)}
          >
            Add React icon
          </button>

          <button
            type="button"
            disabled={count === 0}
            className="disabled:bg-foreground/3 disabled:text-foreground/50 dark:disabled:bg-foreground/3 dark:disabled:text-foreground/50 cursor-pointer rounded bg-red-100 px-4 py-2 text-sm font-medium text-red-900 disabled:cursor-not-allowed disabled:active:translate-y-0 motion-safe:transition motion-safe:active:translate-y-px dark:bg-red-900 dark:text-red-100"
            onClick={() => setCount(0)}
          >
            Reset
          </button>

          <p role="status" className="text-sm">
            Count: {count}
          </p>

          <div className="flex w-full flex-wrap gap-2">
            {Array.from({ length: count }, (_, index) => (
              <img
                key={index}
                src={reactLogo}
                alt=""
                className="size-8 motion-safe:transition motion-safe:starting:opacity-0"
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;

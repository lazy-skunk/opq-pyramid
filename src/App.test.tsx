import { renderToStaticMarkup } from "react-dom/server";
import { expect, test } from "vite-plus/test";

import App from "./App";

test("renders the application", () => {
  const markup = renderToStaticMarkup(<App />);

  expect(markup).toContain("web-app-template");
});

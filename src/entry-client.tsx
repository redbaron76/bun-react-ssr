import App, { type SSProps } from "@/App";
import { hydrateRoot } from "react-dom/client";

declare global {
  interface Window {
    __INITIAL_DATA__: SSProps;
  }
}

// set in window.__INITIAL_DATA__ by HTML template
const initialData = window.__INITIAL_DATA__ as SSProps;

const root = document.getElementById("root")!;

hydrateRoot(root, <App data={initialData} />);

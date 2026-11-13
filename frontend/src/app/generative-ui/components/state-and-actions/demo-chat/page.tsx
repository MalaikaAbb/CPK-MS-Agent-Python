"use client";

import { DemoFrame } from "@/components/demo-frame";

import { GenUIDemo } from "../../_shared/genui-demo";
import { shopUI as functionsUI } from "./functions-catalog";
import { shopUI as stateUI } from "./state-catalog";

/**
 * State and actions: the page's two complete catalogs, each given to the
 * provider as `generativeUI={{ ui }}`. Only the components the page names but
 * never defines are added; the cart (`Cart`, `cart`, `CartState`,
 * `CartActions`), the `events` / `writable` fragments and the function
 * declarations are not filled in (see the route page).
 */
export default function DemoPage() {
  return (
    <DemoFrame parentPath="/generative-ui/components/state-and-actions" subtitle="state · functions · agent: /components (MS Agent Framework)">
      <GenUIDemo
        variants={[
          {
            id: "state",
            label: "Show live app state (bind)",
            note: "No CartState is mounted (it needs an undefined cart), so the cart state is never set and inCart cannot be bound.",
            generativeUI: { ui: stateUI },
            welcome: "Try: show a product card for p1 Trail Runner.",
          },
          {
            id: "functions",
            label: "Run your code on a click",
            note: "No CartActions is mounted (it needs an undefined cart), so Add to cart returns the function's error, shown by the page's own ProductCard.",
            generativeUI: { ui: functionsUI },
            welcome: "Try: show a product card for p1 Trail Runner.",
          },
        ]}
      />
    </DemoFrame>
  );
}

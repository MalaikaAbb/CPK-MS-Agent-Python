"use client";

// "Run your code on a click" from
// https://docs.copilotkit.ai/ms-agent-python/generative-ui/components/state-and-actions,
// as published: the catalog (app/catalog.tsx) and the `ProductCard` that calls
// the event. The page prints them as separate snippets with partial imports;
// `z` and `createGenerativeUI` are supplied by the marked lines.
//
// Not here: the page's `CartActions`, which handles `addToCart` with
// `useGenerativeUIFunction`. It needs a `Cart` type and a `cart` instance that
// the page never defines, so no handler is mounted and a click returns the
// function's error, which the page's own `ProductCard` shows in its alert.
import { z } from "zod"; // Repo-authored import.
import { createGenerativeUI } from "@copilotkit/react-core/v2/generative-ui"; // Repo-authored import.

// --- page snippet: the catalog ---
export const shopUI = createGenerativeUI({
  id: "acme/shop@1",
  functions: {
    addToCart: {
      description: "Add a product to the cart",
      parameters: z.object({ productId: z.string(), quantity: z.number().default(1) }),
    },
  },
  components: {
    ProductCard: {
      component: ProductCard,
      props: z.object({ productId: z.string(), name: z.string() }),
      events: { onAddToCart: {} },
    },
  },
});

// --- page snippet: the component ---
import { useState } from "react";
import type { GenerativeUIComponentProps } from "@copilotkit/react-core/v2/generative-ui";

function ProductCard({ productId, name, onAddToCart }: GenerativeUIComponentProps<typeof shopUI, "ProductCard">) {
  const [error, setError] = useState<string>();
  return (
    <article>
      <h4>{name}</h4>
      <button
        onClick={async () => {
          const result = await onAddToCart?.({ productId });
          if (result) setError(result.ok ? undefined : result.error.message);
        }}
      >
        Add to cart
      </button>
      {error ? <p role="alert">{error}</p> : null}
    </article>
  );
}

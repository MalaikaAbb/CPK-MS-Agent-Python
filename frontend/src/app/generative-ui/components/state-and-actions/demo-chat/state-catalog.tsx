"use client";

// "Show live app state" (app/catalog.tsx) from
// https://docs.copilotkit.ai/ms-agent-python/generative-ui/components/state-and-actions,
// as published. The snippet uses `z` and `createGenerativeUI` without importing
// them (the two marked import lines), and registers a `ProductCard` it never
// defines (the component below, defined here — the only thing added).
//
// Not here: the page's `CartState`, which publishes the cart with
// `useGenerativeUIState`. It needs a `Cart` type and a `cart` instance that the
// page never defines, so it is not mounted and the `cart` state is never set.
import { z } from "zod"; // Repo-authored import.
import {
  createGenerativeUI,
  type GenerativeUIComponentProps,
} from "@copilotkit/react-core/v2/generative-ui"; // Repo-authored import.

/**
 * Defined here: the page registers `ProductCard` in this catalog and never
 * defines it. Minimal: shows the props the catalog declares.
 */
function ProductCard({ productId, name, inCart }: GenerativeUIComponentProps<typeof shopUI, "ProductCard">) {
  return (
    <article className="rounded-lg border border-slate-200 p-3 text-sm dark:border-slate-700">
      <h4 className="font-medium">{name}</h4>
      <p className="text-xs text-slate-500">{productId}</p>
      <p className="text-xs">In cart: {inCart}</p>
    </article>
  );
}

// --- page snippet ---
const cartSchema = z.object({
  items: z.array(z.object({ productId: z.string(), quantity: z.number() })),
});

export const shopUI = createGenerativeUI({
  id: "acme/shop@1",
  state: { cart: cartSchema },
  components: {
    ProductCard: {
      component: ProductCard,
      props: z.object({ productId: z.string(), name: z.string(), inCart: z.number() }),
      bind: {
        inCart: (state, { productId }) =>
          state.cart.items.find((item) => item.productId === productId)?.quantity ?? 0,
      },
    },
  },
});

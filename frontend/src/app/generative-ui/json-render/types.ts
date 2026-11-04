export type SalesStage = "prospect" | "qualified" | "proposal" | "negotiation" | "closed-won";

export interface JsonRenderSpec {
  root: string;
  elements: Record<
    string,
    {
      type: string;
      props?: Record<string, unknown>;
      children?: string[];
    }
  >;
}


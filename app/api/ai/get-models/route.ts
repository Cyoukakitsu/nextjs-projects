import { NextResponse } from "next/server";

type OpenRouterModel = {
  id: string;
  name: string;
  description?: string;
  context_length?: number;
  architecture?: {
    modality?: string;
    tokenizer?: string;
    instruct_type?: string;
  };
  pricing?: {
    prompt?: string;
    completion?: string;
  };
  top_provider?: {
    max_completion_tokens?: number;
    is_moderated?: boolean;
  };
};

export async function GET() {
  try {
    const response = await fetch("https://openrouter.ai/api/v1/models", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const data = await response.json();

    const freeModels = data.data.filter((model: OpenRouterModel) => {
      const promptPrice = parseFloat(model.pricing?.prompt || "0");
      const completionPrice = parseFloat(model.pricing?.completion || "0");
      return promptPrice === 0 && completionPrice === 0;
    });

    const formattedModels = freeModels.map((model: OpenRouterModel) => {
      return {
        id: model.id,
        name: model.name,
        description: model.description,
        context_length: model.context_length,
        architecture: model.architecture,
        pricing: model.pricing,
        top_provider: model.top_provider,
      };
    });

    return NextResponse.json({ models: formattedModels });
  } catch (error) {
    console.error("Error fetching models:", error);
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error ? error.message : "Failed to fetch models",
      },
      { status: 500 },
    );
  }
}

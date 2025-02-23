export interface BrainstormRequest {
  category: string;
  list_of: string;
  context?: string;
  examples?: string;
}

export interface BrainstormResponse {
  ideas: string[];
}

export const getBrainstormingIdeas = async (data: BrainstormRequest): Promise<BrainstormResponse> => {
  try {
    const response = await fetch('/api/brainstorming', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      console.error('Response status:', response.status);
      console.error('Response text:', await response.text());
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('API call failed:', error);
    throw error;
  }
};

export interface RewriteRequest {
  selectedText: string;
  rewriteType: "shorter" | "longer" | "more_descriptive" | "more_intense" | "custom";
  customPrompt?: string;
}

export interface RewriteResponse {
  rewritten_text: string;
}

export const getRewrittenText = async (data: RewriteRequest): Promise<RewriteResponse> => {
  try {
    const response = await fetch("/api/rewrite", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      console.error("Rewrite response status:", response.status);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Rewrite API call failed:", error);
    throw error;
  }
};
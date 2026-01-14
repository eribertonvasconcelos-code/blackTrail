
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

export const searchTrails = async (location: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Liste as melhores trilhas de moto off-road em ${location}. Descreva o nível de dificuldade, distância aproximada e o que esperar do terreno.`,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    return {
      text: response.text,
      sources: response.candidates?.[0]?.groundingMetadata?.groundingChunks || []
    };
  } catch (error) {
    console.error("Error searching trails:", error);
    throw error;
  }
};

export const findNearbyPlaces = async (lat: number, lng: number, query: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-lite-latest",
      contents: `Encontre ${query} próximos à minha localização atual para um trilheiro de moto.`,
      config: {
        tools: [{ googleMaps: {} }],
        toolConfig: {
          retrievalConfig: {
            latLng: {
              latitude: lat,
              longitude: lng
            }
          }
        }
      },
    });

    return {
      text: response.text,
      places: response.candidates?.[0]?.groundingMetadata?.groundingChunks || []
    };
  } catch (error) {
    console.error("Error finding nearby places:", error);
    throw error;
  }
};

export const getMaintenanceAdvice = async (issue: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: `Sou um trilheiro de moto e estou com o seguinte problema mecânico: ${issue}. Explique como resolver passo a passo, quais ferramentas precisarei e se é seguro continuar a trilha.`,
      config: {
        thinkingConfig: { thinkingBudget: 4000 }
      }
    });

    return response.text;
  } catch (error) {
    console.error("Error getting maintenance advice:", error);
    throw error;
  }
};

export const generateChecklist = async (type: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Gere uma lista de verificação (checklist) completa para uma trilha de moto do tipo: ${type}. Inclua equipamentos de segurança, ferramentas essenciais e itens de sobrevivência.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              label: { type: Type.STRING },
              category: { type: Type.STRING },
            },
            required: ["label", "category"]
          }
        }
      }
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error("Error generating checklist:", error);
    return [];
  }
};

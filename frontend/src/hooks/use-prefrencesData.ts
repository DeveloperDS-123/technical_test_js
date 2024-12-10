import api from "@/services/api";

export const userPreferencesApi = {
    savePreferences: async (data: {
      user_id: string;
      preferences: string[];
    }) => {
      try {
        const response = await api.post('/recommendations', data);
        return response.data;
      } catch (error) {
        throw error;
      }
    }
  };
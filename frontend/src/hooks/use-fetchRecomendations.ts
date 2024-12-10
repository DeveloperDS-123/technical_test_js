import api from "@/services/api";

// New function specifically for fetching recommendations
export const fetchRecommendations = async (userId: string) => {
    try {
      const response = await api.get(`/users/${userId}/recommendations`);
      console.log("data",response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  };
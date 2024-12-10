export type Preference = {
  id: number;
  name: string;
  values: string[];
};

export type UserPreferencePayload = {
  user_id: string;
  preferences: string[];
};

 export type SearchBarProps =  {
  searchUserId: string;
  setSearchUserId: (value: string) => void;
  onSearch: () => void;
}

export interface Recommendation {
  recommendations: string[];
}

export interface RecommendationCardProps {
  recommendation: string;
}
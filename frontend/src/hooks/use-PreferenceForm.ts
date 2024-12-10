import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from "@/hooks/use-toast";
import { PREFERENCES } from '@/constant/constant';
import { userPreferencesApi } from './use-prefrencesData';

export const usePreferenceForm = () => {
  const [userId, setUserId] = useState('');
  const [selectedPreference, setSelectedPreference] = useState('');
  const [preferenceValues, setPreferenceValues] = useState<string[]>(['', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handlePreferenceChange = (value: string) => {
    setSelectedPreference(value);
    const selected = PREFERENCES.find(pref => pref.name === value);
    setPreferenceValues(selected ? selected.values : ['', '', '']);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userId.trim()) {
      toast({
        title: "Error",
        description: "User ID is required",
        variant: "destructive",
      });
      return;
    }

    if (!selectedPreference) {
      toast({
        title: "Error",
        description: "Please select a preference",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      await userPreferencesApi.savePreferences({
        user_id: userId,
        preferences: preferenceValues,
      });

      toast({
        title: "Success",
        description: "Preferences saved successfully!",
      });

      router.push(`/recommendations/${userId}`);
    } catch (error) {
      toast({
        title: "Error",
        description: "Unable to generate recommendations at this time. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    userId,
    setUserId,
    selectedPreference,
    preferenceValues,
    isLoading,
    handlePreferenceChange,
    handleSubmit,
  };
}; 
'use client'

import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'next/navigation';
import { LoadingSkeleton } from '@/components/recommendations/LoadingSkeleton';
import { RecommendationCard } from '@/components/recommendations/RecommendationCard';
import { SearchBar } from '@/components/recommendations/SearchBar';
import { Recommendation } from '@/types/types';
import { fetchRecommendations } from '@/hooks/use-fetchRecomendations';

export default function RecommendationsPage() {
    // Extract userId from URL parameters using Next.js useParams hook
    const { userId } = useParams();

    const [state, setState] = useState({
        data: undefined as Recommendation | undefined,
        isLoading: true,
        error: null as Error | null,
        searchUserId: "",
        displayUserId: userId
    });

    // Fetches recommendation data for a given user ID
    const fetchRecommendationsData = useCallback(async (id: string) => {
        // Set loading state and clear any previous errors
        setState(prev => ({ ...prev, isLoading: true, error: null }));

        try {
            // Attempt to fetch recommendations
            const data = await fetchRecommendations(id);
            if (data) {
                // Update state with fetched data and reset loading state
                setState(prev => ({
                    ...prev,
                    data,
                    displayUserId: id,
                    isLoading: false
                }));
            } else {
                throw new Error("No recommendations found");
            }
        } catch (err) {
            // Handle any errors by updating error state and clearing data
            setState(prev => ({
                ...prev,
                error: err as Error,
                data: undefined,
                isLoading: false
            }));
        }
    }, []);

    // Effect hook to fetch recommendations when component mounts or userId changes
    useEffect(() => {
        if (userId) {
            fetchRecommendationsData(userId as string);
        }
    }, [userId, fetchRecommendationsData]);

    // Handler for search button click Only triggers if searchUserId is not empty
    const handleSearch = useCallback(() => {
        if (state.searchUserId.trim()) {
            fetchRecommendationsData(state.searchUserId);
        }
    }, [state.searchUserId, fetchRecommendationsData]);

    // Handler for search input changes Updates searchUserId in state as user types
    const handleSearchInputChange = (value: string) => {
        setState(prev => ({ ...prev, searchUserId: value }));
    };

    return (
        <div className="container mx-auto p-8 min-h-screen ">
            <h1 className="text-3xl font-bold text-center mb-6 text-primary">
                Personalized Recommendations
            </h1>

            {/* Search component for looking up different users */}
            <SearchBar
                searchUserId={state.searchUserId}
                setSearchUserId={handleSearchInputChange}
                onSearch={handleSearch}
            />
            
            {/* Recommendations display grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {state.isLoading ? (
                    //  Show loading skeleton while fetching
                    <LoadingSkeleton />
                ) : state.error ? (
                    //  Show error message if there's an error
                    <div className="col-span-full flex justify-center items-center">
                        <div className="text-center w-full p-8 rounded-lg shadow-lg">
                            <h1 className="text-primary font-semibold">No user found</h1>
                        </div>
                    </div>
                ) : state.data && state.data.recommendations.length > 0 ? (
                    <>
                        {/* Show recommendations if data exists */}
                        <h2 className="col-span-full text-xl font-semibold mb-6 p-4 shadow-md bg-white/50 backdrop-blur-sm rounded-lg border border-primary/10 text-center">
                            Recommendations for user: <span className="text-primary">{state.displayUserId}</span>
                        </h2>
                        {state.data.recommendations.map((rec, index) => (
                            <RecommendationCard key={index} recommendation={rec} />
                        ))}
                    </>
                ) : (
                    //  Show "No recommendations" message if no data
                    <div className="col-span-full flex justify-center items-center">
                        <div className="text-center p-8  w-fullrounded-lg shadow-lg">
                            <h1 className="text-primary font-semibold">No recommendations found</h1>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
} 
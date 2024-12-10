'use client'
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from '@/components/ui/input';
import { Recommendation } from '@/types/types';
import { fetchRecommendations } from '@/hooks/use-fetchRecomendations';

export default function RecommendationsPage() {
    const [data, setData] = useState<Recommendation>();
    const [noUser, setNoUser] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const [userId, setUserId] = useState("");
    const [displayUserId, setDisplayUserId] = useState("");

    const loadRecommendations = async () => {
        setNoUser(true);
        setError(null);
        try {
            const data = await fetchRecommendations(userId);
            if (data) {
                setData(data);
            } else {
                setData(undefined);
                console.error("Fetched data is not an array:", data);
            }
        } catch (err) {
            setError(err as Error);
        } finally {
            setNoUser(false);
        }
    };

    const handleClick = async () => {
        if (userId.trim()) {
            setNoUser(true);
            setError(null);
            try {
                const newData = await fetchRecommendations(userId);
                if (newData) {
                    setData(newData);
                    setDisplayUserId(userId);
                } else {
                    setData(undefined);
                    console.error("Fetched data is not an array:", newData);
                }
            } catch (err) {
                setError(err as Error);
            } finally {
                setNoUser(false);
            }
        }
    };

    return (
        <div className="container mx-auto  p-8 min-h-screen">
            <h1 className="text-3xl font-bold text-center mb-6 text-primary">Personalized Recommendations</h1>
            <div className="mb-6 flex justify-center gap-2 max-w-sm mx-auto">
                <Input
                    type="text"
                    placeholder="Enter user ID"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    className="border-primary focus:border-primary"
                />
                <button
                    onClick={handleClick}
                    className="px-4 py-2 bg-primary text-white rounded "
                >
                    Search
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {noUser ? (
                    <div className="col-span-full text-center text-gray-500">
                        No recommendations available
                    </div>
                ) : error ? (
                    <div className="col-span-full flex justify-center items-center">
                        <div className="text-center p-8  w-fullrounded-lg shadow-lg">
                            <h1 className="text-primary font-semibold">No user found</h1>
                        </div>
                    </div>
                ) : data && data.recommendations.length > 0 ? (
                    <>
                        <h2 className="col-span-full text-xl font-semibold mb-6 p-4 shadow-md bg-white/50 backdrop-blur-sm rounded-lg border border-primary/10 text-center">
                            Recommendations for user: <span className="text-primary">{displayUserId}</span>
                        </h2>
                        {data.recommendations.map((rec, index) => (
                            <Card
                                key={index}
                                className="shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-1 bg-white/50 backdrop-blur-sm border border-primary/10"
                            >
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-sm text-primary/60">Recommendation</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-gray-700 font-medium">{String(rec)}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </>
                ) : (
                    <div className="col-span-full flex justify-center items-center">
                    <div className="text-center p-8  w-fullrounded-lg shadow-lg">
                        <h1 className="text-primary font-semibold">No recommendations available</h1>
                    </div>
                </div>
                )}
            </div>
        </div>
    );
} 
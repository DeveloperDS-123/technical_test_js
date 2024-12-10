import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RecommendationCardProps } from "@/types/types";



export const RecommendationCard = ({ recommendation }: RecommendationCardProps) => (
    <Card
    className="shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-1 bg-white/50 backdrop-blur-sm border border-primary/10"
>
    <CardHeader className="pb-2">
        <CardTitle className="text-sm text-primary/60">Recommendation</CardTitle>
    </CardHeader>
    <CardContent>
        <p className="text-gray-700 font-medium">{recommendation}</p>
    </CardContent>
</Card>
); 
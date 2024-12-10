'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Toaster } from '@/components/ui/toaster'
import { PREFERENCES } from "@/constant/constant"
import { usePreferenceForm } from "@/hooks/use-PreferenceForm"

export default function Home() {
  const {
    userId,
    setUserId,
    preferenceValues,
    isLoading,
    handlePreferenceChange,
    handleSubmit,
  } = usePreferenceForm();

  return (
    <div className="container mx-auto p-8 min-h-screen overflow-hidden">
      <Card className="w-full max-w-md mx-auto shadow-lg">
        <CardHeader className="bg-primary">
          <CardTitle className="text-white text-2xl">Add Recommendations</CardTitle>
        </CardHeader>
        <CardContent className="mt-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="userId">User ID</Label>
              <Input
                id="userId"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                placeholder="Enter user ID"
                className="border-primary focus:border-primary"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="preference">Preference</Label>
              <Select onValueChange={handlePreferenceChange}>
                <SelectTrigger className="border-primary focus:border-primary">
                  <SelectValue placeholder="Select a preference" />
                </SelectTrigger>
                <SelectContent>
                  {PREFERENCES.map((pref) => (
                    <SelectItem key={pref.id} value={pref.name}>
                      {pref.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {preferenceValues.map((value, index) => (
              <div key={index} >
                <Label htmlFor={`value${index + 1}`}>Value {index + 1}</Label>
                {isLoading ? (
                  <Skeleton className="h-10 w-full" />
                ) : (
                  <Input
                    id={`value${index + 1}`}
                    value={value}
                    readOnly
                    placeholder={`Preference value ${index + 1}`}
                    className="bg-gray-100"
                  />
                )}
              </div>
            ))}
          </form>
        </CardContent>
        <CardFooter>
          <Button 
            type="submit" 
            className="w-full transition-all duration-300" 
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? 'Saving...' : 'Submit'}
          </Button>
        </CardFooter>
      </Card>
      <Toaster />
    </div>
  )
}


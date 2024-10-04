'use client'

import { useState, useEffect } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Progress } from "@/components/ui/progress"
import { ThumbsUp, Plus } from 'lucide-react'
import { useToast } from "@/components/ui/use-toast"
import { useLocalStorage } from 'react-use';

// Add this function at the top of your file, outside the component
function isHebrew(text: string) {
  return /[\u0590-\u05FF]/.test(text);
}

export default function AdviceShare() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("career")
  const [advice, setAdvice] = useState("")
  const [allAdvice, setAllAdvice] = useState<Array<{ id: string; category: string; text: string; likes: number; date: string }>>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)  // Add this line
  const [likedAdvice, setLikedAdvice] = useLocalStorage<string[]>('likedAdvice', []);
  const { toast } = useToast()

  const categories = ["Career", "Relationships", "Health", "Finance", "Personal Growth"]

  useEffect(() => {
    fetchAdvice();
  }, []);  // eslint-disable-line react-hooks/exhaustive-deps

  const fetchAdvice = async () => {
    try {
      const response = await fetch('/api/get-advice');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log('Fetched advice:', data);
      if (Array.isArray(data)) {
        setAllAdvice(data);
      } else if (data.error) {
        throw new Error(data.error);
      } else {
        throw new Error('Unexpected data format');
      }
    } catch (error) {
      console.error('Error fetching advice:', error);
      toast({
        title: "Error",
        description: "Failed to fetch advice. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleSubmitAdvice = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    console.log('Starting submission process');
    try {
      console.log('Sending request to /api/share-advice');
      const response = await fetch('/api/share-advice', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ category: selectedCategory, advice }),
      });

      console.log('Response received, status:', response.status);
      const data = await response.json();
      console.log('Response data:', data);

      if (!response.ok) {
        throw new Error(data.message || 'Failed to submit advice');
      }

      console.log('Updating local state');
      setAllAdvice(prevAdvice => [data.advice, ...prevAdvice]);

      toast({
        title: "Success",
        description: "Your advice has been shared successfully!",
      });

      console.log('Resetting form');
      setAdvice("");
      setSelectedCategory("career");

      console.log('Closing dialog');
      setIsDialogOpen(false);
    } catch (error) {
      console.error('Error submitting advice:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to submit advice. Please try again.",
        variant: "destructive",
      });
    } finally {
      console.log('Setting isSubmitting to false');
      setIsSubmitting(false);
    }
  };

  const handleLike = async (adviceId: string) => {
    if (!adviceId) {
      console.error('Invalid advice ID');
      toast({
        title: "Error",
        description: "Invalid advice ID. Please try again.",
        variant: "destructive",
      });
      return;
    }

    try {
      const isLiked = likedAdvice?.includes(adviceId) || false;
      const response = await fetch(`/api/like-advice/${adviceId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ unlike: isLiked }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update like');
      }

      const data = await response.json();

      // Update local state
      setAllAdvice(prevAdvice => 
        prevAdvice.map(advice => 
          advice.id === adviceId ? { ...advice, likes: data.likes } : advice
        )
      );

      // Update liked advice in local storage
      if (isLiked) {
        setLikedAdvice(prev => (prev ? prev.filter(id => id !== adviceId) : []));
      } else {
        setLikedAdvice(prev => (prev ? [...prev, adviceId] : [adviceId]));
      }

      toast({
        title: "Success",
        description: isLiked ? "You unliked this advice!" : "You liked this advice!",
      });
    } catch (error) {
      console.error('Error updating like:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to update like. Please try again.",
        variant: "destructive",
      });
    }
  }

  const handleTestSubmit = async () => {
    try {
      const response = await fetch('/api/test-submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ test: true })
      });
      const data = await response.json();
      console.log('Test submit response:', data);
      if (data.success) {
        toast({
          title: "Test Success",
          description: "Test advice submitted successfully!",
        });
        fetchAdvice(); // Refresh the advice list
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error('Error in test submit:', error);
      toast({
        title: "Test Error",
        description: error instanceof Error ? error.message : "Failed to submit test advice.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto p-4 bg-gradient-to-b from-purple-50 to-blue-50 min-h-screen">
      <nav className="mb-8 bg-white shadow-md rounded-lg p-4">
        <ul className="flex space-x-4">
          <li><a href="#" className="text-purple-600 hover:text-purple-800 transition-colors duration-200">Home</a></li>
          <li><a href="#" className="text-purple-600 hover:text-purple-800 transition-colors duration-200">Categories</a></li>
          <li><a href="#" className="text-purple-600 hover:text-purple-800 transition-colors duration-200">Top Advice</a></li>
          <li><a href="#" className="text-purple-600 hover:text-purple-800 transition-colors duration-200">About</a></li>
        </ul>
      </nav>

      <header className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-2 text-purple-800 animate-pulse">AdviceShare</h1>
        <p className="text-xl text-gray-600">Share wisdom, gain insights</p>
      </header>

      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-4 text-purple-700">Featured Advice</h2>
        <Carousel className="w-full max-w-xs mx-auto">
          <CarouselContent>
            {allAdvice
              .sort((a, b) => b.likes - a.likes)
              .slice(0, 3)
              .map((advice) => (
                <CarouselItem key={advice.id}>
                  <Card className="bg-gradient-to-br from-purple-100 to-blue-100 hover:from-purple-200 hover:to-blue-200 transition-all duration-300 transform hover:scale-105">
                    <CardHeader>
                      <CardTitle className="text-purple-700">{advice.category}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className={`text-gray-700 leading-relaxed ${
                        isHebrew(advice.text) 
                          ? 'font-cafe text-2xl' 
                          : 'font-caveat text-3xl font-bold'
                      }`}>
                        {advice.text}
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className={`bg-white hover:bg-purple-100 text-purple-700 border-purple-300 hover:border-purple-500 transition-all duration-200 ${likedAdvice?.includes(advice.id) ? 'bg-purple-200' : ''}`}
                        onClick={() => handleLike(advice.id)}
                      >
                        <ThumbsUp className={`mr-2 h-4 w-4 ${likedAdvice?.includes(advice.id) ? 'fill-purple-700' : ''}`} /> {advice.likes}
                      </Button>
                    </CardFooter>
                  </Card>
                </CarouselItem>
              ))}
          </CarouselContent>
          <CarouselPrevious className="bg-purple-500 hover:bg-purple-600 text-white" />
          <CarouselNext className="bg-purple-500 hover:bg-purple-600 text-white" />
        </Carousel>
      </section>

      <section className="mb-12">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-3xl font-semibold text-purple-700">Browse Advice</h2>
          <div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-green-500 hover:bg-green-600 text-white transition-colors duration-200">
                  <Plus className="mr-2 h-4 w-4" /> Share Advice
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-gradient-to-br from-purple-50 to-blue-50">
                <DialogHeader>
                  <DialogTitle className="text-purple-700">Share Your Advice</DialogTitle>
                  <DialogDescription>
                    Share your wisdom in 50 words or less. Choose a category or create a new one.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmitAdvice}>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <label htmlFor="category" className="text-right text-purple-700">
                        Category
                      </label>
                      <Select onValueChange={(value) => setSelectedCategory(value)}>
                        <SelectTrigger className="col-span-3 border-purple-300 focus:ring-purple-500">
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category} value={category.toLowerCase()}>{category}</SelectItem>
                          ))}
                          <SelectItem value="new">
                            <span className="flex items-center">
                              <Plus className="mr-2 h-4 w-4" /> Create New Category
                            </span>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    {selectedCategory === 'new' && (
                      <div className="grid grid-cols-4 items-center gap-4">
                        <label htmlFor="newCategory" className="text-right text-purple-700">
                          New Category
                        </label>
                        <Input id="newCategory" className="col-span-3 border-purple-300 focus:ring-purple-500" />
                      </div>
                    )}
                    <div className="grid grid-cols-4 items-center gap-4">
                      <label htmlFor="advice" className="text-right text-purple-700">
                        Your Advice
                      </label>
                      <Textarea 
                        id="advice" 
                        className="col-span-3 border-purple-300 focus:ring-purple-500" 
                        maxLength={50}
                        value={advice}
                        onChange={(e) => setAdvice(e.target.value)}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button type="submit" disabled={false} className="bg-green-500 hover:bg-green-600 text-white transition-all duration-200">
                            {isSubmitting ? (
                              <>
                                <Progress value={33} className="w-16 mr-2" />
                                Submitting...
                              </>
                            ) : (
                              'Submit Advice'
                            )}
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Share your wisdom with the community!</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
            <Button 
              onClick={handleTestSubmit} 
              className="ml-2 bg-blue-500 hover:bg-blue-600 text-white transition-colors duration-200"
            >
              Test Submit
            </Button>
          </div>
        </div>

        <Tabs defaultValue="career" className="w-full">
          <TabsList className="grid w-full grid-cols-5 bg-purple-100">
            {categories.map((category) => (
              <TabsTrigger 
                key={category} 
                value={category.toLowerCase()}
                className="data-[state=active]:bg-purple-500 data-[state=active]:text-white hover:bg-purple-200 transition-colors duration-200"
              >
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
          {categories.map((category) => (
            <TabsContent key={category} value={category.toLowerCase()}>
              <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="text-purple-700">{category} Advice</CardTitle>
                  <CardDescription>Wisdom shared by the community</CardDescription>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger className="text-purple-600 hover:text-purple-800">Most Liked</AccordionTrigger>
                      <AccordionContent>
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead className="text-purple-700">Advice</TableHead>
                              <TableHead className="text-purple-700">Likes</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {allAdvice
                              .filter(advice => advice.category.toLowerCase() === category.toLowerCase())
                              .sort((a, b) => b.likes - a.likes)
                              .slice(0, 5)
                              .map((advice) => (
                                <TableRow key={advice.id} className="hover:bg-purple-50 transition-colors duration-200">
                                  <TableCell>{advice.text}</TableCell>
                                  <TableCell>{advice.likes}</TableCell>
                                </TableRow>
                              ))
                            }
                          </TableBody>
                        </Table>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                      <AccordionTrigger className="text-purple-600 hover:text-purple-800">Recent</AccordionTrigger>
                      <AccordionContent>
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead className="text-purple-700">Advice</TableHead>
                              <TableHead className="text-purple-700">Date</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {allAdvice
                              .filter(advice => advice.category.toLowerCase() === category.toLowerCase())
                              .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                              .slice(0, 5)
                              .map((advice) => (
                                <TableRow key={advice.id} className="hover:bg-purple-50 transition-colors duration-200">
                                  <TableCell>{advice.text}</TableCell>
                                  <TableCell>{new Date(advice.date).toLocaleDateString()}</TableCell>
                                </TableRow>
                              ))
                            }
                          </TableBody>
                        </Table>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </section>

      <footer className="text-center text-gray-500 mt-8 p-4 bg-white rounded-lg shadow-md">
        <p>&copy; 2023 AdviceShare. All rights reserved.</p>
      </footer>
    </div>
  )
}
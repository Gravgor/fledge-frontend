'use client'

import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { motion } from 'framer-motion'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/hooks/use-toast'
import { Star, Wifi, Car, Utensils } from 'lucide-react'

const schema = z.object({
  destination: z.string().min(3, { message: 'Destination is required' }),
  checkIn: z.date(),
  checkOut: z.date(),
  guests: z.number().min(1, { message: 'At least 1 guest is required' }),
})

export default function HotelsPage() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [searchResults, setSearchResults] = useState([])

  const { register, handleSubmit, control, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      guests: 1,
    },
  })

  const onSubmit = async (data: z.infer<typeof schema>) => {
    setIsLoading(true)
    try {
      // Simulating API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      setSearchResults([
        { id: 1, name: 'Luxury Resort & Spa', location: data.destination, price: 299, rating: 4.8 },
        { id: 2, name: 'City Center Hotel', location: data.destination, price: 199, rating: 4.5 },
        { id: 3, name: 'Beachfront Paradise', location: data.destination, price: 349, rating: 4.9 },
      ])
      toast({
        title: 'Search completed',
        description: 'Found 3 hotels matching your criteria.',
      })
    } catch (error) {
      toast({
        title: 'Search failed',
        description: 'An error occurred while searching for hotels. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-6">Find Your Perfect Stay</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div>
            <Label htmlFor="destination">Destination</Label>
            <Input id="destination" {...register('destination')} placeholder="Where are you going?" />
            {errors.destination && <p className="text-red-500 text-sm mt-1">{errors.destination.message}</p>}
          </div>
          <div>
            <Label htmlFor="checkIn">Check-in Date</Label>
            <Controller
              name="checkIn"
              control={control}
              render={({ field }) => (
                <DatePicker
                  id="checkIn"
                  selected={field.value}
                  onChange={(date) => field.onChange(date)}
                  className="w-full p-2 border rounded"
                  placeholderText="Select check-in date"
                />
              )}
            />
            {errors.checkIn && <p className="text-red-500 text-sm mt-1">{errors.checkIn.message}</p>}
          </div>
          <div>
            <Label htmlFor="checkOut">Check-out Date</Label>
            <Controller
              name="checkOut"
              control={control}
              render={({ field }) => (
                <DatePicker
                  id="checkOut"
                  selected={field.value}
                  onChange={(date) => field.onChange(date)}
                  className="w-full p-2 border rounded"
                  placeholderText="Select check-out date"
                />
              )}
            />
            {errors.checkOut && <p className="text-red-500 text-sm mt-1">{errors.checkOut.message}</p>}
          </div>
          <div>
            <Label htmlFor="guests">Guests</Label>
            <Input id="guests" type="number" {...register('guests', { valueAsNumber: true })} min={1} />
            {errors.guests && <p className="text-red-500 text-sm mt-1">{errors.guests.message}</p>}
          </div>
          <div className="md:col-span-2 lg:col-span-4">
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Searching...' : 'Search Hotels'}
            </Button>
          </div>
        </form>
      </motion.div>

      {searchResults.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold mb-4">Search Results</h2>
          <div className="grid gap-6">
            {searchResults.map((hotel: any) => (
              <motion.div
                key={hotel.id}
                className="bg-card text-card-foreground p-6 rounded-lg shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                  <div>
                    <h3 className="text-xl font-semibold">{hotel.name}</h3>
                    
                    <p className="text-muted-foreground">{hotel.location}</p>
                    <div className="flex items-center mt-2">
                      {Array.from({ length: Math.floor(hotel.rating) }).map((_, index) => (
                        <Star key={index} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                      <span className="ml-2 text-sm">{hotel.rating.toFixed(1)}</span>
                    </div>
                  </div>
                  <div className="mt-4 md:mt-0">
                    <p className="text-2xl font-bold">${hotel.price}<span className="text-sm font-normal">/night</span></p>
                    <Button className="mt-2">Book Now</Button>
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-4">
                  <div className="flex items-center">
                    <Wifi className="w-4 h-4 mr-2" />
                    <span>Free WiFi</span>
                  </div>
                  <div className="flex items-center">
                    <Car className="w-4 h-4 mr-2" />
                    <span>Parking Available</span>
                  </div>
                  <div className="flex items-center">
                    <Utensils className="w-4 h-4 mr-2" />
                    <span>Restaurant</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  )
}
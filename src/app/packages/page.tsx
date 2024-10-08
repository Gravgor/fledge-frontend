'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/hooks/use-toast'
import { Plane, Hotel, Car, Utensils, MapPin } from 'lucide-react'

export default function PackagesPage() {
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState('')
  const [packages, setPackages] = useState([
    {
      id: 1,
      name: 'Tropical Paradise Getaway',
      destination: 'Bali, Indonesia',
      duration: '7 days',
      price: 1299,
      image: '/placeholder.svg?height=200&width=300',
      includes: ['Flight', 'Hotel', 'Meals', 'Activities'],
    },
    {
      id: 2,
      name: 'European Adventure',
      destination: 'Multiple Cities, Europe',
      duration: '14 days',
      price: 2499,
      image: '/placeholder.svg?height=200&width=300',
      includes: ['Flights', 'Hotels', 'Train Passes', 'Some Meals'],
    },
    {
      id: 3,
      name: 'City Explorer Package',
      destination: 'New York City, USA',
      duration: '5 days',
      price: 999,
      image: '/placeholder.svg?height=200&width=300',
      includes: ['Flight', 'Hotel', 'City Pass', 'Airport Transfer'],
    },
  ])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const filteredPackages = packages.filter(pkg =>
      pkg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pkg.destination.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setPackages(filteredPackages)
    toast({
      title: 'Search completed',
      description: `Found ${filteredPackages.length} packages matching your criteria.`,
    })
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-6">Discover Vacation Packages</h1>
        <form onSubmit={handleSearch} className="flex gap-4 mb-8">
          <div className="flex-grow">
            <Label htmlFor="search" className="sr-only">Search Packages</Label>
            <Input
              id="search"
              type="text"
              placeholder="Search by destination or package name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button type="submit">Search</Button>
        </form>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {packages.map((pkg, index) => (
          <motion.div
            key={pkg.id}
            className="bg-card text-card-foreground rounded-lg shadow-lg overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <img src={pkg.image} alt={pkg.name} className="w-full h-48 object-cover" />
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{pkg.name}</h3>
              <p className="text-muted-foreground mb-4 flex items-center">
                <MapPin className="w-4 h-4 mr-2" />
                {pkg.destination}
              </p>
              <p className="font-semibold mb-4">{pkg.duration}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {pkg.includes.map((item, i) => (
                  <span key={i} className="bg-primary/10 text-primary px-2 py-1 rounded-full text-sm">
                    {item}
                  </span>
                ))}
              </div>
              <div className="flex justify-between items-center">
                <p className="text-2xl font-bold">${pkg.price}</p>
                <Button>Book Now</Button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
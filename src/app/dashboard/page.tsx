'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useApp } from '@/context/AppContext'

export default function Dashboard() {
  const { user } = useApp()
  const [recentSearches, setRecentSearches] = useState([])
  const [upcomingTrips, setUpcomingTrips] = useState([])
  const [recommendations, setRecommendations] = useState([])

  useEffect(() => {
    const fetchDashboardData = async () => {
      const searches = await getRecentSearches(user.id)
      const trips = await getUpcomingTrips(user.id)
      const recs = await getRecommendations(user.id)

      setRecentSearches(searches)
      setUpcomingTrips(trips)
      setRecommendations(recs)
    }

    fetchDashboardData()
  }, [user.id])

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Welcome back, {user.name}!</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Recent Searches</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {recentSearches.map((search: any) => (
                  <li key={search.id}>{search.query}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Trips</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {upcomingTrips.map((trip: any) => (
                  <li key={trip.id}>{trip.destination} - {trip.date}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Recommended for You</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {recommendations.map((rec: any) => (
                  <li key={rec.id}>{rec.name}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mt-8"
      >
        <Button onClick={() => {}}>Plan a New Trip</Button>
      </motion.div>
    </div>
  )
}
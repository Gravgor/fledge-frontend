'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/hooks/use-toast'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

const profileSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
})

const preferencesSchema = z.object({
  preferredAirline: z.string().optional(),
  seatPreference: z.enum(['window', 'aisle', 'middle']).optional(),
  mealPreference: z.string().optional(),
})

export default function ProfilePage() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const profileForm = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+1 234 567 8900',
    },
  })

  const preferencesForm = useForm({
    resolver: zodResolver(preferencesSchema),
    defaultValues: {
      preferredAirline: 'Any',
      seatPreference: 'window',
      mealPreference: 'No preference',
    },
  })

  const onProfileSubmit = async (data: z.infer<typeof profileSchema>) => {
    setIsLoading(true)
    try {
      // Simulating API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      toast({
        title: 'Profile updated',
        description: 'Your profile has been successfully updated.',
      })
    } catch (error) {
      toast({
        title: 'Update failed',
        description: 'An error occurred while updating your profile. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const onPreferencesSubmit = async (data: z.infer<typeof preferencesSchema>) => {
    setIsLoading(true)
    try {
      // Simulating API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      toast({
        title: 'Preferences updated',
        description: 'Your travel preferences have been successfully updated.',
      })
    } catch (error) {
      toast({
        title: 'Update failed',
        description: 'An error occurred while updating your preferences. Please try again.',
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
        <h1 className="text-3xl font-bold mb-6">Your Profile</h1>
        <div className="flex items-center mb-8">
          <Avatar className="w-24 h-24 mr-6">
            <AvatarImage src="/placeholder-user.jpg" alt="Profile picture" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-2xl font-semibold">John Doe</h2>
            <p className="text-muted-foreground">Member since 2023</p>
          </div>
        </div>

        <Tabs defaultValue="profile" className="space-y-4">
          <TabsList>
            <TabsTrigger value="profile">Profile Information</TabsTrigger>
            <TabsTrigger value="preferences">Travel Preferences</TabsTrigger>
          </TabsList>
          <TabsContent value="profile">
            <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input id="name" {...profileForm.register('name')} />
                {profileForm.formState.errors.name && (
                  <p className="text-red-500 text-sm mt-1">{profileForm.formState.errors.name.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" {...profileForm.register('email')} />
                {profileForm.formState.errors.email && (
                  <p className="text-red-500 text-sm mt-1">{profileForm.formState.errors.email.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" {...profileForm.register('phone')} />
              </div>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Updating...' : 'Update Profile'}
              </Button>
            </form>
          </TabsContent>
          <TabsContent value="preferences">
            <form onSubmit={preferencesForm.handleSubmit(onPreferencesSubmit)} className="space-y-4">
              <div>
                <Label htmlFor="preferredAirline">Preferred Airline</Label>
                <Input id="preferredAirline" {...preferencesForm.register('preferredAirline')} />
              </div>
              <div>
                <Label htmlFor="seatPreference">Seat Preference</Label>
                <select
                  id="seatPreference"
                  {...preferencesForm.register('seatPreference')}
                  className="w-full p-2 border rounded"
                >
                  <option value="window">Window</option>
                  <option value="aisle">Aisle</option>
                  <option value="middle">Middle</option>
                </select>
              </div>
              <div>
                <Label htmlFor="mealPreference">Meal Preference</Label>
                <Input id="mealPreference" {...preferencesForm.register('mealPreference')} />
              </div>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Updating...' : 'Update Preferences'}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  )
}
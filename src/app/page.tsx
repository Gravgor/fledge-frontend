"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Plane,
  Hotel,
  Package,
  Car,
  Search,
  Calendar as CalendarIcon,
  MapPin,
  Users,
  Star,
  Globe,
  Shield,
  HeadphonesIcon,
  Heart,
  Info,
  Loader2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

// Mock data for countries and cities
const countriesData = [
  {
    id: "fr",
    name: "France",
    landmark:
      "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=500&q=60",
    price: 299,
  },
  {
    id: "it",
    name: "Italy",
    landmark:
      "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?auto=format&fit=crop&w=500&q=60",
    price: 349,
  },
  {
    id: "jp",
    name: "Japan",
    landmark:
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=500&q=60",
    price: 799,
  },
  {
    id: "us",
    name: "United States",
    landmark:
      "https://images.unsplash.com/photo-1485738422979-f5c462d49f74?auto=format&fit=crop&w=500&q=60",
    price: 499,
  },
  {
    id: "au",
    name: "Australia",
    landmark:
      "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=500&q=60",
    price: 899,
  },
];

const citiesData = {
  fr: [
    {
      id: "paris",
      name: "Paris",
      landmark:
        "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=500&q=60",
      price: 299,
    },
    {
      id: "nice",
      name: "Nice",
      landmark:
        "https://images.unsplash.com/photo-1491166617655-3921dde1d8d6?auto=format&fit=crop&w=500&q=60",
      price: 249,
    },
  ],
  it: [
    {
      id: "rome",
      name: "Rome",
      landmark:
        "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?auto=format&fit=crop&w=500&q=60",
      price: 349,
    },
    {
      id: "venice",
      name: "Venice",
      landmark:
        "https://images.unsplash.com/photo-1514890547357-a9ee288728e0?auto=format&fit=crop&w=500&q=60",
      price: 299,
    },
  ],
  jp: [
    {
      id: "tokyo",
      name: "Tokyo",
      landmark:
        "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=500&q=60",
      price: 799,
    },
    {
      id: "kyoto",
      name: "Kyoto",
      landmark:
        "https://images.unsplash.com/photo-1493780474015-ba834fd0ce2f?auto=format&fit=crop&w=500&q=60",
      price: 749,
    },
  ],
  us: [
    {
      id: "nyc",
      name: "New York City",
      landmark:
        "https://images.unsplash.com/photo-1485738422979-f5c462d49f74?auto=format&fit=crop&w=500&q=60",
      price: 499,
    },
    {
      id: "sf",
      name: "San Francisco",
      landmark:
        "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=500&q=60",
      price: 449,
    },
  ],
  au: [
    {
      id: "sydney",
      name: "Sydney",
      landmark:
        "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=500&q=60",
      price: 899,
    },
    {
      id: "melbourne",
      name: "Melbourne",
      landmark:
        "https://images.unsplash.com/photo-1514395462725-fb4566210144?auto=format&fit=crop&w=500&q=60",
      price: 849,
    },
  ],
};

// Mock flight data
const flightsData = {
  paris: [
    {
      id: 1,
      airline: "Air France",
      logo: "https://logos-world.net/wp-content/uploads/2020/03/Air-France-Logo.png",
      departureTime: "06:05",
      arrivalTime: "12:30",
      duration: "6 godz. 25 min",
      stops: [{ airport: "CDG", duration: "1 przesiadka" }],
      price: 1345,
      co2Info: "6 procent mniej ekwiwalentu CO₂ niż typowy lot na tej trasie",
    },
    {
      id: 2,
      airline: "Lufthansa",
      logo: "https://logos-world.net/wp-content/uploads/2020/03/Lufthansa-Logo.png",
      departureTime: "14:05",
      arrivalTime: "22:30",
      duration: "8 godz. 25 min",
      stops: [{ airport: "FRA", duration: "1 przesiadka" }],
      price: 1245,
    },
  ],
  rome: [
    {
      id: 3,
      airline: "Alitalia",
      logo: "https://logos-world.net/wp-content/uploads/2020/03/Alitalia-Logo.png",
      departureTime: "07:30",
      arrivalTime: "13:45",
      duration: "6 godz. 15 min",
      stops: [],
      price: 1450,
      co2Info: "4 procent mniej ekwiwalentu CO₂ niż typowy lot na tej trasie",
    },
    {
      id: 4,
      airline: "Ryanair",
      logo: "https://logos-world.net/wp-content/uploads/2020/03/Ryanair-Logo.png",
      departureTime: "16:20",
      arrivalTime: "23:10",
      duration: "6 godz. 50 min",
      stops: [{ airport: "BGY", duration: "1 przesiadka" }],
      price: 1150,
    },
  ],
};

const hotelsData = [
  {
    id: 1,
    name: "Grand Hotel",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=500&q=60",
    price: 200,
    rating: 4.5,
    location: "City Center",
    amenities: ["Free Wi-Fi", "Pool", "Spa"],
  },
  {
    id: 2,
    name: "Cozy Apartment",
    image:
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=500&q=60",
    price: 120,
    rating: 4.2,
    location: "Downtown",
    amenities: ["Kitchen", "Washer", "Balcony"],
  },
];

const searchSchema = z.object({
  type: z.enum(["flights", "hotels", "packages", "cars"]),
  origin: z.string().min(2, "Origin is required"),
  destination: z.string().min(2, "Destination is required"),
  dateRange: z.object({
    from: z.date(),
    to: z.date().optional(),
  }),
  passengers: z.number().min(1, "At least one passenger is required"),
  class: z.enum(["economy", "business", "first"]).optional(),
  rooms: z.number().min(1, "At least one room is required").optional(),
  carType: z.enum(["economy", "compact", "midsize", "luxury"]).optional(),
});

type SearchFormData = z.infer<typeof searchSchema>;

export default function Component() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("flights");
  const [showCountries, setShowCountries] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [userLocation, setUserLocation] = useState<string>("");
  const [nearbyAirports, setNearbyAirports] = useState<string[]>([]);
  const resultsRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<SearchFormData>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      type: "flights",
      origin: "",
      destination: "",
      dateRange: {
        from: new Date(),
        to: new Date(new Date().setDate(new Date().getDate() + 7)),
      },
      passengers: 1,
      class: "economy",
      rooms: 1,
      carType: "economy",
    },
  });

  const destination = watch("destination");
  const type = watch("type");
  const origin = watch("origin");

  useEffect(() => {
    if (type === "flights" && destination.toLowerCase() === "anywhere") {
      setShowCountries(true);
      setSelectedCountry(null);
      setSelectedCity(null);
    } else if (destination === "") {
      setShowCountries(false);
      setSelectedCountry(null);
      setSelectedCity(null);
    } else {
      const country = countriesData.find(
        (c) => c.name.toLowerCase() === destination.toLowerCase()
      );
      if (country) {
        setSelectedCountry(country.id);
        setShowCountries(false);
        setSelectedCity(null);
      } else {
        setShowCountries(false);
        setSelectedCountry(null);
        setSelectedCity(null);
      }
    }
  }, [destination, type]);

  useEffect(() => {
    // Simulated geolocation
    const getLocation = () => {
      setIsLoading(true);
      setTimeout(() => {
        setUserLocation("Warsaw");
        setNearbyAirports(["WAW", "WMI", "RWA"]);
        setValue("origin", "Warsaw");
        setIsLoading(false);
      }, 1000);
    };

    getLocation();
  }, [setValue]);

  const onSubmit = async (data: SearchFormData) => {
    setIsLoading(true);
    try {
      // Simulating API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      if (data.type === "flights" && selectedCity) {
        setSearchResults(
          flightsData[selectedCity as keyof typeof flightsData] || []
        );
      } else if (data.type === "hotels") {
        setSearchResults(hotelsData);
      }
      toast({
        title: "Search completed",
        description: `Found results for ${data.destination}.`,
      });
    } catch (error) {
      toast({
        title: "Search failed",
        description: "An error occurred while searching. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  const handleCountryClick = (countryId: string) => {
    setSelectedCountry(countryId);
    setShowCountries(false);
  };

  const handleCityClick = (cityId: string) => {
    setSelectedCity(cityId);
    setValue(
      "destination",
      citiesData[selectedCountry as keyof typeof citiesData].find(
        (city) => city.id === cityId
      )?.name || ""
    );
    // Simulate flight search for the selected city
    setSearchResults(flightsData[cityId as keyof typeof flightsData] || []);
  };

  useEffect(() => {
    if (showCountries || selectedCountry || searchResults.length > 0) {
      resultsRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [showCountries, selectedCountry, searchResults]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <main className="container mx-auto px-4 py-12">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-blue-600">
            Discover Your Next Adventure
          </h1>
          <p className="text-xl mb-8 text-gray-600">
            Uncover amazing destinations, luxurious stays, and unforgettable
            experiences.
          </p>
        </motion.section>

        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="bg-white shadow-lg rounded-lg p-6 mb-16"
        >
          <Tabs
            defaultValue="flights"
            className="w-full"
            onValueChange={handleTabChange}
          >
            <TabsList className="grid w-full grid-cols-4 mb-6">
              <TabsTrigger value="flights">
                <Plane className="mr-2 h-4 w-4" /> Flights
              </TabsTrigger>
              <TabsTrigger value="hotels">
                <Hotel className="mr-2 h-4 w-4" /> Hotels
              </TabsTrigger>
              <TabsTrigger value="packages">
                <Package className="mr-2 h-4 w-4" /> Packages
              </TabsTrigger>
              <TabsTrigger value="cars">
                <Car className="mr-2 h-4 w-4" /> Cars
              </TabsTrigger>
            </TabsList>
            <TabsContent value="flights">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4"
              >
                <input type="hidden" {...register("type")} value="flights" />
                <div className="md:col-span-2">
                  <Label htmlFor="origin">Origin</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input
                      id="origin"
                      {...register("origin")}
                      placeholder="From where?"
                      className="pl-10"
                    />
                  </div>
                  {errors.origin && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.origin.message}
                    </p>
                  )}
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="destination">Destination</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input
                      id="destination"
                      {...register("destination")}
                      placeholder="Where to? (or type 'Anywhere')"
                      className="pl-10"
                    />
                  </div>
                  {errors.destination && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.destination.message}
                    </p>
                  )}
                </div>
                <div className="md:col-span-2">
                  <Label>Date Range</Label>
                  <Controller
                    control={control}
                    name="dateRange"
                    render={({ field }) => (
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {field.value?.from ? (
                              field.value.to ? (
                                <>
                                  {format(field.value.from, "LLL dd, y")} -{" "}
                                  {format(field.value.to, "LLL dd, y")}
                                </>
                              ) : (
                                format(field.value.from, "LLL dd, y")
                              )
                            ) : (
                              <span>Pick a date</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            initialFocus
                            mode="range"
                            defaultMonth={field.value?.from}
                            selected={field.value}
                            onSelect={field.onChange}
                            numberOfMonths={2}
                          />
                        </PopoverContent>
                      </Popover>
                    )}
                  />
                </div>
                <div>
                  <Label htmlFor="passengers">Travelers</Label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input
                      id="passengers"
                      type="number"
                      {...register("passengers", { valueAsNumber: true })}
                      className="pl-10"
                      min={1}
                    />
                  </div>
                  {errors.passengers && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.passengers.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="class">Class</Label>
                  <Controller
                    name="class"
                    control={control}
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select class" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="economy">Economy</SelectItem>
                          <SelectItem value="business">Business</SelectItem>
                          <SelectItem value="first">First</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
                <div className="md:col-span-2 lg:col-span-6">
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Searching..." : "Search Flights"}
                  </Button>
                </div>
              </form>
            </TabsContent>
            <TabsContent value="hotels">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4"
              >
                <input type="hidden" {...register("type")} value="hotels" />
                <div className="md:col-span-2">
                  <Label htmlFor="destination">Destination</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input
                      id="destination"
                      {...register("destination")}
                      placeholder="Where to?"
                      className="pl-10"
                    />
                  </div>
                  {errors.destination && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.destination.message}
                    </p>
                  )}
                </div>
                <div className="md:col-span-2">
                  <Label>Date Range</Label>
                  <Controller
                    control={control}
                    name="dateRange"
                    render={({ field }) => (
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {field.value?.from ? (
                              field.value.to ? (
                                <>
                                  {format(field.value.from, "LLL dd, y")} -{" "}
                                  {format(field.value.to, "LLL dd, y")}
                                </>
                              ) : (
                                format(field.value.from, "LLL dd, y")
                              )
                            ) : (
                              <span>Pick a date</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            initialFocus
                            mode="range"
                            defaultMonth={field.value?.from}
                            selected={field.value}
                            onSelect={field.onChange}
                            numberOfMonths={2}
                          />
                        </PopoverContent>
                      </Popover>
                    )}
                  />
                </div>
                <div>
                  <Label htmlFor="rooms">Rooms</Label>
                  <div className="relative">
                    <Hotel className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input
                      id="rooms"
                      type="number"
                      {...register("rooms", { valueAsNumber: true })}
                      className="pl-10"
                      min={1}
                    />
                  </div>
                  {errors.rooms && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.rooms.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="passengers">Guests</Label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input
                      id="passengers"
                      type="number"
                      {...register("passengers", { valueAsNumber: true })}
                      className="pl-10"
                      min={1}
                    />
                  </div>
                  {errors.passengers && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.passengers.message}
                    </p>
                  )}
                </div>
                <div className="md:col-span-2 lg:col-span-6">
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Searching..." : "Search Hotels"}
                  </Button>
                </div>
              </form>
            </TabsContent>
            {/* Add similar forms for packages and cars */}
          </Tabs>
        </motion.section>

        {isLoading && (
          <div className="flex justify-center items-center mb-8">
            <Loader2 className="mr-2 h-8 w-8 animate-spin" />
            <span>Loading...</span>
          </div>
        )}

        <div ref={resultsRef}>
          <AnimatePresence>
            {showCountries && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="mb-16"
              >
                <h2 className="text-2xl font-bold mb-6">
                  Popular Destinations
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {countriesData.map((country) => (
                    <motion.div
                      key={country.id}
                      whileHover={{ scale: 1.05 }}
                      className="relative bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer"
                      onClick={() => handleCountryClick(country.id)}
                    >
                      <Image
                        src={country.landmark}
                        alt={country.name}
                        width={500}
                        height={300}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end p-4">
                        <div>
                          <h3 className="text-xl font-semibold text-white mb-2">
                            {country.name}
                          </h3>
                          <p className="text-white">From ${country.price}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.section>
            )}

            {selectedCountry && !selectedCity && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="mb-16"
              >
                <h2 className="text-2xl font-bold mb-6">
                  Popular Cities in{" "}
                  {countriesData.find((c) => c.id === selectedCountry)?.name}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {citiesData[selectedCountry as keyof typeof citiesData].map(
                    (city) => (
                      <motion.div
                        key={city.id}
                        whileHover={{ scale: 1.05 }}
                        className="relative bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer"
                        onClick={() => handleCityClick(city.id)}
                      >
                        <Image
                          src={city.landmark}
                          alt={city.name}
                          width={500}
                          height={300}
                          className="w-full h-48 object-cover"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end p-4">
                          <div>
                            <h3 className="text-xl font-semibold text-white mb-2">
                              {city.name}
                            </h3>
                            <p className="text-white">From ${city.price}</p>
                          </div>
                        </div>
                      </motion.div>
                    )
                  )}
                </div>
              </motion.section>
            )}

            {searchResults.length > 0 && activeTab === "flights" && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="mb-16"
              >
                <h2 className="text-2xl font-bold mb-6">Flight Results</h2>
                <div className="space-y-6">
                  {searchResults.map((flight) => (
                    <motion.div
                      key={flight.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className="bg-white shadow-lg rounded-lg p-6"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                          <Image
                            src={flight.logo}
                            alt={flight.airline}
                            width={80}
                            height={40}
                            className="mr-4"
                          />
                          <span className="font-semibold">
                            {flight.airline}
                          </span>
                        </div>
                        <Heart className="text-gray-400 cursor-pointer hover:text-red-500 transition-colors" />
                      </div>
                      <div className="flex justify-between items-center mb-4">
                        <div>
                          <span className="text-2xl font-bold">
                            {flight.departureTime}
                          </span>
                          <span className="text-gray-500 ml-2">{origin}</span>
                        </div>
                        <div className="flex flex-col items-center">
                          <Plane className="rotate-90 mb-2" />
                          <span className="text-sm text-gray-500">
                            {flight.duration}
                          </span>
                          {flight.stops.map((stop, index) => (
                            <span key={index} className="text-xs text-red-500">
                              {stop.duration} {stop.airport}
                            </span>
                          ))}
                        </div>
                        <div>
                          <span className="text-2xl font-bold">
                            {flight.arrivalTime}
                          </span>
                          <span className="text-gray-500 ml-2">
                            {destination}
                          </span>
                        </div>
                      </div>
                      {flight.co2Info && (
                        <div className="flex items-center text-green-600 text-sm mb-4">
                          <Info className="mr-2" size={16} />
                          <span>{flight.co2Info}</span>
                        </div>
                      )}
                      <div className="flex justify-between items-center">
                        <span className="text-2xl font-bold">
                          {flight.price} zł
                        </span>
                        <Button>Check</Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.section>
            )}

            {searchResults.length > 0 && activeTab === "hotels" && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="mb-16"
              >
                <h2 className="text-2xl font-bold mb-6">Hotel Results</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {searchResults.length > 0 && activeTab === "hotels" && (
                    <motion.section
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5 }}
                      className="mb-16"
                    >
                      <h2 className="text-2xl font-bold mb-6">Hotel Results</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {searchResults.map((hotel) => (
                          <motion.div
                            key={hotel.id}
                            whileHover={{ scale: 1.05 }}
                            className="bg-white shadow-lg rounded-lg overflow-hidden"
                          >
                            <Image
                              src={hotel.image}
                              alt={hotel.name}
                              width={500}
                              height={300}
                              className="w-full h-48 object-cover"
                            />
                            <div className="p-6">
                              <h3 className="text-xl font-semibold mb-2">
                                {hotel.name}
                              </h3>
                              <p className="text-gray-600 mb-4">
                                {hotel.location}
                              </p>
                              <div className="flex items-center mb-4">
                                <Star className="text-yellow-400 w-5 h-5 mr-1" />
                                <span className="font-semibold">
                                  {hotel.rating}
                                </span>
                              </div>
                              {hotel.amenities &&
                                hotel.amenities.length > 0 && (
                                  <div className="flex flex-wrap gap-2 mb-4">
                                    {hotel.amenities.map((amenity, index) => (
                                      <span
                                        key={index}
                                        className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded"
                                      >
                                        {amenity}
                                      </span>
                                    ))}
                                  </div>
                                )}
                              <div className="flex justify-between items-center">
                                <span className="text-2xl font-bold text-blue-600">
                                  ${hotel.price}/night
                                </span>
                                <Button variant="outline">View Details</Button>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.section>
                  )}
                </div>
              </motion.section>
            )}
          </AnimatePresence>
        </div>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold mb-6 text-blue-600">
            Why Choose Fledge?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white shadow-lg rounded-lg p-6"
            >
              <Globe className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-blue-600">
                Global Coverage
              </h3>
              <p className="text-gray-600">
                Access to millions of flights, hotels, and experiences
                worldwide.
              </p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white shadow-lg rounded-lg p-6"
            >
              <Shield className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-blue-600">
                Best Price Guarantee
              </h3>
              <p className="text-gray-600">
                We offer unbeatable prices on flights, hotels, and vacation
                packages.
              </p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white shadow-lg rounded-lg p-6"
            >
              <HeadphonesIcon className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-blue-600">
                24/7 Customer Support
              </h3>
              <p className="text-gray-600">
                Our dedicated team is always ready to assist you, anytime,
                anywhere.
              </p>
            </motion.div>
          </div>
        </motion.section>
      </main>
    </div>
  );
}

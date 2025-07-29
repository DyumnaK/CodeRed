"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ArrowLeft, MapPin, Search, User, Users } from "lucide-react"
import Link from "next/link"

interface Worker {
  id: number
  name: string
  skill: string
  location: string
  profileImage: string
  createdAt: string
}

export default function WorkersPage() {
  const [workers, setWorkers] = useState<Worker[]>([])
  const [filteredWorkers, setFilteredWorkers] = useState<Worker[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchWorkers = async () => {
      setLoading(true)
      setError("")
      try {
        const response = await fetch("http://localhost:3000/api/worker")
        if (!response.ok) {
          setError("Failed to load workers")
          setLoading(false)
          return
        }
        const data = await response.json()
        setWorkers(data)
        setFilteredWorkers(data)
        setLoading(false)
      } catch (err) {
        setError("Network error")
        setLoading(false)
      }
    }
    fetchWorkers()
  }, [])

  useEffect(() => {
    const filtered = workers.filter(
      (worker) =>
        worker.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        worker.skill.toLowerCase().includes(searchTerm.toLowerCase()) ||
        worker.location.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    setFilteredWorkers(filtered)
  }, [searchTerm, workers])

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center mb-6">
          <Link href="/">
            <Button variant="ghost" size="sm" className="mr-4">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-gray-800">Available Workers</h1>
        </div>

        {/* Search Bar */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name, skill, or location"
            className="text-lg p-4 h-12 pl-12"
          />
        </div>

        {/* Workers List */}
        {loading ? (
          <p>Loading workers...</p>
        ) : error ? (
          <p className="text-red-600">{error}</p>
        ) : filteredWorkers.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <Users className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <h3 className="text-lg font-medium text-gray-600 mb-2">No Workers Found</h3>
              <p className="text-gray-500">
                {searchTerm ? "Try different search terms" : "No worker profiles have been created yet"}
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredWorkers.map((worker) => (
            <Card key={worker.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-4">
                <div className="flex gap-4">
                  <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0 overflow-hidden">
                    {worker.profileImage ? (
                      <img
                        src={worker.profileImage || "/placeholder.svg"}
                        alt={worker.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User className="w-8 h-8 text-gray-400" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">{worker.name}</h3>
                    <p className="text-gray-600 mb-2 line-clamp-2">{worker.skill}</p>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <MapPin className="w-4 h-4" />
                      <span className="truncate">{worker.location}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      Joined {new Date(worker.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}

        {/* Add Worker Button */}
        <div className="fixed bottom-6 right-6">
          <Link href="/post-worker">
            <Button size="lg" className="rounded-full shadow-lg">
              <User className="w-5 h-5 mr-2" />
              Add Profile
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ArrowLeft, MapPin, DollarSign, Search, Briefcase } from "lucide-react"
import Link from "next/link"

interface Job {
  id: number
  description: string
  pay: string
  location: string
  jobImage: string
  createdAt: string
}

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([])
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    const savedJobs = JSON.parse(localStorage.getItem("jobs") || "[]")
    setJobs(savedJobs)
    setFilteredJobs(savedJobs)
  }, [])

  useEffect(() => {
    const filtered = jobs.filter(
      (job) =>
        job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.location.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    setFilteredJobs(filtered)
  }, [searchTerm, jobs])

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center mb-6">
          <Link href="/">
            <Button variant="ghost" size="sm" className="mr-4">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-gray-800">Available Jobs</h1>
        </div>

        {/* Search Bar */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by job type or location"
            className="text-lg p-4 h-12 pl-12"
          />
        </div>

        {/* Jobs List */}
        <div className="space-y-4">
          {filteredJobs.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <Briefcase className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                <h3 className="text-lg font-medium text-gray-600 mb-2">No Jobs Found</h3>
                <p className="text-gray-500">
                  {searchTerm ? "Try different search terms" : "No jobs have been posted yet"}
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredJobs.map((job) => (
              <Card key={job.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    {job.jobImage && (
                      <img
                        src={job.jobImage || "/placeholder.svg"}
                        alt="Job"
                        className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-lg font-medium text-gray-800 mb-2 line-clamp-2">{job.description}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <DollarSign className="w-4 h-4" />
                          <span>{job.pay}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          <span className="truncate">{job.location}</span>
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">
                        Posted {new Date(job.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Add Job Button */}
        <div className="fixed bottom-6 right-6">
          <Link href="/post-job">
            <Button size="lg" className="rounded-full shadow-lg">
              <Briefcase className="w-5 h-5 mr-2" />
              Post Job
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

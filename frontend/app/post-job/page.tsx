"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Briefcase, MapPin, DollarSign, CheckCircle } from "lucide-react"
import Link from "next/link"
import { VoiceInput } from "@/components/voice-input"
import { ImageUpload } from "@/components/image-upload"

export default function PostJobPage() {
  const [formData, setFormData] = useState({
    description: "",
    pay: "",
    location: "",
    jobImage: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Save to localStorage
    const jobs = JSON.parse(localStorage.getItem("jobs") || "[]")
    const newJob = {
      id: Date.now(),
      ...formData,
      createdAt: new Date().toISOString(),
    }
    jobs.push(newJob)
    localStorage.setItem("jobs", JSON.stringify(jobs))

    setIsSubmitted(true)
  }

  const handleVoiceInput = (field: string, text: string) => {
    setFormData((prev) => ({ ...prev, [field]: text }))
  }

  const handleImageUpload = (imageUrl: string) => {
    setFormData((prev) => ({ ...prev, jobImage: imageUrl }))
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white p-4 flex items-center justify-center">
        <Card className="max-w-md mx-auto">
          <CardContent className="p-8 text-center">
            <CheckCircle className="w-16 h-16 mx-auto mb-4 text-green-600" />
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Job Posted!</h2>
            <p className="text-gray-600 mb-6">Your job has been successfully posted.</p>
            <Link href="/">
              <Button className="w-full">Go to Home</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center mb-6">
          <Link href="/">
            <Button variant="ghost" size="sm" className="mr-4">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-gray-800">Post a Job</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="w-5 h-5" />
              Job Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Job Description with Voice Input */}
              <div className="space-y-2">
                <Label htmlFor="description" className="text-lg font-medium">
                  Job Description
                </Label>
                <div className="relative">
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                    placeholder="Describe the work needed (e.g., fix plumbing, paint walls, electrical work)"
                    className="text-lg p-4 min-h-[120px]"
                    required
                  />
                  <VoiceInput
                    onResult={(text) => handleVoiceInput("description", text)}
                    className="absolute top-2 right-2"
                  />
                </div>
              </div>

              {/* Pay Field */}
              <div className="space-y-2">
                <Label htmlFor="pay" className="text-lg font-medium">
                  Payment
                </Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    id="pay"
                    value={formData.pay}
                    onChange={(e) => setFormData((prev) => ({ ...prev, pay: e.target.value }))}
                    placeholder="Enter payment amount (e.g., ₹500 per day)"
                    className="text-lg p-4 h-12 pl-12"
                    required
                  />
                </div>
              </div>

              {/* Location Field */}
              <div className="space-y-2">
                <Label htmlFor="location" className="text-lg font-medium">
                  Location
                </Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData((prev) => ({ ...prev, location: e.target.value }))}
                    placeholder="Enter job location"
                    className="text-lg p-4 h-12 pl-12"
                    required
                  />
                </div>
              </div>

              {/* Job Image Upload */}
              <div className="space-y-2">
                <Label className="text-lg font-medium">Job Photo (Optional)</Label>
                <ImageUpload onImageUpload={handleImageUpload} />
              </div>

              <Button type="submit" className="w-full h-12 text-lg">
                Post Job
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

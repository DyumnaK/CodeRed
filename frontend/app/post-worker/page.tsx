"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, MapPin, User, CheckCircle } from "lucide-react"
import Link from "next/link"
import { VoiceInput } from "@/components/voice-input"
import { ImageUpload } from "@/components/image-upload"

export default function PostWorkerPage() {
  const [formData, setFormData] = useState({
    name: "",
    skill: "",
    location: "",
    profileImage: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Save to localStorage
    const workers = JSON.parse(localStorage.getItem("workers") || "[]")
    const newWorker = {
      id: Date.now(),
      ...formData,
      createdAt: new Date().toISOString(),
    }
    workers.push(newWorker)
    localStorage.setItem("workers", JSON.stringify(workers))

    setIsSubmitted(true)
  }

  const handleVoiceInput = (field: string, text: string) => {
    setFormData((prev) => ({ ...prev, [field]: text }))
  }

  const handleImageUpload = (imageUrl: string) => {
    setFormData((prev) => ({ ...prev, profileImage: imageUrl }))
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-4 flex items-center justify-center">
        <Card className="max-w-md mx-auto">
          <CardContent className="p-8 text-center">
            <CheckCircle className="w-16 h-16 mx-auto mb-4 text-green-600" />
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Profile Created!</h2>
            <p className="text-gray-600 mb-6">Your worker profile has been successfully created.</p>
            <Link href="/">
              <Button className="w-full">Go to Home</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center mb-6">
          <Link href="/">
            <Button variant="ghost" size="sm" className="mr-4">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-gray-800">Create Worker Profile</h1>
        </div>

        {/* Progress Indicator */}
        <div className="flex justify-center mb-6">
          <div className="flex space-x-2">
            {[1, 2, 3, 4].map((step) => (
              <div
                key={step}
                className={`w-3 h-3 rounded-full ${step <= currentStep ? "bg-blue-600" : "bg-gray-300"}`}
              />
            ))}
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Worker Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-lg font-medium">
                  Name
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter your full name"
                  className="text-lg p-4 h-12"
                  required
                />
              </div>

              {/* Skill Field with Voice Input */}
              <div className="space-y-2">
                <Label htmlFor="skill" className="text-lg font-medium">
                  Skills
                </Label>
                <div className="relative">
                  <Textarea
                    id="skill"
                    value={formData.skill}
                    onChange={(e) => setFormData((prev) => ({ ...prev, skill: e.target.value }))}
                    placeholder="Describe your skills (e.g., plumber, electrician, carpenter)"
                    className="text-lg p-4 min-h-[100px]"
                    required
                  />
                  <VoiceInput onResult={(text) => handleVoiceInput("skill", text)} className="absolute top-2 right-2" />
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
                    placeholder="Enter your area/locality"
                    className="text-lg p-4 h-12 pl-12"
                    required
                  />
                </div>
              </div>

              {/* Profile Image Upload */}
              <div className="space-y-2">
                <Label className="text-lg font-medium">Profile Photo (Optional)</Label>
                <ImageUpload onImageUpload={handleImageUpload} />
              </div>

              <Button type="submit" className="w-full h-12 text-lg">
                Create Profile
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

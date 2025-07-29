"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Briefcase, User, List, Users, Globe, LogOut, Settings } from "lucide-react"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useAuth } from "@/hooks/useAuth"

export default function HomePage() {
  const [language, setLanguage] = useState("en")
  const { user, isAuthenticated, logout } = useAuth()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const translations = {
    en: {
      title: "SkillLadder",
      subtitle: "Connect Workers & Jobs",
      welcome: "Welcome back",
      postJob: "Post a Job",
      postWorker: "Create Worker Profile",
      viewJobs: "View Jobs",
      viewWorkers: "View Workers",
      language: "Language",
      signOut: "Sign Out",
      settings: "Settings",
      getStarted: "Get Started",
    },
    hi: {
      title: "स्किलैडर",
      subtitle: "मजदूर और काम जोड़ें",
      welcome: "वापसी पर स्वागत है",
      postJob: "काम पोस्ट करें",
      postWorker: "मजदूर प्रोफाइल बनाएं",
      viewJobs: "काम देखें",
      viewWorkers: "मजदूर देखें",
      language: "भाषा",
      signOut: "साइन आउट",
      settings: "सेटिंग्स",
      getStarted: "शुरू करें",
    },
  }

  const t = translations[language as keyof typeof translations]

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
          <CardContent className="p-8 text-center">
            <div className="mb-6">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                {t.title}
              </h1>
              <p className="text-gray-600">{t.subtitle}</p>
            </div>
            <Link href="/auth/signin">
              <Button className="w-full h-12 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg">
                {t.getStarted}
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 sticky top-0 z-50">
        <div className="max-w-md mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {t.title}
            </h1>
            <p className="text-sm text-gray-600">
              {t.welcome}, {user?.name?.split(" ")[0] || "User"}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setLanguage(language === "en" ? "hi" : "en")}
              className="flex items-center gap-2 bg-white/50"
            >
              <Globe className="w-4 h-4" />
              {language === "en" ? "हिं" : "EN"}
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-10 w-10 ring-2 ring-blue-500/20">
                    <AvatarImage src={user?.image || ""} alt={user?.name || ""} />
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white">
                      {user?.name?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>{t.settings}</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={logout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>{t.signOut}</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto p-4">
        {/* Main Navigation Cards */}
        <div className="grid grid-cols-2 gap-4 mt-6">
          <Link href="/post-job">
            <Card className="group hover:shadow-2xl transition-all duration-300 cursor-pointer border-0 bg-gradient-to-br from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100 transform hover:-translate-y-1">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Briefcase className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-lg font-semibold text-gray-800 group-hover:text-green-700 transition-colors">
                  {t.postJob}
                </h2>
              </CardContent>
            </Card>
          </Link>

          <Link href="/post-worker">
            <Card className="group hover:shadow-2xl transition-all duration-300 cursor-pointer border-0 bg-gradient-to-br from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 transform hover:-translate-y-1">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <User className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-lg font-semibold text-gray-800 group-hover:text-blue-700 transition-colors">
                  {t.postWorker}
                </h2>
              </CardContent>
            </Card>
          </Link>

          <Link href="/jobs">
            <Card className="group hover:shadow-2xl transition-all duration-300 cursor-pointer border-0 bg-gradient-to-br from-orange-50 to-amber-50 hover:from-orange-100 hover:to-amber-100 transform hover:-translate-y-1">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-orange-500 to-amber-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <List className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-lg font-semibold text-gray-800 group-hover:text-orange-700 transition-colors">
                  {t.viewJobs}
                </h2>
              </CardContent>
            </Card>
          </Link>

          <Link href="/workers">
            <Card className="group hover:shadow-2xl transition-all duration-300 cursor-pointer border-0 bg-gradient-to-br from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 transform hover:-translate-y-1">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-lg font-semibold text-gray-800 group-hover:text-purple-700 transition-colors">
                  {t.viewWorkers}
                </h2>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* User Info Card */}
        <Card className="mt-8 border-0 bg-white/60 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16 ring-2 ring-blue-500/20">
                <AvatarImage src={user?.image || ""} alt={user?.name || ""} />
                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white text-xl">
                  {user?.name?.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800">{user?.name}</h3>
                <p className="text-sm text-gray-600">{user?.email}</p>
                <div className="flex items-center gap-2 mt-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-xs text-gray-500">Online</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="mt-6 grid grid-cols-2 gap-4">
          <Card className="border-0 bg-white/60 backdrop-blur-sm">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">
                {typeof window !== "undefined" ? JSON.parse(localStorage.getItem("jobs") || "[]").length : 0}
              </div>
              <div className="text-sm text-gray-600">Active Jobs</div>
            </CardContent>
          </Card>
          <Card className="border-0 bg-white/60 backdrop-blur-sm">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">
                {typeof window !== "undefined" ? JSON.parse(localStorage.getItem("workers") || "[]").length : 0}
              </div>
              <div className="text-sm text-gray-600">Workers</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Mic, MicOff } from "lucide-react"

interface VoiceInputProps {
  onResult: (text: string) => void
  className?: string
}

export function VoiceInput({ onResult, className = "" }: VoiceInputProps) {
  const [isListening, setIsListening] = useState(false)
  const [isSupported, setIsSupported] = useState(true)
  const recognitionRef = useRef<any>(null)

  const startListening = () => {
    if (!("webkitSpeechRecognition" in window) && !("SpeechRecognition" in window)) {
      setIsSupported(false)
      return
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    recognitionRef.current = new SpeechRecognition()

    recognitionRef.current.continuous = false
    recognitionRef.current.interimResults = false
    recognitionRef.current.lang = "en-US"

    recognitionRef.current.onstart = () => {
      setIsListening(true)
    }

    recognitionRef.current.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript
      onResult(transcript)
      setIsListening(false)
    }

    recognitionRef.current.onerror = () => {
      setIsListening(false)
    }

    recognitionRef.current.onend = () => {
      setIsListening(false)
    }

    recognitionRef.current.start()
  }

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop()
    }
    setIsListening(false)
  }

  if (!isSupported) {
    return null
  }

  return (
    <Button
      type="button"
      variant={isListening ? "destructive" : "outline"}
      size="sm"
      onClick={isListening ? stopListening : startListening}
      className={className}
    >
      {isListening ? (
        <>
          <MicOff className="w-4 h-4" />
          <span className="sr-only">Stop listening</span>
        </>
      ) : (
        <>
          <Mic className="w-4 h-4" />
          <span className="sr-only">Start voice input</span>
        </>
      )}
    </Button>
  )
}

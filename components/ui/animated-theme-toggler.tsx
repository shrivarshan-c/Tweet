"use client"

import { useTheme } from "next-themes"
import { useCallback, useEffect, useRef, useState } from "react"
import { Moon, Sun } from "lucide-react"
import { flushSync } from "react-dom"

import { cn } from "@/lib/utils"

interface AnimatedThemeTogglerProps extends React.ComponentPropsWithoutRef<"button"> {
  duration?: number
}

export const AnimatedThemeToggler = ({
  className,
  duration = 400,
  ...props
}: AnimatedThemeTogglerProps) => {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTheme = useCallback(async () => {
    if (!buttonRef.current || !mounted || isAnimating) return

    const newTheme = theme === "dark" ? "light" : "dark"

    // Fallback for browsers without View Transition API
    if (!document.startViewTransition) {
      setTheme(newTheme)
      return
    }

    setIsAnimating(true)

    // Get button position before any DOM changes
    const { top, left, width, height } = buttonRef.current.getBoundingClientRect()
    const x = left + width / 2
    const y = top + height / 2
    const maxRadius = Math.hypot(
      Math.max(left, window.innerWidth - left),
      Math.max(top, window.innerHeight - top)
    )

    try {
      const transition = document.startViewTransition(() => {
        flushSync(() => {
          setTheme(newTheme)
        })
      })

      await transition.ready

      // Apply the circular reveal animation
      const animation = document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${maxRadius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration,
          easing: "ease-in-out",
          pseudoElement: "::view-transition-new(root)",
        }
      )

      await animation.finished
    } catch (error) {
      // Fallback if animation fails
      console.warn('Theme transition animation failed:', error)
    } finally {
      setIsAnimating(false)
    }
  }, [theme, setTheme, mounted, duration, isAnimating])

  if (!mounted) {
    return (
      <button className={cn("opacity-0", className)} {...props} disabled>
        <div className="h-4 w-4" />
        <span className="sr-only">Toggle theme</span>
      </button>
    )
  }

  return (
    <button
      ref={buttonRef}
      onClick={toggleTheme}
      disabled={isAnimating}
      className={cn(
        "transition-all duration-200 ease-in-out",
        isAnimating && "scale-95 opacity-75",
        className
      )}
      {...props}
    >
      <div className="transition-transform duration-200 ease-in-out hover:scale-110">
        {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      </div>
      <span className="sr-only">Toggle theme</span>
    </button>
  )
}

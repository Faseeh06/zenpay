"use client"

import { useTheme } from "next-themes"
import { useEffect, useRef } from "react"

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme } = useTheme()
  
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    let animationFrameId: number
    // Replace small particles with just a few larger gradient orbs
    let gradientOrbs: any[] = []
    const orbCount = 5 // Very few orbs to create minimal, subtle effect
    
    const isDark = theme === 'dark'
    
    // Define GradientOrb class for subtle background effect
    class GradientOrb {
      x: number
      y: number
      radius: number
      color: string
      vx: number
      vy: number
      
      constructor() {
        this.x = Math.random() * (canvas as HTMLCanvasElement).width
        
        // Keep orbs away from navbar
        const navbarHeight = 80;
        this.y = navbarHeight + Math.random() * ((canvas as HTMLCanvasElement).height - navbarHeight)
        
        // Large soft orbs
        this.radius = Math.random() * 300 + 200;
        
        // Very subtle colors
        this.color = isDark 
          ? `rgba(${Math.floor(Math.random() * 100)}, ${Math.floor(Math.random() * 100)}, ${Math.floor(Math.random() * 200)}, 0.03)`
          : `rgba(${Math.floor(Math.random() * 200)}, ${Math.floor(Math.random() * 100)}, ${Math.floor(Math.random() * 200)}, 0.02)`;
        
        // Very slow movement
        this.vx = (Math.random() - 0.5) * 0.1
        this.vy = (Math.random() - 0.5) * 0.1
      }
      
      update() {
        this.x += this.vx
        this.y += this.vy
        
        // Bounce off edges
        if (this.x < -this.radius) this.vx = Math.abs(this.vx)
        if (this.x > (canvas as HTMLCanvasElement).width + this.radius) this.vx = -Math.abs(this.vx)
        if (this.y < -this.radius) this.vy = Math.abs(this.vy)
        if (this.y > (canvas as HTMLCanvasElement).height + this.radius) this.vy = -Math.abs(this.vy)
      }
      
      draw() {
        if (!ctx) return
        
        // Create subtle gradient orb
        const gradient = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, this.radius
        );
        
        gradient.addColorStop(0, this.color);
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      }
    }
    
    // Initialize orbs
    function initOrbs() {
      gradientOrbs = []
      for (let i = 0; i < orbCount; i++) {
        gradientOrbs.push(new GradientOrb())
      }
    }
    
    // Set canvas to full screen size
    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initOrbs()
    }
    
    window.addEventListener('resize', handleResize)
    handleResize()
    
    function animate() {
      if (!ctx) return
      ctx.clearRect(0, 0, (canvas as HTMLCanvasElement).width, (canvas as HTMLCanvasElement).height)
      
      // Update and draw orbs
      gradientOrbs.forEach(orb => {
        orb.update()
        orb.draw()
      })
      
      // Request next frame
      animationFrameId = requestAnimationFrame(animate)
    }
    
    initOrbs()
    animate()
    
    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [theme])
  
  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full -z-10 opacity-100 pointer-events-none"
    />
  )
} 
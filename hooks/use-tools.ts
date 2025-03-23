"use client"

import { toast } from "sonner"
import confetti from 'canvas-confetti'
import { animate as framerAnimate } from "framer-motion"
import { useTranslations } from "@/components/translations-context"
import FirecrawlApp, { ScrapeResponse } from '@mendable/firecrawl-js';
import { useForm } from "@/hooks/use-form";

export const useToolsFunctions = () => {
  const { t } = useTranslations();
  const { openForm, getLastFormSubmission } = useForm();

  const timeFunction = () => {
    const now = new Date()
    return {
      success: true,
      time: now.toLocaleTimeString(),
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      message: t('tools.time') + now.toLocaleTimeString() + " in " + Intl.DateTimeFormat().resolvedOptions().timeZone + " timezone."
    }
  }

  const backgroundFunction = () => {
    try {
      const html = document.documentElement;
      const currentTheme = html.classList.contains('dark') ? 'dark' : 'light';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

      html.classList.remove(currentTheme);
      html.classList.add(newTheme);

      toast(`Switched to ${newTheme} mode! 🌓`, {
        description: t('tools.switchTheme') + newTheme + ".",
      })

      return { 
        success: true, 
        theme: newTheme,
        message: t('tools.switchTheme') + newTheme + "."
      };
    } catch (error) {
      return { 
        success: false, 
        message: t('tools.themeFailed') + ": " + error 
      };
    }
  }

  const partyFunction = () => {
    try {
      const duration = 5 * 1000
      const colors = ["#a786ff", "#fd8bbc", "#eca184", "#f8deb1", "#3b82f6", "#14b8a6", "#f97316", "#10b981", "#facc15"]
      
      const confettiConfig = {
        particleCount: 30,
        spread: 100,
        startVelocity: 90,
        colors,
        gravity: 0.5
      }

      const shootConfetti = (angle: number, origin: { x: number, y: number }) => {
        confetti({
          ...confettiConfig,
          angle,
          origin
        })
      }

      const animate = () => {
        const now = Date.now()
        const end = now + duration
        
        const elements = document.querySelectorAll('div, p, button, h1, h2, h3')
        elements.forEach((element) => {
          framerAnimate(element, 
            { 
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0],
            }, 
            { 
              duration: 0.5,
              repeat: 10,
              ease: "easeInOut"
            }
          )
        })

        const frame = () => {
          if (Date.now() > end) return
          shootConfetti(60, { x: 0, y: 0.5 })
          shootConfetti(120, { x: 1, y: 0.5 })
          requestAnimationFrame(frame)
        }

        const mainElement = document.querySelector('main')
        if (mainElement) {
          mainElement.classList.remove('bg-gradient-to-b', 'from-gray-50', 'to-white')
          const originalBg = mainElement.style.backgroundColor
          
          const changeColor = () => {
            const now = Date.now()
            const end = now + duration
            
            const colorCycle = () => {
              if (Date.now() > end) {
                framerAnimate(mainElement, 
                  { backgroundColor: originalBg },
                  { duration: 0.5 }
                )
                return
              }
              const newColor = colors[Math.floor(Math.random() * colors.length)]
              framerAnimate(mainElement,
                { backgroundColor: newColor },
                { duration: 0.2 }
              )
              setTimeout(colorCycle, 200)
            }
            
            colorCycle()
          }
          
          changeColor()
        }
        
        frame()
      }

      animate()
      toast.success(t('tools.partyMode.toast') + " 🎉", {
        description: t('tools.partyMode.description'),
      })
      return { success: true, message: t('tools.partyMode.success') + " 🎉" }
    } catch (error) {
      return { success: false, message: t('tools.partyMode.failed') + ": " + error }
    }
  }

  const neonGlowFunction = () => {
    try {
      // Create canvas element for neon glow effect
      const canvas = document.createElement('canvas');
      canvas.style.position = 'fixed';
      canvas.style.top = '0';
      canvas.style.left = '0';
      canvas.style.width = '100%';
      canvas.style.height = '100%';
      canvas.style.pointerEvents = 'none'; // Let user interact with elements beneath
      canvas.style.zIndex = '9999';
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      document.body.appendChild(canvas);
      
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        throw new Error('Could not get canvas context');
      }
      
      // Neon colors
      const neonColors = [
        '#FF00FF', // Pink
        '#00FFFF', // Cyan
        '#39FF14', // Green
        '#FF3131', // Red
        '#4D4DFF', // Blue
        '#FFF01F'  // Yellow
      ];
      
      // Particle class
      class Particle {
        x: number;
        y: number;
        size: number;
        speedX: number;
        speedY: number;
        color: string;
        alpha: number;
        pulseDirection: number;
        trail: Array<{x: number, y: number}>;
        hasTrail: boolean;
        
        constructor() {
          this.x = Math.random() * canvas.width;
          this.y = canvas.height + Math.random() * 20; // Start below the screen
          this.size = Math.random() * 3 + 2;
          this.speedX = (Math.random() - 0.5) * 3;
          this.speedY = -(Math.random() * 3 + 1); // Negative for upward motion
          this.color = neonColors[Math.floor(Math.random() * neonColors.length)];
          this.alpha = Math.random() * 0.5 + 0.5;
          this.pulseDirection = Math.random() > 0.5 ? 1 : -1;
          this.trail = [];
          this.hasTrail = Math.random() > 0.7; // Only some particles have trails
        }
        
        update() {
          // Update position
          this.x += this.speedX;
          this.y += this.speedY;
          
          // Pulse size
          this.size += 0.05 * this.pulseDirection;
          if (this.size > 5 || this.size < 2) {
            this.pulseDirection *= -1;
          }
          
          // Update trail
          if (this.hasTrail) {
            this.trail.push({x: this.x, y: this.y});
            if (this.trail.length > 5) {
              this.trail.shift();
            }
          }
        }
        
        draw(ctx: CanvasRenderingContext2D) {
          // Draw trail
          if (this.hasTrail && this.trail.length > 1) {
            ctx.beginPath();
            ctx.moveTo(this.trail[0].x, this.trail[0].y);
            for (let i = 1; i < this.trail.length; i++) {
              ctx.lineTo(this.trail[i].x, this.trail[i].y);
            }
            ctx.strokeStyle = this.color;
            ctx.lineWidth = this.size / 2;
            ctx.stroke();
          }
          
          // Draw particle
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          ctx.fillStyle = this.color;
          ctx.shadowColor = this.color;
          ctx.shadowBlur = 15;
          ctx.globalAlpha = this.alpha;
          ctx.fill();
          ctx.shadowBlur = 0;
          ctx.globalAlpha = 1;
        }
      }
      
      // Array of particles
      const particles: Particle[] = [];
      const maxParticles = 100;
      
      // Initialize with some particles
      for (let i = 0; i < maxParticles; i++) {
        particles.push(new Particle());
      }
      
      // Animation function
      const animate = () => {
        // Apply semi-transparent background for trailing effect
        ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Update and draw particles
        for (let i = 0; i < particles.length; i++) {
          particles[i].update();
          particles[i].draw(ctx);
          
          // Replace particles that are off-screen
          if (particles[i].y < -10 || particles[i].x < -10 || particles[i].x > canvas.width + 10) {
            particles[i] = new Particle();
          }
        }
      };
      
      // Start animation
      const animationDuration = 10000; // 10 seconds
      const startTime = Date.now();
      
      function animationLoop() {
        if (Date.now() - startTime < animationDuration) {
          animate();
          requestAnimationFrame(animationLoop);
        } else {
          document.body.removeChild(canvas);
        }
      }
      
      animationLoop();
      
      toast.success("Neon Glow Effect! ✨", {
        description: "Futuristic energy particles activated!",
      });
      
      return { 
        success: true, 
        message: "Created a futuristic neon glow effect with upward moving particles, trailing lines, and pulsing animations." 
      };
    } catch (error) {
      return { 
        success: false, 
        message: `Failed to create neon glow effect: ${error}` 
      };
    }
  }

  const getWeather = async ({ city }: { city: string }) => {
    try {
      const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
      
      if (!API_KEY) {
        throw new Error("Weather API key is not configured");
      }
      
      // Fetch weather data from OpenWeatherMap API
      toast.info(t('tools.weather.fetching') || `Fetching weather for ${city}...`, {
        description: t('tools.weather.wait') || "Please wait a moment",
      });
      
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
      );
      
      if (!response.ok) {
        throw new Error(`Error fetching weather: ${response.statusText}`);
      }
      
      const data = await response.json();
      
      // Extract relevant weather information
      const { 
        main: { temp, feels_like, humidity },
        weather: [{ description, icon }],
        wind: { speed },
        name,
        sys: { country }
      } = data;
      
      // Format weather description
      const tempF = (temp * 9/5 + 32).toFixed(1); // Convert to Fahrenheit
      const weatherDescription = description.charAt(0).toUpperCase() + description.slice(1);
      const weatherIcon = `https://openweathermap.org/img/wn/${icon}@2x.png`;
      
      // Create weather message
      const weatherMessage = `
        Current weather in ${name}, ${country}:
        🌡️ Temperature: ${temp.toFixed(1)}°C (${tempF}°F)
        🌡️ Feels like: ${feels_like.toFixed(1)}°C
        💧 Humidity: ${humidity}%
        💨 Wind speed: ${speed} m/s
        ☁️ Conditions: ${weatherDescription}
      `;
      
      toast.success(t('tools.weather.success') || `Weather for ${city}`, {
        description: t('tools.weather.retrieved') || "Current weather information retrieved",
      });
      
      return {
        success: true,
        city: name,
        country,
        temperature: {
          celsius: temp.toFixed(1),
          fahrenheit: tempF
        },
        feelsLike: feels_like.toFixed(1),
        humidity,
        windSpeed: speed,
        description: weatherDescription,
        icon: weatherIcon,
        message: weatherMessage
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      toast.error(t('tools.weather.failed') || "Failed to get weather", {
        description: errorMessage,
      });
      
      return {
        success: false,
        message: `Failed to get weather information: ${errorMessage}`
      };
    }
  }

  const launchWebsite = ({ url }: { url: string }) => {
    window.open(url, '_blank')
    toast(t('tools.launchWebsite') + " 🌐", {
      description: t('tools.launchWebsiteSuccess') + url + ", tell the user it's been launched.",
    })
    return {
      success: true,
      message: `Launched the site${url}, tell the user it's been launched.`
    }
  }

  const copyToClipboard = ({ text }: { text: string }) => {
    navigator.clipboard.writeText(text)
    toast(t('tools.clipboard.toast') + " 📋", {
      description: t('tools.clipboard.description'),
    })
    return {
      success: true,
      text,
      message: t('tools.clipboard.success')
    }
  }

  const scrapeWebsite = async ({ url }: { url: string }) => {
    const apiKey = process.env.NEXT_PUBLIC_FIRECRAWL_API_KEY;
    try {
      const app = new FirecrawlApp({ apiKey: apiKey });
      const scrapeResult = await app.scrapeUrl(url, { formats: ['markdown', 'html'] }) as ScrapeResponse;

      if (!scrapeResult.success) {
        console.log(scrapeResult.error)
        return {
          success: false,
          message: `Failed to scrape: ${scrapeResult.error}`
        };
      }

      toast.success(t('tools.scrapeWebsite.toast') + " 📋", {
        description: t('tools.scrapeWebsite.success'),
      })
    
      return {
        success: true,
        message: "Here is the scraped website content: " + JSON.stringify(scrapeResult.markdown) + "Summarize and explain it to the user now in a response."
      };

    } catch (error) {
      return {
        success: false,
        message: `Error scraping website: ${error}`
      };
    }
  }

  const showForm = () => {
    return openForm();
  }

  return {
    timeFunction,
    backgroundFunction,
    partyFunction,
    neonGlowFunction,
    getWeather,
    launchWebsite,
    copyToClipboard,
    scrapeWebsite,
    showForm,
    getLastFormSubmission
  }
}
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { 
  CheckCircle, 
  Search, 
  Moon, 
  Zap, 
  ShieldCheck, 
  Layout, 
  BarChart3, 
  FileText,
  ArrowRight
} from 'lucide-react'
import { getGlobalStats } from '../features/tasks/taskService'

gsap.registerPlugin(ScrollTrigger)

function Home() {
  const heroRef = useRef(null)
  const [stats, setStats] = useState({ totalTasks: 0, completedTasks: 0, growth: 0 })

  useEffect(() => {
    // Fetch real global stats
    const fetchStats = async () => {
      try {
        const data = await getGlobalStats()
        setStats(data)
      } catch (err) {
        console.error('Failed to fetch stats:', err)
      }
    }
    fetchStats()

    const ctx = gsap.context(() => {
      // Hero Animation
      gsap.from('.hero-content > *', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power4.out'
      })

      // Features Animation - trigger each card individually
      const cards = document.querySelectorAll('.feature-card')
      cards.forEach((card, i) => {
        gsap.from(card, {
          y: 30,
          opacity: 0,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 95%',
            toggleActions: 'play none none none'
          }
        })
      })

      // Analytics Showcase Animation
      gsap.from('.analytics-showcase > *', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.analytics-showcase',
          start: 'top 100%',
          toggleActions: 'play none none none'
        }
      })
    }, heroRef)

    return () => ctx.revert()
  }, [])

  const features = [
    { 
      icon: <CheckCircle className="text-emerald-500" />, 
      title: 'Task Management', 
      desc: 'Intuitive CRUD operations with a focus on speed and clarity.',
      size: 'col-span-1 md:col-span-2'
    },
    { 
      icon: <Search className="text-blue-500" />, 
      title: 'Smart Search', 
      desc: 'Find anything instantly with powerful filtering.',
      size: 'col-span-1'
    },
    { 
      icon: <Zap className="text-yellow-500" />, 
      title: 'Focus Streaks', 
      desc: 'Build habits and maintain momentum with streak tracking.',
      size: 'col-span-1'
    },
    { 
      icon: <ShieldCheck className="text-indigo-500" />, 
      title: 'Secure Auth', 
      desc: 'Your data is protected with industry-standard encryption.',
      size: 'col-span-1 md:col-span-2'
    }
  ]

  return (
    <main className="flex-1 bg-slate-50/50 dark:bg-[#0f1115]" ref={heroRef}>
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-20 px-4">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-full -z-10 opacity-30 dark:opacity-20 pointer-events-none">
          <div className="absolute -top-24 left-1/4 w-96 h-96 bg-violet-400 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-indigo-400 rounded-full blur-[100px]"></div>
        </div>

        <div className="max-w-5xl mx-auto text-center hero-content">
          <h1 className="text-6xl md:text-7xl font-black text-gray-900 dark:text-white mb-6 leading-[1.1] tracking-tight">
            The minimal way to <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 via-indigo-600 to-fuchsia-600">
              crush your goals.
            </span>
          </h1>

          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
            Planify streamlines your workflow with an ultra-clean interface, 
            powerful analytics, and habit-building streaks. 
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/signup" className="group btn-primary px-8 py-4 text-lg rounded-2xl flex items-center gap-2 shadow-xl shadow-violet-500/20 active:scale-95 transition-all">
              Get Started for Free
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/login" className="px-8 py-4 text-lg font-semibold text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* Feature Bento Grid */}
      <section className="max-w-6xl mx-auto px-4 pt-12 pb-0 feature-grid">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 italic">Built for performance.</h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
            Everything you need to stay organized and productive without the bloat.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <div 
              key={i} 
              className={`${f.size} feature-card group bg-white dark:bg-[#1a1c22] border border-gray-100 dark:border-gray-700/50 p-8 rounded-3xl hover:border-violet-300 dark:hover:border-violet-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-violet-500/10`}
            >
              <div className="w-12 h-12 rounded-2xl bg-gray-50 dark:bg-gray-800 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {f.icon}
              </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{f.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed font-medium">
                  {f.desc}
                </p>
            </div>
          ))}
        </div>
      </section>
      {/* Analytics Showcase Section */}
      <section className="max-w-6xl mx-auto px-4 pt-20 pb-4 analytics-showcase">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 text-xs font-bold uppercase tracking-wider mb-6">
              <BarChart3 size={14} />
              Insights
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-6 leading-tight">
              Analytics <br />
              <span className="text-violet-600 dark:text-violet-400">Visualized.</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed font-medium">
              Track your productivity with beautiful progress charts. Gain deep insights 
              into your workflow and identify exactly where your time goes.
            </p>
            <ul className="space-y-4">
              {[
                'Real-time task completion rates',
                'Historical productivity trends',
                'Focus intensity metrics'
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-gray-700 dark:text-gray-300 font-semibold">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center">
                    <CheckCircle className="text-emerald-600 dark:text-emerald-400" size={12} />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative group">
            {/* Mock Dashboard Widget */}
            <div className="bg-white dark:bg-[#1a1c22] border border-gray-100 dark:border-gray-800 p-8 rounded-[40px] shadow-2xl relative z-10 overflow-hidden transform group-hover:-translate-y-2 transition-transform duration-500">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Total Completion</p>
                  <h4 className="text-2xl font-black text-gray-900 dark:text-white">{stats.growth}%</h4>
                </div>
                <div className="p-3 rounded-2xl bg-violet-50 dark:bg-violet-900/20 text-violet-600">
                  <BarChart3 size={24} />
                </div>
              </div>

              {/* Mock Chart Bars */}
              <div className="flex items-end gap-3 h-32 mb-6">
                {[40, 70, 45, 90, 65, 80, 55].map((h, i) => (
                  <div key={i} className="flex-1 bg-gray-100 dark:bg-gray-800 rounded-lg relative overflow-hidden h-full">
                    <div 
                      className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-violet-600 to-indigo-500 rounded-lg transition-all duration-1000 group-hover:opacity-80"
                      style={{ height: `${h}%` }}
                    ></div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-2xl">
                  <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Platform Tasks</p>
                  <p className="text-xl font-black text-gray-900 dark:text-white">
                    {stats.totalTasks}
                  </p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-2xl">
                  <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Status</p>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                    <p className="text-xs font-bold text-gray-900 dark:text-white uppercase">On Track</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative blobs */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-violet-500/10 blur-[100px] -z-10 group-hover:scale-110 transition-transform duration-700"></div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Home

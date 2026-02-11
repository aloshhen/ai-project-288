import { SafeIcon } from './components/SafeIcon';
import { useState, useEffect, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import {
  ChefHat,
  Flame,
  Share2,
  Clock,
  AlertTriangle,
  Skull,
  Zap,
  Droplets,
  Thermometer,
  Play,
  Pause,
  RotateCcw
} from 'lucide-react'

// Cooking Timer Component
const CookingTimer = () => {
  const [time, setTime] = useState(420)
  const [isRunning, setIsRunning] = useState(false)

  useEffect(() => {
    let interval
    if (isRunning && time > 0) {
      interval = setInterval(() => setTime(t => t - 1), 1000)
    }
    return () => clearInterval(interval)
  }, [isRunning, time])

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="bg-gradient-to-br from-red-950/50 to-slate-900 p-8 rounded-2xl border border-red-500/30 text-center">
      <div className="text-6xl md:text-7xl font-black text-red-500 mb-4 font-mono">
        {formatTime(time)}
      </div>
      <p className="text-gray-400 mb-6">Время варки идеального супа</p>
      <div className="flex gap-4 justify-center">
        <button
          onClick={() => setIsRunning(!isRunning)}
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-bold transition-all flex items-center gap-2"
        >
          <SafeIcon name={isRunning ? "pause" : "play"} size={20} />
          {isRunning ? 'Пауза' : 'Варить'}
        </button>
        <button
          onClick={() => { setTime(420); setIsRunning(false) }}
          className="bg-slate-800 hover:bg-slate-700 text-white px-6 py-3 rounded-xl font-bold transition-all flex items-center gap-2"
        >
          <SafeIcon name="rotate-ccw" size={20} />
          Сброс
        </button>
      </div>
    </div>
  )
}

// Ingredient Card
const IngredientCard = ({ number, title, description, icon, delay }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      className="bg-gradient-to-br from-slate-900 to-black p-6 rounded-2xl border border-red-900/30 hover:border-red-500/50 transition-all group relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-red-600/5 opacity-0 group-hover:opacity-100 transition-opacity" />

      <div className="flex items-start justify-between mb-4">
        <div className="bg-red-600/20 w-12 h-12 rounded-xl flex items-center justify-center">
          <SafeIcon name={icon} className="text-red-500" size={24} />
        </div>
        <span className="text-4xl font-black text-red-600/30">#{number}</span>
      </div>

      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
    </motion.div>
  )
}

// Recipe Step
const RecipeStep = ({ step, title, description, isActive }) => (
  <div className={`flex gap-4 p-4 rounded-xl transition-all ${isActive ? 'bg-red-950/30 border border-red-500/30' : 'opacity-50'}`}>
    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg shrink-0 ${isActive ? 'bg-red-600 text-white' : 'bg-slate-800 text-gray-500'}`}>
      {step}
    </div>
    <div>
      <h4 className="font-bold text-white mb-1">{title}</h4>
      <p className="text-sm text-gray-400">{description}</p>
    </div>
  </div>
)

function App() {
  const [shared, setShared] = useState(false)
  const heroRef = useRef(null)

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Суп из 7 Залуп',
          text: 'Проверь этот легендарный рецепт!',
          url: window.location.href
        })
      } catch (err) {
        console.log('Share canceled')
      }
    } else {
      navigator.clipboard.writeText(window.location.href)
      setShared(true)
      setTimeout(() => setShared(false), 2000)
    }
  }

  const ingredients = [
    { number: 1, title: 'Первая Залупа', description: 'Свежайшая, сорвана на рассвете. Придаёт блюду неповторимый аромат.', icon: 'droplets' },
    { number: 2, title: 'Вторая Залупа', description: 'Выдержанная 7 дней. Секретный ингредиент от бабушки.', icon: 'flame' },
    { number: 3, title: 'Третья Залупа', description: 'Маринованная в слезах одиночества. Добавляет глубину вкуса.', icon: 'skull' },
    { number: 4, title: 'Четвёртая Залупа', description: 'Копчёная на алгоритмах. Привносит нотку современности.', icon: 'zap' },
    { number: 5, title: 'Пятая Залупа', description: 'Измельчённая в порошок. Для пикантной остроты.', icon: 'alert-triangle' },
    { number: 6, title: 'Шестая Залупа', description: 'Сублимированная. Сохраняет все полезные свойства.', icon: 'thermometer' },
    { number: 7, title: 'Седьмая Залупа', description: 'Коронная. Завершает композицию божественным послевкусием.', icon: 'chef-hat' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-black to-slate-950 overflow-x-hidden">
      {/* Floating Bubbles Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="bubble"
            style={{
              left: `${15 + i * 15}%`,
              bottom: `${10 + (i % 3) * 20}%`,
              width: `${20 + i * 10}px`,
              height: `${20 + i * 10}px`,
              animationDelay: `${i * 0.3}s`
            }}
          />
        ))}
      </div>

      {/* Header */}
      <header className="fixed top-0 w-full bg-black/80 backdrop-blur-md z-50 border-b border-red-900/30">
        <nav className="container mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-red-600 p-2 rounded-lg">
              <SafeIcon name="skull" className="text-white" size={24} />
            </div>
            <span className="text-xl md:text-2xl font-black text-white tracking-tighter">
              7ЗАЛУП<span className="text-red-600">.СУП</span>
            </span>
          </div>
          <button
            onClick={handleShare}
            className="bg-red-600/20 hover:bg-red-600/40 text-red-400 px-4 py-2 rounded-lg font-semibold transition-all flex items-center gap-2 text-sm md:text-base"
          >
            <SafeIcon name="share-2" size={18} />
            <span className="hidden sm:inline">{shared ? 'Скопировано!' : 'Поделиться'}</span>
          </button>
        </nav>
      </header>

      {/* Hero Section */}
      <section ref={heroRef} className="relative pt-24 md:pt-32 pb-12 md:pb-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="order-2 lg:order-1"
            >
              <div className="inline-block bg-red-600/20 text-red-400 px-4 py-2 rounded-full text-sm font-bold mb-4 border border-red-600/30">
                <SafeIcon name="alert-triangle" size={16} className="inline mr-2" />
                18+ Контент
              </div>

              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-4 tracking-tighter glitch-text" data-text="СУП ИЗ">
                СУП ИЗ
              </h1>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-red-600 mb-6 tracking-tighter animate-glitch">
                7 ЗАЛУП
              </h1>

              <p className="text-lg md:text-xl text-gray-400 mb-8 leading-relaxed max-w-lg">
                Легендарный рецепт, передающийся из поколения в поколение.
                Готовьте с душой, ешьте с удовольствием.
              </p>

              <div className="flex flex-wrap gap-4">
                <a
                  href="#recipe"
                  onClick={(e) => {
                    e.preventDefault()
                    document.getElementById('recipe').scrollIntoView({ behavior: 'smooth' })
                  }}
                  className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-xl text-lg font-bold transition-all transform hover:scale-105 flex items-center gap-2 shadow-lg shadow-red-600/30"
                >
                  <SafeIcon name="flame" size={20} />
                  Начать Готовку
                </a>
                <a
                  href="#ingredients"
                  onClick={(e) => {
                    e.preventDefault()
                    document.getElementById('ingredients').scrollIntoView({ behavior: 'smooth' })
                  }}
                  className="bg-slate-800 hover:bg-slate-700 text-white px-8 py-4 rounded-xl text-lg font-bold transition-all border border-slate-700"
                >
                  Ингредиенты
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="order-1 lg:order-2 relative"
            >
              <div className="relative rounded-3xl overflow-hidden border-4 border-red-600/30 shadow-2xl shadow-red-600/20">
                <img
                  src="https://oejgkvftpbinliuopipr.supabase.co/storage/v1/object/public/assets/user_1007799268/user-photo-1.jpg"
                  alt="Суп из 7 залуп"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center gap-2 text-white/90 text-sm font-medium">
                  <SafeIcon name="chef-hat" size={16} />
                  <span>Секретный ингредиент: любовь</span>
                </div>
              </div>

              {/* Floating elements around image */}
              <div className="absolute -top-4 -right-4 bg-red-600 text-white p-3 rounded-full animate-bounce shadow-lg">
                <SafeIcon name="flame" size={24} />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-slate-800 text-red-400 p-3 rounded-full border border-red-600/30 animate-pulse">
                <SafeIcon name="clock" size={24} />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-8 border-y border-red-900/20 bg-black/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-black text-red-500">7</div>
              <div className="text-xs md:text-sm text-gray-500">Ингредиентов</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-black text-red-500">420</div>
              <div className="text-xs md:text-sm text-gray-500">Секунд варки</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-black text-red-500">∞</div>
              <div className="text-xs md:text-sm text-gray-500">Удовольствия</div>
            </div>
          </div>
        </div>
      </section>

      {/* Ingredients Section */}
      <section id="ingredients" className="py-16 md:py-24 px-4 relative">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-black text-white mb-4">
              7 <span className="text-red-600">Священных</span> Ингредиентов
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Каждая залупа тщательно отбирается и проходит строгий контроль качества.
              Только лучшее для вашего супа.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {ingredients.map((ing, idx) => (
              <IngredientCard key={idx} {...ing} delay={idx * 0.1} />
            ))}
          </div>
        </div>
      </section>

      {/* Recipe Steps + Timer */}
      <section id="recipe" className="py-16 md:py-24 px-4 bg-gradient-to-b from-black to-slate-950">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12">
            <div>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-8">
                Процесс <span className="text-red-600">Приготовления</span>
              </h2>

              <div className="space-y-4">
                <RecipeStep
                  step={1}
                  title="Подготовка"
                  description="Тщательно промойте все 7 залуп прохладной водой. Просушите полотенцем."
                  isActive={true}
                />
                <RecipeStep
                  step={2}
                  title="Нарезка"
                  description="Нарежьте каждую залупу тонкими полосками. Чем тоньше, тем лучше."
                  isActive={true}
                />
                <RecipeStep
                  step={3}
                  title="Обжарка"
                  description="Разогрейте сковороду до адской температуры. Обжарьте 3 минуты."
                  isActive={true}
                />
                <RecipeStep
                  step={4}
                  title="Варка"
                  description="Залейте кипятком и варите ровно 7 минут. Следите за таймером ниже."
                  isActive={true}
                />
                <RecipeStep
                  step={5}
                  title="Подаваение"
                  description="Разлейте по тарелкам, украсьте зеленью. Приятного аппетита!"
                  isActive={true}
                />
              </div>
            </div>

            <div className="lg:sticky lg:top-24 h-fit">
              <CookingTimer />

              <div className="mt-6 p-6 bg-slate-900 rounded-2xl border border-red-900/30">
                <h4 className="font-bold text-white mb-2 flex items-center gap-2">
                  <SafeIcon name="alert-triangle" size={18} className="text-yellow-500" />
                  Важно!
                </h4>
                <p className="text-sm text-gray-400">
                  Не переварите! Переваренные залупы теряют свои целебные свойства
                  и становятся жёсткими. Следите за таймером внимательно.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-red-600/10" />
        <div className="container mx-auto max-w-4xl relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
              Готовы Попробовать?
            </h2>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              Приготовьте этот легендарный суп и поделитесь результатом с друзьями.
              Они будут в восторге!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleShare}
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-xl text-lg font-bold transition-all transform hover:scale-105 flex items-center justify-center gap-2 shadow-lg shadow-red-600/50"
              >
                <SafeIcon name="share-2" size={20} />
                {shared ? 'Ссылка скопирована!' : 'Поделиться Безумием'}
              </button>
            </div>

            <p className="text-sm text-gray-500 mt-6">
              * Мы не несём ответственности за реакцию ваших родных
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-red-900/30 py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="bg-red-600/20 p-2 rounded-lg">
                <SafeIcon name="skull" className="text-red-500" size={20} />
              </div>
              <span className="text-xl font-bold text-white">7ЗАЛУП.СУП</span>
            </div>

            <div className="text-gray-500 text-sm text-center md:text-right">
              <p>© 2024 Все права защищены. Сделано с любовью.</p>
              <p className="mt-1 text-xs">Не для слабонервных</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
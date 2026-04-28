import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'تعلم العربية | Learn Arabic Online',
  description:
    'دروس عربية مباشرة مع معلمين أصليين. Live Arabic lessons with native teachers — Modern Standard Arabic, Quranic Arabic, and conversational dialects.',
}

const features = [
  {
    icon: '🎓',
    titleAr: 'معلمون أصليون',
    titleEn: 'Native Teachers',
    bodyEn: 'Learn from certified instructors from across the Arab world.',
  },
  {
    icon: '📅',
    titleAr: 'جداول مرنة',
    titleEn: 'Flexible Schedule',
    bodyEn: 'Book lessons that fit your timezone — mornings, evenings, weekends.',
  },
  {
    icon: '📖',
    titleAr: 'منهج متدرج',
    titleEn: 'Structured Curriculum',
    bodyEn: 'From the Arabic alphabet to fluent conversation, level by level.',
  },
  {
    icon: '🕌',
    titleAr: 'العربية الفصحى والقرآنية',
    titleEn: 'Modern & Quranic Arabic',
    bodyEn: 'Choose MSA, classical Quranic Arabic, or popular dialects.',
  },
  {
    icon: '💬',
    titleAr: 'محادثة حية',
    titleEn: 'Live Conversation',
    bodyEn: 'Practice speaking from day one in small group or 1-on-1 sessions.',
  },
  {
    icon: '✅',
    titleAr: 'شهادات معتمدة',
    titleEn: 'Certificates',
    bodyEn: 'Earn a certificate after completing each level.',
  },
]

const plans = [
  {
    name: 'Starter',
    nameAr: 'المبتدئ',
    price: '$29',
    period: '/ month',
    features: [
      '4 group lessons / month',
      'Access to learning library',
      'Community chat',
    ],
    highlight: false,
  },
  {
    name: 'Fluent',
    nameAr: 'الطلاقة',
    price: '$79',
    period: '/ month',
    features: [
      '12 group lessons / month',
      '2 private 1-on-1 sessions',
      'Personal study plan',
      'Certificate on completion',
    ],
    highlight: true,
  },
  {
    name: 'Mastery',
    nameAr: 'الإتقان',
    price: '$149',
    period: '/ month',
    features: [
      'Unlimited group lessons',
      '8 private 1-on-1 sessions',
      'Quranic Arabic track',
      'Dedicated tutor',
    ],
    highlight: false,
  },
]

const steps = [
  {
    n: '1',
    titleEn: 'Take a placement test',
    titleAr: 'اختبار تحديد المستوى',
    bodyEn: 'A 10-minute quiz to find your level — beginner to advanced.',
  },
  {
    n: '2',
    titleEn: 'Match with a teacher',
    titleAr: 'اختر معلمك',
    bodyEn: 'We pair you with a native instructor who fits your goals and schedule.',
  },
  {
    n: '3',
    titleEn: 'Start speaking Arabic',
    titleAr: 'ابدأ التحدث',
    bodyEn: 'Your first lesson is on us. Cancel anytime.',
  },
]

export default function ArabicLandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-emerald-50 text-gray-900">
      <header className="px-6 py-5 flex items-center justify-between max-w-6xl mx-auto">
        <div className="flex items-center gap-2">
          <span className="text-2xl">ٱ</span>
          <span className="font-bold text-lg tracking-tight">Lisan Academy</span>
        </div>
        <nav className="hidden sm:flex items-center gap-6 text-sm font-medium text-gray-700">
          <a href="#features" className="hover:text-emerald-700">Features</a>
          <a href="#how" className="hover:text-emerald-700">How it works</a>
          <a href="#pricing" className="hover:text-emerald-700">Pricing</a>
        </nav>
        <Link
          href="#pricing"
          className="px-4 py-2 rounded-full bg-emerald-700 text-white text-sm font-semibold hover:bg-emerald-800"
        >
          Start free
        </Link>
      </header>

      <section className="px-6 pt-12 pb-20 max-w-6xl mx-auto text-center">
        <p
          dir="rtl"
          lang="ar"
          className="text-5xl sm:text-6xl font-bold text-emerald-900 leading-tight"
        >
          تعلّم العربية بثقة
        </p>
        <h1 className="mt-3 text-3xl sm:text-5xl font-bold tracking-tight">
          Learn Arabic with confidence.
        </h1>
        <p className="mt-6 text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
          Live lessons with native teachers. Read, write, and speak Arabic in
          weeks — not years. Start with a free trial lesson today.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="#pricing"
            className="w-full sm:w-auto px-8 py-3 rounded-full bg-emerald-700 text-white font-semibold hover:bg-emerald-800"
          >
            Book a free lesson
          </Link>
          <a
            href="#how"
            className="w-full sm:w-auto px-8 py-3 rounded-full border-2 border-emerald-700 text-emerald-700 font-semibold hover:bg-emerald-50"
          >
            See how it works
          </a>
        </div>
        <p className="mt-6 text-sm text-gray-500">
          No credit card needed · Cancel anytime
        </p>
      </section>

      <section id="features" className="px-6 py-16 bg-white border-y border-gray-100">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center">
            Everything you need to become fluent
          </h2>
          <p
            dir="rtl"
            lang="ar"
            className="mt-2 text-lg text-gray-600 text-center"
          >
            كل ما تحتاجه لتتقن اللغة العربية
          </p>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <div
                key={f.titleEn}
                className="rounded-2xl border border-gray-200 p-6 hover:shadow-md transition-shadow"
              >
                <div className="text-3xl">{f.icon}</div>
                <h3 className="mt-4 font-semibold text-lg">{f.titleEn}</h3>
                <p dir="rtl" lang="ar" className="text-emerald-800 text-sm mt-1">
                  {f.titleAr}
                </p>
                <p className="mt-3 text-gray-600 text-sm">{f.bodyEn}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="how" className="px-6 py-16 max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center">
          Start in three steps
        </h2>
        <p
          dir="rtl"
          lang="ar"
          className="mt-2 text-lg text-gray-600 text-center"
        >
          ابدأ في ثلاث خطوات
        </p>
        <div className="mt-12 grid gap-8 sm:grid-cols-3">
          {steps.map((s) => (
            <div key={s.n} className="text-center">
              <div className="mx-auto w-12 h-12 rounded-full bg-emerald-700 text-white font-bold text-xl flex items-center justify-center">
                {s.n}
              </div>
              <h3 className="mt-4 font-semibold text-lg">{s.titleEn}</h3>
              <p dir="rtl" lang="ar" className="text-emerald-800 text-sm">
                {s.titleAr}
              </p>
              <p className="mt-2 text-gray-600 text-sm">{s.bodyEn}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="pricing" className="px-6 py-16 bg-emerald-900/95 text-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center">
            Simple, honest pricing
          </h2>
          <p
            dir="rtl"
            lang="ar"
            className="mt-2 text-lg text-emerald-100 text-center"
          >
            أسعار بسيطة وشفافة
          </p>
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {plans.map((p) => (
              <div
                key={p.name}
                className={`rounded-2xl p-8 ${
                  p.highlight
                    ? 'bg-amber-300 text-gray-900 ring-4 ring-amber-200/50 scale-[1.02]'
                    : 'bg-emerald-800 text-white'
                }`}
              >
                <div className="flex items-baseline justify-between">
                  <h3 className="font-bold text-xl">{p.name}</h3>
                  <span
                    dir="rtl"
                    lang="ar"
                    className={`text-sm ${p.highlight ? 'text-emerald-900' : 'text-emerald-100'}`}
                  >
                    {p.nameAr}
                  </span>
                </div>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-bold">{p.price}</span>
                  <span className="text-sm opacity-80">{p.period}</span>
                </div>
                <ul className="mt-6 space-y-2 text-sm">
                  {p.features.map((feat) => (
                    <li key={feat} className="flex gap-2">
                      <span>✓</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
                <button
                  className={`mt-8 w-full py-3 rounded-full font-semibold ${
                    p.highlight
                      ? 'bg-emerald-900 text-white hover:bg-emerald-950'
                      : 'bg-white text-emerald-900 hover:bg-amber-50'
                  }`}
                >
                  Get started
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20 max-w-3xl mx-auto text-center">
        <p
          dir="rtl"
          lang="ar"
          className="text-3xl sm:text-4xl font-bold text-emerald-900"
        >
          ابدأ رحلتك اليوم
        </p>
        <h2 className="mt-2 text-2xl sm:text-3xl font-bold">
          Begin your journey today.
        </h2>
        <p className="mt-4 text-gray-600">
          Join thousands of students learning Arabic the right way — with real
          teachers, real conversation, and real results.
        </p>
        <Link
          href="#pricing"
          className="mt-8 inline-block px-10 py-4 rounded-full bg-emerald-700 text-white font-semibold hover:bg-emerald-800"
        >
          Book a free lesson
        </Link>
      </section>

      <footer className="border-t border-gray-200 px-6 py-8 text-sm text-gray-500">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <span>© {new Date().getFullYear()} Lisan Academy</span>
          <span dir="rtl" lang="ar">
            مع حبنا للغة العربية
          </span>
        </div>
      </footer>
    </div>
  )
}

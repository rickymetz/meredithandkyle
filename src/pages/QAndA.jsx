import { useState } from 'react'

const faqs = [
  {
    question: 'Can I bring a date?',
    answer: 'Please check your invite for your +1!',
  },
  {
    question: 'Are kids welcome?',
    answer: 'Yes! Children are welcome at all events. The venues can provide high chairs, and Cigarral de las Mercedes can provide cribs.',
  },
  {
    question: 'What should I wear?',
    answer: 'In London: Smart dress for the civil ceremony and dinner. We will primarily be indoors. For reference, Kyle will be in a suit and tie.\n\nIn Spain: Dress for fun and comfort! It will be hot and some events will be outdoors (grass, gravel), so dress accordingly. For reference, at the big party on June 29, Kyle will be in a linen suit with no tie. Color and flair are very welcome.',
  },
  {
    question: 'Is it okay to take pictures with our phones and cameras during the wedding?',
    answer: 'We will have a photographer and videographer in attendance, so we ask that guests refrain from taking photos during the ceremony.',
  },
  {
    question: 'Whom should I call with questions?',
    answer: 'You can text or WhatsApp Kyle or Meredith.',
  },
]

function AccordionItem({ question, answer, index }) {
  const [open, setOpen] = useState(false)
  const buttonId = `faq-button-${index}`
  const panelId = `faq-panel-${index}`

  return (
    <div className="border-b border-cream-dark">
      <button
        id={buttonId}
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 px-1 text-left focus:outline-none focus:ring-2 focus:ring-wine/30 focus:ring-offset-2 focus:ring-offset-cream-light rounded-md group"
        aria-expanded={open}
        aria-controls={panelId}
      >
        <span className="font-sans font-medium text-brown text-base md:text-lg pr-4">
          {question}
        </span>
        <svg
          className={`w-5 h-5 text-brown-light shrink-0 transition-transform duration-200 ${
            open ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth={2}
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        className={`overflow-hidden transition-all duration-200 ${
          open ? 'max-h-96 pb-5' : 'max-h-0'
        }`}
      >
        <p className="px-1 text-brown-light font-sans text-sm leading-relaxed whitespace-pre-line">
          {answer}
        </p>
      </div>
    </div>
  )
}

function QAndA() {
  return (
    <>
      <div className="relative h-48 sm:h-64 md:h-72 overflow-hidden">
        <img src="/photos/hero-garden.jpg" alt="" className="w-full h-full object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-t from-cream-light via-cream-light/30 to-transparent" />
        <h1 className="absolute bottom-4 sm:bottom-6 left-6 sm:left-8 font-serif text-3xl sm:text-4xl md:text-5xl text-wine drop-shadow-sm">
          Q &amp; A
        </h1>
      </div>
      <div className="max-w-2xl mx-auto px-6 py-10 md:py-16">
      <div className="border-t border-cream-dark">
        {faqs.map((faq, i) => (
          <AccordionItem key={faq.question} question={faq.question} answer={faq.answer} index={i} />
        ))}
      </div>
      </div>
    </>
  )
}

export default QAndA

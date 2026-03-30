import { useState } from 'react'

const faqs = [
  {
    question: 'What should I wear?',
    answer: 'Details coming soon...',
  },
  {
    question: 'How do I get from London to Toledo?',
    answer: 'Details coming soon...',
  },
  {
    question: 'Where should I stay?',
    answer: 'Details coming soon...',
  },
  {
    question: "What's the weather like in June?",
    answer: 'Details coming soon...',
  },
  {
    question: 'Can I bring a plus one?',
    answer: 'Details coming soon...',
  },
]

function AccordionItem({ question, answer }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="border-b border-cream-dark">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 px-1 text-left focus:outline-none group"
        aria-expanded={open}
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
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <div
        className={`overflow-hidden transition-all duration-200 ${
          open ? 'max-h-96 pb-5' : 'max-h-0'
        }`}
      >
        <p className="px-1 text-brown-light font-sans text-sm leading-relaxed">
          {answer}
        </p>
      </div>
    </div>
  )
}

function QAndA() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-16 md:py-24">
      <h1 className="font-serif text-4xl md:text-5xl text-wine text-center mb-12">
        Q &amp; A
      </h1>

      <div className="border-t border-cream-dark">
        {faqs.map((faq) => (
          <AccordionItem key={faq.question} question={faq.question} answer={faq.answer} />
        ))}
      </div>
    </div>
  )
}

export default QAndA

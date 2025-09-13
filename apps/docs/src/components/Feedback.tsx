'use client'

import { Transition } from '@headlessui/react'
import clsx from 'clsx'
import { useTranslations } from 'next-intl'
import { forwardRef, useState } from 'react'

function CheckIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" {...props}>
      <circle cx="10" cy="10" r="10" strokeWidth="0" />
      <path
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="m6.75 10.813 2.438 2.437c1.218-4.469 4.062-6.5 4.062-6.5"
      />
    </svg>
  )
}

function FeedbackButton(
  props: Omit<React.ComponentPropsWithoutRef<'button'>, 'type' | 'className'>
) {
  return (
    <button
      type="submit"
      className="hover:bg-zinc-900/2.5 px-3 text-sm font-medium text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-white/5 dark:hover:text-white"
      {...props}
    />
  )
}

const FeedbackForm = forwardRef<React.ElementRef<'form'>, React.ComponentPropsWithoutRef<'form'>>(
  function FeedbackForm({ onSubmit, className, ...props }, ref) {
    const t = useTranslations('Feedback')

    return (
      <form
        {...props}
        ref={ref}
        onSubmit={onSubmit}
        className={clsx(
          className,
          'absolute inset-0 flex items-center justify-center gap-6 md:justify-start'
        )}
      >
        <p className="text-sm text-zinc-600 dark:text-zinc-400">{t('question')}</p>
        <div className="group grid h-8 grid-cols-[1fr_1px_1fr] overflow-hidden rounded-full border border-zinc-900/10 dark:border-white/10">
          <FeedbackButton data-response="yes">{t('yes')}</FeedbackButton>
          <div className="bg-zinc-900/10 dark:bg-white/10" />
          <FeedbackButton data-response="no">{t('no')}</FeedbackButton>
        </div>
      </form>
    )
  }
)

const FeedbackThanks = forwardRef<React.ElementRef<'div'>, React.ComponentPropsWithoutRef<'div'>>(
  function FeedbackThanks({ className, ...props }, ref) {
    const t = useTranslations('Feedback')

    return (
      <div
        {...props}
        ref={ref}
        className={clsx(className, 'absolute inset-0 flex justify-center md:justify-start')}
      >
        <div className="flex items-center gap-3 rounded-full bg-amber-50/50 py-1 pl-1.5 pr-3 text-sm text-amber-900 ring-1 ring-inset ring-amber-500/20 dark:bg-amber-500/5 dark:text-amber-200 dark:ring-amber-500/30">
          <CheckIcon className="h-5 w-5 flex-none fill-amber-500 stroke-white dark:fill-amber-200/20 dark:stroke-amber-200" />
          {t('thanks')}
        </div>
      </div>
    )
  }
)

export function Feedback() {
  let [submitted, setSubmitted] = useState(false)

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    // event.nativeEvent.submitter.dataset.response
    // => "yes" or "no"

    setSubmitted(true)
  }

  return (
    <div className="relative h-8">
      <Transition show={!submitted}>
        <FeedbackForm
          className="data-closed:opacity-0 data-leave:pointer-events-none duration-300"
          onSubmit={onSubmit}
        />
      </Transition>
      <Transition show={submitted}>
        <FeedbackThanks className="data-closed:opacity-0 delay-150 duration-300" />
      </Transition>
    </div>
  )
}

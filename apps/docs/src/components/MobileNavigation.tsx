'use client'

import { Dialog, DialogBackdrop, DialogPanel, TransitionChild } from '@headlessui/react'
import { motion } from 'framer-motion'
import { Suspense, createContext, useContext } from 'react'
import { create } from 'zustand'

import { Header } from '@/components/Header'
import { Navigation } from '@/components/Navigation'

function MenuIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 10 9" fill="none" strokeLinecap="round" aria-hidden="true" {...props}>
      <path d="M.5 1h9M.5 8h9M.5 4.5h9" />
    </svg>
  )
}

function XIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 10 9" fill="none" strokeLinecap="round" aria-hidden="true" {...props}>
      <path d="m1.5 1 7 7M8.5 1l-7 7" />
    </svg>
  )
}

const IsInsideMobileNavigationContext = createContext(false)

function MobileNavigationDialog({ isOpen, close }: { isOpen: boolean; close: () => void }) {
  return (
    <Dialog transition open={isOpen} onClose={close} className="fixed inset-0 z-50 lg:hidden">
      <DialogBackdrop
        transition
        className="backdrop-blur-xs data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in fixed inset-0 top-14 bg-zinc-400/20 dark:bg-black/40"
      />

      <DialogPanel>
        <TransitionChild>
          <Header className="data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in" />
        </TransitionChild>

        <TransitionChild>
          <motion.div
            layoutScroll
            className="ring-zinc-900/7.5 data-closed:-translate-x-full fixed bottom-0 left-0 top-14 w-full overflow-y-auto bg-white px-4 pb-4 pt-6 shadow-lg shadow-zinc-900/10 ring-1 duration-500 ease-in-out min-[416px]:max-w-sm sm:px-6 sm:pb-10 dark:bg-zinc-900 dark:ring-zinc-800"
          >
            <Navigation />
          </motion.div>
        </TransitionChild>
      </DialogPanel>
    </Dialog>
  )
}

export function useIsInsideMobileNavigation() {
  return useContext(IsInsideMobileNavigationContext)
}

export const useMobileNavigationStore = create<{
  isOpen: boolean
  open: () => void
  close: () => void
  toggle: () => void
}>()((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
}))

export function MobileNavigation() {
  let isInsideMobileNavigation = useIsInsideMobileNavigation()
  let { isOpen, toggle, close } = useMobileNavigationStore()
  let ToggleIcon = isOpen ? XIcon : MenuIcon

  return (
    <IsInsideMobileNavigationContext.Provider value={true}>
      <button
        type="button"
        className="relative flex size-6 items-center justify-center rounded-md transition hover:bg-zinc-900/5 dark:hover:bg-white/5"
        aria-label="Toggle navigation"
        onClick={toggle}
      >
        <span className="pointer-fine:hidden absolute size-12" />
        <ToggleIcon className="w-2.5 stroke-zinc-900 dark:stroke-white" />
      </button>
      {!isInsideMobileNavigation && (
        <Suspense fallback={null}>
          <MobileNavigationDialog isOpen={isOpen} close={close} />
        </Suspense>
      )}
    </IsInsideMobileNavigationContext.Provider>
  )
}

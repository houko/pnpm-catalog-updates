import { Heading } from '@/components/Heading'
import { Library, libraryData } from '@/components/Library'

export function Libraries() {
  return (
    <div className="my-16 xl:max-w-none">
      <Heading level={2} id="official-libraries">
        Official libraries
      </Heading>
      <div className="not-prose mt-4 grid grid-cols-1 gap-x-6 gap-y-10 border-t border-zinc-900/5 pt-10 sm:grid-cols-2 xl:max-w-none xl:grid-cols-3 dark:border-white/5">
        {Object.keys(libraryData).map((language) => (
          <Library key={language} language={language as keyof typeof libraryData} />
        ))}
      </div>
    </div>
  )
}

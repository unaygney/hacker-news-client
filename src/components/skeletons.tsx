import { Loading } from './icons'

export const LoadingData: React.FC = () => {
  return (
    <div className="flex min-h-full w-full items-center justify-center py-10">
      <div className="flex w-full max-w-[272px] flex-col items-center text-center">
        <Loading className="h-6 w-6 animate-spin" />
        <h2 className="mt-5 text-xl font-medium leading-7 text-neutral-900">
          Loading...
        </h2>
        <p className="mt-2 text-base font-normal leading-6 text-neutral-900">
          Almost there! We&apos;re setting everything up for you.
        </p>
      </div>
    </div>
  )
}

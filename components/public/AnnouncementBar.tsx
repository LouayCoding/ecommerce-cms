'use client'

export function AnnouncementBar() {
  return (
    <div className="fixed top-0 left-0 right-0 z-[60] bg-black text-white">
      <div className="mx-auto flex h-10 max-w-[1800px] items-center justify-center px-8">
        <p className="text-[13px] tracking-wide">
          Gratis verzending bij bestellingen boven €200
        </p>
      </div>
    </div>
  )
}

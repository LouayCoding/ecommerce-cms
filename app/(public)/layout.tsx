import { EmailPopup } from '@/components/public/EmailPopup'
import { AnnouncementBar } from '@/components/public/AnnouncementBar'
import { MobileNav } from '@/components/public/MobileNav'
import { DesktopNav } from '@/components/public/DesktopNav'

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-black">
      {/* Announcement Bar - Always visible */}
      <AnnouncementBar />
      
      {/* Mobile Navigation */}
      <MobileNav />
      
      {/* Desktop Navigation - LV Style with scroll detection */}
      <DesktopNav />
      
      <main>{children}</main>
      <EmailPopup />
    </div>
  )
}

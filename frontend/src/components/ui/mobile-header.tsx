'use client'

import { usePathname } from 'next/navigation'

const MobileHeader = () => {
  const pathname = usePathname()
  const routes = [
    {
      href: '/',
      label: 'Home'
    },
    {
      href: '/recommendations',
      label: 'Recommendations'
    },
  ]

  return (
    <header className="md:hidden fixed top-0 w-full h-14 px-4 border-b shadow-sm bg-white flex items-center">
      <div className="flex items-center w-full justify-between">
        <nav className="flex justify-center items-center gap-4">
          {routes.map((route) => (
            <a
              key={route.href}
              href={route.href}
              className={`text-sm text-gray-400  ${
                pathname === route.href ? "text-gray-950 text-sm" : ''
              }`}
            >
              {route.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}

export default MobileHeader 
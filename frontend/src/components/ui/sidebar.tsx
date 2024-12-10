'use client'
import React from 'react'
import { Nav } from './nav'
import {
    ChevronRight,
    ScanText,
    UsersRound,
  } from "lucide-react"
import { Button } from './button'

import { useWindowWidth } from '@react-hook/window-size'
import { usePathname } from 'next/navigation'

type Props = {}
export default function Sidebar({}: Props) {

    const [isCollapsed, setIsCollapsed] = React.useState(false)
    const pathname = usePathname()
    
    // Add this console.log to see the actual pathname
    console.log('Current pathname:', pathname)

    const onlyWidth = useWindowWidth()
    const mobileWidth = onlyWidth < 768

    function toggleSidebar(){
        setIsCollapsed(!isCollapsed)
    }
    return (
        <div className='relative min-h-screen min-w-[80px] border-r px-3 pb-10 pt-24'>
            {!mobileWidth &&
                <div className='absolute right-[-20px] top-7'>
                    <Button variant='secondary' className='rounded-full p-2' onClick={toggleSidebar}>
                        <ChevronRight/>
                    </Button>
                </div>
            }
            <Nav
                isCollapsed={mobileWidth ? true : isCollapsed}
                links={[
                    {
                        title: "Add recommendation",
                        href: "/",
                        icon: UsersRound,
                        variant: pathname === "/" ? "default" : "ghost",
                    },
                    {
                        title: "Recommendations",
                        href: `/recommendations`,
                        icon: ScanText,
                        variant:"ghost",
                    },
                ]}
            />
        </div>
    )
}
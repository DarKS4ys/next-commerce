"use client"

import React from 'react'
import Button from '@/components/Button'
import { useFirebase } from '@/utils/authContext'
import Image from 'next/image'
import Link from 'next/link'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu'
import { DropdownMenuLabel, DropdownMenuSeparator } from '@radix-ui/react-dropdown-menu'

export default function Navbar() {
  const { user, signInWithGoogle, signOut } = useFirebase()

  const handleSignInClick = async () => {
    try {
      await signInWithGoogle()
    } catch (error) {
      console.error('Error signing in:', error)
    }
  }

  const handleSignOutClick = async () => {
    try {
      await signOut()
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  return (
    <div className='fixed top-0 left-0 right-0 z-10 shadow-md bg-black border-b border-[--border]'>
      <div className='container mx-auto flex justify-between items-center p-8 px-16 text-lg w-full'>
        <Link href={'/'} className='font-semibold uppercase text-2xl'>Next Commerce</Link>
        <div className='gap-3 flex items-center'>
          {user ? (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger>
                {user.photoUrl ? 
                    <Image className="w-10 h-10 rounded-full border border-[--border]" width={500} height={500} src={user.photoUrl} alt='User Profile Picture'/>
                  : null}
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                <DropdownMenuLabel>My account</DropdownMenuLabel>
                <DropdownMenuGroup>
                <DropdownMenuItem>Create New Item</DropdownMenuItem>
                <DropdownMenuItem onClick={handleSignOutClick} >Log Out</DropdownMenuItem>
                </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <Button onClick={handleSignInClick}>Sign In</Button>
          )}
        </div>
      </div>
    </div>
  )
}
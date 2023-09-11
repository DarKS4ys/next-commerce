"use client"

import React, { useEffect, useState } from 'react'
import Button from '@/components/Button'
import { useFirebase } from '@/utils/authContext'
import Image from 'next/image'
import Link from 'next/link'
import { Dropdown } from 'antd';
import {BiLoader} from 'react-icons/bi'
import {AiFillShopping, AiOutlineShopping} from 'react-icons/ai'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/utils/firebase'

export default function Navbar() {
  const { user, signInWithGoogle, signOut, loading } = useFirebase()
  const [userStatus, setUserStatus] = useState('');

  useEffect(() => {
    const fetchUserStatus = async () => {
      if (user) {
        const userRef = doc(db, 'users', user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const userData = userSnap.data();
          if (userData && userData.status) {
            setUserStatus(userData.status);
          }
        }
      }
    };

    fetchUserStatus();
  }, [user])

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

  let profileItems; // Declare profileItems variable outside the conditional blocks

  console.log(userStatus)

  if (userStatus === 'admin') {
    profileItems = [
      {
        key: "1",
        label: (
          <button >
            Create new item
          </button>
        ),
      },
      {
        key: "2",
        label: (
          <Link href={'/cart'}>
            Cart
          </Link>
        ),
      },
      {
        key: "3",
        danger: true,
        label: (
          <button onClick={() => handleSignOutClick()}>
            Log Out
          </button>
        ),
      },
    ]
  } else {
    profileItems = [
      {
        key: "2",
        label: (
          <Link href={'/cart'}>
            Cart
          </Link>
        ),
      },
      {
        key: "3",
        danger: true,
        label: (
          <button onClick={() => handleSignOutClick()}>
            Log Out
          </button>
        ),
      },
    ]
  }

  return (
    <div className='fixed top-0 left-0 right-0 z-10 shadow-md bg-black border-b border-[--border]'>
      <div className='h-28 container mx-auto flex justify-between items-center p-8 px-16 text-lg w-full'>
        <Link href={'/'} className='font-semibold uppercase text-2xl'>Next Commerce</Link>
        <div className='gap-3 flex items-center'>
        
        {loading ? (
          <>
          <p>Loading...</p><BiLoader className="animate-spin text-center items-center justify-center" size={28}/>
          </>
        ) : user ? (
            <>
              {user.photoUrl ? 
              <>
              <Link href={'/cart'}>
                <div className='group hover:scale-110 transition active:scale-100'>
                <AiOutlineShopping className="group-hover:hidden transition" size={24}/>
                <AiFillShopping className="group-hover:block hidden transition" size={24}/>
                </div>
              </Link>
                <Dropdown
                  trigger={['click']}
                  placement="bottomRight"
                  menu={{ items: profileItems }}
                >
                  <Image quality={95} className="hover:ring-2 hover:ring-offset-2 ring-offset-[--bg] ring-[--border] transition cursor-pointer sm:w-12 sm:h-12 w-10 h-10 rounded-full border border-[--border]" width={500} height={500} src={user.photoUrl} alt='User Profile Picture'/>
                </Dropdown>
                </>
                : null}
            </>
          ) : (
            <Button onClick={handleSignInClick}>Sign In</Button>
          )}
          </div>
      </div>
    </div>
  )
}
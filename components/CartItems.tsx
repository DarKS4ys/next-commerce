"use client"

import { auth, db } from '@/utils/firebase';
import { collection, deleteDoc, doc, onSnapshot, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import Button from './Button';
import {FiTrash} from 'react-icons/fi'

interface CartItem {
  name: string;
  price: number;
  imageUrl: string;
  id: string
}

export default function CartItems() {
  const user = auth.currentUser;
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    if (user) {
      const userId = user.uid;
      const userCartRef = collection(db, 'users', userId, 'cart');

      const cartQuery = query(userCartRef);

      const unsubscribe = onSnapshot(cartQuery, (snapshot) => {
        const items: CartItem[] = []
        snapshot.forEach((doc) => {
          const data = doc.data() as CartItem;
          items.push(data)
        })
        setCartItems(items)
      })
      return () => {
        unsubscribe();
      };
    }
  }, [user]);

  return (
    <ul>
    {cartItems.map((item, index) => (
      <>
      <li key={index} className="flex gap-2 text-sm my-2 py-2">
        <Image className="rounded-lg h-20 w-20" width={200} height={200} src={item.imageUrl} alt="product image"/>
        <div className="flex-col flex gap-1 p-2">
          <p className="font-medium">{item.name}</p>
          <p className='text-muted-foreground'>{'$ ' + item.price}</p>
        </div>
        <Button className="h-[5rem] w-[5rem] ml-auto"><FiTrash /></Button>
      </li>
      <hr className="w-full border border-[--border]"/>
      </>
    ))}
  </ul>
  )
}

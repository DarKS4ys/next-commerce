"use client"

import { useToast } from "@/components/ui/use-toast"
import React, { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation';
import { addDoc, collection, doc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/utils/firebase';
import Navbar from '@/components/Navbar';
import Image from 'next/image';
import Button from '@/components/Button';
import { BiCart } from 'react-icons/bi';
import {BsChevronLeft} from 'react-icons/bs'

interface ProductTypes {
    id: string;
    name: string;
    description: string;
    imageUrl: string;
    price: number;
  }

export default function Product() {
    const { productId } = useParams();
    const { toast } = useToast()
    const router = useRouter()

    const [product, setProduct] = useState<ProductTypes | null>(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                if (productId) {
                    const productDocRef = doc(db, 'products', productId as string)
                    const productSnap = await getDoc(productDocRef)

                    if (productSnap.exists()) {
                      const productData = productSnap.data() as ProductTypes;
                        if (productData) {
                          setProduct(productData)
                        }
                    }
                } else {
                    router.push('/')
                }
            } catch(err) {
                console.error(err)
            }
        }
      fetchProduct();
    })

    const addToCart = async () => {
      try {
        if (product) {
          // Get the user's ID from Firebase Authentication
          const user = auth.currentUser;
          if (user) {
            const userId = user.uid;
  
            const cartCollectionRef = collection(db, 'users', userId, 'cart');
  
            await addDoc(cartCollectionRef, {
              name: product.name,
              imageUrl: product.imageUrl,
              price: product.price,
            });

            toast({
              title: "Product added to the cart",
              description: `${product.name}`,
            })
  
            // You can also provide feedback to the user that the item was added to the cart
            console.log('Item added to cart');
          }
        }
      } catch (err) {
        console.error(err);
      }
    };

  return (
    <main className="h-screen w-full flex flex-col">
      <Navbar/>
      {product ? (
        <>
        <div className="flex flex-col h-screen justify-center items-center gap-2 mt-32">
        <button className="flex gap-1 items-center" onClick={() => router.back()}><BsChevronLeft/>Go Back</button>
          <section className='flex w-[50rem] gap-5 border border-[--border] rounded-lg p-14'>
            <div className="max-h-[25rem] max-w-[25rem] relative flex">
              <Image className="rounded-lg" alt="product image" src={product.imageUrl} height={400} width={400}/>
            </div>
            <div className="p-8 gap-2 h-full flex flex-col text-xl items-stretch justify-between">
              <div className="flex flex-col gap-2 h-full text-3xl pb-16 w-72">
                <h1>{product.name}</h1>
                <p className="text-base text-muted-foreground">{product.description}</p>
              </div>
              <p>{product.price + " $"}</p>
              <Button onClick={addToCart} className='group hover:scale-110 active:scale-100 hover:bg-white hover:text-black'>
                Add to cart
                <div className='group-hover:translate-x-4 transition text-white group-hover:text-black'>
                <BiCart/>
                </div>
              </Button>
            </div>
          </section>
          {/* Render other product details */}
        </div>
      </>
      ) : (
        <div className="flex h-screen justify-center items-center gap-3">
          <p>Loading...</p>
        </div>
      )}
    </main>
  );
}
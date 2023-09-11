"use client"

import React, { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/utils/firebase';
import Navbar from '@/components/Navbar';

interface ProductTypes {
    id: string;
    name: string;
    description: string;
    imageUrl: string;
    price: number;
  }

export default function Product() {
    const { productId } = useParams();
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
                          console.log(productData)
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

  return (
    <main className="h-screen w-full flex flex-col">
      <Navbar/>
      {product ? (
        <div className="flex h-screen justify-center items-center gap-3">
            <p>{product.id}{product.name}</p>
          {/* Render other product details */}
        </div>
      ) : (
        <div className="flex h-screen justify-center items-center gap-3">
          <p>Loading...</p>
        </div>
      )}
    </main>
  );
}
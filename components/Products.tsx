"use client"

import React, { useEffect, useState } from 'react';
import { collection, getDocs, onSnapshot } from 'firebase/firestore';
import { db } from '@/utils/firebase';
import ProductCard from './ProductCard';

interface Product {
  id: string;
  imageUrl: string;
  name: string;
  price: number;
}

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Create a query for the 'products' collection
    const productsCollectionRef = collection(db, 'products');

    // Set up a real-time listener
    const unsubscribe = onSnapshot(productsCollectionRef, (snapshot) => {
      const productsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Product[]; // Cast the array to the correct type

      setProducts(productsData);
    });

    return () => {
      // Unsubscribe from the listener when the component unmounts
      unsubscribe();
    };
  }, []);

  return (
    <div className='flex p-8 gap-8'>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          productId={product.id}
          productImg={product.imageUrl}
          productName={product.name}
          productPrice={product.price}
        />
      ))}
    </div>
  );
}

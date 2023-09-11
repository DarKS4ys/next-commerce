"use client"

import React, { useEffect, useState } from 'react';
import { collection, getDocs, onSnapshot } from 'firebase/firestore';
import { db } from '@/utils/firebase';
import ProductCard from './ProductCard';
import {motion} from 'framer-motion'


interface Product {
  id: string;
  imageUrl: string;
  name: string;
  price: number;
}

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);

  const fadeInAnimationVariants = { // for framer motion  
    initial: {
        opacity: 0,
        y: 100,
    },
    animate: (index: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: 0.05 * index,
        }
    })
}

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
        <motion.div
        key={product.id}
        variants={fadeInAnimationVariants}
        initial="initial"
        whileInView="animate"
        viewport={{
          once: true,
        }}
        whileHover={{
          scale: 1.03
        }}
        whileTap={{
          scale: 1
        }}
        >
          <ProductCard
            productId={product.id}
            productImg={product.imageUrl}
            productName={product.name}
            productPrice={product.price}
          />
        </motion.div>
      ))}
    </div>
  );
}

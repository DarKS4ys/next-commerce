import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function ProductCard({productId, productImg, productName, productPrice}: {productId: string, productImg: string, productName: string, productPrice: number}) {
  const integerPart = Math.floor(productPrice);
  const fractionalPart = (productPrice - integerPart).toFixed(2).slice(2);
  return (
      <Link href={'/products/' + productId}>
        <div className="group bg-[--bg] hover:rotate-3 hover:bg-[--border] transition duration-200 hover:ring-4 hover:ring-offset-4 ring-offset-[--bg] ring-[--border] text-lg gap-4 flex flex-col border border-[--border] p-8 rounded-xl items-center justify-center h-[30rem]">
          <div
            className="relative max-w-xs overflow-hidden bg-cover w-[30rem] h-[30rem]"
          >
            <Image
              className="group-hover:scale-110 transition duration-200"
              layout="fill" // Fill the container size
              objectFit="contain" // Ensure the entire image is visible within the container
              src={productImg}
              alt="Product Image"
            />
          </div>
          <div className="flex flex-col items-center justify-center gap-1 h-32">
            <h1 className="text-2xl">{productName}</h1>
            <p>
              {integerPart}
              <span className="text-sm">.{fractionalPart}</span>
              <span className="text-sm">$</span>
            </p>
          </div>
        </div>
      </Link>
    );
}

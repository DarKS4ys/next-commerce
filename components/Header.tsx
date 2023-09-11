"use client"
import React from 'react'
import {motion} from 'framer-motion'

export default function Header() {
  return (
    <motion.div
    initial={{
        y: -100,
        opacity: 0
    }}
    animate={{
    y: 0,
    opacity: 1
    }}
    >
        <h1 className="text-7xl mt-64 font-medium">NEXT COMMERCE</h1>
    </motion.div>
  )
}

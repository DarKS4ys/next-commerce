import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import Products from "@/components/Products";

export default function Home() {
  return (
    <main className="h-full w-full flex flex-col">
      <Navbar/>
      <div className="text-center flex flex-col justify-center items-center gap-3">
      <div className="gradient-01 animate-pulse duration-4 opacity-80 absolute w-full h-[100px] top-10 z-[-10] mt-32"></div>
          <Header/>
        <div className="flex flex-col mt-32">
        <Products/>
        </div>
      </div>
    </main>
  )
}

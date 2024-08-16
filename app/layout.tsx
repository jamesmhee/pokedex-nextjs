"use client"

import type { Metadata } from "next";
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { Inter } from "next/font/google";
import Dot from "./components/animata/background/dot";
import Link from "next/link";
import JitterText from "./components/animata/text/jitter-text-";
import { MdCatchingPokemon } from "react-icons/md";

import "./globals.css";


const inter = Inter({ subsets: ["latin"] });

const RootLayout = ({ children }: React.PropsWithChildren) => (
  <html lang="en">
    <body className="bg-zinc-100">      
      <Dot
        color="#dadada"
        size={3}
      >        
        <div className="h-screen w-screen max-w-screen max-h-screen flex flex-col gap-2 items-center">        
          <Link href="/">
            <div className="flex gap-2 items-center sm:hover:scale-150 transition-all duration-100">
              <JitterText
                className="text-7xl text-orange-400 font-bold my-5"
                duration={0}
                text="POKEDEX"
              />
              <MdCatchingPokemon className="text-6xl"/>              
            </div>
          </Link>
          <div className="p-5 rounded-xl w-[calc(100vw_-_50px)] max-h-full mb-5 bg-opacity-70 bg-zinc-200">
            <AntdRegistry>{children}</AntdRegistry>              
          </div>
        </div>      
      </Dot>
    </body>
  </html>
);

export default RootLayout;

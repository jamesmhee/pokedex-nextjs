"use client"
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { Inter } from "next/font/google";
import Dot from "./components/animata/background/dot";
import Link from "next/link";
import JitterText from "./components/animata/text/jitter-text-";
import { MdCatchingPokemon } from "react-icons/md";
import { SiPokemon } from "react-icons/si";
import PokemonStore from './utils/Store/PokemonStore';

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const RootLayout = ({ children }: React.PropsWithChildren) => (
  <html lang="en">
    <head>
      <title>Pokdex</title>
    </head>
    <PokemonStore>
      <body className="bg-zinc-100">
        <Dot
          color="#dadada"
          size={3}
        >        
          <div className="min-w-screen min-h-screen flex flex-col gap-2 items-center">        
            <Link href="/">
              <div className="flex items-center sm:hover:scale-125 transition-all duration-300 my-[-70px]">
                <JitterText
                  className="text-3xl text-orange-400 hover:text-black duration-75 font-bold my-5"
                  duration={0}
                  text={(<div className='flex gap-2 items-center'><SiPokemon style={{fontSize: 200}}/> <MdCatchingPokemon/></div>)}
                />                
              </div>
            </Link>
            <div className="p-5 rounded-3xl w-[calc(100vw_-_50px)] max-h-full mb-5 bg-opacity-70 bg-zinc-200">
              <AntdRegistry>{children}</AntdRegistry>              
            </div>
          </div>      
        </Dot>
      </body>
    </PokemonStore>
  </html>
);

export default RootLayout;

import BusAnimation from "./BusAnimation";
import Head from "next/head";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Bus Animation</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>



      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-6xl font-bold">
          Bienvenido a la animación del bus
        </h1>
        
        <BusAnimation
          
         />
      </main>
    </div>
  );
}

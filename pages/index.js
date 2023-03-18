import Head from "next/head";
import { useAppContext } from '../utils/context';
import Blogs from '../components/blogs'

export default function Home() {
 

    const mycontext = useAppContext();
  console.log({mycontext})

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div>Welcome to blog app.</div>
        <Blogs/>
      </main>
    </>
  );
}

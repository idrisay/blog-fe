import Head from "next/head";

export default function Home() {
  fetch("http://localhost:3005/auth/login")
    .then((response) => {
      console.log(response);
      return response.json();
    })
    .then((data) => console.log("DATA", data));

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
      </main>
    </>
  );
}

import { auth } from "@/auth";

const Home = async () => {
  const session = await auth();

  console.log(session);
  
  return (
    <>
      <h1 className="h1-bold font-inter">Welcome to Ultimate Next.js Course</h1>
    </>
  );
};

export default Home;

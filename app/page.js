import LandingPage from "@/components/LandingPage";
import Loader from "@/components/Loader";
import { Suspense } from "react";

export default function Home() {
  return (
    <main className="w-full h-full relative flex items-center justify-center flex-col px-14">
      <Suspense fallback={<Loader />}>
        <LandingPage />
      </Suspense>
    </main>
  );
}

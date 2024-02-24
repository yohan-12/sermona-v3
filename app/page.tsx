import NavBar from "@/components/landingPage/Navbar";
import MaxWidthWrapper from "@/components/landingPage/MaxWidthWrapper";
import Hero1 from "@/components/landingPage/Hero1";
import Hero2 from "@/components/landingPage/Hero2";
import Footer from "@/components/landingPage/Footer";
export default function Home() {
  return (
    <>
      <MaxWidthWrapper>
        <NavBar />
        <Hero1 />
      </MaxWidthWrapper>{" "}
      <Hero2 />
      <Footer />
    </>
  );
}

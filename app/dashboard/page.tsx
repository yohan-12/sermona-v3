import MaxWidthWrapper from "@/components/landingPage/MaxWidthWrapper";
import BentoLayout from "@/components/mainDashboard/bento-grid";
import MainSection from "@/components/mainDashboard/main-section";

const page = () => {
  return (
    <>
      {/* <MaxWidthWrapper>
        <MainSection />
        <BentoLayout />
      </MaxWidthWrapper> */}
      <BentoLayout />
    </>
  );
};

export default page;

import Footer from "../components/Footer";
import GenerateInterview from "../components/GenerateInterview";
import RecentInterviews from "../components/RecentInterviews";
import TopSection from "../components/TopSection";

export default function Home() {
  return (
    <div className="min-h-screen w-full flex flex-col gap-4 items-center justify-center py-12 overflow-hidden ">
      <TopSection />
      <GenerateInterview />

      {/* RECENT INTERVIEWS */}
      <RecentInterviews />
      <Footer />
    </div>
  );
}

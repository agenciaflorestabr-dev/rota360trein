import { Header } from '@/components/Header';
import { HeroSlider } from '@/components/HeroSlider';
import { WelcomeSection } from '@/components/WelcomeSection';
import { ProfileSection } from '@/components/ProfileSection';
import { CoursesSection } from '@/components/CoursesSection';
import { HighlightSection } from '@/components/HighlightSection';
import { AdvocacySection } from '@/components/AdvocacySection';
import { TrainingSection } from '@/components/TrainingSection';
import { HowItWorksSection } from '@/components/HowItWorksSection';
import { ContactChannelsSection } from '@/components/ContactChannelsSection';
import { Footer } from '@/components/Footer';
import { WhatsAppFloat } from '@/components/WhatsAppFloat';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSlider />
        <WelcomeSection />
        <ProfileSection />
        <CoursesSection />
        <HighlightSection />
        <AdvocacySection />
        <TrainingSection />
        <HowItWorksSection />
        <ContactChannelsSection />
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
};

export default Index;

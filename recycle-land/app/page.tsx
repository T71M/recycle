import { ScrollToTop } from "@/components/shared/buttons/scroll-top/ScrollToTop";
import { BecomePartnerSection } from "@/sections/become-partner/BecomePartner";
import { ContactSection } from "@/sections/contacts/ContactsSection";
import { FeaturesSection } from "@/sections/features/FeaturesSection";
import { QuickSearchSection } from "@/sections/quickSearch/QuickSearchSection";

export default function Home() {
  return (
    <main className="w-full flex-1">
      <QuickSearchSection />
      <BecomePartnerSection />
      <FeaturesSection />
      <ContactSection />
      <ScrollToTop />
    </main>
  );
}

import { api } from "@/lib/api";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Catalog from "@/components/Catalog";
import Faq from "@/components/Faq";
import Reviews from "@/components/Reviews";
import Footer from "@/components/Footer";
import FloatingBar from "@/components/FloatingBar";
import DateModal from "@/components/DateModal";
import { Icon } from "@/components/Icons";

// Render on every request so the page always reflects the database (stock, votes, new products).
export const dynamic = "force-dynamic";

export default async function Page() {
  const [categories, initialPage, faqs, reviews] = await Promise.all([
    api("/categories"),
    api("/products", { params: { limit: 12 } }),
    api("/faqs"),
    api("/reviews"),
  ]);

  return (
    <>
      <Header />
      <Catalog categories={categories} initialPage={initialPage}>
        <Hero />
      </Catalog>
      <Faq faqs={faqs} />
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <a href="#">Bangalore</a> <Icon id="chev-r" className="ic ic--sm" /> <span className="current">Gaming gadgets on rent</span>
      </nav>
      <Reviews reviews={reviews} />
      <Footer />
      <FloatingBar />
      <DateModal />
    </>
  );
}

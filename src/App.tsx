import { lazy, Suspense, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import SmoothScroll from "@/components/SmoothScroll";
import HomePage from "@/app/page";

const AboutPage = lazy(() => import("@/app/about/page"));
const BookingPage = lazy(() => import("@/app/book/page"));
const FAQPage = lazy(() => import("@/app/faq/page"));
const GalleryPage = lazy(() => import("@/app/gallery/page"));
const NotFoundPage = lazy(() => import("@/app/not-found"));
const ReviewsPage = lazy(() => import("@/app/reviews/page"));
const TripDetailPage = lazy(() => import("@/app/trips/[slug]/page"));
const TripsPage = lazy(() => import("@/app/trips/page"));
const WishlistPage = lazy(() => import("@/app/wishlist/page"));

function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [location.pathname, location.search]);

  return null;
}

export default function App() {
  return (
    <SmoothScroll>
      <ScrollToTop />
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/book" element={<BookingPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/reviews" element={<ReviewsPage />} />
          <Route path="/trips" element={<TripsPage />} />
          <Route path="/trips/:slug" element={<TripDetailPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </SmoothScroll>
  );
}

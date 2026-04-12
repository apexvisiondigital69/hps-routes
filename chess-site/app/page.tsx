import { Hero } from "@/components/sections/Hero";
import { Announcement } from "@/components/sections/Announcement";
import { ProductShowcase } from "@/components/sections/ProductShowcase";
import { Materials } from "@/components/sections/Materials";
import { Craftsmanship } from "@/components/sections/Craftsmanship";
import { Editorial } from "@/components/sections/Editorial";
import { Atelier } from "@/components/sections/Atelier";
import { Newsletter } from "@/components/sections/Newsletter";

export default function Home() {
  return (
    <>
      <Announcement />
      <Hero />
      <ProductShowcase />
      <Materials />
      <Craftsmanship />
      <Editorial />
      <Atelier />
      <Newsletter />
    </>
  );
}

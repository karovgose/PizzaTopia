import Header from '@/components/Header';
import Hero from '@/components/Hero';
import HomeMenu from '@/components/HomeMenu';
import SectionHeaders from '@/components/SectionHeaders';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <Hero />
      <HomeMenu />
      <section id="about" className="text-center my-16">
        <SectionHeaders subHeader={'Our story'} mainHeader={'About us'} />
        <div className="text-gray-500 max-w-2xl mx-auto mt-4 flex flex-col gap-4">
          <p>
            Welcome to PizzaTopia! We craft delicious pizzas that satisfy your
            cravings and elevate your taste experience. At PizzaTopia,
            we&apos;re passionate about creating mouthwatering pizzas using the
            finest ingredients and authentic recipes. Our commitment to quality
            ensures every bite is a burst of flavor.
          </p>
          <p>
            Our story revolves around the love for great pizza. From our humble
            beginnings to becoming a go-to destination for pizza lovers,
            we&apos;ve strived to make each pizza moment special. Join us on
            this flavorful journey and indulge in our wide array of classic and
            innovative pizzas.
          </p>
        </div>
      </section>
      <section id="contact" className="text-center my-8">
        <SectionHeaders
          subHeader={"Don't hesitate"}
          mainHeader={'Contact us'}
        />
        <div className="mt-8">
          <Link
            href="tel:+38971123123"
            className="text-4xl underline text-gray-500"
          >
            +389 71 123 123
          </Link>
        </div>
      </section>
    </>
  );
}

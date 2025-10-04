import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Menu, Search, ShoppingBag, User } from "lucide-react";

// Award-winning, single-file React + Tailwind landing page for a premium clothing brand.
// ENHANCEMENTS:
// - Fluid scroll-based animations (staggered reveals).
// - Interactive glowing cursor follower for a premium feel.
// - Refined color palette and component aesthetics (glows, softer gradients).
// - Dynamic, asymmetrical layouts for visual interest.
// - Parallax horizontal scroll for the lookbook.
// - Added icons and improved navigation.
// - Better code structure with internal components.

export default function PremiumClothLandingV2() {
  // --- STATE & EFFECTS --- //
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", updateMousePosition);
    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, []);

  // --- MOCK DATA --- //
  const products = [
    {
      id: 1,
      title: "The Sable Coat",
      price: "₹12,499",
      img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1920&auto=format&fit=crop",
    },
    {
      id: 2,
      title: "Courier Knit",
      price: "₹5,299",
      img: "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=1920&auto=format&fit=crop",
    },
    {
      id: 3,
      title: "Stitch Denim",
      price: "₹6,799",
      img: "https://images.unsplash.com/photo-1545291730-faff8ca1d4b0?q=80&w=1920&auto=format&fit=crop",
    },
    {
      id: 4,
      title: "Aurum Tee",
      price: "₹1,499",
      img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1920&auto=format&fit=crop",
    },
  ];

  const trends = [ "Oversized Tailoring", "Neutral Layers", "Textured Knits", "Monochrome Suits" ];
  
  const lookbookImages = [
    "https://images.unsplash.com/photo-1532303229345-20d1d32938b3?q=80&w=1920&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1617127365659-3c4b6933361a?q=80&w=1920&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1504593811423-6dd665756598?q=80&w=1920&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=1920&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1603251578711-32d143a55922?q=80&w=1920&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1588731234159-83996315110f?q=80&w=1920&auto=format&fit=crop",
  ];

  // --- ANIMATION VARIANTS --- //
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  // --- RENDER --- //
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-200 font-sans cursor-none">
      {/* Custom Styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Inter:wght@300;400;500&display=swap');
        :root {
          --accent: #d4b483;
          --accent-dark: #c7a97e;
        }
        .brand-heading { font-family: 'Playfair Display', serif; }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>
      
      {/* Custom Cursor */}
      <motion.div
        className="pointer-events-none fixed -translate-x-1/2 -translate-y-1/2 z-[999] h-6 w-6 rounded-full bg-[var(--accent)] mix-blend-difference"
        animate={{ x: mousePosition.x, y: mousePosition.y }}
        transition={{ type: "spring", stiffness: 500, damping: 30, mass: 0.1 }}
      />

      <div className="relative z-10">
        <Navbar />
        <Header />

        <main className="container mx-auto px-4 lg:px-8">
          <Collections products={products} variants={{ container: containerVariants, item: itemVariants }} />
          <UpcomingDrops variants={{ container: containerVariants, item: itemVariants }}/>
          <Trends trends={trends} variants={{ container: containerVariants, item: itemVariants }}/>
          <Lookbook images={lookbookImages} />
          <CTA variants={{ item: itemVariants }} />
        </main>

        <Footer />
      </div>
    </div>
  );
}

// --- SUB-COMPONENTS --- //

const Navbar = () => (
  <nav className="fixed top-0 left-0 right-0 z-50 p-4 backdrop-blur-md bg-black/10">
    <div className="container mx-auto flex items-center justify-between">
      <a href="#" className="brand-heading text-2xl" style={{color: 'var(--accent)'}}>RASE</a>
      <div className="hidden md:flex items-center gap-8 text-sm text-gray-300">
        {["Collections", "Upcoming", "Trends", "Lookbook"].map(item => (
          <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-white transition-colors relative group">
            {item}
            <span className="absolute bottom-0 left-0 h-[1px] w-0 group-hover:w-full bg-[var(--accent)] transition-all duration-300"></span>
          </a>
        ))}
      </div>
      <div className="flex items-center gap-4">
        <button className="p-2 hover:text-white transition-colors"><Search size={18}/></button>
        <button className="p-2 hover:text-white transition-colors"><User size={18}/></button>
        <button className="p-2 hover:text-white transition-colors"><ShoppingBag size={18}/></button>
        <button className="md:hidden p-2 hover:text-white transition-colors"><Menu size={20}/></button>
      </div>
    </div>
  </nav>
);

const Header = () => (
  <header className="relative h-screen flex items-center justify-center text-center overflow-hidden">
    <div className="absolute inset-0 -z-10">
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>
      <video
        className="w-full h-full object-cover"
        src="https://assets.mixkit.co/videos/preview/mixkit-man-walking-on-a-straight-road-in-a-park-4375-large.mp4"
        autoPlay muted loop playsInline
      />
    </div>

    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.3 } },
      }}
      className="z-10 p-4"
    >
      <motion.h1
        variants={{
          hidden: { opacity: 0, y: 50 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
        }}
        className="brand-heading text-5xl md:text-8xl leading-tight text-white"
      >
        Crafted For The Moment
      </motion.h1>

      <motion.p
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { duration: 0.8, ease: "easeOut" } },
        }}
        className="mt-6 text-gray-300 max-w-xl mx-auto"
      >
        Timeless design meets modern technique. Limited collections, sustainably sourced and built to last.
      </motion.p>

      <motion.div
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
        }}
        className="mt-10 flex gap-4 justify-center"
      >
        <button className="group relative px-6 py-3 rounded-md bg-white text-black font-medium overflow-hidden">
          <span className="relative z-10">Explore Collections</span>
          <div className="absolute inset-0 bg-[var(--accent)] w-0 group-hover:w-full transition-all duration-300"></div>
        </button>
        <button className="px-6 py-3 rounded-md border border-gray-600 text-gray-200 hover:bg-white/5 transition-colors">
          View Lookbook
        </button>
      </motion.div>
    </motion.div>
  </header>
);

const Collections = ({ products, variants }) => (
  <motion.section 
    id="collections"
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.2 }}
    variants={variants.container}
    className="py-24"
  >
    <motion.h2 variants={variants.item} className="brand-heading text-4xl text-center mb-12">New Arrivals</motion.h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {products.map((p) => (
        <motion.div
          key={p.id}
          variants={variants.item}
          className="group relative rounded-lg overflow-hidden border border-white/10 bg-black"
        >
          <div className="h-96 overflow-hidden">
            <img src={p.img} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-4 w-full">
            <h3 className="text-lg font-medium">{p.title}</h3>
            <div className="flex items-center justify-between mt-2">
              <p className="text-sm text-gray-400">{p.price}</p>
              <button className="text-xs font-semibold uppercase tracking-wider text-[var(--accent)] opacity-0 group-hover:opacity-100 transition-opacity">
                Shop Now
              </button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  </motion.section>
);

const UpcomingDrops = ({ variants }) => (
  <motion.section 
    id="upcoming"
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.3 }}
    variants={variants.container}
    className="py-24 grid md:grid-cols-5 gap-12 items-center"
  >
    <motion.div variants={variants.item} className="md:col-span-2">
      <div className="h-[450px] rounded-lg overflow-hidden">
        <img src="https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=1887&auto=format&fit=crop" alt="Upcoming drop model" className="w-full h-full object-cover"/>
      </div>
    </motion.div>
    <motion.div variants={variants.item} className="md:col-span-3">
      <h3 className="text-4xl brand-heading">Upcoming Drops</h3>
      <p className="mt-4 text-gray-400 max-w-lg">
        Small runs released monthly. Join the waitlist for early access to our most anticipated pieces.
      </p>
      <div className="mt-8 space-y-4">
        {/* Drop 1 */}
        <div className="p-4 rounded-lg bg-white/5 border border-white/10 flex items-center gap-4 transition-colors hover:bg-white/10">
          <div className="flex flex-col items-center justify-center w-20 text-center">
             <span className="text-3xl font-bold text-[var(--accent)]">24</span>
             <span className="text-xs uppercase tracking-widest text-gray-400">Oct</span>
          </div>
          <div className="flex-grow">
            <div className="font-medium">Autumn Tailor Drop</div>
            <div className="text-sm text-gray-500">100 limited pieces</div>
          </div>
          <button className="px-4 py-2 rounded text-sm bg-white/10 hover:bg-white/20 transition-colors">Join Waitlist</button>
        </div>
        {/* Drop 2 */}
        <div className="p-4 rounded-lg bg-white/5 border border-white/10 flex items-center gap-4 transition-colors hover:bg-white/10">
          <div className="flex flex-col items-center justify-center w-20 text-center">
             <span className="text-3xl font-bold text-[var(--accent)]">12</span>
             <span className="text-xs uppercase tracking-widest text-gray-400">Nov</span>
          </div>
          <div className="flex-grow">
            <div className="font-medium">Textured Knit Edit</div>
            <div className="text-sm text-gray-500">60 limited pieces</div>
          </div>
          <button className="px-4 py-2 rounded text-sm bg-white/10 hover:bg-white/20 transition-colors">Join Waitlist</button>
        </div>
      </div>
    </motion.div>
  </motion.section>
);

const Trends = ({ trends, variants }) => (
  <motion.section 
    id="trends"
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.3 }}
    variants={variants.container}
    className="py-24 text-center"
  >
    <motion.h2 variants={variants.item} className="text-4xl brand-heading mb-4">Defining The Season</motion.h2>
    <motion.p variants={variants.item} className="text-gray-400 max-w-2xl mx-auto mb-10">Explore the silhouettes and textures shaping modern menswear.</motion.p>
    <div className="flex flex-wrap justify-center gap-4">
      {trends.map((t) => (
        <motion.div key={t} variants={variants.item} className="px-6 py-3 rounded-full bg-white/5 border border-white/10 text-sm font-medium hover:bg-white/10 hover:border-[var(--accent)] transition-all cursor-pointer">
          {t}
        </motion.div>
      ))}
    </div>
  </motion.section>
);

const Lookbook = ({ images }) => {
    const galleryRef = React.useRef(null);
    const { scrollXProgress } = useScroll({ container: galleryRef });
    const x = useTransform(scrollXProgress, [0, 1], ["0%", "-66.66%"]);

    return (
        <section id="lookbook" className="py-24">
            <div className="text-center mb-12">
                 <h2 className="text-4xl brand-heading">Lookbook</h2>
                 <p className="text-gray-400 mt-2">Curated shots from our latest campaign.</p>
            </div>
            <div ref={galleryRef} className="overflow-x-scroll hide-scrollbar h-[500px] relative">
                <motion.div style={{ x }} className="flex gap-6 h-full w-[300%]">
                    {images.map((src, i) => (
                        <div key={i} className="w-1/6 h-full flex-shrink-0">
                            <div className="w-full h-full rounded-lg overflow-hidden border border-white/10">
                                <img src={src} alt={`Lookbook ${i + 1}`} className="w-full h-full object-cover"/>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

const CTA = ({ variants }) => (
  <motion.section 
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.5 }}
    variants={variants.container}
    className="my-24 rounded-lg bg-gradient-to-r from-neutral-900 to-black border border-white/10 p-12 text-center"
  >
    <motion.h3 variants={variants.item} className="brand-heading text-3xl text-[var(--accent)]">Become an Insider</motion.h3>
    <motion.p variants={variants.item} className="text-gray-400 mt-4 max-w-xl mx-auto">
      Access early drops, exclusive discounts, and invites to studio previews.
    </motion.p>
    <motion.div variants={variants.item} className="mt-8 flex justify-center">
      <div className="flex w-full max-w-md items-center border border-white/20 rounded-md p-1 focus-within:border-[var(--accent)] transition-colors">
        <input type="email" placeholder="Enter your email" className="bg-transparent w-full px-4 py-2 text-white placeholder-gray-500 focus:outline-none"/>
        <button className="px-5 py-2 rounded-md bg-[var(--accent)] text-black font-semibold whitespace-nowrap hover:bg-[var(--accent-dark)] transition-colors">
            Subscribe
        </button>
      </div>
    </motion.div>
  </motion.section>
);

const Footer = () => (
  <footer className="border-t border-white/10 mt-24">
    <div className="container mx-auto px-4 lg:px-8 py-16">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
        <div>
          <h4 className="font-semibold mb-4">Shop</h4>
          <ul className="space-y-2 text-gray-400">
            <li><a href="#" className="hover:text-white">New Arrivals</a></li>
            <li><a href="#" className="hover:text-white">Outerwear</a></li>
            <li><a href="#" className="hover:text-white">Knitwear</a></li>
            <li><a href="#" className="hover:text-white">Denim</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4">About</h4>
          <ul className="space-y-2 text-gray-400">
            <li><a href="#" className="hover:text-white">Our Story</a></li>
            <li><a href="#" className="hover:text-white">Sustainability</a></li>
            <li><a href="#" className="hover:text-white">Careers</a></li>
            <li><a href="#" className="hover:text-white">Press</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Support</h4>
          <ul className="space-y-2 text-gray-400">
            <li><a href="#" className="hover:text-white">Contact</a></li>
            <li><a href="#" className="hover:text-white">FAQ</a></li>
            <li><a href="#" className="hover:text-white">Shipping & Returns</a></li>
            <li><a href="#" className="hover:text-white">Sizing</a></li>
          </ul>
        </div>
        <div>
           <h4 className="font-semibold mb-4">Connect</h4>
            <div className="flex gap-4">
                {/* Add social icons here */}
            </div>
        </div>
      </div>
      <div className="mt-16 pt-8 border-t border-white/10 text-xs text-gray-500 flex justify-between items-center">
        <p>&copy; {new Date().getFullYear()} RASE GATE — All Rights Reserved.</p>
        <div className="flex gap-4">
            <a href="#" className="hover:text-gray-300">Terms of Service</a>
            <a href="#" className="hover:text-gray-300">Privacy Policy</a>
        </div>
      </div>
    </div>
  </footer>
);
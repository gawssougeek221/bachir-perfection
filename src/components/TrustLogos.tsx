"use client";

import { motion } from "framer-motion";

const brands = [
  { name: "MERCEDES", svg: "mercedes" },
  { name: "PORSCHE", svg: "porsche" },
  { name: "RANGE ROVER", svg: "range-rover" },
  { name: "AUDI", svg: "audi" },
  { name: "BMW", svg: "bmw" },
];

function MercedesLogo() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="text-[#ccc]">
      <circle cx="24" cy="24" r="22" stroke="currentColor" strokeWidth="1.5" />
      <path d="M24 8L14 36h20L24 8z" stroke="currentColor" strokeWidth="1.2" fill="none" />
      <line x1="24" y1="10" x2="24" y2="34" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

function PorscheLogo() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="text-[#ccc]">
      <rect x="4" y="4" width="40" height="40" rx="6" stroke="currentColor" strokeWidth="1.5" />
      <path d="M24 12v24M12 24h24M14 14l20 20M34 14L14 34" stroke="currentColor" strokeWidth="1" />
      <circle cx="24" cy="24" r="8" stroke="currentColor" strokeWidth="1.2" fill="none" />
      <path d="M24 18v12M18 24h12" stroke="currentColor" strokeWidth="0.8" />
    </svg>
  );
}

function RangeRoverLogo() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="text-[#ccc]">
      <ellipse cx="24" cy="24" rx="22" ry="16" stroke="currentColor" strokeWidth="1.5" />
      <ellipse cx="24" cy="24" rx="14" ry="10" stroke="currentColor" strokeWidth="1" fill="none" />
      <path d="M6 24h36" stroke="currentColor" strokeWidth="1" />
      <text x="24" y="27" textAnchor="middle" fontSize="7" fill="currentColor" fontFamily="sans-serif" fontWeight="bold">RR</text>
    </svg>
  );
}

function AudiLogo() {
  return (
    <svg width="60" height="48" viewBox="0 0 60 48" fill="none" className="text-[#ccc]">
      {[8, 20, 32, 44].map((cx, i) => (
        <circle key={i} cx={cx} cy="24" r="8" stroke="currentColor" strokeWidth="1.5" />
      ))}
    </svg>
  );
}

function BMWLogo() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="text-[#ccc]">
      <circle cx="24" cy="24" r="22" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="24" cy="24" r="16" stroke="currentColor" strokeWidth="1.2" fill="none" />
      <text x="24" y="22" textAnchor="middle" fontSize="10" fill="currentColor" fontFamily="sans-serif" fontWeight="bold">B</text>
      <text x="24" y="32" textAnchor="middle" fontSize="10" fill="currentColor" fontFamily="sans-serif" fontWeight="bold">M</text>
      <text x="34" y="27" textAnchor="middle" fontSize="10" fill="currentColor" fontFamily="sans-serif" fontWeight="bold">W</text>
    </svg>
  );
}

const logoComponents: Record<string, () => React.ReactNode> = {
  mercedes: () => <MercedesLogo />,
  porsche: () => <PorscheLogo />,
  "range-rover": () => <RangeRoverLogo />,
  audi: () => <AudiLogo />,
  bmw: () => <BMWLogo />,
};

export default function TrustLogos() {
  return (
    <section className="py-16 px-6 bg-[#F8F8F6] border-t border-b border-gray-200">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <p className="text-xs tracking-[0.4em] uppercase text-[#999] text-center mb-10">
          Ils nous font confiance
        </p>

        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
          {brands.map((brand, index) => (
            <div
              key={brand.name}
              className="flex flex-col items-center gap-3 group cursor-default"
            >
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                {logoComponents[brand.svg]?.()}
              </motion.div>
              <span className="text-sm md:text-base font-bold tracking-[0.15em] text-[#ccc] group-hover:text-[#999] transition-colors duration-300">
                {brand.name}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

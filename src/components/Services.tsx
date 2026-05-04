"use client";

import { motion } from "framer-motion";
import { Shield, Palette, Sparkles, RefreshCw, CircleDot, Armchair } from "lucide-react";

const services = [
  {
    title: "Carrosserie premium",
    description: "Réparation et restauration de carrosserie avec précision artisanale",
    icon: Shield,
  },
  {
    title: "Peinture showroom",
    description: "Application en cabine contrôlée, finition haute définition",
    icon: Palette,
  },
  {
    title: "Polish detailing",
    description: "Polissage professionnel et protection céramique longue durée",
    icon: Sparkles,
  },
  {
    title: "Restauration complète",
    description: "Transformation totale de A à Z, comme sortie d'usine",
    icon: RefreshCw,
  },
  {
    title: "Jantes premium",
    description: "Remise en état, peinture et personnalisation de jantes",
    icon: CircleDot,
  },
  {
    title: "Intérieur cuir",
    description: "Restauration et réfection de sellerie cuir haut de gamme",
    icon: Armchair,
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
};

export default function Services() {
  return (
    <section className="py-32 px-6 max-w-6xl mx-auto" id="services">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-[#111]">
          Nos Services
        </h2>
        {/* Gold underline accent */}
        <div className="w-12 h-0.5 bg-[#D4AF37] mx-auto mt-4 mb-4" />
        <p className="text-[#555] mt-2 max-w-md mx-auto">
          Chaque service est exécuté avec la plus haute attention aux détails
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, i) => {
          const Icon = service.icon;
          return (
            <motion.div
              key={service.title}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={cardVariants}
              className="p-8 bg-white border border-gray-200 rounded-2xl hover:scale-[1.02] hover:shadow-lg transition-all duration-300 group cursor-default border-t-0 relative overflow-hidden"
            >
              {/* Gold top border on hover */}
              <div className="absolute top-0 left-0 right-0 h-0 bg-[#D4AF37] transition-all duration-300 group-hover:h-0.5" />

              <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center mb-5 group-hover:bg-[#D4AF37]/20 transition-colors duration-300">
                <Icon className="w-5 h-5 text-[#D4AF37]" />
              </div>

              <h3 className="text-xl font-semibold text-[#111] mb-2">
                {service.title}
              </h3>
              <p className="text-[#555] text-sm leading-relaxed">
                {service.description}
              </p>

              <div className="mt-4 w-8 h-px bg-[#D4AF37]/40 group-hover:w-full group-hover:bg-[#D4AF37] transition-all duration-500" />
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

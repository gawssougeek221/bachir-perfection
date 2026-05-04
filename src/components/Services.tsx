"use client";

import { motion } from "framer-motion";

const services = [
  {
    title: "Carrosserie premium",
    description: "Réparation et restauration de carrosserie avec précision artisanale",
    icon: "🛡️",
  },
  {
    title: "Peinture showroom",
    description: "Application en cabine contrôlée, finition haute définition",
    icon: "🎨",
  },
  {
    title: "Polish detailing",
    description: "Polissage professionnel et protection céramique longue durée",
    icon: "✨",
  },
  {
    title: "Restauration complète",
    description: "Transformation totale de A à Z, comme sortie d&apos;usine",
    icon: "🔄",
  },
  {
    title: "Jantes premium",
    description: "Remise en état, peinture et personnalisation de jantes",
    icon: "💫",
  },
  {
    title: "Intérieur cuir",
    description: "Restauration et réfection de sellerie cuir haut de gamme",
    icon: "🪑",
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
    <section className="py-32 px-6 max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-[#111]">
          Nos services
        </h2>
        <p className="text-[#666] mt-4 max-w-md mx-auto">
          Chaque service est exécuté avec la plus haute attention aux détails
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, i) => (
          <motion.div
            key={service.title}
            custom={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={cardVariants}
            className="p-8 bg-white border border-gray-200 rounded-2xl hover:scale-105 hover:shadow-lg transition-all duration-300 group cursor-default"
          >
            <span className="text-3xl mb-4 block">{service.icon}</span>
            <h3 className="text-xl font-semibold text-[#111] mb-2">
              {service.title}
            </h3>
            <p className="text-[#666] text-sm leading-relaxed">
              {service.description}
            </p>
            <div className="mt-4 w-8 h-px bg-[#111] group-hover:w-full transition-all duration-500" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}

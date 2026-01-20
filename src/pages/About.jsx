import { motion } from "framer-motion";
import aboutImg from "../assets/about.jpg";

function About() {
  return (
    <div className="mt-16 bg-white overflow-hidden">
      {/* Section 1 */}
      <div className="container mx-auto flex flex-col md:flex-row items-center gap-6 py-6 px-4">
        {/* Image */}
        <motion.div
          className="flex-1"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <img
            className="w-full max-w-sm md:max-w-md mx-auto rounded-lg"
            src={aboutImg}
            alt="About Zhen Natural"
          />
        </motion.div>

        {/* Text */}
        <motion.div
          className="flex-1 px-2 md:px-6"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl md:text-3xl font-semibold">
            About <span className="text-[#8DC642]">Zhen Aura</span>
          </h2>

          <p className="text-lg md:text-xl font-medium py-2">
            Zhen Aura is an organic food eCommerce brand dedicated to bringing
            nature’s purest goodness directly to your doorstep. We believe that
            healthy living begins with clean, honest, and responsibly sourced
            food.
            <br />
            Our mission is simple: to make authentic organic foods accessible,
            affordable, and trustworthy for everyone who values wellness,
            sustainability, and conscious living.
          </p>
        </motion.div>
      </div>

      {/* Section 2 */}
      <motion.div
        className="container mx-auto px-4 text-center"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className="mb-8">Our Story</h2>
        <p className="text-sm md:text-base leading-relaxed text-center">
          Zhen Aura was created with a vision to reconnect people with natural
          nutrition in a world dominated by processed and chemical-laden foods.
          We work closely with ethical farmers and trusted suppliers who follow
          organic farming practices, ensuring every product meets our strict
          quality standards.
        </p>
      </motion.div>

      <motion.div
        className="container mx-auto px-4 text-center"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className="text-2xl md:text-3xl font-semibold pb-3 pt-6">
          What We Offer
        </h2>

        <p className="text-sm md:text-base text-center leading-relaxed">
          We provide a carefully curated range of organic food products,
          including:
        </p>
        <ul className=" text-center py-3 pb-10">
          <li>Certified organic and chemical-free foods</li>
          <li>Natural, preservative-free essentials</li>
          <li>Nutrient-rich products for everyday wellness</li>
          <li>Sustainably sourced and responsibly packaged items</li>
        </ul>
      </motion.div>
      <div className="border-l">
        <motion.div
          className="container mx-auto px-4 text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl md:text-3xl font-semibold pb-1 pt-2">
            Our Mission
          </h2>

          <p className="text-sm md:text-base text-center pb-10 leading-relaxed">
            To empower people to live better by providing pure, safe, and
            nourishing organic foods with honesty and care.
          </p>
        </motion.div>
        <motion.div
          className="container mx-auto px-4 text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl md:text-3xl font-semibold pb-1 pt-2">
            Our Vision
          </h2>

          <p className="text-sm md:text-base text-center pb-20 leading-relaxed">
            To become a leading organic food destination that inspires healthier
            communities and promotes sustainable living across generations.
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export default About;

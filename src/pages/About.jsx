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
            About <span className="text-[#8DC642]">Zhen Natural Ltd</span>
          </h2>

          <h4 className="text-lg md:text-xl font-medium py-2">
            Discover the Power of Nature with Zhen Natural Ltd.
          </h4>

          <p className="text-sm md:text-base leading-relaxed text-justify">
            Imagine sitting down to a course crafted from the finest organic
            food products, knowing each bite is a step toward a better,
            healthier future. Yes, Zhen Natural Ltd is on a mission to make that
            dream of yours come true! We aspire to establish a Bangladesh where
            everyone has access to nutritious, healthful, and organic foods.
            <br />
            As part of the RANGS Group, our goal is to offer more than just
            organic products; we strive to give comprehensive guidance to
            nourish your body, mind, and soul. Whether you are a
            health-conscious individual or seeking to lead a healthy life, Zhen
            is here for all. We also have natural and organic superfoods for
            people dealing with delicate conditions.
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
        <h2 className="text-2xl md:text-3xl font-semibold pb-3 pt-16">
          The Origin
        </h2>

        <p className="text-sm md:text-base text-justify pb-20 leading-relaxed">
          With a simple, transformative discovery our story began in the kitchen
          when our beloved Managing Director tried to find a healthy solution
          for her family. Chia seeds, turmeric, ginger, honey, and fresh greens-
          mixing all these items she made a fresh smoothie that came as a
          perfect nutrition solution against persistent skin issues and
          bloating. The remarkable result spurred her to explore more
          nutrient-dense diets to balance and prevent long-term health
          difficulties, such as PCOS, PCOD, thyroid, diabetes, heart disease,
          weight loss, etc. Thus, a voyage for individual remedy blossomed into
          a quest for wellness as Zhen Natural Ltd, a company that not only
          sells but also thrives on organic items and superfoods.
        </p>
      </motion.div>
    </div>
  );
}

export default About;

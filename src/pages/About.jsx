import aboutImg from "../assets/about.jpg";
function About() {
  return (
    <div className="mt-16">
      <div className="container flex justify-center  gap-2 bg-white py-6">
        <div className="flex-1">
          <img className="h-500 w-400 mx-auto" src={aboutImg} alt="" />
        </div>
        <div className="flex-1 px-6">
          <h2>
            About <span className="text-[#8DC642]">Zhen Natural Ltd</span>
          </h2>
          <h4 className="text-xl font-medium py-2">
            Discover the Power of Nature with Zhen Natural Ltd.
          </h4>
          <p>
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
        </div>
      </div>
      <div className="container text-center bg-white">
        <h2 className="pb-3 pt-10">The Origin</h2>
        <p className="text-justify pb-20">
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
      </div>
    </div>
  );
}

export default About;

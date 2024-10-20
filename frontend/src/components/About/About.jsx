import React from "react";
import styleAbout from './About.module.css';

function About() {
  return (
    <>
      <div className={styleAbout.heroImage}>
        <div className={styleAbout.textOverlay}>
          <h1 className={styleAbout.about}>About Us</h1>
          <p>
            At SHAGARA, we are dedicated to transforming Egypt's landscape
            through innovative tree planting solutions.
          </p>
        </div>
      </div>
      <section className={styleAbout.purposeSection}>
      <h2 className={styleAbout.Purpose}>Our Purpose</h2>
          <div className={styleAbout.purposeContent}>
          <img src="images/Atree2.png" alt="Tree" className={styleAbout.treeImage} />
            <p>
              We created this website to address climate change and make a
              significant impact in our community. Our mission is to empower
              individuals to contribute to environmental preservation by planting
              trees in their own homes.
            </p>
          </div>

          <div className={styleAbout.purposeContent}>
            <p>
              Through our platform, we provide comprehensive guides and techniques
              for planting and caring for trees. Our easy-to-follow instructions
              ensure that everyone, regardless of experience, can successfully start
              their own tree-planting journey.
            </p>
            <img src="images/Atree2.png" alt="Tree" className={styleAbout.treeImage} />

          </div>
          <div className={styleAbout.purposeContent}>
          <img src="images/Atree2.png" alt="Tree" className={styleAbout.treeImage} />
            <p>
              To encourage participation, we offer a rewards system where users earn
              points for their tree planting efforts. These points can be redeemed
              for various rewards, making it both rewarding and motivating to join
              our mission. Together, we can combat climate change, enhance our local
              environment, and build a sustainable future for generations to come.
            </p>
          </div>
      </section>
    </>
  );
}

export default About;

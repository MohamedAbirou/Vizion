import React from "react";
import Layout from "@/components/Layout";

const About = () => {
  return (
    <Layout showFooter={false}>
      <div className="container mx-auto pt-40 text-white text-center">
        <h1 className="xl:text-[2.7rem] lg:text-4xl md:text-4xl sm:text-3xl xs:text-2xl text-cyan font-semibold uppercase pb-10">
          About Us
        </h1>
        <p
          className="text-center text-xl font-medium xl:px-0 lg:px-0 md:px-0 sm:px-4 xs:px-0 pb-32"
          style={{ lineHeight: "2.5rem" }}
        >
          Welcome to Vizion ! We are your ultimate destination for all things
          electronic. Whether you are a tech enthusiast, a professional, or
          simply looking to upgrade your devices, we have got you covered with
          an extensive range of cutting-edge electronics. At Vizion , we pride
          ourselves on delivering exceptional quality, innovation, and value to
          our customers. With years of experience in the industry, we have built
          a reputation for being a trusted source for the latest gadgets and
          electronics. Our store offers an extensive selection of products,
          including smartphones, laptops, tablets, gaming consoles, home
          appliances, audio systems, and much more. We carefully curate our
          inventory to ensure that we only offer top-notch products from
          renowned brands, guaranteeing reliability and performance. What sets
          us apart is our commitment to customer satisfaction. Our knowledgeable
          and friendly team of experts is always available to assist you,
          providing personalized advice and guidance to help you make informed
          purchasing decisions. We understand that technology can be complex, so
          we strive to simplify the process and makeit a hassle-free experience
          for our customers. In addition tour exceptional product range and
          customer service, we also offer competitive prices and regular
          promotions to ensure that you get the best value for your money. We
          believe that everyone should have access to high-quality electronics
          without breaking the bank. At Vizion , we prioritize convenience and
          accessibility. You can explore our wide range of products in-store, or
          conveniently shop online from the comfort of your home, with fast and
          reliable shipping to your doorstep. We value the trust and loyalty of
          our customers and aim to build long-lasting relationships with each
          and every one of you. Your satisfaction is our utmost priority, and we
          are dedicated to providing an exceptional shopping experience from
          start to finish. Thank you for choosing Vizion. We look forward to
          serving you and exceeding your expectations with our outstanding
          products and services.
        </p>
      </div>
    </Layout>
  );
};

export default About;

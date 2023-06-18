import Layout from "../../components/Layout";
import Hero from "../../components/Hero";
import ProductsSection from "../../components/ProductsSection";
import Services from "../../components/Services";
import Reviews from "../../components/Reviews";

const Home = () => {
  return (
    <Layout>
      <Hero />
      <ProductsSection />
      <Services />
      <Reviews />
    </Layout>
  );
};

export default Home;

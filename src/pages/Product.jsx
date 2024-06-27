import PageNav from "../components/PageNav";
import styles from "./Product.module.css";

export default function Product() {
  return (
    <main className={styles.product}>
      <PageNav />
      <section style={{ backgroundImage: `url("bg.jpg")` }}>
        <img
          src="./img-1.jpg"
          alt="person with dog overlooking mountain with sunset"
        />
        <div>
          <h2>About WorldWise.</h2>
          <p>
            We are a company that passionately sells the things that you buy. We
            are a provider of real services to real people at all times of day.
            Why don&apos;t you try one of our fantastic products?
          </p>
          <p>
            Bringing you the latest in pixel technology, we deliver photons to
            your eyes through the medium of light using a groundbreaking
            technology called electricity!
          </p>
        </div>
      </section>
    </main>
  );
}

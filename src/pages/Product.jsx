import PageNav from "../components/PageNav";
import styles from "./Product.module.css";
import { SocialIcon } from "react-social-icons/component";
import "react-social-icons/instagram";
import "react-social-icons/facebook";
import "react-social-icons/x";
import "react-social-icons/tiktok";

export default function Product() {
  return (
    <main className={styles.product}>
      <PageNav />
      <section>
        <div>
          <h2>About Wayfarer.</h2>
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
          <p>
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
            quae ab illo inventore veritatis et quasi architecto beatae vitae
            dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
            aspernatur aut odit aut fugit, sed quia consequuntur magni dolores
            eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est,
            qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit,
            sed quia non numquam eius modi tempora incidunt ut labore et dolore
            magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis
            nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut
            aliquid ex ea commodi consequatur? Quis autem vel eum iure
            reprehenderit qui in ea voluptate velit esse quam nihil molestiae
            consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla
            pariatur?
          </p>
        </div>
        <div className={styles.icons}>
          <span>Find us on:</span>
          <SocialIcon
            target="_blank"
            href="www.instagram.com"
            url="www.instagram.com"
          />
          <SocialIcon
            target="_blank"
            href="www.tiktok.com"
            url="www.tiktok.com"
          />
          <SocialIcon
            target="_blank"
            href="www.facebook.com"
            url="www.facebook.com"
          />
          <SocialIcon target="_blank" href="www.x.com" url="www.x.com" />
        </div>
      </section>
    </main>
  );
}

// Uses the same styles as Product
import PageNav from "../components/PageNav";
import styles from "./Product.module.css";

export default function Product() {
    return (
        <main className={styles.product}>
            <PageNav />
            <section>
                <div>
                    <h2>
                        Simple pricing.
                        <br />
                        With affordable plans starting at $8 billion /month.
                    </h2>
                    <p>
                        We care infinitely about your money. That&apos;s why
                        we&apos;re going to take it from you and deposit it into
                        our bank account.
                    </p>
                </div>
                <img
                    src="img-2.jpg"
                    alt="overview of a large city with skyscrapers"
                />
            </section>
        </main>
    );
}

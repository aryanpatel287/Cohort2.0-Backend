import { Link } from "react-router";
import "../styles/not-found-page.scss";

const NotFoundPage = () => {
    return (
        <main className="not-found-page">
            <section className="not-found-card" aria-labelledby="not-found-title">
                <p className="not-found-code">404</p>
                <h1 id="not-found-title">Page not found</h1>
                <p className="not-found-subtitle">
                    The page you are looking for does not exist or may have been moved.
                </p>
                <Link to="/" className="not-found-link">Go to Home</Link>
            </section>
        </main>
    );
};

export default NotFoundPage;
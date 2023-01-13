import { Link } from "react-router-dom";
import reactLogo from "~/assets/react.svg";

const Home: React.FC = () => {
  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/logo.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="list">
        <p>
          Visit <Link to="/ssr">/my-dynamic-url</Link> to see the
          server-side-rendered content.
        </p>
        <p>
          Checkout template from{" "}
          <a href="https://github.com/stormkit-io/monorepo-template">GitHub</a>
        </p>
      </div>
      <p className="powered-by">
        Template by{" "}
        <a
          href="https://www.stormkit.io/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="/stormkit-logo.svg" />
        </a>
      </p>
    </div>
  );
};

export default Home;

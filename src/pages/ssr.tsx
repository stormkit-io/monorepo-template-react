import { useContext } from "react";
import { Link } from "react-router-dom";
import reactLogo from "~/assets/react.svg";
import Context from "~/context";

// If a route exports `fetchData` method, it will be called
// on the server side. The returned optional `head` property will be
// injected into HTML for SEO, and the optional `context` property
// will be made available on the client-side.
export const fetchData: FetchDataFunc = (match) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        head: { title: match.name },
        context: { serverTime: Date.now() },
      });
    }, 0.25);
  });
};

const Home: React.FC = () => {
  const context = useContext(Context);

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
        {context ? (
          <>
            <p>
              This page is server side rendered. <br />
              Check the source code and search for the{" "}
              <code>window.CONTEXT</code> object.
            </p>
            <p>
              Context generated on the server-side:
              <br /> <code>{JSON.stringify(context)}</code>
            </p>
            <p>
              Go back to <Link to="/">home page</Link>.
            </p>
          </>
        ) : (
          <p>
            This page has ssr support. Refresh the page and check the content.
          </p>
        )}
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

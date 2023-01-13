import { Routes, Route, RouteProps } from "react-router-dom";

interface Props {
  routes: RouteProps[];
}

const App: React.FC<Props> = ({ routes }) => {
  return (
    <Routes>
      {routes.map((route) => (
        <Route key={route.path} {...route}></Route>
      ))}
    </Routes>
  );
};

export default App;

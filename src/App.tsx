import React, { Suspense, useEffect } from "react";
import { useDispatch } from "react-redux";
import { styled } from "@linaria/react";
import { Link, Route, Switch } from "react-router-dom";

import { ReactComponent as StarIcon } from "./star.svg";

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;

  margin: 15px;
  padding: 20px;
  font-size: 1.5rem;
  background-color: #7dc2f5;
  color: #fff;
  border-radius: 8px;
`;

const StyledLink = styled(Link)`
  color: #fff;
  font-weight: 600;
  text-decoration: none;
`;

const PageOne = React.lazy(() => import("./pages/page-one"));
const PageTwo = React.lazy(() => import("./pages/page-two"));

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: "WORD_FETCH_REQUESTED", payload: "example" });
  }, []);

  return (
    <>
      <Header>
        <StyledLink to="/">Word Keeper</StyledLink>
        <StyledLink to="/stars">
          <StarIcon /> Starred Words
        </StyledLink>
      </Header>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route exact path="/" component={PageOne} />
          <Route path="/stars" component={PageTwo} />
        </Switch>
      </Suspense>
    </>
  );
};

export default App;

import NavBar from "./components/NavBar";
import { Router, Switch, Route } from "wouter";
import { routes } from "./routes";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
      <QueryClientProvider client={queryClient}>
        <>
        <Router>
          <NavBar />
          <br />
          <Switch>
            {routes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                component={route.component}
              />
            ))}
          </Switch>
        </Router>
        </>
        <Toaster position="bottom-right" reverseOrder={false} />
      </QueryClientProvider>
  );
};

export default App;

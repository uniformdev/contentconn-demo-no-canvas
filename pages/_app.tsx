import React from "react";
import { UniformContext } from "@uniformdev/context-react";
import type { UniformAppProps } from "@uniformdev/context-next";
import { createUniformContext } from "../lib/uniformContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import "../styles/globals.css";

const clientContext = createUniformContext();

function UniformContextApp({
  Component,
  pageProps,
  serverUniformContext,
}: UniformAppProps) {
  return (
    <UniformContext context={serverUniformContext ?? clientContext}>
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </UniformContext>
  );
}

export default UniformContextApp;

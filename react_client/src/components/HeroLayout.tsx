import React, { FunctionComponent } from 'react';

type HeroLayoutProps = { children: React.ReactNode };

const HeroLayout: FunctionComponent<HeroLayoutProps> = ({ children }) => (
  <section className="hero is-fullheight has-background-white-ter">
    <div className="hero-body">
      <div className="container is-max-desktop has-text-centered">{children}</div>
    </div>
  </section>
);

export default HeroLayout;

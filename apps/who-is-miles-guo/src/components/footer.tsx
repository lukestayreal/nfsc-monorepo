import React from "react";
import { Gradient } from "./gradient";
import Container from "./container";
import { Button } from "./button";

export default function Footer() {
  return (
    <footer>
      <Gradient className="relative">
        <div className="absolute inset-2 rounded-4xl bg-white/80" />
        <Container className="relative py-16 text-center sm:py-24">
          <div>
            <p className="font-mono text-xs/5 font-semibold uppercase tracking-widest text-gray-500">
              Get started
            </p>
            <p className="mx-auto mt-6 text-3xl text-gray-950 sm:text-5xl tracking-tight font-medium">
              React to dive in ? <br />
              Start your free trial today
            </p>
            <p className="mx-auto mt-6 max-w-xs text-sm/6 text-gray-500">
              Get the cheat codes for selling and unlock your team&apos;s
              revenue potential.
            </p>
            <div className="mt-6">
              <Button className="w-full sm:w-auto" href="/login">
                Get started
              </Button>
            </div>
          </div>
        </Container>
      </Gradient>
    </footer>
  );
}

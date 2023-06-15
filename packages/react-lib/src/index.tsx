import React from "react";
import { getHelloWorld } from "@esbuild-ts-monorepo/vanilla-lib";

export const HelloWorldComponent: React.FC = () => <h1>{getHelloWorld()}</h1>;

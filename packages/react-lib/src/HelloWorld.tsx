import { toCamelCase } from '@bhouston/common-lib';
import React from 'react';
import styled from 'styled-components';

export interface HelloWorldProps {
  name: string;
}

// Styled component for the container
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh; /* Equivalent to Tailwind's min-h-screen */
  background-color: #bfdbfe; /* Equivalent to Tailwind's bg-blue-100 */
`;

// Styled component for the heading
const Heading = styled.h1`
  font-size: 4rem; /* Equivalent to Tailwind's text-6xl */
  color: #10b981; /* Equivalent to Tailwind's text-green */
  margin-bottom: 1.5rem; /* Equivalent to Tailwind's mb-6 */
`;

// Styled component for the paragraph
const Paragraph = styled.p`
  font-size: 1.25rem; /* Equivalent to Tailwind's text-xl */
  color: #000; /* Equivalent to Tailwind's text-black */
`;

export const HelloWorld: React.FC<HelloWorldProps> = ({ name }) => (
  <Container>
    <Heading>Hello, {name}!</Heading>
    <Paragraph>
      {toCamelCase('Welcome to our styled-components + React app!')}
    </Paragraph>
  </Container>
);

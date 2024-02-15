import React from 'react';
import styled from 'styled-components';

interface ErrorPageProps {
  errorCode: number;
  errorMessage: string;
}

// Styled components
const Container = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f3f4f6; // bg-gray-200
`;

const ErrorCode = styled.div`
  font-size: 6rem; // text-6xl
  color: #dc2626; // text-red-600
  font-weight: bold;
`;

const ErrorMessage = styled.div`
  font-size: 1.5rem; // text-2xl
  color: #4b5563; // text-gray-700
  margin-top: 1rem; // mt-4
`;

const ReturnHomeLink = styled.a`
  margin-top: 2rem; // mt-8
  padding: 0.5rem 1rem; // px-4 py-2
  background-color: #3b82f6; // bg-blue-500
  color: white;
  border-radius: 0.375rem; // rounded
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.05); // shadow
  transition: background-color 0.3s; // hover

  &:hover {
    background-color: #2563eb; // hover:bg-blue-700
  }
`;

const ErrorPage: React.FC<ErrorPageProps> = ({ errorCode, errorMessage }) => {
  return (
    <Container>
      <ErrorCode>{errorCode}</ErrorCode>
      <ErrorMessage>{errorMessage}</ErrorMessage>
      <ReturnHomeLink href="/">Return Home</ReturnHomeLink>
    </Container>
  );
};

export default ErrorPage;

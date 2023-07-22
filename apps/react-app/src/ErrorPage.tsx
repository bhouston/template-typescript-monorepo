import React from 'react';

interface ErrorPageProps {
  errorCode: number;
  errorMessage: string;
}

const ErrorPage: React.FC<ErrorPageProps> = ({ errorCode, errorMessage }) => {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-gray-200">
      <div className="text-6xl text-red-600 font-bold">{errorCode}</div>
      <div className="text-2xl text-gray-700 mt-4">{errorMessage}</div>
      <a
        href="/"
        className="mt-8 px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-700"
      >
        Return Home
      </a>
    </div>
  );
};

export default ErrorPage;

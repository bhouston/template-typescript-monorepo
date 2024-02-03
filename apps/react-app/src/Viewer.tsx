import { HelloWorld } from '@bhouston/react-lib';
import React from 'react';
import styled from 'styled-components';

// Styled component
const CenteredDiv = styled.div`
  text-align: center;
  margin-top: 1rem; /* mt-4 */
`;

const Viewer: React.FC = () => {
  return (
    <CenteredDiv>
      <HelloWorld name="Viewer" />
    </CenteredDiv>
  );
};

export default Viewer;

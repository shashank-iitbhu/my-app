// src/App.tsx
import React, { useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { query } from './api';

const theme = {
  dark: {
    backgroundColor: '#1a1a1a',
    textColor: 'rgba(255, 255, 255, 0.87)',
    buttonColor: '#ff4081',
    buttonTextColor: '#ffffff',
    buttonHoverColor: '#ff80ab',
  },
  light: {
    backgroundColor: '#ffffff',
    textColor: '#213547',
    buttonColor: '#ff4081',
    buttonTextColor: '#ffffff',
    buttonHoverColor: '#ff80ab',
  },
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: ${(props) => props.theme.backgroundColor};
  color: ${(props) => props.theme.textColor};
`;

const Title = styled.h1`
  font-size: 3.2em;
  line-height: 1.1;
  margin-bottom: 1em;
`;

const Input = styled.textarea`
  width: 80%;
  max-width: 600px;
  height: 150px;
  padding: 0.5em;
  margin-bottom: 1em;
`;

const Button = styled.button`
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  background-color: ${(props) => props.theme.buttonColor};
  color: ${(props) => props.theme.buttonTextColor};
  cursor: pointer;
  transition: border-color 0.25s;
  &:hover {
    border-color: ${(props) => props.theme.buttonHoverColor};
  }
  &:focus,
  &:focus-visible {
    outline: 4px auto -webkit-focus-ring-color;
  }
`;

const Image = styled.img`
  max-width: 100%;
  margin-top: 1em;
`;

const App: React.FC = () => {
  const [inputText, setInputText] = useState<string>('');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);

  const handleButtonClick = async () => {
    try {
      const imageBlob = await query({ inputs: inputText });
      const imageUrl = URL.createObjectURL(imageBlob);
      setGeneratedImage(imageUrl);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <ThemeProvider theme={theme.dark}>
      <Container>
        <Title>Text to Image Generator</Title>
        <Input
          placeholder="Enter your shashanl text here..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <Button onClick={handleButtonClick}>Generate Image</Button>
        {generatedImage && <Image src={generatedImage} alt="Generated Image" />}
      </Container>
    </ThemeProvider>
  );
};

export default App;

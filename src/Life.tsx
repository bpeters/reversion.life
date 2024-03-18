import { Box, Grid, Text } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { useParams } from 'react-router-dom';

declare global {
  const createLife: any;
}

const openInNewTab = (url: string) => {
  const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
  if (newWindow) newWindow.opener = null
}

export const Life = () => {
  let width = window.innerWidth;
  let height = window.innerHeight;

  if (window.visualViewport) {
    width = window.visualViewport.width;
    height = window.visualViewport.height;
  }

  const windowSize = width < height ? width : height / 2;

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const loadedRef = useRef(false);
  const [hoverTile, setHoverTile] = useState<number | null>(null);

  useEffect(() => {
    if (!loadedRef.current && canvasRef.current) {
      loadedRef.current = true;
      const canvas = canvasRef.current;

      canvas.height = (windowSize) * 16; 
      canvas.width = canvas.height;

      createLife(canvas, 0, 1000);
    }
  }, []);

  return (
    <>
      <Box
        height={(windowSize) * 16 + "px"}
        width={(windowSize) * 16 + "px"}
      >
        <canvas ref={canvasRef} />
      </Box>
      <Grid
        templateColumns="repeat(16, 1fr)"
        gap={0}
        position='absolute'
        top={0}
        left={0}
      >
        {Array.from({ length: 256 }).map((_, index) => {
          const selected = hoverTile === index;
          return (
            <Box
              key={index}
              height={(windowSize) + "px"}
              width={(windowSize) + "px"}
              borderColor={selected ? "#EE82EE" : "#00000000"}
              borderWidth={1}
              _hover={{
                cursor: selected ? 'default' : 'pointer',
                borderColor: selected ? "#EE82EE" : "#FFFFFF50"
              }}
              onClick={() => {
                if (selected) {
                  setHoverTile(null);
                } else {
                  setHoverTile(index);
                }
              }}
              position='relative'
            >
              <Text
                opacity={selected ? 1 : 0}
                padding={4}
                color="#EE82EE"
                fontWeight={"bold"}
              >
                {index + 1}
              </Text>
              <Box
                _hover={{
                  cursor: 'pointer',
                  opacity: 0.8,
                }}
                opacity={selected ? 1 : 0}
                onClick={() => {
                  setHoverTile(null);
                  openInNewTab(`reversion/${index + 1}`);
                }}
                position='absolute'
                bottom={0}
                left={0}
              >
                <Text
                  padding={4}
                  color="#EE82EE"
                  fontWeight={"bold"}
                  textDecoration="underline"
                >
                  {`open ->`}
                </Text>
              </Box>

            </Box>
          );
        })}
      </Grid>
    </>
  );
};

export const LifeTile = ({ setIndex }: any) => {
  let width = window.innerWidth;
  let height = window.innerHeight;

  if (window.visualViewport) {
    width = window.visualViewport.width;
    height = window.visualViewport.height;
  }

  const windowSize = width < height ? width : height;

  const { id }: any = useParams();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const loadedRef = useRef(false);

  useEffect(() => {
    if (!loadedRef.current && canvasRef.current) {
      loadedRef.current = true;
      const canvas = canvasRef.current;

      canvas.height = windowSize; 
      canvas.width = canvas.height;

      setIndex(id);

      createLife(canvas, (parseInt(id, 10)));
    }
  }, []);

  return (
    <Box
      height={(windowSize) + "px"}
      width={(windowSize) + "px"}
    >
      <canvas
        ref={canvasRef}
        style={{
          padding: 0,
          margin: 'auto',
          display: 'block',
          position: 'absolute',
          top: `${Math.floor((height - windowSize))}px`,
          bottom: 0,
          left: 0,
          right: 0,
        }}
      />
    </Box>
  );
};

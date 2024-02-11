import { Box, Grid, Text } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";

declare global {
  const createLife: any;
}

export const Life = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const loadedRef = useRef(false);
  const [hoverTile, setHoverTile] = useState<number | null>(null);

  useEffect(() => {
    if (!loadedRef.current && canvasRef.current) {
      loadedRef.current = true;
      const canvas = canvasRef.current;
      canvas.height = (window.innerHeight / 2) * 16; 
      canvas.width = (window.innerHeight / 2) * 16;
      createLife(canvas, 0);
    }
  }, []);

  return (
    <>
      <Box
        height={(window.innerHeight / 2) * 16 + "px"}
        width={(window.innerHeight / 2) * 16 + "px"}
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
        {Array.from({ length: 256 }).map((_, index) => (
          <Box
            key={index}
            height={(window.innerHeight / 2) + "px"}
            width={(window.innerHeight / 2) + "px"}
            borderColor="#EE82EE"
            borderWidth={1}
            _hover={{
              // cursor: 'pointer',
              borderColor: "#EE82EE"
            }}
            opacity={hoverTile === index ? 0.8 : 0}
            transition="opacity 0.6s ease-in-out"
            onMouseEnter={() => setHoverTile(index)}
            onMouseLeave={() => setHoverTile(null)}
          >
            <Text padding={4} color="#EE82EE" fontWeight={"bold"}>
              {index}
            </Text>
          </Box>
        ))}
      </Grid>
    </>
  );
};

import { Box, Grid, Text } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    block: any;
  }
}

export const BlockCount = () => {
  const loadedRef = useRef(false);
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    if (!loadedRef.current) {
      loadedRef.current = true;

      setInterval(() => {
        setCount(window.block);
      }, 300);
    }
  }, []);

  return (
    <>
      <Text
        fontSize={'24px'}
        color={'#EE82EE'}
        paddingLeft="14px"
      >
        [
      </Text>
      <Text
        color={'#F7931A'}
        fontSize={'20px'}
      >
        {count || 'life'}
      </Text>
      <Text
        fontSize={'24px'}
        color={'#EE82EE'}
      >
        ]
      </Text>
    </>
  );
};

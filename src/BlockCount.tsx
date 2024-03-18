import { Text } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import accounting from "accounting";

declare global {
  interface Window {
    block: any;
    blockDiff: any;
  }
}

export const BlockCount = () => {
  const loadedRef = useRef(false);
  const [count, setCount] = useState<string | null>(null);

  useEffect(() => {
    if (!loadedRef.current) {
      loadedRef.current = true;

      setInterval(() => {
        setCount(`${accounting.formatNumber(window.block)}`);
      }, 100);
    }
  }, []);

  return (
    <>
      <Text
        fontSize={'18px'}
        color={'#EE82EE'}
        paddingLeft="14px"
      >
        [
      </Text>
      <Text
        color={'#F7931A'}
        fontSize={'16px'}
      >
        {count || 'life'}
      </Text>
      <Text
        fontSize={'18px'}
        color={'#EE82EE'}
      >
        ]
      </Text>
    </>
  );
};

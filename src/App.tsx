import {
  ChakraProvider,
  Box,
  Text,
  VStack,
  HStack,
  extendTheme,
} from "@chakra-ui/react"

import { Life } from './Life';
import { BlockCount } from './BlockCount';

const theme = extendTheme({
  fonts: {
    heading: `'DM Mono', monospace`,
    body: `'DM Mono', monospace`,
  },
  styles: {
    global: {
      body: {
        backgroundColor: '#000000',
      },
    },
  },
});

export const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <Box backgroundColor="#000000" width="100vw" height="100vh">
        <Life />
        <VStack
          spacing={2}
          justify='start'
          align='start'
          position='fixed'
          bottom={10}
          left={8}
        >
          <HStack>
            <Text
              fontSize={'24px'}
              color={'#EE82EE'}
              paddingLeft="14px"
            >
              reversion
            </Text>
            <BlockCount />
          </HStack>
          <Text
            fontSize={'12px'}
            color={'#FFC0CB'}
            paddingLeft="16px"
            fontWeight={'bold'}
          >
            Multiple Neighborhoods Cellular Automata, Secured by <b>Bitcoin</b>
          </Text>
        </VStack>
      </Box>
    </ChakraProvider>
  );
}




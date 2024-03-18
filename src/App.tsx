import {
  ChakraProvider,
  Box,
  Text,
  VStack,
  HStack,
  extendTheme,
  Image,
  IconButton,
  Icon,
} from "@chakra-ui/react"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { FaTwitter, FaDiscord, FaCamera } from 'react-icons/fa';
import { useState } from "react";
import _ from "lodash";

import { Life, LifeTile } from './Life';
import { BlockCount } from './BlockCount';
import MusicPlayer from './MusicPlayer';

import { reversions } from './reversions-meta';


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

const openInNewTab = (url: string) => {
  const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
  if (newWindow) newWindow.opener = null
}

const Header = ({ index }: any) => {
  console.log(index);

  const item: any = _.find(reversions, (r) => {
    return _.isUndefined(index) ? false : r.meta.name === `Reversion #${parseInt(index, 10)}`
  });

  return (
    <div
      style={{
        position: 'fixed',
        top: 10,
        left: 8,
      }}
    >
      <VStack
        spacing={2}
        justify='start'
        align='start'
      >
        <HStack>
          <Text
            fontSize={'24px'}
            color={'#EE82EE'}
            paddingLeft="14px"
          >
            {index !== null ? `reversion ${parseInt(index, 10)}` : 'reversion'}
          </Text>
          <BlockCount />
        </HStack>
        <Text
          fontSize={'12px'}
          color={'#FFC0CB'}
          paddingLeft="16px"
          fontWeight={'bold'}
          width={"80vw"}
        >
          Multiple Neighborhoods Cellular Automata, Secured by <b>Bitcoin</b>
        </Text>
        <HStack
          spacing={4}
          paddingLeft="14px"
          paddingTop="8px"
        >
          <Box
            _hover={{
              cursor: 'pointer',
              opacity: 0.8,
            }}
            onClick={() => openInNewTab('https://discord.gg/sqordinals')}
          >
            <FaDiscord
              color='#01FFFF'
            />
          </Box>
          <Box
            _hover={{
              cursor: 'pointer',
              opacity: 0.8,
            }}
            onClick={() => openInNewTab('https://twitter.com/sqordinals')}
          >
            <FaTwitter
              color='#0100FF'
            />
          </Box>
          {/* <IconButton
            fontSize={'10px'}
            fontWeight={'bold'}
            aria-label="Snapshot"
            icon={<Icon as={FaCamera} color="#FE0101" boxSize="20px" />}
            backgroundColor="transparent"
            _hover={{ backgroundColor: 'gray.800' }}
            _active={{ backgroundColor: 'gray.900' }}
          /> */}
          <Box
            _hover={{
              cursor: 'pointer',
              opacity: 0.8,
            }}
            onClick={() => {
              if (item) {
                openInNewTab(`https://magiceden.io/ordinals/item-details/${item.id}`);
              } else {
                openInNewTab('https://magiceden.io/ordinals/marketplace/reversions');
              }
            }}
          >
            <Image
              src="/magic-eden.svg"
              alt="MagicEden"
              width="30px"
            />
          </Box>
        </HStack>
      </VStack>
    </div>
  )
}

const Footer = (props: any) => {
  return (
    <VStack
      zIndex={100000}
      position={'fixed'}
      bottom={0}
      left={0}
      paddingLeft={'20px'}
      paddingBottom={'10px'}
      paddingTop={'10px'}
      justify={'flex-start'}
      align={'flex-start'}
      spacing={1}
      // backgroundColor={'black'}
      width={'100vw'}
      opacity={1}
    >
      <MusicPlayer setTrack={props.setTrack} />
    </VStack>
  )
};

export const App = () => {
  const [index, setIndex] = useState(null);
  const [track, setTrack]: any = useState(0);

  return (
    <ChakraProvider theme={theme}>
      <Box
        backgroundColor="#000000"
      >
        <Router>
          <Routes>
            <Route path="/" element={<Life />} />
            <Route path="reversion/:id" element={<LifeTile setIndex={setIndex} />} />
          </Routes>
        </Router>
        <Header index={index} />
        <Footer setTrack={setTrack} />
      </Box>
    </ChakraProvider>
  );
}




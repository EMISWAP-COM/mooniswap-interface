import React from 'react';
import { Box, Flex, Text } from 'ThemeProvider';
import Wrapper from './wrapper';
import InputOption from '../inputs/InputOption';

const InputsExample = () => {
  return (
    <Wrapper bg="drop">
      <Flex alignItems="center">
        <Text variant="mediumRubikMedium" color="paper">
          Nothing but input:
        </Text>
        <Box ml={6}>
          <InputOption />
        </Box>
      </Flex>
      <Flex alignItems="center">
        <Text variant="mediumRubikMedium" color="paper">
          With header :
        </Text>
        <Box ml={6}>
          <InputOption header="From" subheader="Balance: 5000" />
        </Box>
      </Flex>
    </Wrapper>
  );
};

export default InputsExample;

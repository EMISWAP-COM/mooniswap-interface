import React from 'react';
import styled from 'styled-components';
import { Box, Flex, Image, Text } from '../ThemeProvider/components';
import { color, layout } from 'styled-system';
import EmiswapLogo from '../assets/svg/logo.svg';
import TelegramOutlinedLogo from '../assets/svg/SocIcons/telegramOutlined.svg';
import TwitterLogo from '../assets/svg/SocIcons/twitter.svg';
import MediumLogo from '../assets/svg/SocIcons/medium.svg';
import FacebookLogo from '../assets/svg/SocIcons/facebook.svg';
import DiscordLogo from '../assets/svg/SocIcons/discord.svg';

const ListWrapper = styled.div`
  &:nth-of-type(n + 2) {
    margin-left: 3.75rem;
  }
`;

const ListsHeader = styled.header`
  ${color};
  height: 1rem;
  margin-bottom: 1rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const ListLink = styled.a`
  ${color};
  text-decoration: none;
  white-space: pre-line;
`;

const LinkListItem = styled.li`
  list-style-type: none;
  ${layout};
`;

const SocialMediaButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2rem;
  height: 2rem;
  border: none;
  cursor: pointer;
  border-radius: 0.625rem;
  background: rgba(255, 255, 255, 0.15);
  & > img {
    width: 20px;
  }
  &:nth-child(n + 2) {
    margin-left: 0.75rem;
  }
`;

const UnorderedListWrapper = styled.ul`
  padding: 0;
`;

const HighlightedLink = styled.a`
  color: white;
  text-decoration-color: white;
`;

const FOOTER_MIN_HEIGHT = 279;

const headerLinks = {
  ['EmiSwap DEX']: '#',
  ['Info']: '#',
  ['Security']: '#',
};

const links = {
  ['EmiSwap DEX']: {
    ['Swap']: '#',
    ['Farming']: '#',
    ['Provide liquidity']: '#',
    ['Referral Program']: '#',
    ['Bridge Multichain']: '#',
  },
  ['Info']: {
    ['Support']: '#',
    ['Analytics']: '#',
    ['Dashboard']: '#',
    ['ESW Token ']: '#',
    ['Wiki']: '#',
  },
  ['Security']: {
    ['Smart Contract \n Audit By Hacken']: '#',
    ['Smart contract \n Audit by BlueSwarm']: '#',
    ['Code']: '#',
  }
};

const LogoPart = () => (
  <Flex
    alignItems="baseline"
    justifyContent="flex-end"
    width={1/4}
  >
    <Box
      mb="4rem"
      width="100%"
      height="100%"
    >
      <Image
        width="9rem"
        height={3}
        backgroundImage={`url(${EmiswapLogo})`}
        backgroundSize="cover"
      />
    </Box>
  </Flex>
);

const LinksPart = () => (
  <Flex width={1/2}>
    {Object.keys(links).map((headerLink) => {
      const listLinks = Object.keys(links[headerLink]).map((listLink) => (
        <LinkListItem>
          <ListLink
            color="fadedLink"
            href={links[headerLink][listLink]}
          >
            {listLink}
          </ListLink>
        </LinkListItem>
      ));
      return (
        <ListWrapper>
          <ListsHeader
            color="text"
          >
            <ListLink
              color="text"
              href={headerLinks[headerLink]}
            >
              {headerLink}
            </ListLink>
          </ListsHeader>
          <UnorderedListWrapper>
            {listLinks}
          </UnorderedListWrapper>
        </ListWrapper>
      );
    })}
  </Flex>
);

const SocialsPart = () => (
  <Box width={1/4}>
    <ListsHeader
      color="text"
    >
      <ListLink
        color="text"
      >
        Socials
      </ListLink>
    </ListsHeader>
    <Flex>
      <SocialMediaButton>
        <img src={TelegramOutlinedLogo} alt="Telegram" />
      </SocialMediaButton>
      <SocialMediaButton>
        <img src={TwitterLogo} alt="Twitter" />
      </SocialMediaButton>
      <SocialMediaButton>
        <img src={MediumLogo} alt="Medium" />
      </SocialMediaButton>
      <SocialMediaButton>
        <img src={FacebookLogo} alt="Facebook" />
      </SocialMediaButton>
      <SocialMediaButton>
        <img src={DiscordLogo} alt="Reddit" />
      </SocialMediaButton>
    </Flex>
    <Box>
      <Text
        color="fadedLink"
        mt={2}
        mb={0}
      >
        Received grants from:
      </Text>
      <Text color="text">
        <HighlightedLink href="#">Near Protocol</HighlightedLink>
        <span>&nbsp;&&nbsp;</span>
        <HighlightedLink href="#">Gate Chain</HighlightedLink>
      </Text>
    </Box>
  </Box>
);

const Footer = () => {
  return (
    <Flex
      justifyContent="space-between"
      backgroundColor="bg"
      minHeight={FOOTER_MIN_HEIGHT}
      padding="2rem"
    >
      <LogoPart />
      <LinksPart />
      <SocialsPart />
    </Flex>
  );
};

export default Footer;

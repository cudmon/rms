"use client"

import { useState } from 'react';
import { Container, Group, Burger, Anchor, ActionIcon } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconUserSquareRounded } from '@tabler/icons-react';
import Link from 'next/link';


const links = [
  { link: '/dashboard/menus', label: 'Menu' },
  { link: '/dashboard/table', label: 'Table' },
  { link: '/dashboard/user', label: 'User' }
];

export default function Page() {
  const [opened, { toggle }] = useDisclosure(false);
  const [active, setActive] = useState(links[0].link);

  const items = links.map((link) => (
    <Link
      key={link.label}
      href={link.link}
      data-active={active === link.link || undefined}
      onClick={() => setActive(link.link)}>
      {link.label}
    </Link>
  ));
  return (
    <>
      <Container>
        Hello Manager!!
      </Container>

    </>
  );
}

import React from 'react';
import { Menu } from '@ui-kitten/components';

const data = [
  { title: 'Item 1' },
  { title: 'Item 2' },
  { title: 'Item 3' },
  { title: 'Item 4' },
];

export const MenuWithoutDividerShowcase = () => {

  const [selectedIndex, setSelectedIndex] = React.useState(null);

  return (
    <Menu
      appearance='noDivider'
      data={data}
      selectedIndex={selectedIndex}
      onSelect={setSelectedIndex}
    />
  );
};

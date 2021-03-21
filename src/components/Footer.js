import React from 'react';
import { Menu } from 'semantic-ui-react';

function Footer() {
  return (
    <Menu
      fixed="bottom"
      inverted={true}
      size="mini"
      style={{ maxHeight: '2%' }}
    >
      <Menu.Item name="copyright" position="right">
        © 2021 goodfriend | Julia Zolotarev
      </Menu.Item>
      .
    </Menu>
  );
}

export default Footer;

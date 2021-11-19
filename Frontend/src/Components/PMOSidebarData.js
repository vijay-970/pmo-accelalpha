import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

export const PMOSidebarData = [
  {
    title: 'Home',
    eventKey:"home",
    path: '/',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'
  },
  {
    title: 'Project KPIs',
    path: '/KPI/PM',
    icon: <FaIcons.FaCartPlus />,
    cName: 'nav-text'
  },
  {
    title: 'PMO Input',
    path: '/pmoInput',
    icon: <IoIcons.IoIosPaper />,
    cName: 'nav-text'
  }
];

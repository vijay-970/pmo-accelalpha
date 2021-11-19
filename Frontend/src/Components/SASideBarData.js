import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

export const SASidebarData = [
  {
    title: 'Home',
    eventKey:"home",
    path: '/',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'
  },
  
  {
    title: 'Self KPI',
    path: '/KPI/PM',
    icon: <FaIcons.FaCartPlus />,
    cName: 'nav-text'
  },
];

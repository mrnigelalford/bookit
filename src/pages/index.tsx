import React from 'react';
import { TezosToolkit } from '@taquito/taquito';
import { BeaconWallet } from '@taquito/beacon-wallet';

// import Home01 from './Home01';
import HomeComponent from './HomeComponent';
import Explore01 from './Explore01';
import LiveAuctions from './LiveAuctions';
import ItemDetails02 from './ItemDetails';
import Activity02 from './Activity02';
import Blog from './Blog';
import BlogDetails from './BlogDetails';
import HelpCenter from './HelpCenter';
import Author from './Author';
import WalletConnect from './WalletConnect';
import CreateItem from './CreateItem';
import EditProfile from './EditProfile';
import Ranking from './Ranking';
import Login from './Login';
import SignUp from './SignUp';
import NoResult from './NoResult';
import FAQ from './FAQ';
import Contact02 from './Contact';

interface RouteProps {
  wallet?: BeaconWallet;
  Tezos?: TezosToolkit;
}

export const setRoutes = ({ wallet, Tezos }: RouteProps) => [
  // { path: '/', component: <Home01 /> },
  { path: '/', component: <HomeComponent /> },
  { path: '/explore', component: <Explore01 /> },
  { path: '/live-auctions', component: <LiveAuctions /> },
  { path: '/item-details', component: <ItemDetails02 /> },
  { path: '/activity', component: <Activity02 /> },
  { path: '/blog', component: <Blog /> },
  { path: '/blog-details', component: <BlogDetails /> },
  { path: '/help-center', component: <HelpCenter /> },
  { path: '/author', component: <Author /> },
  { path: '/wallet-connect', component: <WalletConnect /> },
  {
    path: '/create-book',
    component: <CreateItem wallet={wallet} Tezos={Tezos} />,
  },
  { path: '/edit-profile', component: <EditProfile /> },
  { path: '/ranking', component: <Ranking /> },
  { path: '/login', component: <Login /> },
  { path: '/sign-up', component: <SignUp /> },
  { path: '/no-result', component: <NoResult /> },
  { path: '/faq', component: <FAQ /> },
  { path: '/contact', component: <Contact02 /> },
];

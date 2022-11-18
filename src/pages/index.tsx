import React from 'react';
import { TezosToolkit } from '@taquito/taquito';
import { BeaconWallet } from '@taquito/beacon-wallet';

// import Home01 from './Home01';
import HomeComponent from './HomeComponent/HomeComponent';
import Explore from './Explore/Explore';
import LiveAuctions from './LiveAuctions';
import BookDetails from '../pages/BookDetails/BookDetails';
import Activity02 from './Activity02';
import Blog from './Blog';
import BlogDetails from './BlogDetails';
import HelpCenter from './HelpCenter';
import Author from './Author';
import WalletConnect from './WalletConnect';
import CreateBook from './CreateBook/CreateBook';
import EditProfile from './EditProfile';
import Ranking from './Ranking';
import Login from './Login';
import SignUp from './SignUp';
import NoResult from './NoResult';
import FAQ from './FAQ';
import Contact02 from './Contact';
import Originate from './Originate/Originate';

interface RouteProps {
  wallet: BeaconWallet;
  Tezos: TezosToolkit;
  toast: any;
}

export const setRoutes = ({ wallet, Tezos, toast }: RouteProps) => [
  // { path: '/', component: <Home01 /> },
  { path: '/', component: <HomeComponent /> },
  { path: '/explore', component: <Explore /> },
  { path: '/live-auctions', component: <LiveAuctions /> },
  { path: '/book-details/:id', component: <BookDetails wallet={wallet} Tezos={Tezos} toast={toast} /> },
  { path: '/activity', component: <Activity02 /> },
  { path: '/blog', component: <Blog /> },
  { path: '/blog-details', component: <BlogDetails /> },
  { path: '/help-center', component: <HelpCenter /> },
  { path: '/author', component: <Author /> },
  { path: '/wallet-connect', component: <WalletConnect /> },
  {
    path: '/create-book',
    component: <CreateBook wallet={wallet} Tezos={Tezos} toast={toast} />,
  },
  { path: '/edit-profile', component: <EditProfile /> },
  { path: '/ranking', component: <Ranking /> },
  { path: '/login', component: <Login /> },
  { path: '/sign-up', component: <SignUp /> },
  { path: '/no-result', component: <NoResult /> },
  { path: '/faq', component: <FAQ /> },
  { path: '/contact', component: <Contact02 /> },
  { path: '/originate', component: <Originate wallet={wallet} Tezos={Tezos} toast={toast}/> },
];

import Router from 'next/router';

export const redirectTo = (path) => {
  Router.push(path);
};
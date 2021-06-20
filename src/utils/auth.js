export const getCurrentAuthority = () => {
  return ['admin'];
};

export const check = (authority) => {
  const current = getCurrentAuthority();
  return current.some((item) => authority.includes(item));
};

export const isLogin = () => {
  const current = getCurrentAuthority();
  return current && current[0] !== 'guest';
};

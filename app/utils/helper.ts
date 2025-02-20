export const getFirstAndLastString = (str: string): string => {
  const first = str.substring(0, 8);
  const last = str.substring(str.length - 8);

  return `${first}...${last}`;
};

export const getShortenedAddress = (address: string) => {
  return address?.slice(0, 5) + '...' + address?.slice(-7)
}
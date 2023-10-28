/**
 * YYYY-MM-DD HH:mm:ss → YYYY年MM月DD日HH時mm分
 */
export const makeLastPublishedAt = (datetime: string) => {
  const date = new Date(datetime);
  return `${date.getFullYear()}年${date.getMonth()}月${date.getDay()}日${date.getHours()}時${date.getMinutes()}分`;
};

export const generatePageInfo = (currentPage: number, totalPage: number) => {
  return `${currentPage}話／全${totalPage}話`;
};

export const generateNcodeCaption = (ncode: string) => {
  return `https://ncode.syosetu.com/${ncode}`;
};

export const generateNarouHref = (ncode: string, currentPage: number) => {
  if (currentPage === 0) {
    return `/viewer/narou/${ncode}`;
  } else {
    return `/viewer/narou/${ncode}/${currentPage}`;
  }
};

export const generateIframeSrc = (ncode: string, currentPage?: string) => {
  if (!currentPage) {
    return `/proxy/narou/${ncode}`;
  } else {
    return `/proxy/narou/${ncode}/${currentPage}`;
  }
};

export const generateNarouApiUrl = (ncode: string) => {
  return `https://api.syosetu.com/novelapi/api?out=json&lim=500&ncode=${ncode}`;
};

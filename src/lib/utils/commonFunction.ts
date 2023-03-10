/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-restricted-syntax */
export function getOS() {
  const { userAgent } = window.navigator;
  const { platform } = window.navigator;
  const macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'];
  const windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'];
  const iosPlatforms = ['iPhone', 'iPad', 'iPod'];
  let os = null;

  if (macosPlatforms.indexOf(platform) !== -1) {
    os = 'Mac OS';
  } else if (iosPlatforms.indexOf(platform) !== -1) {
    os = 'iOS';
  } else if (windowsPlatforms.indexOf(platform) !== -1) {
    os = 'Windows';
  } else if (/Android/.test(userAgent)) {
    os = 'Android';
  } else if (!os && /Linux/.test(platform)) {
    os = 'Linux';
  }

  return os as string;
}

export const isEmpty = (value: any) =>
  value === undefined ||
  value === null ||
  (typeof value === 'string' && value.trim() === '') ||
  (Array.isArray(value) && value.length === 0) ||
  (value?.constructor?.name === 'Object' && Object.keys(value).length === 0) ||
  ((value?.constructor?.name === 'Map' || value?.constructor?.name === 'Set') && value.size === 0);

export const hexToRGBA = (hex: string, alpha: string | number) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  if (alpha) return `rgba(${r},${g},${b}, ${alpha})`;
  return `rgb(${r},${g},${b})`;
};

function isObject(item: any): boolean {
  return item instanceof Object && !Array.isArray(item);
}

export function mergeDeep(target: any, ...sources: any[]): any {
  if (!sources.length) return target;
  const source = sources.shift();

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} });
        mergeDeep(target[key], source[key]);
      } else {
        Object.assign(target, { [key]: source[key] });
      }
    }
  }

  return mergeDeep(target, ...sources);
}

export const versionCheck = (version: 'string') => {
  const ver: Array<string> = version.split('.');
  return {
    major: parseInt(ver[0] as string, 10) || 0,
    minor: parseInt(ver[1] as string, 10) || 0,
    patch: parseInt(ver[2] as string, 10) || 0,
  };
};

export const createDeeplink = (upid: string, ref_username: string) => {
  const encoded_deep_link_url = encodeURIComponent(
    `flam://exp?upid=${upid}&ref=${ref_username}`
  ) as string;
  const res = `https://app.adjust.net.in/9tdiyp2?label=edl&deeplink=${encoded_deep_link_url}`;
  return res;
};

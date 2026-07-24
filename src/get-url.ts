import {Tool} from './constants';

export function getURL(version: string, osName: string, archName: string): string {
  const ext = osName === 'windows' ? 'zip' : 'tar.gz';
  const assetName = `${Tool.Name}_${version}_${osName}-${archName}.${ext}`;
  return `https://github.com/${Tool.Org}/${Tool.Repo}/releases/download/${version}/${assetName}`;
}

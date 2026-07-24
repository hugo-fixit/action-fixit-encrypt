import {Tool} from './constants';

export async function getLatestVersion(): Promise<string> {
  const url = `https://api.github.com/repos/${Tool.Org}/${Tool.Repo}/releases/latest`;
  const response = await fetch(url, {
    headers: {
      Accept: 'application/vnd.github.v3+json',
      'User-Agent': `${Tool.Org}/${Tool.Repo}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch latest version: ${response.status} ${response.statusText}`);
  }

  const data = (await response.json()) as {tag_name: string};
  return data.tag_name;
}

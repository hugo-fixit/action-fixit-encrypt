export const Tool = {
  Name: 'fixit-encrypt',
  Org: 'hugo-fixit',
  Repo: 'fixit-encrypt',
  CmdName: 'fixit-encrypt',
  CmdOptVersion: '--version',
} as const;

export enum Action {
  WorkDirName = 'actions_fixit_encrypt',
  TempDirName = '_temp',
}

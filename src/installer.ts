import * as core from '@actions/core';
import * as tc from '@actions/tool-cache';
import * as io from '@actions/io';
import * as path from 'path';
import * as os from 'os';
import {exec} from '@actions/exec';
import {Action, Tool} from './constants';
import {getURL} from './get-url';
import {getOS} from './get-os';
import {getArch} from './get-arch';

export async function install(version: string): Promise<void> {
  const osName = getOS(process.platform);
  const archName = getArch(process.arch);
  const url = getURL(version, osName, archName);

  core.info(`Downloading ${Tool.Name} ${version} for ${osName}/${archName}...`);
  core.info(`URL: ${url}`);

  const downloadPath = await tc.downloadTool(url);
  const workDir = path.join(os.homedir(), Action.WorkDirName);
  const binDir = path.join(workDir, 'bin');
  const tempDir = path.join(workDir, Action.TempDirName);

  await io.mkdirP(binDir);
  await io.mkdirP(tempDir);

  let extractedPath: string;
  if (url.endsWith('.zip')) {
    extractedPath = await tc.extractZip(downloadPath, tempDir);
  } else {
    extractedPath = await tc.extractTar(downloadPath, tempDir);
  }

  const binaryName = process.platform === 'win32' ? `${Tool.CmdName}.exe` : Tool.CmdName;
  const binaryPath = path.join(extractedPath, binaryName);
  const targetPath = path.join(binDir, binaryName);

  await io.mv(binaryPath, targetPath);

  if (process.platform !== 'win32') {
    await exec('chmod', ['+x', targetPath]);
  }

  core.addPath(binDir);
  core.info(`${Tool.Name} ${version} installed to ${targetPath}`);
}

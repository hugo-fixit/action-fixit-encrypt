import * as core from '@actions/core';
import {exec} from '@actions/exec';
import {Tool} from './constants';
import {getLatestVersion} from './get-latest-version';
import {install} from './installer';

export async function run(): Promise<void> {
  try {
    let version = core.getInput('version');

    if (!version || version === 'latest') {
      core.info('Resolving latest version...');
      version = await getLatestVersion();
      core.info(`Latest version: ${version}`);
    }

    if (!version.startsWith('v')) {
      version = `v${version}`;
    }

    await install(version);

    core.info('Verifying installation...');
    let output = '';
    const exitCode = await exec(Tool.CmdName, [Tool.CmdOptVersion], {
      ignoreReturnCode: true,
      listeners: {
        stdout: (data: Buffer) => {
          output += data.toString();
        },
      },
    });

    if (exitCode !== 0) {
      throw new Error(`Failed to verify ${Tool.Name} installation. Exit code: ${exitCode}`);
    }

    core.info(output.trim());
    core.info(`${Tool.Name} ${version} installed successfully.`);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    core.setFailed(`Failed to install ${Tool.Name}: ${message}`);
  }
}

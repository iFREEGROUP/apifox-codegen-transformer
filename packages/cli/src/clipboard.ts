import { execa } from 'execa'
import * as os from 'node:os'
import * as process from 'node:process'

export async function read(): Promise<string> {
  switch (os.platform()) {
    case 'win32': {
      const subProcess = await execa('Get-Clipboard', {
        shell: 'powershell.exe',
      })
      return subProcess.stdout
    }
    case 'linux':
      if (process.env.XDG_SESSION_TYPE === 'wayland') {
        const subProcess = await execa('wl-paste')
        return subProcess.stdout
      } else {
        const subProcess = await execa('xclip', ['-o'])
        return subProcess.stdout
      }
    default:
      throw new Error('Reading from clipboard is unsupported on this platform.')
  }
}

export async function write(content: string): Promise<void> {
  switch (os.platform()) {
    case 'win32':
      await execa('Set-Clipboard', [content], { shell: 'powershell.exe' })
      break
    case 'linux':
      if (process.env.XDG_SESSION_TYPE === 'wayland') {
        await execa('wl-copy', [content], { stdio: 'ignore' })
      } else {
        await execa('xclip', { input: content })
      }
      break
    default:
      throw new Error('Writing to clipboard is unsupported on this platform.')
  }
}

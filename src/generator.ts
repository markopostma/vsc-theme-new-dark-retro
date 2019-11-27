import chalk from 'chalk'
import { readFileSync, writeFile } from 'fs'
import ejs from 'ejs'
import { join } from 'path'
import originalJSON from '../themes/new-dark-retro-color-theme.json'
import colors from './colors.json'
import { Compilation } from './compilation'

type ColorKey = keyof typeof colors

/**
 * --------------------------------------------------------------------------
 * Generator
 * --------------------------------------------------------------------------
 *
 *    0%      00
 *    10%     1A
 *    25%     40
 *    50%     7F
 *    75%     BF
 *    100%    FF
 *
 */
export class Generator {
  public readonly colors = colors
  public readonly original = originalJSON
  public readonly output = join(__dirname, '../themes/new-dark-retro-color-theme.json')

  public async compile() {
    return await new Promise<any>(async (resolve) => {
      const line = ''.padEnd(10, '■')

      for (const color of ['primary', 'secondary', 'danger', 'warning', 'success']) {
        const hex = this.colors[`color-${color}-500` as ColorKey]
        const colorize = chalk.hex(hex)

        console.log(colorize(chalk.bold(color.padEnd(12, ' ')) + line))
      }

      for (const i of [100, 200, 300, 400, 500, 600, 700, 800, 900]) {
        const hex = this.colors[`color-dark-${i}` as ColorKey]
        const colorize = chalk.hex(hex)

        console.log(colorize(chalk.bold.white(('dark-')) + i.toString().padEnd(12, ' ') + line))
      }

      const colorCodes = {
        ...colors,
        danger: colors['color-danger-500'],
        dark: colors['color-dark-600'],
        primary: colors['color-primary-500'],
        secondary: colors['color-secondary-500'],
        success: colors['color-success-500'],
        warning: colors['color-warning-500'],
        white: colors['color-white-100'],
      }

      const template = {
        '$schema': 'vscode://schemas/color-theme',
        name: 'New Dark Retro',
        type: 'dark',
        ...JSON.parse(
          ejs.render(
            readFileSync(join(__dirname, 'template.json')).toString(),
            {
              ...colorCodes,
              color: (color: keyof typeof colorCodes) => {
                return colorCodes[color]
              },
              alpha: (hex: string, alpha: 0 | 10 | 25 | 50 | 75 | 100) => {
                const color = colorCodes[hex as keyof typeof colorCodes]
                switch (Number(alpha)) {
                  case 0:
                    return color + '00'
                  case 10:
                    return color + '1A'
                  case 25:
                    return color + '40'
                  case 50:
                    return color + '7F'
                  case 75:
                    return color + 'BF'
                  case 100:
                  default:
                    return color + 'FF'
                }
              }
            }
          )
        )
      }

      writeFile(this.output, JSON.stringify(template, null, process.env.NODE_ENV === 'production' ? 0 : 2), (err) => {
        if (err) {
          console.error(err)
          process.exit()
        } else {
          resolve(new Compilation())
        }
      })
    })
  }
}

export default new Generator()

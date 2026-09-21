import type { ConfigPartial } from 'artalk'

/**
 * Artalk 配置
 *
 * 与 Artalk 的配置项保持一致, 仅在 `server` 与 `site` 上做必填约束。
 * 其余选项请参考 [Artalk 文档](https://artalk.js.org/guide/frontend/configure.html)。
 */
export type ArtalkOptions = ConfigPartial & {
  /** 后端地址 */
  server: string
  /** 站点名称 */
  site: string
}

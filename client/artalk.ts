import type { ComputedRef } from 'vue'
import { computed, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import Artalk from 'artalk'
import type { ArtalkOptions } from '../types'
import { useAddonArtalk } from './options'

/** 默认挂载点, 与 `components/ArtalkClient.vue` 中的容器保持一致 */
const DEFAULT_EL = '#ArtalkComment'

interface ArtalkEntry {
  artalk: Artalk
  /** 引用计数: 主题与 `<ArtalkClient />` 组件可能同时初始化同一个挂载点 */
  refs: number
}

const instances = new Map<Element | string, ArtalkEntry>()

/**
 * 初始化 Artalk 评论
 *
 * 同一个挂载点只会初始化一次, 否则页面上会出现多个评论框;
 * 最后一个使用者卸载时才销毁实例。
 */
export function useArtalk(options: ComputedRef<ArtalkOptions | undefined>) {
  const { locale } = useI18n()
  let mounted: { key: Element | string, entry: ArtalkEntry } | undefined

  onMounted(() => {
    const opts = options.value
    const el = opts?.el ?? DEFAULT_EL
    const key = typeof el === 'string' ? (document.querySelector(el) ?? el) : el

    const existing = instances.get(key)
    if (existing) {
      existing.refs += 1
      mounted = { key, entry: existing }
      return
    }

    const entry: ArtalkEntry = {
      artalk: Artalk.init({ locale: locale.value, ...opts, el }),
      refs: 1,
    }
    instances.set(key, entry)
    mounted = { key, entry }
  })

  onUnmounted(() => {
    if (!mounted)
      return

    mounted.entry.refs -= 1
    if (mounted.entry.refs > 0)
      return

    instances.delete(mounted.key)
    mounted.entry.artalk.destroy()
  })
}

export function useArtalkWithOptions() {
  const addonArtalk = useAddonArtalk()
  const options = computed(() => addonArtalk.value.options)
  useArtalk(options)
}

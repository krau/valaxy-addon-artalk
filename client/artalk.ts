import type { ComputedRef } from 'vue'
import { computed, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import Artalk from 'artalk'
import type { ArtalkOptions } from '../types'
import { useAddonArtalk } from './options'

export function useArtalk(options: ComputedRef<ArtalkOptions | undefined>) {
  const { locale } = useI18n()
  // 仅在客户端挂载后才存在实例
  let artalk: Artalk | undefined

  onMounted(() => {
    artalk = Artalk.init({
      el: '#ArtalkComment',
      locale: locale.value,
      ...options.value,
    })
  })

  onUnmounted(() => {
    artalk?.destroy()
  })
}

export function useArtalkWithOptions() {
  const addonArtalk = useAddonArtalk()
  const options = computed(() => addonArtalk.value.options)
  useArtalk(options)
}

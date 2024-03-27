# valaxy-addon-artalk

valaxy-addon-artalk 是 [Artalk](https://artalk.js.org/) 的一个 Valaxy 插件.

用户可以使用此插件启用 Artalk 评论系统, 主题开发者可以通过此插件集成对 Artalk 的支持.

当前暂未支持浏览量统计.

## 使用

```bash
pnpm add valaxy-addon-artalk
```

### 主题使用者

启用 Artalk 评论

```ts
import { defineValaxyConfig } from "valaxy";
import { addonArtalk } from "valaxy-addon-artalk";

export default defineValaxyConfig({
  siteConfig: {
    // 启用评论
    comment: {
      enable: true,
    },
  },
  // 配置插件
  // Artalk 建议在后端控制前端配置, 因此只需要填写后端地址和对应的站点名称.
  addons: [
    addonArtalk({
      server: "https://artalk.backend.com",
      site: "My Blog",
    }),
  ],
});
```

### 主题开发者

当用户启用 `valaxy-addon-artalk` 插件时, `<ArtalkClient />` 组件会被自动注册.

以 `Yun` 主题为例:

```ts
<!-- YunArtalk -->
<script lang="ts" setup>
import * as addonArtalk from 'valaxy-addon-artalk'
import "valaxy-addon-artalk/client/styles/index.scss";
import { isEmptyAddon } from 'valaxy'

if (!isEmptyAddon(addonArtalk))
    addonArtalk.useArtalkWithOptions()
</script>

<template>
    <ArtalkClient />
</template>
```

## 参考

- [Artalk](https://artalk.js.org/)

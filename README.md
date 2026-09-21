# valaxy-addon-artalk

valaxy-addon-artalk 是 [Artalk](https://artalk.js.org/) 的一个 Valaxy 插件.

用户可以使用此插件启用 Artalk 评论系统, 主题开发者可以通过此插件集成对 Artalk 的支持.

- 适配 Valaxy `^1.0.0-rc.0`
- 基于 Artalk `^2.10.0`, 配置项与 Artalk 保持一致 (仅 `server` 与 `site` 必填)

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
      // 其余 Artalk 配置项均可直接传入, 例如:
      // darkMode: "auto",
      // pageKey: "/custom-page-key",
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

`useArtalkWithOptions()` 同样可以省略, 由 `<ArtalkClient />` 组件自行初始化.

同一个挂载点只会创建一个 Artalk 实例: 主题与组件同时初始化 (例如上面的写法) 也不会出现多个评论框.

## 参考

- [Artalk](https://artalk.js.org/)

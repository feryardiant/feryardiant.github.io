---
title: "Utterances Comment"
date: 2024-04-16 03:38:00 +0700
locale: id
comments: true
description: |
  Belum lama inget kalo ada comment system yang basisnya adalah github issues, sekilas sepertinya menarik tapi belum pernah nyobain secara langsing dan kali ini mungkin waktu yang tepat untuk mulai utterances
---
Well, sudah cukup lama gak post di website ini. Mungkin bisa dibilang kalau website ini hampir terlupakan, sampai-sampai beberapa waktu lalu [ada orang yang ngingetin](https://github.com/feryardiant/jpopsuki-style/issues/9) kalo domain ini expired. 😅

Anyway, seperti kalian ketahui bahwa website ini adalah static site yang di serve oleh github pages. Dari awalnya pakai [Jekyll](https://jekyllrb.com/), sempat mau nyobain pakai [eleventy](https://www.11ty.dev/) (tapi gak jadi), dan sekarang pake [vite-ssg](https://github.com/antfu/vite-ssg).

Sejak mulai pakai vite-ssg saya nggak pakai comment system sama sekali, waktu masih di jekyll saya pakai [disqus](https://disqus.com/) tapi gak tau kenapa males aja pake disqus lagi (bukan karena disqus gak bagus, tapi saya aja yang males). Dan belum lama inget kalo ada comment system yang basisnya adalah github issues, sekilas sepertinya menarik tapi belum pernah nyobain secara langsing dan kali ini mungkin waktu yang tepat untuk mulai [utterances](https://utteranc.es/).

### Utterances

Detil nya bisa dibaca langsung di [website official](https://utteranc.es/) nya ya, secara garis besar utterances ini bisa dibilang adalah *layanan* comment system yang bisa di host di github pages dengan github issues sebagai *tempat penyimpanan* utama.

Berbeda dengan comment system pada umumnya, dimana mereka menyimpan semua comment di server mereka sendiri, seperti disqus, utterances ini menyimpan comment di github issues di repository github kita.

### Penggunaan

Untuk dapat menggunakan utterance cukup mudah dan tidak butuh tools apapun, cukup dengan menambahkan script berikut pada halaman yang ingin disediakan comment.

```html
<script src="https://utteranc.es/client.js"
        repo="[ENTER REPO HERE]"
        issue-term="pathname"
        theme="github-light"
        crossorigin="anonymous"
        async>
</script>
```

Hmmm, muncul pertanyaan **"Gimana caranya embed script tag di vue template?"**. Isenglah coba cari-cari siapa tau udah ada yang bikin integrasi untuk vue.js. Ketemu lah [`vue-utterance`](https://github.com/khalby786/vue-utterances/), tapi bentar.. sepertinya belum support vue 3 dan project itu sepertinya udah lama juga gak di maintain.

Well, sepertinya gak ada pilihan lain selain bikin [vue component sendiri](https://github.com/feryardiant/feryardiant.github.io/blob/27cc46bf0a9e484cad7ec7d4a59eb00c52d1fe1f/src/components/utterances.vue), ya gak? 😅

```vue
<script setup lang="ts">
const $utterances = ref<HTMLDivElement>()

onMounted(() => {
  const utterances = document.createElement('script')

  utterances.src = 'https://utteranc.es/client.js'
  utterances.async = true
  utterances.setAttribute('repo', 'feryardiant/feryardiant.github.io')
  utterances.setAttribute('issue-term', 'pathname')
  utterances.setAttribute('theme', 'github-light')
  utterances.setAttribute('crossorigin', 'anonymous')
  utterances.setAttribute('label', 'comment')

  $utterances.value?.appendChild(utterances)
})
</script>

<template>
  <div id="utterance" ref="$utterances" />
</template>
```
Ok, component siap, tinggal load di [halaman](https://github.com/feryardiant/feryardiant.github.io/blob/27cc46bf0a9e484cad7ec7d4a59eb00c52d1fe1f/src/components/page.vue) yang butuh comment.

```vue
<template>
  <!-- page content -->

  <Utterances />
</template>
```

Easy pizzy! Tapi, bentar! Kan gak semua halaman butuh comment, kan ya? Dan gimana kalo utterances cuma enabled ketika website di build di github pages saja?

```vue
<script setup lang="ts">
const allowComments = computed(() => import.meta.env.PROD && frontmatter.comments)
</script>

<template>
  <!-- page content -->

  <Utterances v-if="allowComments" />
</template>
```

All set! selanjutnya tinggal menambahkan `comments: true` di metadata halaman yang ingin diberikan comment.

```md
---
title: "Utterances Comment"
comments: true
---
```

Dan hasilnya bisa dilihat di bawah.

Cheers! 🥂
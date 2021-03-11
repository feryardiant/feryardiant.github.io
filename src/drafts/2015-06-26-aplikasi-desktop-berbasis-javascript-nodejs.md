---
title: "Aplikasi Desktop berbasis Javascript?"
date: 2015-06-26 11:58:22 +0700
tags: [Learning, NodeJS, Desktop App]
---
Dapet tawaran untuk bikin aplikasi berbasis desktop itu rasanya seperti _CLBK (Coding Lama Bersemi Kembali)_, hahaha. Ya! karena bahasa pemrograman yang pertama kali saya pelajari skitar tahun 2008 adalah Delphi. Walaupun waktu itu masih sekedar belajar dan belum pernah sampai tahap *real project*, tapi setidaknya saya ada cukup bekal untuk belajar bahasa pemrograman lain.

Karna suatu alasan, sekitar akhir tahun 2012 saya memutuskan untuk __"hijrah"__ ke PHP (web based). Mungkin salah satu alasannya adalah karena web based dapat berjalan lintas platform (Windows, OSX & Linux) asalkan ada web browser, ya kan?.

Belum lama ini ada salah seorang teman kuliah yang nawarin untuk join bikin suatu aplikasi semacam inventory & stock manager lengkap dengan penjualannya. Woh! tentu excited banget lah, kapan lagi bisa dapet kesempatan kayak gini. Setelah ngobrol bin obrol, barulah disebutkan kalo yang dia butuhin itu native desktop app bukan web app. Wuaduh! gimana nih, udah lama banget gak pegang Delphi. :sweat_smile:

Nah, dari situ saya kepikiran untuk pake Javascript (NodeJS) dan saya mulai cari mencari resource atau tutorial yang bisa saya pakai untuk pondasi. Karna denger-denger nih, ada beberapa library NodeJS yang bisa compile Javascript Web App ke Desktop App. Saya sendiri belum banyak pengalaman dengan NodeJS, selama ini pakai hanya sekedar untuk task runner ([Grunt](https://gruntjs.com) & [Gulp](https://gulpjs.com)) saja dan belum pernah sampai bikin aplikasi.

Berikut ini beberapa [SDK](https://en.wikipedia.org/wiki/Software_development_kit) yang _mungkin_ bisa saya pakai.

 + [NW.JS (Node-Webkit)](https://nwjs.io/)

    {% image nw-js.png class="image" %}

    > NW.js lets you call all Node.js modules directly from DOM and enables a new way of writing applications with all Web technologies.

 + [Electron (Atom-Shell)](electron.atom.io)

    {% image electron.png class="image" %}

    > With Electron, creating a desktop application for your company or idea is easy.

 + [TideSDK](https://www.tidesdk.org)

    {% image tidesdk.png class="image" %}

    > TideSDK is the new standard for creating beautiful and unique desktop apps using your web development skills.

 + [AppJS](https://appjs.com)

    > Using AppJS you don't need to be worry about coding cross-platform or learning new languages and tools. You are already familiar with HTML, CSS and Javascript.

 + [more](https://www.google.co.id/search?q=javascript+desktop+app)

ini mungkin hanya sebagian kecil dari apa ada dan yang saya temukan setelah beberapa hari _duckduckgo_-ing (baca googling). Dari daftar diatas memang belum saya cobain satu-persatu sih, tapi setidaknya dapat beberapa ide dan saya simpulkan.

NW.js atau lebih dikenal dgn Node-Webkit adalah yang paling banyak paling banyak direkomendasikan. Selanjutkan adalah Electron yang sebelumnya dikenal dengan Atom-shell, ini yang menarik karena ternyata Microsoft juga pakai Electron sebagai pondasi dari [Microsoft Visual Studio Code](https://code.visualstudio.com) yang belum lama ini mereka rilis. Untuk TideSDK ini cukup unik, disaat yang lain pada pake NodeJS sebagai landasan. TideSDK sepertinya punya framework sendiri, bahkan saya juga bisa pake PHP sebagai backend dari aplikasi yang akan anda buat. Wohoho, _seems legit_ to?. Nah yang terakhir adalah AppJS, untuk yang satu ini saya belum berani berkomentar karna belum saya coba. hehehe.. _mungkin next time lah_ :wink:

Dari beberapa yang sudah saya coba dapat saya tarik kesimpulan bahwa, walaupun bahasa yang digunakan sama yaitu Javascript, saya tetap butuh penyesuaian lagi karena target saya adalah desktop dan desktop itu macem-macem dan yang macem-macem itu capek :sweat: _nggak juga sih sebenernya, mungkin saya terlalu males aja_ :sweat_smile:

### Web to Desktop?

Sampailah pada 2 hari yang lalu ketika ada orang yang posting disalah satu fb grub soal [Whatsapp Desktop](https://whatsapp-desktop.com/). Awal nya gak terlalu tertarik sih tapi entah kenapa kepikiran _"Desktop? palingan [NodeJS](/tags/nodejs.html) juga, tapi kira-kira apa yang dipake??"_. Dan ternyata mereka pakai [NW.js](https://github.com/Aluxian/WhatsApp-Desktop/blob/master/package.json#L17) dan bukan full desktop app karna hanya pake [`iframe`](https://github.com/Aluxian/WhatsApp-Desktop/blob/master/src/app.html#L9) yang memuat full official [Whatsapp Web](https://web.whatsapp.com). __Boom!__


---
layout: post
title: Bikin dokument viewer menggunakan sendiri PDF.JS dan WebODF
date: 2014-01-16 15:58:03 +0700
comments: true
thumb:
tags: [Playgrounds, Document Viewer]
excerpt:
  'Berhadapan dengan project yang dituntut untuk dapat menampilkan berbagai macam dokumen membuat saya penasaran dan berkeinginan untuk membuat semacam Document Viewer sendiri, karena sebelumnya saya slalu menggunakan dan mengkombinasikan source program buatan orang lain. Terutama untuk dokumen teks seperti: .PDF, .ODT, .ODS, .DOC dsb.'
---
Berhadapan dengan project yang dituntut untuk dapat menampilkan berbagai macam dokumen membuat saya penasaran dan berkeinginan untuk membuat semacam Document Viewer sendiri, karena sebelumnya saya slalu menggunakan dan mengkombinasikan source program buatan orang lain. Terutama untuk dokumen teks seperti: .PDF, .ODT, .ODS, .DOC dsb.

Walau begitu saya masih belum banyak pengalaman untuk menangani jenis dokumen-dokumen tersebut. Berdasarkan hasil googling, cukup banyak yang merekomendasikan [Viewer.JS](viewerjs.org). Kelihatannya cukup menjanjikan, dimana Viewer.js menkombinasikan beberapa tool open-source sebagai basisnya seperti [Mozilla PDF.JS](http://mozilla.github.io/pdf.js) dan [WebODF](http://webodf.org).<!-- more -->

> Viewer.js is a combination of a number of excellent open source tools that are built on HTML and JavaScript.

Rasa penasaran bertambah saat saya mencoba [SOLO](www.getsoloapp.com), sebuah aplikasi Project Management gratisan yang cukup bisa diandalkan untuk membantu mengelola project pribadi (menurut saya) terutama buat freelancer seperti saya, hehehe :). Solo memiliki menejemen dokumen yang baik, mengingat sebuah pada aplikasi Project Management harus dapat melakukan hal tersebut. Solo juga menggunakan beberapa open-source project untuk menampilkan bahkan mengelola file-file disetiap project nya. Seperti PDF.JS, FlowPlayer, JPlayer dll.

Nah, dari rasa penasaran diatas, munculah ide untuk membuat sendiri librari untuk meng-handle berbagai macam dokumen. Beberapa librari yang rencananya akan saya gunakan adalah


  1. Mozilla PDF.JS (Untuk dokumen PDF tentunya)
  2. WebODF (Untuk Open Document Format, seperti .ODT, .ODS, .ODP)

_Note: Sementara baru 2 resource itu yang rencanannya akan saya gunakan untuk pengembangan librari ini. Ada saran?_

### PDF.JS

Oke, saya mulai dari PDF.JS. Pertama kali saya coba menggunakan [Twitter Bower](http://bower), niatnya sih biar Source lebih gampang ngatur repo nya. Tapi nggak tau kenapa, pas compiling build status nya error terus. Berikut hasil compilenya.

{% highlight javascript %}
PDFJS.version = '0.8.2';
PDFJS.build = 'fatal: Not a git repository (or any parent up to mount point /home)Stopping at filesystem boundary (GIT_DISCOVERY_ACROSS_FILESYSTEM not set).';
{% endhighlight %}

Well, dari situ kemungkinan si PDF.JS butuh source dari git repo nya. Jadi saya coba dengan clone langsung dari official repo nya yang ada di github.

{% highlight bash %}
# cloning repo
$ git clone git@github.com/mozilla/pdf.js.git pdfjs
# masuk ke direktorynya
$ cd pdfjs
# compile source code
$ node make generic
{% endhighlight %}

Dan hasilnya,

{% highlight javascript %}
PDFJS.version = '0.8.872';
PDFJS.build = 'ab4f27b';
{% endhighlight %}

Oke, compiling nya udah selesai dan setelah dicoba, kelihatannya nggak ada masalah. Misi selanjutnya adalah ngutak-atik source code nya dan disesuaiin dengan kebutuhan saya.

### WebODF

Mengingat PDF.JS dari Bower yang error saat compiling, jadi untuk WebODF saya langsung saja dengan cloning git repo nya. [Let's get started](http://webodf.org/start/)

> webodf.js is compiled by using the [closure compiler](http://webodf.org/tools/index.html#compiler). This compiler compacts all JavaScript files, so that they are smaller and execute faster.[CMake](http://webodf.org/tools/index.html#cmake) is used to setup the buildsystem, so webodf.js can be created:

Ini adalah kali kedua, saya menemui aplikasi berbasis javascript yang harus dicompile menggunakan C Compiler setelah Node.JS. Oke, mulailah saya coba untuk compile dengan perintah.

{% highlight bash %}
$ make webodf.js-target
{% endhighlight %}

Setelah baca2 sedikit dokumentasi nya, ternyata WebODF ini tidak hanya membutuhkan Closure Compiler sebagai dependensinya, ada beberapa dependensi lain yang dia butuhkan termasuk Node.JS. Meski begitu yang cukup mengherankan adalah kenapa dia tidak bisa mendeteksi installasi Node.JS yang ada di sistem? melainkan mendownload source codenya secara manual dan dilanjutkan dengan compile.

Walaupun proses download dan compile dependensinya dilakukan secara otomatis saat menjalankan perintah `make webodf.js-target` diatas, tapi saya rasa ini sangat mengganggu dan tidak relefan terlebih saat kita sudah memastikan bahwa semua dependensi yang dibutuhkan sudah tersedia didalam sistem. Tapi biar bagaimanapun semua adalah kebijakan dari masing-masing developer, andai saya bisa pasti saya akan turut berkontribusi (mungkin suatu saat).

Setelah semua proses compile selesai, semua berjalan sesuai dengan yang diharapkan. Beberapa fase percobaan dilakukan dan belum mengalami kendala apapun. Ya mau gimana lagi, itu kan masih asli source dari developernya dan belum saya utak-atik sedikit pun hehehe.

Oke, dari sini saya akan berusaha untuk mempelajari setiap detil dari librari diatas dan mencoba untuk menghadirkan sebuah librari buatan sendiri yang terinspirasi dari Solo App dan Viewer.js. Terima kasih telah berkunjung.

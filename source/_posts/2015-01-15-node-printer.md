---
layout: post
title: "Direct Print menggunakan Node.JS"
date: 2015-01-15 15:00:39 +0700
comments: true
thumb: node-printer.png
tags: [Workarounds, NodeJs, Print]
---
Hari ini saya tertarik untuk mencoba melakukan direct print menggunakan Node.JS. Setelah googling dan nyari di npmjs.org beberapa saat, ketemulah node-printer

> This package binds printers on POSIX and Windows OS from Node.js
 — [node-printer desc](https://www.npmjs.com/package/printer)

Hmmm, seem legit. Mari kita coba.

### 1. Buat project directory dan install package tersebut

{% highlight bash %}
$ mkdir node-printer
$ cd node-printer
$ npm install printer
{% endhighlight %}

Catatan: Jika anda menggunakan Ubuntu (atau distro linux lain) pastikan anda sudah menginstall `libcups2-dev` dalam sistem, jika tidak maka beginilah hasilnya

{% highlight bash %}
$ npm install printer
info attempt registry request try #1 at 09:56:27
http request GET https://registry.npmjs.org/printer
http 304 https://registry.npmjs.org/printer

> printer@0.0.2 install /path/to/node-printer/node_modules/printer
> node-gyp rebuild

/bin/sh: 1: cups-config: not found
gyp: Call to 'cups-config –libs' returned exit status 127. while trying to load binding.gyp
gyp ERR! configure error
…
{% endhighlight %}

### 2. Buat file baru dengan nama terserah, misal `print.js`

{% highlight bash %}
$ touch print.js
{% endhighlight %}

### 3. Buka file tersebut dengan editor kesayangan anda dan paste code berikut untuk melihat daftar printer yang tersedia

{% highlight javascript %}
var printer = require('printer')
console.log(printer.getPrinters())
{% endhighlight %}

setelah itu buka terminal/cmd dan jalankan dengan perintah

{% highlight bash %}
$ node print.js
{% endhighlight %}

Wait! error?

{% highlight bash %}
$ node print.js
node: symbol lookup error: /path/to/node-printer/node_modules/printer/build/Release/node_printer.
node: undefined symbol: cupsGetDests
{% endhighlight %}

Oh! ternyata memang masih ada bug untuk versi ini (0.0.2) semoga lekas diperbaiki, solusinya adalah rebuild manual package ini. Ribet ye.. :sweat_smile:

### 4. Jalankan lagi perintah `node print.js`

{% highlight bash %}
$ node print.js
[ { name: 'Generic-CUPS-PDF-Printer',
isDefault: true,
options:
{ copies: '1',
'device-uri': 'cups-pdf:/',
finishings: '3',
'job-hold-until': 'no-hold',
'job-priority': '50',
'job-sheets': 'none,none',
'marker-change-time': '0',
'number-up': '1',
'ppd-timestamp': '*',
'printer-commands': 'AutoConfigure,Clean,PrintSelfTestPage',
'printer-info': 'Generic CUPS-PDF Printer',
'printer-is-accepting-jobs': 'true',
'printer-is-colormanaged': 'true',
'printer-make-and-model': 'Generic CUPS-PDF Printer',
'printer-state': '3',
'printer-state-change-time': '1414049132',
'printer-state-reasons': 'none',
'printer-type': '8581196',
'printer-uri-supported': 'ipp://localhost:631/printers/Generic-CUPS-PDF-Printer' },
status: 'IDLE' } ]
{% endhighlight %}

nah! diketahui bahwa saya menggunakan Generic-CUPS-PDF-Printer sebagai default printer, jaaaaaaaadi…

### 5. Mari kita langsung nyobain untuk printing menggunakan code berikut:

{% highlight javascript %}
var printer = require('printer')

printer.printDirect({
    data: 'Test print using node-printer',
    printer: printerName,
    type: 'TEXT',
    success: function (jobID) {
        console.log('Sent to printer with ID: ' + jobID)
    },
    error: function (err) {
        console.log(err)
    }
})
{% endhighlight %}

Sekarang jalankan lagi perintah dibawah

{% highlight bash %}
$ node print.js
{% endhighlight %}

### 6. Perhatikan print job yang ada di statusbar atau system tray anda, apakah berjalan dengan baik?

Semoga bermanfaat :smile:
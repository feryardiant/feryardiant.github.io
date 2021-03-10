---
layout: post
title: SQL Query untuk nampilin data/baris sebagai field/kolom
date: 2012-11-13 14:29:41 +0700
comments: true
thumb:
tags: [Playgrounds, Workarounds, MySQL, Query]
excerpt:
  'Beberapa hari lalu qu sempet bingung, bijimana Query SQL nya nampilin Data/Rows sebagai Field/Kolom. Mungkin konsepnya hampir sama dengan struktur database di Wordpress.'
---
Beberapa hari lalu qu sempet bingung, bijimana Query SQL nya nampilin Data/Rows sebagai Field/Kolom. Mungkin konsepnya hampir sama dengan struktur database di Wordpress.

### Case

qu ada 2 buah tabel,

#### tabel 1 (user)

	uid | nama_lengkap | username | password
	--------------------------------------------
	1   | Fery W       | admin    | admin
	2   | Minato       | minato   | minato

#### tabel 2 (user_desc)

	udid | uid | key          | value
	------------------------------------------
	1    | 1   | alamat       | Pekalongan
	2    | 1   | telp         | 08756382927
	3    | 1   | keterangan   | -
	4    | 2   | alamat       | Konoha Gakure
	5    | 2   | telp         | 08575648274
	6    | 2   | keterangan   | -

#### nah, gimana caranya biar jadi kaya' gini

	uid | nama_lengkap | username | password | alamat         | telp        | keterangan
	--------------------------------------------------------------------------------------
	1   | Fery W       | admin    | admin    | Pekalongan     | 08756382927 | -
	2   | Minato       | minato   | minato   | Konoha Gakure  | 08575648274 | -

### Solution

Nah dari situ qu mulai tanya di forum & alhamdulillah dapet jawaban memuaskan ;)<!-- more -->

Salah satunya menggunakan [CASE](http://dev.mysql.com/doc/refman/5.0/en/case.html)

{% highlight sql %}
SELECT `nama_lengkap`, `username`, `password`,
	CASE WHEN `key` = "alamat" THEN `value` END AS alamat ,
	CASE WHEN `key` = "telp" THEN `value` END AS telp,
	CASE WHEN `key` = "keterangan" THEN `value` END AS keterangan
FROM USER JOIN user_desc
ON USER.uid = user_desc.uid
GROUP BY user_desc.uid
{% endhighlight %}

dari query tersebut, akan dihasilkan :

	 uid | nama_lengkap | username | password | alamat         | telp        | keterangan
	---------------------------------------------------------------------------------------
	 1   | Fery W       | admin    | admin    | Pekalongan     | 08756382927 | [NULL]
	 2   | Minato       | minato   | minato   | Konoha Gakure  | 08575648274 | [NULL]

sayangnya pada field terakhir akan selalu bernilai NULL, untuk nanggulangin hal itu bisa pake cara kedua yaitu menggunakan [function GROUP_CONCAT()](http://dev.mysql.com/doc/refman/5.0/en/group-by-functions.html#function_group-concat)

{% highlight sql %}
SELECT `nama_lengkap`, `username`, `password`,
	GROUP_CONCAT(CASE WHEN `key` = "alamat" THEN `value` END, ',') AS alamat ,
	GROUP_CONCAT(CASE WHEN `key` = "telp" THEN `value` END) AS telp,
	GROUP_CONCAT(CASE WHEN `key` = "keterangan" THEN `value` END, ',') AS keterangan
FROM USER JOIN user_desc
ON USER.uid = user_desc.uid
GROUP BY user_desc.uid
{% endhighlight %}

Menggunakan [GROUP_CONCAT()](http://dev.mysql.com/doc/refman/5.0/en/group-by-functions.html#function_group-concat) ini lumayan, dah seperti yang diharapkan, query nya sudah gak menampakkan lagi hasil NULL value, tapi jelek nya jadi ada tanda koma sebagai pemisah, ini kita hapus aja dulu pake [REPLACE](http://dev.mysql.com/doc/refman/5.1/en/replace.html), seperti ini:

{% highlight sql %}
SELECT `nama_lengkap`, `username`, `password`,
	REPLACE(GROUP_CONCAT(CASE WHEN `key` = "alamat" THEN `value` END, ',') , ',', '') AS alamat ,
	REPLACE(GROUP_CONCAT(CASE WHEN `key` = "telp" THEN `value` END), ',', '') AS telp,
	REPLACE(GROUP_CONCAT(CASE WHEN `key` = "keterangan" THEN `value` END, ','), ',', '') AS keterangan
FROM USER JOIN user_desc
ON USER.uid = user_desc.uid
GROUP BY user_desc.uid
{% endhighlight %}

Hasilnya sudah seperti yang di harapkan ;)

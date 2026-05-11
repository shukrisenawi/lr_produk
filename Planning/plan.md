# Pelan Laravel + React Aurora Terapi

## Ringkasan
Bina projek baru Laravel + React menggunakan Inertia, React starter kit rasmi Laravel, dan UI berasaskan `Planning/copywriting.md`, `Planning/gambar/design.md`, serta imej dalam `Planning/gambar`. Aliran dipilih: landing page public, customer daftar ringkas di checkout menggunakan WhatsApp + password, pilih wangian dan bilangan, sistem papar bank MAYBANK, customer upload resit, admin approve bayaran, kemudian invoice tersedia.

Rujukan teknikal utama: [Laravel Installation](https://laravel.com/docs/13.x/installation) dan [Laravel React Starter Kit](https://laravel.com/docs/13.x/starter-kits).

## Perubahan Utama
- Scaffold Laravel dalam folder projek semasa secara selamat kerana folder sekarang hanya ada `Planning/` dan belum ada Git repo. Jika Laravel installer tidak wujud, pasang dengan `composer global require laravel/installer`.
- Guna React starter kit Laravel dengan Inertia, React, TypeScript, Tailwind, dan shadcn/ui. Untuk bantu model rendah, pasang Laravel Boost selepas app siap scaffold: `composer require laravel/boost --dev` dan `php artisan boost:install`.
- Salin imej produk ke `public/images/aurora/` dengan nama fail bersih seperti `hero.png`, `kelebihan.png`, `bidara.png`, `harga.png`, dan kekalkan folder `Planning/` sebagai rujukan.
- Ikut design token `Airbnb`: warna `#222222`, `#717171`, `#FF385C`, `#F7F7F7`, Inter, layout photography-first, tiada gradient, satu CTA coral utama per skrin.
- UI Bahasa Melayu sepenuhnya, copywriting ambil terus daripada `Planning/copywriting.md` dan kekalkan nada berhati-hati tanpa claim perubatan melampau.

## Sistem Dan Data
- Auth customer: `name`, `phone` unik, `password`; login guna nombor WhatsApp. `email` tidak wajib. User ada `role`: `customer` atau `admin`.
- Produk tetap: Bidara, Kayu Putih, Lemon, Serai Wangi. Bidara ditanda `is_best_seller`.
- Pricing auto-jimat berdasarkan jumlah semua botol:
  - setiap 10 botol = RM80
  - setiap baki 5 botol = RM45
  - baki 1 botol = RM10 setiap satu
  - caj pos tetap = RM8
  - total = subtotal + RM8
- Model utama: `ProductVariant`, `Order`, `OrderItem`, `PaymentReceipt`, `Invoice`.
- Status order: `awaiting_payment`, `payment_submitted`, `paid`, `payment_rejected`, `cancelled`.
- Bank penjual dipaparkan selepas order dibuat: MAYBANK, `155015073618`, `MOHAMAD SHUKRI BIN SENAWI`, WhatsApp `019-5168839`.

## Flow Customer Dan Admin
- Landing page: hero, masalah pelanggan, kelebihan, sesuai untuk siapa, kegunaan, pilihan wangian, cara guna, harga, wanita berpantang, trust, CTA akhir.
- Checkout ringkas: customer pilih kuantiti setiap wangian, lihat kiraan harga live, isi nama, WhatsApp, password, alamat penghantaran, kemudian submit.
- Selepas submit, order terus wujud sebagai `awaiting_payment`; ini membolehkan admin trace customer yang sudah isi form tetapi belum bayar.
- Halaman bayaran customer papar total, bank detail, butang WhatsApp penjual, dan upload resit. Resit terima `jpg`, `png`, `webp`, atau `pdf`, maksimum 5MB.
- Dashboard customer papar status order, resit yang dihantar, dan invoice hanya selepas status `paid`.
- Admin dashboard papar ringkasan order belum bayar, resit menunggu semakan, paid, dan rejected. Admin boleh klik WhatsApp follow-up dengan mesej siap isi, lihat resit, approve, reject dengan nota, atau cancel order.
- Bila admin approve, sistem jana invoice number seperti `AT-YYYYMM-0001`, simpan invoice, dan customer boleh lihat/print invoice HTML.

## Test Plan
- Feature test auth: customer boleh daftar/login guna WhatsApp + password; admin route ditolak untuk customer biasa.
- Feature test pricing: 1 botol RM10 + RM8, 5 botol RM45 + RM8, 10 botol RM80 + RM8, 16 botol RM135 + RM8.
- Feature test order: checkout mencipta order `awaiting_payment`; upload resit tukar kepada `payment_submitted`; admin approve tukar kepada `paid` dan jana invoice.
- Feature test admin trace: order tanpa resit muncul dalam senarai follow-up belum bayar.
- Frontend check: semua section landing render dengan imej betul, mobile tidak overlap, CTA coral tidak lebih daripada satu action utama per skrin.
- Sebelum commit untuk Laravel, wajib run `php artisan test` dan `npm run build`. Selepas lulus, commit mesej Bahasa Melayu dan push ke `origin` branch semasa jika Git remote tersedia.

## Andaian
- Folder semasa belum Git repo; pelaksana perlu `git status` dahulu. Jika `.git`/`origin` tiada, jangan reka remote sendiri; buat kerja aplikasi, commit hanya selepas Git dikonfigurasi, dan laporkan isu push dalam Bahasa Melayu.
- Tiada integrasi payment gateway untuk MVP; bayaran manual melalui upload resit sahaja.
- Invoice MVP ialah halaman HTML boleh print, bukan PDF automatik.
- Caj pos tetap dikunci kepada RM8.

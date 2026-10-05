# WebAR Interferensi Gelombang Kuantum

Prototipe ini mengubah kegiatan LKPD menjadi eksperimen AR berbasis browser.

## Fitur
- Marker-based WebAR menggunakan Hiro Marker.
- Model 3D sederhana: sumber → penghalang dua celah → layar detektor.
- Slider panjang gelombang (λ).
- Slider jarak antarslit (d).
- Slider jarak slit–layar (L).
- Mode dua celah / satu celah.
- Mode Intensity / Hits.
- Akumulasi deteksi partikel satu per satu.
- Tombol sumber ON/OFF, reset, dan layar penuh.

## Cara menjalankan
1. Ekstrak folder ini.
2. Upload ke hosting HTTPS, misalnya GitHub Pages, Netlify, Vercel, atau hosting sekolah.
3. Buka `index.html` melalui alamat HTTPS di HP.
4. Izinkan kamera.
5. Arahkan kamera ke Hiro Marker.

WebAR menggunakan A-Frame dan AR.js melalui CDN. AR.js mendokumentasikan marker-based AR dengan preset `hiro`, dan proyek AR.js menyebut marker-based WebAR dapat dijalankan dengan A-Frame + AR.js pada server. 

## Hiro Marker
Gunakan Hiro Marker resmi AR.js:
https://raw.githubusercontent.com/AR-js-org/AR.js/master/data/images/hiro.png

Cetak marker dengan ukuran sekitar 10–15 cm. Jangan memotong border hitamnya.

## Integrasi ke LKPD
Tambahkan halaman:
"MARKER AR – INTERFERENSI GELOMBANG KUANTUM"
dan letakkan Hiro Marker di tengah halaman.

## Catatan
Prototipe ini adalah media pembelajaran konseptual. Nilai numerik pola interferensi dibuat ter-normalisasi untuk visualisasi interaktif, bukan sebagai alat ukur laboratorium presisi.

Sumber teknis:
- AR.js: https://github.com/AR-js-org/AR.js/
- Dokumentasi marker-based AR.js: https://ar-js-org.github.io/AR.js-Docs/marker-based/

# Melike & Batuhan ❤️ Özel Web Uygulaması

Bu proje Melike ve Batuhan için özel olarak geliştirilmiş romantik çift portalıdır.

## 🚀 Kurulum ve Çalıştırma (Lokal)

1. Gerekli bağımlılıkları yükleyin:
```bash
npm install
```

2. Geliştirme sunucusunu başlatın:
```bash
npm run dev
```

3. Üretim (Production / Sunucu) için derleme:
```bash
npm run build
```
Bu komut `dist/` klasörü içinde statik HTML/CSS/JS dosyaları üretecektir.

## 🌐 Sunucuya Yükleme (Hosting)

### 1. Vercel veya Netlify (En Kolay & Ücretsiz)
- Projeyi bir GitHub reposuna yükleyin veya `dist` klasörünü Netlify / Vercel paneline sürükleyip bırakın.
- Build command: `npm run build`
- Output directory: `dist`

### 2. Kendi Linux Sunucunuz (Nginx / Apache / cPanel)
- `npm run build` komutunu çalıştırın.
- Oluşan `dist` klasörünün içindeki tüm dosyaları sunucunuzun `public_html` veya `/var/www/html` dizinine yükleyin.

## 🔑 Varsayılan Giriş Bilgileri
- **Melike Girişi:** Şifre: `melike123`
- **Batuhan (Yönetici) Girişi:** Şifre: `batuhan123`
- **Ortak Acil Şifre:** `aşkımız`
*(Batuhan yönetim panelinden tüm şifreleri ve içerikleri değiştirebilir.)*

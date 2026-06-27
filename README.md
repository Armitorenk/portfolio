# Armağan Aydoğan — Portfolio

Kişisel portfolyo / interaktif özgeçmiş. **Web · Mobil · Yapay Zekâ.**

İki dilli (TR / EN), açık & koyu tema, `⌘K` komut paleti, CV indirme, çalışan
iletişim formu, canlı GitHub istatistikleri ve gece modunda gizli easter egg'ler.
Renkler CV'den esinlenen **teal** paletten geliyor.

## Stack

- **Vite** + **React 18** + **TypeScript**
- **Tailwind CSS** (`darkMode: "class"`, teal tasarım token'ları)
- **Framer Motion** (scroll reveal, rotating hero, skill çubukları, easter egg'ler)
- **lucide-react** (ikonlar)
- Fonts: Space Grotesk (başlık), Inter (gövde), JetBrains Mono (mono)

## Geliştirme

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # tsc + vite build → dist/
npm run preview  # üretim çıktısını önizle
```

## İçeriği düzenlemek (işlerini buradan ekle)

Tüm metin ve veri tek dosyada, iki dilli: [`src/data/content.ts`](src/data/content.ts).

- **Yeni iş/proje eklemek:** `projects` dizisine bir nesne ekle (id, title, kind,
  summary {tr,en}, tags, opsiyonel `github` / `site`, `featured: true` ile büyük kart).
- **Yetenek & seviye:** `skills` içindeki gruplara `{ name, level }` ekle/çıkar
  (`level` 0–100 arası, çubuğun dolma oranı).
- **Ne Yaparım kartları:** `services` dizisi (icon adı lucide'dan).
- **Deneyim / ödül / eğitim / dil:** ilgili diziler.
- **İletişim bilgileri:** `profile` (e-posta, GitHub, LinkedIn, konum).

## Çalışan iletişim formu (Web3Forms)

Form gerçekten e-posta gönderir; sadece ücretsiz bir anahtar gerekir:

1. https://web3forms.com adresine git → e-postanı gir → anahtarın e-posta ile gelir.
2. Anahtarı [`src/lib/config.ts`](src/lib/config.ts) içindeki `WEB3FORMS_ACCESS_KEY`
   değişkenine yapıştır.

Anahtar boşken form, ziyaretçinin e-posta uygulamasını açar (mailto) — yani yine çalışır.

## CV

İndirilen dosya: `public/Armagan-Aydogan-CV.pdf`. Güncellemek için bu dosyayı değiştir
(aynı isimle) ya da `src/lib/config.ts → CV_PATH` yolunu düzenle.

## GitHub bölümü

Repo/takipçi sayıları `github.com/Armitorenk`'ten **canlı** çekilir; katkı grafiği
ghchart ile gösterilir. Kullanıcıyı değiştirmek: `src/lib/config.ts → GITHUB_USER`.

## Gece modu easter egg'leri

Koyu moda her geçişte ~**1/20** ihtimalle arka planda kısa, komik bir şey beliriyor
(kayan yıldız, UFO, kedi, hayalet, roket, masa devirme…). Toplamak için temayı
açıp kapamaya devam et. Kod: [`src/components/EasterEggs.tsx`](src/components/EasterEggs.tsx).

## Deploy

Statik site — `npm run build` çıktısı `dist/`. Vercel / Netlify / GitHub Pages:
build komutu `npm run build`, output dizini `dist`.

---

© Armağan Aydoğan

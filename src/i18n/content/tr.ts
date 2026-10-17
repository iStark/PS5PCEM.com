import type { Content } from "./en";

const tr: Content = {
  games: {
    "astro-bot": {
      "status": "Tanılama ara sahnesi · işleme kusurları",
      "headline": "İşleme ve performans çalışmaları sürüyor",
      "summary": "16 Ekim: ortak kaynak hazırlığı daha az kopya, daha hızlı içerik denetimi ve daha kısa skaler taramalar kullanıyor. PPSA21564 v1.018 için yeni bir başlık ekranı ölçümü var; ara sahne işleme kusurları sürüyor.",
      "strengths": [
        "Ortak komut kuyrukları ve yerel aktarım yolları hedefli birim ve GPU denetimlerinden geçiyor.",
      ],
      "limits": [
        "Eksik kaynak yazı tipleri, karanlık/lekeli yüzeyler ve pahalı geri okumalar sürüyor. Karakter kontrolü ve oyunun bitirilmesi doğrulanmadı.",
      ],
      "performance": "Hareketli başlık ekranı: 2.640 kare / 131,56 sn'de 20,07 FPS; 60 karelik bloklar 18,39–21,68 FPS. Ryzen 7 7700 / RTX 3070 Ti, 1080p çıkış, oyunun belirlediği 4K kaynak, önbellekler korundu. Bu bir başlık ekranı ortalamasıdır; en düşük değer veya oynanış sonucu değildir. Önceki kalabalık sahne ölçümü 10 sn'de 4,60 FPS idi.",
      "imageAlt": "Küçük araç ve düşmüş gemiyle ASTRO BOT varış ara sahnesi; karanlık ve lekeli yüzeyler sürüyor",
    },
    "goat-simulator-3": {
      "status": "Oyun içi · ters görüntü · düşük FPS",
      "headline": "Kontrol edilebilir çiftlik sahnesine ulaşıldı",
      "summary": "PPSA04158 v01.000.000: Eksiksiz oyun dosyalarıyla mevcut geliştirme çalıştırıcısı uzun dünya yüklemesini ve araba girişini geçiyor. Keçi, pusula ve Goat Castle hedefi görünüyor; klavyeyle hareket doğrulandı.",
      "strengths": [
        "Çevrimdışı menü gezintisi, yeni dünya oluşturma ve hareket çalışıyor. Boş olmayan kayıt dosyaları yazılıyor; duraklatma ve ifade çarkı yanıt veriyor.",
      ],
      "limits": [
        "Duraklatma kapatıldıktan sonra sahne ve HUD dikey olarak ters kalıyor; menü geçişleri alt kareleri tekrarlıyor. Gölgelendirme bozuklukları, desteklenmeyen 3B depolama görüntüleri ve çözülmemiş bağlamalar sürüyor. Ses kalitesi, kaydın yeniden yüklenmesi, çok oyunculu mod ve oyunun bitirilmesi doğrulanmadı.",
      ],
      "performance": "Medyan 1,8 FPS (1,7–1,8), 30,011 saniyede 30 sabit pencere sayacı örneği. RTX 3070 Ti, 1080p çıkış, 3200×1800'e kadar iç hedefler, Hız ön ayarı; önbellekler korundu.",
      "imageAlt": "Keçi, pusula ve hedefin ters çizildiği kontrol edilebilir Goat Simulator 3 çiftlik sahnesi",
    },
    "minecraft-legends": {
      "status": "Oyun içi · ağır işleme kusurları",
      "headline": "Açılış eğitimine ulaşıldı; hareket doğrulandı",
      "summary": "PPSA05510 v01.013.000: Yerel dosya yeniden adlandırma kampanya veritabanının önünü açıyor. Yeni bir geliştirme sürümü çalıştırması atlı kahramana, can kalplerine ve eğitime ulaşıyor. Klavyeyle hareket ve dönme çalışıyor.",
      "strengths": [
        "Ana menü, kampanya oluşturma ve ilk kontrol edilebilir eğitim sahnesi doğrulandı.",
      ],
      "limits": [
        "Ağır renk ve aydınlatma bozulması, büyük siyah alanlar ve eksik metin sürüyor. Açılışta görüntü okuma hataları da günlüğe düşüyor. Kaydın yeniden yüklenmesi, duyulan ses kalitesi ve oyunun bitirilmesi doğrulanmadı.",
      ],
      "performance": "Bu görüntü çalıştırmasında sürekli FPS ölçümü yok. RTX 3070 Ti, 1920×1080 çıkış, Hız ön ayarı; mevcut önbellekler korundu.",
      "imageAlt": "Atlı kahraman, can kalpleri, bozuk renkler ve siyah alanlarla Minecraft Legends eğitimi",
    },
    "police-simulator-patrol-officers": {
      "status": "Giriş/menü · işleme kusurları",
      "headline": "Kariyer oluşturma ve bölge seçimine ulaşıldı",
      "summary": "PPSA05831 v01.000.000: Açılış, Yeni Kariyer ve bölge onayı çalışıyor. Parlak yeşil çıktı ana menü arka planını bozuyor; ters arayüz ve özyinelemeli görüntü kopyaları vardiya seçimini engelliyor. Sokakta oynanış doğrulanmadı.",
      "strengths": [
        "Klavyeyle menü girişi ve kariyer kaydı oluşturma doğrulandı.",
      ],
      "limits": [
        "Ağır işleme bozulması; sokakta kontrol, kaydın yeniden yüklenmesi ve duyulan ses kalitesi doğrulanmadı.",
      ],
      "performance": "Ana menü görüntüsü: 16,3 FPS, tek okuma. Bozuk bölge seçimi: 8,2–9,9 FPS, medyan 9,2, bir saniyelik 30 örnek. RTX 3070 Ti, Hız, 1920×1080 çıkış; iç hedefler 2560×1440'a ulaşıyor. Bunlar oynanış FPS değerleri değildir.",
      "imageAlt": "Arka planı ağır biçimde yeşile bozulmuş Police Simulator ana menüsü",
    },
    "monster-boy-and-the-cursed-kingdom": {
      "status": "Oyun içi · işleme kusurları",
      "headline": "İlk kontrol edilebilir bölüme ulaşıldı",
      "summary": "PPSA02787 v01.000.004: NGS2 port sorguları, klavye dokunuşları ve kayıt hizmetlerindeki düzeltmelerden sonra Yeni Oyun artık kaydediyor ve ilk bölümü yüklüyor. Hareket doğrulandı; büyük siyah çokgenler sürüyor.",
      "strengths": [
        "Menü, kayıt oluşturma ve ilk bölümde hareket çalışıyor.",
      ],
      "limits": [
        "Arka planda ve zeminde ağır kusurlar var; oyunun bitirilmesi, kaydın yeniden yüklenmesi ve duyulan ses doğrulanmadı.",
      ],
      "performance": "İlk bölüm: 3,8–5,7 FPS, medyan 4,2; bir saniyelik 30 sayaç örneği. RTX 3070 Ti, 1920×1080, Hız. Eşzamanlı derleme çalıştırmayı etkiledi; bu yalıtılmış bir ölçüm değildir.",
      "imageAlt": "HUD, karakter, kulübe ve siyah çokgen kusurlarıyla Monster Boy ilk bölümü",
    },
    "oxide-room-104": {
      "status": "Açılış bildirimi · sonra siyah ekran",
      "headline": "Otomatik kayıt bildirimi çiziliyor; sonraki işleme shader ve kuyruk hatalarına takılıyor.",
      "summary": "PPSA07653 v01.000.000: İki başlatma bağlamayı geçiyor. Otomatik Cross, FLAT adresleme, IMAGE_BVH_INTERSECT_RAY, InvalidScalarCall ve DMA_DATA reddi hatalarıyla siyah çıktıya ulaşıyor. Yalnızca klavyeyle yapılan tekrar otomatik kayıt bildirimini gösteriyor. Oynanış doğrulanmadı.",
      "strengths": [
        "Tekrarda otomatik kayıt metni, hareketli simge ve Cross/OK istemi çiziliyor; iki çalıştırmada da misafir CPU hatası günlüğe düşmüyor.",
      ],
      "limits": [
        "İki çalıştırmada da çözülmemiş depolama bağlamaları var. Tekrar bildirimde kalıyor; kısa otomatik tuş basışı Pad tanılamasında görülmedi. Ana menü ve kontroller doğrulanmadı.",
        "Elle kontrol, ses kalitesi, kayıtlar, oyunun bitirilmesi ve uzun oturum kararlılığı doğrulanmadı.",
      ],
      "performance": "Otomatik kayıt bildirimi: medyan 18,45 FPS (17,5–19,1), 29,829 sn'de 30 okuma. Oynanış ölçümü değildir. Siyah ekranda kalan 18,8 FPS eski bir değerdir. 11 Ekim geliştirme sürümü; RTX 3070 Ti, 1920×1080 çıkış, Hız ön ayarı. Mevcut önbellekler korundu. İlk çalıştırma: otomatik Cross; ölçülen tekrar: yalnızca klavye.",
      "imageAlt": "Koyu kırmızı arka planda beyaz simge ve Cross OK istemiyle Oxide Room 104 otomatik kayıt bildirimi",
    },
    "medieval-dynasty": {
      "status": "Ana menü · dikey olarak ters görüntü",
      "headline": "Ana menü çiziliyor, ancak görselleri ve metni baş aşağı.",
      "summary": "PPSA07933 v01.413.001: Mevcut çalıştırıcı ana menüye ulaşıyor. Arka plan, logo ve seçenek metni dikey olarak ters. Bu denetimde betikli Cross bir bölüme girmiyor; oynanış doğrulanmadı.",
      "strengths": [
        "New Game, Load Game, Settings ve Credits çiziliyor; misafir hatası günlüğe düşmedi.",
      ],
      "limits": [
        "50 GPU boşluk raporunun 38'i 72 çözülmemiş depolama bağlaması içeriyor. Bunların terslikle ilişkisi bilinmiyor. Elle gezinme doğrulanmadı.",
        "Elle kontrol, ses kalitesi, kayıtlar, oyunun bitirilmesi ve uzun oturum kararlılığı doğrulanmadı.",
      ],
      "performance": "Menü: medyan 32,3 FPS (28,8–33,2), 29,763 sn'de 30 okuma. En büyük iç hedef 1920×1080. Oynanış ölçümü değildir. 11 Ekim geliştirme sürümü; RTX 3070 Ti, 1920×1080 çıkış, Hız ön ayarı. Mevcut önbellekler korundu; otomatik Cross girişi açık. İç işleme oyunun kontrolünde kalıyor.",
      "imageAlt": "Karlı köy görseli, logosu ve seçenek metni dikey olarak ters olan Medieval Dynasty ana menüsü",
    },
    "charons-staircase": {
      "status": "Açılış 3B sahnesi · kontroller doğrulanmadı",
      "headline": "Resimli giriş, orman yolu sahnesine geçiyor.",
      "summary": "PPSA06603 v01.000.000: Mevcut çalıştırıcı açılıştaki 3B orman yoluna ulaşıyor. 32,342 saniyelik bir geçiş karesi 26,810 saniyelik grafik pipeline ıskalarını içeriyor. Sahne çiziliyor, ancak karakter kontrolü ve oynanabilirlik doğrulanmadı.",
      "strengths": [
        "Giriş metni, ağaçlar, yol aydınlatması ve mercek parlaması görünüyor; misafir hatası kaydedilmedi.",
      ],
      "limits": [
        "64 GPU boşluk raporunun 63'ü çözülmemiş depolama bağlamaları içeriyor, genellikle 72 adet. Görsel sonuçları ayrıştırılmadı; aydınlatmanın doğruluğu doğrulanmadı.",
        "Elle kontrol, ses kalitesi, kayıtlar, oyunun bitirilmesi ve uzun oturum kararlılığı doğrulanmadı.",
      ],
      "performance": "Orman görünümü: medyan 9,1 FPS (8,0–9,3), 29,852 sn'de 30 sayaç okuması. Otomatik Cross açık kalıyor; en büyük iç hedef 3456×1944. Oyunun geneli için bir ölçüm değildir. 11 Ekim geliştirme sürümü; RTX 3070 Ti, 1920×1080 çıkış, Hız ön ayarı. Mevcut önbellekler korundu; otomatik Cross girişi açık. İç işleme oyunun kontrolünde kalıyor.",
      "imageAlt": "Koyu ağaçlar, parlak yol aydınlatması ve mercek parlamasıyla Charon's Staircase açılış orman yolu",
    },
    "pac-man-world-re-pac": {
      "status": "Giriş · başlık ve koşullar ekranları",
      "headline": "Açılış videosuna ve başlık ekranına ulaşıldı; video renkleri yanlış.",
      "summary": "PPSA06399 v01.000.002: Mevcut çalıştırıcı Unity başlatmasını geçiyor ve açılış videosundan sonra başlık ve koşullar ekranlarına ulaşıyor. Videoda ağır renk bozulması var. Otomatik Cross açılış ekranları arasında dolaşıyor; oynanış doğrulanmadı.",
      "strengths": [
        "Periyodik 180 GPU boşluk raporunun tamamında sayaçlar sıfır; misafir hatası günlüğe düşmedi.",
      ],
      "limits": [
        "Sıfır tanılama sayaçları grafiğin doğru olduğunu kanıtlamaz. Hiçbir bölüm veya karakter kontrolü test edilmedi.",
        "Elle kontrol, ses kalitesi, kayıtlar, oyunun bitirilmesi ve uzun oturum kararlılığı doğrulanmadı.",
      ],
      "performance": "Açılış geçişleri: medyan 9,55 FPS, 29,927 sn'yi kapsayan 30 sayaç örneğinde 5,9–14,1. Masaüstü başlatıcı etkinliği eşzamanlıydı; sabit veya oynanış ölçümü değildir. 11 Ekim geliştirme sürümü; RTX 3070 Ti, 1920×1080 çıkış, Hız ön ayarı. Mevcut önbellekler korundu; otomatik Cross girişi açık. İç işleme oyunun kontrolünde kalıyor.",
      "imageAlt": "Koyu ada arka planı üzerinde PAC-MAN WORLD Re-PAC başlık logosu ve Cross istemi",
    },
    keywe: {
      "status": "Açılış · kayıt yuvası menüsü · işleme eksik",
      "headline": "Eksik içe aktarmalar çözüldü; kayıt yuvası ekranına ulaşılabiliyor.",
      "summary": "11 Ekim geliştirme sürümü, PPSA02210 v01.000.000: pthread_setcancelstate artık durumu her misafir iş parçacığı için ayrı tutuyor. Ardından gelen yedi Audio3d içe aktarmasının da sahiplenilmiş PCM kuyrukları ve stereo karıştırma dahil uygulamaları var. KeyWe bağlamayı ve Unity başlatmasını geçiyor.",
      "strengths": [
        "Geliştirici ve yayıncı ekranları çiziliyor. Otomatik Cross girişi, Select ve Delete istemleriyle SAVE SLOT paneline ulaşıyor.",
        "635 HLE testinin tamamı geçiyor. İlk çalışma zamanı denetimi sayaçları sıfır olan 26 GPU boşluk raporu kaydediyor; misafir hatası yok.",
      ],
      "limits": [
        "Yakalanan yuva panelleri siyah arka planda boş; otomatik onaydan sonra kare gönderimleri sürerken ekran kararıyor. Oynanış doğrulanmadı. Yalnızca klavyeyle yapılan tekrar da logolardan sonra kararıyor.",
        "Audio3d, HRTF veya oda akustiği olmadan yaklaşık stereo konumlandırma kullanıyor. Bu çalıştırma sıradan AudioOut'u açıyor; Audio3d oynatımı, ses kalitesi, elle kontrol, kayıtlar ve oyunun bitirilmesi doğrulanmadı.",
      ],
      "performance": "Kayıt yuvası görüntüsü, RTX 3070 Ti'de 1920×1080 çıkış ve bildirilen en büyük iç hedefle 8,1 FPS gösteriyor. Bu tek bir pencere sayacı okumasıdır; sürekli veya oynanış ölçümü değildir.",
      "imageAlt": "Siyah arka planda üç boş yuva ve Select/Delete istemleriyle KeyWe SAVE SLOT paneli",
    },
    "super-woden-gp": {
      "status": "Ana menü · grafik sorunları · oynanış doğrulanmadı",
      "headline": "Açılış düzeltildi; dünya haritası menüsüne artık ulaşılabiliyor.",
      "summary": "11 Ekim geliştirme sürümü, PPSA07211 v01.000.003: Unity'nin Il2CppUserAssemblies.prx dosyasındaki iki eksik libkernel içe aktarmasının artık gerçek, iş parçacığı başına temizleme işleyicileri var. Oyun bağlamayı ve Unity başlatmasını geçiyor, ardından dil seçimine ve dünya haritası menüsüne ulaşıyor.",
      "strengths": [
        "Üç başlatma açılışı geçiyor. Betikli Cross ve Aşağı girişi dil seçiminden ana harita menüsüne ilerliyor.",
        "Menü çalıştırmasındaki periyodik 164 GPU boşluk raporunun tamamında sayaçlar sıfır; misafir hatası veya temizleme geri çağırması hatası kaydedilmedi.",
      ],
      "limits": [
        "Bazı harita etiketleri ve simgeleri dikey olarak ters, dil ekranındaki bayrakların renkleri yanlış. Sıfır boşluk sayaçları grafiğin doğru olduğunu kanıtlamaz.",
        "Elle gezinme, yarış, ses kalitesi, kayıtlar, oyunun bitirilmesi ve uzun oturum kararlılığı doğrulanmadı.",
      ],
      "performance": "Kaydedilen menü karesi, RTX 3070 Ti'de 1920×1080 çıkış ve aynı bildirilen en büyük iç hedefle 71,8 FPS gösteriyor. Bu, betikli girişle tek bir pencere sayacı gözlemidir; sürekli ölçüm, yarış performansı sonucu veya önce/sonra karşılaştırması değildir.",
      "imageAlt": "Ters etiketler ve simgelerle Super Woden GP dünya haritası menüsü; pencere sayacı 71,8 FPS",
    },
    "arcade-spirits-the-new-challengers": {
      "status": "Ana menü · açılış videosu · oynanış doğrulanmadı",
      "headline": "Açılış düzeltildi; ana menüde medyan 252,9 FPS ölçüldü.",
      "summary": "11 Ekim geliştirme sürümü, PPSA06409 v01.000.000: eksik beş scePthreadSem içe aktarması artık gerçek sayaçlı semaforlar ve zamanlayıcı beklemeleri kullanıyor. Python/Ren’Py başlıyor ve imzalı çalıştırıcı ana menüyü çiziyor. Otomatik Cross girişli bir tekrar START'ı seçiyor ve altyazılı açılış videosuna ulaşıyor.",
      "strengths": [
        "START, LOAD, PREFS, PRIZES ve ABOUT başlık görselinin üzerinde çiziliyor; tekrar Fist of Discomfort 2 Pro Tour girişine ilerliyor.",
        "Menü çalıştırmasındaki 517 ve tekrardaki 278 GPU boşluk raporunun tamamı sıfır; misafir hatası veya örneklenmiş görüntü reddi yok.",
      ],
      "limits": [
        "Elle menü gezintisi ve oynanış doğrulanmadı: arayüz aracının kısa tuş basışları Pad tanılamasında görünmedi.",
        "Ses kalitesi, kaydın geri yüklenmesi, oyunun tamamen bitirilmesi ve uzun oturum kararlılığı test edilmedi. Bildirilen sıfır boşluk sonraki sahnelerde doğruluğu kanıtlamaz.",
      ],
      "performance": "Menü: medyan 252,9 FPS; otomatik giriş kapalıyken 29,939 saniyeyi kapsayan bir saniyelik 30 pencere sayacı okumasında 221,1–272,3 FPS aralığı. RTX 3070 Ti, istenen çıkış 1920×1080, iç hedef 3840×2160. Giriş görüntüsü tek bir gözlem olarak 200,3 FPS gösteriyor. Bunlar oynanış ölçümü veya önce/sonra karşılaştırması değildir.",
      "imageAlt": "Başlık görselinin üzerinde START, LOAD, PREFS, PRIZES ve ABOUT ile Arcade Spirits ana menüsü",
    },
    "arkanoid-eternal-battle": {
      "status": "Başlık ekranı · ana menü · oynanış doğrulanmadı",
      "headline": "Açılış ve menü görselleri geri geldi; mod seçimi menüsünde 45,6 FPS ölçüldü.",
      "summary": "11 Ekim geliştirme sürümü, PPSA06328 v01.002.000: eksik dört Fiber/POSIX içe aktarması uygulandı. Bağımsız sistem yazılımı yığınları ve çalışanlar arasında eşzamanlı fiber taşıma, sonraki açılış hatalarını gideriyor. Büyük BC7 atlasları için ayrı bir yükleme sınırı başlık görselini geri getiriyor.",
      "strengths": [
        "İki başlatma hareketli başlık ekranına ulaşıyor. Otomatik Cross girişi Options, Retro, Eternal Battle, Versus ve Neo içeren mod seçimi karuselini açıyor.",
        "Son izlerde misafir hatası veya örneklenmiş görüntü reddi görünmüyor; denetlenen karelerde bildirilen GPU boşluk sayaçları sıfır kalıyor.",
      ],
      "limits": [
        "Çevrimiçi Eternal Battle modu erişilemez olduğunu bildiriyor; misafir günlüğünde başarısız sunucu bağlantıları var.",
        "Çevrimdışı mod seçimi, raket kontrolü ve oynanış doğrulanmadı. Ses kalitesi, oyunun bitirilmesi ve uzun oturum kararlılığı test edilmedi.",
      ],
      "performance": "Menü: medyan 45,6 FPS; 29,962 saniyeyi kapsayan bir saniyelik 30 pencere sayacı örneğinde 43,5–46,6 FPS aralığı. Otomatik Cross açık kaldı. Başlık ekranı gözlemleri: 138–149 FPS, zamanlanmış ölçüm değildir. RTX 3070 Ti, 1920×1080 çıkış isteği, 3840×2160 iç hedef. Bunlar menü okumalarıdır; oynanış performansı veya önce/sonra karşılaştırması değildir.",
      "imageAlt": "Retro, Eternal Battle ve Versus kartlarıyla Arkanoid ana mod seçimi menüsü; pencere sayacı 45,2 FPS",
    },
    "raiden-iv-mikado-remix": {
      "status": "Oynanabilir · Bitirilebilir",
      "headline": "İlk bölümde oynanış, çalışan efektler ve daha düşük işleme maliyeti.",
      "summary": "17 Ekim geliştirme sürümü: NGS2 ses havuzu artık ana sesle birlikte 1.024 örnekleyici sesini barındırıyor. ATRAC9 kod çözme ve bellekteki dalga biçimi ayrıştırma ses efektlerini geri getiriyor. Uyumlu işleme geçişleri ve örneklenmiş görüntü tanımlayıcı bankaları sürücü yükünü azaltıyor.",
      "strengths": [
        "İlk OverKill bölümü oyuncu gemisini, düşmanları, mermileri, araziyi ve HUD'u çiziyor; ölüm ve devam etme denetlendi.",
        "Kullanıcı menü düğmesi seslerini doğruladı. Denetlenen karelerde çizim/dispatch hatası veya desteklenmeyen compute işlemi bildirilmiyor.",
      ],
      "limits": [
        "Oynanabilir · Bitirilebilir, geliştiricinin verdiği derecedir. Bu çalıştırma oyunun tamamen bitirilmesini veya uzun oturum kararlılığını doğrulamadı.",
        "Arka plan müziği hâlâ yanlış: kullanıcı onu yalnızca ölüm anı civarında duyuyor. Sürekli 60 FPS'ye ulaşılmadı.",
      ],
      "performance": "39,75 FPS: 30,013 saniyede 1.193 kare, bir saniyelik aralıklar 24,99–63,97 FPS. Sonraki yoğun çatışmalarda yaklaşık 18–22 FPS gözlendi. Hareketli sahnelerdir; kontrollü bir önce/sonra karşılaştırması değildir. RTX 3070 Ti, 1920×1080 çıkış ve gözlenen iç hedef. Son anlık görüntü optimizasyonu bu zamanlanmış adayda yer almıyor.",
      "imageAlt": "Oyuncu gemisi, düşman dizilişi, mermiler ve HUD ile Raiden IV oynanışı; skor 14000",
    },
    "dead-cells": {
      "status": "Ana menü · ilk bölüm çiziliyor · oynanabilirlik doğrulanmadı",
      "headline": "İlk oda, karakter ve HUD çiziliyor; menü müziği artık sıfır olmayan bir karışım üretiyor.",
      "summary": "11 Ekim geliştirme sürümü, PPSA15552 v01.005.000: sekiz NGS2 içe aktarması çözüldükten sonra iki ortak düzeltme görünür bölümü ve menü ses verisini geri getiriyor. Tam ekran kopyalama kısayolları artık harmanlamaya uyuyor ve aydınlatılmış sahneyi koruyor. Özel NGS2 örnekleyici sesleri artık sessizlik karıştırmak yerine dalga biçimi formatını, blokları ve perdeyi kabul ediyor.",
      "strengths": [
        "Prisoners’ Quarters odası, karakter, silah, eğitim istemi ve HUD görünüyor.",
        "Periyodik 101 raporun tamamında çizim/dispatch hatası sıfır; tekrarda InvalidStorageBinding ile image_sample reddi yok.",
      ],
      "limits": [
        "Oyunu otomatik Cross basışları başlattı; dövüş, ilerleme, kayıtlar ve daha uzun oturumlar test edilmedi.",
        "Menü sesi dinlenerek değil, yalnızca karışım seviyeleriyle doğrulandı. Uzamsal ses matrisleri ve kanal kaydırma hâlâ eksik.",
      ],
      "performance": "Başlangıç odasında yedi pencere sayacı okuması: 59,2–68,1 FPS, görüntü anında 62,5 FPS dahil; zamanlanmış bir medyan değildir. Önceki ana menü okumaları: 71–72 FPS. RTX 3070 Ti, Hız ön ayarı, 1080p çıkış isteği.",
      "imageAlt": "Aydınlık oda, karakter, eğitim istemi ve HUD ile Prisoners’ Quarters'da Dead Cells",
    },
    "little-nightmares-enhanced-edition": {
      "status": "Oyun içi · işleme eksik",
      "headline": "Kaydetme/yükleme çalışıyor; açılış oynanışında 3,73–4,46 FPS ölçüldü.",
      "summary": "3 Ekim, PPSA10737 v01.004.000: eşzamansız kayıt yazımları artık ilerlemeyi saklıyor ve yeni işlemler açılış odasından Devam ediyor. HTILE işleme, toplu erken geri okumalar ve dört kopyalama çalışanı işleme maliyetini düşürüyor. Güncellenmiş çalıştırıcı hâlâ 5 FPS'nin altında kalıyor.",
      "strengths": [
        "Yeni Oyun, hareket, kamera takibi ve çakmak girişi doğrulandı.",
        "Boş olmayan kayıtlar yazılıyor ve emülatör yeniden başlatıldıktan sonra yükleniyor.",
      ],
      "limits": [
        "Karanlık aydınlatma, yansıtıcı malzeme kusurları ve desteklenmeyen FLAT/ışın kesişimi shader'ları sürüyor.",
        "Aralıklı ayırıcı hataları açılışı kesebiliyor; oyunun bitirilmesi ve uzun oturum kararlılığı doğrulanmadı.",
      ],
      "performance": "Güncellenmiş varsayılan sürüm: bavulun yanında 4,46 FPS, sağa ilerledikten sonra 3,73 FPS; her biri duraklatmasız 30 saniye. RTX 3070 Ti, 1080p çıkış isteği, Hız ön ayarı, oyun içi Performans; iç çözünürlüğü oyun belirliyor. Önceki 2,16 FPS denetimi aynı konumda bir karşılaştırma değildir. 5 FPS'ye ulaşılmadı.",
      "imageAlt": "Açılış odasında bavulun yanındaki Six; karanlık aydınlatma ve yansıtıcı malzeme kusurları sürüyor",
    },
    "gta-iii-definitive-edition": {
      "status": "Oyun içi · hareket doğrulandı",
      "headline": "Başlatıcıdan soğuk açılış doğrulandı; yeşil yansıma yayımlama sorunu düzeltildi.",
      "summary": "10 Ekim geliştirme sürümü, PPSA03527 v1.007: kurulu imzalı çalıştırıcı, emülatör önbellekleri yokken iki açılış videosundan sonra menüye otomatik olarak ulaşıyor. Give Me Liberty oyuncuyu, arabayı, köprüyü, HUD'u ve mini haritayı çiziyor. Sıralı arabellek/depolama görüntüsü yayımlama gözlenen yeşil yansıma temizlemesini gideriyor; ortak shader analizi tekrarlanan CPU işini azaltıyor.",
      "strengths": [
        "Başlatıcıdan gerçek soğuk açılış videolar atlanmadan menüye ulaşıyor; Yeni Oyun açılış görevine ulaşıyor.",
        "Klavyeyle hareket ve yön değiştirme doğrulandı.",
      ],
      "limits": [
        "Açılış sahnesi raporları sıfır çizim/dispatch hatası ve sıfır çözülmemiş depolama bağlaması gösteriyor; sonraki shader'lar ve kalan görsel kusurlar tam olarak incelenmedi.",
        "11 Ekim'de oyuncuyla birlikte hareket eden araç/nesne gölgeleri ve çift oyuncu gölgeleri bildirildi; yeniden üretme ve düzeltme bekliyor. Başlatmada reddedilen, yalnızca köşe noktası içeren bir çizim de inceleniyor.",
        "Oyunun tamamının bitirilmesi, uzun oturum kararlılığı, kaydın geri yüklenmesi ve ses doğruluğu doğrulanmadı.",
      ],
      "performance": "10–11 Ekim açılış konumu denetimleri: soğuk başlatmadan sonra kurulu çalıştırıcıda 7,37 FPS, tekdüze skaler analizinin dizinlenmesinden sonra 8,27 FPS. Her aralık duraklatmasız 30 saniyedir. Kullanıcı hareketli sonraki 7,10 FPS örneği sabit karşılaştırmanın dışında tutuldu. Performans modu, Bloom/Motion Blur kapalı, Classic Lighting açık; çıkış 1080p, iç çözünürlüğü oyun belirliyor. Trafik ve günün saati değişiyor. Diğer arabellek dizini ve kompakt varyant anahtarı değişiklikleri temiz bir oynanış ölçümü bekliyor; 10 FPS henüz kanıtlanmadı.",
      "imageAlt": "Başlatıcıdan soğuk açılış ve yansıma yayımlama düzeltmelerinden sonra Callahan Köprüsü'nde GTA III oyuncusu ve araba",
    },
    "subnautica-below-zero": {
      "status": "Oynanabilir · Bitirilebilir",
      "headline": "Yeni Oyun açılış dünyasına ulaşıyor; kamera hareketi ve yürüme doğrulandı.",
      "summary": "3 Ekim tekrarı, PPSA02457 v1.022.125: kurulu çalıştırıcı Survival kaydını geri yüklüyor ve karlı kaza alanını ve HUD'u çiziyor. Bu çalıştırma, ortak GTA III işleyici değişikliklerinden sonraki güncel sürümü ölçer; yeni emülatör düzeltmesi eklemez.",
      "strengths": [
        "Yeni Oyun, giriş, dünya işleme, kamera girişi ve yürüme doğrulandı.",
      ],
      "limits": [
        "Karanlık aydınlatma, görsel bozukluklar ve uzun duraklamalar sürüyor.",
        "Oyunun tamamen bitirilmesi, ses doğruluğu ve uzun oturum kararlılığı doğrulanmadı.",
      ],
      "performance": "İkinci yeni başlatma, aynı yürütülebilir dosya ve Survival kaydı: menü 15,50 FPS; duraklatmasız iki 30 saniyelik sabit dünya örneği 12,70 ve 8,50 FPS, toplamda 10,60 FPS. Çıkış 1080p, Hız ön ayarı, ısınmış önbellekler. Bu aralıklarda on saniyelik duraklama yok, ancak daha kısa gecikmeler sürüyor. Önceki başlatmanın ortalaması 9,52 FPS idi. Bu, çalıştırmalar arası farktır, yeni bir optimizasyon değil; 30 FPS'ye ulaşılmadı.",
      "imageAlt": "3 Ekim performans tekrarı sırasında Subnautica: Below Zero karlı kaza alanı ve hayatta kalma HUD'u",
    },
    "terminator-2d-no-fate": {
      "status": "Oynanabilir · Bitirilebilir",
      "headline": "Hiçbir sorun bildirilmeden sonuna kadar oynandı.",
      "summary": "Geliştirici bu oyunu bitirdi. Arka planlar, karakterler, HUD, dokular ve renkler amaçlandığı gibi çıkıyor; 8 Eylül doğrulamasından beri projenin en kararlı referans oyunu.",
      "strengths": [
        "Bildirilen hiçbir kusur olmadan tam bir oynanış.",
        "Doğru doku alfası, kanal karıştırmaları ve sRGB örnekleme amaçlanan renk dengesini koruyor.",
        "HUD ve karakter çizimleri baştan sona temiz çiziliyor.",
      ],
      "limits": [
        "Kare süreleri sabit bir hızda kalmak yerine hâlâ sahneye göre değişiyor.",
      ],
      "performance": "Isındıktan sonra açılış kareleri referans sistemde 22 ile 65 ms arasında.",
      "imageAlt": "PS5PCEM tarafından çizilen, oyuncu karakteri, HUD ve çöl sahnesiyle Terminator 2D: No Fate oynanışı",
    },
    "asterix-obelix-slap-them-all": {
      "status": "Oynanabilir · Bitirilebilir",
      "headline": "Baştan sona bitirildi; giriş ve arayüz doğru.",
      "summary": "Doğrulanmış bir oynanış. Oynanış ve arayüz doğru yönde çiziliyor, giriş videosu oynatılıyor. Son tam ekran birleştirme GPU'da kalıyor ve ekrana çıkış, bir kareyi ana bellek üzerinden geri kopyalamadan misafir görüntü alanının yönünü koruyor.",
      "strengths": [
        "Tam oynanış geliştirici tarafından doğrulandı.",
        "Giriş videosu oynatılıyor; oynanış ve arayüz doğru yönde.",
        "3.000 kare değiştirmelik bir geliştirme çalıştırması tek bir reddedilen gönderim olmadan tamamlandı.",
      ],
      "limits": [
        "Kare maliyeti sabit değil, sahne yoğunluğuna bağlı.",
      ],
      "performance": "9 Ekim geliştirme yeniden testi: sabit açılış ormanı medyanı 46,45 → 162,20 FPS; RTX 3070 Ti'de 1080p çıkışta 30 saniyelik arayüz sayacı örnekleri. Sonraki bölümler ölçülmedi.",
      "imageAlt": "PS5PCEM tarafından çizilen, ormanda HUD ve GO işaretiyle Asterix & Obelix: Slap Them All! oynanışı",
    },
    "cat-quest-iii": {
      "status": "Oynanabilir · Bitirilebilir",
      "headline": "Bitirildi; menüler, diyaloglar ve ada arazisi doğru çiziliyor.",
      "summary": "Doğrulanmış bir oynanış. Yakalanan sahnelerde menüler, macera kartları, diyaloglar, ada arazisi ve renkler doğru. Buraya ulaşmak için dünya yönü, yalnızca stencil geçişleri, AGC interpolant eşlemesi ve ekran çıkışı kanal sırası düzeltmeleri gerekti.",
      "strengths": [
        "Tam oynanış geliştirici tarafından doğrulandı.",
        "Dil listesi metnini koruyor ve üzerine boyanmak yerine onu kendi paneli içinde kırpıyor.",
        "Macera seçimi yuva görsellerini, etiketleri, ekleme düğmelerini ve kaydırma oklarını gösteriyor.",
      ],
      "limits": [
        "Kalan sınır doğruluk değil, açılış adasındaki kare hızı.",
      ],
      "performance": "Açılış adası örneklerinin medyanı 124 ms, yaklaşık 8 FPS; optimizasyon çalışmasından önce yaklaşık 148 ms idi.",
      "imageAlt": "PS5PCEM tarafından çizilen, HUD, dağlar ve mavi denizle Cat Quest III ada oynanışı",
    },
    "dreaming-sarah": {
      "status": "Oynanabilir · Bitirilebilir",
      "headline": "Köşe noktası yükleme optimizasyonundan sonra açılış ormanı 100 FPS'yi aşıyor.",
      "summary": "10 Ekim geliştirme sürümü, gereğinden büyük sprite arabelleği kopyalarını kanıtlanmış köşe noktası aralıklarıyla değiştiriyor. Açılış karesi başına arabellek yüklemeleri yaklaşık 78 MiB'den 4,9 MiB'ye düşüyor. Hareket, zıplama ve sonraki platform ekranı doğrulandı; daha önceki bitirilmiş oyun raporu kayıtlı duruyor.",
      "strengths": [
        "Tam oynanış geliştirici tarafından doğrulandı.",
        "60 saniyelik açılış örneği: medyan 198,25 FPS, 187,8–203,2 FPS. Uyandıktan sonra: 197,25 FPS; sonraki platform ekranı: 144,35 FPS (her biri 30 saniye).",
        "Hareketli başlık, dünya sahneleri ve NPC'ler doğru çiziliyor.",
      ],
      "limits": [
        "Bunlar RTX 3070 Ti'de 1080p çıkış ve ses açıkken alınan pencere sayacı örnekleridir; oyunun tamamı için bir en düşük değer belirlemezler.",
        "Yükleme için eboot.bin ve sce_module/libc.prx dosyalarının, kopyanın kendi eboot yamalayıcısının bıraktığı yedeklerden geri yüklenmesi gerekti; yamalayıcı ikisini de kesmişti.",
      ],
      "performance": "60 saniyelik açılış örneği: medyan 198,25 FPS, 187,8–203,2 FPS. Uyandıktan sonra: 197,25 FPS; sonraki platform ekranı: 144,35 FPS (her biri 30 saniye).",
      "imageAlt": "Sınırlandırılmış köşe noktası yüklemelerinden sonra Dreaming Sarah açılış ormanı",
    },
    "jurassic-park-classic-games-collection": {
      "status": "Oynanabilir · Bitirilebilir",
      "headline": "Açılış geri geldi; ilk bölüm yeniden doğrulandı.",
      "summary": "Açılış, a3d371e geliştirme commit'inde yeniden çalışıyor. 8 Ekim 2026 yeniden testi iki başlatmayı geçti, ilk bölüme ulaştı ve harita katmanında klavye girişini doğruladı. Geliştiricinin daha önceki bitirilmiş oyun raporu kayıtlı duruyor.",
      "strengths": [
        "8 Ekim geliştirme sürümü yazı tipi atlası başlatmasını geçiyor ve ilk bölüme ulaşıyor.",
        "Tam oynanış geliştirici tarafından doğrulandı.",
        "Koleksiyon seçimi kapak görsellerini, gezinme oklarını ve hareketli bir önizlemeyi gösteriyor.",
        "Açılış işleme, başlık logosu ve onay istemi doğru.",
      ],
      "limits": [
        "Önizleme videoları arasında art arda geçiş yapmak bir AvPlayer tanıtıcı havuzunu tüketebiliyor; bundan sonra sonraki önizlemeler donuyor.",
        "Kare maliyeti koleksiyondaki oyuna ve donanıma göre değişiyor.",
      ],
      "performance": "Geçmişteki başlık ve seçim kareleri yaklaşık 27 ve 33 ms olarak örneklendi. 8 Ekim yeniden testi açılışı ve ilk bölümü denetledi; yeni bir FPS ölçümü belirlemedi.",
      "imageAlt": "PS5PCEM tarafından çizilen, yazı tipi atlası açılış düzeltmesinden sonra park kapılarında Jurassic Park ilk bölümü",
    },
    "jets-n-guns-2": {
      "status": "Oynanabilir · Bitirilebilir",
      "headline": "Bitirildi; bölümler, HUD, skor ve paralaks sahne doğru.",
      "summary": "Eşzamanlı müzik ve efektler artık ayrı ana sistem akışları kullanıyor. 9 Ekim geliştirme düzeltmesi, bir alt akıştan sonra PCM sırasını da koruyor; 0.3.4 sürümünden yenidir. Geliştirici 15 Eylül'de tam oynanışı doğruladı.",
      "strengths": [
        "Tam oynanış geliştirici tarafından doğrulandı.",
        "Bölümler, HUD, skor, düşmanlar ve paralaks katmanları doğru çiziliyor.",
        "Müzik ve efektler artık tek bir çıkış aygıtı için yarışmıyor.",
      ],
      "limits": [
        "Kurulu çalıştırıcıda alınan son 30 saniyelik menü kaydında 30 ms'lik bir sessiz aralık kaldı; nedeni belirlenmedi.",
        "Kısa menü ve çatışma ses denetimleri geçti; uçtan uca ses gecikmesi ve uzun oturum kararlılığı ölçülmedi.",
      ],
      "performance": "9 Ekim çatışma arayüzü örnekleri 35,7–45,8 FPS okuyor. Geçmişteki 70–92 ms'lik kareler (11–14 FPS) daha eski bir sürüm ve sahne kullanıyordu; bu eşleştirilmiş bir hızlanma ölçümü değildir.",
      "imageAlt": "9 Ekim ses yeniden testi sırasında Pirate Base çatışması",
    },
    "the-precinct": {
      "status": "Başlık menüsü, giriş videoları ve motor içi ilk oynanış karesi",
      "headline": "İki giriş videosunu oynatıyor, başlık menüsünü çiziyor ve soğuk dünya yüklemesine giriyor.",
      "summary": "Altı görüntüden oluşan misafir grafiğinin tamamı bağlanıyor, Unity eklentileri başlıyor ve gözlemlenen iki giriş videosu 48 kHz stereo sesle eşzamanlı 4K video olarak oynatılıyor. Başlık görseli ve okunabilir bir NEW GAME onayı çiziliyor; Triangle basılı tutulunca dünya yüklemesi başlıyor. Daha önceki korumalı bir çalıştırma, doğrulanmış ilk motor içi oynanış karesini üretti.",
      "strengths": [
        "İki giriş videosu 48 kHz stereo sesle eşzamanlı 3840×2160 video olarak oynatılıyor.",
        "1920×1080 başlık görselinin tamamı ve okunabilir bir NEW GAME onayı çiziliyor.",
        "Hedef iş parçacığına istisna iletimi, Unity'nin her şeyi durdurma el sıkışmasını tamamlıyor.",
      ],
      "limits": [
        "İlk dünya geçişi hâlâ dakikalar sürüyor: ilk kullanımda shader çevirisi, sürücü pipeline derlemesi, eşzamanlı gönderim ve hazırlama pahalı.",
        "Oyuna özgü bir derleyici geçici çözümü genel shader yolu lehine kaldırıldı; bu yüzden herhangi bir oynanış iddiasından önce geçişin baştan sona yeniden doğrulanması gerekiyor.",
      ],
      "performance": "Tanımlayıcı kurtarma, her çekirdeğin girişini adlandırdığı her kaynak için yeniden oynatmayı bıraktıktan sonra dünya yükleme karesi 5,1 sn'den 2,1 sn'ye indi.",
      "imageAlt": "PS5PCEM tarafından çizilen, NEW GAME onayıyla The Precinct başlık menüsü",
    },
    "ghost-of-yotei": {
      "status": "Giriş oynatımı · bonus bildirimleri · parlaklık ayarı · oyun içi sahnelere ulaşıyor · oynanamaz",
      "headline": "Menüler ve ağaç çiziliyor; görünür kusurlar ve çok düşük kare hızlarıyla.",
      "summary": "Yükleme, bonus bildirimleri, parlaklık ayarı ve ağaç/ayarlar sahnesi çiziliyor. Daha önceki çalıştırmalar ağaçtan sonraki eksik bir ara sahneye ulaştı. 13 Ekim tekrarı ağaç/ayarlar dizisinde 1,27 FPS ölçüyor; grafik kusurları ve uzun derleme duraklamaları sürüyor. Bu incelemede kontrol edilebilir oynanışa ulaşılmadı.",
      "strengths": [
        "Giriş videoları yaklaşık kendi 30 FPS'lerinde oynatılıyor; ses parçayla uyumlu başlıyor.",
        "Yükleme göstergesi, bonus bildirimleri ve kurt görseli, kaydırıcısı ve istemiyle parlaklık ayarı ekranı çiziliyor.",
        "Ağaç sahnesi dahil sonraki 3B sahneler, menü müziği duyulurken ekrana ulaşıyor.",
      ],
      "limits": [
        "Karakter kontrolü doğrulanmadı.",
        "Parlak ağaç çizgileri, eksik aydınlatma ve çözülmemiş kaynak bağlamaları sürüyor.",
        "İlk kullanımda pipeline derlemesi, büyük aktarımlar ve yüksek bellek kullanımı bazı geçişlere hâlâ hâkim.",
        "Daha önceki bir BVH dolaşım takılması çözülmedi; yakalamalar eşzamanlama eklediği için başarılı yeniden oynatma normal çalıştırma kararlılığını kanıtlamaz.",
      ],
      "performance": "13 Ekim: 30,001 saniyede gösterilen 38 kare (1,27 FPS), RTX 3070 Ti'de 1080p çıkışta ağaç/ayarlar dizisi. İlk kullanımdaki bir kare, grafik ve compute pipeline'larını oluşturmaya harcanan 433,5 saniye dahil 461,2 saniye sürüyor. Bunlar farklı aralıklardır, kontrollü bir önce/sonra karşılaştırması değildir. Son bellek değişikliği için bir FPS kazancı kanıtlanmadı.",
      "imageAlt": "PS5PCEM tarafından çizilen Ghost of Yōtei Digital Deluxe bonus bildirimi",
    },
    "quake-ii-2023": {
      "status": "Oynanabilir · Bitirilebilir",
      "headline": "Bitirildi; aydınlatma, modeller ve silahlar geri geldi.",
      "summary": "16 Eylül 2026'da oynanabilir olduğu doğrulandı ve 25 Eylül'de PPSA09477 v1.003 olarak yeniden denetlendi. Bölüm aydınlatması, dokular, silahlar ve NPC'ler görünüyor: önceki sürümlerdeki karanlık dünya ve eksik modeller gözlenen oynanışta çözülmüş durumda. Menüler, HUD ve kumanda girişi çalışıyor.",
      "strengths": [
        "Tam oynanış geliştirici tarafından doğrulandı; işleme daha sonra yeniden denetlendi.",
        "Aydınlatma, dokular, silahlar ve NPC modelleri görünüyor; önceki karanlık dünya ve eksik geometri kusurları giderildi.",
        "Menüler, HUD ve kumanda girişi doğru davranıyor.",
      ],
      "limits": [
        "Yoğun çatışma sahneleri hâlâ zirvelerin çok altında çalışıyor; yüksek değerler bir taban değildir.",
        "Performans çalışmaları sürüyor.",
      ],
      "performance": "Geliştirici hafif sahnelerde 60–70 FPS zirveler bildiriyor; yoğun çatışma belirgin biçimde daha yavaş. Arabellek yeniden kullanımı ve GPU temizlemeleri aktarım yükünü azaltıyor.",
      "imageAlt": "PS5PCEM tarafından çizilen, aydınlık bölüm, görünen düşmanlar ve oyuncunun silahıyla Quake II oynanışı",
    },
    reanimal: {
      "status": "Hareketli 4K başlık menüsü; seçenek etiketleri eksik",
      "headline": "Logo dizisini oynatıyor ve hareketli başlık menüsü işleme grafiğini sürdürüyor.",
      "summary": "Gözlemlenen yerel ve sistem yazılımı modülleri çözülüyor, şirket logosu dizisi oynatılıyor ve hareketli 3840×2160 başlık menüsü çizilmeye devam ediyor. Şamandıralı arka plan, başlık logosu, su parlamaları ve SELECT istemi görünüyor — ancak menünün kendi seçenek etiketleri görünmüyor.",
      "strengths": [
        "Şirket logosu dizisi oynatılıyor ve hareketli 4K başlık menüsü sürüyor.",
        "Dar Unity arayüz ara katmanları artık ekran çıkışının tamamının yerine geçmiyor.",
        "Dinamik R8 yazı tipi atlasları eskimiş örneklenmiş görüntüleri doğru biçimde geçersiz kılıyor.",
      ],
      "limits": [
        "Ortadaki menü seçenek etiketleri küçük kırmızı işaretlere dönüşüyor; bu yüzden gezinme ve oynanışa geçiş doğrulanmadı.",
        "Performans ve uzun çalıştırma kararlılığı ölçülmedi; oynanış iddia edilmiyor.",
      ],
      "imageAlt": "PS5PCEM tarafından çizilen, seçenek etiketleri eksik REANIMAL hareketli başlık menüsü",
    },
    "ritas-rewind": {
      "status": "Oynanabilir · Bitirilebilir",
      "headline": "Yayıncı dizisinden Command Center oynanışına kadar bitirildi.",
      "summary": "24 Eylül 2026'da oynanabilir olduğu doğrulandı. Yayıncı dizisi, başlık menüsü ve oynanış çiziliyor ve kumanda girişine yanıt veriyor; görüntüde Command Center eğitim aşamasında HUD, can çubuğu, hedefler ve düğme istemleriyle Red Ranger görülüyor.",
      "strengths": [
        "Tam oynanış geliştirici tarafından doğrulandı.",
        "Yerel işbirlikçi fiber'lar askıya alınmış misafir yığınlarını bozulmadan koruyor.",
        "V_SAD_U32, V_MUL_HI_I32 ve V_CVT_FLR_I32_F32'nin birebir dönüştürülmesi tanılama shader yedeğini ortadan kaldırdı.",
      ],
      "limits": [
        "Birebir misafir CRT birleştirmesi referans sistemde hâlâ parazit üretiyor; bu yüzden dar biçimde eşleşen bir shader imzası yedeği, son işlemeden önce sahneyi RGBA8'de 4× ölçekliyor.",
      ],
      "performance": "Giriş kare başına yaklaşık 13–20 ms'de kalıyor. Menü sonrası yaklaşık 255 çizimlik yoğun kareler, tekrarlanan misafir arabelleği hazırlamanın ağır bastığı yaklaşık 470 ms tutuyor.",
      "imageAlt": "PS5PCEM tarafından çizilen, Command Center'da Red Ranger ile Mighty Morphin Power Rangers: Rita's Rewind oynanışı",
    },
    "big-helmet-heroes": {
      "status": "Ana menü ve eğitim çiziliyor · oynanabilirlik doğrulanmadı",
      "headline": "Doğru bir ana menüye ve eğitim sahnesine tek haneli kare hızlarıyla ulaşıyor.",
      "summary": "Oyun girişinden karakter modelleri, dokular, aydınlatma ve renklerle doğru çizilen bir ana menüye, oradan da bir eğitim sahnesine ilerliyor. Düzeltmeler Gen5 tek örnekli doku adreslemeyi, katmanlı işleme hedeflerini ve ekran çıkışı kanal sırasını kapsadı. Oynanışın kendisi doğrulanmadı.",
      "strengths": [
        "Modeller, dokular, aydınlatma ve renklerle doğru bir ana menü.",
        "Açılış ve yükleme takılmaları düzeltildikten sonra eğitim sahnesi çiziliyor.",
        "Çıkış temiz bir 1080p sunumdur, ancak iç hedefler daha büyük olabilir.",
      ],
      "limits": [
        "Oynanış, kaydın geri yüklenmesi ve uzun oturum kararlılığı doğrulanmadı.",
        "Görsel bozukluklar sürüyor; kopyalar, kaynak hazırlığı ve GPU beklemeleri pahalı kalıyor.",
        "Menüde kararlı 15 FPS'ye ulaşılmadı.",
      ],
      "performance": "Ana menü medyanı: 9,4 FPS (9,0–9,5), önceden 4,9 FPS; ısınmadan sonra bir saniyelik 45 pencere sayacı örneği. RTX 3070 Ti, 1080p çıkış, iç çözünürlüğü oyun belirliyor. Tüm örnekler 15 FPS'nin altında. Eğitim performansı yeniden test edilmedi.",
      "imageAlt": "Karakter modelleri, okunabilir etiketler ve yoğun turuncu çimenle Big Helmet Heroes ana menüsü",
    },
    "tetris-effect-connected": {
      "status": "Geliştirici logoları · okunabilir lisans ekranı · Journey Mode seçimi · oynanış doğrulanmadı",
      "headline": "Logolar, lisans ekranı ve Journey Mode seçimi öncekinden çok daha hızlı çiziliyor.",
      "summary": "24 Eylül 2026'da PPSA07923 v2.000.022 ile doğrulandı. Çevrilmiş bir birleştirme önceki tahmine dayalı 4K geçersiz kılmaların yerini aldı; lisans ve menü sayfaları artık önceki sürümlerde görülen çift arayüz ve dikey dikiş olmadan çiziliyor. İki ekran da önemli ölçüde ucuzladı.",
      "strengths": [
        "Lisans ekranı ve menüler çift arayüz veya dikey sahne sınırı olmadan çiziliyor.",
        "Doğrusal meta veri doldurmalarını R11G11B10 ve RGB10A2 DCC temizlemeleriyle yayımlamak biriken arayüz kopyalarını giderdi.",
        "128 hedefli bir profil, daha küçük bir önbelleği sürekli boşaltıp doldurmak yerine yaklaşık 100 eklentilik çalışma kümesini tutuyor.",
      ],
      "limits": [
        "Koyu arayüz öğeleri ve çözülmemiş bir compute doku bağlaması hâlâ açık.",
        "Sonraki video oynatımı misafir H.264 kod çözücüsünde hata veriyor.",
        "Uzun çalıştırma kararlılığı ve oynanış kanıtlanmadı.",
      ],
      "performance": "Lisans karelerinin medyanı 235 ms'den 159 ms'ye, yaklaşık 4,3'ten 6,3 FPS'ye düştü. Örneklenen Journey kareleri 1127–1276 ms'den 318–396 ms'ye indi.",
      "imageAlt": "PS5PCEM tarafından çizilen erken bir Tetris Effect parçacık karesi",
    },
    "propagation-paradise-hotel": {
      "status": "Paketini bağlıyor, shader arşivini açıyor, ilk komut arabelleğini gönderiyor",
      "headline": "Unreal açılışını ilk gönderime kadar tamamlıyor.",
      "summary": "8,8 GiB'lık Unreal paketi bağlanıyor, ICU ve yapılandırma açılışı tamamlanıyor, pişirilmiş genel shader arşivi açılıyor, AGC shader'ları oluşturuluyor ve ilk komut arabelleği gönderiliyor. Gösterilen bir kare hakkında hiçbir şey iddia edilmiyor.",
      "strengths": [
        "8,8 GiB'lık Unreal paketi bağlanıyor ve motor açılışı tamamlanıyor.",
        "Pişirilmiş genel shader arşivi açılıyor ve AGC shader'ları oluşturuluyor.",
        "İlk komut arabelleği gönderime ulaşıyor.",
      ],
      "limits": [
        "Bu aşama güncel eşzamanlama paketi oluşturucularından önceye ait ve yeni bir çalıştırma gerektiriyor.",
        "VR sunumu için ana sistem tarafında bir başlık köprüsü yok; bu yüzden gösterilecek bir yer de yok.",
      ],
    },
    "pistol-whip": {
      "status": "VR modüllerini eşliyor, ardından Unity arşivlerini yüklüyor",
      "headline": "Unity varlık arşivlerini yüklemeye kadar ilerliyor.",
      "summary": "Yerel PS VR2 eklentisi ve Burst modülü eşleniyor ve oyun Unity varlık arşivlerini yüklemeye başlıyor. Bunun ötesindeki her şey, projenin bilerek ertelediği VR desteğine bağlı.",
      "strengths": [
        "Yerel PS VR2 eklentisi ve Burst modülü başarıyla eşleniyor.",
        "Unity varlık arşivlerinin yüklenmesi başlıyor.",
      ],
      "limits": [
        "Başlık, izleme, kumanda ve ana sistem OpenXR desteği bilerek ertelendi.",
      ],
    },
  },
  history: {
    "raiden-iv-audio-rendering-20261017": {
      "title": "Oynanabilir derecesi, kısmi ses düzeltmesi ve yeni oynanış görüntüsü",
      "imageAlt": "Oyuncu gemisi, düşman dizilişi, mermiler ve HUD ile Raiden IV oynanışı; skor 14000",
      "summary": "Geliştirici Oynanabilir · Bitirilebilir derecesini veriyor. NGS2 ses ayırma, ATRAC9 efektleri ve işleme geçişi/tanımlayıcı işleme iyileşiyor. İlk bölümdeki hareketli bir aralık 1.193 karede ortalama 39,75 FPS veriyor; sonraki çatışmalar yaklaşık 18–22 FPS'ye düşüyor. Arka plan müziği hâlâ yanlış ve oyunun bitirilmesi doğrulanmadı. Ekran görüntüsü yerel işleyiciden alındı.",
    },
    "astro-bot-storage-readbacks-20261016": {
      "title": "Depolama kopyaları azaldı; başlık ekranı ortalaması 20,07 FPS",
      "summary": "İşleyici kare başına 26,125 MiB'lık gereksiz ana sistem kopyasından kaçınıyor; kuyruk keşfi yaklaşık 117 tekrarlanan işaretçi denetimini atlıyor. Kesintisiz başlık ölçümü 2.640 karede 20,07 FPS; 60 karelik bloklar 18,39–21,68. 680 HLE testi, 274 Vulkan testi ve 64 yerel üzerine yazma yapılandırması geçiyor. On iki çözülmemiş depolama bağlaması ve ara sahne kusurları sürüyor; karakter kontrolü doğrulanmadı.",
      "imageAlt": "Depolama kopyası ve kuyruk keşfi değişikliklerinden sonra ASTRO BOT hareketli başlık ekranı",
    },
    "astro-bot-resource-walks-20261016": {
      "title": "Kaynak hazırlığı güncellendi; başlık ekranı ortalaması 17,83 FPS",
      "summary": "Ödünç alınan shader verisi, kompakt arama anahtarları, içerik parmak izleri ve önbelleğe alınmış döngü yazımları CPU işini azaltıyor. Etkisiz CPU skaler adımlarını atlamak 17,85 → 17,88 FPS ölçüyor; sonuçsuz bir fark. Son 2.640 karelik çalıştırmanın ortalaması 17,83 FPS; 582 GPU/Vulkan testi ve beş yerel yoklama geçiyor. On iki çözülmemiş depolama bağlaması ve ara sahne kusurları sürüyor; 20 FPS ve karakter kontrolü doğrulanmadı.",
      "imageAlt": "Kaynak taraması ve içerik denetimi değişikliklerinden sonra ASTRO BOT hareketli başlık ekranı",
    },
    "astro-bot-resource-costs-20261015": {
      "title": "Kaynak maliyetleri azaldı; başlık ortalaması 18,05 FPS",
      "summary": "Paketlenmiş doğrusal doku okumaları, daha küçük skaler çalışma alanı ve statik sorgu önbellekleri CPU işini azaltıyor. Sayaç destekli GPU beklemesi dengeli bir karşılaştırmada 17,78 → 18,02 FPS ölçüyor; kesintisiz 2.640 karelik doğrulamanın ortalaması 18,05 FPS. 573 GPU/Vulkan testi ve yerel doğrulama geçiyor. On iki çözülmemiş depolama bağlaması ve ara sahne kusurları sürüyor; karakter kontrolü doğrulanmadı.",
      "imageAlt": "CPU kaynak optimizasyonlarından sonra logo ve düğme istemiyle ASTRO BOT hareketli başlık ekranı",
    },
    "astro-bot-uniform-scan-20261015": {
      "title": "Tekdüze analiz okumaları ve doku taramaları azaltıldı",
      "summary": "AnyPS5/KytyPS5 incelemesi: kare başına kullanılmayan 49 CPU kanıt okumasını atlamak ve compute doku komut indekslerini yeniden kullanmak. Sonraki başlık karşılaştırması: mod başına 660 karede 14,95'e karşı 14,91 FPS; kanıtlanmış kazanç yok, 25 FPS'ye ulaşılmadı. 560 GPU/Vulkan testi ve yerel doğrulama geçiyor; 12 çözülmemiş depolama bağlaması sürüyor. Grafik tekdüze özelleştirmesi de denendi ve FPS'yi düşürdüğü için kapalı kalıyor.",
      "imageAlt": "Tekdüze okuma ve doku taraması doğrulaması sırasında ASTRO BOT başlık ekranı",
    },
    "astro-bot-entry-scalars-20261015": {
      "title": "Kanıtlanmış skaler okumalar yeniden kullanılıyor",
      "summary": "AnyPS5 ve KytyPS5 incelendi; kanıtlanmış giriş skaler okumaları için gereksiz hazırlık kaldırıldı. Başlık: mod başına 660 karede 14,92'ye karşı 15,02 FPS; ölçülen kazanç yok, 25 FPS'ye ulaşılmadı. Kare başına yaklaşık 411 arabellek hazırlığından kaçınılıyor. 558 GPU/Vulkan testi ve yerel grafik doğrulaması geçiyor.",
      "imageAlt": "Giriş skaleri doğrulamasından sonra ASTRO BOT başlık ekranı",
    },
    "astro-bot-descriptor-semantics-20261014": {
      "title": "Skaler okumalar ve bölünmüş doku tanımlayıcıları",
      "summary": "AnyPS5 incelemesi, kullanılmayan skaler arabellek alanları ve birden fazla yüklemeden birleştirilen sınırlı doku tanımlayıcıları için düzeltmelere yol açtı. Başlık: 660 karede 14,97 FPS. 556 GPU/Vulkan testi ve yerel yoklamalar geçiyor; daha geniş on RDNA2 hatası temel sürümde de görülüyor. Yeni görüntü; 25 FPS ve karakter kontrolü doğrulanmadı.",
      "imageAlt": "Skaler tanımlayıcı düzeltmelerinden sonra ASTRO BOT başlık ekranı",
    },
    "astro-bot-draw-capture-20261014": {
      "title": "Çizim yakalama ve önbellek karşılaştırması",
      "summary": "Başlık: ayar başına 660 karede 15,33'e karşı 15,22 FPS. Kullanılamayan yeniden oynatma verisi artık kopyalanmıyor veya özetlenmiyor. Daha büyük bir önbellek FPS'yi iyileştirmedi; varsayılan değişmeden kalıyor. 553 testin tamamı ve yerel Vulkan denetimleri geçiyor. Yeni başlık görüntüsü; 25 FPS ve karakter kontrolü doğrulanmadı.",
      "imageAlt": "Çizim yakalama optimizasyonundan sonra ASTRO BOT başlık ekranı",
    },
    "astro-bot-storage-layouts-20261014": {
      "title": "Depolama sahipliği ve skaler döngü bütçeleri",
      "summary": "Başlık karşılaştırması: ayar başına 660 karede 14,48'e karşı 14,26 FPS. GPU düzen dönüşümü dolguyu koruyor; dikdörtgen üzerine yazma kanıtları gereksiz yüklemeleri önlüyor. Ortak skaler taramalar kesin komut bütçeleri kullanıyor. 551 testin tamamı ve yerel doğrulama yoklamaları geçiyor. Yeni başlık görüntüsü; 25 FPS ve karakter kontrolü doğrulanmadı.",
      "imageAlt": "Depolama sahipliği değişikliklerinden sonra ASTRO BOT başlık ekranı",
    },
    "astro-bot-static-analysis-20261014": {
      "title": "Statik shader analizi ve dar doku düzenleri",
      "summary": "Başlık karşılaştırması: ayar başına 660 karede 14,25'e karşı 14,19 FPS. Değişmez çağrı/NGG analizi yeniden kullanıldı, arabellek sorguları ucuzladı ve Vulkan beklemeleri sınırlandı. Doğrulanmış 8/16 bit GPU düzen dönüşümleri eklendi; daha yavaş bir karşılaştırmadan sonra depolama yüklemeleri kapalı kalıyor. 548 test geçiyor. Yeni başlık görüntüsü; 25 FPS ve karakter kontrolü doğrulanmadı.",
      "imageAlt": "Statik shader analizi değişikliklerinden sonra ASTRO BOT başlık ekranı",
    },
    "astro-bot-scalar-merges-20261014": {
      "title": "Skaler analiz ve kuyruğa alınmış tamamlama",
      "summary": "Dengeli başlık karşılaştırması: ayar başına 660 karede 13,79'a karşı 13,43 FPS. Daha az tekrarlanan shader analizi, indeksli kirli arabellek tamamlama, kuyruğa alınmış karşılanmış beklemeler ve daha hızlı büyük kopyalar. 542 GPU/Vulkan testi geçiyor. Yeni başlık görüntüsü; 25 FPS'ye ulaşılmadı ve karakter kontrolü doğrulanmadı.",
      "imageAlt": "Skaler analiz optimizasyonlarından sonra ASTRO BOT başlık ekranı",
    },
    "astro-bot-bounded-recording-20261014": {
      "title": "Sınırlı kayıt ve kesin depolama kanıtları",
      "summary": "250 μs'lik bir komut kaydı bütçesi dengeli başlık karşılaştırmasını 11,69'dan 12,43 FPS'ye çıkardı. Sonraki depolama değişiklikleri 12,55'e karşı 12,49 FPS ölçtü: belirgin ek kazanç yok, ancak kare başına 26,125 MiB'lık gereksiz özetlemeden kaçınılıyor. 537 GPU/Vulkan testi ve 64 üzerine yazma yapılandırması geçiyor. Yeni başlık görüntüsü; 25 FPS ve karakter kontrolü doğrulanmadı.",
      "imageAlt": "Sınırlı komut kaydından sonra ASTRO BOT başlık ekranı",
    },
    "astro-bot-scalar-checkpoints-20261014": {
      "title": "Daha küçük skaler kontrol noktaları ve yüklemeler",
      "summary": "Yazmaç anlık görüntüleri bağımlılık takibini korurken önceki boyutun yarısına indi. Skaler yüklemeler yalnızca shader'ın kullandığı sözcükleri yazıyor. GPU/Vulkan testleri 535/535 geçiyor; yerel denetimler sıfır olmayan zehirli arabellekler kullanıyor ve değişen girdileri, döngüleri, pikselleri ve çalışan/ortak hazırlığı kapsıyor. 1.320 karelik bir başlık çalıştırması 11,62 FPS ölçtü. Dengeli yükleme karşılaştırması ayar başına 660 karede 11,79'a karşı 11,69 FPS ölçtü: gözlenen fark yalnızca %0,9. Yeni ekran görüntüsü veya karakter kontrolü denetimi yok; 25 FPS'ye ulaşılmadı.",
    },
    "astro-bot-cpu-baselines-20261014": {
      "title": "Daha az CPU görüntü kopyalama",
      "summary": "Kesin texel özetleri saklanan görüntü kopyalarının yerini alıyor, denetlenmiş misafir parmak izleri de geçici anlık görüntüyü gereksiz kılıyor. Dengeli başlık karşılaştırmaları: özet temelleri için 11,19'a karşı 10,83 FPS; doğrudan parmak izleri için 11,51'e karşı 11,36 FPS, ayar başına 660 kare. Her adım kare başına 26,125 MiB'lık bir CPU kopyasını kaldırıyor. Yerel denetimler dolguyu, daha yeni CPU yazımlarını, kullanılamayan parmak izlerini, iptal edilen hazırlığı ve yedek yolu kapsayan 32 yapılandırmada geçiyor; mip yayımlama da geçiyor. Yeni görüntü veya görsel/kontrol doğrulaması yok. 25 FPS hedefine ulaşılmadı.",
    },
    "astro-bot-relative-moves-20261014": {
      "title": "Dolaylı shader yazmaç taşımaları",
      "summary": "M0 indeksli yazmaç taşımaları artık dolaylı okuma/yazmaları, maskelenmiş şeritleri ve döngüleri koruyor. Yerel denetimler 128 GPU dispatch'inde geçiyor; GPU/Vulkan testleri 534/534 geçiyor. Isınmış hareketli başlık ekranı 1.320 karede 10,85 FPS ölçtü; önceki sürümle karşılaştırılabilir. Günlükte yeni çizim/dispatch hatası görünmedi. Yeni ekran görüntüsü veya görsel/kontrol doğrulaması yok; 25 FPS hedefine ulaşılmadı.",
    },
    "astro-bot-full-stores-20261014": {
      "title": "Kanıtlanmış tam görüntü yazımları",
      "summary": "Temkinli bir shader kanıtı, dolguyu, daha yeni CPU yazımlarını ve iptal edilen hazırlıktan sonra kurtarmayı korurken eski çıktı piksellerini yüklemekten kaçınıyor. Yerel GPU denetimleri anlık ve toplu komutlarla geçiyor; 532 GPU/Vulkan birim testi geçiyor. Dengeli başlık örnekleri: açıkken 9,45, kapalıyken 9,36 FPS, ayar başına 660 kare; kare başına 25,38 MiB yüklemeden kaçınılıyor. İlk eski raster geri okuma karşılaştırması 9,64'e karşı 9,67 FPS ölçtü ama hiçbir geri okumayı atlamadı. 25 FPS hedefine ulaşılmadı; yeni ekran görüntüsü veya karakter kontrolü sonucu yok. DCC etkin raster kaynakları aynı kapsama denetimleriyle dahil edildiğinde son karşılaştırma 9,68 FPS'ye karşı 10,95 FPS'ye ulaşıyor (ayar başına 660 kare, yaklaşık %13,1 daha hızlı) ve kare başına bir raster geri okumasından kaçınılıyor. Yerel testler DCC meta verisini de koruyor.",
    },
    "astro-bot-native-layouts-20261014": {
      "title": "Yerel görüntü aktarımları: doğruluk ve FPS denetimleri",
      "summary": "Yerel görüntü aktarımları GPU testlerinde texel'leri, dolguyu ve daha yeni CPU yazımlarını koruyor. Kesin arabellek okumaları yayımlanmış boşlukları koruyor; tamamlama grupları geçerli önceden alınmış kopyaları yeniden kullanıyor. Vulkan testleri 259/259 geçiyor. Dengeli başlık karşılaştırmaları yerel depolama aktarımlarıyla 9,42 FPS'ye karşı CPU yoluyla 9,55, ön getirme tamamlama düzeltmesinden sonra da 9,50'ye karşı 9,55 ölçtü. Bu deneysel aktarımlar varsayılan olarak kapalı kalıyor. Kesin iç arabellek okumaları ölçülen aralıkta hiç kullanılmadı. 25 FPS hedefine ulaşılmadı; yeni ekran görüntüsü veya karakter kontrolü sonucu iddia edilmiyor.",
    },
    "astro-bot-gds-publication-20261014": {
      "title": "GDS sıralaması ve tekrarlanan başlık ölçümleri",
      "summary": "Ertelenmiş GDS anlık görüntüleri sonraki sıfırlamalarda sayaç değerlerini koruyor; aktarım gruplama ve tam görüntü üzerine yazma işleme yerel denetimlerden geçiyor. Takip eden ısınmış başlık temeli 20 saniyede 9,20–9,65 FPS. Açık/kapalı karşılaştırmaları yaklaşık 9–10 FPS'de kalıyor ve bir hızlanma kanıtlamıyor. Vulkan testleri 256/256 geçiyor. Uyumsuz görüntü görünümleri hâlâ kare başına yaklaşık 20 MiB işleme hedefi geri okumasına yol açıyor. Yeni ekran görüntüsü veya karakter kontrolü denetimi yok: pencere otomasyonu kullanılamıyordu. 25–30 FPS hedefine ulaşılmadı.",
    },
    "astro-bot-performance-20261014": {
      "title": "İşleyici optimizasyonu: başlık ve kalabalık ölçümleri",
      "summary": "14 Ekim geliştirme sürümü: ısınmış başlık gözlemleri yaklaşık 9–10 FPS; kalabalık sahnesi 10 saniyede 46 kare gösteriyor (4,60 FPS). Ortak komut bankaları, sınırlı kaynak analizi, önbellek kurtarma ve yerel GPU aktarımları yükü azaltıyor. GPU testleri 272/272, Vulkan testleri 256/256 geçiyor. Son 2B depolamadan renge aktarım yerel yoklamaları geçiyor ama henüz canlı bir ölçümü yok. İşleme kusurları sürüyor, karakter kontrolü doğrulanmadı ve 25–30 FPS hedefine ulaşılmadı. Yeni görüntü yok; gösterilen görüntü 13 Ekim tarihli.",
    },
    "astro-bot-lighting-20261013": {
      "title": "Wave eşzamanlaması yatay aydınlatma bantlarını gideriyor",
      "summary": "Tüm wave'i kapsayan skaler dallar ve yakınsamış LDS bariyerleri tekrarlanan bantları düzeltiyor. BVH sınırları ve opak alt öğe işaretçileri düzeltildi; isteğe bağlı PSR v9 anlık görüntüleri yakalanan sorguyu 16.384 blokluk bir bütçeyle tamamlıyor. Sonraki örneklenen karelerde çizim/dispatch hatası bildirilmiyor, ancak anahtar açılmadan önce dört ısınma programı reddedildi. Karanlık/lekeli yüzeyler sürüyor; oynanış ve sürekli bir FPS kazancı doğrulanmadı.",
      "imageAlt": "Küçük araç ve düşmüş gemiyle ASTRO BOT varış ara sahnesi; karanlık ve lekeli yüzeyler sürüyor",
    },
    "astro-bot-startup-20261013": {
      "title": "Açılış düzeltmeleri ve yeşil bozulmanın giderilmesi",
      "summary": "JSON, APR, yazı tipi ve shader düzeltmeleri, yerel yazı tipi takma adları ve kapatılmış akustik yayılımla tanılama merkezi ara sahnesine ulaşıyor. SDWA düzeltmesi ağır yeşil bozulmayı gideriyor; bu ilk kontrol noktası hâlâ dört BVH compute programını reddediyor. Karakter kontrolü kanıtlanmadı.",
      "imageAlt": "Küçük araç ve düşmüş gemiyle ASTRO BOT varış ara sahnesi; karanlık ve lekeli yüzeyler sürüyor",
    },
    "yotei-renderer-followup-20261013": {
      "title": "Ortak işleyici iyileştirmeleri ve eksiksiz compute yeniden oynatmaları",
      "summary": "13 Ekim geliştirme sürümü: ağaç/ayarlar dizisi 30,001 saniyede 38 kare gösteriyor (1,27 FPS). Değişiklikler gereksiz Vulkan durum komutlarını ve dizi katmanı kopyalarını azaltıyor, shader meta veri okumalarını indeksliyor, büyük anlık görüntü shader'larını sıkıştırıyor ve aşırı CPU kare kapasitesini serbest bırakıyor. Yerel yoklamalar geçiyor; iki eksiksiz compute yeniden oynatması bağlı 26 ve 25 arabelleğin tamamını bayt bayt yeniden üretiyor. Ağaç çizgileri, aydınlatma kusurları, ağır aktarımlar ve ilk kullanım derlemesi sürüyor. Daha önceki bir BVH dolaşım takılması çözülmedi: tanılama yakalamaları eşzamanlama ekler ve düzeldiğini kanıtlayamaz. Çalıştırmalar Windows bellek payı düşükken durduruldu. Karakter kontrolü ve kontrollü bir FPS kazancı doğrulanmadı; son kare belleği değişikliğinin canlı ölçümü yok.",
      "imageAlt": "",
    },
    "goat-simulator-3-gameplay-20261013": {
      "title": "İlk çiftlik oynanışı görüntüsü ve sabit FPS örneği",
      "summary": "PPSA04158 v01.000.000: Eksiksiz oyun dosyalarıyla mevcut geliştirme çalıştırıcısı uzun dünya yüklemesini ve araba girişini geçiyor. Keçi, pusula ve Goat Castle hedefi görünüyor; klavyeyle hareket doğrulandı. Medyan 1,8 FPS (1,7–1,8), 30,011 saniyede 30 sabit pencere sayacı örneği. RTX 3070 Ti, 1080p çıkış, 3200×1800'e kadar iç hedefler, Hız ön ayarı; önbellekler korundu. Duraklatma kapatıldıktan sonra sahne ve HUD dikey olarak ters kalıyor; menü geçişleri alt kareleri tekrarlıyor. Gölgelendirme bozuklukları, desteklenmeyen 3B depolama görüntüleri ve çözülmemiş bağlamalar sürüyor. Ses kalitesi, kaydın yeniden yüklenmesi, çok oyunculu mod ve oyunun bitirilmesi doğrulanmadı.",
      "imageAlt": "Keçi, pusula ve hedefin ters çizildiği kontrol edilebilir Goat Simulator 3 çiftlik sahnesi",
    },
    "minecraft-legends-gameplay-20261013": {
      "title": "Kampanya veritabanı düzeltmesi ve ilk oynanış görüntüsü",
      "summary": "Gerçek yeniden adlandırma işlemleri desteklenmiyor hatalarının yerini alıyor ve LevelDB'nin CURRENT dosyasını yayımlamasına izin veriyor. 653 HLE testinin tamamı geçiyor. Tekrar kontrol edilebilir eğitim oynanışına ulaşıyor, ancak ağır grafik ve metin kusurları sürüyor. Bu bir geliştirme sürümüdür, oyunun bitirildiğine dair bir rapor değildir.",
      "imageAlt": "Atlı kahraman, can kalpleri, bozuk renkler ve siyah alanlarla Minecraft Legends eğitimi",
    },
    "police-simulator-career-20261012": {
      "title": "Kariyer oluşturma ve bölge seçimine ulaşıldı",
      "summary": "PPSA05831 v01.000.000: Açılış, Yeni Kariyer ve bölge onayı çalışıyor. Parlak yeşil çıktı ana menü arka planını bozuyor; ters arayüz ve özyinelemeli görüntü kopyaları vardiya seçimini engelliyor. Sokakta oynanış doğrulanmadı.",
      "imageAlt": "Arka planı ağır biçimde yeşile bozulmuş Police Simulator ana menüsü",
    },
    "monster-boy-gameplay-20261012": {
      "title": "İlk kontrol edilebilir bölüme ulaşıldı",
      "summary": "PPSA02787 v01.000.004: NGS2 port sorguları, klavye dokunuşları ve kayıt hizmetlerindeki düzeltmelerden sonra Yeni Oyun artık kaydediyor ve ilk bölümü yüklüyor. Hareket doğrulandı; büyük siyah çokgenler sürüyor.",
      "imageAlt": "HUD, karakter, kulübe ve siyah çokgen kusurlarıyla Monster Boy ilk bölümü",
    },
    "oxide-room-104-startup-20261011": {
      "title": "Otomatik kayıt bildirimi çiziliyor; sonraki işleme shader ve kuyruk hatalarına takılıyor.",
      "summary": "PPSA07653 v01.000.000: İki başlatma bağlamayı geçiyor. Otomatik Cross, FLAT adresleme, IMAGE_BVH_INTERSECT_RAY, InvalidScalarCall ve DMA_DATA reddi hatalarıyla siyah çıktıya ulaşıyor. Yalnızca klavyeyle yapılan tekrar otomatik kayıt bildirimini gösteriyor. Oynanış doğrulanmadı.",
      "imageAlt": "Koyu kırmızı arka planda beyaz simge ve Cross OK istemiyle Oxide Room 104 otomatik kayıt bildirimi",
    },
    "medieval-dynasty-startup-20261011": {
      "title": "Ana menü çiziliyor, ancak görselleri ve metni baş aşağı.",
      "summary": "PPSA07933 v01.413.001: Mevcut çalıştırıcı ana menüye ulaşıyor. Arka plan, logo ve seçenek metni dikey olarak ters. Bu denetimde betikli Cross bir bölüme girmiyor; oynanış doğrulanmadı.",
      "imageAlt": "Karlı köy görseli, logosu ve seçenek metni dikey olarak ters olan Medieval Dynasty ana menüsü",
    },
    "charons-staircase-startup-20261011": {
      "title": "Resimli giriş, orman yolu sahnesine geçiyor.",
      "summary": "PPSA06603 v01.000.000: Mevcut çalıştırıcı açılıştaki 3B orman yoluna ulaşıyor. 32,342 saniyelik bir geçiş karesi 26,810 saniyelik grafik pipeline ıskalarını içeriyor. Sahne çiziliyor, ancak karakter kontrolü ve oynanabilirlik doğrulanmadı.",
      "imageAlt": "Koyu ağaçlar, parlak yol aydınlatması ve mercek parlamasıyla Charon's Staircase açılış orman yolu",
    },
    "pac-man-world-re-pac-startup-20261011": {
      "title": "Açılış videosuna ve başlık ekranına ulaşıldı; video renkleri yanlış.",
      "summary": "PPSA06399 v01.000.002: Mevcut çalıştırıcı Unity başlatmasını geçiyor ve açılış videosundan sonra başlık ve koşullar ekranlarına ulaşıyor. Videoda ağır renk bozulması var. Otomatik Cross açılış ekranları arasında dolaşıyor; oynanış doğrulanmadı.",
      "imageAlt": "Koyu ada arka planı üzerinde PAC-MAN WORLD Re-PAC başlık logosu ve Cross istemi",
    },
    "keywe-pthread-audio3d": {
      "title": "İş parçacığı iptal durumu ve Audio3d içe aktarmaları açılışın önünü açıyor",
      "summary": "Önceki durumu döndüren ve bağımsız değişkenleri doğrulayan iş parçacığı başına iptal durumu, ayrıca sahiplenilmiş PCM kuyrukları, konum/kazanç ve eşzamanlı stereo karıştırma içeren yedi Audio3d API'si uygulandı. 635 HLE testinin tamamı geçiyor. Oyun kayıt yuvası seçimine ulaşıyor, ancak ardından gelen siyah ekran çözülmedi. Tam uzamsal ses ve oynanış kanıtlanmadı. Geliştirme sürümü.",
      "imageAlt": "Siyah arka planda üç boş yuva ve Select/Delete istemleriyle KeyWe SAVE SLOT paneli",
    },
    "super-woden-gp-pthread-cleanup": {
      "title": "İş parçacığı temizleme işleyicileri Unity açılışının önünü açıyor",
      "summary": "__pthread_cleanup_push_imp ve __pthread_cleanup_pop_imp, her misafir iş parçacığı için çağıranın sahip olduğu belleği kullanan ayrı bir LIFO listesiyle uygulandı. Pop, geri çağırmayı çalıştırmadan önce kaydı kaldırıyor; pthread_exit kalan işleyicileri TLS yıkıcılarından önce çalıştırıyor. 627 HLE testinin tamamı geçiyor. Üçüncü başlatma betikli Cross/Aşağı girişiyle harita menüsüne ulaşıyor. Görüntü 71,8 FPS gösteriyor, ancak ters etiketler ve yanlış bayrak renkleri sürüyor. Yarış test edilmedi. Geliştirme sürümü.",
      "imageAlt": "Açılış düzeltmesinden sonra hâlâ ters etiketler içeren Super Woden GP ana harita menüsü",
    },
    "arcade-spirits-pthread-semaphores": {
      "title": "Sayaçlı pthread semaforları açılışın ve açılış hikâyesinin önünü açıyor",
      "summary": "scePthreadSemInit, Wait, Trywait, Post ve Destroy ortak semafor deposu üzerinde uygulandı. Beklemeler park ediyor ve jeton tüketiyor; gönderim alıcısını uyandırmadan önce bir jeton ayırıyor. Boş yoklama, taşma, eskimiş tanıtıcılar ve meşgulken yok etme hata döndürüyor. 625 HLE testinin tamamı geçiyor. Yeniden derlenmiş imzalı çalıştırıcı menüye 30 okumada medyan 252,9 FPS ile ulaşıyor; otomatik Cross kullanan bir tekrar okunabilir altyazılarla açılış videosuna ilerliyor. Elle kontrol, oynanış ve ses kalitesi doğrulanmadı. Geliştirme sürümü.",
      "imageAlt": "Okunabilir altyazılarla Arcade Spirits açılışındaki Fist of Discomfort 2 Pro Tour videosu; pencere sayacı 200,3 FPS",
    },
    "arkanoid-fiber-startup": {
      "title": "Fiber açılışı düzeltildi, büyük menü atlasları geri geldi",
      "summary": "sceFiberGetInfo, sceFiberRename, işleme özel pthread_mutexattr_setpshared ve sceKernelFsync ile paylaşılan gerçek fsync uygulandı. Fiber başına sistem yazılımı yığınları taşmayı önlüyor; eşzamanlı taşıma, askıya alınmış yükleme işlerinin başka bir çalışanda sürmesine izin veriyor. Ayrı bir 512 MiB örneklenmiş görüntü yükleme sınırı, kare arabelleği sınırlarını yükseltmeden 16K BC7 menü atlaslarını kabul ediyor. 623 HLE ve 244 Vulkan testinin tamamı geçiyor; yeniden derlenmiş imzalı çalıştırıcı tekrarlanan başlatmalarda başlık ve mod menüsüne ulaşıyor. Menü medyanı: 30 örnekte 45,6 FPS. Oynanış doğrulanmadı; bu çalıştırma bir geliştirme sürümü kullanıyor.",
      "imageAlt": "Geri gelen Arkanoid: Eternal Battle başlık görseli ve START istemi; pencere sayacı 138,0 FPS",
    },
    "raiden-iv-startup-depth": {
      "title": "Açılış düzeltildi; ham derinlik temizlemeleri ilk bölümü geri getiriyor",
      "summary": "Yükleyici artık var olmayan 39 baytlık bir segmenti okumak yerine kütüphane sürümü meta verisini dinamik tablolardan ayırıyor. NGS2 dosya/rack sorguları ve yazı tipi önbelleği depolaması uygulandı; paketlenmiş 16 bit dokular artık doğru kanal sırasıyla yükleniyor. Tam ham derinlik düzlemi temizlemelerini Vulkan'a yayımlamak siyah bölümü gideriyor. Son otomatik girişli çalıştırma atışların ve düşmanların göründüğü ilk bölüme ulaşıyor. 921 yükleyici, HLE ve Vulkan birim testinin tamamı ve iki yerel GPU temizleme yoklaması geçiyor. Bu bir geliştirme sürümüdür; ATRAC9 örnekleyici oynatımı, canlı iş parçacığı iptali ve tam oynanabilirlik eksik.",
      "imageAlt": "Ateş eden oyuncu gemisi, düşmanlar, arazi ve HUD ile Raiden IV ilk bölümü; skor 4090",
    },
    "dead-cells-level-menu-audio": {
      "title": "Harmanlanmış sahne birleştirmesi ve özel örnekleyici sesi geri geldi",
      "summary": "Bir kopyalama kısayolu harmanlamayı yok sayıyor ve aydınlatılmış sahneyi siyah bir ışıyan görüntüyle değiştiriyordu. Onu yalnızca değiştirme harmanlamasıyla sınırlamak bölümü ve karakteri geri getiriyor. Özel NGS2 örnekleyici rack'i (0x4001) artık dalga biçimi formatını, blokları ve perdeyi kabul ediyor; menü karışımı sessizlikten tam ölçeğin yaklaşık 0,12'si civarında bir zirveye geçiyor. Müzik henüz dinlenerek doğrulanmadı. Başlangıç odasındaki yedi sayaç okuması 59,2–68,1 FPS aralığında; dövüş, ilerleme ve kayıtlar test edilmedi.",
      "imageAlt": "Aydınlık oda, karakter, eğitim istemi ve HUD ile Prisoners’ Quarters'da Dead Cells",
    },
    "dead-cells-ngs2-link": {
      "title": "NGS2 ses işlevleri Dead Cells'in bağlanmasını ve oynanışa ulaşmasını sağlıyor",
      "summary": "11 Ekim geliştirme sürümü, Dead Cells'in bağlanmak için ihtiyaç duyduğu sekiz libSceNgs2 işlevini uyguluyor: ses sisteminin ve rack'lerin arabellek destekli oluşturulması ve 3B ses geometrisi yardımcıları — dinleyici tabanı, mesafe azalması, koni, Doppler ve hoparlör kaydırması. Gözlenen her çağrı başarı döndürüyor. Ana menü doğru çiziliyor, pencere sayacında 71–72 FPS; oynanış HUD'u ve eğitim istemini gösteriyor, ancak bölüm ve karakter karanlık. Ana menü sessiz, oynanış ise duyuluyor.",
      "imageAlt": "Clean Cut Update başlık görseliyle Dead Cells ana menüsü",
    },
    "sarah-bounded-vertex-uploads": {
      "title": "Kanıtlanmış köşe noktası aralıkları büyük sprite yüklemelerini kaldırıyor",
      "summary": "10 Ekim geliştirme sürümü, gereğinden büyük sprite arabelleği kopyalarını kanıtlanmış köşe noktası aralıklarıyla değiştiriyor. Açılış karesi başına arabellek yüklemeleri yaklaşık 78 MiB'den 4,9 MiB'ye düşüyor. Hareket, zıplama ve sonraki platform ekranı doğrulandı; daha önceki bitirilmiş oyun raporu kayıtlı duruyor. 60 saniyelik açılış örneği: medyan 198,25 FPS, 187,8–203,2 FPS. Uyandıktan sonra: 197,25 FPS; sonraki platform ekranı: 144,35 FPS (her biri 30 saniye). Bunlar RTX 3070 Ti'de 1080p çıkış ve ses açıkken alınan pencere sayacı örnekleridir; oyunun tamamı için bir en düşük değer belirlemezler.",
      "imageAlt": "Sınırlandırılmış köşe noktası yüklemelerinden sonra Dreaming Sarah açılış ormanı",
    },
    "subnautica-acm-convolution": {
      "title": "ACM yankısı gecikmeli ve bozuk sesi düzeltiyor",
      "summary": "ACM artık evrişimli yankıyı hesaplıyor ve geçersiz ilk grup beklemesini reddediyor. Önceden FMOD yazılmamış çıktıyı efektlerine karıştırıyor, çıtırtı, NaN'ler ve uzun sessizlik üretiyordu. İki yeni başlatma 11–13 saniye içinde sonlu, sıfır olmayan PCM üretiyor; geliştirici sesin net olduğunu doğruluyor. Options ile ilgili önceki açıklama geri çekildi. 606 HLE testinin tamamı geçiyor. Kısa zamanlama kesintileri, işleme kusurları ve 30 FPS hedefi ayrı çalışmalar olarak sürüyor.",
      "imageAlt": "ACM evrişim ses yeniden testi sırasında Subnautica menüsü",
    },
    "asterix-msaa-depth-passes": {
      "title": "MSAA derinlik/stencil düzeltmesi açılış ormanında FPS'yi yükseltiyor",
      "summary": "9 Ekim geliştirme sürümü, yalnızca derinlik/stencil geçişlerinde örnek sayısını koruyarak stencil maskelerini geri getiriyor ve kare başına dört kazara tam kare geri okumasını kaldırıyor. Sabit açılış ormanında arayüz sayacı medyanları, RTX 3070 Ti'de 1080p çıkışta 30 saniyelik örneklerde 46,45'ten 162,20 FPS'ye çıkıyor. Hareket ve ilk Romalı karşılaşması yeniden denetlendi. 233 Vulkan testinin tamamı ve yerel 2×/4× yoklamaları geçiyor. Bu, 0.3.4 sonrası ortak bir işleyici düzeltmesidir; tüm bölümlerde bir en düşük değer veya yeni bir tam oynanış değildir.",
      "imageAlt": "MSAA derinlik/stencil düzeltmesinden sonra yeşil HUD göstergeleriyle açılış ormanındaki Asterix",
    },
    "quake2-raw-pcm-audio": {
      "title": "Yerel PCM, Quake II sesini geri getiriyor",
      "summary": "9 Ekim geliştirme sürümü, Quake II'nin kullandığı ham stereo PCM bloklarını, kompakt oynatma komutlarını ve 256 karelik NGS2 tanesini işliyor. 10 saniyelik bir tanıtım dizisi geri döngü kaydı tam sessizlikten, tamamen sessiz 10 ms bloğu olmayan duyulabilir çıktıya geçiyor. Tam yönlendirme ve efektler eksik; bu yeni bir oynanış veya FPS ölçümü değildir. 602 HLE testinin tamamı geçiyor.",
      "imageAlt": "Yerel PCM ses yeniden testi sırasında Quake II tanıtım dizisi",
    },
    "subnautica-audio-clock": {
      "title": "Ses saati düzeltildi; menü sesi ve FPS denetlendi",
      "summary": "Subnautica başlık ekranı onayından sonra zaten yerel ses üretiyordu. Derinliği bir olan kuyruktaki bir saat hatası artık düzeltildi. Ayrı 30 saniyelik menü örnekleri çıkış açıkken 14,4 FPS, çıkış kapalıyken 14,9 ve saat düzeltmesinden sonra 15,2 okuyor; bunlar arayüz sayaçlarıdır, kontrollü bir hızlanma iddiası değildir. Daha uzun kayıtlarda hâlâ kısa kesintiler var, bu yüzden çıtırtı tamamen çözülmedi.",
      "imageAlt": "Ses saati yeniden testi sırasında Subnautica menüsü",
    },
    "asterix-watched-video-buffers": {
      "title": "Açılış videosu artık yeniden kullanılan video arabelleklerinde takılmıyor",
      "summary": "9 Ekim geliştirme düzeltmesi, GPU sayfa izleme açıkken açılışı geri getiriyor. Eski okuyucu FFmpeg çıktısını, doku yüklemesinden sonra salt okunur hâle gelmiş misafir video sayfalarına doğrudan yazıyordu; bu yüzden oynatım üçüncü karede takılıyordu. Video ve ses artık izlenen misafir yazımlarını yayımlamadan önce mevcut ana sistem boru arabelleğini kullanıyor. Yeniden test açılış logosunu geçiyor ve oynanışa ulaşıyor. 597 HLE testinin tamamı geçiyor. Bu düzeltme 0.3.4'ten sonra geldi; daha önce doğrulanan oynanış derecesi korunuyor.",
      "imageAlt": "İzlenen video arabelleği açılış düzeltmesinden sonra Asterix oynanışı",
    },
    "jets-independent-audio-streams": {
      "title": "Bağımsız müzik ve efekt akışları; ses yeniden test edildi",
      "summary": "20 saniyelik bir görev menüsü geri döngü kaydında sessiz 10 ms blokların oranı 0.3.4'te %92,25 iken düzeltmeyle sıfıra indi. 13 saniyelik iki etkin çatışma aralığında da sessiz blok yoktu. Tam kayıtlarda geçişlerde ve oyuncu öldükten sonra sessizlik var. Ayrı ana sistem akışları aygıt devirlerinin yerini alıyor ve kurtarma artık etkin PCM halkası içinde dönüyor. 596 HLE testinin tamamı geçti. Bu, 0.3.4 sonrası bir geliştirme düzeltmesidir; yeni bir tam oynanış veya kontrollü bir FPS karşılaştırması değildir.",
      "imageAlt": "9 Ekim ses yeniden testi sırasında Pirate Base çatışması",
    },
    "jurassic-font-atlas-startup": {
      "title": "Yazı tipi atlası açılışı düzeltildi; ilk bölüme ulaşıldı",
      "summary": "a3d371e geliştirme commit'i, Font HLE'nin getirdiği açılış gerilemesini düzeltiyor. Koleksiyon ImGui atlasını oluştururken U+007F'yi istiyordu; bu eksik karakterin reddedilmesi CalcGlyphInfo doğrulamasını tetikleyip CarbonMainThread'i sonlandırıyor, diğer iş parçacıklarını bekleyen AGC komutlarında bırakıyordu. Eksik karakterler artık yazı tipinin .notdef glifini kullanıyor. İki yeniden test başlatması da hata noktasını geçti; ilk bölüm çizildi ve harita katmanı klavye girişine yanıt verdi. Tam Latin-1 atlas ölçümleri ve işleme denetimleri dahil 569 HLE testinin tamamı geçti. Bu kayıt açılış ve ilk bölüm yeniden testini kapsar.",
      "imageAlt": "PS5PCEM tarafından çizilen, yazı tipi atlası açılış düzeltmesinden sonra park kapılarında Jurassic Park ilk bölümü",
    },
    "yotei-cache-memory": {
      "title": "Ağaç sonrası darboğazlar ve daha düşük önbellek belleği",
      "summary": "Tekrar, eksik aydınlatma ve karakter yüzeyleriyle ağaçtan sonraki 3B ara sahneye ulaşıyor. Ağaç 1,231 FPS'de kalıyor; sonraki bir ara sahne aralığı 30 saniyede iki kare gösteriyor (0,067 FPS). 198 saniyelik bir geçiş karesi 177 saniyesini pipeline oluşturmaya harcıyor. Sonraki kareler ayrıca 1,4–2,6 GiB doku yeniden yüklüyor. Shader varyantları artık kanonik program baytlarını paylaşıyor ve büyük Windows sürücü önbelleği anlık görüntüleri geçici bir dosya eşlemesi kullanıyor. 256 MiB'lık yalıtılmış bir anlık görüntü testi yaklaşık 256 MiB ek özel bellek tasarrufu sağlıyor ve aynı dosyaları üretiyor. 21 önbellek testinin tamamı ve üç yerel Vulkan yoklaması geçiyor. Bu bellek değişikliklerinin yeni bir oyun FPS ölçümü yok; karakter kontrolü doğrulanmadı.",
      "imageAlt": "Ağaç sonrası eksik ara sahnenin üzerinde duraklatma katmanı",
    },
    "yotei-color-export-routing": {
      "title": "Renk dışa aktarma maskeleri ve eklenti yönlendirmesi",
      "summary": "İşleyici artık shader kanal maskelerine uyuyor ve kompakt renk dışa aktarmalarını, eklenti yuvaları arasındaki boşluklar dahil amaçlanan yüzeylere yönlendiriyor. Korunan pikselleri, karışık paketleme formatlarını ve maske değişikliğinden sonra pipeline yeniden kullanımını denetleyen altı yerel Vulkan yoklaması geçiyor. Etkin paketlenmiş UNORM harmanlama açıkça desteklenmiyor olarak kalıyor. Derleyici denemeleri yararlı bir hızlanma kanıtlamadı ve oyunda açılmadı. Tekrar ağaçta 1,231 FPS kaydediyor ve ağaçtan sonraki eksik ara sahneye ulaşıyor; karakter kontrolü doğrulanmadı.",
      "imageAlt": "",
    },
    "yotei-runtime-image-tables": {
      "title": "Çalışma zamanı doku tabloları ve kurtarılan disk önbelleği",
      "summary": "Küçük dolaylı doku tabloları artık tanımlayıcı adreslerini çalışma zamanı verisinde tutuyor; yalnızca yer değiştirme veya değişen özet çakışmaları için yeni pipeline oluşturmaktan kaçınılıyor. Yerel bir yoklama tek derlemeyle doğru çizilen üç geçişi doğruluyor; dokuz Vulkan denetimi geçiyor. Gereksiz yoklama önbelleği kopyaları kaldırıldıktan sonra canlı disk önbelleği yeniden kaydetmeye başladı. Kaydetme hataları artık bir hata bildiriyor ve önceki önbelleği koruyarak yeniden deniyor. Yeni bir oyun FPS kazancı veya karakter kontrolü doğrulanmadı; ağaç çizgileri, aydınlatma kusurları ve paketlenmiş renk harmanlama açık kalıyor. Tekrar, Medium zorlukta 30,049 saniyede 37 kare gösteriyor (1,231 FPS); önceki ağaç ölçümüyle aynı.",
      "imageAlt": "Çalışma zamanı doku aramalarıyla Medium zorluk menüsü; parlak ağaç çizgileri sürüyor",
    },
    "yotei-selected-flat-reads": {
      "title": "Daha az anlık görüntü okuması; daha düşük derleyici maliyeti",
      "summary": "Sınırlı FLAT okumaları artık veriyi yüklemeden önce eşleşen arabelleği seçiyor; çakışmaları, hizalanmamış adresleri ve hata raporlarını koruyor. Kontrollü bir shader yeniden oynatmasında derleme 46,55'ten 39,36 saniyeye, en yüksek özel bellek 3,96'dan 3,37 GB'ye düşüyor. Daha yavaş bir döngü varyantı bırakıldı. Yerel Vulkan denetimleri geçiyor. Bunlar oyun FPS'si değil, derleyici sonuçlarıdır; ağaç çizgileri, sonraki eksik işleme ve doğrulanmamış karakter kontrolü sürüyor. Kurulu çalıştırıcı ağaçta 30,046 saniyede 37 kare kaydediyor (1,231 FPS); kare hızında kanıtlanmış bir iyileşme yok.",
      "imageAlt": "Kurulu selected-FLAT çalıştırıcısında zorluk seçimindeki ağaç; parlak dikey çizgiler sürüyor",
    },
    "yotei-compiler-memory-audit": {
      "title": "İlk kullanımda shader derlemesi ve bellek baskısı",
      "summary": "Canlı bir iş parçacığı denetimi, ağaç sonrası takılma sırasında sürücü derlemesini doğruluyor. Yakalanan özgün compute modülü yalıtılmış bir yoklamada 59,47 saniye sürüyor ve en yüksek 7,40 GB özel belleğe ulaşıyor. Kaydedilmiş önbellek kaydını yeniden kullanmak 14 ms sürüyor; eski önbellek bir sonraki oyun tekrarı için yedeklendi. Çevrimdışı SPIR-V optimizasyonu bu durumu kayda değer biçimde iyileştirmiyor. Bunlar oynanış FPS'si değil, derleyici ölçümleridir. Ağaç çizgileri ve sonraki eksik işleme sürüyor; karakter kontrolü doğrulanmadı.",
      "imageAlt": "",
    },
    "yotei-compact-shader-analysis": {
      "title": "Daha az shader önbelleği belleği; ağaçta 1,26 FPS",
      "summary": "Kullanılmayan tanılama shader IR'si artık çözülmüş akış yürütmesi sırasında serbest bırakılıyor. Ağaçta önbelleğe alınmış 648 analiz bu ek dizilerde sıfır bayt tutuyor; özgün kodları ve çözülmüş komutları bozulmadan kalıyor. Tekrar 30,044 saniyede 38 kare gösteriyor (1,26 FPS); bu önceki örnek aralığında, dolayısıyla tekrarlanabilir bir hızlanma kanıtlanmadı. Beş odaklı test ve yerel Vulkan görüntü/malzeme yoklamaları geçiyor. Ağaç çizgileri sürüyor ve karakter kontrolü doğrulanmadı. Yerel çalıştırıcı ve eşleşen PDB bir yedekle güncellendi.",
      "imageAlt": "",
    },
    "yotei-sparse-regions-repeat": {
      "title": "Ağaç tekrarı: 1,23 FPS, ağaç sonrası bellek sınırı",
      "summary": "Güncellenmiş yerel çalıştırıcı ağaçta 30,043 saniyede 37 kare gösteriyor (1,23 FPS); önceki 1,26 FPS örneğine göre kanıtlanmış bir kazanç yok. Uzun ilk kullanım pipeline derlemesi ve desteklenmeyen paketlenmiş renk harmanlamayla eksik bir 3B ara sahneye ulaşıyor. Sistem taahhüdü sınırına yaklaşırken tanılama koruması çalıştırmayı 1.158 saniye sonra durduruyor. Karakter kontrolü doğrulanmadı; görüntüde çözülmemiş malzeme ve aydınlatma kusurları görülüyor.",
      "imageAlt": "Eksik malzeme ve aydınlatma ayrıntısıyla ağaç sonrası eksik sahne",
    },
    "yotei-sparse-material-regions": {
      "title": "Seyrek malzeme indeksleri ve daha küçük shader'lar",
      "summary": "Önceki ağaç tekrarı 1,26 FPS kaydediyor; ağır ilk kullanım takılmaları ve ağaç sonrası karanlık işleme sürüyor. Doku keşfi artık her ara kaydı değil, olası maskelenmiş indeksleri tutuyor. Yakalanan bitişik bellek sayfaları tek bir denetlenmiş bölgeyi paylaşıyor. Yerel geniş tablo parçası aynı piksel sonucuyla %22,8 daha küçük; 12 bellek okuma durumu ve 26 örnekleyici durumu Vulkan doğrulamasından geçiyor. Oyun tekrarı sürüyor. Oyun FPS kazancı ve karakter kontrolü henüz doğrulanmadı.",
      "imageAlt": "",
    },
    "yotei-integer-material-flat-reads": {
      "title": "Tamsayı malzeme indeksleri ve denetlenmiş bellek okumaları",
      "summary": "Yakalanan malzeme tablosu artık sahte dizi görüntüleri içeren 229 aday yerine 84 geçerli 2B dokuyu çözüyor. Canlı çalıştırma bu aramayı geçiyor ve sonraki desteklenmeyen bir FLAT okumasını ortaya çıkarıyor. Yeni denetlenmiş bellek yolu on Vulkan durumunda geçiyor; 26 örnekleyici durumu da geçiyor. Önceki ağaç tekrarı 1,16 FPS kaydediyor; kanıtlanmış bir hızlanma yok. İlk kullanım pipeline derlemesi ve ana sistem bellek baskısı hâlâ ağır takılmalara yol açıyor. Aydınlatma kusurları sürüyor ve karakter kontrolü doğrulanmadı.",
      "imageAlt": "",
    },
    "yotei-checked-material-samplers": {
      "title": "Malzeme örnekleyicisi kurtarıldı; ağır ağaç sonrası takılmalar sürüyor",
      "summary": "Birleşik örnekleyici/önbellek tekrarı ağaçta 1,23 FPS ve ondan sonra 60 saniyede beş kare (0,083 FPS) kaydediyor. Farklı bir ara sahne aralığı hızlanma iddia etmeyi engelliyor. Özgün malzeme reddi geçiliyor; aynı shader'daki sonraki bir doku araması desteklenmiyor olarak kalıyor. İşaretli indeks testleri ve 26 yerel Vulkan durumu geçiyor. Ağaç çizgileri, eksik aydınlatma ve paketlenmiş renk harmanlama çözülmedi. Karakter kontrolüne ulaşılmadı. Aday yalıtılmış kalıyor; kurulu çalıştırıcı değişmedi.",
      "imageAlt": "Malzeme işaretçisi tekrarında ağaçtan sonraki eksik karakter yüzeyleri",
    },
    "yotei-material-pointer-checks": {
      "title": "Ağaç tekrarı 1,30 FPS; malzeme işaretçisi kurtarma",
      "summary": "İçerik nesli tekrarı ağaçta 30 saniyede 39 kare, karanlık ara sahnede ise 60 saniyede yalnızca dört kare gösteriyor. Aydınlatma ve karakter geometrisi eksik kalıyor; karakter kontrolü doğrulanmadı. Yakalanan bir shader yeniden oynatması artık 60 doku tanımlayıcısını çözüyor. On yerel Vulkan durumu seyrek malzeme tablolarını doğruluyor ve etkin bir shader desteklenmeyen bir kaydı seçtiğinde hata bildiriyor. Yeni malzeme düzeltmesinin oyunda doğrulanması bekliyor.",
      "imageAlt": "Karanlık ağaç sonrası ara sahnede eksik karakterler",
    },
    "yotei-color-content-generations": {
      "title": "Paketlenmiş renk tekrarı; içerik önbelleği ve bellek düzeltmeleri",
      "summary": "Paketlenmiş UNORM adayı ağaçta 1,23 FPS kaydediyor. Sonraki karanlık bir ara sahne 60 saniyede bir kareye takılıyor; bu kararlı oynanış FPS'si değildir. Aydınlatma ve geometri bozuk kalıyor, harmanlanmış bir renk geçişi desteklenmiyor. Diğer önbellek nesli ve bellek grubu düzeltmeleri yedi Vulkan yoklama grubundan ve beş çekirdek testinden geçiyor; oyundaki faydaları henüz ölçülmedi. Karakter kontrolü doğrulanmadı.",
      "imageAlt": "Çözülmemiş aydınlatma ve geometri kusurlarıyla karanlık ağaç sonrası ara sahne",
    },
    "yotei-color-transfer-memory": {
      "title": "Ortak renk aktarımları; ağaç tekrarı 1,40 FPS",
      "summary": "Çalıştırıcı renk hedefleri için ayrı ana sistem geri okuma arabelleklerini kaldırıyor. Parlaklık ve ağaç tekrarlarının her biri 30 saniyede 42 kare gösteriyor; önceki 1,26'ya karşı yaklaşık 1,40 FPS. Önbellek geçmişi farklı olduğu için bu, iyileşmeyi yalıtmıyor. Ağaç çizgileri sürüyor; resimli videoya ulaşılıyor, ancak karakter kontrolü doğrulanmadı.",
      "imageAlt": "Ağaçlı zorluk ekranı; parlak çizgiler sürüyor",
    },
    "yotei-illustrated-movie-compilation": {
      "title": "Resimli videoya ulaşıldı; compute derlemesi takılıyor",
      "summary": "Güncellenmiş çalıştırıcı ağacı ve karanlık ara sahneyi geçerek resimli anlatım videosuna ulaşıyor. Karakter kontrolü hâlâ doğrulanmadı. Ağaç tekrarı 1,26 FPS'de kalıyor; salt okunur doku yeniden kullanım düzeltmesi ek bir oyun FPS kazancı göstermiyor. Sonraki bir kare, compute pipeline'larını oluşturmaya harcanan 234,9 saniye dahil 239,4 saniye sürüyor. Canlı doku önbelleği artışı sahne değişimiyle çakışıyor ve hızlanma kanıtlamıyor. Aydınlatma, çizgiler ve eksik bir piksel shader kaynağı açık kalıyor.",
      "imageAlt": "Ağaç ve karanlık ara sahneden sonra resimli video; karakter kontrolü doğrulanmadı",
    },
    "yotei-post-tree-texture-reuse": {
      "title": "Ağaç sonrası ara sahne: derleme ve doku çalkalanması",
      "summary": "Birleşik sürüm kurulumdan sonra çok karanlık bir ara sahneye ulaşıyor. Soğuk bir kare, 35,4 saniyelik grafik pipeline oluşturma dahil 59,3 saniye sürüyor. Bellek kullanımını sınırlamak için önbellekleri küçültmek kare başına birkaç GiB doku yüklemesine yol açıyor. Ayrı bir Vulkan regresyon testi, salt okunur depolama bağlamalarının artık örneklenmiş dokuları geçersiz kılmadığını doğruluyor. Oynanış FPS'si ve karakter kontrolü hâlâ doğrulanmadı; çizgiler ve eksik bir piksel shader kaynağı sürüyor.",
      "imageAlt": "Ağaçtan sonra çok karanlık ara sahne; karakter kontrolü doğrulanmadı",
    },
    "yotei-array-layer-coherence": {
      "title": "Dizi katmanı tutarlılığı: ağaç ayrıntısı geri geliyor",
      "summary": "Renk yüzeyi takibini seçili dilimlerle sınırlamak komşu katmanların GPU içeriğini geçersiz kılmasını önlüyor. Uyumlu örneklenmiş diziler artık kirli katmanları GPU'da yeniliyor. 30 saniyelik bir ağaç aralığı, farklı animasyon evreleri ve önbellek geçmişiyle, kontrol çalıştırmasındaki 1,03'e karşı 1,23 FPS kaydediyor. Ağaç kabuğu yeniden görünüyor, ancak parlak çizgiler sürüyor. Kurulumun ötesindeki yükleme hâlâ ana sistem bellek sınırına ulaşıyor; karakter kontrolü doğrulanmadı.",
      "imageAlt": "Ağaç kabuğu ve dallar görünüyor; parlak dikey çizgiler sürüyor",
    },
    "yotei-candidate-visual-check": {
      "title": "Aday denetimi: ağaçtaki bulanıklaşma sürüyor",
      "summary": "Üçüncü çalıştırma farklı önbellek bütçeleriyle ağaçta 1,30 FPS ölçüyor, ancak görüntü daha bulanık. İşleme hedefi sınırını geri getirmek bunu gözle görülür biçimde düzeltmiyor. Kullanıcı çalıştırmayı sahne hazırlığı sırasında kapatıyor; ara sahne sonrası oynanış doğrulanmadı. Bu doğrulanmış bir FPS kazancı değildir; temiz bir görsel karşılaştırma yapılana kadar kurulu çalıştırıcı temel olarak kalıyor.",
      "imageAlt": "Aday denetimi: ağaçtaki bulanıklaşma sürüyor",
    },
    "yotei-post-tree-dynamic-state": {
      "title": "Ağaç ölçümleri ve grafik pipeline yeniden kullanımı",
      "summary": "Değişiklikten önce ağaç aralıkları 0,83–0,97 FPS ölçüyor. Ağacın ötesine geçme yönündeki iki deneme Windows taahhüt sınırına yaklaşıldığında bilerek durduruldu. Dinamik derinlik sapması ve stencil referansları 1.007 pipeline'lık bir anlık görüntüden 61 gereksiz varyantı kaldırıyor; GPU yoklamaları geçiyor. Bu ölçülmüş bir oynanış FPS kazancı değildir ve parlak çizgiler sürüyor.",
      "imageAlt": "Zorluk seçimindeki ağaç; dikey parlak çizgiler hâlâ görünüyor",
    },
    "little-nightmares-saves-performance": {
      "title": "Kaydetme/yükleme doğrulandı; oynanışta 3,73–4,46 FPS",
      "summary": "Kayıt yazımları ve dosya yeniden boyutlandırma artık gerçek veriyi saklıyor; yeniden başlatma ve Devam açılış odasını yüklüyor. Ortak HTILE ve erken geri okuma değişiklikleri ile dört kopyalama çalışanı, ayrı 30 saniyelik örneklerde bavulun yanında 4,46 FPS, hareketten sonra 3,73 FPS sağlıyor. Kurulu yürütülebilir dosya ölçülen sürümle eşleşiyor. 5 FPS, doğru malzemeler ve güvenilir açılış çözülmedi; rapor eksik shader'ları ve aralıklı ayırıcı hatalarını kaydediyor.",
      "imageAlt": "Açılış odasında bavulun yanındaki Six; karanlık aydınlatma ve yansıtıcı malzeme kusurları sürüyor",
    },
    "little-nightmares-gameplay": {
      "title": "Açılış oynanışına ulaşıldı; 2,16 FPS ölçüldü",
      "summary": "Yerel compute halkası tüketimi tekrarlanabilir 510 karelik durmayı düzeltiyor. Ertelenmiş yazımlar ardından Yeni Oyun sırasında bir MallocBinned3 hatasını ortaya çıkarıyor; yeni bir erken yazım çalıştırması etkileşimli oynanışa ulaşıyor ve bilinçli bir durdurmadan önce 3.540 kare gösteriyor. Duraklatmasız iki 30 saniyelik örneğin her biri 65 kare gösteriyor: toplamda 2,16 FPS. Oyun profili erken yazımları otomatik olarak seçiyor. Grafik kusurları ve boş kayıt dosyaları sürüyor.",
      "imageAlt": "Açılış odasında çakmağıyla Six; malzemeler ve aydınlatma eksik",
    },
    "little-nightmares-startup": {
      "title": "Açılış ve tanımlayıcı düzeltmelerinden sonra başlık ekranı geri geldi",
      "summary": "Trinity modu ve IPMI içe aktarmaları, yerel grafik olayı değişiklikleri ve geçersiz dispatch boyutları çözüldü. Skaler BITSET'i düzeltmek görünür başlığı ve ilk çalıştırma arayüzünü geri getiriyor. İki başlatma başlık ekranına ulaşıyor; oynanış ve uzun oturum kararlılığı doğrulanmadı. Bir tekrar ilk çalıştırma kurulumu sırasında 120 saniyelik bir işleme iş parçacığı beklemesinden sonra kapanıyor; kararlılık kanıtlanmadı.",
      "imageAlt": "PS5PCEM tarafından çizilen Little Nightmares Enhanced Edition başlığı ve Press X istemi",
    },
    "subnautica-performance-repeat-2": {
      "title": "İkinci yeni işlem performans tekrarı",
      "summary": "İkinci yeni başlatma, aynı yürütülebilir dosya ve Survival kaydı: menü 15,50 FPS; duraklatmasız iki 30 saniyelik sabit dünya örneği 12,70 ve 8,50 FPS, toplamda 10,60 FPS. Çıkış 1080p, Hız ön ayarı, ısınmış önbellekler. Bu aralıklarda on saniyelik duraklama yok, ancak daha kısa gecikmeler sürüyor. Önceki başlatmanın ortalaması 9,52 FPS idi. Bu, çalıştırmalar arası farktır, yeni bir optimizasyon değil; 30 FPS'ye ulaşılmadı.",
      "imageAlt": "3 Ekim performans tekrarı sırasında Subnautica: Below Zero karlı kaza alanı ve hayatta kalma HUD'u",
    },
    "subnautica-performance-repeat": {
      "title": "Performans güncel çalıştırıcıda tekrarlandı",
      "summary": "3 Ekim tekrarı, PPSA02457 v1.022.125: kurulu çalıştırıcı Survival kaydını geri yüklüyor ve karlı kaza alanını ve HUD'u çiziyor. Bu çalıştırma, ortak GTA III işleyici değişikliklerinden sonraki güncel sürümü ölçer; yeni emülatör düzeltmesi eklemez. Ana menü: 14,67 FPS. Duraklatmasız iki 30 saniyelik sabit dünya örneği: 7,27 ve 11,77 FPS; toplamda 9,52 FPS. İlki 9,998 saniyelik bir takılma içeriyor. Çıkış 1080p, Hız ön ayarı, ısınmış önbellekler. Önceki geçerli örnek 7,93 FPS idi, ancak bu kontrollü bir hızlanma karşılaştırması değildir. 30 FPS'ye ulaşılmadı.",
      "imageAlt": "3 Ekim performans tekrarı sırasında Subnautica: Below Zero karlı kaza alanı ve hayatta kalma HUD'u",
    },
    "gta3-startup-reflections": {
      "title": "Video tamamlama ve yeşil yansıma yayımlama düzeltildi",
      "summary": "Gerçek başlatıcı, iki etkin emülatör önbelleği de yokken menüye 139 saniyede otomatik olarak ulaşıyor. Bekleyen arabellek ve depolama görüntüsü temizlemeleri daha yeni yansıma yüzlerinden önce tamamlanıyor; gözlenen yeşil perde ve neon yeşili yansımalar kayboluyor. Canlı sınırlı tekdüze korumalar etkin olmayan kaynak referanslarını hem hazırlamadan hem SPIR-V'den kaldırıyor. Test edilen açılış sahnesi sıfır çizim/dispatch hatası ve sıfır çözülmemiş depolama bağlaması bildiriyor. İndeksli kaynak denetimleri ve kompakt shader varyant anahtarları tekrarlanan hazırlık işini azaltıyor. Sabit bir açılış örneği 8,27 FPS kaydediyor; 10 FPS doğrulanmadı. Bildirilen hareket eden/çift gölgeler ve başlatmada reddedilen, yalnızca köşe noktası içeren bir çizim incelenmeye devam ediyor.",
      "imageAlt": "Açılış ve yansıma düzeltmelerinden sonra güncellenmiş kurulu çalıştırıcıdan GTA III açılış oynanışı",
    },
    "gta3-renderer-performance": {
      "title": "Renkler, yansımalar ve kaynak hazırlığı düzeltildi",
      "summary": "Güncellenmiş kurulu çalıştırıcı oyuncu kontrolüyle Give Me Liberty'ye ulaşıyor. Ölçülen açılış konumu örnekleri Performans modu, Bloom ve Motion Blur kapalı ve Classic Lighting açıkken 8,10–8,97 FPS'ye ulaşıyor. İşleme düzeltmelerine ortak skaler taramalar, bellekte kalan hacim/mip kopyaları ve daha düşük kayıt tutma maliyetleri eşlik ediyor. Rapor ayarları, daha yavaş örnekleri ve test sınırlarını kaydediyor; tam oynanabilirlik kanıtlanmadı.",
      "imageAlt": "Renk ve yansıma düzeltmelerinden sonra Callahan Köprüsü'nde GTA III oyuncusu ve araba",
    },
    "gta3-ngg-gameplay": {
      "title": "NGG dışa aktarmaları düzeltildi; açılış oynanışı ve hareket doğrulandı",
      "summary": "Kurulu çalıştırıcı görünür geometri, oyuncu, araç, HUD ve mini haritayla Give Me Liberty'ye ulaşıyor. W oyuncuyu hareket ettiriyor, D yönünü değiştiriyor. Ortak bir NGG dışa aktarma düzeltmesi 32 renk düzenleme katmanının tamamını geri getiriyor. Bir dünya örneği 0,97 FPS ölçüyor; ağır yeşil aşırı pozlama, eksik kaynaklar ve aralıklı çökmeler veya zaman aşımları sürüyor.",
      "imageAlt": "HUD ve ağır yeşil aşırı pozlamayla Callahan Köprüsü'nde bir arabaya doğru koşan GTA III oyuncusu",
    },
    "gta3-ampr-startup": {
      "title": "AMPR içe aktarmaları çözüldü; politika ekranına ulaşıldı",
      "summary": "2 Ekim geliştirme sürümü, PPSA03527 v1.007: eksik 13 AMPR içe aktarmasını çözmek çıkarılmış oyunun başlamasını sağlıyor. Cross girişi ilk boş aşamayı geçtikten sonra iki yeni işlem okunabilir politika ekranına ulaşıyor. Politika ekranı yaklaşık 30 FPS gösteriyor. Oynanış performansı ölçülmedi. Oynanış, kayıtlar ve ses doğruluğu doğrulanmadı. Shader tanılamaları ve eksik bekleme/sayaç emülasyonu sürüyor.",
      "imageAlt": "PS5PCEM tarafından çizilen GTA III Rockstar Games Policies and Terms ekranı",
    },
    "gta3-pkg-extraction": {
      "title": "NAPS hizalaması düzeltildi; paket eksiksiz çıkarıldı",
      "summary": "Çıkarıcı artık eboot.bin, altı modül ve iki PAK arşivi dahil 48 dosyanın tamamını yazıyor. İki PAK dizin sağlama toplamı da eşleşiyor ve 21 paket testinin tamamı geçiyor. Bu bir çıkarma denetimiydi; açılış sonucu ayrıca kaydedildi.",
    },
    "subnautica-startup": {
      "title": "Açılış çökmesi yanlış okunan bir shader başlığına bağlandı",
      "summary": "İlk çalıştırmalar hep aynı misafir adresinde duruyordu. Unity'nin shader okuyucusu dört baytlık örgü verisini işaretli bir dize uzunluğu olarak alıp eşlenmemiş belleğe bir sonlandırıcı yazmıştı. Arkasındaki dosya tanımlayıcısı davranışını düzeltmek oyunun açılışı geçmesini sağladı.",
    },
    "subnautica-menu-missing": {
      "title": "Menü, ses başlatması takıldığı için görünmüyordu",
      "summary": "Hareketli arka plan zaten çalışıyordu, ancak menü görünmüyordu: platform başlatma eşyordamı FMOD içinde durmuş, başlangıç ekranının beklediği hizmetleri sonsuza dek null bırakmıştı. Bunlar, yerel 1080p'ye geçişten önceki son 4K dönemi ölçümleriydi.",
      "imageAlt": "PS5PCEM tarafından çizilen, menüsü olmayan Subnautica: Below Zero başlık ekranı",
    },
    "subnautica-native-1080p": {
      "title": "Yerel 1080p çıkış ve daha ucuz kaynak hazırlığı",
      "summary": "Sunum yerel 1920×1080'e taşındı ve ortak grafik yolu, kaynak hazırlığı ve skaler yorumlama sırasında çözülmüş komut yapılarını kopyalayıp durmayı bıraktı. Play, Options ve Credits okunabiliyor; su ve aydınlatma bozuklukları sürüyor.",
      "imageAlt": "PS5PCEM tarafından çizilen, yerel 1080p'de Subnautica: Below Zero menüsü",
    },
    "subnautica-menu-performance": {
      "title": "Ortak çizim yolunda bir dizi CPU tarafı azaltma",
      "summary": "İndeks hazırlama, pipeline arama, skaler yazmaç anlık görüntüleri, kuyruk yoklama ve çalışma alanı başlatma, hiçbirinde oyuna özgü bir koşul olmadan ucuzlatıldı. Menü yaklaşık 17 FPS'de dengelendi — 30 FPS hedefinin hâlâ çok altında.",
      "imageAlt": "PS5PCEM tarafından çizilen, ölçülen geliştirme sürümünden Subnautica: Below Zero menüsü",
    },
    "subnautica-new-game": {
      "title": "Yeni Oyun açılış dünyasına ulaşıyor",
      "summary": "1 Ekim geliştirme sürümü, PPSA02457 v1.022.125: Survival yüklemeyi ve girişi geçiyor, ardından karlı kaza alanını ve HUD'u çiziyor. Düzeltmeler CPU belleğini eskimiş GPU geri yazımından koruyor, serbest bırakılmış depolama arabelleklerini emekliye ayırıyor ve yalnızca derinlik çizimlerinde rengi koruyor. RG32F eklentileri, mip görünümleri ve D16 gölge sapması destekleniyor. Bu doğrulama tam bir oynanışı, kaydın geri yüklenmesini veya ses doğruluğunu içermedi.",
      "imageAlt": "PS5PCEM'den alınan, hayatta kalma HUD'uyla Subnautica: Below Zero karlı açılış alanı",
    },
    "subnautica-lighting-baseline": {
      "title": "Aydınlatma temeli: yükleme hâlâ aralıklı",
      "summary": "Önceki sürümün üç ek çalıştırması, daha önceki iki çalıştırma oynanışa ulaşmışken, yükleme veya dünya geçişi sırasında başarısız oldu. Bir çalışan, ses sürerken durabiliyor ve pencere siyah kalıyor. Eski günlük, 1×1'lik bir mip'in 512×512 temel dokuyu yanlışlıkla yenilediğini de doğruluyor. Bu hatalar önceki başarılı çalıştırmadan ayrı kaydedildi; kararlı yükleme henüz kanıtlanmadı.",
    },
    "subnautica-colour-mips": {
      "title": "Renk mip örneklemesi GPU'da düzeltildi",
      "summary": "Bellekte kalan doku araması artık mip seviyelerini ve dizi dilimlerini ayrı tutuyor. Tam renk piramitleri GPU'da birleştirilebiliyor. Altı seviyeli bir RG32F yoklaması her seviyeyi, aynı karede yeniden yazmayı ve ek hedef geri okuması veya doku yüklemesi olmadan örneklemeyi doğruluyor; 128 odaklı test geçiyor. Oyun adayı, tanılama amaçlı eşzamanlı ve 8192 kayıtlı önbellek çalıştırmaları dahil, yükleme sırasında hâlâ hata veriyor. Dünyada FPS kazancı ve son aydınlatma sonucu doğrulanmadı.",
    },
    "subnautica-windows-stack": {
      "title": "Windows yığın sınırları tanılama çıktısı açılış hatasını düzeltiyor",
      "summary": "Bağımsız bir yeniden üretim, Windows hata ayıklama çıktısı sistem yazılımı yığınında çalıştığında 0x40010006 ile çıkıyordu. Yığın geçişi artık Windows sınırlarını güncelliyor ve misafir kaçışları çevreleyen HLE durumunu geri yüklüyor. ANSI/Unicode çıktısı, 8 yığın testi ve 9 yerel köprü testi geçiyor. Kurulu sürüm hata ayıklayıcı veya geçici dizin geçersiz kılması olmadan başlıyor ve kaydı geri yüklüyor. Duraklatmasız oynanış 30,02 saniyede 7,93 FPS kaydediyor. Bu kontrollü bir performans karşılaştırması değildir; 30 FPS, tam işleme doğruluğu ve uzun oturum kararlılığı doğrulanmadı.",
      "imageAlt": "Subnautica: Below Zero — Windows yığın sınırı düzeltmesi, 2026-10-02",
    },
    "subnautica-resource-scratch": {
      "title": "Daha az kaynak hazırlığı yükü; stencil uyarısının yeri bulundu",
      "summary": "Büyük dolaylı görüntü tabloları artık sıradan çizim/dispatch yığınlarını işgal etmiyor. Skaler işaretçi kurtarma değişmez bir yazmaç anlık görüntüsünü yeniden kullanıyor ve yalnızca uygun bit eşlem aralığını başlatıyor. 72 skaler/kaynak testi ve hedefli Vulkan yoklamaları geçiyor. Yeni bir işlem kaydı geri yüklüyor ve duraklatmasız oynanışta 30,01 saniyede 11,96 FPS kaydediyor. Farklı hava durumu ve ısınma kontrollü bir hızlanma iddiasını engelliyor; 30 FPS'ye ulaşılmadı. Sınırlı bir iz, kalan skaler kaynak uyarısını renk yazımları kapalı, yalnızca stencil içeren bir çizimde buluyor. Tam işleme doğruluğu ve uzun oturum kararlılığı doğrulanmadı. Ayrı bir iz, bellek kilidini tutan tekrarlanan 4 MiB'lık eşlemeleri buluyor. Fiziksel sayfa taahhüdünü yeniden kullanmak ve yinelenen yerel sorguları kaldırmak eşleme mikro ölçümünün medyanını %18 düşürüyor; oynanışta bir kazanç kanıtlanmadı.",
      "imageAlt": "Subnautica: Below Zero — kaynak hazırlığı sürümü, 2026-10-02",
    },
    "subnautica-descriptor-unmap": {
      "title": "Tanımlayıcı çalışma alanının yeniden kullanımı ve daha güvenli başarısız eşleme kaldırma",
      "summary": "Örneklenmiş görüntü tanımlayıcı güncellemeleri geçici dizileri yeniden kullanıyor; Vulkan grubunu değiştirmeden yığın çerçevelerini 753.720 bayttan 56 bayta indiriyor. Ayrı bir regresyon, kaldırılan yerel sayfaları okunabilir olarak işaretli bırakan eşleme kaldırma hatalarını düzeltiyor. 154 işleyici/indeks, 29 bellek ve 60 gönderim testi, 4352 karışık doku görünümü içeren Vulkan denetimleriyle birlikte geçiyor. İlk yeni yükleme kaydedilmiş dünyayı geri getiriyor; duraklatmasız sabit bir örnek 30,01 saniyede 12,03 FPS kaydediyor. Farklı hava durumu ve ısınma kontrollü bir hızlanma iddiasını engelliyor. Bir skaler kaynak çözülmedi. 30 FPS, güvenilir yükleme ve tam bir oynanış doğrulanmadı.",
      "imageAlt": "Subnautica: Below Zero — duraklatmasız 12,03 FPS örneği, 2026-10-02",
    },
    "subnautica-read-lease": {
      "title": "Daha küçük çizim yığını ve korunan misafir okumaları",
      "summary": "Yeniden kullanılabilir skaler depolama, çizim işlevinin yığınını 447.424 bayttan 32.640 bayta indiriyor. Özetleme sırasındaki başka bir yükleme çökmesi denetle-oku yarışını ortaya çıkardı: GPU girdi kopyaları ve özetler artık bitene kadar eşlemeyi tutuyor. Eşzamanlı eşleme kaldırma regresyonu, 34 bellek/yaşam süresi/indeks testi ve 60 gönderim testiyle birlikte geçiyor. İlk takip çalıştırması kaydedilmiş dünyayı geri yüklüyor ve duraklatmadan 30,01 saniyede 8,63 FPS ölçüyor. Farklı hava durumu ve ısınma, önceki 10,00 FPS örneğiyle doğrudan karşılaştırmayı engelliyor. Bir shader kaynağı çözülmedi; 30 FPS ve uzun oturum kararlılığı hâlâ doğrulanmadı. Aynı yürütülebilir dosyayla yapılan yeni bir tekrar yükleme sırasında hash + 0xf0'da hâlâ çöküyor. Korunan okuma regresyonu geçerli, ancak gözlenen bu çökme düzelmedi; hatalı çağıran inceleniyor.",
      "imageAlt": "Subnautica: Below Zero — misafir okuma kirası sürümü, 2026-10-02",
    },
    "subnautica-overlap-world": {
      "title": "İkinci kayıt geri yüklemesi ve arabellek çakışma ölçümleri",
      "summary": "Arabellek sahipliği düzeltmesinden sonra yeni bir işlem aynı kaydedilmiş dünyayı yeniden geri yüklüyor. Sınırlı çakışma sorguları, yazıcı sırasını veya 4096 kayıtlık önbellek sınırını değiştirmeden tam taramaların yerini alıyor. Duraklatılmış bir ABBA karşılaştırması doğrusal taramalar için 11,93–12,23 FPS, indeksli taramalar için 12,30–12,43 FPS veriyor; bu küçük fark kanıtlanmış genel bir kazanç değildir. Ayrı, duraklatmasız, sabit kameralı bir örnek değişen hava ve kırağıyla 30,01 saniyede 300 kare değişimi kaydediyor: 10,00 FPS. 154 arka uç/indeks testi ve beş hedefli Vulkan denetimi geçiyor. 30 FPS, uzun oturum kararlılığı ve tam işleme doğruluğu açık kalıyor.",
      "imageAlt": "Subnautica: Below Zero — duraklatmasız dünya, 2026-10-02",
    },
    "subnautica-save-recovery": {
      "title": "Arabellek sahipliği düzeltmesinden sonra kaydedilmiş dünya yükleniyor",
      "summary": "İzlenen 6 MiB'lık bir GPU geri okuması yükleme sırasında bozulmuş bir oyun nesnesiyle çakışıyordu. Arabellek önbellekleri artık eşleme sahipliğini izliyor; böylece eski bir adresteki yeni bir ayırma emekliye ayrılmış bir sonucu alamıyor. İlk takip çalıştırması kaydedilmiş karlı dünyayı geri yüklüyor ve yürüme girişine yanıt veriyor. Bu tek bir başarılı geri yüklemedir, uzun oturum kararlılığının kanıtı değildir. 29 bellek/emeklilik testi, 60 gönderim testi ve dört hedefli Vulkan yoklaması geçiyor. Yalnızca önbellek kapasitesini artırmak aynı duraklatılmış sahnede 9,93'ten 9,10 FPS'ye düşüş ölçtü; varsayılan değişmeden kalıyor. 30 FPS'ye hâlâ ulaşılmadı.",
      "imageAlt": "Subnautica: Below Zero — geri yüklenen dünya, 2026-10-02",
    },
    "subnautica-save-metadata": {
      "title": "Kayıt yazımları ve meta veriler düzeltildi; dünyanın yeniden yüklenmesi hâlâ başarısız",
      "summary": "Normal Kaydet artık 213.388 baytlık bir arşiv yazıyor, onu kesinleştiriyor ve oynanışa dönüyor. Yeni bir işlem yuvayı, hasarlı kayıt etiketi olmadan doğru tarih ve süreyle tanıyor. Ortak düzeltmeler POSIX dosya yazımlarını ve kayıt parametresi yapısının tamamını kapsıyor; 52 kayıt/dosya sistemi testi geçiyor. Dünyayı geri yüklemek hâlâ bellek bozulmasıyla karşılaşıyor, bu yüzden güvenilir kayıt geri yüklemesi iddia edilmiyor. Serbest bırakılmış komut arenası için ayrı bir denetim 60 gönderim testini geçiyor; yükleme hatasıyla bağlantısı kanıtlanmadı.",
    },
    "subnautica-vector-walk": {
      "title": "Daha ucuz CPU shader taramaları; dünya örneği 7 FPS'de kalıyor",
      "summary": "CPU kaynak taramaları, bağımlılık denetimlerini ve GPU komutlarını korurken yalnızca vektör içeren yorumlamayı atlıyor. Ayrı bir düzeltme vektör maske çıktılarının iki sözcüğünü de geçersiz kılıyor. 71 skaler testin tamamı ve dokuz GPU yoklaması geçiyor. Yalıtılmış taramalar %15–36 daha az sürüyor; en son 30 saniyelik dünya örneği, kontrollü bir önce/sonra kazancı olmadan 7,00 FPS kaydediyor. Kopyalama, kaynak hazırlığı ve gönderimler pahalı kalıyor. Klavye girişi artık ön plan odağını izliyor. Yükleme bozulması, çözülmemiş bir bağlama ve 30 FPS hedefi açık kalıyor.",
      "imageAlt": "Subnautica: Below Zero — 1920×1080 oynanış, 2026-10-02",
    },
    "subnautica-srgb-spans": {
      "title": "sRGB renk yazımları düzeltildi; mip denetimleri aralıklarını yeniden kullanıyor",
      "summary": "Yakalanan G-buffer ve son çıktı sRGB istiyordu ama UNORM eklentileri kullanıyordu; bu da renkler sRGB olarak geri okunduğunda onları karartıyordu. İşleyici artık renk yazımlarını kodluyor ve ekrana aktarım sırasında kodlanmış baytları koruyor. Bir GPU regresyonu, Vulkan doğrulaması dahil örneklemeyi, alfayı ve ekran çıkışını doğruluyor; 129 odaklı test geçiyor. Mip destek denetimleri de hesaplanan bayt aralıklarını koruyor. Canlı çalıştırmalar ve kalan sınırlar için rapora bakın. Yeni çalıştırma gözle görülür biçimde daha parlak malzemelerle karlı dünyaya ulaşıyor ve 30,05 saniyede 9,49 FPS kaydediyor (temel: 9,13 FPS). Farklı hava durumu ve efektler kontrollü bir hızlanma iddiasını engelliyor; 30 FPS, çözülmemiş skaler bağlama ve aralıklı yükleme hataları açık kalıyor.",
      "imageAlt": "sRGB renk yazımları düzeltildikten sonra Subnautica Below Zero karlı kaza alanı ve hayatta kalma HUD'u",
    },
    "subnautica-mip-coherence": {
      "title": "İzlenen mip belleği: tekrarlanan aktarımlar kaldırıldı",
      "summary": "Gerçek bir oyun izi kare başına on RG32F mip geri okuması (2730 KiB) ve ardından tekrarlanan yüklemeler buldu. Paylaşılan bellek doğrulaması artık doğrulanmış bir GPU yayımlamasını CPU tarafından yapılan bir değiştirmeden ayırıyor. Doğrusal/paketlenmiş mip'ler ve bellek takibiyle dört Vulkan durumunun tamamı, 129 odaklı testle birlikte geçiyor. Yeni oyun çalıştırmasında menü işleme hedefi yüklemeleri ve geri okumaları sıfıra iniyor ve on seviyeli piramit GPU'da kalıyor. Karanlık aydınlatma, aralıklı yükleme hataları ve 30 FPS hedefi açık kalıyor. Aday karlı dünyaya ulaşıyor; 30,01 saniyelik sabit bir örnek 260 kare değişimi (8,66 FPS) kaydediyor, dolayısıyla genel bir FPS kazancı kanıtlanmadı.",
      "imageAlt": "Mip tutarlılığı düzeltmesinden sonra Subnautica: Below Zero karlı kaza alanı ve HUD; karanlık aydınlatma sürüyor",
    },
    "yotei-intro-video": {
      "title": "Giriş videosunun kodu çözülüyor ve oynatılıyor",
      "summary": "Misafir video kütüphanesine verilen H.264 erişim birimleri artık ana sistemde çözülüyor, BT.709 katsayılarıyla NV12'den dönüştürülüyor ve ekran aralığı başına yaklaşık bir resim hızında veriliyor; böylece kareleri kabul edildiği hızda besleyen bir oyun bütün bir videoyu saniyeler içinde tüketmiyor. Videonun arkasındaki motor içi kare hâlâ siyahtı; bu yalnızca bir oynatma aşamasıydı.",
      "imageAlt": "PS5PCEM tarafından kodu çözülüp gösterilen bir Ghost of Yōtei giriş karesi",
    },
    "yotei-bonus-notices": {
      "title": "Girişten bonus bildirimlerine ve parlaklık ayarına",
      "summary": "Giriş oynatımı akışın kendi hızı olan yaklaşık 30 FPS'de kesintisiz hâle geldi ve çalıştırma akışla yüklenen menü kaynaklarından geçerek yükleme göstergesine, Digital Deluxe Bonus, Gift of the Northern Star ve Pre-order Bonus bildirimlerine ve parlaklık ayarına ilerledi — kurt görseli, talimatlar, kaydırıcı ve onay glifi okunabiliyor.",
      "imageAlt": "PS5PCEM tarafından çizilen, kurt görseliyle Ghost of Yōtei parlaklık ayarı ekranı",
    },
    "yotei-difficulty": {
      "title": "Zorluk seçimi yüklenmiş bir 3B sahnenin üzerinde çiziliyor",
      "summary": "Menü birleştirmesi, ağaçların ve arka planın bazı bölümlerinin göründüğü, menü müziğinin çaldığı gerçek 3B geometrinin üzerine çizilmiş zorluk seçimine ulaştı. Buraya ulaşmak birkaç dakikalık giriş ve sahne yüklemesi aldı ve kareler 0,6 FPS'de geldi.",
      "imageAlt": "PS5PCEM tarafından çizilen, yüklenmiş bir 3B sahne üzerinde Ghost of Yōtei zorluk seçimi",
    },
    "yotei-tree-scene": {
      "title": "Video sesi çalışıyor ve sonraki 3B sahneler görünüyor",
      "summary": "Çok kanallı ATRAC9, 2 ile 36 kanal arasındaki düzenlerde serpiştirilmiş mono akışlar olarak çözüldükten sonra giriş videolarına ses geldi; ses sessiz kalmak yerine ses parçasıyla uyumlu başlıyor. Çalıştırma ağaç sahnesi dahil sonraki 3B sahnelere 0,73 FPS'de ulaştı ve ardından gelen yükleme dizisi Vulkan aygıtını kaybetti.",
      "imageAlt": "PS5PCEM tarafından çizilen Ghost of Yōtei ağaç sahnesi",
    },
    "yotei-command-writes": {
      "title": "Komut işlemcisi yazımları ertelenmiş geri okumadan sağ çıkıyor",
      "summary": "Önbelleğe alınmış bir depolama arabelleğinin içindeki açık bir komut işlemcisi yazımı, üzerine daha eski bir GPU sonucu yayımlandığında kaybolabiliyordu; çünkü boşaltma yolu yalnızca arabelleğin taban adresini eşleştiriyordu. Çakışan arabellekleri indekslemek ve yalnızca kanıtlanmış yazım aralıklarını yayımlamak sonuçtaki başlık bozulmasını düzeltti.",
      "imageAlt": "PS5PCEM tarafından çizilen, komut yazımı düzeltmelerinden sonra Ghost of Yōtei ağaç sahnesi",
    },
    "yotei-null-images": {
      "title": "Tamamen sıfır dokular bağlanmamış sayılıyor; daha hızlı tanımlayıcı kurtarma",
      "summary": "Tamamen sıfır olduğu kanıtlanan dokular artık shader'ı reddetmek yerine bağlanmamış görüntü semantiği kullanıyor ve skaler tanımlayıcı kurtarma bir çağrı içindeki ara değerleri yeniden kullanıyor — iç içe bir test düzeneği 504 okumadan 18'e indi ve yalıtılmış olarak yaklaşık 4,6× daha hızlı çalıştı. Kurulu çalıştırıcının iki denetimi, ağaç sahnesinden önce GPU tamamlanmasını beklerken hâlâ takıldı ve tanılamadan sonra bilerek durduruldu.",
      "imageAlt": "PS5PCEM tarafından çizilen, 1 Ekim GPU beklemesinden önce Ghost of Yōtei Digital Deluxe Bonus bildirimi",
    },
    "bhh-startup": {
      "title": "Yükleme sırasındaki sonsuz bekleme düzeltildi",
      "summary": "Oyun, işlemi ve ses iş parçacıkları canlı kalırken ilk siyah karesinde veya kaynak yüklemesinin ortasında durabiliyordu: bir dosya okuması G/Ç hatası döndürdükten sonra yükleme iş parçacığı sonsuza dek bekliyordu. GPU tarafından izlenen dosya okumalarını doğru işlemek takılmayı giderdi.",
      "imageAlt": "PS5PCEM tarafından çizilen, açılış düzeltmesinden sonra Big Helmet Heroes ana menüsü",
    },
    "bhh-menu": {
      "title": "Doğru bir ana menü ve zamanın nereye gittiği",
      "summary": "Gen5 tek örnekli doku adresleme, katmanlı işleme hedefleri ve ekran çıkışı kanal sırası düzeltilince menü karakter modelleri, dokuları ve aydınlatmasıyla düzgün çiziliyor. Profil çıkarma, maliyetin pipeline derlemesinde değil ana sistem grafik arka ucunda — kaynak hazırlığı, misafirden Vulkan'a kopyalar ve eşzamanlama — olduğunu gösterdi.",
      "imageAlt": "PS5PCEM tarafından çizilen, karakter modelleri ve aydınlatmayla Big Helmet Heroes ana menüsü",
    },
    "bhh-copies": {
      "title": "Daha geniş döşeme kopyaları, daha ucuz çıkarma ve gruplanmış sayfa izleme",
      "summary": "Düzen dönüştürücü artık adres denklemi baytların bitişik olduğunu kanıtladığında tek tek piksel taşımak yerine tam 16 baytlık yatay bir şeridi kopyalıyor. Arabellek önbelleği çıkarma işlemi 4.096 kaydın tamamını taramayı bıraktı, bitişik misafir sayfaları gruplar hâlinde izleniyor ve tamamlanmış Vulkan arabellekleri yeniden kullanılıyor.",
      "imageAlt": "PS5PCEM tarafından çizilen, kopyalama optimizasyonlarından sonra Big Helmet Heroes eğitim sahnesi",
    },
    "bhh-menu-performance-20261010": {
      "title": "Daha az aktarım işi, çimen korunarak",
      "summary": "10 Ekim menü denetimi: 45 saniyede medyan 9,4 FPS (9,0–9,5), önceden 4,9 FPS. Kaynak tutarlılığı düzeltmeleri, sınırlı GPU geri okumaları, hacim yeniden kullanımı ve eşzamansız gruplama tekrarlanan işi azaltıyor. Ara bir stencil atma gerilemesi kaldırıldı ve yoğun çimen yeniden görünüyor. Örneklenen hata sayaçları sıfır; kararlı 15 FPS ve genel işleme doğruluğu doğrulanmadı.",
      "imageAlt": "Karakter modelleri, okunabilir etiketler ve yoğun turuncu çimenle Big Helmet Heroes ana menüsü",
    },
    "bhh-scalar-history": {
      "title": "Skaler kayıt tutma azaltıldı; gösterilecek bir kare hızı kazancı yok",
      "summary": "Kaynak kontrol noktaları kullanılmayan skaler yükleme geçmişini taşımayı bıraktı ve tam skaler analiz ileri ziyaretlerde gereksiz taramalardan kaçınıyor. Yalıtılmış test düzenekleri %9–45 ucuzladı, ancak eşleştirilmiş oyun örnekleri fiilen değişmedi — menüde kontroldeki 154,5 ms'ye karşı 157 ms — ve rapor bunu açıkça söylüyor.",
      "imageAlt": "PS5PCEM tarafından çizilen, skaler yükleme kayıt tutma değişikliğinden sonra Big Helmet Heroes eğitimi",
    },
    "quake-playable": {
      "title": "Oynanabilir ve bitirilebilir",
      "summary": "Geliştirici tam bir oynanışı doğruladı. Arkasındaki çalışma açılış içe aktarmalarını ve dizin listelemelerini, ertelenmiş G-buffer yazımlarını, derinlik karşılaştırma örnekleyicilerini ve model köşe noktalarının ve aydınlatma verisinin dayandığı türlendirilmiş arabellek okumalarını kapsadı. Eksik NPC geometrisi geri geldi.",
      "imageAlt": "PS5PCEM tarafından çizilen Quake II başlık ekranı",
    },
    "quake-rendering": {
      "title": "İşleme yeniden denetlendi; 60–70 FPS zirveler",
      "summary": "PPSA09477 v1.003 olarak yapılan yeniden denetim bölüm aydınlatmasını, dokuları, silahları ve NPC'leri görünür buldu; önceki karanlık dünya ve eksik model raporları çözüldü. Arabellek yeniden kullanımı ve GPU temizlemeleri aktarım yükünü azalttı; hafif sahneler 60–70 FPS zirve yapıyor, yoğun çatışma daha yavaş kalıyor.",
      "imageAlt": "PS5PCEM tarafından çizilen, aydınlık bölüm, görünen düşmanlar ve oyuncunun silahıyla Quake II oynanışı",
    },
    "tetris-first-render": {
      "title": "Açılış grafiğinden çıkan ilk tanınabilir kare",
      "summary": "595 misafir çizimi ve 63 compute dispatch'i reddedilen bir çizim olmadan tamamlandı ve ilk tanınabilir parçacık karesini üretti. Kayıtlı 4K çıkış hedefi hâlâ siyah olduğu için sunum 1920×1080'lik bir ara katmanı dönüştürmeye geri düştü — bu bir menü değil, erken bir işleme aşamasıdır.",
      "imageAlt": "PS5PCEM tarafından çizilen ilk tanınabilir Tetris Effect parçacık karesi",
    },
    "tetris-license-journey": {
      "title": "Lisans ekranı ve Journey Mode seçimi, birkaç kat daha hızlı",
      "summary": "Çevrilmiş bir birleştirme tahmine dayalı 4K geçersiz kılmaların yerini aldı ve doğrusal meta veri doldurmalarını yayımlamak çift arayüzü ve dikey dikişi giderdi. Lisans karelerinin medyanı 235 ms'den 159 ms'ye, örneklenen Journey kareleri 1127–1276 ms'den 318–396 ms'ye düştü. Koyu arayüz öğeleri ve bir misafir kod çözücü hatası sürüyor.",
    },
    "rita-intro-menu": {
      "title": "Yayıncı girişi, başlık menüsü ve arkasındaki sahne",
      "summary": "Oyun kararlı bir 1920×1080 grafik ve ses döngüsüne oturdu ve hareketli yayıncı dizisini, başlık menüsünü ve menü sonrası sahneyi çizdi. Sahne, CRT ve son işleme zincirinden geçirilen gerçek bir 480×270 misafir hedefinden geliyor ve eski tam ekran parazitin yerini aldı.",
      "imageAlt": "PS5PCEM tarafından çizilen Mighty Morphin Power Rangers: Rita's Rewind yayıncı girişi",
    },
    "rita-playable": {
      "title": "Oynanabilir ve bitirilebilir",
      "summary": "Geliştirici 24 Eylül'de tam bir oynanışı doğruladı. Görüntüde Command Center eğitim aşamasında HUD, can çubuğu, hedefler ve düğme istemleriyle, kumanda girişine yanıt veren Red Ranger görülüyor. Dar biçimde eşleşen CRT ölçekleme yedeği referans sistemde hâlâ gerekli.",
      "imageAlt": "PS5PCEM tarafından çizilen, Command Center'da Red Ranger ile Rita's Rewind oynanışı",
    },
    "jets-tutorial": {
      "title": "START GAME 4K eğitim oynanışına ulaşıyor",
      "summary": "Oyun içeriği çözüldü, AGC kaynak kaydı tamamlandı ve tam grafik, compute ve çıkış döngüsü sürdü. START GAME yükleme ekranını geçerek tanınabilir 3840×2160 eğitim oynanışına ulaştı ve gözetimsiz bir çalıştırma 300. kare değişiminden sonra da canlı kaldı.",
      "imageAlt": "PS5PCEM tarafından çizilen Jets 'n' Guns 2 eğitim oynanışı",
    },
    "jets-playable": {
      "title": "Oynanabilir ve bitirilebilir",
      "summary": "Geliştirici tam bir oynanışı doğruladı. Bölümler, HUD, skor, düşmanlar ve paralaks sahne doğru çiziliyor. 70 ms'lik bir karenin profili, 33 gönderim boyunca GPU'yu beklemeye 18 ms, kaynak kontrol noktalarına 11 ms ve 894 misafir arabelleğini hazırlamaya 13 ms harcandığını buldu.",
      "imageAlt": "PS5PCEM tarafından çizilen, oyuncu gemisi, HUD ve skorla Jets 'n' Guns 2 oynanışı",
    },
    "jets-audio": {
      "title": "Ses artık kendini yıkmıyor",
      "summary": "İki etkin çıkış portu ana sistem ses aygıtı için yarışıyor, karışımı yıkıp aygıtı kare başına birkaç kez yeniden açıyordu. 0.3.2 sürümü yönlendirmeyi düzeltti; mevcut oynanabilir ve bitirilebilir durum etkilenmedi.",
    },
    "cat-quest-render-fixes": {
      "title": "Baş aşağı dünya, bozuk metin ve yer değiştiren renkler düzeltildi",
      "summary": "Arayüz düzgünken dünya baş aşağı çiziliyordu; parça kapsamı ve yalnızca stencil geçişleri menü metnini bozuyordu; özgün AGC interpolant eşleme arayüzü eksikti, bu yüzden macera görselleri ve manzara yanlış köşe noktasından parçaya dışa aktarmaları kullanıyordu; kayıtlı ekran çıkışı formatları da yok sayılıyor, kırmızı ve mavi yer değiştiriyordu. Dördü de düzeltildi.",
      "imageAlt": "PS5PCEM tarafından çizilen, okunabilir metni panelinin içinde kırpılmış Cat Quest III dil listesi",
    },
    "cat-quest-playable": {
      "title": "Oynanabilir ve bitirilebilir",
      "summary": "Geliştirici tam bir oynanışı doğruladı. Bununla birlikte örneklenen kare başına shader çevirisi işi yaklaşık 40 ms'den 7 ms'ye, arabellek yüklemeleri de yaklaşık 125 MiB'den 65–75 MiB'ye düştü ve açılış adası yaklaşık 148 ms'den 124 ms medyana indi.",
      "imageAlt": "PS5PCEM tarafından çizilen, HUD, dağlar ve mavi denizle Cat Quest III ada oynanışı",
    },
    "precinct-title-menu": {
      "title": "İki giriş videosu, başlık menüsü ve ilk oynanış karesi",
      "summary": "Altı görüntülük misafir grafiği bağlandı, Unity eklentileri başladı ve başlık görseli ile okunabilir bir NEW GAME onayı görünmeden önce iki giriş videosu stereo sesle eşzamanlı 4K video olarak oynatıldı. Daha önceki korumalı bir çalıştırma Cross istemine ulaştı ve doğrulanmış ilk motor içi oynanış görüntüsünü üretti.",
      "imageAlt": "PS5PCEM tarafından çizilen, NEW GAME onayıyla The Precinct başlık menüsü",
    },
    "sarah-playable": {
      "title": "Kare sınırında oynanabilir ve bitirilebilir",
      "summary": "Doğrulanmış bir oynanış; başlık menüsü ve ilk sahne 60 FPS sınırında kalıyor — 90 saniyede 5.280 kare değişimi. Yükleme için önce eboot.bin ve sce_module/libc.prx dosyalarının, kopyanın kendi eboot yamalayıcısının ikisini de kestikten sonra bıraktığı yedeklerden geri yüklenmesi gerekti.",
      "imageAlt": "PS5PCEM tarafından çizilen, bir NPC ile Dreaming Sarah orman sahnesi",
    },
    "terminator-playable": {
      "title": "Oynanabilir ve bitirilebilir",
      "summary": "Hiçbir sorun bildirilmeden bitirildi. Arka planlar, karakterler, HUD, dokular ve renkler doğru; ısınmış açılış kareleri 22–65 ms ölçüyor. Doku alfası, kanal karıştırmaları ve sRGB örnekleme amaçlanan renk dengesini koruyor.",
      "imageAlt": "PS5PCEM tarafından çizilen, oyuncu karakteri, HUD ve çöl sahnesiyle Terminator 2D oynanışı",
    },
    "asterix-playable": {
      "title": "Oynanabilir ve bitirilebilir",
      "summary": "Kare başına 28–31 ms'de doğrulanmış bir oynanış; 3.000 kare değişimlik bir geliştirme çalıştırmasında reddedilen gönderim yok. Tam ekran birleştirme GPU'da kalıyor ve ekran çıkışı ana belleğe gidip gelmeden misafir görüntü alanının yönünü koruyor.",
      "imageAlt": "PS5PCEM tarafından çizilen, HUD ve GO işaretiyle Asterix & Obelix: Slap Them All! oynanışı",
    },
    "jurassic-playable": {
      "title": "Oynanabilir ve bitirilebilir",
      "summary": "Doğrulanmış bir oynanış. Açılış işleme; başlık logosu, onay istemi, koleksiyon kapak görselleri ve hareketli önizlemeyle birlikte geri geldi. Önizlemeler arasında art arda geçiş yapmak hâlâ bir medya tanıtıcı havuzunu tüketebiliyor; bundan sonra sonraki önizlemeler donuyor.",
      "imageAlt": "PS5PCEM tarafından çizilen, kapak görselleriyle Jurassic Park Classic Games Collection seçim ekranı",
    },
    "reanimal-title-menu": {
      "title": "Etiketleri eksik hareketli bir 4K başlık menüsü",
      "summary": "Yerel ve sistem yazılımı modülleri çözüldü, şirket logosu dizisi oynatıldı ve hareketli 3840×2160 başlık menüsü şamandıralı arka planı, başlık logosu, su parlamaları ve SELECT istemi görünür hâlde sürdü. Ortadaki seçenek etiketleri hâlâ yalnızca küçük kırmızı işaretler; bu yüzden gezinme hiç doğrulanmadı.",
      "imageAlt": "PS5PCEM tarafından çizilen, seçenek etiketleri eksik REANIMAL hareketli başlık menüsü",
    },
    "propagation-bootstrap": {
      "title": "İlk gönderime kadar Unreal açılışı",
      "summary": "8,8 GiB'lık paket bağlandı, ICU ve yapılandırma açılışı tamamlandı, pişirilmiş genel shader arşivi açıldı, AGC shader'ları oluşturuldu ve ilk komut arabelleği gönderildi. Çalıştırma güncel eşzamanlama paketi oluşturucularından önceye ait ve tekrarlanması gerekiyor.",
    },
    "pistol-whip-modules": {
      "title": "VR modülleri eşleniyor, Unity arşivleri yüklenmeye başlıyor",
      "summary": "Yerel PS VR2 eklentisi ve Burst modülü eşlendi ve oyun Unity varlık arşivlerini yüklemeye başladı. Bunun ötesindeki ilerleme, projenin bilerek ertelediği başlık, izleme ve ana sistem OpenXR desteğini bekliyor.",
    },
  },
};

export default tr;

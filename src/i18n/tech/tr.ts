import type { TechCopy } from "./en";

const tech: TechCopy = {
  hle: {
    title: "HLE, üst düzey sistem yazılımı emülasyonu",
    summary: "HLE, PS5PCEM'in bir oyunun içe aktardığı sistem yazılımı çağrılarını yanıtlama biçimidir. Her sayısal NID, ana sistem yığınında çalışan bir Zig işlevine dönüşür; Windows'ta misafirin System V çağrı kuralı korunur.",
    sections: [
      {
        heading: "Sistem yazılımı neden oyunun içinde değil",
        paragraphs: [
          "Bir PlayStation 5 oyunu çağırdığı işletim sistemini yanında taşımaz. İçe aktarmaları 11 karakterlik tanımlayıcılardır. PS5PCEM her tanımlayıcıyı dışa aktarma adından hesaplar: adın ve sabit bir tuzun SHA-1'i, ardından özetin ilk sekiz baytı bir base64 varyantında. Bir uygulama okunabilir ad altında kaydolur ve o adın üretmesi gereken tanımlayıcıyı şart koşabilir; böylece yanlış yazılmış bir dışa aktarma modül derlenirken hata verir.",
          "Dinamik bağlayıcı tanımlayıcıyı kütüphane, modül ve sürümleriyle birlikte arar. Aynı tanımlayıcı birden fazla kütüphanede bulunabilir. Kullanılabilir meta verisi olmayan içe aktarmalar için yalnızca tanımlayıcıyla arama da vardır; belirsiz olduğu için bu yedek yol son çare sayılır.",
        ],
      },
      {
        heading: "Çağrı ana sistem yığınında çalışır",
        paragraphs: [
          "Misafir sistem yazılımını doğrudan çağırır, bu yüzden çağrı misafir iş parçacığının yığınında başlar; oyun bunu istediği için bu yığın çoğu zaman bir megabayttır. Dosya açmak gibi ana sistem işleri çok daha büyük bir çerçeve ister. Derleyici bu çerçeveyi girişte, herhangi bir erken dönüşten önce ayırır. Bu yüzden bir sistem yazılımı gövdesi, alana ihtiyaç duyan satıra varmadan misafir yığınının dışına taşabilir ve hata tüm misafir eşlemelerinin dışına düşer.",
          "Her HLE çağrısı, ana sistem işi süresince iş parçacığı başına bir ana sistem yığınına geçer. Bağımsız değişkenler bellek üzerinden taşınır; böylece kayan noktalı ve bileşik dönüşler dahil her imzaya tek bir assembly saplaması hizmet eder. İç içe sistem yazılımı çağrıları, dıştaki çağrının kurduğu yığında kalır. Windows'ta misafir System V AMD64 kuralını, ana sistem ise Microsoft x64'ü kullanır; bu yüzden misafirin çağırabildiği her işlev misafir kuralıyla bildirilir. Bu bildirimi unutmak yine derlenir, ama bağımsız değişkenleri yanlış yazmaçlardan okur.",
        ],
      },
      {
        heading: "HLE yüzeyi neleri kapsıyor",
        paragraphs: [
          "Bu altyapının üzerinde sistem yazılımı kütüphaneleri doğrudan ve esnek belleği, modül tanıtıcılarını, pthread'leri, eşzamanlamayı, dosyaları, kayıt verilerini, fiber'ları, yazı tiplerini, PNG'yi, saati, kumandaları, AudioOut, AJM, NGS2, ACM, AvPlayer, APR ve AMPR'yi sağlar. Ağ, SSL ve NP Web API bağlam ve istek yaşam sürelerini korur ve belirlenimci çevrimdışı hatalar döndürür. Sistem kabuğu gerektiren diyaloglar tutarlı, arayüzsüz bir sonuçla hemen tamamlanır.",
          "10 Ekim doğrulama çalıştırması ReleaseSafe HLE paketinin tamamını, 606 testin 606'sını geçti. Bu sayı sistem yazılımı paketidir. Tek başına yeni bir kare hızı veya yeni bir bitirilmiş oynanış kaydetmez.",
        ],
      },
    ],
    works: [
      "NID hesaplama, sürümlü bir sembol kaydı ve her sistem yazılımı çağrısı için ana sistem yığınına geçiş.",
      "Ana sistem kuralının Microsoft x64 olduğu Windows'ta misafir System V çağrıları.",
      "Bellek, dosyalar, iş parçacıkları, kayıt verileri, medya, ses kodekleri ve APR/AMPR komut yolu.",
      "Arayüzsüz diyaloglar ve ana sistem soketleri açmayan çevrimdışı bir ağ profili.",
    ],
    gaps: [
      "Oyunun içe aktardığı ve PS5PCEM'in uygulamadığı kütüphaneler hâlâ içe aktarmada başarısız olur.",
      "Yayımlanan grafikte olmayan bir modülün gerçekten isteğe bağlı yüklenmesi hata döndürür.",
      "Gerçek bir kabuk, hesap veya ağ eşi gerektiren platform hizmetleri kullanılamaz durumda kalır.",
    ],
  },

  ampr: {
    title: "AMPR sayaçları",
    summary: "PS5PCEM'deki AMPR, konsolun sayaç ve tamamlama komutlarının işleme özel bir yazılım modelidir. Yüz yirmi sekiz sayaç, gönderim sırasıyla yazımları, atomik alan güncellemelerini, eşli okumaları ve maskeli beklemeleri kabul eder.",
    sections: [
      {
        heading: "Bir oyun AMPR'yi ne için kullanır",
        paragraphs: [
          "Konsolda AMPR, dosya verilerini taşıyan ve CPU ile GPU'nun bekleyebildiği sayaçları güncelleyen eşzamansız motordur. Oyunlar onu, ortak bir değişken üzerinde dönmeden bir okumanın tamamlandığını veya sonraki bir geçişin başlayabileceğini bilmek için kullanır. PS5PCEM, AMPR donanım bloğunu emüle etmez. Oyunun oluşturduğu komut akışını işlemin içinde yürütür ve tamamlanmayı oyunun kaydettiği AMPR olay kuyruğu üzerinden bildirir.",
          "Sayaç bankası 32 bitlik 128 sözcük tutar. Bir çift, çift numaralı bir sayaç ile sonraki sözcüktür ve tek bir 64 bitlik değer olarak okunup yazılır. Tek bir kilit iki yarıyı ve her oku-değiştir-yaz işlemini kapsar; böylece bir okuyucu yırtık bir çift göremez. Erişim çiftin tamamını, 32 bitlik sözcüğü, 16 bitlik yarılardan birini veya dört bayttan birini hedefleyebilir.",
        ],
      },
      {
        heading: "Yazımlar, beklemeler ve zaman damgaları",
        paragraphs: [
          "Bir yazım, seçilen alana uygulanan bir atama, bit düzeyinde OR, tümleyenle AND, XOR veya taşmalı toplamadır. Bir bekleme o alanı bir maske altında bir referansla karşılaştırır. Karşılaştırmalar eşit, büyük, küçük, eşit değil, ulaşılmış dizi değeri ve büyük ile küçüğün işaretli biçimleridir. Dizi karşılaştırmaları alanın işaret bitini 63. bite kaydırır; böylece aynı kural 8, 16, 32 ve 64 bitte çalışır.",
          "Zaten karşılanmış bir bekleme yerinde tamamlanır. Karşılanmamış bir bekleme gönderim anlık görüntüsünü tutar ve o akıştaki sonraki yazım ve olaylardan önce, değer aynı misafir iş parçacığındaki sonraki bir gönderimden gelse bile, devam eder. Sıradan API ile _04_00 API'nin ayrı bağımsız değişken listeleri vardır. Zaman damgaları sayaç komutlarıyla birlikte kaydedilir. Oyunların içe aktardığı tamamlama boyutu sorguları kayıtlıdır, bu yüzden bu çağrılar çözülür.",
        ],
      },
      {
        heading: "Bu yolun yaptığı gözlenenler",
        paragraphs: [
          "Gerçek dışa aktarma yüzeyi üzerinden yapılan çağrılar dahil yirmi iki odaklı AMPR testi ReleaseSafe'te geçiyor. Grand Theft Auto III'ün açılışı 10.000'den fazla APR dosya okuma gönderimi yapıyor ve 350'den fazla AMPR tamamlama olayı yazıyor; bu yolda eşleşen bir AMPR hatası yok. O açılış sayaç API'sini kendisi çağırmaz. Sayaç işi testlerle ve değerleri gerçekten bekleyen oyunlarla kapsanır.",
          "Bu, emülatörün yürüttüğü komutlar için API kapsamıdır. Konsolun bellek denetleyicisinin döngü düzeyinde bir modeli değildir ve donanımın zamanlamasını iddia etmez.",
        ],
      },
    ],
    works: [
      "Tutarlı 64 bitlik çiftler ve bayt, yarım ve sözcük alanlarıyla yüz yirmi sekiz sayaç.",
      "Atama, OR, tümleyenle AND, XOR ve taşmalı toplama; ayrıca maskeli ve işaretli beklemeler.",
      "Komut akışındaki yerini koruyan ve değer geldiğinde devam eden engellenmiş beklemeler.",
      "Kayıtlı AMPR olay kuyruğu üzerinden iletilen sıralı tamamlama.",
    ],
    gaps: [
      "WaitOnAddress hâlâ yer tutucu.",
      "Gerçek AMPR bloğunun donanım zamanlaması yeniden üretilmiyor.",
      "Kod çözücünün tanımadığı bir sayaç komutu sessizce başarılı sayılmaz.",
    ],
  },

  apr: {
    title: "APR dosya tanımlayıcıları ve okumaları",
    summary: "APR bir oyun dosyasını bir kez çözer ve sonraki komut arabelleklerinde işleme özel bir tanımlayıcı taşır. Ertelenmiş AMPR okumaları, bir ana sistem tanımlayıcısını sonsuza dek tutmadan aynı salt okunur /app0 dosyasını yeniden açar.",
    sections: [
      {
        heading: "Yollar yerine tanımlayıcılar",
        paragraphs: [
          "Hızlandırıcı API'si her komutta bir yol istemez. Oyun bir yolu çözer, kompakt bir dosya tanımlayıcısı alır ve bu tanımlayıcıyı daha sonra gönderdiği okuma komutlarına koyar. PS5PCEM yolu ve dosya boyutunu tanımlayıcının yanında tutar. Tablo işleme özeldir. Ana sistem yolları misafire geri verilmez.",
          "Dosyalar oyunun salt okunur /app0 bağlama noktasından gelir. Çözülmüş bir kayıt, ertelenmiş bir okuma çalıştığında yeniden açılabilir; böylece emülatörün her tanımlayıcıyı işlemin ömrü boyunca tutması gerekmez. Önbelleğe alınmış tablo en fazla 64 dosya tutar.",
        ],
      },
      {
        heading: "Komut arabellekleri",
        paragraphs: [
          "Bir gönderim tek bir okuma çağrısı değil, bir misafir komut arabelleğidir. PS5PCEM en fazla 32 canlı komut arabelleği kabul eder. Her arabellek sınırlıdır: 32 okuma, 32 yazma, 32 eşleme, 32 tamamlama kaydı ve 128 işlem. Aynı anda 64'e kadar gönderim işlemde olabilir ve otomatik bir havuz sekiz arabellek tutar. Bir okuma dosya tanımlayıcısını, bir misafir hedefini, bir boyutu ve bir dosya konumunu belirtir; bayt sayısını alacak bir adres de belirtebilir.",
          "Okuyucu bilinmeyen bir tanımlayıcıyı, eksik bir dosyayı, kısa veya hizalanmamış bir komut arabelleğini ve dosyanın veya hedefin dışına taşacak bir isteği reddeder. Tek bir okuma 4 GiB ile sınırlıdır; bu arayüz sınırıdır, bir oyunun bu kadar büyük okumalar yaptığına dair bir söz değil. Eşleme komutları misafirin beklediği 16 KiB'lık AMM sayfa boyutunu kullanır.",
        ],
      },
      {
        heading: "APR, AMPR ile nasıl buluşur",
        paragraphs: [
          "APR dosya tablosunun ve komut arabelleği yaşam süresinin sahibidir. AMPR ise sayaçların, beklemelerin ve oyuna işin bittiğini söyleyen tamamlama olaylarının sahibidir. Bir oyun birçok dosya okumasını kuyruğa alıp ardından tamamlama komutunun güncellediği bir sayacı bekleyebilir. Grand Theft Auto III'ün ilk açılışı gözlenen büyük örnektir: okumalar bu yoldan geçer, tamamlama olayları AMPR kuyruğu üzerinden geri gelir.",
          "Diğer dosya API'si olan çekirdek eşzamansız G/Ç'si ayrı bir sayfadır. APR hızlandırıcı komut akışıdır. Çekirdek toplu API'si POSIX tarzı istek listesidir.",
        ],
      },
    ],
    works: [
      "Sonraki okumalar için boyutu korunan, salt okunur /app0 yolları için işleme özel dosya tanımlayıcıları.",
      "Okumalar, yazmalar, eşlemeler ve tamamlama kayıtları için sınırlı komut arabellekleri.",
      "Aynı oyun dosyasını yeniden açan ertelenmiş okumalar.",
      "Bilinmeyen dosyaların, taşmaların ve bozuk arabelleklerin denetimli reddi.",
    ],
    gaps: [
      "Bu yol, komut arabelleğinin yazılımla yürütülmesidir; konsolun DMA motoru değildir.",
      "Yazılabilir paket dosyaları /app0'ın dışındadır. Kayıtlar kayıt verisi bağlama noktasından geçer.",
      "Çözücünün görmediği bir dosya çıplak bir tanımlayıcıdan uydurulamaz.",
    ],
  },

  memory: {
    title: "Doğrudan bellek, esnek bellek ve havuzlar",
    summary: "Misafir adresleri gerçek ana sistem adresleridir. Doğrudan bellek, bu alana eşlenen seyrek, paylaşılan bir fiziksel havuzdur; MemoryPool aynı destek üzerinde ayırma, taahhüt ve toplu işlemler ekler.",
    sections: [
      {
        heading: "Misafir adresi ana sistem adresidir",
        paragraphs: [
          "Misafir x86-64 kodu yerel olarak çalışır ve mutlak adresler içerir; bu yüzden PS5PCEM işlemi rastgele bir ayırmaya taşıyamaz. Bellek modülü, herhangi bir modül yüklenmeden önce konsol düzenini ayırır. Sistem tarafından yönetilen pencere 0x40000'den başlar ve 32 GiB'ın hemen altına kadar uzanır. Ardından sisteme ayrılmış ve aygıt pencereleri gelir. Windows ve Linux'ta kullanıcı penceresi 0x10_0000_0000'dan 0xFC_0000_0000'a uzanır: 944 GiB adres alanı. macOS bu pencereyi daha yukarıdan başlatır ve 560 GiB alır.",
          "Bu aralıklar taahhüt edilmiş RAM değil, ayırmalardır. Sayfalar bir eşleme oluşturulduğunda 16 KiB'lık birimlerle taahhüt edilir; eşlemeyi kaldırmak, dış ayırma kalırken onların taahhüdünü geri alır. Başka bir ana sistem ayırması kullanımlar arasında misafir adresini çalamaz.",
        ],
      },
      {
        heading: "Doğrudan ve esnek bellek",
        paragraphs: [
          "Doğrudan bellek, misafirin fiziksel video belleğine verdiği addır. Oyun bir fiziksel aralık ayırır, sonra onu eşler. İki adım ayrıdır. Eşleme, fiziksel aralığın tamamının ayrıldığını denetler, CPU ve GPU korumasını çevirir ve ya tam sabit adresi taahhüt eder ya da hizalanmış bir boşluk arar. Aynı fiziksel konum birkaç sanal adrese eşlenebilir ve bu takma adlar tek bir seyrek destek nesnesini paylaştıkları için tutarlıdır.",
          "Oyunun zaten ayırdığı bir aralığa yapılan sabit bir eşleme, ayırmanın içinde taahhüt edilir. Önce ayırmayı serbest bırakmak, oyunun henüz eşlemediği parçalar üzerindeki hakkını düşürürdü. Fiziksel bellek, oyunun istediği biçimde serbest bırakılır; bu ortada bir boşluk veya birkaç ayırmayı kapsayan bir aralık olabilir. Esnek bellek aynı adres alanı tablosunu, platform varsayılanı 4 GiB'lık bir bütçeyle kullanır ve kullanıcı penceresine düşmeden önce sistem tarafından yönetilen pencereyi 0x02_0000_0000'dan itibaren arar.",
        ],
      },
      {
        heading: "MemoryPool ve Windows taahhüdü",
        paragraphs: [
          "Altı libkernel MemoryPool dışa aktarması sanal bir alan ayırır, fiziksel kapasiteyi genişletir, paylaşılan desteği taahhüt eder ve taahhüdünü geri alır, sıralı toplu işlemler çalıştırır ve blok istatistiklerini bildirir. Bağışlanmış bloklar taahhüt edilmişken sıradan doğrudan bellek olarak eşlenemez veya serbest bırakılamaz. Toplu taahhüt, taahhüdü geri alma, koruma ve tür değişiklikleri çalışır. Toplu MOVE desteklenmiyor olarak kalır ve blokların taşındığını varsaymak yerine hata döndürür.",
          "Windows'ta hizalanmış doğrudan bellek görünümleri 64 KiB'lık bölüm görünümlerini paylaşır. Böylece geçici yüklemeler, geri okumalar ve 16 KiB'lık misafir sayfalarının her biri kendi, sürekli büyüyen taahhüt yükü hâline gelmez. Bir ayırmanın sorguları misafirin 72 baytlık sanal sorgu kaydını kullanır ve özgün koruma bitleriyle yarı açık aralıklar bildirir.",
        ],
      },
    ],
    works: [
      "16 KiB'lık sayfalarla taahhüt edilen ve ayırmadan vazgeçmeden serbest bırakılan sabit misafir adres pencereleri.",
      "Tek bir doğrudan bellek fiziksel konumunun tutarlı takma adları.",
      "4 GiB varsayılan bütçeli esnek bellek ile sabit, üzerine yazmayan ve kısmi eşleme kaldırma.",
      "MOVE dışında MemoryPool ayırma, genişletme, taahhüt, taahhüdü geri alma, istatistikler ve sıralı toplu işlemler.",
    ],
    gaps: [
      "MemoryPool toplu MOVE açıkça desteklenmiyor.",
      "Oyunun sahip olmadığı bir aralığın serbest bırakılması hâlâ hatadır.",
      "Ayırmalar sanaldır. Yalnızca oyunun eşlediği sayfalar ana sistem taahhüdü tüketir.",
    ],
  },

  savedata: {
    title: "Kayıt verileri",
    summary: "Bağlanan bir kayıt yuvası yazılabilir bir /savedata0 olur. Oyun sıradan dosya API'sini kullanır ve bir sonraki başlatma aynı dosyaları oyunun bildirdiği ürün kodu altında bulur.",
    sections: [
      {
        heading: "Bir kayıt nerede durur",
        paragraphs: [
          "Oyun kurulumu salt okunurdur, çıkarılabilir bir ortamda durabilir ve yamalandığında tümüyle değiştirilir. Bir kaydın üçünden de uzun yaşaması gerekir. PS5PCEM yuvaları emülatörün ana dizininde, oyunun bildirdiği ürün koduna göre savedata/<titleId>/<slot>/ altında saklar. Aynı oyunun iki dökümü kayıtları paylaşır. İki farklı oyun paylaşmaz.",
          "Yuva adı misafirden gelir ve bir dizine dönüşmeden önce temizlenir. Ayırıcılar, sürücü iki noktası ve üst dizin bağlantıları alt çizgiye dönüşür. Bu karakterleri atmak iki farklı adın tek bir dizine çökmesine yol açabilirdi. Hiç dizin olamayan bir ad sabit bir ada geri düşer; çünkü kaydı kaybetmek onu öngörülebilir bir yere koymaktan daha kötüdür.",
        ],
      },
      {
        heading: "Bağlama ve varlık denetimleri",
        paragraphs: [
          "Bir bağlama yuvayı çözer ve /savedata0'ı ona yönlendirir. Eksik bir yuva yalnızca oyun istediğinde oluşturulur. Oyunun hiç yazmadığı bir kaydın yoklaması eksik sonucunu alır; oyunun beklediği de budur. Oyunla gelen her şey salt okunur kalır. Yazılabilir yer kayıt bağlama noktasıdır.",
          "Varlık sorusu dosya açılarak değil, meta veri yolundan yanıtlanır. Yalnızca açma anında başarılı olan bir bağlama her varlık denetimini başarısız kılıyordu ve Jets 'n' Guns 2 bu yüzden profilini her başlatmada yeniden yazıyordu. Bir oyunun yazdığı yuvaların listelenmesi de yanıtlanır. Bağlama ayrıca mevcut bir kaydı mı açtığını yoksa yeni bir tane mi oluşturduğunu bildirir. Blok biçimli kayıt API'si sce_sdmemory altında oyun başına ayrı bir veri bloğu kullanır; oyun onu ayırdığında yüklenir, eşzamanlama istediğinde yazılır.",
        ],
      },
      {
        heading: "Eksik yuvalar",
        paragraphs: [
          "Açılış keşfi, yalnızca sistem yazılımı meta verisi veya boş hazırlama dosyaları içeren yarıda kalmış yuvaları gizler. Cat Quest III'te yeniden üretilen, yalnızca path.txt içeren bir ayarlar yuvası vardı. Oyun bu durumda eksik bir Data.dat yüzünden başarısız oluyor ve açılış karesinden sonra sonsuza dek bekliyordu. Arama artık bu eksik yuvayı atlayıp devam ediyor.",
          "Başlatıcı, farklı bir kütüphane kutucuğunun yazdığı kayıtlar dahil tüm yerel yuvaları Kayıtlar sayfasında oyun kimliğine göre gruplar. zig-out altındaki bir geliştirme sürümü emülatörün ana dizinini depo köküne çözer. Paketlenmiş bir sürüm kendi dizinini kullanır. Bu yüzden aynı paketin komut satırından ve başlatıcıdan başlatılması tek bir kayıt kökünü paylaşır.",
        ],
      },
    ],
    works: [
      "Oyun kimliğine göre anahtarlanan, temizlenmiş yuva adlarıyla yazılabilir /savedata0 bağlamaları.",
      "Varlık denetimleri, yuva listeleme ve bağlamanın kaydı oluşturup oluşturmadığına dair rapor.",
      "Blok biçimli kayıt API'si için oyun başına bir sce_sdmemory veri bloğu.",
      "Gerçek kayıt verisi içermeyen yarıda kalmış yuvaların gizlenmesi.",
    ],
    gaps: [
      "Kayıtlar ana sistem dizinleridir. Konsolun kayıt verisi diyaloğu ve bulut eşzamanlaması sunulmaz.",
      "Oyunun oluşturulmasını istemediği bir yuva eksik olarak bildirilir.",
      "Kupa, etkinlik ve hesaba bağlı diğer kayıtlar bu bağlamanın dışındadır.",
    ],
  },

  fonts: {
    title: "Yazı tipi işleme",
    summary: "libSceFont, oyunun sağladığı TrueType ve OpenType yazı yüzlerini FreeType ile rasterleştirir. Sistem yazı tipi istekleri Latin, Yunan ve Kiril için birlikte gelen Noto Sans yedeğini kullanır.",
    sections: [
      {
        heading: "Yazı yüzleri, ölçek ve yaşam süresi",
        paragraphs: [
          "Bir oyun bir yazı tipi kütüphanesi açar, sağladığı baytlardan veya bir sistem yazı tipi isteğinden bir yüz oluşturur, ardından glif ölçümlerini ve kapsamını ister. Her yüz kendi ölçeğini, işleme ölçeğini, eğimini ve yaşam süresini tutar. Kütüphaneyi kapatmak yüzlerini serbest bırakır, işlemin kapanması da yazı tipi durumunu temizler. Yazı tipi baytları açılışta kopyalanır; böylece oyunun kaynak arabelleğinin daha sonra eşlemesinin kaldırılması rasterleştiriciyi geçersiz kılamaz.",
          "Noto Sans bir yedektir; her sistem yazı tipinin bayt bayt aynı kopyası değildir. Latin, Yunan ve Kiril'i kapsar. Oyunun sağladığı bir yüz CJK dahil başka glifler içerebilir ve bu ana hatlar kullanılır. Sistem yazı tipi isteğinin kendisi bir CJK yüzünün yerine geçmez.",
        ],
      },
      {
        heading: "Glifler, karakter aralığı ve atlaslar",
        paragraphs: [
          "Glif yolu gerçek ölçümleri, yatay düzeni, temel çift aralığını (kerning), kenar yumuşatmalı kapsamı, kırpmayı ve işleme sonucu tanımlayıcılarını döndürür. Sınırlı bir glif önbelleği aynı karakteri yeniden rasterleştirmekten kaçınır, ayrı bir çift önbelleği de karakter aralığını boyutlar arasında yeniden kullanır. Yazımlar bir doku atlasına dokunmadan önce CPU izinlerini denetler ve GPU sayfa izlemelerini geçersiz kılar.",
          "Yüzün içermediği geçerli bir Unicode skaleri, bir oyunun tam bir atlas aralığı oluştururken karşılaştığı denetim kodları dahil, yüzün .notdef ana hattını kullanır. Jurassic Park Classic Games Collection'ın yazı tipi atlasını oluşturmayı bitirebilmesini sağlayan bu eksik glif yoludur. Geçersiz Unicode skalerleri ve aralık dışındaki açık glif tanımlayıcıları hâlâ hata döndürür. Kapsam bir ile dört bayt arasındaki piksellere yazılır.",
        ],
      },
      {
        heading: "Metin düzeninde oyuna kalanlar",
        paragraphs: [
          "Pek çok oyun libSceFont'u hiç çağırmaz. Metni kendi motor yazı tipiyle çizer ve bu uygulama o pikselleri değiştirmez. HLE yolu, rasterleştirmeyi sistem yazılımından isteyen oyunlar içindir.",
          "Metin şekillendirme, çift yönlü düzen, sentetik kalınlık, CJK sistem yazı tipi değişimi, koleksiyon yüzü seçimi ve üst düzey FontWriting ve String API'leri uygulanmadı. Odaklı denetimler font filtresiyle zig build test-hle arkasındadır.",
        ],
      },
    ],
    works: [
      "Oyunun sağladığı TrueType ve OpenType yüzlerinin FreeType ile rasterleştirilmesi.",
      "Latin, Yunan ve Kiril sistem yazı tipi istekleri için Noto Sans yedeği.",
      "Ölçümler, yatay düzen, çift aralığı, eğim, kırpma ve bir glif önbelleği.",
      "Eksik Unicode skalerleri için .notdef yedeği; Jurassic Park'ın atlasının önünü açar.",
    ],
    gaps: [
      "Şekillendirme, çift yönlü düzen ve FontWriting API'leri yok.",
      "Sistem yazı tipi istekleri bir CJK yüzünün yerine geçmez.",
      "Metni tamamen kendi motorunda çizen oyunlar bu yolu kullanmaz.",
    ],
  },

  png: {
    title: "PNG kodlama ve kod çözme",
    summary: "PNG kodlayıcı, satır aralıklı RGBA veya BGRA piksellerden 8 bitlik RGB veya RGBA dosyalar yazar. Kod çözücü, taramasız gri tonlamalı, paletli, RGB ve RGBA görüntüleri denetlenmiş bir misafir arabelleğine okur.",
    sections: [
      {
        heading: "Kodlama",
        paragraphs: [
          "Oyunlar kodlayıcıya, satır aralığı genişliğinden büyük olabilen bir piksel dikdörtgeni verir. PS5PCEM satır aralıklı RGBA ve BGRA kabul eder ve standart 8 bitlik bir RGB veya RGBA PNG yazar. Çağıran tarama satırı filtrelerini ve 0 ile 9 arasında bir sıkıştırma düzeyini seçer. Çıktı yazımları oyunun sağladığı arabellekle sınırlıdır.",
          "Kodlayıcı dosya formatının yazılımla uygulanmasıdır. Bir sistem görüntü kütüphanesine başvurmaz ve konsolun donanım kodlayıcısına karşı belirli bir hız iddia etmez.",
        ],
      },
      {
        heading: "Kod çözme",
        paragraphs: [
          "libScePngDec, PNG meta verisini ayrıştırır ve taramasız gri tonlamalı, paletli, RGB ve RGBA görüntüleri denetlenmiş misafir RGBA veya BGRA arabelleklerine çözer. Tarama satırı filtreleri uygulanır ve palet saydamlığına uyulur. Hedef, pikseller yazılmadan önce denetlenir.",
          "Adam7 taramalı girdi tanınır ve yanlış bir görüntüye çözülmek yerine reddedilir. Böylece taramalı simgeler ve ekran görüntüleri sessizce bozuk bir arabelleğe dönüşmez.",
        ],
      },
      {
        heading: "Nerede durur",
        paragraphs: [
          "PNG, bir oyunun açılışta başvurduğu küçük sistem yazılımı hizmetlerinden biridir: simgeler, atlaslar ve kayıt küçük resimleri. H.264 için FFmpeg kullanan AvPlayer video yolundan ve yazı tipi rasterleştiricisinden bağımsızdır.",
          "9 Ekim sistem yazılımı raporu kodlayıcıyı saat ve AMPR tamamlama boyutu sorgularıyla birlikte gruplar. Bu üçü içe aktarma boşluklarını kapattı. Tek başlarına ölçülen bir kare süresini değiştirmezler.",
        ],
      },
    ],
    works: [
      "0–9 sıkıştırma düzeylerinde satır aralıklı RGBA ve BGRA girdiden 8 bitlik RGB veya RGBA PNG.",
      "Filtreler ve palet alfası dahil, taramasız gri tonlamalı, paletli, RGB ve RGBA kod çözme.",
      "Denetlenmiş hedef arabellekleri ve sınırlı kodlayıcı çıktısı.",
    ],
    gaps: [
      "Adam7 taramalı PNG tanınır ama çözülmez.",
      "16 bitlik ve alışılmadık yardımcı parçalar uygulanan alt kümenin dışındadır.",
      "Donanım PNG bloğu yok. İki taraf da CPU'da çalışır.",
    ],
  },

  rtc: {
    title: "Gerçek zamanlı saat",
    summary: "RTC takvim alanlarını denetler, Windows FILETIME'ı dönüştürür ve tıklar üzerinde denetimli aritmetik yapar. Misafir, ana sistemin yaz saati dönüşümü olmadan tutarlı bir saat görür.",
    sections: [
      {
        heading: "Çağrılar ne yapar",
        paragraphs: [
          "Oyunlar sistem yazılımından geçerli zamanı, tık sayıları ile takvim alanları arasında dönüşümü ve anlamsız bir tarihe taşmaması gereken aritmetiği ister. PS5PCEM takvim alanlarını doğrular, FILETIME'a ve FILETIME'dan dönüştürür ve tık aritmetiğini denetler; böylece taşma kırpılmış bir değer değil, hata olur.",
          "UTC ve yerel sorgular ana sistem saatinden tutarlı değerler döndürür. Ana sistemin yaz saati kurallarını misafirin yerel zamanına uygulayacak dönüşüm uygulanmadı. Yalnızca monoton veya UTC bir zaman damgasına ihtiyaç duyan bir oyun yine de kullanılabilir bir yanıt alır.",
        ],
      },
      {
        heading: "Neden ses zamanından ayrı",
        paragraphs: [
          "Ses hızlandırma ana sistem ses aygıtını ve onun arabellek saatini kullanır. AvPlayer kendi medya saatini kullanır. RTC, oyunun kayıtlar, zamanlayıcılar ve takvim arayüzü için okuduğu duvar saatidir. Bu saatleri karıştırmak, bir oyunun takılmış gibi görünmesine veya bir kayda sıfır zaman damgası basmasına yol açar.",
          "9 Ekim raporu doğrulamayı, FILETIME dönüşümünü ve denetimli aritmetiği, PNG kodlayıcı ve üç AMPR tamamlama boyutu dışa aktarmasıyla birlikte ekledi. Ağ zamanı ve kullanıcıya görünen bir saat ayarı bu yüzeyin parçası değildir.",
        ],
      },
    ],
    works: [
      "Takvim alanı doğrulama ve denetimli tık aritmetiği.",
      "FILETIME dönüşümü.",
      "Ana sistem saatinden tutarlı UTC ve yerel sorgular.",
    ],
    gaps: [
      "Misafir yerel zamanının ana sistem yaz saati dönüşümü yok.",
      "Saat için emüle edilmiş bir sistem ayarları arayüzü yok.",
      "Ağ zamanı eşzamanlaması yapılmıyor.",
    ],
  },

  fibers: {
    title: "Fiber'lar ve kullanıcı düzeyi iş parçacıkları",
    summary: "Windows'ta her libSceFiber fiber'ı gerçek bir Windows fiber'ıdır; bu yüzden bir geçiş misafir yazmaçlarını ve misafir yığınını korur. Kullanıcı düzeyi iş parçacıkları aynı pthread yolundan başlar.",
    sections: [
      {
        heading: "Bir fiber neden boş bir işlem olamaz",
        paragraphs: [
          "Misafir kodu yerel makine kodu olarak çalışır. Bir fiber geçişi, ana sistem ve misafir çerçevelerinin karıştığı yığında tam olarak aynı yazmaçlarla ve aynı yığınla devam etmelidir. sceFiberSwitch'ten geçiş yapmadan başarı döndürmek, oyunun yanlış yığında devam etmesine ve iki tarafı da bozmasına yol açardı.",
          "PS5PCEM, başlatılan her misafir fiber'ını bir Windows fiber'ıyla destekler. sceFiberRun, sceFiberSwitch ve sceFiberReturnToThread bu mekanizmayı kullanır. sceFiberRun'ı çağıran iş parçacığı kök fiber'dır. 128 baytlık genel SceFiber kaydı ABI imzalarını, durumu, giriş bağımsız değişkenini, adı ve çağıranın sağladığı bağlam aralığını tutar.",
        ],
      },
      {
        heading: "Yığın kimin",
        paragraphs: [
          "Oyun bir bağlam arabelleği sağlar ve bu arabellek ABI nesnesine kaydedilir. Gerçek yığının sahibi Windows'tur. Oyunun arabelleğini yerel bir Windows yığını olarak kullanmak, işletim sisteminin gerektirdiği koruma sayfasını ve geri sarma kayıtlarını atlardı. Sistem yazılımı kaydının beklediği en küçük bağlam yine de hizalama ve başlangıç ile bitiş imzalarıyla birlikte denetlenir.",
          "sceFiberGetSelf, sonlandırma, iş parçacıkları arası sahiplik denetimleri ve çalışma zamanı sıfırlaması uygulandı. Arka uç Windows x86-64 yerel yürütme hedefinde bulunur. Diğer ana sistemler emülatörün geri kalanını derleyebilir; bu geçiş yolu orada yoktur.",
        ],
      },
      {
        heading: "Kullanıcı düzeyi iş parçacıkları",
        paragraphs: [
          "libSceUlt başlatma ve sonlandırma başarılı olur; böylece bir oyunun iş sistemi başlayabilir. Çalışma zamanları, bekleme kuyrukları, kuyruk verisi havuzları, mutex'ler, semaforlar ve kuyruklar, oyunun ayırdığı nesnelere göre anahtarlanan ana sistem tarafı durum tutar. İş öğelerinin kendisi mevcut pthread yolundan başlar. Çalışma alanı boyutu sorguları bu oluşturmaların beklediği hizalanmış boyutları döndürür.",
          "Çekirdek kullanıcı kenarı olay kuyrukları, pthread eşzamanlamasıyla aynı diziyi bilen beklemeyi paylaşır. VideoOut filtresi -13 ve grafik filtresi -14 bu kuyruğu kullanır ve her kaydın tanımlayıcısını ve kullanıcı verisini korur. ULT bir zamanlama yapıştırıcısıdır. İkinci bir CPU emülatörü eklemez.",
        ],
      },
    ],
    works: [
      "sceFiberRun, sceFiberSwitch ve sceFiberReturnToThread için Windows fiber'ları.",
      "ABI imzaları, sahiplik denetimleri ve koruma sayfalı, ana sisteme ait bir yığın.",
      "ULT başlatma, kuyruklar, mutex'ler, semaforlar ve pthread destekli iş öğeleri.",
      "VideoOut ve grafik tamamlamasıyla paylaşılan kullanıcı kenarı olay kuyrukları.",
    ],
    gaps: [
      "Fiber geçişi Windows x86-64'te var. Diğer ana sistem işletim sistemleri misafir kodunu yerel olarak çalıştırmaz.",
      "Bir fiber, önleyici olarak zamanlanan bir donanım iş parçacığı değildir.",
      "ULT, iş gövdeleri için ayrı bir yorumlayıcı uygulamaz.",
    ],
  },

  aio: {
    title: "Çekirdek eşzamansız dosya okumaları",
    summary: "Çekirdek AIO API'si bir okuma grubunu kabul eder ve bir tanımlayıcı döndürür. PS5PCEM grubu, arayüzün izin verdiği şekilde gönderim anında yürütür ve oyun tamamlanmış bir sonuç toplar.",
    sections: [
      {
        heading: "Arayüz",
        paragraphs: [
          "Varlıkları akışla yükleyen motorlar bir okuma listesi gönderir ve daha sonra grubun bitip bitmediğini sorar. Bu şekilde yazılmış bir oyun API olmadan dosya yükleyemez. PS5PCEM grubu kabul eder, gönderildiğinde okumaları çalıştırır ve sonuçları tanımlayıcının altında saklar. Sonraki bir yoklama zaten tamamlanmış bir grup görür.",
          "Hemen tamamlanmak arayüzün yasal bir sonucudur. Çağıranların, yoklamadan önce bitmiş bir isteği işlemesi gerekir. Emülatör aygıt gecikmesini taklit etmek için uyumaz ve daha eşzamansız görünmek için grubu başarısız olarak bildirmez.",
        ],
      },
      {
        heading: "APR'den farkı",
        paragraphs: [
          "Çekirdek AIO, oyunun zaten açtığı dosya tanımlayıcıları üzerinde POSIX tarzı bir gruptur. APR hızlandırıcı yoludur: yollar tanımlayıcılara dönüşür ve komutlar sayaçlar ve tamamlama olaylarıyla bir AMPR komut arabelleğinde yaşar. Bir oyun birini, diğerini veya ikisini birden kullanabilir.",
          "İki yol da oyun kurulumunu emülatörün üretmediği veriler olarak okur. Sınırlar denetlenir. Kısa bir arabellek veya hatalı bir tanımlayıcı, başarı gibi gösterilen kısmi bir yazım değil, bir hata dönüşüdür.",
        ],
      },
    ],
    works: [
      "Grup gönderimi, bir tanımlayıcı ve oyunun toplayabileceği bir tamamlama.",
      "Oyunun açtığı dosyalar üzerinde yapılan okumalar.",
      "Misafir API'sinin izin verdiği anında tamamlama.",
    ],
    gaps: [
      "Disk gecikmesini taklit eden ayrı bir G/Ç iş parçacığı yok.",
      "Konsolun öncelik ve bant genişliği zamanlayıcısı modellenmedi.",
      "APR komut arabellekleri farklı bir API'dir ve çekirdek AIO'ya yeniden yazılmaz.",
    ],
  },

  agc: {
    title: "AGC ve PM4 komut akışı",
    summary: "Bir PS5 oyunu GPU paketlerini kendi belleğinde oluşturur ve arabelleği gönderir. PS5PCEM bu PM4 akışını çözer, yazmaç durumunu tutar ve çizimleri ve dispatch'leri sırayla yürütür.",
    sections: [
      {
        heading: "Akış grafik API'sinin kendisidir",
        paragraphs: [
          "Oyunun her üçgen için üst düzey bir çizim işlevi çağırması gerekmez. Paketler yazar: yazmaç güncellemeleri, çizimler, dispatch'ler, çitler ve ekran değiştirmeleri. Arabelleği hangi katman üretmiş olursa olsun GPU aynı akışı görür. Kod çözücü, işlem kodlarının belgelenmiş bir anlamı olan paketleri adlandırır, diğerlerini sayı olarak bırakır. Bir izdeki uydurma bir ad, bir işlem kodundan daha kötü olurdu.",
          "Paket gövdesi uzunluğu bir eksiğiyle saklanır, bu yüzden boş bir gövde kodlanamaz. Her adım sınırlarını denetler. Sığmayan bir gövde bildirilir. Kırpılmaz; çünkü kırpılmış bir gövde sonraki her paketi kaydırır ve iz yalan söylerdi.",
        ],
      },
      {
        heading: "Durum, beklemeler ve dolaylı arabellekler",
        paragraphs: [
          "Yazmaç durumu, sıfır yazımları dahil, gönderimler arasında korunur. Yürütücü doğrudan yazmaç listelerini, yerel ve eski dolaylı listeleri, acquire ve release'i, 32 ve 64 bitlik beklemeleri, yazımları, olayları ve SetFlip'i uygular. Karşılanmayan bir bekleme engellendi sonucunu ve devam edilecek tam sözcüğü döndürür. İlerleme uydurmak için misafir belleği değiştirilmez.",
          "Dolaylı arabellekler, hem sıradan 4 dword'lük biçim hem de koşullu 14 dword'lük biçim, özyinelemeli olarak izlenir. Zincir paketleri üst öğeyi bitirir. İç içelik on altı çerçevede durur. Engellenen bir alt öğe kökten yaprağa sabit bir yol döndürür; böylece devam etmek zaten gerçekleşmiş çizimleri yeniden oynatmaz. Zamanlayıcı her kök komut arabelleğini ve ulaşabildiği dolaylı arabellekleri kopyalar; böylece bir bekleme hâlâ engelliyken oyun alanı yeniden kullanabilir.",
        ],
      },
      {
        heading: "Yazmaçlardan bir çizime",
        paragraphs: [
          "Bir çizimde veya dispatch'te yazmaç anlık görüntüsü türlendirilmiş kaynaklara dönüşür: 128 bitlik arabellek ve örnekleyici tanımlayıcıları, 256 bitlik görüntü tanımlayıcıları, sekiz renk hedefi, derinlik ve stencil, görüntü alanları, kesme dikdörtgeni, ayıklama, harmanlama ve PS5 swizzle ve MSAA alanları. Eksik renk denetimi ve kırpma denetimi yazımları AGC varsayılanlarını devralır. Açık bir devre dışı bırakma devre dışı kalır. İki CPU çalışanı grafik ve compute komutlarını hazırlar. Yürütme ve tamamlama sıralı kalsın diye tek bir Vulkan sahibi onları gönderir.",
          "Shader meta verisi kaynak tablolarını ve kullanıcı verisi yazmaçlarını sağlar. Skaler köken analizi shader'ın sınırlı bir önekini tarar, yalnızca bu önekin gerçekten dokunduğu misafir belleğini yükler ve bir tanımlayıcı uydurmak yerine bilinmeyen bir dalda durur. Sonuç, çeviricinin ve Vulkan arka ucunun tükettiği şeydir.",
        ],
      },
    ],
    works: [
      "Bir eksiğiyle saklanan gövde uzunlukları ve her pakette katı sınırlarla PM4 kod çözme.",
      "Kalıcı yazmaç bankaları, engellenen beklemeler ve on altı çerçeveye kadar özyinelemeli dolaylı arabellekler.",
      "Çizim anında türlendirilmiş arabellekler, görüntüler, renk hedefleri, derinlik, görüntü alanı, harmanlama ve MSAA durumu.",
      "İki hazırlık çalışanı ve tek bir sıralı Vulkan gönderim sahibi.",
    ],
    gaps: [
      "Belgelenmiş anlamı olmayan bir işlem kodu adsız kalır.",
      "Engellenen bir bekleme, sahte bir çit değeri yazılarak asla temizlenmez.",
      "Katmanlar, meta veriler ve birkaç görüntü işlemi hâlâ eksik. Bunların kendi sayfaları var.",
    ],
  },

  rdna2: {
    title: "RDNA2 shader'larından SPIR-V'ye",
    summary: "PlayStation 5 shader'ları RDNA2 makine kodudur. PS5PCEM GFX10 ailelerini çözer, bir denetim akışı grafiği oluşturur ve desteklenen işlemleri Vulkan için SPIR-V 1.5'e dönüştürür.",
    sections: [
      {
        heading: "Kod çözme",
        paragraphs: [
          "Ön uç; skaler SOP1, SOP2, SOPK, SOPC, SOPP ve SMEM kodlamalarını, vektör VOP1, VOP2, VOP3, VOP3P, VOPC ve VINTRP kodlamalarını, MUBUF, MTBUF, FLAT, DS, MIMG ve EXP'yi tanır. Mimari bir ve iki sözcüklük gövdeler, isteğe bağlı sabitler ve MIMG NSA adres sözcükleri korunur; böylece sonradan gelen desteklenmeyen bir işlem kodu akışın senkronunu bozmaz.",
          "Bilinen bir ailedeki tanınmayan bir işlem kodu, ailesini, sayısal işlem kodunu, ham sözcükleri ve bir nedeni taşımaya devam eden desteklenmeyen bir komuta dönüşür. SDWA ve DPP uzantı sözcükleri seçicilerini, değiştiricilerini ve şerit maskelerini korur. Kod çözücü bilmediği bir işlem kodunu yeniden adlandırmaz.",
        ],
      },
      {
        heading: "Denetim akışı ve türlendirilmiş IR",
        paragraphs: [
          "Doğrudan dal hedefleri programı bloklara böler. İleri birleşmeler, iç içe bölgeler ve geri kenarlar ayrı kaydedilir. Canlı çevirici çözülmüş komutlardan kod üretebilir. PS5_GPU_SHADER_IR=1 ayarı yasallaştırılmış türlendirilmiş IR'yi seçer. PS5_GPU_SSA=1 ayarı phi ve tanım-kullanım durumu, sabit katlama ve yinelemeli ölü kod temizliği ekler.",
          "Döngüsüz seçimler, birleşim noktalarında phi değerleri olan yapılandırılmış SPIR-V birleşmelerine dönüşür. Doğal döngüler döngü birleşmelerine dönüşür. İndirgenemez denetim akışı, VCC ve EXEC yüklemlerini koruyan bir blok indeksi dağıtıcısına dönüşür; böylece bir yazımı atlaması gereken şerit onu yine atlar. EXEC maskeleri bir SPIR-V bloğu içinde yeniden kullanılır ve her etikette bırakılır; çünkü bir dalın bir tarafındaki değer diğer tarafa hâkim değildir.",
        ],
      },
      {
        heading: "9 Ekim paketi neyi ölçtü",
        paragraphs: [
          "9 Ekim skaler çağrı kontrol noktası 259 GPU analizi testinin 259'unu ve 232 Vulkan testinin 232'sini geçti. RDNA2 paketi, aynı on mevcut hata ve bildirilen bir sızıntıyla 281 testin 271'ini geçti. Bu komut yoklamaları bir oyun için yeni bir kare hızı belirlemez.",
          "Çok texel'li görüntü yüklemeleri, yatay toplamalar, NGG getirme shader'ları ve sınırlı skaler çağrılar kendi yolları olarak uygulandı ve kendi sayfalarında anlatılıyor. Ölçülen kümede olmayan yazımlar ve tanımlayıcı birleşimleri desteklenmiyor olarak kalıyor.",
        ],
      },
    ],
    works: [
      "Sabitler ve NSA sözcükleri dahil GFX10 skaler, vektör, bellek, görüntü ve dışa aktarma ailelerinin kod çözümü.",
      "Yapılandırılmış seçimler, doğal döngüler ve şerit maskelerini koruyan indirgenemez akış dağıtıcısı.",
      "Ortam değişkenleriyle seçilen isteğe bağlı türlendirilmiş IR ve SSA temizliği.",
      "Desteklenen ALU, bellek, görüntü, enterpolasyon ve dışa aktarma işlemleri için SPIR-V 1.5.",
    ],
    gaps: [
      "On mevcut RDNA2 paketi hatası ve bildirilen bir sızıntı sürüyor.",
      "Desteklenmeyen bir işlem kodu o dönüşümü durdurur. Tahmin edilen bir işlemle değiştirilmez.",
      "Komut testleri bir kare hızı sonucu değildir.",
    ],
  },

  ngg: {
    title: "NGG köşe noktası shader'ları",
    summary: "S_SETPC_B64 ile devam eden bir getirme shader'ı dahil birleştirilmiş NGG köşe noktası programları tek bir grafik aşaması olarak çevrilir. Dışa aktarma programı kendi kullanıcı verisi penceresini korur.",
    sections: [
      {
        heading: "Getirme ve dışa aktarma ayrı programlardır",
        paragraphs: [
          "Bir PlayStation 5 çizimi köşe noktası işini çoğu zaman bir getirme shader'ı ile bir dışa aktarma shader'ı arasında böler. Getirme shader'ı öznitelik girişini S_SETPC_B64 ile dışa aktarma koduna atlayarak bitirir. PS5PCEM bu devamı aynı köşe noktası programının parçası sayar ve birleştirilmiş sonucu çevirir.",
          "NGG dışa aktarma programı geometri shader'ının kullanıcı verisi bankasını ödünç almaz. Skaler yazmaçları kendi kullanıcı verisi anlık görüntüsünden, dışa aktarma programı için s8'den başlatılır. Kaynak tablosunun s0:s1'de durduğunu varsaymak, çeviricinin özellikle kaçındığı bir hatadır. Tablo işaretçisi, meta verinin bildirdiği ShaderResourceTable kullanıcı SGPR çiftinden gelir.",
        ],
      },
      {
        heading: "Köşe noktası öznitelikleri",
        paragraphs: [
          "Getirme shader'ı ve genişletilmiş kullanıcı verisi, gömülü köşe noktası arabelleği ve köşe noktası özniteliği tablolarıyla birlikte çözülür. En fazla 32 girdi semantiği; semantik indeksini, düştüğü donanım VGPR'sini, AGC öznitelik formatını, bayt konumunu, örnek hızını ve 128 bitlik arabellek tanımlayıcısını korur.",
          "Öznitelik araması donanım eşleme baytını değil, semantik baytını kullanır. Eksik bir tablo çifti veya desteklenen alanın dışındaki bir indeks, herhangi bir misafir okumasından önce reddedilir. Köşe noktası aşamasından gelen PARAM dışa aktarmaları parça enterpolasyon girdilerine dönüşür; sonraki bir piksel shader'ı değişkenleri böyle görür.",
        ],
      },
      {
        heading: "Bir getirme shader'ına yapılan çağrılar",
        paragraphs: [
          "Doğrulanmış harici bir getirme shader'ı, çağrının kullanıcı verisi çifti AGC'nin kaydettiği adresi hâlâ tutuyorsa S_SWAPPC_B64 veya S_CALL_B64'ten de bağlanabilir. Getirme gövdesi dönüşteki S_SETPC_B64'e kadar çözülür ve bu dönüş çağıranın bağlantı çiftini okumalıdır. Hangi çağrıların yasal olduğuna dair ayrıntılar skaler çağrılar sayfasındadır.",
          "Birleştirilmiş NGG çevirisi, üç boyutlu sahnelerin eskiden kod çözücüyü durduran bir getirme girişini geçmesini sağlayan şeydir. Tek başına eksik bir piksel shader'ını veya eksik bir işleme hedefini sağlamaz.",
        ],
      },
    ],
    works: [
      "S_SETPC_B64 ile biten getirme girişleri dahil birleştirilmiş NGG köşe noktası programları.",
      "Dışa aktarma programı için ayrı bir kullanıcı verisi penceresi.",
      "Formatlar, konumlar, örnek hızları ve arabellek tanımlayıcılarıyla en fazla 32 köşe noktası semantiği.",
      "Parça enterpolasyon girdilerine bağlanan PARAM dışa aktarmaları.",
    ],
    gaps: [
      "Dönüşü çağıranın bağlantı çiftiyle eşleşmeyen bir getirme shader'ı bağlanmaz.",
      "Genel dinamik çağrılar desteklenmiyor. Skaler çağrılar sayfasına bakın.",
      "Desteklenmeyen bir dışa aktarmaya veya enterpolanta bağlı geometri o çizimde hâlâ başarısız olur.",
    ],
  },

  mimg: {
    title: "Çok texel'li görüntü yüklemeleri",
    summary: "Açık mip biçimleri dahil IMAGE_LOAD_BY2, BY4, PCK2 ve PCK4, ölçülen yerel 2B formatlar için yürütülür. Bir BY yüklemesi ardışık texel'ler döndürür. Bir PCK yüklemesi onların ham bitlerini tek bir yazmaca paketler.",
    sections: [
      {
        heading: "BY ve PCK",
        paragraphs: [
          "Bir BY yüklemesi ardışık texel'leri ayrı VGPR'lere yazar; kanallar her texel'in içinde sıralanır. Bir PCK yüklemesi ham bileşen bitlerini tek bir 32 bitlik VGPR'ye paketler; ilk texel en anlamsız bitlerde durur. İşaretli bileşenler depolama genişliklerine kırpılır. UNORM bileşenleri çifte yuvarlama dönüşümüyle yeniden oluşturulur.",
          "İlk texel X ekseninde iki veya dörtlük bir gruba aşağı hizalanır. Sınır testi özgün, hizalanmamış koordinatı kullanır: grubun tamamı hizalamadan önce sığmalı, Y aralıkta olmalı ve istenen mip bulunmalıdır. Geçersiz bir grup tüm sonuç yazmaçlarını sıfırlar ve ilgisiz hedeflere dokunmaz. Geçersiz koordinatlar Vulkan görmeden önce güvenli getirme işlenenleriyle değiştirilir.",
        ],
      },
      {
        heading: "Hangi formatlar",
        paragraphs: [
          "DMASK 0x3 ile BY2; UNORM, SNORM, UINT, SINT'te R8 ve R16'yı ve R16 FLOAT'u kapsar. DMASK 0xF ile BY2; RG8 UNORM, SNORM, UINT ve SINT'i kapsar. DMASK 0xF ile BY4, bu dört sayısal türde R8'i kapsar. DMASK 0x1 ile PCK2; R8, R16 ve RG8 UNORM, UINT ve SINT'i kapsar. DMASK 0x1 ile PCK4; R8 UNORM, UINT ve SINT'i kapsar. Bu yüklemelerin açık mip varyantları aynı format listelerini kullanır.",
          "Arka uç çeviriye tam yerel formatı verir. Ayrı UINT ve SINT örneklenmiş görüntü bankaları, kayan noktalı ve karşılaştırma bankalarının yanında tamsayı sonuçlarının doğru türde kalmasını sağlar. NSA koordinatları, çakışan adres ve hedef yazmaçları ve sıradan EXEC maskesi korunur.",
        ],
      },
      {
        heading: "Bu değişiklik ne değildir",
        paragraphs: [
          "9 Ekim raporu ortak shader ve arka uç desteğidir. Bir oyun kimliğine veya shader özetine bağlı değildir. Yalnızca bu yüklemelerden bir oyun uyumluluğu sonucu veya kare hızı değişikliği iddia edilmez.",
          "Yazımlar ve ölçülen kümede olmayan format veya tanımlayıcı birleşimleri desteklenmiyor olarak kalır. Yatay toplamalar komşu komut ailesidir ve kendi sayfaları vardır.",
        ],
      },
    ],
    works: [
      "Açık mip'li ve mip'siz, ölçülen 2B BY2, BY4, PCK2 ve PCK4 yüklemeleri.",
      "Grup hizalaması, denetlenmiş sınırlar ve geçersiz bir grup için sıfırlanmış sonuçlar.",
      "UINT ve SINT türde kalsın diye ayrı tamsayı örneklenmiş görüntü bankaları.",
      "Korunan EXEC maskeleri, NSA koordinatları ve çakışan yazmaç çiftleri.",
    ],
    gaps: [
      "Bu biçimlerin görüntü yazımları uygulanmadı.",
      "Ölçülen tablonun dışındaki formatlar ve tanımlayıcı modları reddedilir.",
      "Testler hiçbir oyun için yeni bir saniyedeki kare değeri belirlemez.",
    ],
  },

  gather4h: {
    title: "Yatay toplamalar",
    summary: "IMAGE_GATHER4H ve IMAGE_GATHER4H_PCK, yatay bir texel grubu boyunca tek bir kanalı toplar. Ölçülen doğrudan 1B ve 2B alt küme 1.242 GPU dispatch'iyle kapsanır.",
    sections: [
      {
        heading: "Komut ne döndürür",
        paragraphs: [
          "Dikey bir toplama Y ekseninde dört texel okur. H biçimi onları X ekseninde okur. GATHER4H bu texel'lerin seçilen kanalını yazar. GATHER4H_PCK paketlenmiş ham texel akışını yazar. Hedef genişliği DMASK'ı izler ve komutun sahip olmadığı yazmaçlar değişmeden kalır.",
          "Kenarlar örnekleyicinin adresleme kurallarını kullanır. Görüntünün dışına düşen bir texel, komşu bir ayırmadan okunmak yerine işlenir. 9 Ekim yoklaması ölçülen doğrudan 1B ve 2B alt küme üzerinde 1.242 GPU dispatch'i çalıştırdı.",
        ],
      },
      {
        heading: "Dışarıda kalanlar",
        paragraphs: [
          "A16, D16, R128, dolaylı kaynak tabloları, dizi, küp ve MSAA görünümleri ve sıkıştırılmış formatlar ölçülen alt kümenin parçası değildir. Bu tanımlayıcı ve denetim modları açık sınırlamalar olarak kalır.",
          "Toplama işi çeviriciyi ve Vulkan görüntü yolunu çok texel'li yüklemelerle paylaşır. Detile adreslemesini değiştirmez ve bir kare hızı sonucu iddia etmez.",
        ],
      },
    ],
    works: [
      "Ölçülen doğrudan 1B ve 2B durumlar için IMAGE_GATHER4H ve IMAGE_GATHER4H_PCK.",
      "DMASK hedef genişlikleri ve ilgisiz yazmaçların korunması.",
      "1.242 GPU dispatch'iyle denetlenen, örnekleyiciye göre kenar işleme.",
    ],
    gaps: [
      "Dizi, küp, MSAA, sıkıştırılmış ve birkaç tanımlayıcı modu ölçülen alt kümede değil.",
      "A16, D16, R128 ve dolaylı tablolar sınırlama olarak kalıyor.",
      "Yoklamadan hiçbir oyun kare hızı çıkarılmaz.",
    ],
  },

  "scalar-calls": {
    title: "Skaler shader çağrıları",
    summary: "S_SWAPPC_B64 ve S_CALL_B64 tam bir dönüş adresi kaydeder ve ENDPGM'den sonra duran bir çağrılan dahil sınırlı bir yerel alt yordam çalıştırır. Doğrulanmış bir AGC getirme shader'ı da aynı şekilde bağlanabilir.",
    sections: [
      {
        heading: "Çağrı ve dönüş",
        paragraphs: [
          "SOP1 işlem kodu 0x21, S_SWAPPC_B64'tür. SOPK işlem kodu 0x16, hedefi PC + 4 + sign_extend(SIMM16) * 4 olan S_CALL_B64'tür; geriye doğru çağrılar da buna dahildir. İkisi de sonraki komutun adresini hedef SGPR çiftine yazar. Eşleşen bir S_SETPC_B64 oraya döner. CALL, SCC ve EXEC'e dokunmaz.",
          "Hedefi null olan bir SWAPPC, mevcut S_SETPC_B64 devamı olarak kalır. Yerel SWAPPC hedefleri bir GETPC ile tam genişlikte anlık bir toplama veya çıkarmadan çözülebilir. Komut bağlantı yazmacını da yazsa hedef yakalanır. ENDPGM'den sonra yaşayan bir çağrılan, ayırma ve komut sınırları içinde eşleşen dönüşüne kadar çözülür. Sıradan bir donanım devamı yine de sondaki meta veriden önce durur.",
        ],
      },
      {
        heading: "Çağrı nasıl dönüştürülür",
        paragraphs: [
          "Denetim akışı grafiği açık çağrı ve dönüş kenarları kazanır. Çağrılan, çağıranın yazmaç durumunu paylaşır ve sınırlı SPIR-V dağıtıcısını kullanır. Desteklenmeyen bir çağrı doğrusal denetim akışı yoluna düşemez. Ana sistem kaynak keşfi çağrıları ve dönüşleri izler; böylece çağrılanın içinde başlatılan bir tanımlayıcı yine görünür.",
          "Desteklenen her çağrı, s0:s1'den s104:s105'e kadar ayrı, çift hizalı bir SGPR çiftine ve tam olarak bir eşleşen dönüşe sahiptir. Çağrılanlar, denetleyicinin izin verdiği biçimlerde iç içe veya ardışıktır. Hedefin rastgele bir çalışma zamanı değeri olduğu genel dinamik hedefler desteklenmiyor olarak kalır.",
        ],
      },
      {
        heading: "Getirme shader'ları ve yoklama",
        paragraphs: [
          "Çağrının değişmemiş kullanıcı verisi çifti AGC'nin kaydettiği adresle eşleştiğinde harici bir getirme shader'ı bağlanır. Getirme gövdesi dönen SETPC'sine kadar çözülür ve o SETPC çağıranın bağlantı çiftini okumalıdır. Analiz önbelleği sıradan bir programı getirme gövdesinden ayırır; böylece daha eski bir getirme eklemesi yerel bir alt yordamın dönüşünün üzerine yazamaz.",
          "42 dispatch'lik bir GPU yoklaması 21.504 sözcüğü denetler. 9 Ekim raporu yalnızca çağrılardan yeni bir oyun aşaması veya yeni bir kare hızı iddia etmez.",
        ],
      },
    ],
    works: [
      "Tam dönüş adresi ve eşleşen bir S_SETPC_B64 ile S_SWAPPC_B64 ve S_CALL_B64.",
      "Mevcut sınırlar içinde iç içe çağrılanlar ve ENDPGM'den sonra yerleşen çağrılanlar.",
      "Dönüşü çağıranın bağlantısını okuyan doğrulanmış bir AGC getirme shader'ının bağlanması.",
      "21.504 sözcüğü kapsayan 42 dispatch'lik bir yoklama.",
    ],
    gaps: [
      "Genel dinamik çağrı hedefleri desteklenmiyor.",
      "Bir çağrının çift hizalı bir bağlantı çiftine ve tek bir eşleşen dönüşe ihtiyacı var.",
      "Yoklama bir saniyedeki kare sonucu değildir.",
    ],
  },

  vulkan: {
    title: "Vulkan işleyicisi",
    summary: "Vulkan arka ucu sürücüyü çalışma zamanında yükler, Vulkan 1.2 gerektirir ve misafir karelerini bir swapchain üzerinden gösterir. İşleme hedefleri, depolama görüntüleri ve pipeline'lar çizimler arasında bellekte kalır.",
    sections: [
      {
        heading: "Aygıt ve bellek",
        paragraphs: [
          "İşleyici platformun Vulkan yükleyicisini kendisi yükler; böylece derleme Vulkan SDK başlıklarına ihtiyaç duymaz. Başlatma, çeviricinin SPIR-V 1.5'ini kabul eden sürüm olan Vulkan 1.2'yi ister ve hem grafik hem compute yapabilen bir kuyruk ailesine sahip ayrık bir aygıtı tercih eder. Hata ayıklama sürümlerinde, kuruluysa doğrulama katmanları istenir.",
          "Tek bir tanımlayıcı düzeni 64 depolama arabelleği, ayrı 64 kayıtlık 2B ve 3B örneklenmiş görüntü dizileri ve türlendirilmiş depolama görüntüleri tutar. 512 kümelik bir halka, 128 MiB'lık bir yükleme alanı ve kalıcı misafir işleme hedefleri bir karenin kaynaklarını aygıtta tutar. Grafik çevirileri 256 MiB'lık, 1.024 kayıtlık bir önbellek kullanır. Akışla yüklenen bir sahne eski 64 MiB'lık bütçeyi aşmış ve aynı modülleri her karede yeniden çeviriyordu.",
        ],
      },
      {
        heading: "Pipeline'lar ve zaman çizelgeleri",
        paragraphs: [
          "Pipeline derlemesi varsayılan olarak iki çalışan kullanır. PS5_GPU_COMPILER_WORKERS bir ile dört arasında ayarlanabilir. PS5_GPU_ASYNC_PIPELINES=0 eşzamanlı derlemeye döner ve compute ısınmasını kapatır. Isınma, önceden derlenmiş compute modüllerini bir sonraki başlatmada sürücü önbelleğine yeniden oynatır. Onları asla dispatch etmez ve geçici pipeline'ları yok eder. Sürücü önbelleği ayrıca vulkan_pipeline_cache.bin'de 4 GiB'a kadar saklanır. Bozuk bir dosya atılır. Yalnızca açılış süresini etkileyebilir.",
          "Varsayılan uyumluluk profili gönderilen her grubu bekler. PS5_GPU_TIMELINE_SCHEDULER=1 ile seçilen zaman çizelgesi zamanlayıcısı, birkaç grubun işlemde kalmasına izin verir ve gerçek bir geri okumada, bir misafir eşzamanlama noktasında veya tükenmiş bir kaynak halkasında bekler. Tek bir oyun, PPSA25872, ölçülmüş karşılaştırmalardan sonra bu zamanlayıcıyı ve ertelenmiş küçük depolama geri yazımını kendiliğinden açar. Görüntü düzeni her görünüm yönü, mip ve dizi katmanı için izlenir; bariyerler o alt kaynağın önceki kullanımından gelir.",
        ],
      },
      {
        heading: "Formatlar ve bellekte kalma",
        paragraphs: [
          "BC1'den BC7'ye, tamsayı ve normalleştirilmiş kanallar, R16 ve RG16, yarım kayan nokta ve RGBA32_FLOAT dahil elli altı ana sistem formatına ulaşılabilir. Misafir görüntü ayırmaları renk, derinlik, depolama ve örneklenmiş kullanımlar arasında tek bir takma ad kaydını paylaşır. İmzalar eşleştiğinde sonraki bir geçiş, önceki bir geçişin yazdığı bir derinlik hedefini misafir belleğine gidip gelmeden örnekleyebilir. Yeniden yorumlamalar ve kısmi çakışmalar misafir belleği üzerinden geri döner.",
          "GPU'da compute detile, 4, 8 ve 16 baytlık 2B ve 3B standart ve PRT yüzeyleri kapsar. RB+ ve MSAA detile hâlâ CPU'da çalışır. Tek örnekli paketlenmiş 11/11/10 UNORM hedefleri bir depolama arabelleği kopyası ve bir parça shader'ında açma, harmanlama ve yeniden paketleme ile harmanlanır. VideoOut bu görüntülerin üzerindeki swapchain'dir.",
        ],
      },
    ],
    works: [
      "Çalışma zamanında Vulkan 1.2 aygıt seçimi, bir swapchain ve bellekte kalan işleme hedefleri.",
      "Elli altı ana sistem formatı, alt kaynak başına düzen takibi ve bir görüntü takma adı kaydı.",
      "İki derleyici çalışanı, kalıcı bir sürücü önbelleği ve isteğe bağlı compute ısınması.",
      "İsteğe bağlı bir zaman çizelgesi zamanlayıcısı; bir oyun onu varsayılan olarak açar.",
    ],
    gaps: [
      "Varsayılan profil hâlâ her grubu bekliyor. Zaman çizelgesi gönderimi isteğe bağlı.",
      "RB+ ve MSAA detile CPU kullanıyor.",
      "Format listesi, oyun aydınlatmasının veya her sıkıştırılmış meta veri yolunun çalıştığı anlamına gelmez.",
    ],
  },

  msaa: {
    title: "MSAA",
    summary: "Eşleşen 2×, 4× ve 8× renk ve derinlik örnek sayıları, sonraki bir çözümlemeye kadar ana sistem görüntüsünde kalır. Asterix bu yolu MSAA derinlik ve stencil için kullanır; bu da büyük, kazara bir geri okumayı kaldırdı.",
    sections: [
      {
        heading: "Ana sistem görüntüsünde örnek sayıları",
        paragraphs: [
          "Bir PlayStation 5 işleme hedefi iki, dört veya sekiz örnekle saklanabilir. PS5PCEM, örnek sayıları eşleştiğinde bir renk hedefini ve bir derinlik hedefini Vulkan görüntüsünde tutar ve daha sonra çözümler. Misafir örnek sayısı, swizzle modu ve meta veri işaretçilerinin yanında kaynak anlık görüntüsünün bir parçasıdır.",
          "Oberon 16 borulu, 8 paketleyicili RB+ adres denklemleri hem renk hem derinlik için dizi dilimini ve 2×, 4× ve 8× örnek bitlerini içerir. GPU compute detile henüz bu denklemleri kullanmıyor. RB+ ve MSAA yüzeyleri CPU detile'a geri düşer. Örnekler yine doğrudur. Geri düşmek bir maliyettir ve MSAA'nın tamamen GPU'da kalan bir yol olarak anlatılmamasının nedeni budur.",
        ],
      },
      {
        heading: "Asterix'te derinlik ve stencil",
        paragraphs: [
          "Asterix & Obelix: Slap Them All! açılış ormanını MSAA derinlik ve stencil ile çizer. Örnek sayısını yok sayan yalnızca derinlik içeren bir geçiş, eki bir tanılama olarak geri okuyordu. Eşleşen MSAA derinlik ve stencil ekleri kalıcı derinlik yolunda kalır ve misafirin istediği stencil karşılaştırması ve güncellemesi uygulanır.",
          "MSAA renk ekleri bu arka uçta artık depolama görüntüsü kullanımı istemiyor. RTX 3070 Ti'de 1080p çıkışta, o açılış ormanının 30 saniyelik sabit bir arayüz sayacı örneği medyan 46,45 FPS'den 162,20 FPS'ye yükseldi. Bu rakam o görünüme aittir. Sonraki bölümlerde bir en düşük değer değildir. Hareket, zıplama ve ilk Romalı karşılaşması geliştirme sürümünde yeniden denetlendi.",
        ],
      },
      {
        heading: "Çözümlemenin kapsamadıkları",
        paragraphs: [
          "Eşleşen bir örnek sayısının sonraki çözümlemesi uygulandı. CMASK'a bağlı sıkıştırılmış bir FMASK yüzeyi farklı bir mekanizmadır ve bu yolun dışında kalır. Desteklenmeyen bir MSAA içe aktarması, başlatılmamış sıkıştırılmış veriyi örneklemek yerine güvenli ilk kullanım temizlemesini korur.",
          "233 Vulkan testinin tamamı ve yerel 2× ve 4× derinlik ve stencil yoklamaları Asterix düzeltmesiyle geçti. İmzalı çalıştırıcı bunu içeriyor. Değişiklik 0.3.4 sürüm notlarından daha yeni.",
        ],
      },
    ],
    works: [
      "Eşleşen 2×, 4× ve 8× renk ve derinlik örnek sayıları için ana sistem görüntüleri ve sonraki bir çözümleme.",
      "Stencil karşılaştırması ve güncellemesi dahil MSAA derinlik ve stencil ekleri.",
      "Oberon örnek biti denklemlerini kullanan, MSAA ve RB+ adreslemesi için CPU detile.",
      "O sabit görünümde medyan 162,20 FPS ölçülen Asterix açılış ormanı düzeltmesi.",
    ],
    gaps: [
      "GPU compute detile MSAA'yı veya RB+'yı kapsamıyor. Bu yüklemeler CPU kullanıyor.",
      "CMASK'a bağlı FMASK sıkıştırılmış meta veri olarak çözümlenmiyor.",
      "Asterix rakamı tek bir GPU'da tek bir görünümdür; oyun için bir kare hızı sözü değildir.",
    ],
  },

  metadata: {
    title: "HTILE, DCC, CMASK ve FMASK",
    summary: "HTILE, DCC, CMASK ve FMASK konsolun sıkıştırılmış derinlik ve renk meta verileridir. PS5PCEM işaretçileri izler, anladığı durumlarda HTILE'ı temizler ve aksi hâlde yanlış detile edeceği bir düzeni reddeder.",
    sections: [
      {
        heading: "Dört ad nedir",
        paragraphs: [
          "HTILE derinlik meta verisidir. PS5PCEM'in uyguladığı GFX10 deseninde bir dword 8×8 piksellik bir bölgeyi kapsar ve bu dword'ler 1024'e 512 pikseli kapsayan 32 KiB'lık bir bloğa paketlenir. DCC, renk hedefleri için delta renk sıkıştırmasıdır. CMASK bir hızlı temizleme ve genişletme maskesidir. FMASK, çok örnekli bir çözümlemeye hangi örneğin hangi piksele ait olduğunu söyler.",
          "Kaynak anlık görüntüsü, GFX10 doğrusal CMASK biti dahil meta veri işaretçilerini ve düzen seçicilerini tutar. Bu bit önemlidir; çünkü döşemeli bir adres denklemini doğrusal bir CMASK'a uygulamak maskeyi sessizce karıştırırdı. Arka uç bunun yerine desteklenmeyen düzeni reddeder.",
        ],
      },
      {
        heading: "Temizlemeler ve derinlik",
        paragraphs: [
          "İşleyicinin anladığı düzenler için doğru HTILE ve DCC temizlemeleri uygulandı. Tekrarlanan meta veri temizlemeleri vulkan-smoke htile-clears yoklamasıyla kapsanır. Sıfırlanmış bir derinlik kapsamı yalnızca etkin, HTILE destekli bir yüzey için kurtarılır; bu da Ghost of Yōtei'nin G-buffer'ını sağlam tutar ve eskimiş 1×1'lik bir arayüz derinlik bağlamasının ek boyutu denetiminde başarısız olmasına yine izin verir.",
          "Tek örnekli misafir derinliği ve stencil'ı PS5_GPU_DEPTH_TRANSFER=1 olduğunda içe aktarılıp geri yazılabilir. Bağlı stencil düzlemleri, misafirin karşılaştırma ve güncelleme işlemleriyle paketlenmiş derinlik artı stencil eklerine dönüşür. Çok örnekli derinlik MSAA yolunu kullanır. HTILE içindeki sıkıştırılmış Z aralığı ve hiyerarşik Z tam olarak yorumlanmıyor.",
        ],
      },
      {
        heading: "Hâlâ açıkça belirtilenler",
        paragraphs: [
          "GPU notlarında belirtilen kalan iş; katman görünümlerinin geri kalanı, kalan sıkıştırılmış DCC ve FMASK durumları, HTILE Z aralığı ve Hi-Z ile FMASK'a bağlı CMASK durumlarıdır. Desteklenmeyen bir MSAA içe aktarması ilk kullanım temizlemesini korur. Sıkıştırılmış yüzeyi düz texel'lermiş gibi örneklemek, bu reddin önlemek için var olduğu hatadır.",
          "Bu yüzden meta veri desteği bilerek kısmidir. İşaretçiler çözülür. Doğrulanmış düzenlere uyulur. Doğrulanmamış düzenler reddedilir veya temizlenir.",
        ],
      },
    ],
    works: [
      "32 KiB'lık bloklarda 8×8 başına bir dword ile HTILE desen-21 adreslemesi.",
      "İşleyicinin anladığı düzenler için HTILE ve DCC temizlemeleri.",
      "Doğrusal bir maskeye döşemeli denklem uygulamayı reddeden doğrusal CMASK algılama.",
      "İsteğe bağlı tek örnekli derinlik ve stencil içe aktarma ve geri yazma.",
    ],
    gaps: [
      "Tam HTILE Z aralığı ve hiyerarşik Z yorumlaması eksik.",
      "Sıkıştırılmış DCC ve FMASK durumları ile FMASK'a bağlı CMASK hızlı yolun dışında kalıyor.",
      "Desteklenmeyen sıkıştırılmış bir içe aktarma, ham texel'ler olarak örneklenmek yerine temizlenir.",
    ],
  },

  detile: {
    title: "Doku detile işlemi",
    summary: "PS5 dokuları doğrusal satırlarda değil, GFX10 swizzle desenlerinde saklanır. PS5PCEM adres denklemlerini CPU'da ve uygun büyük 4, 8 ve 16 baytlık yüzeyler için GPU'da uygular.",
    sections: [
      {
        heading: "Adres denklemleri",
        paragraphs: [
          "Döşemeli bir doku, komşu pikseller farklı bellek kanallarına düşsün diye piksel koordinatını boru, banka ve örnek bitleriyle XOR'lar. PS5PCEM doğrusal düzenler, Standart 256 baytlık, 4 KiB'lık ve 64 KiB'lık döşemeler, kısmen bellekte bulunan 64 KiB'lık döşemeler, derinlik Z_X ve işleme hedefi R_X için GFX10 denklemlerini uygular. Aynı sözleşme mip kuyruklarını ve kalın 3B blokları da kapsar.",
          "En fazla on altı mip seviyesi en küçüğü önce gelecek şekilde yerleştirilir. Küçük seviyeler tam 4 KiB ve 64 KiB'lık mip kuyruğu konumlarını paylaşır. Üç boyutlu kaynaklar kalın bloklar ve derinlik blok dilimleri kullanır. Her alt kaynak tek bir denetlenmiş kaynak bayt konumu sunar. Arabellek, görüntü, blok sıkıştırmalı, renk hedefi ve derinlik hedefi bağdaştırıcıları hiçbir şey ayırmaz ve bir taşmayı veya kısa bir aralığı reddeder.",
        ],
      },
      {
        heading: "GPU detile ve CPU yedeği",
        paragraphs: [
          "Büyük 4 baytlık standart 256 baytlık, 4 KiB'lık ve 64 KiB'lık yüzeylerin ve büyük doğrusal yüzeylerin ilk kullanım yüklemeleri GPU'da detile edilir. Compute çekirdeği işaretçisiz bir anahtar ve 84 baytlık bir parametre bloğu alır: blok boyutu, kuyruk, satır aralığı, dilim, örnek sayısı ve 64 bitlik bir arabellek konumu; hepsi kararlı, tümü 32 bitlik bir düzende. Sekiz ve on altı baytlık 2B ve 3B standart ve PRT yüzeyler aynı GPU ailesindedir.",
          "RB+ ve MSAA dahil diğer aileler CPU'da kalır. Bunlar için Oberon denklemleri örnek bitlerini içerir ve CPU yolu onları kullanır. Geri düşmek bir bant genişliği maliyetidir. Farklı bir piksel formatı değildir. Canlı bir çizimdeki tanılamalar aileyi, 3B blok boyutlarını, örnek sayısını, mip kuyruğu sınırını ve misafir ayırma boyutunu bildirir.",
        ],
      },
      {
        heading: "Detile neden kare süresinde görünür",
        paragraphs: [
          "Her karede yeniden yüklenen bir doku detile maliyetini her karede öder. Sayfa izleyici açıkken değişmemiş bir sayfanın bellekte kalmasına izin verir; böylece detile atlanır. GPU'nun kendisinin yeniden yazdığı bir doku yine de geçersiz kılınmalıdır. Detile bu tutarlılık kuralının yerini almaz.",
          "Örneklenmiş görünümler, sıfır olmayan bir taban seviyesi dahil, tanımlayıcının belirttiği mip aralığını detile eder. Bu durumda Vulkan görüntüsünün mip 0'ı görünümün taban seviyesidir. Görünüm yolunda hâlâ eksik olan bileşen swizzle'ları, adres denkleminden ayrı bir sınırlamadır.",
        ],
      },
    ],
    works: [
      "Mip kuyrukları ve 3B bloklar dahil GFX10 doğrusal, Standart, PRT, derinlik ve işleme hedefi adres denklemleri.",
      "Büyük 4, 8 ve 16 baytlık 2B ve 3B standart ve PRT yüzeyler için GPU compute detile.",
      "MSAA ve RB+ örnek bitleri dahil kalan aileler için CPU detile.",
      "Kısa aralıkları ve taşmaları reddeden denetlenmiş alt kaynak konumları.",
    ],
    gaps: [
      "MSAA ve RB+ detile CPU'da çalışıyor.",
      "Bazı bileşen swizzle'ları ve katman görünümleri hâlâ eksik.",
      "CPU'nun yüklemeden sonra yazdığı bir yüzey yeniden örneklenmeden önce geçersiz kılınmalı.",
    ],
  },

  "page-tracker": {
    title: "GPU sayfa izleyicisi",
    summary: "İsteğe bağlı sayfa izleyici 16 KiB'lık misafir sayfalarını izler. İlk yerel CPU yazımı hata verir, bir nesil ilerletir ve GPU kopyasını geçersiz kılar; böylece değişmemiş sayfalar her karede özetlenip yüklenmez.",
    sections: [
      {
        heading: "Çözdüğü sorun",
        paragraphs: [
          "Misafir belleğinde yaşayan bir işleme hedefi veya köşe noktası arabelleği GPU'ya ulaşmalıdır. Tüm ayırmayı her karede yüklemek doğru ama pahalıdır. Değişmediğini anlamak için tüm ayırmayı özetlemek de pahalıdır. Sayfa izleyici bunun yerine izlenen yazılabilir bir sayfayı salt okunur olarak işaretler ve CPU'nun ilk yazımda hata vermesine izin verir.",
          "Hata işleyicisi sayfayı kaydeder, misafirin gerçek korumasını geri yükler ve o sayfanın neslini ilerletir. Sonraki bir çizim nesilleri karşılaştırır. Değişmemiş bir sayfa aygıtta kalır. Nesli ilerlemiş bir sayfa yüklenir. PS5_GPU_PAGE_TRACKER=1 mekanizmayı açar. Bu değişken veya deneysel paket ayarlanmadıkça kapalıdır.",
        ],
      },
      {
        heading: "Hata nedir",
        paragraphs: [
          "Hata bir misafir hatası değil, bir geçersiz kılmadır. Sayfa yalnızca ana sistem yazımı gözlemleyebilsin diye salt okunurdu. Ardından misafir yazımının, oyunun istediği koruma altında tamamlanmasına izin verilir. İzlenmeyen sayfalar sıradan yükleme yolunu korur.",
          "Aynı adres, boyut, fiziksel konum ve CPU izinleriyle yeniden oluşturulan doğrudan bellek eşlemeleri ana sistem görünümlerini korur. Bir neslin kareler arasında anlamlı olmasını sağlayan bu yeniden kullanımdır. Destek veya izin değişikliği normal değiştirme yolundan geçer ve izleyici yeni eşlemeyi gözlemler.",
        ],
      },
      {
        heading: "Yapmadıkları",
        paragraphs: [
          "İzleyici bir oyunun iç çözünürlüğünü küçültmez ve shader derlemez. Yalnızca CPU'nun yazmadığı sayfaların tekrarlanan aktarımlarını kaldırır. Bir arabelleği her karede yeniden yazan bir oyun o arabellek için yine bedel öder.",
          "Yazı tipi atlası yazımları ve diğer HLE yazımları, misafir belleğini değiştirmeden önce izlemeleri geçersiz kılar; böylece bir sistem yazılımı yazımı GPU'dan gizli kalmaz. İzleyici, mimari genel bakışta anlatılan deneysel GPU kümesinin parçasıdır.",
        ],
      },
    ],
    works: [
      "PS5_GPU_PAGE_TRACKER=1 olduğunda 16 KiB'lık misafir sayfaları için sayfa başına nesiller.",
      "Misafir korumasını geri yükleyen ve bellekteki kopyayı geçersiz kılan ilk yazım hatası.",
      "Nesiller kareler arasında korunsun diye aynı doğrudan bellek görünümlerinin yeniden kullanımı.",
      "HLE'nin kendisi izlenen bir sayfaya yazdığında geçersiz kılma.",
    ],
    gaps: [
      "İzleyici isteğe bağlıdır. Varsayılan uyumluluk yolu ona bağlı değildir.",
      "CPU'nun her karede yeniden yazdığı sayfalar yine yüklenir.",
      "Sıkıştırılmış bir meta veri yüzeyi içindeki GPU'dan GPU'ya tutarlılığı kapsamaz.",
    ],
  },

  videoout: {
    title: "VideoOut",
    summary: "VideoOut misafirin ekran arabelleklerini kaydeder ve bir kare değişimini ancak sunum geri çağırması kareyi kabul ettikten sonra tamamlar. Ana sistem penceresi 1080p SDR'de bir Vulkan swapchain'idir.",
    sections: [
      {
        heading: "Kayıt ve kare değişimleri",
        paragraphs: [
          "VideoOut en fazla on altı kayıtlı ekran ayırması ve dört öznitelik grubu tutar. Sürücü ABI'sinin kullandığı bitişik on altı etiketlik kaydı yayımlar. Kaydetme, değiştirme ve kaydı silme doğrulanır. Oyunların açılış sırasında kullandığı -1 arabelleğinin boş kare değişimi kabul edilir.",
          "CPU kare değişimleri ve boru sonu kare değişimleri canlı komut arabelleği arka ucundan geçer. Normal bir kare değişimi ancak sunum geri çağırması kareyi kabul ettikten sonra tamamlanır. Tamamlama, çağıranın kullanıcı verisiyle VideoOut olay kuyruğunda iletilir. Kuyruk filtresi, çekirdeğin kullandığı aynı kullanıcı kenarı olay uygulamasıdır ve kaydın tanımlayıcısı korunur.",
        ],
      },
      {
        heading: "Ana sistemin gösterdiği",
        paragraphs: [
          "Oyun penceresi bir Vulkan swapchain'idir. VideoOut 1080p SDR bildirir. 120 Hz kullanılamaz olarak bildirilir. Varsayılan oyun tercihi performans modunu ister. İç çözünürlük oyunun denetiminde kalır: 4K'da işleyen bir oyun yine 4K hedefler ayırır ve swapchain oyunun kaydettiği ekran çıkışını gösterir.",
          "SetFlip, VideoOut yuvasını ve arabellek indeksini çözer, eşleşen misafir adresine sahip önbelleğe alınmış hedefi seçer ve kareyi yayımlar. Kare değişim hızı pencere başlığında gösterilebilir. Başlatıcı bu tercihi saklar; komut satırından bir çalıştırma da PS5_SHOW_FPS=1 ayarlayabilir.",
        ],
      },
      {
        heading: "Videolar ve ekran çıkışı",
        paragraphs: [
          "Giriş videoları VideoOut'u atlamaz. AvPlayer oyuna ait arabelleklere çözer; onları oyunun kendi shader'ları veya kayıtlı bir ekran çıkışı gösterir. Asterix, misafirin negatif yükseklikli görüntü alanını ekran çıkışı yönü olarak korur; böylece birleştirme çıkışta baş aşağı çevrilmez.",
          "Eksik bir Vulkan yükleyicisi, eksik bir sunum aygıtı veya eksik bir pencere bildirilir ve oyun arayüzsüz yolda devam eder. Arayüzsüz mod tanılama içindir. İkinci, daha hızlı bir işleyici değildir.",
        ],
      },
    ],
    works: [
      "En fazla on altı ekran arabelleği, dört öznitelik grubu ve on altı etiketlik ABI.",
      "Ancak sunum geri çağırması kareyi kabul ettikten sonra tamamlanan kare değişimleri.",
      "1080p SDR bildiren ve 120 Hz'i kullanılamaz bırakan bir Vulkan swapchain'i.",
      "Varsayılan olarak performans modu tercihi ve isteğe bağlı kare değişim hızı başlığı.",
    ],
    gaps: [
      "120 Hz ve ana sistem HDR swapchain'i sunulmuyor.",
      "İç çözünürlük, oyunun ayırdığı neyse odur.",
      "Bir sunum aygıtı olmadan işlem arayüzsüz kalır.",
    ],
  },

  audio: {
    title: "AudioOut",
    summary: "AudioOut misafir PCM'ini bir Windows aygıtında 48 kHz'de çalar. Eski portların kendi akışları ve kuyrukları vardır; böylece müzik ve efektler birlikte çalışır ve bir alt akış örnek sırasını korur.",
    sections: [
      {
        heading: "Portlar ve ana sistem aygıtı",
        paragraphs: [
          "Bir oyun bir arabellek gönderir ve çağrının yaklaşık arabelleğin çaldığı süre kadar sürmesini bekler. Bu bekleme, örnekleri atan bir uykudan değil, ana sistem aygıtının yer açmasından gelir. AudioOut, AudioIn ve AudioOut2 hızı ayarlanmış portları, kuyrukları, hoparlör meta verisini ve bağlı birincil durumunu sunar. Bir grup her portu doğrular ve ardından duyulabilir parçayı bir kez gönderir; böylece sessiz bir yardımcı port süreyi çoğaltmaz.",
          "Eski AudioOut portları ayrı Windows akışlarına ve PCM kuyruklarına sahiptir. Müzik ve efektler aynı anda çalabilir. Grup çıkışı her etkin portu gönderir. Bir alt akıştan sonra etkin halka örnek sırasını korur ve kısa bir geçiş devam etmedeki tıklamayı giderir. WinMM aygıtı gerçek PCM'i önceden doldurur ve bir milisaniyelik zamanlayıcı periyodu kullanır.",
        ],
      },
      {
        heading: "Gecikme",
        paragraphs: [
          "Sıradan yedek 42 ms'den başlar ve yalnızca çalışan oyun aygıtı gerçekten aç bıraktığında dört arabelleklik adımlarla yaklaşık 170 ms'ye kadar büyür. PPSA25872 için ölçülmüş profil 128 ms'den başlar; çünkü karıştırıcısı açılış ve sahne işi sırasında yaklaşık 100 ila 120 ms duraklayabiliyor. Bu daha büyük yedek diğer oyunlara dayatılmaz.",
          "Sonlu olmayan örnekler aygıta ulaşmadan önce değiştirilir. Bu temizleyici hoparlörleri korur. Zaten NaN depolamış bir filtreyi onaramaz. ACM sayfası, Subnautica'da bu değerleri üreten evrişim hatasını anlatır.",
        ],
      },
      {
        heading: "Çıkışın olduğu yerler",
        paragraphs: [
          "Bir aygıtın açılamaması oyuna bildirilmez. Eksik bir ses kartı ana sisteme dair bir gerçektir. Çağıran, oyunun zamanlaması yine ilerlesin diye hızı ayarlanmış sessiz bir beklemeye geri düşer. Aygıt çalışma sırasında ölürse de aynısı olur. Çıkış Windows'ta uygulandı. Diğer sürümler portları sessiz ve doğru hızda tutar.",
          "Çözülmüş önizleme kliplerinin doğrudan yedek karıştırması varsayılan olarak kapalıdır. Bir önizlemeyi oyunun kendi AudioOut karışımının yanında çalmak yankı olarak duyulur. PS5_AUDIO_FALLBACK_MIX=1 bu karışımı açar. Başlatıcı, PS5_AUDIO_DISABLED olarak ulaşan ses ayarıyla aygıtı susturabilir.",
        ],
      },
    ],
    works: [
      "Hızı ayarlanmış AudioOut, AudioIn ve AudioOut2 portlarıyla 48 kHz ana sistem oynatımı.",
      "Eski portlar için ayrı Windows akışları; böylece eşzamanlı müzik ve efektler sıralı kalır.",
      "42 ms'den başlayan ve yalnızca aygıt aç kaldığında yaklaşık 170 ms'ye kadar büyüyen bir yedek.",
      "Sonlu olmayan örneklerin değiştirilmesi ve hiçbir aygıt açılmadığında sessiz, hızı ayarlanmış bir yedek.",
    ],
    gaps: [
      "Ana sistem çıkışı yalnızca Windows'ta.",
      "Kumanda titreşimi bir ses haptik parçasından sürülmüyor.",
      "Temizleyici zaten zehirlenmiş bir filtre geçmişini yeniden oluşturmaz.",
    ],
  },

  acm: {
    title: "ACM evrişimi",
    summary: "ACM evrişimi FMOD'un bölümlenmiş yankısını CPU'da çalıştırır. Ortak girdili gruplar tek bir kuru sinyali dönüştürür, kayan nokta veya yarım kayan nokta dürtü bölümlerini uygular ve ıslak sonucu örtüştür-topla yöntemiyle birleştirir.",
    sections: [
      {
        heading: "Kapattığı hata",
        paragraphs: [
          "Subnautica: Below Zero bir çıtırtıyla başlayıp sessizleşebiliyor ve dakikalar sonra toparlanıyordu. Ana sistem aygıtına ulaşan PCM sonlu olmayan kayan noktalı değerler içeriyordu. FMOD'un DSP geri çağırmalarının bellek içi izi, evrişimli yankıya sonlu sesin girdiğini ve çöpün çıktığını gösterdi. sceAcm_ConvReverb_SharedInput, grup gönderimi ve sceAcmBatchWait HLE işlevleri bir çıktı yazmadan başarı döndürüyordu.",
          "FMOD ardından bu yazılmamış ıslak arabelleği grafiğe karıştırıyordu. NaN'ler sonraki efektlere yayılıyordu. AudioOut'un temizleyicisi onları sessizlikle değiştiriyor ve zehirlenmiş filtre geçmişini onaramıyordu. İkinci bir hata, ilk grup tanımlayıcısı -1 üzerindeki beklemenin başarılı olmasına yol açıyordu. FMOD başarısız bir ilk beklemeyi 'henüz önceki ıslak arabellek yok' olarak yorumlar ve yalnızca gerçekten tamamlanmış bir işten sonra karıştırır.",
        ],
      },
      {
        heading: "Bölümlenmiş evrişim",
        paragraphs: [
          "Tanımlayıcı düzeni FMOD'un ACM arka ucunda gözlenenle eşleşir. Dürtü yanıtı bölümleri serpiştirilmiş karmaşık kutulardır. B kutudan oluşan bir blok 2B uzunluğunda bir dönüşüme aittir. Girdi, çıktı ve örtüşme arabellekleri ayrı ve düzlemseldir. Yalnızca gözlenen sıfır konumlu float32 ve float16 spektrum düzenleri kabul edilir.",
          "Bir grup CPU'da çalışır. Girdi geçmişi taneler arasında ve halka dönüşünde korunur ve örtüşme sonraki çıktı tanesine taşınır. Birkaç çıktı tek bir girdi dönüşümünü ve tek bir geçmiş ilerletmesini paylaşabilir. Mono girdi birden fazla kanalı besleyebilir. Ters dönüşüm normalleştirilir. Gerçek bir dürtü bölümünün bağımsız tersi enerjisini sıfırla doldurulmuş bloğun ilk yarısına koydu; bu da spektrum işaretini doğruluyor. Oyunun kullandığı paketlenmiş dürtü Nyquist kutusunu içermez.",
        ],
      },
      {
        heading: "Beklemeler, sınırlar ve yeniden test",
        paragraphs: [
          "Oluşturucular işaretçi dizilerini ve kazançları sınırlı bir komut kaydına alır. PCM'in kendisi grup başladığında okunur. Bir bekleme yalnızca bu bağlamın gerçekten tamamladığı bir grup için başarılı olur. Bağlamı yok etmek geçmişi serbest bırakır. Geçersiz sınırlar, bilinmeyen komut kodlamaları ve desteklenmeyen düzenler hata döndürür.",
          "Bağımsız ACM FFT, IFFT ve panner işlemleri uygulanmadı. Kanallar 8, çıktılar 32 ve blok 1024 ile sınırlıdır. Geçmiş depolaması sınırlıdır. İmzalı çalıştırıcıda saniyede bir alınan 90 PCM anlık görüntüsü sonlu olmayan örnek içermedi; zirve 0,1255 idi ve 0,001'in üzerindeki ilk ses 11,03. saniyede geldi. Geliştirici sesi doğruladı. Örnekler bir yoklamadır, oyunun ürettiği her örnek değil.",
        ],
      },
    ],
    works: [
      "FMOD'un ortak girdili ve ortak IR'li yankı grupları için bölümlenmiş FFT evrişimi.",
      "Float32 ve float16 karmaşık spektrumlar, örtüştür-topla ve taneler arası geçmiş.",
      "Yalnızca o bağlamın tamamlanmış bir grubu için başarılı olan beklemeler. İlk -1 tanımlayıcısı başarısız olur.",
      "Subnautica yeniden testinde sonlu PCM; çıtırtı ve sonraki sessizlik yok.",
    ],
    gaps: [
      "Bağımsız ACM FFT, IFFT ve panner çağrıları uygulanmadı.",
      "Sıfır olmayan spektrum konumları ve ölçülmemiş yönlendirme düzenleri reddedilir.",
      "Evrişim CPU'da çalışır. GPU FFT yolu yok.",
    ],
  },

  ajm: {
    title: "AJM kodekleri",
    summary: "AJM; ATRAC9, MP3, MPEG-4 AAC ve Opus'un kodunu çözer. Her kodek örneği kendi durumunu tutar ve bilinmeyen bir kodek sessiz bir başarı olarak bildirilmek yerine reddedilir.",
    sections: [
      {
        heading: "Kodekler ve örnek formatları",
        paragraphs: [
          "Kodek 0, minimp3 üzerinden MP3'tür. Kodek 1, ATRAC9'dur. Kodek 2, ADTS, ham ve SAF işleri için FAAD2 üzerinden MPEG-4 AAC'dir. Kodek 24, libopus üzerinden Opus'tur. ATRAC9 çıktısı işaretli 16 bit, işaretli 32 bit, kayan nokta veya düzlemsel olabilir. Başlatma, kodek bilgisi, boşluksuz oynatma meta verisi, akış bayt sayıları, çözülmüş kare sayıları ve toplam örnek yan bantları korunur.",
          "İşler bitişik bir arabellek veya bölünmüş bir arabellek kullanabilir. Örnek durumu her kod çözücüye aittir; böylece iki akış bir bit haznesini paylaşmaz. Eski libSceAudiodec yolu, kendi başlatma, oluşturma, sıfırlama ve silme çağrılarından sonra ATRAC9, MP3 ve AAC için aynı arka ucu kullanır.",
        ],
      },
      {
        heading: "Video sesi ve önizlemeler",
        paragraphs: [
          "Gözlenen PlayStation 5 çok kanallı ATRAC9 düzeni serpiştirilmiş mono akışlar olarak çözülür. Ghost of Yōtei'nin video sesi bu düzen sayesinde doğru noktada başlar. Videonun taşıdığı haptik parça sessizlikle zamanlanır. Kumanda titreşimi ondan sentezlenmez.",
          "FSB destekli yedek önizlemeler 48 kHz karışıma yeniden örneklenir, kısa bir geçiş eklenir ve bir kez boşaltılır. PS5_AUDIO_FALLBACK_MIX=1 olmadıkça canlı AudioOut grafiğine karıştırılmazlar; çünkü aynı klibin ikinci bir kopyası yankıdır.",
        ],
      },
      {
        heading: "Lisanslar",
        paragraphs: [
          "ATRAC9, FAAD2, minimp3 ve Opus üçüncü taraf kod çözücülerdir. Lisansları deponun docs/licenses dizininde ve taşınabilir sürümle birlikte gelir. Emülatörün kendi kodu GPL-3.0-or-later olarak kalır.",
          "Uygulanan dört değerin dışındaki bir kodek numarası hatadır. Sıfırlarla dolu bir arabellek ve bir başarı kodu döndürmek, bir oyunun akışın çözüldüğüne inanmasına yol açardı.",
        ],
      },
    ],
    works: [
      "Örnek başına kod çözücü durumuyla ATRAC9, MP3, MPEG-4 AAC ve Opus.",
      "İşaretli 16 bit, işaretli 32 bit, kayan nokta veya düzlemsel PCM olarak ATRAC9 çıktısı.",
      "Boşluksuz oynatma ve yan bant meta verisi, bitişik ve bölünmüş girdi arabellekleri.",
      "libSceAudiodec'in arkasındaki ortak arka uç.",
    ],
    gaps: [
      "Bilinmeyen AJM kodek numaraları reddedilir.",
      "Haptik parçalar sessiz kalır. Titreşim onlardan emüle edilmez.",
      "PS5_AUDIO_FALLBACK_MIX=1 olmadıkça yedek önizleme karıştırması kapalı.",
    ],
  },

  ngs2: {
    title: "NGS2",
    summary: "NGS2 sistem, rack ve ses tanıtıcılarını tutar, sıradan RIFF/WAVE verisini ayrıştırır ve bir yazılım DSP çalışanı boşa dönmesin diye sessiz bir 48 kHz tanesinin hızını ayarlar. Ses sentezinin kendisi eksik.",
    sections: [
      {
        heading: "Tanıtıcılar ve parametreler",
        paragraphs: [
          "Bir oyun bir NGS2 sistemi, rack'ler ve sesler oluşturur, ardından bağlı bir parametre değişiklikleri listesinde dolaşır. PS5PCEM kararlı tanıtıcılar verir, bir alt öğenin hâlâ canlı bir üst öğeye ait olduğunu denetler ve bu listelerde sınır içinde dolaşır. Oynat, duraklat, sürdür, durdur ve sonlandır ses işlendiğinde uygulanır. Durum, misafirin okuduğu tam 32 bitlik bayraklarla bildirilir.",
          "Sıradan RIFF/WAVE geometrisi ayrıştırılır. Nötr bir kaydırma matrisi korunur; böylece kaydırılmamış bir ses başka bir sesten eskimiş bir matris almaz. Tane float32'dir.",
        ],
      },
      {
        heading: "Tanenin hızı neden ayarlanır",
        paragraphs: [
          "Her sessiz işleme tanesi 48 kHz'de hızlandırılır. Bu bekleme olmadan bir oyunun yazılım DSP çalışanı işleyiciyi sıkı bir döngüde çağırır ve bütün bir ana sistem çekirdeğini kaplar. Hız AudioOut saatiyle eşleşir; böylece çalışan yaklaşık tane süresi kadar uyur.",
          "Örneklerin kendisi sessizliktir. Gerçek NGS2 ses sentezi ve karıştırma uygulanmadı. Film müziği tamamen NGS2 içinde üretilen bir oyun bu sesleri bu yoldan duymaz. AJM ile kod çözüp PCM'i AudioOut'a gönderen oyunların NGS2 sentezine ihtiyacı yoktur.",
        ],
      },
    ],
    works: [
      "Üst öğe yaşam süresi denetimleriyle kararlı sistem, rack ve ses tanıtıcıları.",
      "RIFF/WAVE geometrisi, sınırlı parametre listeleri ve tam 32 bitlik durum bayrakları.",
      "Nötr bir kaydırma matrisiyle işlemede uygulanan oynat, duraklat, sürdür, durdur ve sonlandır.",
      "48 kHz'de hızı ayarlanmış sessiz bir float32 tanesi.",
    ],
    gaps: [
      "Ses sentezi ve NGS2 karıştırıcısı uygulanmadı.",
      "Hızı ayarlanmış tane sessizliktir; bu yüzden yalnızca NGS2'ye dayalı bir müzik sessiz kalır.",
      "Bir sesin içindeki özel DSP eklentileri bu modelin dışındadır.",
    ],
  },

  avplayer: {
    title: "AvPlayer",
    summary: "SceAvPlayer, video kapsayıcılarını FFmpeg ile oyuna ait NV12 karelere ve 48 kHz stereo PCM'e çözer. Oyun akışlardan birini hiç okumasa bile kaynak süresi geçtiğinde oynatma biter.",
    sections: [
      {
        heading: "Oyunun sahip olduğu arabellekler",
        paragraphs: [
          "Oynatıcı oyunun ayırma geri çağırmalarını ve dosya geri çağırmalarını kullanır. FFmpeg kapsayıcıyı yoklar; videoyu kaynak çözünürlüğünde NV12'ye, sesi 48 kHz'de serpiştirilmiş işaretli 16 bitlik stereoya çözer. Video ve sesin ayrı kilitleri ve ayrı kod çözücü işlemleri vardır. Zaman damgaları tek bir monoton saati paylaşır.",
          "Duraklatma, sarma, döngü ve akış sonu korunur. Yazılım kod çözücü ABI'si hizalanmış satır aralığını, ayırma yüksekliğini ve görünür kırpmayı bildirir. Hem genişletilmiş hem eski akış bilgisi çağrıları vardır. Geçerli zaman, normal hızda hile modu, akışı devre dışı bırakma ve sınırlı bir medya saati, Asterix'in kullandığı Unity ara yazılımını kapsar.",
        ],
      },
      {
        heading: "Oyunun yarısını okuduğu bir videoyu bitirmek",
        paragraphs: [
          "Bir oyun görüntüleri alıp kendi sesini karıştırabilir ya da tam tersini yapabilir. Her akış okunana kadar beklemek, o oynatıcıyı işlemin geri kalanı boyunca canlı tutar. Jurassic Park Classic Games Collection bu yüzden girişinde takılı kalıyordu: okunmayan ses akışı hiç bitmediği için saat üç saniyelik bir klibin doksan saniye ötesindeydi.",
          "Süre kaynaktan gelir. Saat onu geçtiğinde bir akış yok sayılmış olsa bile oynatma biter. Bir akış hâlâ veri iletirken bildirilen konum gerçekten teslim edilen kareler içinde kalır; böylece yavaş bir makine erken kesilmez. Akış gerçekten bittiğinde saat süreye kadar ilerleyebilir. Döngülü kaynaklara ve uzunluğu bilinmeyen kaynaklara dokunulmaz.",
        ],
      },
      {
        heading: "Sunum",
        paragraphs: [
          "Gözlenen giriş videoları ReleaseFast sürümlerinde yaklaşık kendi kare hızlarında oynatılır. Unity klip değiştirirken temizlenmiş bir kod çözücü yüzeyini düz bir renk olarak göstermek yerine son geçerli görüntü korunur. 1920×1080'lik bir kaynak, oyunun kaydettiği ekran çıkışı hedefine ölçeklenebilir.",
          "Haptik parça zamanlanır ve sessizdir. AvPlayer bir kumandayı sürmez. Pikseller ekrana oyunun shader'ları veya VideoOut üzerinden ulaşır, oynatıcının içindeki ikinci bir birleştirici üzerinden değil.",
        ],
      },
    ],
    works: [
      "Oyuna ait arabelleklerde NV12 video ve 48 kHz stereo PCM'e FFmpeg kod çözme.",
      "Genişletilmiş ve eski akış bilgisi, duraklatma, sarma, döngü ve ortak bir medya saati.",
      "Oyun bir akışı okumadan bıraktığında kaynak süresinde oynatmanın bitmesi.",
      "Klip değişiminde son geçerli karenin korunması.",
    ],
    gaps: [
      "Haptik sessizliktir. Kumanda titreşimi emüle edilmez.",
      "Döngülü ve uzunluğu bilinmeyen kaynaklar süre kuralıyla kesilmez.",
      "Eksik bir dosya geri çağırması veya FFmpeg'in yoklayamadığı bir kapsayıcı o varlığı başarısız kılar.",
    ],
  },

  cpu: {
    title: "Yerel misafir yürütme",
    summary: "Windows x86-64'te misafirin makine kodu doğrudan çalışır. Her misafir pthread'ini bir ana sistem çalışanı taşır ve Windows FS tabanını korumadığı için her engelleyen çağrıdan sonra geri yüklenir.",
    sections: [
      {
        heading: "Misafir iş parçacığı başına bir çalışan",
        paragraphs: [
          "Dağıtıcı her misafir pthread'i için bir ana sistem çalışanı başlatır, o iş parçacığının TLS'ini kurar ve System V bağımsız değişken yazmaçlarıyla istenen adresten misafire girer. Join, detach, yield, sleep, iç içe geri çağırmalar ve scePthreadExit hep bu yoldan geri gelir. HLE iş parçacığı ancak misafir yürütmesi o bağlamdan çıktıktan sonra tamamlanır.",
          "Köprü giriş noktasının yürütülebilir olduğunu, yığının ve TLS'in eşlendiğini denetler. Windows'un kalıcı yazmaçlarını, MXCSR'yi ve x87 denetim sözcüğünü kaydeder, misafir yığınına geçer, misafir FS tabanını kurar ve girişi çağırır. Eşzamanlı bir scePthreadExit, misafir çerçevelerini atan ve dağıtıcı kesmeyi görmeden önce ana sistem FS'ini geri yükleyen yerel bir kaçışla çıkar.",
        ],
      },
      {
        heading: "Windows FS tabanını düşürür",
        paragraphs: [
          "FS'i bir kez kurmak yetmez. Windows, kullanıcının yazdığı bir FS tabanını bağlam geçişleri arasında korumaz. Bir uykudan sonra rdfsbase yine sıfır okur. Misafir kodu iş parçacığına özel belleğini System V kuralına göre FS'te tutar; bu yüzden sonraki FS'e göreli erişim sıfır adresi yakınında hata verirdi. Misafirde yanlış bir şey yoktur. Ana sistem, misafirin güvenmeye hakkı olan bir yazmacı düşürmüştür.",
          "Bu yüzden dağıtıcı engelleyen çağrılardan sonra FS'i geri yükler. Beklemeler diziyi bilen bir futex kullanır; böylece bir kilit açma ile park etme arasında gelen bir uyandırma bir kez tüketilir ve bir yayın eski diziyi gözlemlemiş her bekleyen için görünür kalır. Sabit uyandırma geçmişi bir gün dolarsa dağıtıcı fazladan uyandırır ve HLE'nin nesneyi yeniden denetlemesine izin verir. Zamanlanmış uykular özel, uyarılamaz bir gecikme kullanır; böylece ilgisiz bir uyandırma bir ses çalışanını boşa dönen bir döngüye çeviremez.",
        ],
      },
      {
        heading: "Hatalar ve diğer işletim sistemleri",
        paragraphs: [
          "Hata veren bir misafir iş parçacığı yalıtılır. Tanılama, mümkün olduğunda adresi bir modüle ve bir sembole bağlar ve işlemin işlenmemiş bir ana sistem istisnasıyla ölmesi gerekmez. PS5_CPU_WAIT_DIAGNOSTICS=1 ayrıntılı bekleme izini yeniden açar. Normal oyunda kapalıdır; çünkü aynı anda yazdıran birkaç park etmiş çalışan bir kareyi kendileri takabilir.",
          "Yerel yürütme Windows x86-64 ve RDWRFSGSBASE işlemci özelliği gerektirir. Linux ve macOS sürümleri kod çözücüyü, yükleyiciyi ve HLE'yi yine derler ve yerel köprüyü desteklenmiyor olarak bildirir. Misafir ikili dosyaları x86-64 makine kodudur. Yorumlanmazlar.",
        ],
      },
    ],
    works: [
      "Windows'ta misafir pthread'i başına bir ana sistem çalışanıyla yerel x86-64 misafir yürütme.",
      "System V çağrıları, misafir yığınları ve engelleyen çağrılardan sonra geri yüklenen FS.",
      "Diziyi bilen beklemeler, yalıtılmış hatalar ve ana sistemi geri yükleyen pthread çıkışı.",
      "Linux ve macOS'ta yerel yürütme olmadan inceleme, kod çözme ve HLE.",
    ],
    gaps: [
      "Yorumlayıcı yok. Windows x86-64 dışındaki ana sistemler misafiri çalıştırmaz.",
      "FS ve GS tabanlarını yazamayan bir CPU yerel köprüye giremez.",
      "Ayrıntılı bekleme tanılaması varsayılan olarak kapalı; çünkü yazdırması oyunu takıyor.",
    ],
  },

  loader: {
    title: "ELF ve SELF yükleme",
    summary: "Yükleyici şifresi çözülmüş PS5 SELF ve çıplak ELF64 modüllerini eşler, yer değiştirmeleri uygular ve içe aktarmaları HLE kaydına göre çözer. Oyun ardından kendisi başlattığı modüller için kararlı tanıtıcılar alır.",
    sections: [
      {
        heading: "Görüntüler",
        paragraphs: [
          "Bir PlayStation 5 yürütülebilir dosyası genellikle bir ELF64 görüntüsünü saran bir SELF kapsayıcısıdır. PS5PCEM hem kapsayıcıyı hem çıplak bir ELF'i okur. Okuyucu içe aktarmaları toplar, segmentleri ayrılmış misafir adres alanına eşler ve yer değiştirmeleri uygular. TLS görüntüleri onları çalıştıracak iş parçacıklarıyla kaydedilir.",
          "Araçlar oyunu başlatmadan bir modülü inceleyebilir, yer değiştirilmiş bir bağımlılık grafiğini dökebilir veya bir shader'ı ayrıştırabilir. game-run; yükleyen, HLE'yi başlatan ve misafire giren yoldur. Şifresi çözülmüş eboot.bin kurulumdan ayrı duruyorsa --app0 salt okunur bağlamayı içerik dizinine yönlendirir.",
        ],
      },
      {
        heading: "Oyunun sonradan başlattığı modüller",
        paragraphs: [
          "Çalışma zamanı, misafir kodu çalışmadan önce ulaşılabilir bağımlılık grafiğini ve PS5_PRELOAD'da adı geçen her şeyi eşler. sceKernelLoadStartModule ardından bu kümedeki bir modül için kararlı bir tanıtıcı döndürür. Onu yeniden yüklemek ikinci bir yer değiştirilmiş kopya oluşturmaz. sceKernelDlsym oyunun verdiği adı özetler ve yalnızca tanıtıcının seçtiği modülde arar; böylece aynı geri çağırmayı dışa aktaran iki eklenti birbirine karışmaz.",
          "Yol eşleştirmesi eğik çizgi yönünü ve büyük/küçük harfi yok sayar. Gözlenen bir oyun Il2CppUserAssemblies.prx ister ve Il2cppUserAssemblies.prx ile gelir. Tam eşleşme, oyunun kurduğu bir dosyayı reddederdi. Göreli yol çıplak dosya adından önce denenir; böylece dosya adı aynı olan iki modül ayrı kalır. Yayımlanan kümede olmayan bir modül ENOENT döndürür. Misafir iş parçacıkları zaten çalışırken eşlenmez.",
        ],
      },
      {
        heading: "Unity eklentileri",
        paragraphs: [
          "Unity eklentileri yapıcıları ertelenerek eşlenebilir. sceKernelLoadStartModule onları bu yapıcıları grafik başlatması sırasında çalıştırmak yerine oyunun gerçek bağımsız değişken bloğuyla bir kez başlatır. Bu sıralama, bağımsız değişkenlerini gören bir eklenti ile çok erken başlayan bir eklenti arasındaki farktır.",
          "Yükleyici perakende bir SELF'in şifresini çözmez. Girdi, kullanıcının yüklemeye hakkı olan şifresi çözülmüş bir görüntüdür. Şifreli paketler PKG aracının konusudur ve perakende şifreleme o aracın da dışındadır.",
        ],
      },
    ],
    works: [
      "ELF64 ve şifresi çözülmüş SELF eşleme, yer değiştirme, içe aktarmalar ve TLS.",
      "Önceden yüklenmiş bir bağımlılık grafiği ve kararlı sceKernelLoadStartModule tanıtıcıları.",
      "Büyük/küçük harfe duyarsız yol eşleştirmesiyle seçilen modülle sınırlı Dlsym.",
      "Gerçek bağımsız değişkenlerle başlasınlar diye Unity eklentileri için ertelenmiş yapıcılar.",
    ],
    gaps: [
      "Yalnızca açılıştan sonra ortaya çıkan ve önceden yüklenmemiş bir modül ENOENT döndürür.",
      "Şifreli perakende SELF görüntülerinin şifresi çözülmez.",
      "İnceleme sürümleri, Windows dışı ana sistemlerde yüklenen görüntüyü yürütmez.",
    ],
  },

  input: {
    title: "Kumandalar ve klavye",
    summary: "DualSense, DualSense Edge ve DualShock 4, USB ve Bluetooth üzerinden HID ile okunur. Xbox uyumlu kumandalar XInput kullanır. Klavye bir başlatıcı profiliyle çubuklara eşlenir.",
    sections: [
      {
        heading: "HID raporları",
        paragraphs: [
          "XInput Xbox uyumlu aygıtları listeler. Bilgisayara takılı bir DualSense, bir çeviri katmanı sanal bir Xbox kumandası uydurmadıkça ona görünmez. PS5PCEM Sony kumandasını HID üzerinden açar ve raporu çözer. Alanlar USB ve Bluetooth'ta aynıdır. Konumlar değişir; çünkü Bluetooth veriye bir önek ekler ve DualSense tetiklerini düğme baytlarının önüne koyar.",
          "Yön tuşları dört bağımsız bit olarak değil, sekiz pusula konumundan biri olarak gelir. Okumalar örtüşmelidir ve asla engellemez. Bir yoklama sürücünün kuyruğunu boşaltır ve en yeni raporu tutar. En eski raporla yanıt vermek, çubukları karenin geride kaldığı kadar geciktirirdi.",
        ],
      },
      {
        heading: "Çıkış, motorlar ve ışık çubuğu",
        paragraphs: [
          "Çıkış raporları iki motoru ve ışık çubuğunu taşır. Bluetooth'ta rapor kaydırılır ve kumandanın harekete geçmeden önce denetlediği bir sağlama toplamıyla biter; bu yüzden kablo için oluşturulmuş bir rapor havadan gönderildiğinde yok sayılır. Başlatıcının giriş sayfası bulduğu kumandayı adlandırır ve iki motoru döndüren ve ışık çubuğunu renkler arasında gezdiren bir saniyelik bir test çalıştırabilir. Aygıt paylaşımlı ve ana sistemin izin verdiği yerde yazma için açılır.",
          "Kumanda XInput'a göre önceliklidir. XInput, Xbox uyumlu kumandalar ve kendini öyle tanıtan her şey için yol olarak kalır. Başlatıcı seçimi, kumanda indeksini ve klavye atamalarını saklar ve onları game-run'a ortam değişkenleri olarak aktarır.",
        ],
      },
      {
        heading: "Klavye ve betikli giriş",
        paragraphs: [
          "WASD sol çubuktur. Alt artı ok tuşları sağ çubuktur. Profiller kumanda, klavye veya ikisi birden olabilir. PS5_INPUT_MODE=scripted, başlatma sırasındaki düğme darbelerini korur ve fiziksel aygıtları yok sayar; böylece başka bir penceredeki bir tuş basışı ölçülen bir sahneyi değiştirmez.",
          "HLE içinde birincil kumanda scePadOpen ile açılabilir veya scePadGetHandle ile alınabilir. İkinci yol, oturum açmış kullanıcının kumandasını yoklamadan önce hiç açmayan oyunlar için önemlidir. Bu, o tanıtıcının ana sistem tarafıdır.",
        ],
      },
    ],
    works: [
      "USB ve Bluetooth HID üzerinden DualSense, DualSense Edge ve DualShock 4.",
      "En yeni rapor yoklaması, motorlar, ışık çubuğu ve Bluetooth sağlama toplamı.",
      "Xbox uyumlu kumandalar için XInput ve yeniden atanabilir klavye profilleri.",
      "Ölçümler sırasında fiziksel aygıtları yok sayan betikli bir giriş modu.",
    ],
    gaps: [
      "Dokunmatik yüzey, uyarlanabilir tetikler ve hareket sensörleri tam bir DualSense özellik seti değil.",
      "Bir video parçasından gelen haptik motorlara yönlendirilmiyor.",
      "HID yolu, başlatıcı ve game-run'ın kullandığı Windows ana sistem yoludur.",
    ],
  },

  pkg: {
    title: "PKG çıkarıcı",
    summary: "pkgextractor geliştirmede gözlemlenen hata ayıklama FPKG düzenlerini açar: dış paket, iç PFS, NAPS ad eşlemeleri ve Kraken ile sıkıştırılmış veriler. Şifreli perakende paketler kapsam dışıdır.",
    sections: [
      {
        heading: "Bir hata ayıklama paketi neler içerir",
        paragraphs: [
          "Bir PlayStation 5 paketi bir dosya sistemini sarar. PS5PCEM'in gözlemlediği hata ayıklama düzenleri bir dış paket, bir iç PFS görüntüsü, paket adlarını dosyalara eşleyen bir NAPS tablosu ve Kraken ile sıkıştırılmış veriler kullanır. Çıkarıcı bu katmanlarda dolaşır ve dosyaları yazar. Başlatıcının yanında pkgextractor.exe olarak gelir ve başlatıcıda onu kullanan bir PKG çıkar düğmesi vardır.",
          "2 Ekim geliştirme çıkarıcısı, Grand Theft Auto III: The Definitive Edition, PPSA03527 sürüm 1.007 için InvalidPfs hatasını düzeltir. eboot.bin, altı modül ve iki PAK arşivi dahil 48 dosyanın tamamı çıkarılır ve iki PAK dizin sağlama toplamı da eşleşir. Yirmi bir paket testi geçer. O rapor oyunu başlatmadı. Çıkarma ve yürütme ayrı iddialardır.",
        ],
      },
      {
        heading: "Perakende şifreleme",
        paragraphs: [
          "Şifreli perakende paketler desteklenmez. Hiçbir anahtar dahil değildir veya ima edilmez. Gözlenen hata ayıklama ayrıştırıcısının tanımadığı bir paket ayrıştırmada başarısız olur. Tamamlanmış gibi görünen bir dizine kısmen çıkarılmaz.",
          "Yasal sınır projenin geri kalanıyla aynıdır. Araç, kullanma hakkı olan bir dökümü zaten elinde bulunduran bir kişinin yükleyiciyi besleyebilmesi için vardır. Site ve emülatör oyun, sistem yazılımı veya anahtar dağıtmaz.",
        ],
      },
      {
        heading: "Çıkarmadan sonra",
        paragraphs: [
          "Yükleyici şifresi çözülmüş eboot.bin dosyasını okur ve içerik dizinini /app0 olarak bağlar. Tipik bir düzen eboot.bin'i paket kökünde veya bir decrypted alt dizininde tutar. Başlatıcı ikisine de bakar. Kayıt verileri paketin içinde değildir. Emülatörün ana dizininde, oyun kimliğine göre anahtarlanmış olarak durur.",
          "Buradaki Kraken, NAPS ve PFS paket dosyası mekanizmalarıdır. GPU swizzle'ı, AMPR motoru veya ses kodekleri değildir; bunlar da veriyi sıkıştırdığı veya yeniden eşlediği için kolayca karıştırılır.",
        ],
      },
    ],
    works: [
      "Gözlenen hata ayıklama FPKG düzenleri, iç PFS, NAPS ad eşlemeleri ve Kraken verileri.",
      "Bir komut satırı çıkarıcısı ve bir başlatıcı düğmesi.",
      "GTA III geliştirme çıkarması: 48 dosya ve eşleşen PAK dizin sağlama toplamları.",
      "O çıkarıcıda geçen yirmi bir paket testi.",
    ],
    gaps: [
      "Şifreli perakende paketler desteklenmiyor ve araçla hiçbir anahtar gelmiyor.",
      "Tanınmayan bir düzen başarısız olur. Kısmi bir ağaç olarak üretilmez.",
      "Başarılı bir çıkarma, oyunun ardından çalıştığı anlamına gelmez.",
    ],
  },

  d3d12: {
    "title": "Direct3D 12 arka ucu",
    "summary": "0.3.6 sürümünde Windows için deneysel yerel DirectX 12 bulunur. Terminator 2D oynanışa, Raiden IV ilk aşamaya ve Super Woden GP haritaya ulaşır. Vulkan varsayılandır; Linux Vulkan kullanır.",
    "sections": [
      {
        "heading": "İşleyici seçmek",
        "paragraphs": [
          "Windows başlatıcısının ayarlarında Vulkan ve DirectX 12 seçeneklerini içeren bir Grafik API'si kartı var. Başlatıcı, taşınabilir ps5pcem.ini dosyasına graphics_api=vulkan ya da graphics_api=d3d12 yazar ve PS5_GRAPHICS_API değişkenini game-run'a iletir; böylece seçim bir sonraki başlatmada geçerli olur. Varsayılan Vulkan'dır. Başlatıcı on iki dilin hepsinde DirectX 12'yi deneysel olarak etiketler ve kenar çubuğu onu Vulkan aygıt durumunun yerine gösterir.",
          "Aynı değişken komut satırında da çalışır; orada hem d3d12 hem dx12 kabul edilir. Linux sürümleri Vulkan'ı seçer ve çalıştırıcı orada d3d12'yi reddeder. Bilinmeyen bir değer, oyun yüklenmeden önce geri çevrilir. D3D12'nin başlatılması ya da yürütülmesi başarısız olursa çalıştırıcı yerine Vulkan koymaz: desteklenmeyen GPU işi nedenini yazar ve işi tamamlanmış gibi bildirmek yerine deneysel çalıştırmayı sonlandırır. Bu arka uçta penceresiz yürütme yoktur."
        ]
      },
      {
        "heading": "PS5PCEM 0.3.6",
        "paragraphs": [
          "İndeksli ve dolaylı çizimler, dokular, derinlik/stencil, MRT, DXC wave shader’ları, kaynak önbellekleri ve komut grupları uygulanmıştır. 0.3.6 için 48 D3D12 testi ve yerel GPU kontrolleri geçer."
        ]
      }
    ],
    "works": [
      "İndeksli ve dolaylı çizimler, dokular, derinlik/stencil, MRT, DXC wave shader’ları, kaynak önbellekleri ve komut grupları uygulanmıştır. 0.3.6 için 48 D3D12 testi ve yerel GPU kontrolleri geçer."
    ],
    "gaps": [
      "MSAA, genel compute görüntüleri ve diğer grafik yolları henüz eksiktir. Vulkan uyumluluğu ve FPS sonuçları DirectX veya Linux ölçümleri değildir."
    ]
  },
};

export default tech;

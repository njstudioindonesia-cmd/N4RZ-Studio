const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const webFeatures = [
  { icon: "Layout", title: "Desain Premium Custom", desc: "Setiap website dirancang khusus untuk merepresentasikan nilai unik brand Anda tanpa menggunakan template murahan." },
  { icon: "Smartphone", title: "Mobile-First & Responsif", desc: "Tampilan otomatis menyesuaikan di smartphone hingga layar desktop ultra-wide." },
  { icon: "Zap", title: "Kecepatan Maksimal", desc: "Website dioptimalkan untuk loading sangat cepat yang disukai oleh mesin pencari seperti Google." }
];

const webPackages = [
  { title: "Company Profile", desc: "Cocok untuk bisnis berkembang", price: "Mulai Rp 5 Jt", items: ["Desain UI/UX Custom (Max 5 Hal)", "Mobile Responsive", "Integrasi CMS", "Basic SEO Setup", "Formulir Kontak"], isPopular: false, link: "https://wa.me/6281234567890?text=Halo%20NJ%20Studio,%20saya%20tertarik%20dengan%20Paket%20Company%20Profile" },
  { title: "E-Commerce / Custom", desc: "Untuk jualan online & sistem kustom", price: "Mulai Rp 12 Jt", items: ["Desain UI/UX Premium", "Keranjang Belanja", "Payment Gateway", "Advanced SEO Setup", "Admin Dashboard"], isPopular: true, link: "https://wa.me/6281234567890?text=Halo%20NJ%20Studio,%20saya%20tertarik%20dengan%20Paket%20E-Commerce" }
];

const webFaqs = [
  { question: "Berapa lama proses pembuatan website?", answer: "Proses biasanya memakan waktu 2-6 minggu tergantung kompleksitas." },
  { question: "Apakah sudah mobile-friendly?", answer: "Tentu saja! Kami selalu menggunakan pendekatan responsif." }
];

const robloxFeatures = [
  { icon: "Cpu", title: "Custom Scripting", desc: "Pemrograman sistem game kustom, AI, hingga sistem data store." },
  { icon: "Blocks", title: "Map Building", desc: "Pembuatan lingkungan game imersif menggunakan tools Roblox Studio." },
  { icon: "Layout", title: "UI/UX Design", desc: "Perancangan antarmuka pemain modern dan intuitif." },
  { icon: "ShieldCheck", title: "Optimisasi", desc: "Perbaikan bug dan optimasi performa agar ringan di mobile." }
];

const robloxPackages = [
  { title: "Fixing Bug / Minor Scripting", desc: "Perbaikan cepat", price: "Rp 500Rb", items: ["Bug Fixing", "Tweak Script", "Testing"], isPopular: false, link: "#" },
  { title: "Sistem Khusus (Inventory dll)", desc: "Pembuatan sistem tunggal", price: "Rp 2 Jt", items: ["Sistem Kompleks", "UI Terintegrasi", "Data Store"], isPopular: true, link: "#" }
];

const robloxFaqs = [
  { question: "Berapa lama proses pembuatan game?", answer: "Sangat bervariasi dari 1 hingga 6 bulan lebih." },
  { question: "Apakah bisa custom script?", answer: "Ya, kami spesialis di Luau scripting." }
];

async function main() {
  await prisma.serviceLanding.upsert({
    where: { slug: 'jasa-website' },
    update: { features: webFeatures, packages: webPackages, faqs: webFaqs },
    create: {
      slug: 'jasa-website',
      serviceName: 'Web Development',
      headline: 'Website Profesional untuk Identitas Digital Anda',
      subheadline: 'Tingkatkan kredibilitas bisnis Anda dengan website yang indah, cepat, dan dioptimalkan untuk konversi maksimal.',
      videoUrl: 'https://cdn.pixabay.com/video/2019/02/16/21434-318469830_large.mp4',
      features: webFeatures,
      packages: webPackages,
      faqs: webFaqs
    }
  });

  await prisma.serviceLanding.upsert({
    where: { slug: 'jasa-roblox-development' },
    update: { features: robloxFeatures, packages: robloxPackages, faqs: robloxFaqs },
    create: {
      slug: 'jasa-roblox-development',
      serviceName: 'Roblox Development',
      headline: 'Wujudkan Game Impian Anda di Roblox',
      subheadline: 'Kami adalah spesialis pengembangan game Roblox. Dari scripting sistem mekanik kompleks hingga desain map yang memukau.',
      videoUrl: 'https://cdn.pixabay.com/video/2021/04/16/71321-537446545_large.mp4',
      features: robloxFeatures,
      packages: robloxPackages,
      faqs: robloxFaqs
    }
  });

  console.log('Seed success');
}

main().catch(console.error).finally(() => prisma.$disconnect());

// ================================================================
//  BANCO DE DADOS - Preços atualizados (2025/2026 - Brasil)
//  +150 peças no total
// ================================================================

window.DATABASE = {
    // ==================== CPUs (30 opções) ====================
    cpu: [
        // --- Entrada / Estudo / Escritório ---
        { id: 'cpu1', name: 'Intel Celeron G5905', price: 300, socket: 'LGA1200', chipset: 'H410', generation: 'Comet Lake', cores: 2, threads: 2, purpose: ['estudo', 'escritorio'] },
        { id: 'cpu2', name: 'AMD Athlon 3000G', price: 340, socket: 'AM4', chipset: 'A320', generation: 'Zen+', cores: 2, threads: 4, purpose: ['estudo', 'escritorio'] },
        { id: 'cpu3', name: 'Intel Pentium Gold G6400', price: 380, socket: 'LGA1200', chipset: 'H410', generation: 'Comet Lake', cores: 2, threads: 4, purpose: ['estudo', 'escritorio'] },
        { id: 'cpu4', name: 'AMD Ryzen 3 3200G', price: 480, socket: 'AM4', chipset: 'B450', generation: 'Zen+', cores: 4, threads: 4, purpose: ['estudo', 'escritorio', 'programacao'] },
        { id: 'cpu5', name: 'Intel Core i3-10100', price: 520, socket: 'LGA1200', chipset: 'B460', generation: 'Comet Lake', cores: 4, threads: 8, purpose: ['estudo', 'escritorio', 'programacao'] },
        { id: 'cpu6', name: 'AMD Ryzen 3 4100', price: 550, socket: 'AM4', chipset: 'B450', generation: 'Zen 2', cores: 4, threads: 8, purpose: ['estudo', 'escritorio', 'programacao'] },
        { id: 'cpu7', name: 'Intel Core i3-12100F', price: 680, socket: 'LGA1700', chipset: 'B660', generation: 'Alder Lake', cores: 4, threads: 8, purpose: ['estudo', 'escritorio', 'programacao', 'jogos'] },
        { id: 'cpu8', name: 'AMD Ryzen 5 4500', price: 720, socket: 'AM4', chipset: 'B550', generation: 'Zen 2', cores: 6, threads: 12, purpose: ['programacao', 'jogos', 'design'] },
        { id: 'cpu9', name: 'Intel Core i5-10400F', price: 760, socket: 'LGA1200', chipset: 'B460', generation: 'Comet Lake', cores: 6, threads: 12, purpose: ['programacao', 'jogos', 'design'] },
        { id: 'cpu10', name: 'AMD Ryzen 5 5500', price: 820, socket: 'AM4', chipset: 'B550', generation: 'Zen 3', cores: 6, threads: 12, purpose: ['programacao', 'jogos', 'design'] },
        { id: 'cpu11', name: 'Intel Core i5-11400F', price: 880, socket: 'LGA1200', chipset: 'B560', generation: 'Rocket Lake', cores: 6, threads: 12, purpose: ['programacao', 'jogos', 'design'] },
        { id: 'cpu12', name: 'AMD Ryzen 5 5600X', price: 1100, socket: 'AM4', chipset: 'B550', generation: 'Zen 3', cores: 6, threads: 12, purpose: ['jogos', 'design', 'programacao'] },
        { id: 'cpu13', name: 'Intel Core i5-12400F', price: 1050, socket: 'LGA1700', chipset: 'B660', generation: 'Alder Lake', cores: 6, threads: 12, purpose: ['jogos', 'design', 'programacao'] },
        { id: 'cpu14', name: 'AMD Ryzen 7 5700X', price: 1600, socket: 'AM4', chipset: 'X570', generation: 'Zen 3', cores: 8, threads: 16, purpose: ['jogos', 'design', 'programacao'] },
        { id: 'cpu15', name: 'Intel Core i7-12700K', price: 2000, socket: 'LGA1700', chipset: 'Z690', generation: 'Alder Lake', cores: 12, threads: 20, purpose: ['jogos', 'design', 'programacao'] },
        { id: 'cpu16', name: 'AMD Ryzen 7 5800X3D', price: 2300, socket: 'AM4', chipset: 'X570', generation: 'Zen 3', cores: 8, threads: 16, purpose: ['jogos'] },
        { id: 'cpu17', name: 'Intel Core i7-13700K', price: 2600, socket: 'LGA1700', chipset: 'Z790', generation: 'Raptor Lake', cores: 16, threads: 24, purpose: ['jogos', 'design', 'programacao'] },
        { id: 'cpu18', name: 'AMD Ryzen 9 5900X', price: 2600, socket: 'AM4', chipset: 'X570', generation: 'Zen 3', cores: 12, threads: 24, purpose: ['design', 'programacao'] },
        { id: 'cpu19', name: 'AMD Ryzen 9 7950X', price: 3800, socket: 'AM5', chipset: 'X670E', generation: 'Zen 4', cores: 16, threads: 32, purpose: ['design', 'programacao'] },
        { id: 'cpu20', name: 'Intel Core i9-13900K', price: 3500, socket: 'LGA1700', chipset: 'Z790', generation: 'Raptor Lake', cores: 24, threads: 32, purpose: ['design', 'programacao'] },
        // Novas
        { id: 'cpu21', name: 'AMD Ryzen 5 3600', price: 850, socket: 'AM4', chipset: 'B450', generation: 'Zen 2', cores: 6, threads: 12, purpose: ['jogos', 'programacao'] },
        { id: 'cpu22', name: 'Intel Core i5-10600K', price: 950, socket: 'LGA1200', chipset: 'Z490', generation: 'Comet Lake', cores: 6, threads: 12, purpose: ['jogos', 'programacao'] },
        { id: 'cpu23', name: 'AMD Ryzen 7 3700X', price: 1200, socket: 'AM4', chipset: 'X570', generation: 'Zen 2', cores: 8, threads: 16, purpose: ['jogos', 'design', 'programacao'] },
        { id: 'cpu24', name: 'Intel Core i7-10700K', price: 1300, socket: 'LGA1200', chipset: 'Z490', generation: 'Comet Lake', cores: 8, threads: 16, purpose: ['jogos', 'design', 'programacao'] },
        { id: 'cpu25', name: 'AMD Ryzen 9 3900X', price: 2000, socket: 'AM4', chipset: 'X570', generation: 'Zen 2', cores: 12, threads: 24, purpose: ['design', 'programacao'] },
        { id: 'cpu26', name: 'Intel Core i9-10900K', price: 2200, socket: 'LGA1200', chipset: 'Z490', generation: 'Comet Lake', cores: 10, threads: 20, purpose: ['design', 'programacao'] },
        { id: 'cpu27', name: 'AMD Ryzen 5 7600X', price: 1500, socket: 'AM5', chipset: 'X670E', generation: 'Zen 4', cores: 6, threads: 12, purpose: ['jogos', 'programacao'] },
        { id: 'cpu28', name: 'Intel Core i5-13600K', price: 1850, socket: 'LGA1700', chipset: 'Z790', generation: 'Raptor Lake', cores: 14, threads: 20, purpose: ['jogos', 'programacao', 'design'] },
        { id: 'cpu29', name: 'AMD Ryzen 7 7800X3D', price: 3000, socket: 'AM5', chipset: 'X670E', generation: 'Zen 4', cores: 8, threads: 16, purpose: ['jogos'] },
        { id: 'cpu30', name: 'Intel Core i9-14900K', price: 4000, socket: 'LGA1700', chipset: 'Z790', generation: 'Raptor Lake', cores: 24, threads: 32, purpose: ['design', 'programacao'] },
    ],

    // ==================== GPUs (28 opções) ====================
    gpu: [
        // Integradas
        { id: 'gpu1', name: 'Intel UHD Graphics 630 (Integrada)', price: 0, interface: 'PCIe', power: 0, purpose: ['estudo', 'escritorio', 'programacao'] },
        { id: 'gpu2', name: 'AMD Radeon Vega 3 (Integrada)', price: 0, interface: 'PCIe', power: 0, purpose: ['estudo', 'escritorio', 'programacao'] },
        { id: 'gpu3', name: 'AMD Radeon Vega 8 (Integrada)', price: 0, interface: 'PCIe', power: 0, purpose: ['estudo', 'escritorio', 'programacao'] },
        // Entrada
        { id: 'gpu4', name: 'NVIDIA GT 710 2GB', price: 280, interface: 'PCIe 2.0', power: 19, purpose: ['estudo', 'escritorio'] },
        { id: 'gpu5', name: 'AMD Radeon R5 240 1GB', price: 250, interface: 'PCIe 3.0', power: 50, purpose: ['estudo', 'escritorio'] },
        { id: 'gpu6', name: 'NVIDIA GT 1030 2GB', price: 450, interface: 'PCIe 3.0', power: 30, purpose: ['estudo', 'escritorio'] },
        { id: 'gpu7', name: 'AMD RX 550 2GB', price: 500, interface: 'PCIe 3.0', power: 50, purpose: ['estudo', 'escritorio', 'jogos_leve'] },
        // Básico
        { id: 'gpu8', name: 'NVIDIA GTX 1050 Ti 4GB', price: 850, interface: 'PCIe 3.0', power: 75, purpose: ['jogos_leve', 'programacao'] },
        { id: 'gpu9', name: 'AMD RX 560 4GB', price: 750, interface: 'PCIe 3.0', power: 75, purpose: ['jogos_leve', 'programacao'] },
        { id: 'gpu10', name: 'AMD RX 6500 XT 4GB', price: 1100, interface: 'PCIe 4.0', power: 107, purpose: ['jogos_leve', 'programacao'] },
        { id: 'gpu11', name: 'NVIDIA GTX 1650 4GB', price: 950, interface: 'PCIe 3.0', power: 75, purpose: ['jogos_leve', 'programacao'] },
        // Médio
        { id: 'gpu12', name: 'AMD RX 6600 8GB', price: 1600, interface: 'PCIe 4.0', power: 132, purpose: ['jogos', 'design'] },
        { id: 'gpu13', name: 'NVIDIA RTX 3050 8GB', price: 1700, interface: 'PCIe 4.0', power: 130, purpose: ['jogos', 'design'] },
        { id: 'gpu14', name: 'AMD RX 7600 8GB', price: 1750, interface: 'PCIe 4.0', power: 165, purpose: ['jogos', 'design'] },
        { id: 'gpu15', name: 'NVIDIA RTX 3060 12GB', price: 2000, interface: 'PCIe 4.0', power: 170, purpose: ['jogos', 'design', 'programacao'] },
        // Alto
        { id: 'gpu16', name: 'AMD RX 6700 XT 12GB', price: 2500, interface: 'PCIe 4.0', power: 230, purpose: ['jogos', 'design'] },
        { id: 'gpu17', name: 'NVIDIA RTX 4060 Ti 8GB', price: 2400, interface: 'PCIe 4.0', power: 160, purpose: ['jogos', 'design'] },
        { id: 'gpu18', name: 'NVIDIA RTX 3070 8GB', price: 3000, interface: 'PCIe 4.0', power: 220, purpose: ['jogos', 'design'] },
        { id: 'gpu19', name: 'AMD RX 7800 XT 16GB', price: 3500, interface: 'PCIe 4.0', power: 263, purpose: ['jogos', 'design'] },
        { id: 'gpu20', name: 'NVIDIA RTX 4070 12GB', price: 3700, interface: 'PCIe 4.0', power: 200, purpose: ['jogos', 'design'] },
        { id: 'gpu21', name: 'AMD RX 7900 GRE 16GB', price: 4200, interface: 'PCIe 4.0', power: 260, purpose: ['jogos', 'design'] },
        // Topo
        { id: 'gpu22', name: 'NVIDIA RTX 3080 10GB', price: 4800, interface: 'PCIe 4.0', power: 320, purpose: ['jogos', 'design'] },
        { id: 'gpu23', name: 'AMD RX 7900 XT 20GB', price: 5800, interface: 'PCIe 4.0', power: 315, purpose: ['jogos', 'design'] },
        { id: 'gpu24', name: 'NVIDIA RTX 4080 16GB', price: 7200, interface: 'PCIe 4.0', power: 320, purpose: ['jogos', 'design'] },
        { id: 'gpu25', name: 'AMD RX 7900 XTX 24GB', price: 7000, interface: 'PCIe 4.0', power: 355, purpose: ['jogos', 'design'] },
        { id: 'gpu26', name: 'NVIDIA RTX 4090 24GB', price: 10500, interface: 'PCIe 4.0', power: 450, purpose: ['jogos', 'design'] },
        // Novas (Intel Arc)
        { id: 'gpu27', name: 'Intel Arc A750 8GB', price: 1400, interface: 'PCIe 4.0', power: 225, purpose: ['jogos', 'design'] },
        { id: 'gpu28', name: 'Intel Arc A770 16GB', price: 1800, interface: 'PCIe 4.0', power: 225, purpose: ['jogos', 'design'] },
    ],

    // ==================== Placas Mãe (22 opções) ====================
    placa_mae: [
        { id: 'mb1', name: 'ASUS Prime H410M-E', price: 350, socket: 'LGA1200', chipset: 'H410', ramType: 'DDR4', pcieGen: 3, format: 'mATX' },
        { id: 'mb2', name: 'Gigabyte GA-A320M-S2H', price: 340, socket: 'AM4', chipset: 'A320', ramType: 'DDR4', pcieGen: 3, format: 'mATX' },
        { id: 'mb3', name: 'ASUS Prime A520M-K', price: 380, socket: 'AM4', chipset: 'A520', ramType: 'DDR4', pcieGen: 3, format: 'mATX' },
        { id: 'mb4', name: 'ASUS Prime B450M-A', price: 480, socket: 'AM4', chipset: 'B450', ramType: 'DDR4', pcieGen: 3, format: 'mATX' },
        { id: 'mb5', name: 'Gigabyte B460M DS3H', price: 500, socket: 'LGA1200', chipset: 'B460', ramType: 'DDR4', pcieGen: 3, format: 'mATX' },
        { id: 'mb6', name: 'MSI A520M PRO-VH', price: 420, socket: 'AM4', chipset: 'A520', ramType: 'DDR4', pcieGen: 3, format: 'mATX' },
        { id: 'mb7', name: 'ASUS TUF B550M-PLUS', price: 750, socket: 'AM4', chipset: 'B550', ramType: 'DDR4', pcieGen: 4, format: 'mATX' },
        { id: 'mb8', name: 'MSI PRO B660M-A', price: 800, socket: 'LGA1700', chipset: 'B660', ramType: 'DDR4', pcieGen: 4, format: 'mATX' },
        { id: 'mb9', name: 'Gigabyte B550M AORUS PRO', price: 850, socket: 'AM4', chipset: 'B550', ramType: 'DDR4', pcieGen: 4, format: 'mATX' },
        { id: 'mb10', name: 'ASUS Prime Z690-P', price: 1200, socket: 'LGA1700', chipset: 'Z690', ramType: 'DDR5', pcieGen: 5, format: 'ATX' },
        { id: 'mb11', name: 'MSI MAG B550 TOMAHAWK', price: 1100, socket: 'AM4', chipset: 'B550', ramType: 'DDR4', pcieGen: 4, format: 'ATX' },
        { id: 'mb12', name: 'Gigabyte Z690 UD', price: 1300, socket: 'LGA1700', chipset: 'Z690', ramType: 'DDR5', pcieGen: 5, format: 'ATX' },
        { id: 'mb13', name: 'ASUS ROG STRIX Z690-A', price: 1600, socket: 'LGA1700', chipset: 'Z690', ramType: 'DDR5', pcieGen: 5, format: 'ATX' },
        { id: 'mb14', name: 'MSI MPG X570S EDGE MAX', price: 1500, socket: 'AM4', chipset: 'X570', ramType: 'DDR4', pcieGen: 4, format: 'ATX' },
        { id: 'mb15', name: 'ASUS TUF GAMING X670E-PLUS', price: 2000, socket: 'AM5', chipset: 'X670E', ramType: 'DDR5', pcieGen: 5, format: 'ATX' },
        { id: 'mb16', name: 'ASUS ROG CROSSHAIR VIII HERO', price: 2800, socket: 'AM4', chipset: 'X570', ramType: 'DDR4', pcieGen: 4, format: 'ATX' },
        { id: 'mb17', name: 'ASUS ROG MAXIMUS Z790 HERO', price: 3500, socket: 'LGA1700', chipset: 'Z790', ramType: 'DDR5', pcieGen: 5, format: 'ATX' },
        { id: 'mb18', name: 'Gigabyte X670E AORUS MASTER', price: 2800, socket: 'AM5', chipset: 'X670E', ramType: 'DDR5', pcieGen: 5, format: 'ATX' },
        { id: 'mb19', name: 'MSI PRO Z790-A', price: 1800, socket: 'LGA1700', chipset: 'Z790', ramType: 'DDR5', pcieGen: 5, format: 'ATX' },
        { id: 'mb20', name: 'ASRock B550M Phantom Gaming', price: 650, socket: 'AM4', chipset: 'B550', ramType: 'DDR4', pcieGen: 4, format: 'mATX' },
        { id: 'mb21', name: 'Gigabyte B760M DS3H', price: 750, socket: 'LGA1700', chipset: 'B760', ramType: 'DDR5', pcieGen: 4, format: 'mATX' },
        { id: 'mb22', name: 'ASUS Prime Z790-P', price: 1400, socket: 'LGA1700', chipset: 'Z790', ramType: 'DDR5', pcieGen: 5, format: 'ATX' },
    ],

    // ==================== RAM (20 opções) ====================
    ram: [
        { id: 'ram1', name: 'Kingston ValueRAM 8GB (1x8) DDR4 2666', price: 200, type: 'DDR4', speed: 2666, capacity: 8 },
        { id: 'ram2', name: 'Corsair ValueSelect 8GB (1x8) DDR4 2666', price: 210, type: 'DDR4', speed: 2666, capacity: 8 },
        { id: 'ram3', name: 'Crucial 8GB (1x8) DDR4 2666', price: 195, type: 'DDR4', speed: 2666, capacity: 8 },
        { id: 'ram4', name: 'Kingston Fury 16GB (2x8) DDR4 3200', price: 400, type: 'DDR4', speed: 3200, capacity: 16 },
        { id: 'ram5', name: 'Corsair Vengeance LPX 16GB (2x8) DDR4 3200', price: 430, type: 'DDR4', speed: 3200, capacity: 16 },
        { id: 'ram6', name: 'Crucial Ballistix 16GB (2x8) DDR4 3200', price: 440, type: 'DDR4', speed: 3200, capacity: 16 },
        { id: 'ram7', name: 'Kingston Fury 16GB (2x8) DDR4 3600', price: 480, type: 'DDR4', speed: 3600, capacity: 16 },
        { id: 'ram8', name: 'Corsair Vengeance 16GB (2x8) DDR4 3600', price: 520, type: 'DDR4', speed: 3600, capacity: 16 },
        { id: 'ram9', name: 'G.Skill Trident Z 16GB (2x8) DDR4 3600', price: 530, type: 'DDR4', speed: 3600, capacity: 16 },
        { id: 'ram10', name: 'Kingston Fury Beast 16GB (2x8) DDR5 5200', price: 620, type: 'DDR5', speed: 5200, capacity: 16 },
        { id: 'ram11', name: 'Corsair Vengeance 32GB (2x16) DDR4 3200', price: 750, type: 'DDR4', speed: 3200, capacity: 32 },
        { id: 'ram12', name: 'Kingston Fury 32GB (2x16) DDR4 3600', price: 820, type: 'DDR4', speed: 3600, capacity: 32 },
        { id: 'ram13', name: 'Corsair Vengeance 32GB (2x16) DDR5 5200', price: 1200, type: 'DDR5', speed: 5200, capacity: 32 },
        { id: 'ram14', name: 'Kingston Fury Beast 32GB (2x16) DDR5 5600', price: 1300, type: 'DDR5', speed: 5600, capacity: 32 },
        { id: 'ram15', name: 'G.Skill Trident Z5 32GB (2x16) DDR5 6000', price: 1450, type: 'DDR5', speed: 6000, capacity: 32 },
        { id: 'ram16', name: 'Corsair Dominator 32GB (2x16) DDR5 6000', price: 1550, type: 'DDR5', speed: 6000, capacity: 32 },
        { id: 'ram17', name: 'Corsair Dominator 64GB (2x32) DDR5 5600', price: 2400, type: 'DDR5', speed: 5600, capacity: 64 },
        { id: 'ram18', name: 'G.Skill Trident Z5 64GB (2x32) DDR5 6000', price: 2700, type: 'DDR5', speed: 6000, capacity: 64 },
        { id: 'ram19', name: 'Corsair Vengeance 16GB (2x8) DDR5 6000', price: 700, type: 'DDR5', speed: 6000, capacity: 16 },
        { id: 'ram20', name: 'Kingston Fury Beast 64GB (2x32) DDR5 5600', price: 2500, type: 'DDR5', speed: 5600, capacity: 64 },
    ],

    // ==================== Fontes (20 opções) ====================
    psu: [
        { id: 'psu1', name: 'Fortrek 400W 80+ White', price: 200, wattage: 400, connectors: ['PCIe 6-pin', 'CPU 4-pin'] },
        { id: 'psu2', name: 'K-Mex 500W 80+ White', price: 240, wattage: 500, connectors: ['PCIe 8-pin', 'CPU 4-pin'] },
        { id: 'psu3', name: 'EVGA 450W 80+ White', price: 280, wattage: 450, connectors: ['PCIe 8-pin', 'CPU 4-pin'] },
        { id: 'psu4', name: 'Cooler Master MWE 550W 80+ Bronze', price: 380, wattage: 550, connectors: ['PCIe 8-pin', 'CPU 8-pin'] },
        { id: 'psu5', name: 'EVGA 600W 80+ White', price: 350, wattage: 600, connectors: ['PCIe 8-pin', 'CPU 4-pin'] },
        { id: 'psu6', name: 'Corsair CV550 550W 80+ Bronze', price: 400, wattage: 550, connectors: ['PCIe 8-pin', 'CPU 8-pin'] },
        { id: 'psu7', name: 'XPG Core Reactor 650W 80+ Gold', price: 520, wattage: 650, connectors: ['PCIe 8-pin', 'CPU 8-pin'] },
        { id: 'psu8', name: 'Corsair CV650 650W 80+ Bronze', price: 450, wattage: 650, connectors: ['PCIe 8-pin', 'CPU 8-pin'] },
        { id: 'psu9', name: 'Corsair RM650 650W 80+ Gold', price: 680, wattage: 650, connectors: ['PCIe 8-pin', 'CPU 8-pin'] },
        { id: 'psu10', name: 'Corsair RM750 750W 80+ Gold', price: 750, wattage: 750, connectors: ['PCIe 8-pin', 'CPU 8-pin'] },
        { id: 'psu11', name: 'Seasonic Focus GX 750W 80+ Gold', price: 820, wattage: 750, connectors: ['PCIe 8-pin', 'CPU 8-pin'] },
        { id: 'psu12', name: 'Corsair RM850 850W 80+ Gold', price: 950, wattage: 850, connectors: ['PCIe 8-pin', 'CPU 8-pin'] },
        { id: 'psu13', name: 'Seasonic Focus GX 850W 80+ Gold', price: 1000, wattage: 850, connectors: ['PCIe 8-pin', 'CPU 8-pin'] },
        { id: 'psu14', name: 'Corsair RM1000x 1000W 80+ Gold', price: 1350, wattage: 1000, connectors: ['PCIe 8-pin', 'CPU 8-pin'] },
        { id: 'psu15', name: 'Corsair HX1000 1000W 80+ Platinum', price: 1550, wattage: 1000, connectors: ['PCIe 8-pin', 'CPU 8-pin'] },
        { id: 'psu16', name: 'Seasonic Prime TX-1000 1000W 80+ Titanium', price: 2100, wattage: 1000, connectors: ['PCIe 8-pin', 'CPU 8-pin'] },
        { id: 'psu17', name: 'Corsair AX1600i 1600W 80+ Titanium', price: 3400, wattage: 1600, connectors: ['PCIe 8-pin', 'CPU 8-pin'] },
        { id: 'psu18', name: 'EVGA SuperNOVA 850 G6 850W 80+ Gold', price: 950, wattage: 850, connectors: ['PCIe 8-pin', 'CPU 8-pin'] },
        { id: 'psu19', name: 'XPG CyberCore 1000W 80+ Platinum', price: 1450, wattage: 1000, connectors: ['PCIe 8-pin', 'CPU 8-pin'] },
        { id: 'psu20', name: 'Cooler Master V750 750W 80+ Gold', price: 720, wattage: 750, connectors: ['PCIe 8-pin', 'CPU 8-pin'] },
    ]
};
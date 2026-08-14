// ================================================================
//  SCRIPT PRINCIPAL - TCR_ASSEMBLER
//  Carrega as peças a partir da API do back-end (não mais de um
//  arquivo estático). Se a API estiver fora do ar, usa o
//  database.js local como fallback para o site continuar funcionando.
// ================================================================

// Ajuste esta URL para o endereço do seu back-end em produção.
const API_URL = window.TCR_API_URL || 'http://localhost:3001/api';

let DATABASE = null;

// ================================================================
//  AUTENTICAÇÃO - login, cadastro (com consentimento LGPD) e sessão
// ================================================================

// Acesso seguro ao localStorage: em alguns contextos (arquivo aberto
// diretamente, iframes/sandboxes de preview) o navegador BLOQUEIA o
// localStorage e lança um erro. Sem essa proteção, esse erro travava a
// execução de todo o script.js logo na primeira linha — e nenhum botão
// da página (login incluído) funcionava.
const safeStorage = {
    getItem(key) {
        try { return window.localStorage.getItem(key); } catch (e) { return null; }
    },
    setItem(key, value) {
        try { window.localStorage.setItem(key, value); } catch (e) { /* ignora */ }
    },
    removeItem(key) {
        try { window.localStorage.removeItem(key); } catch (e) { /* ignora */ }
    },
};

const auth = {
    token: safeStorage.getItem('tcr_token') || null,
    user: JSON.parse(safeStorage.getItem('tcr_user') || 'null'),
    mode: 'register', // 'register' | 'login'
};

function isLoggedIn() {
    return !!auth.token;
}

function setSession(token, user) {
    auth.token = token;
    auth.user = user;
    safeStorage.setItem('tcr_token', token);
    safeStorage.setItem('tcr_user', JSON.stringify(user));
    updateAccountUI();
}

function clearSession() {
    auth.token = null;
    auth.user = null;
    safeStorage.removeItem('tcr_token');
    safeStorage.removeItem('tcr_user');
    updateAccountUI();
    document.getElementById('dashboard')?.classList.add('hidden');
}

function authHeaders() {
    return auth.token ? { Authorization: `Bearer ${auth.token}` } : {};
}

function updateAccountUI() {
    const btnGoAuth = document.getElementById('btnGoAuth');
    const accountLogged = document.getElementById('accountLogged');
    const greeting = document.getElementById('accountGreeting');

    if (isLoggedIn()) {
        btnGoAuth?.classList.add('hidden');
        accountLogged?.classList.remove('hidden');
        if (greeting) greeting.textContent = `Olá, ${auth.user.name.split(' ')[0]}`;
    } else {
        btnGoAuth?.classList.remove('hidden');
        accountLogged?.classList.add('hidden');
    }
}

function setAuthMode(mode) {
    auth.mode = mode;
    const title = document.getElementById('authSectionTitle');
    const subtitle = document.getElementById('authSectionSubtitle');
    const nameRow = document.getElementById('nameRow');
    const lgpdRow = document.getElementById('lgpdRow');
    const submitBtn = document.getElementById('authSubmit');
    const switchText = document.getElementById('authSwitchText');
    const switchLink = document.getElementById('authSwitchLink');
    const errorEl = document.getElementById('authError');
    if (errorEl) errorEl.style.display = 'none';

    if (mode === 'login') {
        if (title) title.textContent = 'Entrar na sua conta';
        if (subtitle) subtitle.textContent = 'Acesse para ver os PCs que você já salvou.';
        nameRow?.classList.add('hidden');
        lgpdRow?.classList.add('hidden');
        document.getElementById('authName').required = false;
        document.getElementById('lgpdConsent').required = false;
        if (submitBtn) submitBtn.textContent = 'Entrar';
        if (switchText) switchText.textContent = 'Ainda não tem conta?';
        if (switchLink) switchLink.textContent = 'Criar conta';
    } else {
        if (title) title.textContent = 'Crie sua conta';
        if (subtitle) subtitle.textContent = 'Salve os PCs que você montar e acesse de qualquer lugar.';
        nameRow?.classList.remove('hidden');
        lgpdRow?.classList.remove('hidden');
        document.getElementById('authName').required = true;
        document.getElementById('lgpdConsent').required = true;
        if (submitBtn) submitBtn.textContent = 'Criar conta';
        if (switchText) switchText.textContent = 'Já tem uma conta?';
        if (switchLink) switchLink.textContent = 'Entrar';
    }
}

async function handleAuthSubmit(e) {
    e.preventDefault();
    const errorEl = document.getElementById('authError');
    const submitBtn = document.getElementById('authSubmit');
    errorEl.style.display = 'none';

    const email = document.getElementById('authEmail').value.trim();
    const password = document.getElementById('authPassword').value;

    submitBtn.disabled = true;
    try {
        let res, data;
        if (auth.mode === 'register') {
            const name = document.getElementById('authName').value.trim();
            const lgpdConsent = document.getElementById('lgpdConsent').checked;
            if (!lgpdConsent) {
                errorEl.textContent = 'É necessário aceitar o uso dos dados (LGPD) para criar a conta.';
                errorEl.style.display = 'block';
                return;
            }
            res = await fetch(`${API_URL}/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password, lgpdConsent }),
            });
        } else {
            res = await fetch(`${API_URL}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
        }
        data = await res.json();
        if (!res.ok) {
            errorEl.textContent = data.error || 'Não foi possível continuar. Tente novamente.';
            errorEl.style.display = 'block';
            return;
        }
        setSession(data.token, data.user);
        document.getElementById('authForm').reset();
        document.getElementById('montar').scrollIntoView({ behavior: 'smooth' });
    } catch (err) {
        errorEl.textContent = 'Erro de conexão com o servidor. Tente novamente.';
        errorEl.style.display = 'block';
    } finally {
        submitBtn.disabled = false;
    }
}

// ================================================================
//  MEUS PCs SALVOS (dashboard)
// ================================================================

async function loadMyBuilds() {
    const grid = document.getElementById('myBuildsGrid');
    if (!grid || !isLoggedIn()) return;
    grid.innerHTML = '<p>Carregando...</p>';
    try {
        const res = await fetch(`${API_URL}/builds`, { headers: authHeaders() });
        if (!res.ok) throw new Error('Falha ao carregar PCs salvos');
        const builds = await res.json();
        renderMyBuilds(builds);
    } catch (err) {
        grid.innerHTML = '<p>Não foi possível carregar seus PCs salvos agora.</p>';
    }
}

function renderMyBuilds(builds) {
    const grid = document.getElementById('myBuildsGrid');
    if (!grid) return;
    if (!builds.length) {
        grid.innerHTML = '<p id="myBuildsEmpty">Você ainda não salvou nenhum PC.</p>';
        return;
    }
    grid.innerHTML = builds.map(b => `
        <article class="demo-card" data-build-id="${b.id}">
            <div class="demo-icon" aria-hidden="true">🖥️</div>
            <h3>${b.label}</h3>
            <p>Finalidade: ${CATEGORY_LABELS[b.purpose] || b.purpose || '—'}</p>
            <p>Orçamento: R$ ${Number(b.budget).toFixed(2)}</p>
            <p class="build-card-total">Total: R$ ${Number(b.total).toFixed(2)}</p>
            <button class="build-card-remove" data-remove-id="${b.id}">Remover</button>
        </article>
    `).join('');

    grid.querySelectorAll('[data-remove-id]').forEach(btn => {
        btn.addEventListener('click', async () => {
            const id = btn.getAttribute('data-remove-id');
            btn.disabled = true;
            try {
                const res = await fetch(`${API_URL}/builds/${id}`, {
                    method: 'DELETE',
                    headers: authHeaders(),
                });
                if (res.ok) {
                    await loadMyBuilds();
                }
            } catch (err) {
                btn.disabled = false;
            }
        });
    });
}

async function handleSaveBuild(lastResult) {
    const msgEl = document.getElementById('saveBuildMsg');
    if (!isLoggedIn()) {
        if (msgEl) msgEl.textContent = 'Crie uma conta ou entre para salvar este PC.';
        document.getElementById('cadastro').scrollIntoView({ behavior: 'smooth' });
        return;
    }
    if (!lastResult) return;

    if (msgEl) msgEl.textContent = 'Salvando...';
    try {
        const res = await fetch(`${API_URL}/builds`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', ...authHeaders() },
            body: JSON.stringify({
                label: `PC ${CATEGORY_LABELS[state.purpose] || state.purpose || ''} — R$ ${lastResult.total.toFixed(2)}`,
                budget: state.budget,
                purpose: state.purpose,
                total: lastResult.total,
                components: lastResult.components,
            }),
        });
        if (!res.ok) throw new Error('Falha ao salvar');
        if (msgEl) msgEl.textContent = '✅ PC salvo na sua conta!';
    } catch (err) {
        if (msgEl) msgEl.textContent = 'Não foi possível salvar agora. Tente novamente.';
    }
}

async function loadDatabase() {
    try {
        const res = await fetch(`${API_URL}/parts`);
        if (!res.ok) throw new Error(`API respondeu ${res.status}`);
        DATABASE = await res.json();
        console.log('Peças carregadas do back-end (API).');
    } catch (err) {
        console.warn('Não foi possível conectar ao back-end, usando dados locais como fallback.', err);
        if (window.DATABASE) {
            DATABASE = window.DATABASE;
        } else {
            console.error('Nenhuma fonte de dados disponível (nem API, nem database.js)!');
            DATABASE = { cpu: [], gpu: [], placa_mae: [], ram: [], psu: [] };
        }
    }
}

// ================================================================
//  CATEGORIAS E RÓTULOS
// ================================================================

const CATEGORY_LABELS = {
    cpu: 'CPU',
    gpu: 'GPU',
    placa_mae: 'Placa Mãe',
    ram: 'RAM',
    psu: 'PSU'
};

// ================================================================
//  LIMITES POR PROPÓSITO (exceto "jogos")
//  Baseado em necessidades típicas de cada área
// ================================================================

const PURPOSE_LIMITS = {
    estudo: {
        cpu: { maxPrice: 600 },
        gpu: { maxPrice: 500 }, // integrada ou básica
        ram: { maxPrice: 450, maxCapacity: 16 },
        placa_mae: { maxPrice: 550 },
        psu: { maxPrice: 350, maxWattage: 500 }
    },
    programacao: {
        cpu: { maxPrice: 1200 },
        gpu: { maxPrice: 1500 },
        ram: { maxPrice: 850, maxCapacity: 32 },
        placa_mae: { maxPrice: 1000 },
        psu: { maxPrice: 550, maxWattage: 650 }
    },
    design: {
        cpu: { maxPrice: 2500 },
        gpu: { maxPrice: 3000 },
        ram: { maxPrice: 2000, maxCapacity: 64 },
        placa_mae: { maxPrice: 1500 },
        psu: { maxPrice: 850, maxWattage: 750 }
    },
    geral: {
        cpu: { maxPrice: 1000 },
        gpu: { maxPrice: 1000 },
        ram: { maxPrice: 500, maxCapacity: 16 },
        placa_mae: { maxPrice: 800 },
        psu: { maxPrice: 400, maxWattage: 600 }
    }
    // "jogos" não tem limites (pode escolher qualquer peça)
};

// ================================================================
//  REGRAS DE COMPATIBILIDADE
// ================================================================

const COMPATIBILITY_RULES = {
    cpu_placa_mae: (cpu, mobo) => cpu && mobo && cpu.socket === mobo.socket,
    cpu_ram: (cpu, ram) => {
        if (!cpu || !ram) return true;
        if (['Alder Lake', 'Raptor Lake'].includes(cpu.generation)) return true;
        if (['Zen 3', 'Zen+', 'Zen 2'].includes(cpu.generation)) return ram.type === 'DDR4';
        if (cpu.generation === 'Zen 4') return ram.type === 'DDR5';
        if (['Comet Lake', 'Rocket Lake'].includes(cpu.generation)) return ram.type === 'DDR4';
        return true;
    },
    placa_mae_ram: (mobo, ram) => mobo && ram && mobo.ramType === ram.type,
    placa_mae_gpu: () => true,
    gpu_psu: (gpu, psu) => {
        if (!gpu || !psu) return true;
        if (gpu.power === 0) return true;
        return psu.wattage >= (gpu.power + 150);
    },
    cpu_psu: (cpu, psu) => {
        if (!cpu || !psu) return true;
        if (cpu.cores >= 12) return psu.connectors.some(c => c.includes('CPU 8-pin'));
        return true;
    },
};

// ================================================================
//  FUNÇÃO DE VERIFICAÇÃO DE COMPATIBILIDADE
// ================================================================

function checkCompatibility(category, itemId, currentFilters) {
    const item = DATABASE[category].find(p => p.id === itemId);
    if (!item) return { compatible: true };

    for (const [otherCat, otherId] of Object.entries(currentFilters)) {
        if (otherCat === category || !otherId) continue;
        const otherItem = DATABASE[otherCat].find(p => p.id === otherId);
        if (!otherItem) continue;

        const ruleKey1 = `${category}_${otherCat}`;
        const ruleKey2 = `${otherCat}_${category}`;
        let compatible = true;
        if (COMPATIBILITY_RULES[ruleKey1]) {
            compatible = COMPATIBILITY_RULES[ruleKey1](item, otherItem);
        } else if (COMPATIBILITY_RULES[ruleKey2]) {
            compatible = COMPATIBILITY_RULES[ruleKey2](otherItem, item);
        }

        if (!compatible) {
            return {
                compatible: false,
                conflictWith: otherCat,
                conflictName: otherItem.name,
                reason: getConflictReason(category, otherCat, item, otherItem)
            };
        }
    }
    return { compatible: true };
}

function getConflictReason(cat1, cat2, item1, item2) {
    const reasons = {
        'cpu_placa_mae': `Socket incompatível (${item1.socket} vs ${item2.socket})`,
        'placa_mae_cpu': `Socket incompatível (${item1.socket} vs ${item2.socket})`,
        'cpu_ram': `Tipo de RAM incompatível para ${item1.name}`,
        'placa_mae_ram': `Tipo de RAM incompatível (${item1.ramType} vs ${item2.type})`,
        'gpu_psu': `Potência insuficiente (${item2.wattage}W < ${item1.power + 150}W)`,
        'cpu_psu': `Fonte sem conector adequado para ${item1.name}`,
    };
    const key = `${cat1}_${cat2}`;
    return reasons[key] || reasons[`${cat2}_${cat1}`] || 'Incompatível';
}

// ================================================================
//  ESTADO DA APLICAÇÃO
// ================================================================

const state = {
    budget: null,
    purpose: null,
    filters: { cpu: null, gpu: null, placa_mae: null, ram: null, psu: null },
    searchTerms: { cpu: '', gpu: '', placa_mae: '', ram: '', psu: '' },
    dropdownOpen: null,
    pendingGeneration: null,
    lastResult: null,
};

// ================================================================
//  FUNÇÃO DE EQUILÍBRIO - Respeita os limites por propósito
// ================================================================

function balanceComponents(components, budget, purpose) {
    const cpu = components.cpu;
    const gpu = components.gpu;
    if (!cpu || !gpu) return components;

    // Se não for jogos, aplicar limites
    const limits = PURPOSE_LIMITS[purpose];
    if (purpose !== 'jogos' && limits) {
        // Verifica se CPU está acima do limite máximo de preço
        const cpuLimit = limits.cpu?.maxPrice;
        if (cpuLimit && cpu.price > cpuLimit) {
            // Tentar trocar por uma CPU mais barata dentro do limite
            const possibleCPUs = DATABASE.cpu
                .filter(c => c.price <= cpuLimit && c.id !== cpu.id)
                .sort((a, b) => b.price - a.price);
            for (const newCpu of possibleCPUs) {
                const compat = checkCompatibility('cpu', newCpu.id, state.filters);
                if (compat.compatible) {
                    components.cpu = newCpu;
                    break;
                }
            }
        }
        // Verifica GPU
        const gpuLimit = limits.gpu?.maxPrice;
        if (gpuLimit && gpu.price > gpuLimit) {
            const possibleGPUs = DATABASE.gpu
                .filter(g => g.price <= gpuLimit && g.id !== gpu.id)
                .sort((a, b) => b.price - a.price);
            for (const newGpu of possibleGPUs) {
                const compat = checkCompatibility('gpu', newGpu.id, state.filters);
                if (compat.compatible) {
                    components.gpu = newGpu;
                    break;
                }
            }
        }
        // Verifica RAM
        const ram = components.ram;
        if (ram) {
            const ramLimitPrice = limits.ram?.maxPrice;
            const ramLimitCap = limits.ram?.maxCapacity;
            if (ramLimitPrice && ram.price > ramLimitPrice) {
                const possibleRAM = DATABASE.ram
                    .filter(r => r.price <= ramLimitPrice && r.id !== ram.id)
                    .sort((a, b) => b.price - a.price);
                for (const newRam of possibleRAM) {
                    const compat = checkCompatibility('ram', newRam.id, state.filters);
                    if (compat.compatible) {
                        components.ram = newRam;
                        break;
                    }
                }
            }
            if (ramLimitCap && ram.capacity > ramLimitCap) {
                const possibleRAM = DATABASE.ram
                    .filter(r => r.capacity <= ramLimitCap && r.id !== ram.id)
                    .sort((a, b) => b.price - a.price);
                for (const newRam of possibleRAM) {
                    const compat = checkCompatibility('ram', newRam.id, state.filters);
                    if (compat.compatible) {
                        components.ram = newRam;
                        break;
                    }
                }
            }
        }
        // Verifica PSU
        const psu = components.psu;
        if (psu) {
            const psuLimitPrice = limits.psu?.maxPrice;
            const psuLimitWatt = limits.psu?.maxWattage;
            if (psuLimitPrice && psu.price > psuLimitPrice) {
                const possiblePSU = DATABASE.psu
                    .filter(p => p.price <= psuLimitPrice && p.id !== psu.id)
                    .sort((a, b) => b.price - a.price);
                for (const newPsu of possiblePSU) {
                    const compat = checkCompatibility('psu', newPsu.id, state.filters);
                    if (compat.compatible) {
                        components.psu = newPsu;
                        break;
                    }
                }
            }
            if (psuLimitWatt && psu.wattage > psuLimitWatt) {
                const possiblePSU = DATABASE.psu
                    .filter(p => p.wattage <= psuLimitWatt && p.id !== psu.id)
                    .sort((a, b) => b.price - a.price);
                for (const newPsu of possiblePSU) {
                    const compat = checkCompatibility('psu', newPsu.id, state.filters);
                    if (compat.compatible) {
                        components.psu = newPsu;
                        break;
                    }
                }
            }
        }
        // Verifica Placa Mãe
        const mobo = components.placa_mae;
        if (mobo) {
            const moboLimit = limits.placa_mae?.maxPrice;
            if (moboLimit && mobo.price > moboLimit) {
                const possibleMobo = DATABASE.placa_mae
                    .filter(m => m.price <= moboLimit && m.id !== mobo.id)
                    .sort((a, b) => b.price - a.price);
                for (const newMobo of possibleMobo) {
                    const compat = checkCompatibility('placa_mae', newMobo.id, state.filters);
                    if (compat.compatible) {
                        components.placa_mae = newMobo;
                        break;
                    }
                }
            }
        }
    }
    return components;
}

// ================================================================
//  FUNÇÕES DE GERAÇÃO (SIMULAÇÃO DE IA) - COM LIMITES E NÃO-FORÇA GASTO
// ================================================================

async function fetchComponents(cat) {
    await new Promise(r => setTimeout(r, 150));
    return DATABASE[cat] || [];
}

async function generatePC(budget, filters, purpose, allowOverbudget = false) {
    await new Promise(r => setTimeout(r, 300));

    const selected = { ...filters };
    const categories = ['gpu', 'cpu', 'ram', 'placa_mae', 'psu'];
    const result = {};
    let total = 0;

    const componentMap = {};
    for (const cat of categories) {
        componentMap[cat] = await fetchComponents(cat);
    }

    // 1. Aplicar filtros
    for (const cat of categories) {
        if (selected[cat]) {
            const item = componentMap[cat].find(p => p.id === selected[cat]);
            if (item) {
                result[cat] = item;
                total += item.price;
            } else {
                selected[cat] = null;
            }
        }
    }

    const remainingCats = categories.filter(cat => !result[cat]);
    let remainingBudget = budget - total;

    // Se já estourou, tratar overbudget
    if (remainingBudget < 0) {
        if (allowOverbudget) {
            for (const cat of remainingCats) {
                const sorted = [...componentMap[cat]].sort((a, b) => a.price - b.price);
                const item = sorted[0];
                result[cat] = item;
                total += item.price;
            }
            return { components: result, total, overbudget: true };
        } else {
            return null;
        }
    }

    // Definir ordem de prioridade (GPU, CPU, RAM, Placa Mãe, PSU)
    const priority = ['gpu', 'cpu', 'ram', 'placa_mae', 'psu'].filter(c => remainingCats.includes(c));

    // Se o propósito não for "jogos", aplicar limites máximos
    const limits = (purpose !== 'jogos') ? PURPOSE_LIMITS[purpose] : null;

    for (const cat of priority) {
        const items = componentMap[cat];
        let candidates = items;

        // Filtrar por propósito (se existir)
        if (purpose && purpose !== 'geral') {
            candidates = items.filter(item => {
                if (!item.purpose) return true;
                return item.purpose.some(p => p === purpose || p === 'geral');
            });
            if (candidates.length === 0) candidates = items;
        }

        // Aplicar limites máximos por categoria (se houver)
        if (limits) {
            const catLimits = limits[cat];
            if (catLimits) {
                if (catLimits.maxPrice) {
                    candidates = candidates.filter(item => item.price <= catLimits.maxPrice);
                }
                if (catLimits.maxCapacity && cat === 'ram') {
                    candidates = candidates.filter(item => item.capacity <= catLimits.maxCapacity);
                }
                if (catLimits.maxWattage && cat === 'psu') {
                    candidates = candidates.filter(item => item.wattage <= catLimits.maxWattage);
                }
                // Se após filtrar não sobrar nada, usar todos (mas priorizar os que estão dentro)
                if (candidates.length === 0) candidates = items;
            }
        }

        // Ordenar por preço decrescente (preferir melhor dentro dos limites)
        const sorted = candidates.sort((a, b) => b.price - a.price);
        let chosen = null;

        // Tentar achar a melhor que cabe no orçamento
        for (const item of sorted) {
            if (item.price <= remainingBudget) {
                const tempFilters = { ...selected };
                for (const [key, val] of Object.entries(result)) {
                    tempFilters[key] = val.id;
                }
                const compat = checkCompatibility(cat, item.id, tempFilters);
                if (compat.compatible) {
                    chosen = item;
                    break;
                }
            }
        }

        // Se não achou, pegar a mais barata (que cabe ou não, dependendo do overbudget)
        if (!chosen) {
            // Pegar a mais barata que seja compatível
            const sortedByPrice = candidates.sort((a, b) => a.price - b.price);
            for (const item of sortedByPrice) {
                const tempFilters = { ...selected };
                for (const [key, val] of Object.entries(result)) {
                    tempFilters[key] = val.id;
                }
                const compat = checkCompatibility(cat, item.id, tempFilters);
                if (compat.compatible) {
                    chosen = item;
                    break;
                }
            }
            if (!chosen) {
                // Último recurso: qualquer um
                chosen = sortedByPrice[0];
            }
        }

        result[cat] = chosen;
        total += chosen.price;
        remainingBudget -= chosen.price;
    }

    // Aplicar equilíbrio respeitando limites
    const balanced = balanceComponents(result, budget, purpose);
    // Recalcular total
    total = Object.values(balanced).reduce((sum, item) => sum + (item ? item.price : 0), 0);

    // Verificar se estourou (se não for overbudget)
    if (total > budget) {
        if (allowOverbudget) {
            return { components: balanced, total, overbudget: true };
        } else {
            // Tentar reduzir trocando por peças mais baratas (já implementado antes)
            let reduziu = false;
            for (const cat of categories) {
                if (selected[cat]) continue;
                const current = balanced[cat];
                const cheaper = componentMap[cat].filter(p => p.price < current.price).sort((a, b) => b.price - a.price);
                for (const newItem of cheaper) {
                    const tempFilters = { ...selected };
                    for (const [key, val] of Object.entries(balanced)) {
                        if (balanced[key].id !== current.id) {
                            tempFilters[key] = val.id;
                        }
                    }
                    const compat = checkCompatibility(cat, newItem.id, tempFilters);
                    if (compat.compatible) {
                        const diff = current.price - newItem.price;
                        if (total - diff <= budget) {
                            balanced[cat] = newItem;
                            total -= diff;
                            reduziu = true;
                            break;
                        }
                    }
                }
                if (reduziu) break;
            }
            if (!reduziu) {
                return null;
            }
        }
    }

    if (total > budget && !allowOverbudget) {
        return null;
    }

    return { components: balanced, total, overbudget: total > budget };
}

// ================================================================
//  RENDERIZAÇÃO DOS FILTROS (mesma de antes, mas com filtro de propósito)
// ================================================================

async function renderFilters() {
    const container = document.getElementById('filtersContainer');
    if (!container) return;
    container.innerHTML = '';

    for (const [cat, label] of Object.entries(CATEGORY_LABELS)) {
        const group = document.createElement('div');
        group.className = 'filter-group';
        group.dataset.category = cat;

        const labelEl = document.createElement('label');
        labelEl.textContent = label;
        group.appendChild(labelEl);

        const selectDiv = document.createElement('div');
        selectDiv.className = 'filter-select';
        selectDiv.dataset.category = cat;

        const selectedText = document.createElement('span');
        selectedText.className = 'selected-text';
        selectedText.textContent = 'Qualquer ' + label;
        selectDiv.appendChild(selectedText);

        const arrow = document.createElement('span');
        arrow.className = 'arrow';
        arrow.textContent = '▼';
        selectDiv.appendChild(arrow);

        const dropdown = document.createElement('div');
        dropdown.className = 'filter-dropdown';
        dropdown.dataset.category = cat;

        const searchInput = document.createElement('input');
        searchInput.type = 'text';
        searchInput.placeholder = 'Pesquisar ' + label + '...';
        searchInput.dataset.category = cat;
        dropdown.appendChild(searchInput);

        const optionList = document.createElement('div');
        optionList.className = 'option-list';
        dropdown.appendChild(optionList);

        selectDiv.appendChild(dropdown);
        group.appendChild(selectDiv);

        const tagContainer = document.createElement('div');
        tagContainer.className = 'filter-tag-container';
        group.appendChild(tagContainer);

        container.appendChild(group);

        selectDiv.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleDropdown(cat);
        });

        searchInput.addEventListener('input', (e) => {
            state.searchTerms[cat] = e.target.value.toLowerCase();
            renderOptions(cat);
        });

        document.addEventListener('click', closeAllDropdowns);
        dropdown.addEventListener('click', (e) => e.stopPropagation());
    }

    for (const cat of Object.keys(CATEGORY_LABELS)) {
        await renderOptions(cat);
    }
}

async function renderOptions(cat) {
    const group = document.querySelector(`.filter-group[data-category="${cat}"]`);
    if (!group) return;
    const dropdown = group.querySelector('.filter-dropdown');
    const optionList = dropdown.querySelector('.option-list');
    const searchTerm = state.searchTerms[cat] || '';

    const items = await fetchComponents(cat);
    let filtered = items.filter(item =>
        item.name.toLowerCase().includes(searchTerm)
    );

    // Filtrar por propósito (se houver)
    if (state.purpose && state.purpose !== 'geral') {
        filtered = filtered.filter(item => {
            if (!item.purpose) return true;
            return item.purpose.some(p => p === state.purpose || p === 'geral');
        });
    }

    // Se houver limites, também filtrar (mas apenas visualmente)
    const limits = (state.purpose && state.purpose !== 'jogos') ? PURPOSE_LIMITS[state.purpose] : null;
    if (limits) {
        const catLimits = limits[cat];
        if (catLimits) {
            // Não removemos, apenas marcamos como incompatível se ultrapassar
            // Mas para visualização, podemos deixar claro
        }
    }

    optionList.innerHTML = '';

    const anyOption = document.createElement('div');
    anyOption.className = 'option-item' + (state.filters[cat] === null ? ' selected' : '');
    anyOption.textContent = 'Qualquer ' + CATEGORY_LABELS[cat];
    anyOption.dataset.value = '';
    anyOption.addEventListener('click', (e) => {
        e.stopPropagation();
        selectFilter(cat, null);
        closeAllDropdowns();
    });
    optionList.appendChild(anyOption);

    for (const item of filtered) {
        // Verificar compatibilidade e também se está dentro dos limites
        const compat = checkCompatibility(cat, item.id, state.filters);
        let exceedsLimit = false;
        if (limits && limits[cat]) {
            const l = limits[cat];
            if (l.maxPrice && item.price > l.maxPrice) exceedsLimit = true;
            if (l.maxCapacity && cat === 'ram' && item.capacity > l.maxCapacity) exceedsLimit = true;
            if (l.maxWattage && cat === 'psu' && item.wattage > l.maxWattage) exceedsLimit = true;
        }
        const div = document.createElement('div');
        div.className = 'option-item';
        if (state.filters[cat] === item.id) {
            div.classList.add('selected');
        }
        if (!compat.compatible || exceedsLimit) {
            div.classList.add('incompatible');
            let title = '';
            if (!compat.compatible) {
                title = `⚠️ Incompatível com ${compat.conflictName}: ${compat.reason}`;
            } else if (exceedsLimit) {
                title = `⚠️ Esta peça excede o limite recomendado para o propósito selecionado.`;
            }
            div.title = title;
        }
        div.innerHTML = `${item.name} <span class="price-tag">R$ ${item.price}</span>`;
        div.dataset.value = item.id;

        if (compat.compatible && !exceedsLimit) {
            div.addEventListener('click', (e) => {
                e.stopPropagation();
                selectFilter(cat, item.id);
                closeAllDropdowns();
            });
        }

        optionList.appendChild(div);
    }
}

function selectFilter(cat, id) {
    state.filters[cat] = id;
    const group = document.querySelector(`.filter-group[data-category="${cat}"]`);
    if (!group) return;
    const selectedText = group.querySelector('.filter-select .selected-text');
    const tagContainer = group.querySelector('.filter-tag-container');

    if (id === null) {
        selectedText.textContent = 'Qualquer ' + CATEGORY_LABELS[cat];
        tagContainer.innerHTML = '';
    } else {
        fetchComponents(cat).then(items => {
            const item = items.find(p => p.id === id);
            if (item) {
                selectedText.textContent = item.name;
                tagContainer.innerHTML = '';
                const tag = document.createElement('span');
                tag.className = 'filter-tag';
                tag.innerHTML = `${item.name} <span class="remove" data-cat="${cat}">✕</span>`;
                tagContainer.appendChild(tag);
                tag.querySelector('.remove').addEventListener('click', (e) => {
                    e.stopPropagation();
                    selectFilter(cat, null);
                });
            }
        });
    }
    for (const c of Object.keys(CATEGORY_LABELS)) {
        renderOptions(c);
    }
}

function toggleDropdown(cat) {
    if (state.dropdownOpen === cat) {
        closeAllDropdowns();
        return;
    }
    closeAllDropdowns();
    state.dropdownOpen = cat;
    const group = document.querySelector(`.filter-group[data-category="${cat}"]`);
    if (!group) return;
    const dropdown = group.querySelector('.filter-dropdown');
    dropdown.classList.add('open');
    const input = dropdown.querySelector('input');
    setTimeout(() => input.focus(), 50);
}

function closeAllDropdowns() {
    document.querySelectorAll('.filter-dropdown').forEach(el => el.classList.remove('open'));
    state.dropdownOpen = null;
}

// ================================================================
//  GERAR PC - COM VALIDAÇÃO DE PROPÓSITO E ORÇAMENTO
// ================================================================

async function handleGenerate() {
    const budgetInput = document.getElementById('budgetInput');
    const purposeSelect = document.getElementById('purposeSelect');
    const errorEl = document.getElementById('budgetError');

    if (!budgetInput || !purposeSelect || !errorEl) return;

    const budget = parseFloat(budgetInput.value);
    const purpose = purposeSelect.value;

    if (!budget || budget <= 0 || !purpose) {
        errorEl.style.display = 'block';
        errorEl.textContent = '⚠️ Por favor, insira um orçamento válido e selecione o propósito.';
        return;
    }
    errorEl.style.display = 'none';

    state.budget = budget;
    state.purpose = purpose;

    const filters = {};
    for (const cat of Object.keys(CATEGORY_LABELS)) {
        filters[cat] = state.filters[cat] || null;
    }

    const btn = document.getElementById('btnGenerate');
    if (!btn) return;
    btn.disabled = true;
    btn.classList.add('loading');

    try {
        let result = await generatePC(budget, filters, purpose, false);
        if (result) {
            displayResult(result, budget);
            return;
        }

        // Se não conseguiu dentro do orçamento, tentar com overbudget
        const resultWithOver = await generatePC(budget, filters, purpose, true);
        if (resultWithOver) {
            const overAmount = resultWithOver.total - budget;
            const percent = (overAmount / budget) * 100;
            if (percent <= 20 && percent > 0) {
                showModal(budget, filters, purpose, resultWithOver);
                return;
            } else {
                alert('Não foi possível montar um PC dentro do orçamento com os filtros selecionados. Tente ajustar os filtros ou aumentar o orçamento.');
            }
        } else {
            alert('Não foi possível montar um PC com os filtros selecionados. Tente remover alguns filtros.');
        }
    } catch (err) {
        alert('Erro ao gerar PC: ' + err.message);
    } finally {
        btn.disabled = false;
        btn.classList.remove('loading');
    }
}

function showModal(budget, filters, purpose, resultWithOver) {
    const overlay = document.getElementById('modalOverlay');
    const message = document.getElementById('modalMessage');
    if (!overlay || !message) return;

    message.textContent = `O PC precisa de uma peça que ultrapassa um pouco o orçamento (R$ ${resultWithOver.total.toFixed(2)}). Deseja ultrapassar o orçamento, ou deseja ficar com uma peça mais barata para não passar dele?`;

    overlay.classList.add('active');
    state.pendingGeneration = { budget, filters, purpose, resultWithOver };

    const yesBtn = document.getElementById('modalYes');
    const noBtn = document.getElementById('modalNo');
    if (!yesBtn || !noBtn) return;

    const newYes = yesBtn.cloneNode(true);
    const newNo = noBtn.cloneNode(true);
    yesBtn.parentNode.replaceChild(newYes, yesBtn);
    noBtn.parentNode.replaceChild(newNo, noBtn);

    newYes.addEventListener('click', () => {
        overlay.classList.remove('active');
        displayResult(state.pendingGeneration.resultWithOver, budget);
        state.pendingGeneration = null;
    });

    newNo.addEventListener('click', async () => {
        overlay.classList.remove('active');
        const newResult = await generatePC(budget, state.pendingGeneration.filters, state.pendingGeneration.purpose, false);
        if (newResult) {
            displayResult(newResult, budget);
        } else {
            alert('Não foi possível encontrar uma combinação dentro do orçamento sem ultrapassar. Tente ajustar os filtros.');
        }
        state.pendingGeneration = null;
    });
}

function displayResult(result, budget) {
    const resultDiv = document.getElementById('result');
    const content = document.getElementById('resultContent');
    if (!resultDiv || !content) return;

    resultDiv.classList.add('active');
    state.lastResult = result;

    const comps = result.components;
    const total = result.total;
    const saved = budget - total; // quanto sobrou

    let html = '<div class="result-grid">';
    for (const [cat, label] of Object.entries(CATEGORY_LABELS)) {
        const item = comps[cat];
        if (item) {
            html += `
                <div class="result-item">
                    <div class="cat">${label}</div>
                    <div class="name">${item.name}</div>
                    <div class="price">R$ ${item.price.toFixed(2)}</div>
                </div>
            `;
        }
    }
    html += '</div>';

    const overBudget = total > budget;
    const statusText = overBudget ? '🔴 Ultrapassou o orçamento' : '✅ Dentro do orçamento';
    const savedText = (saved > 0 && !overBudget) ? ` (economia de R$ ${saved.toFixed(2)})` : '';

    html += `
        <div class="result-total">
            Total: <span>R$ ${total.toFixed(2)}</span>
            <span class="status ${overBudget ? 'over' : 'within'}">
                ${statusText} ${savedText}
            </span>
        </div>
    `;

    content.innerHTML = html;
    resultDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ================================================================
//  INICIALIZAÇÃO
// ================================================================

document.addEventListener('DOMContentLoaded', async () => {
    // ---- Navegação / hero ----
    const btnStart = document.getElementById('btnStart');
    if (btnStart) {
        btnStart.addEventListener('click', function() {
            document.getElementById('montar').scrollIntoView({ behavior: 'smooth' });
        });
    }

    // ---- Montagem de PC ----
    const btnGenerate = document.getElementById('btnGenerate');
    if (btnGenerate) {
        btnGenerate.disabled = true;
        btnGenerate.addEventListener('click', handleGenerate);
    }

    const purposeSelect = document.getElementById('purposeSelect');
    if (purposeSelect) {
        purposeSelect.addEventListener('change', function() {
            state.purpose = this.value;
            for (const cat of Object.keys(CATEGORY_LABELS)) {
                renderOptions(cat);
            }
        });
    }

    const btnSaveBuild = document.getElementById('btnSaveBuild');
    if (btnSaveBuild) {
        btnSaveBuild.addEventListener('click', () => handleSaveBuild(state.lastResult));
    }

    // ---- Autenticação (login / cadastro) ----
    updateAccountUI();
    setAuthMode('register');

    const authForm = document.getElementById('authForm');
    if (authForm) {
        authForm.addEventListener('submit', handleAuthSubmit);
    }

    const authSwitchLink = document.getElementById('authSwitchLink');
    if (authSwitchLink) {
        authSwitchLink.addEventListener('click', (e) => {
            e.preventDefault();
            setAuthMode(auth.mode === 'register' ? 'login' : 'register');
        });
    }

    const btnGoAuth = document.getElementById('btnGoAuth');
    if (btnGoAuth) {
        btnGoAuth.addEventListener('click', () => {
            document.getElementById('cadastro').scrollIntoView({ behavior: 'smooth' });
        });
    }

    const btnLogout = document.getElementById('btnLogout');
    if (btnLogout) {
        btnLogout.addEventListener('click', () => {
            clearSession();
            document.getElementById('inicio').scrollIntoView({ behavior: 'smooth' });
        });
    }

    const btnGoDashboard = document.getElementById('btnGoDashboard');
    if (btnGoDashboard) {
        btnGoDashboard.addEventListener('click', async () => {
            document.getElementById('dashboard').classList.remove('hidden');
            document.getElementById('dashboard').scrollIntoView({ behavior: 'smooth' });
            await loadMyBuilds();
        });
    }

    if (isLoggedIn()) {
        document.getElementById('dashboard')?.classList.remove('hidden');
        loadMyBuilds();
    }

    // ---- Carrega as peças (API com fallback local) ----
    const filtersContainer = document.getElementById('filtersContainer');
    if (filtersContainer) {
        filtersContainer.innerHTML = '<p>Carregando peças do servidor...</p>';
    }

    await loadDatabase();

    if (btnGenerate) {
        btnGenerate.disabled = false;
    }

    renderFilters();

    console.log('TCR_ASSEMBLER carregado com ' +
        Object.values(DATABASE).reduce((acc, arr) => acc + arr.length, 0) + ' peças!');
});
console.log('Limites por propósito ativos (exceto jogos).');
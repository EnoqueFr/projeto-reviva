// TODO: troque pela URL da sua API depois do deploy (a mesma usada em app.js).
const API_BASE_URL = 'https://reviva-backend.vercel.app';

const TOKEN_KEY = 'reviva_painel_token';

const loginSection = document.getElementById('loginSection');
const dashboardSection = document.getElementById('dashboardSection');
const loginForm = document.getElementById('loginForm');
const loginMsg = document.getElementById('loginMsg');
const loginSubmit = document.getElementById('loginSubmit');
const userInfo = document.getElementById('painelUserInfo');
const userNomeEl = document.getElementById('painelUserNome');
const logoutBtn = document.getElementById('painelLogoutBtn');
const filtroStatus = document.getElementById('filtroStatus');
const dashboardMsg = document.getElementById('dashboardMsg');
const tbody = document.getElementById('inscricoesTbody');

function getToken() {
  // sessionStorage: some ao fechar a aba — evita sessão aberta esquecida num computador compartilhado.
  return sessionStorage.getItem(TOKEN_KEY);
}
function setToken(token) {
  sessionStorage.setItem(TOKEN_KEY, token);
}
function clearToken() {
  sessionStorage.removeItem(TOKEN_KEY);
}

function mostrarDashboard(nome) {
  loginSection.classList.add('hidden');
  dashboardSection.classList.remove('hidden');
  userInfo.classList.remove('hidden');
  userNomeEl.textContent = nome ? `Olá, ${nome}` : '';
}

function mostrarLogin() {
  dashboardSection.classList.add('hidden');
  loginSection.classList.remove('hidden');
  userInfo.classList.add('hidden');
}

async function apiFetch(path, options = {}) {
  const token = getToken();
  const res = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
  });

  if (res.status === 401) {
    clearToken();
    mostrarLogin();
    throw new Error('Sessão expirada. Faça login novamente.');
  }

  const body = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(body.erro || 'Erro ao comunicar com a API.');
  return body;
}

function formatarData(iso) {
  return new Date(iso).toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' });
}

async function carregarInscricoes() {
  dashboardMsg.textContent = 'Carregando...';
  dashboardMsg.className = 'inscricao-msg';
  tbody.innerHTML = '';

  try {
    const query = filtroStatus.value ? `?status=${encodeURIComponent(filtroStatus.value)}` : '';
    const { inscricoes } = await apiFetch(`/api/inscricoes${query}`);

    if (!inscricoes.length) {
      dashboardMsg.textContent = 'Nenhuma inscrição encontrada.';
      return;
    }

    dashboardMsg.textContent = '';
    inscricoes.forEach((i) => tbody.appendChild(criarLinha(i)));
  } catch (err) {
    dashboardMsg.textContent = err.message;
    dashboardMsg.classList.add('error');
  }
}

function criarLinha(inscricao) {
  const tr = document.createElement('tr');

  const statusOptions = ['pendente', 'contatado', 'matriculado', 'descartado']
    .map((s) => `<option value="${s}" ${s === inscricao.status ? 'selected' : ''}>${s}</option>`)
    .join('');

  tr.innerHTML = `
    <td>${escapeHtml(inscricao.nome_crianca)}</td>
    <td>${inscricao.idade}</td>
    <td>${escapeHtml(inscricao.nome_responsavel)}</td>
    <td><a href="https://wa.me/55${inscricao.telefone_whatsapp.replace(/\D/g, '')}" target="_blank" rel="noopener" class="link-inline">${escapeHtml(inscricao.telefone_whatsapp)}</a></td>
    <td>${formatarData(inscricao.created_at)}</td>
    <td><select class="painel-status-select" data-status="${inscricao.status}" data-id="${inscricao.id}">${statusOptions}</select></td>
  `;

  const select = tr.querySelector('select');
  select.addEventListener('change', async (e) => {
    const novoStatus = e.target.value;
    try {
      await apiFetch(`/api/inscricoes/${inscricao.id}`, {
        method: 'PATCH',
        body: JSON.stringify({ status: novoStatus }),
      });
      select.dataset.status = novoStatus;
    } catch (err) {
      dashboardMsg.textContent = err.message;
      dashboardMsg.classList.add('error');
      e.target.value = inscricao.status; // reverte visualmente se falhar
    }
  });

  return tr;
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  loginMsg.textContent = '';
  loginMsg.className = 'inscricao-msg';
  loginSubmit.disabled = true;
  loginSubmit.textContent = 'Entrando...';

  try {
    const email = document.getElementById('loginEmail').value.trim();
    const senha = document.getElementById('loginSenha').value;

    const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, senha }),
    });
    const body = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(body.erro || 'Não foi possível entrar.');

    setToken(body.token);
    loginForm.reset();
    mostrarDashboard(body.colaborador.nome);
    carregarInscricoes();
  } catch (err) {
    loginMsg.textContent = err.message;
    loginMsg.classList.add('error');
  } finally {
    loginSubmit.disabled = false;
    loginSubmit.textContent = 'Entrar';
  }
});

logoutBtn.addEventListener('click', () => {
  clearToken();
  mostrarLogin();
});

filtroStatus.addEventListener('change', carregarInscricoes);

// ao carregar a página, tenta reaproveitar um token já salvo nesta aba
(async function init() {
  const token = getToken();
  if (!token) return;

  try {
    const { colaborador } = await apiFetch('/api/auth/me');
    mostrarDashboard(colaborador.nome);
    carregarInscricoes();
  } catch (err) {
    mostrarLogin();
  }
})();

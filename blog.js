let currentQ = 0;
const total = 5;

function updateDots() {
  document.querySelectorAll('.quiz-dot').forEach((d,i) => d.classList.toggle('active', i <= currentQ));
}

function changeQ(dir) {
  const qs = document.querySelectorAll('.quiz-question');
  if (qs.length === 0) return;

  // Se estiver avançando (dir > 0), verifica se uma opção foi selecionada
  if (dir > 0) {
    const checked = document.querySelector(`input[name="q${currentQ}"]:checked`);
    if (!checked) {
      alert("Por favor, selecione uma opção para continuar.");
      return;
    }
  }

  qs[currentQ].classList.remove('active');
  currentQ += dir;
  if (currentQ < 0) { currentQ = 0; qs[0].classList.add('active'); return; }
  if (currentQ >= total) { showResult(); return; }
  qs[currentQ].classList.add('active');
  updateDots();
  const prevBtn = document.getElementById('prevBtn');
  if (prevBtn) prevBtn.style.display = currentQ > 0 ? 'inline-block' : 'none';
  const nextBtn = document.getElementById('nextBtn');
  if (nextBtn) nextBtn.textContent = currentQ === total - 1 ? 'Ver Resultado →' : 'Próxima →';
}

function showResult() {
  let score = 0;
  for (let i = 0; i < total; i++) {
    const c = document.querySelector(`input[name="q${i}"]:checked`);
    if (c) score += parseInt(c.value);
  }
  const pct = Math.round((score / (total * 2)) * 100);
  let title = '', text = '';
  
  // Use passed data from HTML
  if (typeof quizResultsData !== 'undefined') {
    for (let r of quizResultsData) {
      if (pct >= r.minPct) {
        title = r.title;
        text = r.text;
        break;
      }
    }
  }

  document.getElementById('resultTitle').textContent = title;
  document.getElementById('resultText').textContent = text;
  document.getElementById('quizResult').classList.add('show');
  document.getElementById('nextBtn').style.display = 'none';
  document.getElementById('prevBtn').style.display = 'none';
}

function toggleFaq(el) {
  el.parentElement.classList.toggle('open');
}

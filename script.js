document.getElementById('scannerForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const url = document.getElementById('urlInput').value;
  const resultList = document.getElementById('resultList');
  const results = document.getElementById('results');

  resultList.innerHTML = '';
  results.classList.remove('hidden');

  // Basic checks
  addResult("Checking for privacy policy...", "warn");

  try {
    const res = await fetch(url + '/privacy', { method: 'HEAD' });
    if (res.ok) {
      addResult("Privacy policy found at /privacy", "good");
    } else {
      addResult("No /privacy page found", "bad");
    }
  } catch {
    addResult("Unable to check /privacy page (CORS blocked)", "warn");
  }

  // Load iframe for client-side scan
  const iframe = document.createElement('iframe');
  iframe.style.display = 'none';
  iframe.src = url;

  iframe.onload = () => {
    try {
      const doc = iframe.contentDocument || iframe.contentWindow.document;
      const html = doc.body.innerText.toLowerCase();

      if (html.includes("gdpr") || html.includes("ccpa")) {
        addResult("Mentions GDPR or CCPA", "good");
      } else {
        addResult("No mention of GDPR or CCPA on homepage", "bad")

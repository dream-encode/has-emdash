import './style.css'

document.querySelector('#app').innerHTML = `
  <div class="container">
    <header class="header">
      <div class="logo-container">
        <img src="/logo.svg" alt="The Em Dash Oracle Logo" class="logo" />
        <h1 class="title">The Em Dash Oracle</h1>
      </div>
      <p class="subtitle">A Sophisticated Tool for AI Content Detection Through Punctuation Divination</p>
    </header>

    <main class="main">
      <div class="input-section">
        <label for="url-input" class="input-label">Enter URL for Analysis:</label>
        <div class="input-group">
          <input
            type="url"
            id="url-input"
            class="url-input"
            placeholder="https://example.com/article"
            required
          />
          <button id="analyze-btn" class="analyze-btn">Divine</button>
        </div>
      </div>

      <div id="loading" class="loading hidden">
        <div class="loading-spinner"></div>
        <p>Consulting the punctuation spirits...</p>
      </div>

      <div id="results" class="results hidden">
        <div class="result-card">
          <h2 id="result-title" class="result-title"></h2>
          <p id="result-description" class="result-description"></p>
          <div id="result-details" class="result-details"></div>
        </div>
      </div>
    </main>

    <footer class="footer">
      <p>Based on the scientifically proven correlation between em dashes and artificial intelligence.</p>
      <p class="disclaimer">*Results may vary. Not responsible for existential crises caused by punctuation analysis.</p>
    </footer>
  </div>
`

// Setup event listeners
const urlInput = document.querySelector('#url-input')
const analyzeBtn = document.querySelector('#analyze-btn')
const loading = document.querySelector('#loading')
const results = document.querySelector('#results')
const resultTitle = document.querySelector('#result-title')
const resultDescription = document.querySelector('#result-description')
const resultDetails = document.querySelector('#result-details')

analyzeBtn.addEventListener('click', analyzeUrl)
urlInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    analyzeUrl()
  }
})

async function analyzeUrl() {
  const url = urlInput.value.trim()

  if (!url) {
    alert('Please enter a URL to analyze.')
    return
  }

  if (!isValidUrl(url)) {
    alert('Please enter a valid URL.')
    return
  }

  showLoading()

  try {
    const content = await fetchPageContent(url)
    const analysis = analyzeContent(content)
    showResults(analysis, url)
  } catch (error) {
    showError(error.message)
  }
}

function isValidUrl(string) {
  try {
    new URL(string)
    return true
  } catch (_) {
    return false
  }
}

async function fetchPageContent(url) {
  // Since we can't directly fetch from other domains due to CORS,
  // we'll simulate the analysis for demo purposes
  // In a real implementation, you'd need a backend proxy

  await new Promise(resolve => setTimeout(resolve, 2000)) // Simulate loading

  // For demo purposes, we'll generate some sample content
  const sampleTexts = [
    "This is a sample article with an em dash — it's quite sophisticated.",
    "Here we have another example — with multiple em dashes — showing clear AI patterns.",
    "This text has no em dashes at all. It uses regular hyphens and commas instead.",
    "A simple article without any fancy punctuation marks or sophisticated writing.",
    "The weather today is nice — though it might rain later — according to forecasts.",
    "Simple text with basic punctuation. No fancy dashes here."
  ]

  return sampleTexts[Math.floor(Math.random() * sampleTexts.length)]
}

function analyzeContent(content) {
  const emDashCount = (content.match(/—/g) || []).length
  const hasEmDash = emDashCount > 0

  return {
    hasEmDash,
    emDashCount,
    content: content.substring(0, 200) + (content.length > 200 ? '...' : ''),
    aiProbability: hasEmDash ? 100 : 0
  }
}

function showLoading() {
  results.classList.add('hidden')
  loading.classList.remove('hidden')
  analyzeBtn.disabled = true
}

function showResults(analysis, url) {
  loading.classList.add('hidden')
  results.classList.remove('hidden')
  analyzeBtn.disabled = false

  if (analysis.hasEmDash) {
    resultTitle.textContent = 'Probability of AI-Generated Content: 100%'
    resultTitle.className = 'result-title ai-detected'
    resultDescription.innerHTML = `
      <strong>Verdict:</strong> Highly suspicious! This content contains ${analysis.emDashCount} em dash${analysis.emDashCount > 1 ? 'es' : ''},
      a telltale sign of artificial intelligence attempting to appear sophisticated.
    `
    resultDetails.innerHTML = `
      <div class="analysis-details">
        <h3>Detailed Analysis:</h3>
        <ul>
          <li>Em dashes detected: ${analysis.emDashCount}</li>
          <li>Sophistication level: Artificially elevated</li>
          <li>Human probability: Negligible</li>
          <li>Recommendation: Approach with skepticism</li>
        </ul>
        <p class="sample-text"><strong>Sample text:</strong> "${analysis.content}"</p>
      </div>
    `
  } else {
    resultTitle.textContent = 'Probability of AI-Generated Content: 0%'
    resultTitle.className = 'result-title human-detected'
    resultDescription.innerHTML = `
      <strong>Verdict:</strong> Refreshingly human! No em dashes detected.
      This content appears to be written by a genuine human being with normal punctuation habits.
    `
    resultDetails.innerHTML = `
      <div class="analysis-details">
        <h3>Detailed Analysis:</h3>
        <ul>
          <li>Em dashes detected: 0</li>
          <li>Sophistication level: Appropriately modest</li>
          <li>Human probability: Extremely high</li>
          <li>Recommendation: Safe to read without existential dread</li>
        </ul>
        <p class="sample-text"><strong>Sample text:</strong> "${analysis.content}"</p>
      </div>
    `
  }
}

function showError(message) {
  loading.classList.add('hidden')
  results.classList.remove('hidden')
  analyzeBtn.disabled = false

  resultTitle.textContent = 'Analysis Failed'
  resultTitle.className = 'result-title error'
  resultDescription.textContent = `Error: ${message}`
  resultDetails.innerHTML = `
    <p>The punctuation spirits are currently unavailable. Please try again later.</p>
  `
}

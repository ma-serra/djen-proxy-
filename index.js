const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

module.exports = async (req, res) => {
  try {
    const { query } = req;
    const searchParams = new URLSearchParams(query).toString();
    const apiUrl = `https://comunicaapi.pje.jus.br/api/v1/comunicacao?${searchParams}`;

    const response = await fetch(apiUrl, {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
      }
    });

    const data = await response.text();

    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(response.status).send(data);
  } catch (error) {
    res.status(500).json({ erro: 'Falha no proxy', detalhe: error.message });
  }
};

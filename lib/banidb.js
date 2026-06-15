const BASE_URL = 'https://api.banidb.com/v2';

async function fetchJSON(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}

export function getSources() {
  return fetchJSON(`${BASE_URL}/sources`);
}

export function getBanis() {
  return fetchJSON(`${BASE_URL}/banis`);
}

export function getBani(baniId, length) {
  let url = `${BASE_URL}/banis/${baniId}`;
  if (length) url += `?length=${length}`;
  return fetchJSON(url);
}

export function getAng(sourceId, pageNo) {
  return fetchJSON(`${BASE_URL}/angs/${pageNo}/${sourceId}`);
}

export function getShabad(shabadId) {
  return fetchJSON(`${BASE_URL}/shabads/${shabadId}`);
}

export function searchShabads(query, params = {}) {
  const sp = new URLSearchParams();
  if (params.source) sp.set('source', params.source);
  if (params.searchtype !== undefined) sp.set('searchtype', params.searchtype);
  if (params.writer) sp.set('writer', params.writer);
  if (params.raag) sp.set('raag', params.raag);
  if (params.ang) sp.set('ang', params.ang);
  if (params.page) sp.set('page', params.page);
  if (params.results) sp.set('results', params.results);
  const qs = sp.toString();
  return fetchJSON(`${BASE_URL}/search/${encodeURIComponent(query)}${qs ? '?' + qs : ''}`);
}

export function getWriters() {
  return fetchJSON(`${BASE_URL}/writers`);
}

export function getRaags() {
  return fetchJSON(`${BASE_URL}/raags`);
}

export function getRandom(sourceId) {
  let url = `${BASE_URL}/random`;
  if (sourceId) url += `/${sourceId}`;
  return fetchJSON(url);
}

(() => {
  const records = [...window.DIFFRACT_CVE_RECORDS].sort((a, b) => b.id.localeCompare(a.id, undefined, { numeric: true }));
  const form = document.querySelector('.cve-filters');
  const query = document.getElementById('cve-query');
  const vendor = document.getElementById('cve-vendor');
  const year = document.getElementById('cve-year');
  const rows = document.getElementById('cve-rows');
  const count = document.getElementById('cve-count');
  const empty = document.getElementById('cve-empty');
  const table = document.querySelector('.cve-table-wrap');
  const pagination = document.getElementById('cve-pagination');
  const previous = document.getElementById('cve-prev');
  const next = document.getElementById('cve-next');
  const size = 25;
  let page = 1;

  const appendOptions = (select, values) => {
    values.forEach(value => select.add(new Option(value, value)));
  };
  appendOptions(vendor, [...new Set(records.map(record => record.vendor))].sort());
  appendOptions(year, [...new Set(records.map(record => record.year))].sort().reverse());
  const element = (tag, text) => {
    const node = document.createElement(tag);
    node.textContent = text;
    return node;
  };
  const makeRow = record => {
    const row = document.createElement('tr');
    const finding = document.createElement('td');
    finding.append(element('strong', record.id), element('span', record.title), element('small', record.type));
    const product = document.createElement('td');
    product.append(element('strong', record.vendor), element('span', record.component));
    const cveYear = document.createElement('td');
    cveYear.append(element('span', record.year));
    const reference = document.createElement('td');
    const link = element('a', 'Advisory ↗');
    const url = new URL(record.advisory);
    if (url.protocol === 'https:') link.href = url.href;
    link.target = '_blank';
    link.rel = 'noreferrer';
    link.setAttribute('aria-label', `Official advisory for ${record.id}`);
    reference.append(link);
    row.append(finding, product, cveYear, reference);
    return row;
  };
  const render = () => {
    const terms = query.value.toLocaleLowerCase().trim().split(/\s+/).filter(Boolean);
    const filtered = records.filter(record => {
      const text = `${record.id} ${record.title} ${record.vendor} ${record.component} ${record.type}`.toLocaleLowerCase();
      return (!vendor.value || record.vendor === vendor.value) && (!year.value || record.year === year.value) && terms.every(term => text.includes(term));
    });
    const pages = Math.max(1, Math.ceil(filtered.length / size));
    page = Math.min(page, pages);
    rows.replaceChildren(...filtered.slice((page - 1) * size, page * size).map(makeRow));
    const active = terms.length || vendor.value || year.value;
    count.textContent = active ? `${filtered.length} of ${records.length} listed records` : `${records.length} CVE records listed`;
    empty.hidden = filtered.length > 0;
    table.hidden = filtered.length === 0;
    pagination.hidden = pages <= 1;
    previous.disabled = page === 1;
    next.disabled = page === pages;
    document.getElementById('cve-page').textContent = `${page} / ${pages}`;
  };
  form.addEventListener('submit', event => event.preventDefault());
  form.addEventListener('input', () => { page = 1; render(); });
  form.addEventListener('change', () => { page = 1; render(); });
  form.addEventListener('reset', () => {
    query.value = ''; vendor.value = ''; year.value = ''; page = 1; render();
  });
  document.getElementById('cve-clear').addEventListener('click', () => { form.reset(); query.focus(); });
  previous.addEventListener('click', () => { page--; render(); });
  next.addEventListener('click', () => { page++; render(); });
  render();
})();

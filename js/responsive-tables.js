const className = 'responsive-table';

Array.from(document.querySelectorAll('table'))
  // @ts-ignore
  .filter(table => !table.parentNode?.classList?.contains(className))
  .map(table => {
    const wrapper = document.createElement('div');

    wrapper.classList.add(className);

    table.parentNode?.insertBefore(wrapper, table);

    wrapper.appendChild(table);
  });

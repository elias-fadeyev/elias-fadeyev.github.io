export default class Result {
  constructor(name, level) {
    this.name = name;
    this.level = level;

    this.score = {
      'name': this.name,
      'level': this.level
    }
  }

  render() {
    this.table = this.createElement('table', 'result-table');

    this.wrapper = this.createElement('div', 'result-wrapper');

    const headRow = this.createElement('tr', 'result-heading');
    headRow.insertCell(0).innerHTML = 'Место';
    headRow.insertCell(1).innerHTML = 'Имя';
    headRow.insertCell(2).innerHTML = 'Уровень';

    this.table.appendChild(headRow);

    this.results.forEach((result, index) => {
      const row = this.createElement('tr', 'result-row');
      const rank = index + 1;

      if (result === this.score) {
        row.classList.add('current-score');
      }

      row.insertCell(0).innerHTML = rank;
      row.insertCell(1).innerHTML = result.name;
      row.insertCell(2).innerHTML = result.level;

      this.table.appendChild(row);
    });

    this.wrapper.appendChild(this.table);
    document.body.appendChild(this.wrapper);
  }

  createElement(tag, className, text) {
    const elem = document.createElement(tag);
    elem.classList.add(className);
    if (text) {
      elem.innerHTML = text;
    }
    return elem;
  }

  remove() {
    this.wrapper.remove();
  }

  init() {
    this.results = JSON.parse(window.localStorage.getItem('results'));

    if (!this.results) {
      this.results = [];
    }

    this.results.push(this.score);
    this.results.sort((a, b) => b.level - a.level);
    this.results.splice(10);

    window.localStorage.setItem('results', JSON.stringify(this.results));

    this.render();
  }
}
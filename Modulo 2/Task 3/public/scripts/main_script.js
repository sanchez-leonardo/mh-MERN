var members = data.results[0].members;

//--------------------------------------------------------------------------
//Páginas principales de cada cámara

//Carga de datos a la tabla principal
//Si existe la tabla contenedora
if (document.getElementById('mainTable')) {
  addMembers(members, 'mainTable');
}

//Agrega un miembro a la tabla
function addMembers(array, table) {
  array.forEach(member => {
    let tableBody = document.getElementById(table);

    let memberRow = document.createElement('tr');

    let cells = [];

    let nameCell = document.createElement('td');
    nameCell.innerHTML = `<a href=${member.url}> ${
      member.first_name
    } ${member.middle_name || ''} ${member.last_name}</a>`;
    cells.push(nameCell);

    let partyCell = document.createElement('td');
    partyCell.innerText = member.party;
    cells.push(partyCell);

    let seniorityCell = document.createElement('td');
    seniorityCell.innerText = member.seniority;
    cells.push(seniorityCell);

    let votesCell = document.createElement('td');
    votesCell.innerText = member.total_votes;
    cells.push(votesCell);

    let engagementCell = document.createElement('td');
    engagementCell.innerHTML = member.votes_with_party_pct + '	&#37;';
    cells.push(engagementCell);

    memberRow.append(...cells);

    tableBody.appendChild(memberRow);
  });
}

//--------------------------------------------------------------------------
//Páginas de lealtad y presentismo de cada cámara
//Solo se crea el objeto si la página es de lealtad o presentismo
var statistics;

if (
  document.title.includes('Attendance') ||
  document.title.includes('Loyalty')
) {
  statistics = {
    democrats: membersByParty(members, 'D'),
    republicans: membersByParty(members, 'R'),
    independents: membersByParty(members, 'I'),
    firstGlance: [
      firstGlanceByParty(membersByParty(members, 'D'), 'Democrats'),
      firstGlanceByParty(membersByParty(members, 'R'), 'Republicans'),
      firstGlanceByParty(membersByParty(members, 'I'), 'Independents'),
      firstGlanceByParty(members, 'Total')
    ],
    leastLoyal: getThe(members, 'least', 'loyal'),
    mostLoyal: getThe(members, 'most', 'loyal'),
    leastEngaged: getThe(members, 'least', 'engagement'),
    mostEngaged: getThe(members, 'most', 'engagement')
  };

  firstGlanceTable(statistics.firstGlance);

  if (document.title.includes('Attendance')) {
    statisticsTables(statistics.leastEngaged, 'leastEngaged');
    statisticsTables(statistics.mostEngaged, 'mostEngaged');
  }

  if (document.title.includes('Loyalty')) {
    statisticsTables(statistics.leastLoyal, 'leastLoyal');
    statisticsTables(statistics.mostLoyal, 'mostLoyal');
  }
}

//Crea los objetos para el array de first glance
function firstGlanceByParty(array, party) {
  return Object.fromEntries([
    ['party', party],
    ['representatives', array.length],
    [
      'partyVotes',
      percentageOfSomething(array, 'votes_with_party_pct').toFixed(2)
    ]
  ]);
}

//Separa los distintos partidos
function membersByParty(array, party) {
  return array.filter(member => member.party == party);
}

//Saca el porcentaje de un atributo determinado
function percentageOfSomething(array, attribute) {
  return array.reduce((acc, el) => acc + el[attribute], 0) / array.length || 0;
}

//Consigue un array del 10% de lo que se seleccione por parámetro
function getThe(array, order, quality) {
  switch (quality) {
    case 'loyal':
      if (order == 'least') {
        return array
          .sort((a, b) => a.votes_with_party_pct - b.votes_with_party_pct)
          .slice(0, array.length * 0.1);
      } else if (order == 'most') {
        return array
          .sort((a, b) => b.votes_with_party_pct - a.votes_with_party_pct)
          .slice(0, array.length * 0.1);
      }

    case 'engagement':
      if (order == 'least') {
        return array
          .sort((a, b) => b.missed_votes_pct - a.missed_votes_pct)
          .slice(0, array.length * 0.1);
      } else if (order == 'most') {
        return array
          .sort((a, b) => a.missed_votes_pct - b.missed_votes_pct)
          .slice(0, array.length * 0.1);
      }

    default:
      console.log('Wrong Parameters');
      break;
  }
}

//Función creadora de First glance
function firstGlanceTable(array) {
  let tbody = document.getElementById('firstGlanceTable');

  array.forEach(element => {
    let row = document.createElement('tr');

    let partyCell = document.createElement('td');
    partyCell.innerText = element.party;

    let repsCell = document.createElement('td');
    repsCell.innerText = element.representatives;

    let partyVotesCell = document.createElement('td');
    partyVotesCell.innerHTML = element.partyVotes + '	&#37;';

    row.append(...[partyCell, repsCell, partyVotesCell]);

    tbody.appendChild(row);
  });
}

//Función única de creación de tablas de estadísticas
function statisticsTables(array, table) {
  let tbody = document.getElementById(table + 'Table');

  array.forEach(member => {
    let row = document.createElement('tr');
    let cells = [];

    let nameCell = document.createElement('td');
    nameCell.innerHTML = `<a href=${member.url}> ${
      member.first_name
    } ${member.middle_name || ''} ${member.last_name}</a>`;
    cells.push(nameCell);

    let votesCell = document.createElement('td');
    let votesPctCell = document.createElement('td');

    switch (table) {
      case 'leastLoyal':
      case 'mostLoyal':
        votesCell.innerText = (
          (member.votes_with_party_pct * member.total_votes) / 100 || 0
        ).toFixed(0);
        cells.push(votesCell);

        votesPctCell.innerHTML = member.votes_with_party_pct + '	&#37;';
        cells.push(votesPctCell);

        break;

      case 'leastEngaged':
      case 'mostEngaged':
        votesCell.innerText = member.missed_votes;
        cells.push(votesCell);

        votesPctCell.innerHTML = member.missed_votes_pct + '	&#37;';
        cells.push(votesPctCell);

        break;

      default:
        console.log('Wrong values');
        break;
    }

    row.append(...cells);

    tbody.appendChild(row);
  });
}

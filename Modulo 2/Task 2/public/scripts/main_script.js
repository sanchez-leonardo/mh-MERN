data.results[0].members.forEach(member => addMember(member))

function addMember(member) {

  let tableBody = document.getElementById('mainTable')

  let memberRow = document.createElement('tr')

  let nameCell = document.createElement('td')
  nameCell.innerHTML = `<a href=${member.url}> ${member.first_name} ${member.middle_name || ''} ${member.last_name}</a>`

  let partyCell = document.createElement('td')
  partyCell.innerText = member.party

  let seniorityCell = document.createElement('td')
  seniorityCell.innerText = member.seniority

  let votesCell = document.createElement('td')
  votesCell.innerText = member.total_votes

  let engagementCell = document.createElement('td')
  engagementCell.innerHTML = member.votes_with_party_pct + '	&#37;'

  memberRow.append(...[nameCell, partyCell, seniorityCell, votesCell, engagementCell])

  tableBody.appendChild(memberRow)
}
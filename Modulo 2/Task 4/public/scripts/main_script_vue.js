const vueApp = new Vue({
  el: '#vueApp',

  data: {
    url: document.title.includes('Senate')
      ? 'https://api.propublica.org/congress/v1/113/senate/members.json'
      : 'https://api.propublica.org/congress/v1/113/house/members.json',

    init: {
      method: 'GET',
      headers: {
        'x-api-key': 'N4twLSHqhiMcbcmomYSqtLX4W70Ue4Gwia7u6919'
      }
    },

    members: []
  },

  computed: {
    statistics() {
      if (
        document.title.includes('Attendance') ||
        document.title.includes('Loyalty')
      ) {
        return {
          democrats: this.membersByParty(this.members, 'D'),
          republicans: this.membersByParty(this.members, 'R'),
          independents: this.membersByParty(this.members, 'I'),
          firstGlance: [
            this.firstGlanceByParty(
              this.membersByParty(this.members, 'D'),
              'Democrats'
            ),
            this.firstGlanceByParty(
              this.membersByParty(this.members, 'R'),
              'Republicans'
            ),
            this.firstGlanceByParty(
              this.membersByParty(this.members, 'I'),
              'Independents'
            ),
            this.firstGlanceByParty(this.members, 'Total')
          ],
          leastLoyal: this.getThe(this.members, 'least', 'loyal'),
          mostLoyal: this.getThe(this.members, 'most', 'loyal'),
          leastEngaged: this.getThe(this.members, 'least', 'engagement'),
          mostEngaged: this.getThe(this.members, 'most', 'engagement')
        };
      }
    }
  },

  methods: {
    membersByParty(array, party) {
      return array.filter(member => member.party == party);
    },

    percentageOfSomething(array, attribute) {
      return (
        array.reduce((acc, el) => acc + el[attribute], 0) / array.length || 0
      );
    },

    firstGlanceByParty(array, party) {
      return Object.fromEntries([
        ['party', party],
        ['representatives', array.length],
        [
          'partyVotes',
          this.percentageOfSomething(array, 'votes_with_party_pct').toFixed(2)
        ]
      ]);
    },

    getThe(array, order, quality) {
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
  },

  created() {
    fetch(this.url, this.init)
      .then(response => response.json())
      .then(obj => (this.members = obj.results[0].members));
  }
});

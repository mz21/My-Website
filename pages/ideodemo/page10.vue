<template lang="jade">
.container
  .left
    .block
      h1.title {{ title }}
      h4 {{ tagline }}
      h2 {{ context }}
      .next-section
        .next-button(@click="nextpage")
          p Next
  .right
    svg(id="chart" width="800", height="500" fill)
</template>
<script>
import * as d3 from 'd3'
import gunData from './ideodata.csv'
export default {
  mounted: function() {
    let chart = d3.select("#chart")
    let margin = {top: 20, right: 20, bottom: 20, left: 20}
    let width = chart.attr("width") - margin.left - margin.right
    let height = chart.attr("height") - margin.top - margin.bottom
    let x = d3.scaleLinear()
    .domain([0, 500])
    .range([margin.left, width]);
    this.xAxis = x
    let y = d3.scaleLinear()
    .domain([0, 100])
    .range([0, height]);

    d3.csv(gunData, (error, data) => {
      function weaponIsGun(weapon) {
        if(parseInt(weapon) >= 11 && parseInt(weapon) <= 15) {
          return true
        }
        return false
      }
      let sortedData = data.slice(0,500).sort(function(larger, smaller) {
        if(larger['Sex of Offender'] === 'F' && smaller['Sex of Offender'] === 'M') {
          return 1
        }
        else if(larger['Sex of Offender'] === 'M' && smaller['Sex of Offender'] === 'F') {
          return -1
        }
        if(larger['Relationship of Victim to Offender'] === 'UN' && smaller['Relationship of Victim to Offender'] !== 'UN') {
          return 1
        }
        else if(larger['Relationship of Victim to Offender'] !== 'UN' && smaller['Relationship of Victim to Offender'] === 'UN') {
          return -1
        }
        // if(weaponIsGun(larger['Weapon used by Offender']) && !weaponIsGun(smaller['Weapon used by Offender'])) {
        //   return -1
        // }
        // else if(!weaponIsGun(larger['Weapon used by Offender']) && weaponIsGun(smaller['Weapon used by Offender'])) {
        //   return 1
        // }
        // if(larger['Relationship of Victim to Offender'] === 'DA' && smaller['Relationship of Victim to Offender'] !== 'DA') {
        //   return -1
        // }
        // else if(larger['Relationship of Victim to Offender'] !== 'DA' && smaller['Relationship of Victim to Offender'] === 'DA') {
        //   return 1
        // }
        return parseInt(larger['name']) - parseInt(smaller['name'])
      })
      this.deathData = sortedData
      chart.selectAll("death").data(sortedData, function(d) { return d.name; }).enter()
      .append("line")
      .attr("class", "death")
      .attr("x1", function(d, i) { return x(i) })
      .attr("x2", function(d, i) { return x(i) })
      .style("stroke", "rgb(215,221,228)")
      .style("stroke-width", "0.7px")
      .attr("y1", function(d) { return margin.top; })
      .attr("y2", function(d) { return margin.top + y(d['Age of Victim']); })

      let xAxis = d3.axisTop(x)
      let yAxis = d3.axisRight(y)
      .tickSize(width)
      .tickFormat(function(d, i) {
        if (i === 0 || i === 5) {
          return ''
        }
        if (i === 1) {
          return d + ' years old'
        }
        return d
      });

      let customY = (g) => {
        g.call(yAxis.ticks(5))
        .select(".domain").remove()
        g.selectAll(".tick line").attr("stroke", "rgb(200,200,200)").attr("stroke-width", "0.6")
        g.selectAll(".tick:last-of-type line").attr("stroke-width", "0")
        g.selectAll(".tick text").attr("x", 400).attr("dy", -6).attr('text-anchor', 'middle').attr('font-family', 'nyt-franklin').attr('font-size', '12px')
      }
      let customX = (g) => {
        g.call(xAxis.tickFormat((d) => '').tickSize(0))
        .select(".domain").remove()
      }

      let g = chart.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
      g.append("g").call(customX)
      g.append("g").call(customY)
    })
  },
  updated: function () {
    let animationSpeed = 10
    if(this.index === 1) {
      d3.selectAll(".death")
      .transition()
      .duration(600)
      .filter(function(d) { return d['Sex of Offender'] === 'M' })
      .style("stroke", "rgb(237, 215, 215)")
    }
    if(this.index === 2) {
      d3.selectAll(".death")
      .transition()
      .duration(600)
      .filter(function(d) { return d['Relationship of Victim to Offender'] !== 'UN' && d['Sex of Offender'] === 'M' })
      .style("stroke", "rgb(212, 180, 180)")
    }
    if(this.index === 3) {
      d3.selectAll(".death")
      .transition()
      .delay(function(d, i) {
        return i * animationSpeed
      })
      .duration(function(d, i) {
        return 50;
      })
      .filter(function(d) { return parseInt(d['Weapon used by Offender']) >= 11 && parseInt(d['Weapon used by Offender']) <= 15 && d['Relationship of Victim to Offender'] !== 'UN' && d['Sex of Offender'] === 'M' })
      .style("stroke", "rgb(168, 80, 80)")

      let gunData = this.deathData.map((d, i) => {
        d.id = i
        return d
      })
      gunData = gunData.filter(function(d) { return parseInt(d['Weapon used by Offender']) >= 11 && parseInt(d['Weapon used by Offender']) <= 15 && d['Relationship of Victim to Offender'] !== 'UN' && d['Sex of Offender'] === 'M' })
      let gunDeaths = d3.select("#chart").selectAll("gundeath")
      gunDeaths.data(gunData).enter()
      .append("circle")
      .attr("class", "gundeath")
      .attr("r", 0)
      .attr("cx", (d) => {
        return this.xAxis(d.id)
      })
      .attr("cy", 20)
      .attr("fill", "rgb(215, 215, 215)")

      d3.selectAll(".gundeath")
      .transition()
      .delay(function(d) {
        return d.id * animationSpeed
      })
      .duration(function(d) {
        return animationSpeed;
      })
      .attr("r", function() {
        return Math.random() * 20
      })
      .attr("fill", "rgba(163, 32, 32, 0.1)")
      .transition()
      .duration(animationSpeed)
      .attr('r', 0)
      .attr("fill", "rgba(221, 193, 193, 0.1)")
    }
    if(this.index === 4) {
      let newWidth = 2.3
      this.deathData = this.deathData.filter((d) => {
        return parseInt(d['Weapon used by Offender']) >= 11 && parseInt(d['Weapon used by Offender']) <= 15 && d['Relationship of Victim to Offender'] !== 'UN' && d['Sex of Offender'] === 'M'
      })
      this.deathData = this.deathData.sort((larger, smaller) => {
        if(!intimate(larger) && intimate(smaller)) {
          return 1
        }
        else if(intimate(larger) && !intimate(smaller)) {
          return -1
        }
        return parseInt(larger['name']) - parseInt(smaller['name'])
      })
      this.deathData = this.deathData.map((d, i) => {
        d.id = i
        return d
      })
      console.log(this.deathData)
      d3.selectAll(".death").data(this.deathData, function(d) { return d.name; }).exit().remove()
      d3.selectAll(".death")
      .transition()
      .duration(500)
      .attr("stroke-width", newWidth + "px")
      .style("stroke", "rgb(220,220,220)")
      .attr("x1", (d, i) => { return this.xAxis(d.id * newWidth) })
      .attr("x2", (d, i) => { return this.xAxis(d.id * newWidth) })
    }
    if(this.index === 5) {
      d3.selectAll(".death")
      .filter(function(d) { return intimate(d) })
      .transition()
      .delay(400)
      .style("stroke", "rgb(205, 153, 153)")
    }
    if(this.index === 6) {
      d3.selectAll(".death")
      .filter(function(d, i) { if (d.id < 42) { return true } return false })
      .transition()
      .delay(400)
      .style("stroke", "rgb(50,50,50)")
    }
    if(this.index === 7) {
      d3.selectAll(".death")
      .filter(function(d, i) { if (d.id < 62) { return true } return false })
      .transition()
      .delay(400)
      .style("stroke", "rgb(50,50,50)")
    }
    if(this.index === 8) {
      d3.selectAll(".death")
      .filter(function(d, i) { if (d.id < 75) { return true } return false })
      .transition()
      .delay(400)
      .style("stroke", "rgb(50,50,50)")
    }
    function intimate(dataPoint) {
      if(dataPoint['Relationship of Victim to Offender'] == 'WI' || dataPoint['Relationship of Victim to Offender'] == 'CW' || dataPoint['Relationship of Victim to Offender'] == 'GF' || dataPoint['Relationship of Victim to Offender'] == 'XW') {
        return true
      }
      return false
    }
  },
  data: function () {
    return {
      pages: [
        {
          title: '1,850',
          tagline: 'Women Killed',
          context: 'Each line to the right represents the life of one woman or girl in America – a life that ended in 2015 in a murder. Almost all of them died at the hands of someone they knew, like a husband or close acquaintance.'
        },
        {
          title: '1,694',
          tagline: 'Women Killed by Men',
          context: '92% of these women and children were killed by men.'
        },
        {
          title: '1,601',
          tagline: 'Women Killed by Men They Knew',
          context: 'And overwhelmingly, at an 87 percent clip, women were killed by men they knew.'
        },
        {
          title: '800',
          tagline: 'Women Killed by Men They Knew with a Gun',
          context: 'Roughly half of these women were killed by a gun.'
        },
        {
          title: '800',
          tagline: 'Women Killed by Men They Knew with a Gun',
          context: 'Most of these deaths happen as a result of an escalation of domestic violence. In 1997, Congress passed the Lautenberg Amendment, which prevents individuals convicted of assaulting a spouse from owning a gun.'
        },
        {
          title: '532',
          tagline: 'Women Killed by an Intimate Partner with a Gun in 2015',
          context: 'The intent of the Lautenberg Amendment is to account for all of these homicides – that is, women killed by their partner. However, there are loopholes...'
        },
        {
          title: '28%',
          tagline: 'Homicides Committed by a Dating Partner v. Spouse in 1980',
          context: 'The biggest loophole is that the law only bars gun ownership if the two people are married or have a child together. It doesn\'t exclude boyfriend/girlfriend relationships. This was less of a problem back in 1980 when far more murders were committed by spouses than by dating partners.'
        },
        {
          title: '42%',
          tagline: 'Homicides Committed by a Dating Partner v. Spouse in 1997',
          context: 'But the American family is changing. In 1997 when the amendment was passed, 42 percent of homicides were commited by dating partners rather than spouses.'
        },
        {
          title: '51%',
          tagline: 'Homicides Committed by a Dating Partner v. Spouse in 2015',
          context: 'And in the most recent year of reported data, more homicides had been committed by a dating partner than a spouse, which the Lautenberg Amendment does not address.'
        },
      ],
      index: 0,
      deathData: null,
      xAxis: null
    }
  },
  computed: {
    title: function () {
      return this.pages[this.index].title
    },
    context: function () {
      return this.pages[this.index].context
    },
    tagline: function () {
      return this.pages[this.index].tagline
    }
  },
  methods: {
    nextpage: function () {
      if(this.index < this.pages.length - 1) {
        this.index++
      }
    }
  }
}
</script>
<style lang="sass" scoped>
@font-face
  font-family: "nyt-cheltenham"
  src: url("~@/assets/fonts/nyt-cheltenham-400-normal.woff") format('woff')
  font-weight: 400
@font-face
  font-family: "nyt-cheltenham"
  src: url("~@/assets/fonts/nyt-cheltenham-200-normal.woff") format('woff')
  font-weight: 300
@font-face
  font-family: "nyt-franklin"
  src: url("~@/assets/fonts/nyt-franklin-500-normal.woff") format('woff')
  font-weight: 400
@font-face
  font-family: "nyt-franklin"
  src: url("~@/assets/fonts/nyt-franklin-700-normal.woff") format('woff')
  font-weight: 600

.container
  display: flex
  width: 100%
  height: 100vh
  background: white
  border-top: 4px solid rgb(60,60,60)
.left, .right
  padding-top: 50px
.left
  width: 35%
.block
  width: 70%
  height: 500px
  margin: 0 12% 0 15%
  display: flex
  align-content: flex-end
  padding-bottom: 40px
  flex-wrap: wrap
  h1, h2, h4
    width: 100%
  h1.title
    font-family: 'nyt-cheltenham', 'Helvetica'
    font-size: 72px
    text-align: left
  h4
    font-family: 'nyt-cheltenham', 'Helvetica'
    margin-bottom: 36px
    font-weight: 400
  h2
    font-family: 'nyt-cheltenham', 'Helvetica'
    font-size: 18px
    line-height: 1.3
    font-weight: 400
    margin-bottom: 12px
  .next-section
    margin-top: 36px
    .next-button
      margin: 0 auto
      background: rgb(55, 115, 172)
      color: rgb(250,250,255)
      cursor: pointer
      &:hover
        background: rgba(55, 115, 172, 0.91)
      display: inline-block
      padding: 12px 18px
      border-radius: 3px
      p
        font-size: 14px
        font-weight: 600
        letter-spacing: 0.3px
        font-family: "nyt-franklin"
.right
  width: 65%
</style>

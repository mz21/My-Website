<template>
  <div class="container">
    <div id="content">
      <div class="content_description">
        <div class="nav_section_box">
          <div class="nav_sections">
            <div class="nav_circle" v-for="i in pages.length" :key="i" :class="i - 1 === currPage ? 'nav_circle_active' : ''"></div>
          </div>
        </div>
        <div class="description">
          <component v-bind:is="currentDescription">
          </component>
        </div>
      </div>
      <transition name="slide-fade">
        <transition-group name="ratings" tag="div" :class="['bookcase', currBookcase]" v-show="showThisYear">
            <template v-for="booksByGroup in booksByGroups">
              <h6 :key="booksByGroup.category + 'cat'" v-show="toShow" class="category">{{ categoryTitle(booksByGroup).toLowerCase() }}</h6>
              <h6 v-for="book in getBooks(booksByGroup.books)" :class="['book', classRatings(book.rating), classFriends(book.friend), classAmazon(book.amazon)]" :key="book.rank">
                {{ formatBookTitle(book) }}
              </h6>
            </template>
        </transition-group>
      </transition>
      <transition-group name="nextyear" tag="div" :class="['bookcase', 'bookcasenextyear']" v-show="!showThisYear">
        <div class="toreadlist_box" :key="'readlisttitle'">
          <h3 :class="['toreadlist', hideFictionNextYear ? 'hide' : '']">2018 To Read List</h3>
        </div>
        <template v-for="booksByGroup in booksNextYear">
          <h6 :key="booksByGroup.category + 'cat'" class="category" v-show="showFictionCategory(booksByGroup.category.toLowerCase())">{{ booksByGroup.category.toLowerCase() }}</h6>
          <h6 v-for="(book, index) in booksByGroup.books" v-show="showBook(booksByGroup.category.toLowerCase(), index)" :class="'book'" :key="book">
            {{ book }}
          </h6>
        </template>
      </transition-group>
      <div class="scroll_button_box">
        <div class="scroll_button" v-show="!toShow">
          <p>Navigate with</p>
          <p>up/down arrows</p>
          <img :src="downArrow" width="32px" height="auto"/>
        </div>
      </div>
    </div>
    <div class="is_mobile_box" v-show="isMobile">
      <div class="is_mobile">
        <p>Sorry, this visualization is best viewed on a desktop screen.</p>
      </div>
    </div>
  </div>
</template>

<script>
import downArrow from '@/assets/down-arrow.svg'
import booksData from '@/data/books.json'
import booksNextYear from '@/data/booksnextyear.json'
import SectionIntro from '@/components/yearofreading2017/SectionIntro'
import SectionRating from '@/components/yearofreading2017/SectionRating'
import SectionFriends from '@/components/yearofreading2017/SectionFriends'
import SectionAmazon from '@/components/yearofreading2017/SectionAmazon'
import SectionGenre from '@/components/yearofreading2017/SectionGenre'
import SectionGenreRating from '@/components/yearofreading2017/SectionGenreRating'
import SectionFiction from '@/components/yearofreading2017/SectionFiction'
import SectionFictionNextYear from '@/components/yearofreading2017/SectionFictionNextYear'
import SectionRestNextYear from '@/components/yearofreading2017/SectionRestNextYear'

export default {
  components: {
    SectionIntro,
    SectionRating,
    SectionFriends,
    SectionAmazon,
    SectionGenre,
    SectionGenreRating,
    SectionFiction,
    SectionFictionNextYear,
    SectionRestNextYear
  },
  layout: 'yearofreading',
  data () {
    return {
      booksByGroups: this.getBooksByGroup('alpha'),
      hideRatings: true,
      hideFriends: true,
      hideAmazon: true,
      hideFictionNextYear: true,
      hideRestNextYear: true,
      toShow: false,
      genreWithRating: false,
      currBookcase: 'bookcase0',
      showThisYear: true,
      showRank: false,
      booksNextYear: booksNextYear.toread,
      pages: [
        SectionIntro,
        SectionRating,
        SectionFriends,
        SectionAmazon,
        SectionGenre,
        SectionGenreRating,
        SectionFiction,
        SectionFictionNextYear,
        SectionRestNextYear
      ],
      currPage: 0,
      pagechangeLock: false,
      lastScrollTime: 0,
      downArrow,
      isMobile: false
    }
  },
  computed: {
    currentDescription: function () {
      return this.pages[this.currPage]
    }
  },
  mounted: function () {
    this.$nextTick(() => {
      let width = this.$el.clientWidth
      if (width < 800) {
        this.isMobile = true
      }
    })
    window.addEventListener('keydown', (e) => {
      if (e.keyCode === 40) {
        this.getNewPage('down')
      }
      if (e.keyCode === 38) {
        this.getNewPage('up')
      }
    })
    const scrollFunction = (e) => {
      if (Date.now() - this.lastScrollTime > 1200) {
        this.pagechangeLock = false
      }
      if (this.pagechangeLock) {
        return
      }
      let delta = e.deltaY
      const LOW_SCROLL_SENSITIVITY = 3
      if (delta > LOW_SCROLL_SENSITIVITY) {
        this.pagechangeLock = true
        this.lastScrollTime = Date.now()
        this.getNewPage('down')
      } else if (delta < -1 * LOW_SCROLL_SENSITIVITY) {
        this.pagechangeLock = true
        this.lastScrollTime = Date.now()
        this.getNewPage('up')
      }
    }
    window.addEventListener('wheel', scrollFunction)
  },
  methods: {
    getNewPage: function (direction) {
      if (direction === 'down' && this.currPage < this.pages.length - 1) {
        this.currPage++
      } else if (direction === 'up' && this.currPage > 0) {
        this.currPage--
      } else {
        return
      }
      switch (this.currPage) {
        case 0:
          this.showIntro()
          break
        case 1:
          this.showRatings()
          break
        case 2:
          this.showFriends()
          break
        case 3:
          this.showAmazon()
          break
        case 4:
          this.showGenres()
          break
        case 5:
          this.showGenreRatings()
          break
        case 6:
          this.showFictionOnly()
          break
        case 7:
          this.showFictionNextYear()
          break
        case 8:
          this.showRestNextYear()
          break
      }
    },
    formatBookTitle: function (book) {
      if (this.showRank) {
        return book.rank + '. ' + book.title
      }
      return book.title
    },
    showIntro: function () {
      this.hideRatings = true
      this.booksByGroups = this.getBooksByGroup('alpha')
      this.toShow = false
      this.showRank = false
    },
    showRatings: function () {
      this.hideRatings = false
      this.booksByGroups = this.getBooksByGroup('rating')
      this.toShow = true
      this.showRank = true
      this.currBookcase = 'bookcase1'
      this.hideFriends = true
    },
    showFriends: function () {
      this.hideFriends = false
      this.hideAmazon = true
    },
    showAmazon: function () {
      this.hideFriends = true
      this.hideAmazon = false
      this.booksByGroups = this.getBooksByGroup('rating')
      this.currBookcase = 'bookcase1'
      this.showRank = true
    },
    showGenres: function () {
      this.booksByGroups = this.getBooksByGroup('genre')
      this.hideFriends = true
      this.hideAmazon = true
      this.currBookcase = 'bookcase2'
      this.showRank = false
      this.genreWithRating = false
    },
    showGenreRatings: function () {
      this.genreWithRating = true
      this.showThisYear = true
    },
    showFictionOnly: function () {
      this.showThisYear = false
      this.hideFictionNextYear = true
    },
    showFictionNextYear: function () {
      this.hideFictionNextYear = false
      this.hideRestNextYear = true
    },
    showRestNextYear: function () {
      this.hideRestNextYear = false
    },
    classRatings: function (rating) {
      return this.hideRatings ? '' : 'rating-' + rating
    },
    classFriends: function (friend) {
      return !this.hideFriends && friend ? 'friends_highlight' : ''
    },
    classAmazon: function (amazon) {
      return !this.hideAmazon && amazon ? 'amazon_highlight' : ''
    },
    getBooksByGroup: function (type) {
      if (type === 'alpha') {
        let books = booksData.books
        books.sort((first, second) => {
          return first.title.toLowerCase().localeCompare(second.title.toLowerCase())
        })
        return [
          {
            category: '',
            books
          }
        ]
      }
      booksData.books.sort((first, second) => {
        return first.rank - second.rank
      })
      let booksByGroupDict = {}
      for (let i = 0; i < booksData.books.length; i++) {
        let book = booksData.books[i]
        if (book[type] in booksByGroupDict) {
          booksByGroupDict[book[type]].push(book)
        } else {
          booksByGroupDict[book[type]] = [book]
        }
      }

      let booksByGroup = Object.keys(booksByGroupDict).map((key) => {
        return {
          category: key,
          books: booksByGroupDict[key]
        }
      })
      booksByGroup.sort((first, second) => {
        if (first.category.toLowerCase() === 'grab bag') {
          return 1
        }
        if (second.category.toLowerCase() === 'grab bag') {
          return -1
        }
        return second.category - first.category
      })
      return booksByGroup
    },
    getBooks: function (books) {
      if (this.fictionOnly) {
        const fictionBooks = books.filter((book) => {
          return book.fiction
        })
        return fictionBooks
      }
      return books
    },
    categoryTitle: function (group) {
      if (this.genreWithRating) {
        let rating = 0.0
        for (let i = 0; i < group.books.length; i++) {
          rating += group.books[i].rating
        }
        rating = rating / group.books.length
        return group.category + ` (${rating.toFixed(1)})`
      }
      if (group.category === '2' || group.category === '3' || group.category === '4' || group.category === '5') {
        return group.category + ' stars'
      }
      if (group.category === '1') {
        return group.category + ' star'
      }
      return group.category
    },
    showFictionCategory: function (category) {
      if (category === 'fiction') {
        return true
      }
      if (this.hideRestNextYear) {
        return false
      }
      return true
    },
    showBook: function (category, index) {
      if (this.hideFictionNextYear) {
        if (category === 'fiction') {
          if (index === 0 || index === 1) {
            return true
          }
        }
        return false
      }
      if (category === 'fiction') {
        if (index === 0 || index === 1) {
          return false
        }
      }
      if (this.hideRestNextYear) {
        if (category !== 'fiction') {
          return false
        }
      }
      return true
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
.container
  height: 100%
  width: 100%
  max-width: 1500px
  margin: 0 auto
  display: block
  overflow: hidden
  position: absolute
#content
  height: 100%
  width: 100%
  margin: 0 auto
  background: rgb(250,250,251)
#nav
  height: 100%
  width: 14%
  float: left
  padding-top: 24px
  background: rgb(250,250,251)
  // border-right: 1px solid rgb(238,238,238)
  h2.books_read
    font-size: 20px
    padding-left: 24px
.nav_section_box
  height: 100%
  position: absolute
  width: 7%
  display: flex
  justify-content: center
  align-items: center
  right: 0
.nav_sections
  p
    width: 100%
    font-size: 14px
    font-weight: 500
    margin-bottom: 8px
.nav_circle
  width: 4px
  height: 4px
  border-radius: 2px
  background: rgb(100,100,115)
  margin: 0 auto 8px auto
.nav_circle_active
  width: 8px
  height: 8px
  border-radius: 4px
.content_description
  height: 23%
  width: 100%
  display: flex
  justify-content: center
  align-items: center
  position: relative
  .description
    width: 55%
    display: flex
    justify-content: center
.bookcase
  height: 77%
  width: 100%
  padding: 10px 3% 24px 7%
.bookcase0, .bookcase1
  display: flex
  flex-wrap: wrap
  align-content: flex-start
.bookcase0
  .book
    width: 24.7%
    margin-bottom: 0.4rem !important
.bookcase1
  .category
    width: 100%
  .book
    width: 20%
    margin-bottom: 0.25rem
.bookcase2
  display: flex
  flex-direction: column
  flex-wrap: wrap
  align-items: flex-start
  align-content: center
  justify-content: flex-start
  .category
    width: 24%
  .book
    width: 24%
    margin-bottom: 0.28rem
.bookcasenextyear
  width: 88%
  margin: 0 auto
  display: flex
  flex-wrap: wrap
  align-content: flex-start
  .category
    width: 100%
  .book
    width: 24%
    margin-bottom: 0.42rem !important
.toreadlist_box
  width: 100%

.rating-5
  color: #034373
  font-weight: 600 !important
.rating-4
  color: #1864c7
.rating-3
  color: #6fa8d8
.rating-2
  color: #afcaef
.rating-1
  color: rgb(202,202,210)
.book
  font-weight: 500
  transition: color 0.5s linear
  font-size: 11px
.friends_highlight
  color: #e6800f
.amazon_highlight
  color: #ab1313
.category
  font-size: 15px
  margin: 0.3rem 0
  &:first-child
    margin-top: 0
// To Read List styling
.toreadlist
  margin-bottom: 16px
  transition: opacity 0.3s linear
.toreadlist.hide
  opacity: 0

.scroll_button_box
  position: absolute
  width: 100%
  bottom: 32px
  .scroll_button
    margin: 0 auto
    p
      font-size: 12px
      font-weight: 400
      text-align: center
    img
      display: block
      margin: 0 auto
// Transitions styling
.ratings-enter-active
  transition: all 0.5s linear
.ratings-leave-to
  opacity: 0
.ratings-enter
  opacity: 1
.ratings-move
  transition: transform 0.7s ease-out

.slide-fade-enter-active
  transition: all .3s linear
  opacity: 0
.slide-fade-enter, .slide-fade-leave-to
  opacity: 0

.nextyear-enter-active
  transition: all 0.5s ease
.nextyear-leave-active
  transition: all 0s linear
.nextyear-leave-to
  opacity: 0
.nextyear-enter
  opacity: 1
.nextyear-move
  transition: transform 0.7s ease

.is_mobile_box
  width: 100%
  height: 100%
  position: absolute
  top: 0
  background: white
  display: flex
  justify-content: center
  align-items: center
  z-index: 100000000
  .is_mobile
    p
      font-size: 14px
</style>

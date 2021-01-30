<template>
  <div class="content-container">
    <div class="columns is-mobile is-desktop">
    <div class="column is-2 "></div>

      <div class="column is-6 is-flex">
        <button class="button is-info" @click="loadTvShows()" ><i class="fas fa-home"></i></button>&nbsp;
        <input class="input box searchbox" name="firstName" placeholder="Search your favorite Tv shows" v-model.trim="searchQuery" autocomplete="off" v-on:keyup="checkenter" />
      </div>
      <div class="column is-2">
        <button class="search card-footer-item" @click="searchSeries()" v-bind:class="{ disable: checkdisable }">
          <span>Search&nbsp;&nbsp;</span><i class="fas fa-search"></i>
        </button>
      </div>
      <div class="column is-2 buttons">
        <button class="button" title="Grid View" @click="setgrid()" :class="style1=='grid' ? 'is-success' : ''"><i class="fas fa-th"></i></button>
        <button class="button" title="List View" @click="setlist()" :class="style1=='list' ? 'is-success' : ''"><i class="fas fa-list"></i></button>
      </div>
     </div>

    <div class="columns is-mobile is-desktop">
      <div class="column is-1"></div>
      <div class="column is-10">
        <div class="section content-title-group">

          <div class="notification is-warning noresults" v-if="computedObj.length==0">NO RESULTS FOUND...</div>

          <div class="columns is-multiline" :class="style1=='list' ? 'listview' : 'gridview'">
            <div class="column" v-for="tv in computedObj" :key="tv.id" :class="style1=='list' ? 'is-12' : 'is-2'">
              <div v-if="pagetype === 'search'">
                <div class="card moviecard" @click="viewMore(tv.show)" title="Click to view more">
                    <div class="card-content movies" :style="{backgroundImage: 'url(' + (tv.show.image !== null ? tv.show.image.medium : 'https://via.placeholder.com/210x295.png?text=Cover+unavailable' ) + ')'}">
                    </div>
                    <footer class="card-footer">
                      <p class="name moviename">{{tv.show.name}}</p>
                    </footer>
                </div>
              </div>
              <div v-else>
                <div class="card moviecard" @click="viewMore(tv)" title="Click to view more">
                    <div class="card-content movies" :style="{backgroundImage: 'url(' + (tv.image !== null ? tv.image.medium : 'https://via.placeholder.com/210x295.png?text=Cover+unavailable' ) + ')'}">
                    </div>
                    <footer class="card-footer">
                      <p class="name moviename">{{tv.name}}</p>
                    </footer>
                </div>
              </div>
              </div>
          </div>

        </div>
        <progress class="progress is-small is-primary" max="100" v-show="message">{{ message }}</progress>
        <div id="overlay" v-bind:class="[loadstatus === 'on' ? '' : 'is-hidden']">
        <img class="loader1" src="../assets/load.gif" ></div>

      </div>
    </div>
    <Modal
      :show="this.displayShow"
      :isOpen="showModal"
      @handleClose="closeModal"
    >
    </Modal>
  </div>
</template>

<script>

import { mapActions, mapState } from 'vuex';
import Modal from '@/components/modal';

export default {
  name: 'TvShows',
  data() {
    return {
      searchQuery: '',
      displayShow: {},
      message: '',
      loadstatus: '',
      showModal: false,
      pagetype : "",
      style1 : "grid",
      limit : 18,
    };
  },
  components: {
    Modal,
  },
  async created() {
    this.loadTvShows();
  },
  mounted: function () {
      window.addEventListener('scroll', this.handleScroll);
  },
  destroyed: function () {
      window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    ...mapActions(['loadTvshowsAction']),
    viewMore(serie) {
      this.displayShow = serie;
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
    async loadTvShows(){
      this.loadstatus = 'on';
      await this.loadTvshowsAction();
      this.loadstatus = '';
      this.pagetype = 'all';
      this.searchQuery = '';
    },
    async searchSeries() {
      this.loadstatus = 'on';
      await this.loadTvshowsAction(this.searchQuery);
      this.loadstatus = '';
      this.pagetype = 'search';
    },
    checkenter: function(e) {
      if (e.keyCode === 13 && this.searchQuery.length > 0) {
        this.searchSeries();
      }
    },
    setgrid () {
      this.style1 = 'grid';
    },
    setlist(){
      this.style1 = 'list';
    },
    handleScroll () {
      window.onscroll = () => {
        let bottomOfWindow = Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop) + window.innerHeight >= document.documentElement.offsetHeight
        if (bottomOfWindow) {
          this.message = 'Loading....';
          this.limit = this.limit+this.limit; 
          this.message = '';
        }
      }
    }
  },
  computed: {
    ...mapState(['tvShows']),
     checkdisable() {
      return this.searchQuery.length == 0;
    },
    computedObj(){
      return this.limit ? this.tvShows.slice(0,this.limit) : this.tvShows
    }
  },
};
</script>
<template>
  <div id="modal" class="modal" :class="{ 'is-active': isOpen }">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">{{ show.name }}</p>
        <button class="button" @click="onClose">X</button>
      </header>
      <section class="modal-card-body" style="text-align:left">
        <div style="position:relative">
          <div style="float:left; margin-right:5px;">
            <img v-bind:src="getImage" /> 
          </div>
          <div>
            <div v-html="show.summary"></div>
            <p><b>Genre: </b>{{getGenre}}</p>
            <p><b>Language: </b>{{show.language}}</p>
            <div v-html="getWebsite"></div>
          </div>
        </div>

      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Modal',
  props: {
    show: {
      type: Object,
      default: () => '',
    },
    isOpen: {
      type: Boolean,
      default: () => false,
    },
  },
  methods: {
    onClose() {
      this.$emit('handleClose');
    },
  },
  computed: {
    getGenre(){
      if(this.show.genres !== undefined){
        let genre = this.show.genres;
        return genre.length == 0 ? 'Not defined' : genre.join(', ');
      }
      return 'Not defined';
    },
    getWebsite(){
      let officialWebsite = '';
      if(this.show.officialSite !== undefined){
        officialWebsite = `<p><a href="${this.show.officialSite}" target="_blank">Official website</a></p>`;
        return officialWebsite
      }
        return false;
    },
    getImage(){
      let coverImage = 'https://via.placeholder.com/210x295.png?text=Cover+unavailable';
      if(this.show.image != null){
        coverImage = this.show.image.medium;
      }
      return coverImage;
    },
  },
};
</script>

<style lang="scss"></style>

<template>
  <div class="container">
    <h1 class="my-4 title">Tu Portal de Opiniones de Videojuegos</h1>
    <div v-if="loading" class="spinner-border text-primary" role="status"></div>
    <div class="row">
      <div class="col-lg-4 col-md-6 p-2" v-for="game in games" :key="game.id">
        <div class="card">
          <img :src="game.background_image" alt="game image" class="card-img-top" />
          <div class="card-body">
            <h5 class="card-title">{{ game.name }}</h5>
            <div class="stars">
              <span v-for="n in 5" :key="n" :class="{ 'filled': n <= Math.round(game.rating) }">★</span>
            </div>

            <div class="d-flex justify-content-between mb-3">
              <!-- Botón "Me gusta" -->
              <button :class="{ 'btn-like': isLiked(game.id), 'btn-unlike': !isLiked(game.id) }"
                @click="toggleLike(game.id)" class="btn btn-sm">
                {{ isLiked(game.id) ? '❤️ Me gusta' : '🤍 Me gusta' }}
              </button>

              <!-- Botón "Comentar y Valorar" -->
              <button @click="goToOpinion(game)" class="btn btn-primary btn-sm">
                Comentar y Valorar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="btn-cargar p-2">
      <button v-if="moreGames" @click="loadMore" class="btn btn-secondary d-block">Cargar más juegos</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      games: [],
      likedGames: JSON.parse(localStorage.getItem("likedGames")) || [],
      moreGames: true,
      page: 1,
      loading: true,
    };
  },
  methods: {
    async loadMore() {
      this.loading = true;
      try {
        const response = await axios.get(
          `https://api.rawg.io/api/games?key=18bfd46e3f74470595bd59ebd2beaf13&page=${this.page}&page_size=6`
        );
        if (response.data.results.length > 0) {
          this.games.push(...response.data.results);
          this.page++;
        } else {
          this.moreGames = false;
        }
      } catch (error) {
        console.error("Error al cargar los juegos:", error);
      }
      this.loading = false;
    },
    goToOpinion(game) {
      this.$router.push(`/opinions/${game.id}`);
    },
    toggleLike(gameId) {
      if (this.isLiked(gameId)) {
        this.likedGames = this.likedGames.filter((id) => id !== gameId);
      } else {
        this.likedGames.push(gameId);
      }
      localStorage.setItem("likedGames", JSON.stringify(this.likedGames));
    },
    isLiked(gameId) {
      return this.likedGames.includes(gameId);
    },
  },
  mounted() {
    this.loadMore();
  },
};
</script>

<style scoped>
.title {
  text-align: center;
  font-family: monospace;
  font-size: 40px;
  color: #fff;
  font-weight: bold;
}

.stars {
  color: gold;
  font-size: 30px;
  text-align: center;
  margin-bottom: 10px;
}

.filled {
  color: orange;
}

.d-flex {
  display: flex;
  justify-content: space-between;
}

.like-button button {
  padding: 10px 10px;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  width: 40%;
}

.btn-like {
  background-color: #e74c3c;
  color: white;
  transition: transform 0.3s ease;
}

.btn-like:hover {
  background-color: #d82814;
  transform: scale(1.2);
}

.btn-unlike {
  background-color: #bdc3c7;
  color: rgb(61, 61, 61);
  transition: transform 0.3s ease;
}

.btn-unlike:hover {
  background-color: #838587;
  transform: scale(1.2);
}

.card-body {
  text-align: center;
  background-color: #9e61854c;
  border-radius: 5px;
}

.card {
  border: none;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  background-color: rgba(0, 0, 0, 0.314); 
}

.card-img-top {
  border-radius: 5px;
  height: 200px;
  object-fit: cover;
}

button {
  width: 47%;
  border-radius: 100px;
  padding: 10px;
  font-size: 15px;
}

.btn-primary {
  background-color: #c28d1b;
  color: white;
  border: none;
  transition: transform 0.3s ease;
}

.btn-primary:hover {
  background-color: #956706;
  transform: scale(1.2);
}

.mt-4 {
  margin-top: 20px;
}

button:focus {
  outline: none;
}

.mx-auto {
  margin-left: auto;
  margin-right: auto;
}

.d-block {
  display: block;
}

.btn-secondary {
  padding: 20px;
  width: 30%;
  font-size: 22px;
  font-weight: bold;
  transition: transform 0.3s ease;;
  background-color: #ffffff55;
}

.btn-secondary:hover{
  transform: scale(1.09)
}

.btn-cargar {
  display: flex;
  justify-content: center;
  align-items: center;
}

.card-title {
  color: #fff;
  font-size: 20px;
  font-weight: bold;
}

@media (max-width: 1199px){
  .card-title{
    font-size: 16px;
  }
  .btn{
    width: 40% 40%;
    padding: 5px;
  }

}

@media (max-width: 769px){
  .btn-secondary{
    width: 100%;
  }
}
</style>

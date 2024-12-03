<template>
  <div class="container mt-5">
    <!-- Pantalla de inicio de sesión -->
    <div v-if="!userLoggedIn">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="card shadow-lg border-0 animate__animated animate__fadeIn">
            <div class="card-header text-center zonaInicio">
              <h3 class="mb-0 py-3 text-white">Iniciar Sesión</h3>
            </div>
            <div class="card-body back1 p-5 rounded-bottom">
              <form @submit.prevent="login">
                <div class="mb-4">
                  <label for="user" class="form-label text-white">Nombre de usuario</label>
                  <input id="user" v-model="user.username" class="form-control rounded-pill border-0 shadow-sm"
                    required />
                </div>
                <div class="mb-4">
                  <label for="name" class="form-label text-white">Nombre</label>
                  <input id="name" v-model="user.name" class="form-control rounded-pill border-0 shadow-sm" required />
                </div>
                <div class="mb-4">
                  <label for="surname" class="form-label text-white">Apellido</label>
                  <input id="surname" v-model="user.surname" class="form-control rounded-pill border-0 shadow-sm"
                    required />
                </div>
                <div class="mb-4">
                  <label for="email" class="form-label text-white">Correo Electrónico</label>
                  <input id="email" v-model="user.email" type="email"
                    class="form-control rounded-pill border-0 shadow-sm" required />
                </div>
                <div class="entrarbtn text-center">
                  <button type="submit"
                    class="btn btn-warning w-75 text-white rounded-pill shadow-sm py-2 font-weight-bold">Entrar</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Zona del usuario (solo visible si está logueado) -->
    <div v-else>
      <div class="row justify-content-center">
        <div class="col-md-9">
          <div class="card shadow-lg border-0">
            <div class="card-header zonaU text-white text-center py-4">
              <h3 class="mb-0">Bienvenido {{ user.username }}</h3>
            </div>
            <div class="card-body back1 text-white p-5">
              <section class="mb-5">
                <h4 class="mb-4 border-bottom pb-2">Perfil</h4>
                <div class="perfil-info d-flex align-items-center">
                  <img :src="user.profilePic" alt="Profile Pic" class="rounded-circle mr-4" width="100" height="100" />
                  <div class="p-5">
                    <p class="mb-2"><b>Nombre Usuario:</b> {{ user.username }}</p>
                    <p class="mb-2"><b>Nombre:</b> {{ user.name }}</p>
                    <p class="mb-2"><b>Apellido:</b> {{ user.surname }}</p>
                    <p class="mb-2"><b>Email:</b> {{ user.email }}</p>
                    <button @click="goToOptions" class="btn btn-warning mt-3 rounded-pill shadow-sm px-4 ">Editar
                      Perfil</button>
                  </div>
                </div>
              </section>

              <section class="mb-4">
                <h4 class="mb-4 border-bottom pb-2">Me Gustan</h4>
                <div v-if="likedGamesDetails.length > 0">
                  <div class="row">
                    <div v-for="game in likedGamesDetails" :key="game.id" class="col-md-4">
                      <div class="card shadow-lg game-card h-100">
                        <img :src="game.background_image" alt="game image" class="card-img-top"
                          style="height: 200px; object-fit: cover;" />
                        <div class="card-body d-flex flex-column">
                          <h5 class="card-title text-dark">{{ game.name }}</h5>
                          <p class="card-text text-muted">{{ game.released }}</p>
                          <div class="game-details mt-auto">
                            <p class="mb-0"><b>Género:</b> {{ game.genres[0].name }}</p>
                          </div>
                        </div>
                        <div class="game-overlay">
                          <button @click="toggleLike(game.id)" class="btn btn-danger rounded-pill px-4">Quitar</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <p v-else class="textmuted1">No tienes elementos en "Me Gustan".</p>
              </section>
            </div>

            <div class="card-footer text-center zonaU py-3">
              <button @click="logout" class="btn btn-danger w-50 p-3 rounded-pill">Cerrar Sesión</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      userLoggedIn: false,
      user: {
        name: '',
        surname: '',
        email: '',
        profilePic: ''
      },
      likedGames: [],
      likedGamesDetails: [],
      page: 1,
    };
  },
  methods: {
    login() {
      if (this.user.name && this.user.surname && this.user.email) {
        const randomProfilePics = [
          'https://randomuser.me/api/portraits/lego/1.jpg',
          'https://randomuser.me/api/portraits/lego/2.jpg',
          'https://randomuser.me/api/portraits/lego/3.jpg'
        ];
        this.user.profilePic = randomProfilePics[Math.floor(Math.random() * randomProfilePics.length)];
        localStorage.setItem('user', JSON.stringify(this.user));
        localStorage.setItem('userProfilePic', this.user.profilePic);

        localStorage.setItem('userLoggedIn', 'true');

        const likedGames = JSON.parse(localStorage.getItem('likedGames')) || [];
        this.likedGames = likedGames;

        this.userLoggedIn = true;
        this.loadLikedGames();
      }
    },
    logout() {
      localStorage.removeItem('userLoggedIn');
      localStorage.removeItem('user');
      localStorage.removeItem('userProfilePic');
      localStorage.removeItem('likedGames');

      this.userLoggedIn = false;
      this.user = { name: '', surname: '', email: '', profilePic: '' };
      this.likedGames = [];
      this.likedGamesDetails = [];
    },
    async loadLikedGames() {
      this.likedGamesDetails = [];
      for (let gameId of this.likedGames) {
        try {
          const response = await axios.get(
            `https://api.rawg.io/api/games/${gameId}?key=18bfd46e3f74470595bd59ebd2beaf13`
          );
          if (response.data) {
            this.likedGamesDetails.push(response.data);
          }
        } catch (error) {
          console.error('Error al cargar los detalles del juego:', error);
        }
      }
    },
    toggleLike(gameId) {
      if (this.isLiked(gameId)) {
        this.likedGames = this.likedGames.filter((id) => id !== gameId);
      } else {
        this.likedGames.push(gameId);
      }
      if (this.userLoggedIn) {
        localStorage.setItem('likedGames', JSON.stringify(this.likedGames));
      }
      this.loadLikedGames();
    },
    isLiked(gameId) {
      return this.likedGames.includes(gameId);
    },
    editProfile() {
      alert('Función para editar el perfil aún no implementada.');
    },
    goToOptions() {
      this.$router.push({ name: 'Opcion' });
    },
  },
  mounted() {
  const userLoggedIn = localStorage.getItem('userLoggedIn') === 'true';
  if (userLoggedIn) {
    this.userLoggedIn = true;
    this.user = JSON.parse(localStorage.getItem('user')) || {};
    this.likedGames = JSON.parse(localStorage.getItem('likedGames')) || [];
    this.loadLikedGames();
  }
}
,
};
</script>

<style scoped>
.card {
  background-color: rgba(51, 51, 51, 0);
}

.entrarbtn {
  display: flex;
  justify-content: center;
  align-items: center;
}

.zonaInicio {
  background-color: #ff6a00a6;
  border-radius: 10px;
}

.back1 {
  background-color: #6c4f7692;
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
}

.zonaU {
  background-color: #cf89a2a3;
}

.game-card {
  background-color: #cf89a2a3;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  overflow: hidden;
  border-radius: 10px;
}

.game-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.game-details {
  font-size: 14px;
}

.game-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.game-card:hover .game-overlay {
  opacity: 1;
}

.text-center button {
  margin-top: 10px;
}

.card-body {
  position: relative;
}

.textmuted1 {
  color: rgba(240, 248, 255, 0.485);
}

input.form-control:focus {
  box-shadow: 0 0 0 0.2rem rgba(255, 106, 0, 0.25);
  border-color: #ff6a00;
}

.btn-warning {
  background-color: #ff6a00;
  border-color: #ff6a00;
  transition: transform 0.8s;
}

.btn-warning:hover,
.btn-warning:focus {
  transform: scale(1.1);
}

.btn-danger {
  background-color: #dc3545;
  border-color: #dc3545;
  transition: transform 1s;
}

.btn-danger:hover,
.btn-danger:focus {
  transform: scale(1.1);
}
</style>

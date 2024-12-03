<template>
  <div class="container mt-5">
    <h1 class="mb-4 text-center text-white">Zona de Opciones</h1>

    <div v-if="userLoggedIn">
      <!-- Perfil -->
      <div class="card mb-4 shadow-lg">
        <div class="card-header bg-gradient-primary text-white d-flex align-items-center">
          <i class="fas fa-user-edit mr-3"></i>
          <h2 class="mb-0">Editar Perfil</h2>
        </div>
        <div class="card-body">
          <form @submit.prevent="saveProfile">
            <div class="mb-3">
              <label for="username" class="form-label">Nombre de Usuario</label>
              <input id="username" v-model="user.username" class="form-control" required />
            </div>
            <div class="mb-3">
              <label for="name" class="form-label">Nombre</label>
              <input id="name" v-model="user.name" class="form-control" required />
            </div>
            <div class="mb-3">
              <label for="surname" class="form-label">Apellido</label>
              <input id="surname" v-model="user.surname" class="form-control" required />
            </div>
            <div class="mb-3">
              <label for="email" class="form-label">Correo Electrónico</label>
              <input id="email" v-model="user.email" type="email" class="form-control" required />
            </div>

            <!-- Cambiar Contraseña -->
            <div class="mb-3">
              <label for="newPassword" class="form-label">Nueva Contraseña</label>
              <input id="newPassword" v-model="newPassword" type="password" class="form-control" />
            </div>
            <div class="mb-3">
              <label for="confirmPassword" class="form-label">Confirmar Contraseña</label>
              <input id="confirmPassword" v-model="confirmPassword" type="password" class="form-control" />
            </div>

            <!-- Alerta de Error -->
            <div v-if="alertMessage" :class="alertClass" class="alert alert-dismissible mt-2">
              <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
              {{ alertMessage }}
            </div>
            <div class="text-center">
              <button type="submit" class="btn btn-primary w-50 mt-2 p-2">Guardar Cambios</button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <div v-else class="text-center text-muted1">
      <p>Por favor, inicia sesión para acceder a tus opciones.</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        username: "",
        name: "",
        surname: "",
        email: "",
        password: "",
      },
      selectedGame: null,
      userLoggedIn: false,
      newPassword: "",
      confirmPassword: "",
      alertMessage: "",
      alertClass: "",
    };
  },
  methods: {
    saveProfile() {
      if (this.newPassword && this.newPassword !== this.confirmPassword) {
        this.alertMessage = "Las contraseñas no coinciden.";
        this.alertClass = "alert-danger";
        return;
      }

      if (this.newPassword) {
        this.user.password = this.newPassword;
      }

      this.saveToLocalStorage();
      this.alertMessage = "Perfil actualizado correctamente.";
      this.alertClass = "alert-success";
    },

    saveToLocalStorage() {
      localStorage.setItem("user", JSON.stringify(this.user));
    },

    logout() {
      localStorage.removeItem("user");
      this.user = { username: "", name: "", surname: "", email: "", password: "", games: [] };
      this.userLoggedIn = false;
    },
  },

  mounted() {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      this.user = JSON.parse(savedUser);
      this.userLoggedIn = true;
    }
  }
}
</script>

<style scoped>
.text-muted1 {
  color: rgba(240, 248, 255, 0.608);
}

.container {
  max-width: 900px;
  margin: 0 auto;
}

.card {
  background-color: rgba(240, 248, 255, 0);
}

.card-header {
  color: white;
  font-size: 1.25rem;
  font-weight: 600;
}

.card-body {
  color: aliceblue;
  background-color: #904d766a;
}

.bg-gradient-primary {
  background: linear-gradient(90deg, rgba(128, 72, 113, 0.589) 0%, rgba(92, 49, 80, 0.589) 100%);
}

.btn-primary{
  transition: transform 1s;
}

.btn-primary:hover{
  transform: scale(1.1);
}
</style>

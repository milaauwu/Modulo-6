<template>
  <nav class="navbar">
    <div class="navbar-content">
      <ul>
        <li><router-link to="/">Inicio</router-link></li>
        <li><router-link to="/Home">Juegos</router-link></li>
        <li><router-link to="/Admin">Mi Zona</router-link></li>
        <li><router-link to="/opciones">Opciones</router-link></li>
      </ul>
    </div>
  </nav>
</template>


<style scoped>
.navbar {
  background-color: #9d5f83;
  background-image: linear-gradient(135deg, #9d5f83, #f5a9b8);
  padding: 15px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.navbar-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

ul {
  list-style: none;
  display: flex;
  margin: 0;
  padding: 0;
}

li {
  margin-right: 40px;
}

a {
  color: white;
  text-decoration: none;
  font-size: 20px;
  font-weight: 500;
  transition: color 0.3s ease;
}

a:hover {
  color: #ffcc00;
  text-decoration: none;
}

</style>

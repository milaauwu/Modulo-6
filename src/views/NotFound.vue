<template>
  <div class="not-found-container">
    <div class="not-found-content">
      <h1 class="not-found-title">404</h1>
      <p class="not-found-message">¡Ups! La página que buscas no está disponible. Tal vez se perdió en otro nivel.</p>
      <router-link to="/" class="not-found-button">Regresar al inicio</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotFound',
};
</script>

<style scoped>
.not-found-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #1e1e1e8a;
  background-size: cover;
  background-position: center;
  animation: glitchBackground 2s infinite;
}

.not-found-content {
  text-align: center;
  background: rgba(0, 0, 0, 0.696);
  padding: 50px 90px;
  border-radius: 12px;
  box-shadow: 0 15px 25px rgba(0, 0, 0, 0.4);
  max-width: 500px;
  width: 100%;
  position: relative;
  overflow: hidden;
}

.not-found-title {
  font-size: 120px;
  font-weight: bold;
  color: #00ff00;
  text-transform: uppercase;
  margin-bottom: 20px;
  font-family: 'Press Start 2P', cursive; 
  animation: glitchEffect 1.5s infinite;
}

.not-found-message {
  font-size: 18px;
  color: #f2f2f2;
  margin-bottom: 30px;
  font-family: 'Roboto', sans-serif;
}

.not-found-button {
  padding: 12px 40px;
  background-color: #ff4081;
  color: white;
  text-decoration: none;
  font-size: 18px;
  font-weight: bold;
  border-radius: 20px;
  text-transform: uppercase;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  transition:background-color 0.3s ease;
}

.not-found-button:hover {
  background-color: #cd0044;
}

@keyframes glitchBackground {
  0% { background-position: 0 0; }
  50% { background-position: 100% 100%; }
  100% { background-position: 0 0; }
}

@keyframes glitchEffect {
  0% { text-shadow: -2px -2px 0 #00ff00, 2px 2px 0 #ff4081; }
  25% { text-shadow: -2px -2px 0 #00ff00, 2px 2px 0 #ff4081; }
  50% { text-shadow: -2px -2px 0 #ff4081, 2px 2px 0 #00ff00; }
  75% { text-shadow: 2px 2px 0 #00ff00, -2px -2px 0 #ff4081; }
  100% { text-shadow: -2px -2px 0 #ff4081, 2px 2px 0 #00ff00; }
}
</style>

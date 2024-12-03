<template>
  <div class="container-fluid p-5 text-white">
    <div class="row justify-content-center text-center">
      <div class="col-md-8">
        <h1 class="display-3 mb-4">Bienvenido a GameZone</h1>
        <p class="lead mb-4">
          La plataforma ideal para los fanáticos de los videojuegos. Mantente al día con las noticias más recientes,
          descubre los últimos lanzamientos y lee reseñas. Además, en nuestra zona de juegos puedes valorar cada título,
          dejando tu like y comentario para compartir tu opinión. ¡Sumérgete en el mundo del entretenimiento interactivo
          y haz que tu voz se escuche!
        </p>
        <p class="mb-5">
          Mantente informado con lo último en el mundo del gaming y participa activamente dejando tu opinión y
          valoraciones sobre cada título. ¡Todo lo que necesitas para estar a la vanguardia del entretenimiento
          interactivo está aquí!
        </p>
        <button class="btn btn-warning btn-lg" @click="goToGames">
          Explorar Juegos
        </button>
      </div>
    </div>

    <!-- Últimas Noticias -->
    <div class="row justify-content-center mt-5">
      <div class="col-md-10">
        <h2 class="text-center text-warning mb-4">Últimas Noticias</h2>
        <div class="row">
          <div class="col-lg-4 col-12 mb-4 p-2" v-for="news in latestNews" :key="news.id">
            <div class="card bg-dark text-white">
              <img :src="news.image" class="card-img-top" alt="news image" />
              <div class="card-body">
                <h5 class="card-title">{{ news.title }}</h5>
                <p class="card-text">{{ news.excerpt }}</p>
                <a :href="news.link" class="btn btn-warning" target="_blank">Leer más</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InicioPage',
  data() {
    return {
      latestNews: [
        {
          id: 1,
          title: 'Mario y Luigi: los hermanos más famosos de los videojuegos vuelven con un divertido RPG.',
          excerpt: 'En esta ocasión los reyes de las plataformas nos brindan un título cooperativo apto para toda la familia, los hermanos italianos dejan las consolas portátiles para correr una aventura en 3D.',
          image: 'https://theobjective.com/wp-content/uploads/2024/11/mario-luigi.jpg',
          link: 'https://www.nintendo.com/es-es/Juegos/Juegos-de-Nintendo-Switch/Mario-Luigi-Conexion-fraternal-2590264.html?srsltid=AfmBOope329Z5PRgZ37FmhTNcPwhgnZzgSWvEjNjWOjxQxeeeS_bnjHj',
        },
        {
          id: 2,
          title: 'Nintendo confirma que la nueva Switch será retrocompatible con todo el catálogo de su predecesora',
          excerpt: 'Nintendo asegura que los juegos de la actual Switch funcionarán en la futura consola, que promete una transición sin perder acceso al vasto catálogo disponible.',
          image: 'https://elcomercio.pe/resizer/v2/O3TUGWNTUJGCHGAN2MI2CQSANI.jpg?auth=bfc2f5ddc6cb5728e012b99b29120b6dd5a580c749672f5dda15c8758f79c4b4&width=1200&height=677&quality=75&smart=true',
          link: 'https://esports.as.com/bonus/videojuegos/Nintendo-confirma-Switch-retrocompatible_0_1846015382.html#:~:text=Nintendo%20ha%20confirmado%20una%20gran%20noticia%3A%20la%20sucesora,como%20finalmente%20decidan%20llamar%20a%20la%20pr%C3%B3xima%20consola.',
        },
        {
          id: 3,
          title: 'Esperado exclusivo de Xbox debuta con muchos errores y enfurece a los jugadores; es prácticamente injugable',
          excerpt: 'Hablamos de Microsoft Flight Simulator 2024, la nueva entrega de la popular franquicia de aviación se llena de criticas en Steam.',
          image: 'https://64.media.tumblr.com/02df9632af4c0a58f05e6dab4bb5fb10/5d88f6c62f33efe5-5d/s1280x1920/d5986507bd0eeec7c5217ac479516ccd6c9baabc.jpg',
          link: 'https://www.levelup.com/noticias/811347/Esperado-exclusivo-de-Xbox-debuta-con-muchos-errores-y-enfurece-a-los-jugadores-es-practicamente-injugable-y-tiene-resenas-muy-negativas-en-Steam',
        },
      ],
    };
  },
  methods: {
    goToGames() {
      this.$router.push('/Home');
    },
  },
};
</script>

<style scoped>
.text-warning {
  color: #ffb300 !important;
}

.card {
  border: none;
  border-radius: 10px;
}

.card-title {
  font-size: 1.25rem;
  font-weight: bold;
}

.card-img-top {
  border-radius: 10px 10px 0 0;
}

.btn-warning {
  background-color: #ffb300;
  border-color: #ffb300;
}

.btn-warning:hover {
  background-color: #925c00;
  border-color: #925c00;
}


</style>
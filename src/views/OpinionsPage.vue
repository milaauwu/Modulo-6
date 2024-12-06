<template>
    <div class="container game-view" v-if="game && game.name">
        <div class="game-header position-relative text-center">
            <img :src="game.background_image" alt="game image" class="game-image" />
            <div class="overlay">
                <h1 class="game-title">{{ game.name }}</h1>
                <div class="rating-stars">
                    <span v-for="star in 5" :key="star" class="bi bi-star-fill"
                        :class="{ filled: gameRating >= star }"></span>
                </div>
                <span class="game-rating-value text-white">{{ gameRating.toFixed(1) }} / 5</span>
            </div>
        </div>

        <div class="row mt-4 zona-comentarios">
            <div class="col-md-8">
                <h3 class="comments-title text-white display-5">Comentarios</h3>
                <ul class="list-group comments-list p-4">
                    <li class="list-group-item mb-3 shadow-sm comment-card" v-for="(comment, index) in comments"
                        :key="index">
                        <div class="d-flex align-items-center mb-2">
                            <img :src="comment.profilePic" alt="Imagen de perfil" class="profile-pic" />
                            <span class="ms-3 username">{{ comment.username }}</span>
                        </div>
                        <p class="comment-text text-black">{{ comment.text }}</p>
                        <div class="d-flex align-items-center justify-content-between">
                            <div class="rating-stars">
                                <span v-for="star in 5" :key="star" class="bi bi-star-fill"
                                    :class="{ filled: comment.commentRating >= star }"></span>
                                <span class="comment-rating-value p-3">{{ comment.commentRating }} / 5</span>
                            </div>
                        </div>

                        <div class="d-flex justify-content-between align-items-center mt-3">
                            <div class="likes">
                                <i class="bi bi-heart-fill heart-icon" @click="likeComment(index)"
                                    :class="{ liked: comment.liked }"></i>
                                <span class="likes-count">{{ comment.likes }} Me gusta</span>
                            </div>
                            <div v-if="comment.username === currentUser.username" class="row">
                                <div class="col-6">
                                    <button class="btn btn-primary edit-button" @click="editComment(index)">
                                        Editar
                                    </button>
                                </div>
                                <div class="col-6">
                                    <button class="btn btn-danger " @click="deleteComment(index)">
                                        Eliminar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>

                <form @submit.prevent="handleComment" class="mt-3 comment-form shadow-sm p-3">
                    <div class="mb-1">
                        <textarea v-model="newComment" class="form-control p-2" rows="3"
                            placeholder="Escribe tu comentario..." required></textarea>
                    </div>

                    <div class="rating-input mb-2 row align-items-center">
                        <label class="form-label">Valoración:</label>
                        <div class="rating-stars col-4 stars-c">
                            <span v-for="star in 5" :key="star" @click="setRating(star)"
                                @mouseover="hoverRating(null, star)" @mouseleave="resetHover(null)"
                                class="bi bi-star-fill"
                                :class="{ filled: rating >= star, hovered: hoverRatingValue >= star }"></span>
                        </div>
                        <div class="col-4">
                            <button type="submit" class="btn btn-enviar w-100 p-2 text-white">
                                {{ isEditing ? "Actualizar Comentario" : "Enviar Comentario" }}
                            </button>
                        </div>
                    </div>
                </form>

            </div>
        </div>
    </div>
</template>


<script>
import axios from "axios";

export default {
    data() {
        return {
            game: {},
            comments: [],
            currentUser: JSON.parse(localStorage.getItem("user")) || {
                username: "Invitado",
                profilePic: "",
            },
            newComment: "",
            rating: 0,
            isEditing: false,
            editIndex: null,
            hoverRatingValue: 0,
        };
    },
    computed: {
        gameRating() {
            return (
                this.comments.reduce((acc, comment) => acc + comment.commentRating, 0) /
                this.comments.length || 0
            );
        },
    },
    async created() {
        const gameId = this.$route.params.id;
        const gameResponse = await axios.get(
            `https://api.rawg.io/api/games/${gameId}?key=18bfd46e3f74470595bd59ebd2beaf13`
        );
        this.game = gameResponse.data;
        const storedComments = JSON.parse(localStorage.getItem("comments")) || [];
        if (storedComments.length === 0) {
            this.generateRandomComments();
        } else {
            this.comments = storedComments;
        }
        if (!localStorage.getItem("user")) {
            const randomProfilePic = `https://randomuser.me/api/portraits/${Math.random() > 0.5 ? "men" : "women"
                }/${Math.floor(Math.random() * 99)}.jpg`;
            const newUser = {
                username: "Usuario" + Math.floor(Math.random() * 1000),
                profilePic: randomProfilePic,
            };
            localStorage.setItem("user", JSON.stringify(newUser));
            this.currentUser = newUser;
        } else {
            this.currentUser = JSON.parse(localStorage.getItem("user"));
        }
    }
    ,
    methods: {
        generateRandomComments() {
            const randomComments = [
                {
                    username: "ShadowHunter",
                    profilePic: "https://randomuser.me/api/portraits/men/1.jpg",
                    text: "Gran juego!",
                    commentRating: 5,
                    likes: 10,
                    liked: false,
                    hoverRating: 0,
                },
                {
                    username: "PixelWarrior",
                    profilePic: "https://randomuser.me/api/portraits/women/1.jpg",
                    text: "Muy entretenido",
                    commentRating: 4,
                    likes: 3,
                    liked: false,
                    hoverRating: 0,
                },
                {
                    username: "GameMaster",
                    profilePic: "https://randomuser.me/api/portraits/men/2.jpg",
                    text: "Me encantó la jugabilidad",
                    commentRating: 4,
                    likes: 7,
                    liked: false,
                    hoverRating: 0,
                },
                {
                    username: "RetroGamer",
                    profilePic: "https://randomuser.me/api/portraits/men/3.jpg",
                    text: "¡Genial, aunque podría mejorar!",
                    commentRating: 3,
                    likes: 2,
                    liked: false,
                    hoverRating: 0,
                },
            ];

            this.comments = randomComments;
            localStorage.setItem("comments", JSON.stringify(this.comments));
        },
        setRating(star) {
            this.rating = star;  
        },
        hoverRating(comment, star) {
            if (comment) {
                comment.hoverRating = star;  
            } else {
                this.hoverRatingValue = star;  
            }
        },
        resetHover(comment) {
            if (comment) {
                comment.hoverRating = 0; 
            } else {
                this.hoverRatingValue = 0;  
            }
        },
        editRating(comment, star) {
            if (this.isEditing && this.editIndex === this.comments.indexOf(comment)) {
                comment.commentRating = star;  
            }
        },
        handleComment() {
            if (this.newComment.trim()) {
                console.log("Profile Picture URL: ", this.currentUser.profilePic);
                if (this.isEditing) {
                    this.comments[this.editIndex].text = this.newComment;
                    this.comments[this.editIndex].commentRating = this.rating;
                    this.isEditing = false;
                } else {
                    this.comments.push({
                        username: this.currentUser.username,
                        profilePic: this.currentUser.profilePic,
                        text: this.newComment,
                        commentRating: this.rating,
                        likes: 0,
                        liked: false,
                        hoverRating: 0,
                    });
                }

                localStorage.setItem("comments", JSON.stringify(this.comments));
                this.newComment = "";
                this.rating = 0;
            }
        },
        likeComment(index) {
            this.comments[index].liked = !this.comments[index].liked;
            this.comments[index].likes += this.comments[index].liked ? 1 : -1;
        },
        editComment(index) {
            this.newComment = this.comments[index].text;
            this.rating = this.comments[index].commentRating;
            this.isEditing = true;
            this.editIndex = index;
        },
        deleteComment(index) {
            if (confirm("¿Estás seguro de que deseas eliminar este comentario?")) {
                this.comments.splice(index, 1);
                localStorage.setItem("comments", JSON.stringify(this.comments));
            }
        },
    },
};
</script>


<style scoped>
.container {
    background-color: #05050500;
    padding: 20px;
    border-radius: 10px;
}

.game-header {
    position: relative;
    overflow: hidden;
}

.game-image {
    width: 100%;
    height: auto;
    border-radius: 30px;
}

.overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: white;
    padding: 10px;
    border-radius: 30px;
}

.comments-title {
    margin-bottom: 20px;
    text-align: center;
    font-weight: 400;
    font-size: 50px;
    font-family: Arial, Helvetica, sans-serif;
}

.comments-list {
    max-height: 400px;
    overflow-y: auto;
}

.comment-card {
    background-color: #ffffff;
    border-radius: 5px;
    font-size: 15px;
    padding: 10px;
    transition: background-color 0.3s;
}

.profile-pic {
    width: 50px;
    height: 50px;
    border-radius: 50%;
}

.rating-stars,
.rating-input .rating-stars {
    cursor: pointer;
    color: #fed990e3;
    font-size: 20px;
}

.filled {
    color: #ffc107;
}

.hovered {
    color: #ffa500;
}

.stars-c{
    transition: transform 0.4s;
}
.stars-c:hover{
    transform: scale(1.1);
}

.edit-button,
.btn-danger {
    width: 100%;
}

::-webkit-scrollbar{
    width: 18px;
}
::-webkit-scrollbar-track{
    background: #ca5959;
}
::-webkit-scrollbar-thumb{
    background: #d38686;
    border-radius: 12px;
    border: 3px solid white;
}

.comment-form {
    background-color: #f6f8fa;
    border-radius: 20px;
    padding: 10px;
    margin-top: 20px;
}

.comment-text {
    margin-bottom: 20px;
    font-size: 20px;
}

.likes {
    display: flex;
    align-items: center;
}

.heart-icon {
    cursor: pointer;
    color: #d38686;
    transition: transform 0.3s ease;
}

.heart-icon:hover {
    transform: scale(1.2);
}

.liked {
    color: #ff142b;
    transform: scale(1.4);
}

.likes-count {
    margin-left: 5px;
}

.zona-comentarios{
    display: flex;
    justify-content: center;  
}
.form-label{
    font-size: 20px;
}

.btn-enviar{
    background-color: #d38686;
    border-radius: 20px;
    transition: transform 1s;
}

.btn-enviar:hover{
    background-color: #ca5959;
    transform: scale(1.1);
}
</style>
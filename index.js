function getAnime() {
    fetch('https://anime-api-cmvm.onrender.com/anime')
      .then(response => response.json())
      .then(data => {
        let selectedAnime = null;
        let commentForm = null;
  
        const animeList = document.getElementById('anime-list');
        const detailsContainer = document.getElementById('anime-details');
  
        data.forEach((anime, index) => {
          const animeLi = document.createElement('li');
          animeLi.textContent = anime.name;
  
          animeLi.addEventListener('click', () => {
            // Remove the existing comment form and create a new one
            if (commentForm) {
              commentForm.remove();
            }
            commentForm = createCommentForm();
  
            selectedAnime = anime;
            animeDetails(selectedAnime);
            detailsContainer.appendChild(commentForm);
          });
  
          animeList.appendChild(animeLi);
  
          // Trigger click event on the first anime
          if (index === 0) {
            animeLi.click();
          }
        });
  
        function animeDetails(anime) {
          const poster = detailsContainer.querySelector('#poster');
          poster.src = anime.img;
          const name = detailsContainer.querySelector('#name');
          name.innerText = anime.name;
          const description = detailsContainer.querySelector('#description');
          description.innerText = anime.description;
          const rating = detailsContainer.querySelector('#rating');
          rating.innerText = `Rating: ${anime.Rating}/10`;
          const episode = detailsContainer.querySelector('#episode');
          episode.innerText = `Episodes: ${anime.episode}`;
          const category = detailsContainer.querySelector('#category');
          category.innerText = `Category: ${anime.category}`;
          const studio = detailsContainer.querySelector('#studio');
          studio.innerText = `Studio: ${anime.studio}`;
        }
  
        function createCommentForm() {
          const form = document.createElement('form');
          const input = document.createElement('input');
          const button = document.createElement('button');
  
          input.type = 'text';
          input.placeholder = 'Tell us what you think !';
          button.textContent = 'Submit';
  
          form.appendChild(input);
          form.appendChild(button);
  
          const commentList = document.createElement('ul');
          commentList.id = 'comment-list';
  
          form.appendChild(commentList);
  
          form.addEventListener('submit', event => {
            event.preventDefault();
  
            const comment = document.createElement('li');
            comment.textContent = input.value;
            input.value = '';
  
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'x';
            deleteButton.addEventListener('click', () => {
              comment.remove();
            });
            comment.appendChild(deleteButton);
  
            commentList.appendChild(comment);
          });
  
          return form;
        }
      });
  }
  
  window.addEventListener("load", getAnime);
